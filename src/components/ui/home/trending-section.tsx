'use client';

import { motion, AnimatePresence, EventInfo } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaFire, FaGlobe } from 'react-icons/fa';

const trendingContent = [
  {
    id: 1,
    title: "Rituales Ancestrales Andinos",
    creator: "Comunidad Quechua",
    views: "24.5K",
    likes: "1.2K",
    category: "Documental",
    duration: "22 min",
    thumbnail: "/trending1.jpg",
    accent: "#aedd2b",
    location: "Perú",
    tags: ["Tradiciones", "Cultura Viva", "Rituales"]
  },
  {
    id: 2,
    title: "Voces del Amazonas",
    creator: "Guardianes de la Selva",
    views: "18.3K",
    likes: "945",
    category: "Podcast",
    duration: "38 min",
    thumbnail: "/trending2.jpg",
    accent: "#02416d",
    location: "Brasil",
    tags: ["Ecología", "Sabiduría Ancestral", "Amazonía"]
  },
  {
    id: 3,
    title: "Bailes Tradicionales de África Occidental",
    creator: "Danza Tribal",
    views: "32.1K",
    likes: "2.3K",
    category: "Video",
    duration: "15 min",
    thumbnail: "/trending3.jpg",
    accent: "#9bc926",
    location: "Ghana",
    tags: ["Danza", "Ritmo", "Expresión Cultural"]
  },
  {
    id: 4,
    title: "Cantos Gregorianos Modernos",
    creator: "Coro Catedralicio",
    views: "12.7K",
    likes: "1.8K",
    category: "Audio",
    duration: "42 min",
    thumbnail: "/trending4.jpg",
    accent: "#012c4d",
    location: "Italia",
    tags: ["Música Sagrada", "Armonía", "Tradición"]
  },
  {
    id: 5,
    title: "Tejedoras de los Andes",
    creator: "Artesanías Milenarias",
    views: "27.8K",
    likes: "3.1K",
    category: "Documental",
    duration: "28 min",
    thumbnail: "/trending5.jpg",
    accent: "#c5f04a",
    location: "Bolivia",
    tags: ["Artesanía", "Textiles", "Herencia Cultural"]
  }
];

const FloatingGlobe = () => {
  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-[#aedd2b]/20 flex items-center justify-center pointer-events-none"
      animate={{ 
        rotate: 360,
        scale: [1, 1.05, 1]
      }}
      transition={{ 
        duration: 20, 
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <FaGlobe className="text-[#aedd2b] text-4xl" />
      
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#aedd2b] w-6 h-6 flex items-center justify-center text-white text-xs"
          style={{
            transform: `rotateY(${i * 45}deg) translateZ(100px)`,
          }}
          animate={{ 
            rotateY: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 5 + i,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <FaFire />
        </motion.div>
      ))}
    </motion.div>
  );
};

const HoverSpotlight = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setPosition({ x, y });
    };
    
    if (ref.current) {
      ref.current.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  return (
    <div 
      ref={ref}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0"
        animate={{ 
          x: `${position.x}%`,
          y: `${position.y}%`,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
        style={{
          background: `radial-gradient(circle at center, rgba(174, 221, 43, 0.1) 0%, transparent 70%)`,
          width: '150%',
          height: '150%',
          x: '-25%',
          y: '-25%'
        }}
      />
    </div>
  );
};

const TrendingCard = ({ content, index }: { content: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [contentState, setContentState] = useState(content);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const handleHover = (event: MouseEvent, info: EventInfo) => {
    setIsHovered(true);
  }

  const handleLeave = () => {
    setIsHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-3xl bg-white shadow-2xl h-full transform-gpu"
      initial={{ opacity: 0, y: 50, rotateY: 10 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 50,
        rotateY: isVisible ? 0 : 10
      }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -15,
        zIndex: 20,
        boxShadow: `0 25px 50px -12px ${content.accent}40`
      }}
      onHoverStart={handleHover}
      onHoverEnd={handleLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <HoverSpotlight />
      
      {/* Fondo con efecto de gradiente dinámico */}
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          background: `linear-gradient(to bottom, transparent 30%, ${content.accent}20 100%)`,
          boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)'
        }}
      />
      
      {/* Imagen de fondo con efecto de zoom */}
      <motion.div 
        className="absolute inset-0"
        animate={{ 
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 0.5 : 0
        }}
        transition={{ duration: 0.5 }}
        style={{
          background: `linear-gradient(45deg, ${content.accent}30, #012c4d)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Patrón de ondas sutil */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${100 + i * 80}%`,
                height: `${100 + i * 80}%`,
              }}
              animate={{ 
                opacity: isHovered ? [0.1, 0.3, 0.1] : 0.1,
                scale: isHovered ? [1, 1.1, 1] : 1
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Badge de tendencia con efecto de llama */}
      <motion.div 
        className="absolute top-4 left-4 bg-gradient-to-r from-[#ff6b35] to-[#ff9a3c] text-white px-3 py-1 rounded-full z-20 flex items-center shadow-lg"
        animate={{ 
          scale: isHovered ? [1, 1.2, 1] : 1,
          rotate: isHovered ? [0, 5, -5, 0] : 0,
          y: isHovered ? [0, -5, 0] : 0
        }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        <motion.span 
          className="mr-1"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 20, 0]
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          🔥
        </motion.span>
        <span className="font-bold text-sm">Trending Global</span>
      </motion.div>
      
      {/* Ubicación */}
      <motion.div 
        className="absolute top-4 right-4 bg-black/40 text-white px-3 py-1 rounded-full z-20 flex items-center text-sm"
        animate={{ 
          opacity: isHovered ? 1 : 0.8,
          y: isHovered ? 0 : 5
        }}
      >
        <FaGlobe className="mr-1 text-[#aedd2b]" />
        {content.location}
      </motion.div>
      
      {/* Contenido */}
      <div className="relative z-20 h-full flex flex-col justify-end p-6">
        {/* Tags */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-3"
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10
          }}
        >
          {content.tags.map((tag: string, i: number) => (
            <span 
              key={i}
              className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </motion.div>
        
        {/* Categoría y duración */}
        <div className="flex justify-between items-center mb-3">
          <motion.span 
            className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-white/20"
            animate={{ 
              backgroundColor: isHovered ? [content.accent, content.accent + 'dd'] : 'rgba(255,255,255,0.2)'
            }}
            transition={{ duration: 0.3 }}
          >
            {content.category}
          </motion.span>
          <motion.span 
            className="bg-black/30 text-white px-2 py-1 rounded text-sm"
            animate={{ 
              scale: isHovered ? 1.1 : 1
            }}
          >
            {content.duration}
          </motion.span>
        </div>
        
        {/* Título y creador */}
        <motion.h3 
          className="text-2xl font-bold text-white mb-2"
          animate={{ 
            y: isHovered ? 0 : 5,
            textShadow: isHovered ? `0 0 15px ${content.accent}` : "0 2px 4px rgba(0,0,0,0.5)"
          }}
        >
          {content.title}
        </motion.h3>
        <motion.p 
          className="text-white/90 mb-4"
          animate={{ 
            opacity: isHovered ? 1 : 0.8,
            x: isHovered ? 0 : -2
          }}
        >
          por {content.creator}
        </motion.p>
        
        {/* Estadísticas */}
        <div className="flex justify-between mb-6">
          <motion.div 
            className="flex items-center"
            animate={{ 
              x: isHovered ? 0 : -5
            }}
          >
            <div className="w-3 h-3 rounded-full bg-[#aedd2b] mr-2 shadow-[0_0_8px_#aedd2b]"></div>
            <span className="text-white/90">{content.views} vistas</span>
          </motion.div>
          <motion.div 
            className="flex items-center"
            animate={{ 
              x: isHovered ? 0 : 5
            }}
          >
            <div className="w-3 h-3 rounded-full bg-[#ff6b35] mr-2 shadow-[0_0_8px_#ff6b35]"></div>
            <span className="text-white/90">{content.likes} likes</span>
          </motion.div>
        </div>
        
        {/* Botón de reproducción con efecto */}
        <motion.button
          className="w-full bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold py-3 rounded-full flex items-center justify-center group relative overflow-hidden"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onTap={() => setIsPlaying(true)}
          animate={{ 
            y: isHovered ? 0 : 10,
            opacity: isHovered ? 1 : 0.9,
            boxShadow: isHovered ? `0 5px 15px ${content.accent}80` : '0 4px 10px rgba(0,0,0,0.2)'
          }}
        >
          <span className="relative z-10 flex items-center">
            {isPlaying ? (
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="mr-2"
              >
                ⏸
              </motion.span>
            ) : (
              <span className="mr-2">▶</span>
            )}
            <span>{isPlaying ? "Pausar" : "Reproducir ahora"}</span>
          </span>
          <motion.span
            className="ml-2 relative z-10"
            animate={{ 
              x: isHovered ? [0, 5, 0] : 0
            }}
            transition={{ 
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            →
          </motion.span>
          
          {/* Efecto de onda al hacer hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ 
              x: isHovered ? "100%" : "-100%"
            }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          />
        </motion.button>
      </div>
      
      {/* Efecto de resplandor al hacer hover */}
      <motion.div 
        className="absolute inset-0 rounded-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          boxShadow: `0 0 40px ${content.accent}80`
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Efecto de ondas al reproducir */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-3xl border-2 border-[#aedd2b]"
                animate={{ 
                  scale: [1, 1.2],
                  opacity: [0.5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FilterButton = ({ filter, activeFilter, onClick }: { filter: any, activeFilter: string, onClick: () => void }) => {
  return (
    <motion.button
      className={`relative px-5 py-2.5 rounded-full transition-all overflow-hidden ${
        activeFilter === filter.id
          ? 'text-white'
          : 'text-[#012c4d] bg-white border border-[#012c4d]/20 hover:border-[#02416d]'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{filter.label}</span>
      
      {activeFilter === filter.id && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#02416d] to-[#012c4d] z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
};

const TrendingSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [content, setContent] = useState<any>(null);
  const ref = useRef<HTMLDivElement>(null);
  
  const filters = [
    { id: 'all', label: 'Todo' },
    { id: 'videos', label: 'Videos' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'documentaries', label: 'Documentales' },
    { id: 'audio', label: 'Audios' }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  return (
    <div ref={ref} className="container mx-auto px-4 py-24 relative overflow-hidden">
      {/* Fondo decorativo animado */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#aedd2b] rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#02416d] rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ 
            scale: [1, 0.9, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Globo terráqueo flotante */}
      <FloatingGlobe />
      
      <div className="text-center mb-16 relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#02416d] via-[#aedd2b] to-[#012c4d]">
            Tesoros Culturales en Tendencia
          </span>
        </motion.h2>
        
        <motion.div
          className="w-24 h-1.5 bg-gradient-to-r from-[#02416d] to-[#aedd2b] mx-auto rounded-full mb-8"
          initial={{ width: 0 }}
          animate={isVisible ? { width: "6rem" } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        
        <motion.p 
          className="mt-6 text-xl text-[#012c4d] max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Descubre las joyas culturales que están resonando en nuestra comunidad global
        </motion.p>
      </div>
      
      {/* Filtros */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        {filters.map((filter) => (
          <FilterButton 
            key={filter.id}
            filter={filter}
            activeFilter={activeFilter}
            onClick={() => setActiveFilter(filter.id)}
          />
        ))}
      </motion.div>
      
      {/* Grid de contenido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {trendingContent.slice(0, 4).map((content, index) => (
          <TrendingCard key={content.id} content={content} index={index} />
        ))}
        {/* Tarjeta especial para el quinto elemento en pantallas grandes */}
        <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
          {trendingContent[4] && <TrendingCard content={trendingContent[4]} index={4} />}
        </div>
      </div>
      
      {/* Ver más */}
      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <button className="relative overflow-hidden group border-2 border-[#02416d] text-[#02416d] font-bold py-3 px-8 rounded-full text-lg">
          <span className="relative z-10">Explorar más tesoros</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#02416d] to-[#012c4d] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            Sumergirse en la cultura
          </span>
        </button>
      </motion.div>
      
      {/* Elemento decorativo flotante */}
      <motion.div 
        className="absolute bottom-10 right-10 text-[#012c4d]/5 font-bold text-9xl rotate-12 pointer-events-none select-none hidden lg:block"
        animate={{ 
          rotate: [12, 15, 12],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        CULTURA
      </motion.div>
      
      {/* Elemento decorativo flotante izquierda */}
      <motion.div 
        className="absolute top-10 left-10 text-[#012c4d]/5 font-bold text-9xl -rotate-12 pointer-events-none select-none hidden lg:block"
        animate={{ 
          rotate: [-12, -15, -12],
          y: [0, 20, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        VOCES
      </motion.div>
    </div>
  );
};

export default TrendingSection;
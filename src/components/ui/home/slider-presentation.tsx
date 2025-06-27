'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  {
    id: 1,
    title: "Voces Ancestrales",
    description: "Preserva y comparte las tradiciones orales de tus antepasados",
    color: "#02416d",
    accent: "#aedd2b",
    icon: "🗣️",
    elements: ["📜", "👴", "🌅", "🔥"],
    orbitSize: 200,
    rotationSpeed: 0.005
  },
  {
    id: 2,
    title: "Ritmos Culturales",
    description: "Difunde la música y danzas que definen tu identidad",
    color: "#aedd2b",
    accent: "#02416d",
    icon: "🎵",
    elements: ["🥁", "💃", "🎭", "🎶"],
    orbitSize: 180,
    rotationSpeed: -0.006
  },
  {
    id: 3,
    title: "Saberes Milenarios",
    description: "Comparte conocimientos ancestrales con nuevas generaciones",
    color: "#012c4d",
    accent: "#aedd2b",
    icon: "🧠",
    elements: ["🌿", "⚗️", "📚", "🔍"],
    orbitSize: 220,
    rotationSpeed: 0.007
  },
  {
    id: 4,
    title: "Arte Vivo",
    description: "Exhibe las expresiones artísticas únicas de tu comunidad",
    color: "#9bc926",
    accent: "#02416d",
    icon: "🎨",
    elements: ["🖌️", "🏺", "🧵", "✂️"],
    orbitSize: 240,
    rotationSpeed: -0.004
  }
];

const FloatingCulture = ({ 
  category, 
  angle, 
  distance,
  rotation,
  isActive
}: {
  category: any;
  angle: number;
  distance: number;
  rotation: number;
  isActive: boolean;
}) => {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  
  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        zIndex: isActive ? 20 : 10
      }}
      animate={{
        scale: isActive ? [1, 1.2, 1] : 1,
        rotate: rotation
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl cursor-pointer ${
          isActive ? 'shadow-[0_0_40px_10px]' : 'shadow-[0_0_20px_5px]'
        }`}
        style={{
          backgroundColor: category.color,
          boxShadow: isActive 
            ? `0 0 40px 10px ${category.accent}80` 
            : `0 0 20px 5px ${category.color}60`,
        }}
        whileHover={{
          scale: 1.2,
          boxShadow: `0 0 50px 15px ${category.accent}`
        }}
        whileTap={{ scale: 0.9 }}
      >
        {category.icon}
      </motion.div>
    </motion.div>
  );
};

const SliderPresentation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  const [stars, setStars] = useState<any[]>([]);

  // Inicialización solo en el cliente
  useEffect(() => {
    setIsMounted(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    // Generar estrellas con posiciones fijas
    const newStars = Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3,
      opacity: Math.random() * 0.8 + 0.2
    }));
    setStars(newStars);
    
    // Generar partículas con posiciones fijas
    const colors = [categories[0].color, categories[1].accent, categories[2].color, categories[3].accent];
    const newParticles = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3
    }));
    setParticles(newParticles);

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animación rotacional
  useEffect(() => {
    if (!isPlaying || !isMounted) return;
    
    const animation = requestAnimationFrame(() => {
      setRotation(prev => prev + categories[currentIndex].rotationSpeed);
    });
    
    return () => cancelAnimationFrame(animation);
  }, [rotation, isPlaying, currentIndex, isMounted]);
  
  // Cambio automático de categoría
  useEffect(() => {
    if (!isPlaying || !isMounted) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % categories.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isPlaying, isMounted]);
  
  const goToCategory = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };
  
  if (!isMounted) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-[#000814] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-[#aedd2b] font-bold mb-4">Cargando Galaxia Cultural...</div>
          <div className="w-32 h-1 bg-gradient-to-r from-[#02416d] to-[#aedd2b] mx-auto rounded-full"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#000814] flex items-center justify-center"
    >
      {/* Fondo galáctico */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#001233] via-[#000814] to-[#000000]">
        {/* Estrellas con posiciones pre-generadas */}
        {stars.map(star => (
          <div 
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity
            }}
          />
        ))}
      </div>
      
      {/* Nebulosa central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[600px] h-[600px]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#02416d30] via-[#012c4d10] to-transparent blur-3xl animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#aedd2b20] to-transparent blur-xl" />
        </div>
      </div>
      
      {/* Culturas flotantes */}
      <div className="relative w-full h-full">
        {categories.map((category, index) => (
          <FloatingCulture
            key={category.id}
            category={category}
            angle={(index / categories.length) * Math.PI * 2 + rotation}
            distance={category.orbitSize}
            rotation={rotation * 100}
            isActive={index === currentIndex}
          />
        ))}
      </div>
      
      {/* Contenido central */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="text-center max-w-xl bg-black/30 backdrop-blur-xl p-8 rounded-3xl border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="text-8xl mb-6 inline-block"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.3, 1],
                textShadow: [
                  `0 0 0px ${categories[currentIndex].accent}`,
                  `0 0 30px ${categories[currentIndex].accent}`,
                  `0 0 0px ${categories[currentIndex].accent}`
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {categories[currentIndex].icon}
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#aedd2b]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {categories[currentIndex].title}
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {categories[currentIndex].description}
            </motion.p>
            
            <motion.div
              className="mt-8 pointer-events-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button className="relative overflow-hidden bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold py-3 px-8 rounded-full text-lg group">
                <span className="relative z-10">Explorar Cultura</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Elementos culturales orbitantes */}
      <div className="absolute inset-0">
        {categories[currentIndex].elements.map((element, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: '50%',
              top: '50%',
              x: -20,
              y: -20
            }}
            animate={{
              x: Math.cos((i / 4) * Math.PI * 2 + rotation * 5) * 100,
              y: Math.sin((i / 4) * Math.PI * 2 + rotation * 5) * 100,
              rotate: rotation * 20
            }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 100
            }}
          >
            {element}
          </motion.div>
        ))}
      </div>
      
      {/* Controles de navegación */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-40">
        <div className="flex items-center gap-4 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-[#aedd2b]/30">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => goToCategory(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex 
                  ? 'bg-[#aedd2b]' 
                  : 'bg-[#02416d]/50'
              }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.8 }}
              animate={index === currentIndex ? {
                scale: [1, 1.3, 1],
                backgroundColor: ["#aedd2b", "#9bc926", "#aedd2b"]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              aria-label={`Ir a ${category.title}`}
            />
          ))}
          
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="ml-4 text-[#aedd2b]"
            whileHover={{ scale: 1.2 }}
          >
            {isPlaying ? (
              <div className="flex items-center">
                <div className="w-2 h-4 bg-[#aedd2b] mx-[2px]"></div>
                <div className="w-2 h-4 bg-[#aedd2b] mx-[2px]"></div>
              </div>
            ) : (
              <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-[#aedd2b] border-r-0"></div>
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Rayos de conexión */}
      <svg className="absolute inset-0 pointer-events-none">
        {categories.map((_, index) => {
          if (index === currentIndex) return null;
          
          const angle = (index / categories.length) * Math.PI * 2 + rotation;
          const distance = categories[index].orbitSize;
          const x1 = Math.cos(angle) * distance + dimensions.width / 2;
          const y1 = Math.sin(angle) * distance + dimensions.height / 2;
          
          const currentAngle = (currentIndex / categories.length) * Math.PI * 2 + rotation;
          const currentDistance = categories[currentIndex].orbitSize;
          const x2 = Math.cos(currentAngle) * currentDistance + dimensions.width / 2;
          const y2 = Math.sin(currentAngle) * currentDistance + dimensions.height / 2;
          
          return (
            <motion.line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={categories[currentIndex].accent + "80"}
              strokeWidth="1"
              strokeDasharray="5,5"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                strokeWidth: [1, 2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            />
          );
        })}
      </svg>
      
      {/* Efecto de luz central */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#aedd2b30] via-transparent to-transparent blur-3xl pointer-events-none" />
      
      {/* Leyenda flotante */}
      <div className="absolute top-4 left-4 text-[#aedd2b]/70 text-sm font-mono">
        <motion.div
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            x: [0, 5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          Galaxia Cultural de Senda
        </motion.div>
      </div>
    </div>
  );
};

export default SliderPresentation;
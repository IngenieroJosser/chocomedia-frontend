'use client';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaPlay, FaHeadphones, FaFilm, FaShareAlt, FaGlobe } from 'react-icons/fa';

const categories = [
  {
    id: 1,
    title: "Voces en Video",
    description: "Historias visuales que capturan la esencia cultural",
    icon: <FaFilm className="text-4xl" />,
    color: "#02416d",
    items: 256,
    background: "bg-gradient-to-br from-[#02416d] to-[#012c4d]",
    accent: "#aedd2b"
  },
  {
    id: 2,
    title: "Conversaciones",
    description: "Diálogos íntimos que inspiran y conectan",
    icon: <FaMicrophone className="text-4xl" />,
    color: "#aedd2b",
    items: 189,
    background: "bg-gradient-to-br from-[#aedd2b] to-[#9bc926]",
    accent: "#02416d"
  },
  {
    id: 3,
    title: "Relatos Profundos",
    description: "Documentales que exploran tradiciones y comunidades",
    icon: <FaPlay className="text-4xl" />,
    color: "#012c4d",
    items: 124,
    background: "bg-gradient-to-br from-[#012c4d] to-[#001a2d]",
    accent: "#aedd2b"
  }
];

const VoiceWave = ({ isActive, color }: { isActive: boolean; color: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: `2px solid ${color}`,
            width: `${100 + i * 100}%`,
            height: `${100 + i * 100}%`,
          }}
          animate={{
            scale: isActive ? [0.8, 1.2] : 0.8,
            opacity: isActive ? [0.7, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isActive ? Infinity : 0,
            delay: i * 0.3,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

const FloatingVoice = () => {
  return (
    <motion.div
      className="absolute"
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 5, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <FaHeadphones className="text-2xl text-[#aedd2b]" />
    </motion.div>
  );
};

const VoiceParticles = ({ isActive, color }: { isActive: boolean; color: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: '50%',
            left: '50%',
            backgroundColor: color,
            width: 8,
            height: 8,
          }}
          animate={{
            x: isActive ? [0, Math.cos(i * 0.52) * 200] : 0,
            y: isActive ? [0, Math.sin(i * 0.52) * 200] : 0,
            opacity: isActive ? [1, 0] : 0,
            scale: isActive ? [0.5, 2] : 0.5,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

const CategoryCard = ({ category, index }: { category: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: 0,
            transition: { delay: index * 0.2, type: "spring", damping: 15 }
          });
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
  }, [controls, index]);

  // Reset click state after animation
  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => setIsClicked(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isClicked]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-3xl p-6 h-full ${category.background} backdrop-blur-xl bg-opacity-80 border border-white/10`}
      animate={controls}
      initial={{ opacity: 0, y: 50 }}
      whileHover={{ 
        zIndex: 10,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Voice wave effect */}
      <VoiceWave isActive={isHovered} color={category.accent} />
      
      {/* Voice particles on click */}
      <AnimatePresence>
        {isClicked && <VoiceParticles isActive={true} color={category.accent} />}
      </AnimatePresence>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <motion.div 
            className="p-3 rounded-full bg-black/20 backdrop-blur-md"
            animate={{ 
              rotate: isHovered ? [0, 15, -15, 0] : 0,
              scale: isHovered ? [1, 1.2, 1] : 1,
              backgroundColor: isHovered ? [category.color, category.accent] : category.color
            }}
            transition={{ duration: 1.2 }}
          >
            <div className="text-white">
              {category.icon}
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center"
            animate={{ 
              rotate: isHovered ? 360 : 0,
              backgroundColor: isHovered ? category.accent : "rgba(255,255,255,0.2)",
              color: isHovered ? (category.accent === "#aedd2b" ? "#02416d" : "white") : "white"
            }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <span className="font-bold">{category.items}</span>
          </motion.div>
        </div>
        
        <div className="flex-grow">
          <motion.h3 
            className="text-2xl font-bold text-white mb-3"
            animate={{ 
              textShadow: isHovered ? `0 0 15px ${category.accent}` : "none",
              x: isHovered ? [0, 5, -5, 0] : 0
            }}
            transition={{ duration: 1.5 }}
          >
            {category.title}
          </motion.h3>
          <motion.p 
            className="text-white/90 mb-8"
            animate={{ 
              opacity: isHovered ? 1 : 0.8,
              y: isHovered ? 0 : 5
            }}
          >
            {category.description}
          </motion.p>
        </div>
        
        <motion.div
          className="mt-auto"
          animate={{ 
            opacity: isHovered ? 1 : 0.8,
            y: isHovered ? 0 : 5
          }}
        >
          <motion.button
            className="relative overflow-hidden bg-white text-[#02416d] font-bold py-3 px-8 rounded-full group w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsClicked(true)}
            initial={false}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FaHeadphones /> Escuchar Historias
            </span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ 
                x: isHovered ? "100%" : "-100%"
              }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop" }}
            />
          </motion.button>
        </motion.div>
      </div>
      
      {/* Floating voices */}
      {isHovered && (
        <>
          <FloatingVoice />
          <motion.div 
            className="absolute top-1/4 right-4"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          >
            <FaHeadphones className="text-xl text-white/80" />
          </motion.div>
          <motion.div 
            className="absolute bottom-1/3 left-6"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 0.8 }}
          >
            <FaHeadphones className="text-xl text-white/80" />
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

const GlobalStage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const globeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!globeRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!globeRef.current) return;
      
      const rect = globeRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      globeRef.current.style.setProperty('--x', `${x}%`);
      globeRef.current.style.setProperty('--y', `${y}%`);
    };
    
    globeRef.current.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (globeRef.current) {
        globeRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  return (
    <motion.div 
      className="mt-16 md:mt-24 bg-gradient-to-r from-[#012c4d] to-[#02416d] rounded-3xl p-8 text-white overflow-hidden relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {/* Connection lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#aedd2b] to-transparent"
            style={{ top: `${10 + i * 10}%` }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              x: [0, 20, 0]
            }}
            transition={{ 
              duration: 3 + i, 
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </div>
      
      {/* Floating connection dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-[#aedd2b]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 2 + Math.random() * 3, 
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
      
      <div className="relative z-10 flex flex-col md:flex-row items-center">
        <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
          <motion.h3 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Tu voz en el <span className="text-[#aedd2b]">escenario global</span>
          </motion.h3>
          
          <motion.p 
            className="mb-8 text-white/90 text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Conecta con una audiencia mundial. Comparte tu cultura, tradiciones e historias únicas a través de nuestra plataforma.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <motion.button
              className="relative overflow-hidden bg-[#aedd2b] text-[#02416d] font-bold py-3 px-6 rounded-full group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <span className="relative z-10 flex items-center gap-2">
                <FaShareAlt /> Compartir Historia
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            </motion.button>
            
            <button className="bg-transparent border-2 border-[#aedd2b] text-[#aedd2b] font-bold py-3 px-6 rounded-full hover:bg-[#aedd2b]/10 transition-colors">
              Explorar Comunidad
            </button>
          </motion.div>
        </div>
        
        <motion.div 
          className="md:w-1/3 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div 
            ref={globeRef}
            className="relative w-48 h-48 rounded-full bg-gradient-to-b from-[#02416d] to-[#012c4d] border-4 border-[#aedd2b]/30 flex items-center justify-center shadow-xl"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(20deg)',
              background: `
                radial-gradient(circle at var(--x, 50%) var(--y, 50%), 
                rgba(174, 221, 43, 0.3) 0%, 
                transparent 70%),
                radial-gradient(circle at center, #02416d 0%, #012c4d 100%)
              `
            }}
          >
            <FaGlobe className="text-5xl text-[#aedd2b]" />
            
            {/* Floating voices around the globe */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#aedd2b] w-8 h-8 flex items-center justify-center text-white"
                style={{
                  transform: `rotateY(${i * 60}deg) translateZ(100px)`,
                  transformStyle: 'preserve-3d'
                }}
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <FaMicrophone className="text-sm" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Voice connection effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#aedd2b] to-transparent"
                style={{ top: `${10 + i * 10}%` }}
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CategoriesGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [voices, setVoices] = useState<{id: number, x: number, y: number}[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          
          // Create floating voices
          const newVoices = [];
          for (let i = 0; i < 15; i++) {
            newVoices.push({
              id: i,
              x: Math.random() * 100,
              y: Math.random() * 100
            });
          }
          setVoices(newVoices);
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 relative overflow-hidden min-h-screen">
      {/* Floating voices in background */}
      {voices.map(voice => (
        <motion.div
          key={voice.id}
          className="absolute text-[#aedd2b]"
          style={{
            left: `${voice.x}%`,
            top: `${voice.y}%`,
          }}
          animate={{ 
            y: [0, -20, 0],
            x: [0, voice.id % 2 === 0 ? 10 : -10, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 8 + voice.id,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaMicrophone />
        </motion.div>
      ))}
      
      {/* Animated title */}
      <div className="text-center mb-16 relative z-10">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#02416d] via-[#aedd2b] to-[#012c4d]">
            Voces que Resuenan
          </span>
        </motion.h1>
        
        <motion.div
          className="w-32 h-1 bg-gradient-to-r from-[#02416d] to-[#aedd2b] mx-auto rounded-full mb-8"
          initial={{ width: 0 }}
          animate={{ width: "8rem" }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        
        <motion.p 
          className="mt-8 text-xl text-[#012c4d] max-w-3xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Descubre, comparte y amplifica historias culturales que merecen ser escuchadas en todo el mundo
        </motion.p>
        
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <button className="bg-gradient-to-r from-[#02416d] to-[#012c4d] text-white font-bold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-[#02416d]/30 transition-all">
            Unirse a la Comunidad
          </button>
        </motion.div>
      </div>

      <motion.div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </motion.div>
      
      <GlobalStage />
      
      {/* Cultural echo footer */}
      <motion.div 
        className="mt-24 text-center text-[#012c4d] relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="text-6xl font-bold mb-4">CulturaVoz</div>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Donde cada voz encuentra su eco y cada historia su audiencia
        </p>
        
        <div className="h-px bg-gradient-to-r from-transparent via-[#02416d] to-transparent w-1/2 mx-auto my-12"></div>
        
        <div className="flex justify-center gap-8 mb-4">
          {['🌎', '🎤', '🎧', '📢', '🗣️', '👂'].map((icon, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 3 + i, 
                repeat: Infinity,
                delay: i * 0.3
              }}
              className="text-3xl"
            >
              {icon}
            </motion.div>
          ))}
        </div>
        
        <p className="text-sm opacity-70">
          Conectando culturas a través de historias compartidas
        </p>
      </motion.div>
    </div>
  );
};

export default CategoriesGrid;
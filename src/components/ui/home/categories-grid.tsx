'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const categories = [
  {
    id: 1,
    title: "Videos",
    description: "Explora contenido visual que captura la esencia cultural",
    icon: "🎬",
    color: "#02416d",
    items: 256,
    background: "bg-gradient-to-br from-[#02416d] to-[#012c4d]",
    accent: "#aedd2b"
  },
  {
    id: 2,
    title: "Podcasts",
    description: "Sumérgete en historias y conversaciones que inspiran",
    icon: "🎙️",
    color: "#aedd2b",
    items: 189,
    background: "bg-gradient-to-br from-[#aedd2b] to-[#9bc926]",
    accent: "#02416d"
  },
  {
    id: 3,
    title: "Documentales",
    description: "Descubre relatos profundos sobre tradiciones y comunidades",
    icon: "🎞️",
    color: "#012c4d",
    items: 124,
    background: "bg-gradient-to-br from-[#012c4d] to-[#001a2d]",
    accent: "#aedd2b"
  }
];

const CategoryCard = ({ category, index }: { category: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start({
            opacity: 1,
            y: 0,
            transition: { delay: index * 0.2 }
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

  // Efecto de luz pulsante al hacer hover
  useEffect(() => {
    if (isHovered) {
      controls.start({
        boxShadow: [`0 0 0px ${category.accent}40`, `0 0 40px ${category.accent}80`, `0 0 0px ${category.accent}40`],
        transition: { 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }
      });
    } else {
      controls.start({ boxShadow: "0 0 0px rgba(0,0,0,0)" });
    }
  }, [isHovered, controls, category.accent]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl p-6 h-full ${category.background} backdrop-blur-sm bg-opacity-90 border border-white/10`}
      animate={controls}
      initial={{ opacity: 0, y: 50 }}
      whileHover={{ 
        scale: 1.03,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      }}
    >
      {/* Efecto de luz dinámico */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"
        animate={{ 
          x: isHovered ? [0, 100, 0] : 0,
          y: isHovered ? [0, 50, 0] : 0,
          opacity: isHovered ? [0.1, 0.3, 0.1] : 0
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Partículas flotantes */}
      {isHovered && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/30"
              initial={{ 
                width: 0, 
                height: 0, 
                opacity: 0,
                x: Math.random() * 100,
                y: Math.random() * 100
              }}
              animate={{ 
                width: Math.random() * 40 + 10, 
                height: Math.random() * 40 + 10, 
                opacity: [0, 0.3, 0],
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}
      
      {/* Contenido */}
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <motion.div 
              className="text-5xl mb-4 inline-block"
              animate={{ 
                rotate: isHovered ? [0, 10, -10, 5, 0] : 0,
                scale: isHovered ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 0.8 }}
            >
              {category.icon}
            </motion.div>
            <motion.h3 
              className="text-2xl font-bold text-white"
              animate={{ 
                x: isHovered ? [0, 5, 0] : 0,
                textShadow: isHovered ? [`0 0 0px ${category.accent}`, `0 0 10px ${category.accent}`, `0 0 0px ${category.accent}`] : "none"
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {category.title}
            </motion.h3>
            <motion.p 
              className="mt-2 text-white/90"
              animate={{ opacity: isHovered ? 1 : 0.8 }}
            >
              {category.description}
            </motion.p>
          </div>
          
          <motion.div 
            className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center"
            animate={{ 
              rotate: isHovered ? 360 : 0,
              backgroundColor: isHovered ? category.accent : "rgba(255,255,255,0.2)",
              color: isHovered ? (category.accent === "#aedd2b" ? "#02416d" : "white") : "white"
            }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-bold">{category.items}</span>
          </motion.div>
        </div>
        
        <motion.div
          className="mt-6"
          animate={{ 
            opacity: isHovered ? 1 : 0.8,
            y: isHovered ? 0 : 5
          }}
        >
          <motion.button
            className="relative overflow-hidden bg-white text-[#02416d] font-bold py-3 px-8 rounded-full group"
            whileHover={{ scale: 1.05 }}
            initial={false}
          >
            <span className="relative z-10">Explorar</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ 
                x: isHovered ? "100%" : "-100%"
              }}
              transition={{ duration: 0.8 }}
            />
          </motion.button>
        </motion.div>
      </div>
      
      {/* Patrón decorativo animado */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full"
          animate={{ 
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.2, 0.4, 0.2] : 0.2
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-4 left-4 w-8 h-8 border-2 border-white rounded-full"
          animate={{ 
            scale: isHovered ? [1, 0.8, 1] : 1,
            opacity: isHovered ? [0.2, 0.4, 0.2] : 0.2
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

const CategoriesGrid = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
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
    <div className="container mx-auto px-4 py-16 relative">
      {/* Efecto de fondo decorativo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#aedd2b] rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#02416d] rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="text-center mb-16 relative">
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#aedd2b] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-[#02416d] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explora Nuestras Categorías
        </motion.h2>
        
        <motion.div
          className="w-24 h-1 bg-[#aedd2b] mx-auto rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        
        <motion.p 
          className="mt-8 text-xl text-[#012c4d] max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Descubre una amplia variedad de contenido cultural en diferentes formatos
        </motion.p>
      </div>

      <motion.div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </motion.div>
      
      {/* Sección para creadores con efecto 3D */}
      <motion.div 
        className="mt-24 bg-gradient-to-r from-[#012c4d] to-[#02416d] rounded-2xl p-8 text-white overflow-hidden relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Efecto de profundidad 3D */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
        
        {/* Elementos flotantes */}
        <div className="absolute top-1/4 right-8 w-16 h-16 rounded-lg bg-[#aedd2b]/20 backdrop-blur-sm rotate-12 shadow-lg"></div>
        <div className="absolute bottom-1/3 left-8 w-12 h-12 rounded-lg bg-[#aedd2b]/20 backdrop-blur-sm -rotate-12 shadow-lg"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
            <motion.h3 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span className="text-[#aedd2b]">Comparte</span> tu cultura con el mundo
            </motion.h3>
            
            <motion.p 
              className="mb-6 text-white/90"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Sube tus videos, podcasts o documentales y conéctate con una audiencia global. Nuestra plataforma está diseñada para dar visibilidad a voces auténticas.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <button className="relative overflow-hidden bg-[#aedd2b] text-[#02416d] font-bold py-3 px-8 rounded-full group">
                <span className="relative z-10">Comenzar a publicar</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              </button>
            </motion.div>
          </div>
          
          <motion.div 
            className="md:w-1/3 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="relative">
              <div className="w-48 h-48 rounded-full bg-[#aedd2b]/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <div className="w-32 h-32 rounded-full bg-[#aedd2b]/40 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <div className="w-20 h-20 rounded-full bg-[#aedd2b] flex items-center justify-center text-3xl border-2 border-white shadow-lg">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 5, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      ✨
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Elementos orbitantes */}
              {["🎥", "🎙️", "🎞️", "📹"].map((icon, i) => (
                <motion.div
                  key={i}
                  className="absolute w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-xl border border-white/20"
                  animate={{
                    rotate: [0, 360],
                    x: `${Math.cos(i * 1.57) * 100}px`,
                    y: `${Math.sin(i * 1.57) * 100}px`
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Texto decorativo flotante */}
      <motion.div 
        className="absolute top-1/2 left-4 text-[#012c4d]/5 font-bold text-9xl -rotate-90 pointer-events-none select-none"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        CULTURAVOZ
      </motion.div>
    </div>
  );
};

export default CategoriesGrid;
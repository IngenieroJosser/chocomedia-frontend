'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const categories = [
  {
    id: 1,
    title: "Voces Ancestrales",
    description: "Preserva y comparte las tradiciones orales de tus antepasados",
    color: "#02416d",
    accent: "#aedd2b",
    elements: ["📜", "👴", "🌅", "🔥"],
    orbitSize: 200,
    rotationSpeed: 0.005,
    symbol: (
      <svg viewBox="0 0 100 100" className="w-16 h-16">
        <path d="M20,50 Q50,30 80,50 Q50,70 20,50" fill="none" stroke="#aedd2b" strokeWidth="2" />
        <circle cx="50" cy="50" r="8" fill="#02416d" />
        <path d="M40,50 L60,50" stroke="#aedd2b" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Ritmos Culturales",
    description: "Difunde la música y danzas que definen tu identidad",
    color: "#aedd2b",
    accent: "#02416d",
    elements: ["🥁", "💃", "🎭", "🎶"],
    orbitSize: 180,
    rotationSpeed: -0.006,
    symbol: (
      <svg viewBox="0 0 100 100" className="w-16 h-16">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#02416d" strokeWidth="2" />
        <rect x="40" y="30" width="20" height="40" rx="2" fill="#aedd2b" />
        <line x1="40" y1="40" x2="30" y2="30" stroke="#02416d" strokeWidth="2" />
        <line x1="60" y1="40" x2="70" y2="30" stroke="#02416d" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Saberes Milenarios",
    description: "Comparte conocimientos ancestrales con nuevas generaciones",
    color: "#012c4d",
    accent: "#aedd2b",
    elements: ["🌿", "⚗️", "📚", "🔍"],
    orbitSize: 220,
    rotationSpeed: 0.007,
    symbol: (
      <svg viewBox="0 0 100 100" className="w-16 h-16">
        <polygon points="50,10 80,35 65,70 35,70 20,35" fill="none" stroke="#aedd2b" strokeWidth="2" />
        <circle cx="50" cy="50" r="15" fill="#012c4d" />
        <path d="M50,35 L50,65" stroke="#aedd2b" strokeWidth="2" />
        <path d="M35,50 L65,50" stroke="#aedd2b" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Arte Vivo",
    description: "Exhibe las expresiones artísticas únicas de tu comunidad",
    color: "#9bc926",
    accent: "#02416d",
    elements: ["🖌️", "🏺", "🧵", "✂️"],
    orbitSize: 240,
    rotationSpeed: -0.004,
    symbol: (
      <svg viewBox="0 0 100 100" className="w-16 h-16">
        <path d="M30,40 C40,20 60,20 70,40 C80,60 60,80 40,80 C20,80 20,60 30,40" 
              fill="none" stroke="#02416d" strokeWidth="2" />
        <path d="M40,50 L60,50 M50,40 L50,60" stroke="#9bc926" strokeWidth="2" />
        <circle cx="35" cy="35" r="3" fill="#02416d" />
        <circle cx="65" cy="35" r="3" fill="#02416d" />
        <circle cx="65" cy="65" r="3" fill="#02416d" />
        <circle cx="35" cy="65" r="3" fill="#02416d" />
      </svg>
    )
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
        className={`w-24 h-24 rounded-full flex items-center justify-center cursor-pointer ${
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
        {category.symbol}
      </motion.div>
    </motion.div>
  );
};

const CulturalPattern = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <svg width="100%" height="100%" className="pattern">
        <defs>
          <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0,0 L100,100 M100,0 L0,100" stroke="#aedd2b" strokeWidth="1" />
            <circle cx="50" cy="50" r="10" fill="#02416d" fillOpacity="0.2" />
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="#012c4d" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
      </svg>
    </div>
  );
};

const SliderPresentation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [textureElements, setTextureElements] = useState<any[]>([]);
  const router = useRouter();
  
  useEffect(() => {
    setIsMounted(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    // Generar elementos de textura cultural
    const colors = [categories[0].color, categories[1].accent, categories[2].color, categories[3].accent];
    const shapes = ['circle', 'triangle', 'square', 'diamond'];
    
    const newElements = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 20 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.4 + 0.1
    }));
    setTextureElements(newElements);

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
          <div className="text-4xl text-[#aedd2b] font-bold mb-4">Cargando Sabiduría Ancestral...</div>
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
      {/* Fondo texturizado con patrones culturales */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#001233] via-[#000814] to-[#000000]">
        <CulturalPattern />
        
        {/* Elementos de textura cultural */}
        {textureElements.map(el => (
          <motion.div 
            key={el.id}
            className="absolute"
            style={{
              left: `${el.left}%`,
              top: `${el.top}%`,
              width: `${el.size}px`,
              height: `${el.size}px`,
              opacity: el.opacity,
              rotate: `${el.rotation}deg`,
              backgroundColor: el.color
            }}
            animate={{
              rotate: el.rotation + 360,
              opacity: [el.opacity, el.opacity * 0.5, el.opacity]
            }}
            transition={{
              duration: 20 + Math.random() * 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
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
      
      {/* Contenido central - Tarjeta de arte textil */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="text-center max-w-xl bg-[#001525] backdrop-blur-xl p-8 rounded-xl border-2"
            style={{
              borderColor: categories[currentIndex].accent,
              boxShadow: `0 0 30px ${categories[currentIndex].accent}40`,
              backgroundImage: `linear-gradient(to bottom, #001525, #000b17)`
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.7 }}
          >
            {/* Decoración de borde */}
            <div className="absolute -top-2 left-4 right-4 h-2 flex justify-between">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: categories[currentIndex].accent }} />
              ))}
            </div>
            
            <motion.div 
              className="mb-6 inline-block"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.2, 1],
                filter: [
                  `drop-shadow(0 0 0px ${categories[currentIndex].accent})`,
                  `drop-shadow(0 0 20px ${categories[currentIndex].accent})`,
                  `drop-shadow(0 0 0px ${categories[currentIndex].accent})`
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {categories[currentIndex].symbol}
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ 
                color: '#f0f0f0',
                textShadow: `0 0 10px ${categories[currentIndex].accent}`
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {categories[currentIndex].title}
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/80 max-w-2xl mx-auto"
              style={{ fontStyle: 'italic' }}
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
              <button 
                className="cursor-pointer relative overflow-hidden py-3 px-8 rounded-full text-lg group border-2"
                style={{ 
                  borderColor: categories[currentIndex].accent,
                  backgroundColor: `${categories[currentIndex].color}20`,
                  color: '#f0f0f0'
                }}
                onClick={() => router.push('/explore')}
              >
                <span className="relative z-10 font-bold">Explorar Sabiduría</span>
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                  style={{ backgroundColor: `${categories[currentIndex].accent}30` }} 
                />
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
              y: -20,
              color: categories[currentIndex].accent
            }}
            animate={{
              x: Math.cos((i / 4) * Math.PI * 2 + rotation * 5) * 120,
              y: Math.sin((i / 4) * Math.PI * 2 + rotation * 5) * 120,
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
      
      {/* Controles de navegación - Collar de cuentas */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-40">
        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border" style={{ borderColor: categories[currentIndex].accent }}>
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => goToCategory(index)}
              className={`w-4 h-4 rounded-full ${
                index === currentIndex 
                  ? 'bg-[#aedd2b]' 
                  : 'bg-[#02416d]'
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
            className="ml-4"
            style={{ color: categories[currentIndex].accent }}
            whileHover={{ scale: 1.2 }}
          >
            {isPlaying ? (
              <div className="flex items-center">
                <div className="w-2 h-4 mx-[2px]" style={{ backgroundColor: categories[currentIndex].accent }}></div>
                <div className="w-2 h-4 mx-[2px]" style={{ backgroundColor: categories[currentIndex].accent }}></div>
              </div>
            ) : (
              <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-r-0" 
                   style={{ borderLeftColor: categories[currentIndex].accent }}></div>
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Rayos de conexión - Hilos de telar */}
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
      
      {/* Efecto de luz central - Sol cultural */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${categories[currentIndex].accent}30 0%, transparent 70%)`,
          filter: 'blur(30px)'
        }}
      />
      
      {/* Leyenda flotante */}
      <div className="absolute top-4 left-4 text-sm font-mono z-40">
        <motion.div
          className="px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border"
          style={{ 
            color: categories[currentIndex].accent,
            borderColor: categories[currentIndex].accent
          }}
          animate={{ 
            opacity: [0.7, 1, 0.7],
            x: [0, 5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          Sabiduría Ancestral de Senda
        </motion.div>
      </div>
      
      {/* Decoración de esquina superior derecha */}
      <div className="absolute top-8 right-8 z-40">
        <svg width="60" height="60" viewBox="0 0 100 100">
          <path d="M80,20 L95,20 L95,35 L80,20" fill="none" stroke={categories[currentIndex].accent} strokeWidth="2" />
          <path d="M80,20 L80,40 L60,40" fill="none" stroke={categories[currentIndex].accent} strokeWidth="2" />
          <circle cx="85" cy="25" r="2" fill={categories[currentIndex].accent} />
          <circle cx="70" cy="35" r="2" fill={categories[currentIndex].accent} />
        </svg>
      </div>
      
      {/* Decoración de esquina inferior izquierda */}
      <div className="absolute bottom-8 left-8 z-40">
        <svg width="60" height="60" viewBox="0 0 100 100">
          <path d="M20,80 L5,80 L5,65 L20,80" fill="none" stroke={categories[currentIndex].accent} strokeWidth="2" />
          <path d="M20,80 L20,60 L40,60" fill="none" stroke={categories[currentIndex].accent} strokeWidth="2" />
          <circle cx="15" cy="75" r="2" fill={categories[currentIndex].accent} />
          <circle cx="30" cy="65" r="2" fill={categories[currentIndex].accent} />
        </svg>
      </div>
    </div>
  );
};

export default SliderPresentation;
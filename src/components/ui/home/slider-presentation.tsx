'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SliderPresentation = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeView, setActiveView] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Patrones culturales inspirados en el Chocó
  const culturalPatterns = [
    "M25,25 C35,15 45,25 35,35 C25,45 15,35 25,25 Z", // Patrón de tambores
    "M10,50 Q25,10 40,50 T70,50", // Patrón de ríos
    "M20,20 L40,20 L40,40 L20,40 Z", // Patrón de tejidos
    "M30,10 C50,10 50,40 30,40 C10,40 10,10 30,10 Z" // Patrón de máscaras
  ];

  // Símbolos culturales del Chocó
  const culturalSymbols = [
    "🥁", "🌿", "🌊", "🛶", "🎭", "🔥", "🏺", "🌴", 
    "🐦", "🐒", "🎶", "💃", "👑", "🌅", "🏞️", "🌺"
  ];

  // Vistas de la presentación cultural
  const views = [
    {
      title: "RITMO ANCESTRAL",
      description: "El tambor que late en el corazón de nuestra identidad afrochocoana",
      color: "#02416d",
      accent: "#aedd2b"
    },
    {
      title: "RÍOS DE VIDA",
      description: "Las venas acuáticas que nutren nuestra biodiversidad única",
      color: "#aedd2b",
      accent: "#02416d"
    },
    {
      title: "SABERES MILENARIOS",
      description: "Conocimientos ancestrales que tejen nuestra memoria colectiva",
      color: "#012c4d",
      accent: "#aedd2b"
    },
    {
      title: "80% BIODIVERSIDAD. 300 ESPECIES ÚNICAS.",
      description: "El Chocó biogeográfico, joya natural del planeta",
      color: "#9bc926",
      accent: "#02416d"
    }
  ];

  // Inicializar componente
  useEffect(() => {
    setIsMounted(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Avance automático de vistas
  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      setActiveView(prev => (prev + 1) % views.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isMounted, views.length]);

  if (!isMounted) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-[#000814] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="text-6xl mb-4 text-[#aedd2b]"
          >
            🌿
          </motion.div>
          <div className="text-3xl text-[#aedd2b] font-bold mb-6 font-serif">Cargando Saberes del Chocó...</div>
          <div className="w-64 h-1 bg-[#02416d] mx-auto rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#02416d] via-[#aedd2b] to-[#9bc926]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 6, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    );
  }

  const currentView = views[activeView];
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#000814] flex items-center justify-center"
    >
      {/* Patrón cultural de fondo */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern 
            id="culturalPattern" 
            width="120" 
            height="120" 
            patternUnits="userSpaceOnUse"
          >
            <motion.path
              d={culturalPatterns[activeView]}
              fill="none"
              stroke={currentView.accent}
              strokeWidth="1"
              animate={{ d: culturalPatterns[(activeView + 1) % culturalPatterns.length] }}
              transition={{ duration: 5, ease: "easeInOut" }}
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#culturalPattern)" />
        </svg>
      </div>
      
      {/* Elementos culturales flotantes */}
      <div className="absolute inset-0">
        {culturalSymbols.map((symbol, index) => (
          <motion.div
            key={index}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: currentView.accent
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotate: [0, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>
      
      {/* Contenido central */}
      <div className="relative z-20 text-center max-w-4xl px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="mb-12"
          >
            <motion.h5 
              className="text-5xl mt-4 md:text-7xl lg:text-8xl font-bold mb-6 text-white font-serif"
              animate={{ 
                textShadow: [
                  `0 0 0px ${currentView.accent}`,
                  `0 0 20px ${currentView.accent}`,
                  `0 0 0px ${currentView.accent}`
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {currentView.title}
            </motion.h5>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-sans italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentView.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
        
        {/* Estadísticas culturales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto">
            <motion.div
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl font-bold text-[#aedd2b] mb-2">80%</div>
              <div className="text-white/80">Biodiversidad mundial</div>
            </motion.div>
            
            <motion.div
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl font-bold text-[#aedd2b] mb-2">300+</div>
              <div className="text-white/80">Especies endémicas</div>
            </motion.div>
          </div>
          
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <button className="relative overflow-hidden bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold py-4 px-10 rounded-full text-lg group shadow-xl hover:shadow-2xl transition-all duration-300">
              <span className="relative z-10 font-bold tracking-wide">Explorar Cultura</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Visualización de ríos chocoanos */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-20">
        <motion.div
          className="absolute inset-0 rounded-full border border-[#aedd2b]/20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: 360
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border border-[#02416d]/30"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: -360
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div
          className="absolute inset-16 rounded-full border border-[#9bc926]/30"
          animate={{ 
            scale: [1, 1.4, 1],
            rotate: 360
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>
      
      {/* Controles de navegación */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30">
        <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-[#aedd2b]/30">
          {views.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveView(index)}
              className={`w-3 h-3 rounded-full relative ${
                index === activeView 
                  ? 'bg-[#aedd2b]' 
                  : 'bg-[#02416d]/50'
              }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.8 }}
              animate={index === activeView ? {
                scale: [1, 1.3, 1],
                backgroundColor: ["#aedd2b", "#9bc926", "#aedd2b"]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {index === activeView && (
                <motion.div
                  className="absolute inset-0 rounded-full border border-[#aedd2b]"
                  animate={{ 
                    scale: [1, 1.8], 
                    opacity: [1, 0] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Elementos decorativos culturales */}
      <div className="absolute top-8 left-8 text-4xl text-[#aedd2b]/20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          🥁
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 right-8 text-4xl text-[#02416d]/20">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          🌊
        </motion.div>
      </div>
      
      {/* Efectos de luz */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#aedd2b10] via-transparent to-transparent blur-3xl pointer-events-none" />
      
      {/* Textura de agua */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCI+PHBhdGggZD0iTTAgMzBDMTAgMTAgMzAgNDAgNTAgMzBDNzAgMjAgOTAgNDAgMTAwIDMwVjEwMEgwVjMwWiIgZmlsbD0iIzAyNGM0ZCIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-30" />
    </div>
  );
};

export default SliderPresentation;
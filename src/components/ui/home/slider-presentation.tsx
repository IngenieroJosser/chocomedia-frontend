'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: "Conecta con tu cultura",
    description: "Comparte audios y videos que representen la esencia de tu comunidad",
    color: "#02416d"
  },
  {
    id: 2,
    title: "Inspira a través de la voz",
    description: "Llega a audiencias globales con tus historias y conocimientos",
    color: "#aedd2b"
  },
  {
    id: 3,
    title: "Crea tu espacio digital",
    description: "Un lugar único para artistas, educadores y líderes culturales",
    color: "#012c4d"
  },
  {
    id: 4,
    title: "Descubre nuevas voces",
    description: "Explora contenidos culturales de todo el mundo",
    color: "#9bc926"
  }
];

const SliderPresentation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Navegación
  const nextSlide = () => {
    setDirection('right');
    setCurrentIndex(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection('left');
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  // Autoplay
  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Detener autoplay al interactuar
  const pauseSlider = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsHovering(true);
  };

  const resumeSlider = () => {
    intervalRef.current = setInterval(nextSlide, 5000);
    setIsHovering(false);
  };

  // Crear partículas mágicas
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const createParticle = () => {
      if (!isHovering || !particlesRef.current) return;
      
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full";
      
      // Tamaño aleatorio entre 2px y 6px
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Color aleatorio entre los tonos de la marca
      const colors = ["#aedd2b", "#9bc926", "#c5f04a", "#ffffff"];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Posición aleatoria dentro del slider
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Animación
      particle.animate(
        [
          { opacity: 1, transform: "scale(1)" },
          { opacity: 0, transform: "scale(3)" }
        ],
        {
          duration: Math.random() * 2000 + 1000,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)"
        }
      ).onfinish = () => particle.remove();
      
      particlesRef.current.appendChild(particle);
    };
    
    let interval: NodeJS.Timeout;
    if (isHovering) {
      interval = setInterval(createParticle, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering]);

  // Solución: Definir las variantes sin la propiedad ease problemática
  const slideVariants = {
    hiddenRight: {
      x: '100%',
      opacity: 0,
      scale: 0.8
    },
    hiddenLeft: {
      x: '-100%',
      opacity: 0,
      scale: 0.8
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div 
      className="relative w-full h-[70vh] overflow-hidden rounded-3xl bg-[#012c4d]"
      onMouseEnter={pauseSlider}
      onMouseLeave={resumeSlider}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial={direction === 'right' ? 'hiddenRight' : 'hiddenLeft'}
          animate="visible"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center"
        >
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#012c4d] to-[#02416d]"
            style={{ backgroundColor: slides[currentIndex].color }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" />
          </div>
          
          <div className="relative z-10 max-w-4xl px-8 text-center">
            <motion.h2 
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {slides[currentIndex].title}
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {slides[currentIndex].description}
            </motion.p>
            <motion.button
              className="bg-[#aedd2b] hover:bg-[#9bc926] text-[#02416d] font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(174, 221, 43, 0.8)"
              }}
            >
              Comenzar ahora
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Controles de navegación */}
      <button 
        className="absolute left-4 top-1/2 z-20 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-colors"
        onClick={prevSlide}
        aria-label="Anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        className="absolute right-4 top-1/2 z-20 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-colors"
        onClick={nextSlide}
        aria-label="Siguiente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Indicadores */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-20">
        {slides.map((slide, index) => (
          <button 
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#aedd2b] w-8' 
                : 'bg-white/50'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Efecto de partículas */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none" />
      
      {/* Efecto de ondas */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <div className="absolute -bottom-10 left-0 right-0 h-40 bg-[#aedd2b]/10 rounded-t-full"></div>
        <div className="absolute -bottom-20 left-0 right-0 h-40 bg-[#aedd2b]/20 rounded-t-full"></div>
        <div className="absolute -bottom-30 left-0 right-0 h-40 bg-[#aedd2b]/30 rounded-t-full"></div>
      </div>
      
      {/* Decoración de esquinas */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#aedd2b] rounded-tl-xl" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#aedd2b] rounded-tr-xl" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#aedd2b] rounded-bl-xl" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#aedd2b] rounded-br-xl" />
    </div>
  );
};

export default SliderPresentation;
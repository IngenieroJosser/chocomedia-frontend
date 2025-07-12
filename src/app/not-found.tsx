'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stars, setStars] = useState<{x: number, y: number, size: number, speed: number}[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [astronautPosition, setAstronautPosition] = useState({ x: 0, y: 0 });
  const [planetRotation, setPlanetRotation] = useState(0);

  useEffect(() => {
    // Inicializar estrellas
    const newStars = [];
    for (let i = 0; i < 200; i++) {
      newStars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3,
        speed: Math.random() * 0.5
      });
    }
    setStars(newStars);
    
    // Configurar movimiento del astronauta con el mouse
    const handleMouseMove = (e: MouseEvent) => {
      setAstronautPosition({
        x: e.clientX - 50,
        y: e.clientY - 50
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animación continua del planeta
    const rotationInterval = setInterval(() => {
      setPlanetRotation(prev => (prev + 0.2) % 360);
    }, 50);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(rotationInterval);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Configurar canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Función para animar estrellas
    const animateStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fondo espacial con gradiente
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#001a2d');
      gradient.addColorStop(1, '#012c4d');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar estrellas
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        // Actualizar posición para efecto de movimiento
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      
      requestAnimationFrame(animateStars);
    };
    
    animateStars();
    
    // Ajustar canvas al redimensionar
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [stars]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#001a2d] to-[#012c4d] text-white">
      {/* Canvas para fondo espacial */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
      
      {/* Planeta flotante */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-b from-[#02416d] to-[#013258] shadow-[0_0_60px_10px_rgba(2,65,109,0.7)]"
        animate={{ 
          y: [0, -30, 0],
          rotate: planetRotation
        }}
        transition={{ 
          y: { 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
      >
        <div className="absolute top-5 left-5 w-10 h-10 rounded-full bg-[#aedd2b] shadow-md"></div>
        <div className="absolute bottom-10 right-10 w-20 h-8 rounded-full bg-[#012c4d]"></div>
      </motion.div>
      
      {/* Astronauta que sigue el cursor */}
      <motion.div
        className="absolute z-20"
        animate={{
          x: astronautPosition.x,
          y: astronautPosition.y
        }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <div className="relative w-24 h-24">
          {/* Casco */}
          <div className="absolute w-20 h-20 rounded-full bg-white"></div>
          
          {/* Visor */}
          <div className="absolute top-5 left-4 w-12 h-8 rounded-full bg-[#02416d]"></div>
          
          {/* Mochila */}
          <div className="absolute top-10 left-20 w-8 h-12 bg-[#aedd2b] rounded-md"></div>
          
          {/* Brazos y piernas */}
          <div className="absolute top-16 left-16 w-2 h-10 bg-white rotate-45"></div>
          <div className="absolute top-16 left-4 w-2 h-10 bg-white -rotate-45"></div>
        </div>
      </motion.div>
      
      {/* Contenido principal */}
      <div className="relative z-30 text-center px-4">
        <motion.h1 
          className="text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#aedd2b] to-[#9bc926]"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0, 5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          404
        </motion.h1>
        
        <motion.h2 
          className="text-3xl font-semibold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          ¡Houston, tenemos un problema!
        </motion.h2>
        
        <motion.p 
          className="text-xl max-w-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          La página que buscas se ha perdido culturalmente en el espacio exterior.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link 
            href="/" 
            className="relative inline-block group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="relative z-10 px-8 py-4 text-lg font-bold text-[#02416d] bg-[#aedd2b] rounded-full shadow-lg hover:shadow-xl hover:shadow-[#aedd2b]/40 transition-all duration-300">
              Volver a la Tierra
            </span>
            <span className="absolute -inset-1 rounded-full bg-[#aedd2b] blur-md opacity-60 group-hover:opacity-90 group-hover:blur-lg transition-all duration-300"></span>
            
            {/* Efecto de cohete al hacer hover */}
            {isHovering && (
              <motion.div
                className="absolute -top-20 left-1/2 transform -translate-x-1/2"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -50, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="w-12 h-24 relative">
                  {/* Cuerpo del cohete */}
                  <div className="absolute w-8 h-20 bg-[#02416d] left-2 rounded-t-lg"></div>
                  
                  {/* Cabina */}
                  <div className="absolute w-8 h-8 bg-[#aedd2b] left-2 top-0 rounded-t-lg"></div>
                  
                  {/* Alas */}
                  <div className="absolute w-4 h-8 bg-[#02416d] left-0 top-8 rounded-r-lg"></div>
                  <div className="absolute w-4 h-8 bg-[#02416d] right-0 top-8 rounded-l-lg"></div>
                  
                  {/* Fuego */}
                  <div className="absolute bottom-0 left-1 w-10 h-10">
                    <div className="absolute w-0 h-0 border-l-5 border-r-5 border-b-10 border-l-transparent border-r-transparent border-b-[#aedd2b] left-1"></div>
                    <div className="absolute w-0 h-0 border-l-5 border-r-5 border-b-10 border-l-transparent border-r-transparent border-b-[#ff6b35] left-3 bottom-1"></div>
                    <div className="absolute w-0 h-0 border-l-5 border-r-5 border-b-10 border-l-transparent border-r-transparent border-b-[#ff9a3c] left-5"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </Link>
        </motion.div>
      </div>
      
      {/* Satélite flotante */}
      <motion.div
        className="absolute left-1/4 top-1/2"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative">
          <div className="w-6 h-6 rounded-full bg-white"></div>
          <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-white animate-ping opacity-20"></div>
          <div className="absolute top-3 left-8 w-16 h-1 bg-gray-300 rounded"></div>
          <div className="absolute top-1 left-24 w-4 h-4 bg-[#aedd2b] rounded-full"></div>
        </div>
      </motion.div>
      
      {/* Mensaje oculto en constelaciones */}
      <div className="absolute bottom-10 left-10 opacity-30">
        <div className="flex space-x-4">
          {["C", "H", "O", "C", "O", "M", "E", "D", "I", "A"].map((letter, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full bg-[#aedd2b]"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
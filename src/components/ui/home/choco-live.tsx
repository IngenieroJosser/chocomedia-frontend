'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const ChocoLive = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const controls = useAnimation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  
  // Valores fundamentales
  const coreValues = [
    "Diversidad",
    "Conexión",
    "Autenticidad",
    "Innovación",
    "Respeto"
  ];

  // Iniciar/parar experiencia
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
      }
    }
  };

  // Control de sonido
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  // Animación de fondo
  useEffect(() => {
    if (isPlaying) {
      controls.start({
        background: [
          'linear-gradient(125deg, #012c4d 0%, #02416d 50%, #001a2d 100%)',
          'linear-gradient(125deg, #001a2d 0%, #012c4d 50%, #02416d 100%)',
          'linear-gradient(125deg, #02416d 0%, #001a2d 50%, #012c4d 100%)',
          'linear-gradient(125deg, #012c4d 0%, #02416d 50%, #001a2d 100%)'
        ],
        transition: {
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }
      });
    } else {
      controls.stop();
    }
  }, [isPlaying, controls]);

  // Inicializar canvas para efectos visuales
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Crear partículas iniciales
    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 2,
          speed: Math.random() * 2 + 1,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
          angle: Math.random() * Math.PI * 2
        });
      }
    };
    
    createParticles();
    
    // Animación de partículas
    const animateParticles = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fondo semi-transparente para efecto de rastro
      ctx.fillStyle = 'rgba(1, 44, 77, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        // Mover partícula
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        
        // Rebotar en bordes
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.angle = Math.PI - particle.angle;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.angle = -particle.angle;
        }
        
        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      if (isPlaying) {
        requestAnimationFrame(animateParticles);
      }
    };
    
    if (isPlaying) {
      animateParticles();
    }
    
    // Manejar redimensionamiento
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fondo animado */}
      <motion.div 
        className="absolute inset-0"
        animate={controls}
      />
      
      {/* Canvas para efectos visuales */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />
      
      {/* Controles de audio */}
      <div className="absolute top-6 right-6 z-20 flex gap-4">
        <button 
          className="bg-[#02416d] text-[#aedd2b] p-3 rounded-full shadow-lg hover:bg-[#012c4d] transition-colors"
          onClick={toggleMute}
        >
          {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
        </button>
        <button 
          className="bg-[#aedd2b] text-[#02416d] p-3 rounded-full shadow-lg hover:bg-[#9bc926] transition-colors"
          onClick={togglePlay}
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>
      </div>
      
      {/* Elementos de naturaleza */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {/* Montañas */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#012c4d] to-transparent"></div>
        
        {/* Árboles */}
        {[10, 30, 50, 70, 90].map(pos => (
          <motion.div
            key={pos}
            className="absolute bottom-0 w-8 h-32 bg-[#02416d]"
            style={{ left: `${pos}%` }}
            animate={{ 
              height: isPlaying ? ['30%', '35%', '30%'] : '30%',
              y: isPlaying ? [0, -10, 0] : 0
            }}
            transition={{ 
              duration: 3 + pos/10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Sol/Luna */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-[#ff9a3c] to-[#ff6b35]"
          animate={{ 
            x: isPlaying ? ['25%', '75%', '25%'] : '25%',
            y: isPlaying ? ['25%', '15%', '25%'] : '25%',
            rotate: isPlaying ? 360 : 0
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      {/* Valores fundamentales flotantes */}
      {coreValues.map((value, index) => (
        <motion.div
          key={value}
          className="absolute text-xl font-bold text-white bg-[#aedd2b] bg-opacity-30 backdrop-blur-sm px-4 py-2 rounded-full"
          style={{
            left: `${10 + index * 15}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{ 
            y: isPlaying ? [0, -20, 0] : 0,
            opacity: isPlaying ? [0.7, 1, 0.7] : 0.7,
            scale: isPlaying ? [1, 1.1, 1] : 1
          }}
          transition={{ 
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {value}
        </motion.div>
      ))}
      
      {/* Contenido central */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Vive la <span className="text-[#aedd2b]">Experiencia</span> Choco
        </motion.h1>
        
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="w-24 h-1 bg-[#aedd2b] mx-auto"></div>
        </motion.div>
        
        <motion.p 
          className="text-xl text-white/90 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Sumérgete en un mundo donde la cultura cobra vida, los sonidos de la naturaleza se fusionan con voces auténticas y los colores vibran con energía.
        </motion.p>
        
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {['Naturaleza', 'Sonidos', 'Colores', 'Comunidad'].map((item, i) => (
            <div 
              key={item} 
              className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
            >
              <div className="text-3xl mb-2">
                {i === 0 && '🌿'}
                {i === 1 && '🎵'}
                {i === 2 && '🎨'}
                {i === 3 && '👥'}
              </div>
              <div className="font-medium text-white">{item}</div>
            </div>
          ))}
        </motion.div>
        
        <motion.button
          className="bg-[#aedd2b] hover:bg-[#9bc926] text-[#02416d] font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(174, 221, 43, 0.8)"
          }}
          onClick={togglePlay}
        >
          <span className="flex items-center">
            {isPlaying ? (
              <>
                <FaPause className="mr-2" /> Pausar Experiencia
              </>
            ) : (
              <>
                <FaPlay className="mr-2" /> Iniciar Experiencia
              </>
            )}
          </span>
        </motion.button>
      </div>
      
      {/* Audio para la experiencia inmersiva */}
      <audio 
        ref={audioRef} 
        loop 
        muted={isMuted}
        className="hidden"
      >
        {/* En un proyecto real, aquí iría la fuente de audio */}
        <source src="/sounds/nature-soundscape.mp3" type="audio/mpeg" />
      </audio>
      
      {/* Efecto de ondas de sonido */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-4 mx-1 bg-[#aedd2b] rounded-full"
              animate={{ 
                height: [4, Math.random() * 40 + 10, 4],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 0.5 + Math.random() * 1,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      )}
      
      {/* Texto decorativo flotante */}
      <motion.div 
        className="absolute bottom-10 left-4 text-[#012c4d]/20 font-bold text-6xl -rotate-12 pointer-events-none select-none"
        animate={{ 
          x: [0, 20, 0],
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        #CulturaVoz
      </motion.div>
    </div>
  );
};

export default ChocoLive;
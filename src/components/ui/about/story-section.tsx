'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaBook, FaUsers, FaLock, FaLockOpen, FaSeedling } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const StorySection = () => {
  const [activeChapter, setActiveChapter] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [riverPositions, setRiverPositions] = useState<Array<{top: string, left: string, width: string}>>([]);
  const [iconPositions, setIconPositions] = useState<Array<{top: string, left: string}>>([]);
  const router = useRouter();

  const chapters = [
    {
      title: "El Origen",
      icon: <FaSeedling />,
      content: "Donde los ríos cantan historias ancestrales, nació un sueño: preservar y compartir la riqueza cultural que durante siglos había sido marginada. Vimos cómo creadores luchaban por dar a conocer sus obras, atrapadas en plataformas que no valoraban su esencia única.",
      color: "#012c4d"
    },
    {
      title: "El Desafío",
      icon: <FaLock />,
      content: "Artistas, narradores y guardianes culturales enfrentaban barreras insuperables: acceso limitado, distribución desigual y falta de reconocimiento. Sus voces, llenas de sabiduría ancestral, se ahogaban en un océano de contenido superficial que priorizaba lo viral sobre lo valioso.",
      color: "#02416d"
    },
    {
      title: "La Visión",
      icon: <FaBook />,
      content: "Imaginamos un espacio digital donde la cultura no fuera mercancía, sino patrimonio vivo. Un lugar donde creadores pudieran publicar en video, audio y podcast con herramientas sencillas, manteniendo el control de sus obras y recibiendo compensación justa por su trabajo.",
      color: "#001a2d"
    },
    {
      title: "La Solución",
      icon: <FaLockOpen />,
      content: "Nació Senda: una plataforma donde cada contenido cuenta historias que merecen ser escuchadas. Implementamos un sistema accesible que permite a creadores publicar fácilmente mientras los usuarios descubren joyas culturales adaptadas a sus intereses.",
      color: "#02416d"
    },
    {
      title: "El Impacto",
      icon: <FaUsers />,
      content: "Hoy somos un río de voces ancestrales que fluye sin fronteras. Más de 500 creadores comparten sus saberes, llegando a miles de personas que descubren, guardan y desbloquean contenido exclusivo. Juntos, tejemos un futuro donde la cultura no solo sobrevive, sino que florece.",
      color: "#012c4d"
    }
  ];

  // Generar posiciones solo en el cliente
  useEffect(() => {
    // Posiciones para las líneas del río
    const riverPositions = Array.from({ length: 20 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 100 + 50}%`,
    }));
    setRiverPositions(riverPositions);
    
    // Posiciones para los iconos culturales
    const iconPositions = ['🎭', '📖', '🥁', '🎨', '🎬', '🎙️'].map(() => ({
      top: `${20 + Math.random() * 60}%`,
      left: `${Math.random() * 100}%`,
    }));
    setIconPositions(iconPositions);
  }, []);

  // Animación al cambiar capítulo
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    });
    
    // Efecto de sonido ambiental al cambiar capítulo (solo en cliente)
    if (typeof window !== 'undefined') {
      const audio = new Audio("/sounds/transition-sound.mp3");
      audio.volume = 0.3;
      audio.play().catch(e => console.log("Error al reproducir sonido:", e));
    }
  }, [activeChapter, controls]);

  // Avance automático cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChapter((prev) => (prev + 1) % chapters.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [chapters.length]);

  // Manejar scroll para cambiar capítulos
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollY = window.scrollY;
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const visiblePosition = scrollY - containerTop;
      
      if (visiblePosition > 0 && visiblePosition < containerHeight) {
        const chapterIndex = Math.floor((visiblePosition / containerHeight) * chapters.length);
        setActiveChapter(Math.min(chapterIndex, chapters.length - 1));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters.length]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#001a2d] to-[#012c4d]"
    >
      {/* Fondo fluvial dinámico */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {riverPositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute h-1 bg-[#aedd2b] rounded-full"
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col lg:flex-row items-center">
        {/* Panel izquierdo - Visualización cultural */}
        <div className="w-full lg:w-1/2 flex justify-center mb-16 lg:mb-0">
          <div className="relative w-full max-w-lg aspect-square">
            {/* Esfera cultural central */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#012c4d] to-[#001a2d] shadow-2xl flex items-center justify-center border-8 border-[#02416d]"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Contenido visual dinámico */}
              <div className="relative w-4/5 h-4/5 rounded-full overflow-hidden">
                {activeChapter === 0 && (
                  <div className="absolute inset-0 bg-[#012c4d] flex items-center justify-center">
                    <motion.div
                      className="w-32 h-32 rounded-full bg-[#aedd2b] flex items-center justify-center text-6xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      🌱
                    </motion.div>
                  </div>
                )}
                
                {activeChapter === 1 && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="grid grid-cols-3 gap-4">
                      {[...Array(9)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-8 h-8 bg-[#02416d] rounded-full"
                          animate={{ 
                            y: [0, -10, 0],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 2, 
                            delay: i * 0.1,
                            repeat: Infinity 
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {activeChapter === 2 && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#012c4d] to-[#001a2d] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">🌎</div>
                      <div className="w-48 h-1 bg-[#aedd2b] mx-auto"></div>
                      <div className="w-32 h-1 bg-[#aedd2b] mx-auto mt-2"></div>
                    </div>
                  </motion.div>
                )}
                
                {activeChapter === 3 && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-[#02416d] rounded-lg p-4 flex items-center justify-center text-2xl">
                        🎥
                      </div>
                      <div className="bg-[#02416d] rounded-lg p-4 flex items-center justify-center text-2xl">
                        🎙️
                      </div>
                      <div className="bg-[#02416d] rounded-lg p-4 flex items-center justify-center text-2xl">
                        📖
                      </div>
                      <div className="bg-[#02416d] rounded-lg p-4 flex items-center justify-center text-2xl">
                        🎨
                      </div>
                    </div>
                    <div className="w-full h-1 bg-[#aedd2b] rounded-full"></div>
                  </motion.div>
                )}
                
                {activeChapter === 4 && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#001a2d] to-[#012c4d] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-4 bg-[#aedd2b] rounded-full opacity-20 animate-ping"></div>
                      <div className="text-6xl relative">✨</div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Elementos orbitantes */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {chapters.map((chapter, index) => (
                  <motion.div
                    key={index}
                    className={`absolute top-0 left-1/2 w-16 h-16 rounded-full flex items-center justify-center text-2xl transform -translate-x-1/2 -translate-y-1/2 ${
                      activeChapter === index ? 'scale-125' : ''
                    }`}
                    style={{
                      backgroundColor: chapter.color,
                      transform: `rotate(${index * 72}deg) translateX(200px) rotate(-${index * 72}deg)`
                    }}
                    animate={{
                      scale: activeChapter === index ? [1, 1.2, 1] : 1,
                      backgroundColor: activeChapter === index ? [chapter.color, '#aedd2b', chapter.color] : chapter.color
                    }}
                    transition={{ duration: 2 }}
                  >
                    {chapter.icon}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Olas de energía */}
            <motion.div
              className="absolute -bottom-10 left-0 right-0 h-10 overflow-hidden"
              animate={{
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            >
              <motion.div
                className="absolute bottom-0 w-200 h-10 bg-no-repeat"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.5' fill='%23aedd2b'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundSize: '1200px 120px',
                }}
                animate={{
                  x: [0, -600],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </div>
        </div>
        
        {/* Panel derecho - Narrativa */}
        <div className="w-full lg:w-1/2 lg:pl-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Nuestra <span className="text-[#aedd2b]">Historia</span>
            </h2>
            <div className="w-24 h-1 bg-[#aedd2b] rounded-full mb-8"></div>
          </motion.div>
          
          {/* Capítulos de la historia */}
          <div className="relative">
            {/* Línea del tiempo */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#02416d] rounded-full ml-6"></div>
            
            {chapters.map((chapter, index) => (
              <motion.div
                key={index}
                className={`relative pl-16 mb-12 cursor-pointer ${
                  activeChapter === index ? 'scale-105 origin-left' : 'opacity-80 hover:opacity-100'
                }`}
                onClick={() => setActiveChapter(index)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: activeChapter >= index ? 1 : 0.6,
                  x: 0
                }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Punto de tiempo */}
                <div 
                  className="absolute left-0 top-2 w-12 h-12 rounded-full flex items-center justify-center border-4 border-[#02416d] z-10"
                  style={{
                    backgroundColor: activeChapter === index ? chapter.color : '#012c4d',
                    marginLeft: '2px'
                  }}
                >
                  <motion.div
                    animate={{ 
                      scale: activeChapter === index ? [1, 1.2, 1] : 1,
                      color: activeChapter === index ? '#aedd2b' : 'white'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {chapter.icon}
                  </motion.div>
                </div>
                
                {/* Contenido del capítulo */}
                <motion.div
                  className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                    activeChapter === index ? 'border-[#aedd2b] shadow-lg' : 'border-[#02416d]'
                  }`}
                  style={{
                    background: `linear-gradient(to right, ${chapter.color}20, transparent)`
                  }}
                  animate={{
                    y: activeChapter === index ? [0, -5, 0] : 0
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center">
                    {chapter.title}
                  </h3>
                  <p className="text-white/90">{chapter.content}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Elementos flotantes culturales */}
      {iconPositions.map((position, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl"
          style={{
            top: position.top,
            left: position.left,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 40 - 20, 0],
            rotate: [0, Math.random() * 20 - 10]
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {['🎭', '📖', '🥁', '🎨', '🎬', '🎙️'][index]}
        </motion.div>
      ))}
      
      {/* Invitación a unirse con efecto de pulso */}
      <div className="relative z-10 text-center pb-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="inline-block"
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            ¿Listo para ser parte del <span className="text-[#aedd2b]">movimiento</span>?
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button 
              className="cursor-pointer bg-[#aedd2b] text-[#02416d] font-bold py-3 px-8 rounded-full hover:bg-[#9bc926] transition-colors shadow-lg relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/creator')}
            >
              <span className="relative z-10">Únete como Creador</span>
              <motion.div 
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                animate={{ 
                  x: ['-100%', '100%'],
                  opacity: [0, 0.2, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
            </motion.button>
            <motion.button 
              className="cursor-pointer bg-transparent border-2 border-[#aedd2b] text-[#aedd2b] font-bold py-3 px-8 rounded-full hover:bg-[#aedd2b] hover:text-[#02416d] transition-colors relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/explore')}
            >
              <span className="relative z-10">Explora Contenido</span>
              <motion.div 
                className="absolute inset-0 bg-[#aedd2b] opacity-0 group-hover:opacity-10"
                animate={{ 
                  x: ['-100%', '100%'],
                  opacity: [0, 0.1, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Olas decorativas finales */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-60">
        <motion.div
          className="absolute bottom-0 w-200 h-full bg-no-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23aedd2b'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23024a7d'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23012c4d'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundSize: '1200px 120px',
          }}
          animate={{
            x: [0, -600],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
};

export default StorySection;
'use client';

import { motion } from 'framer-motion';

export default function SpinnerCulture() {
  // Tonos de piel afrodescendientes
  const skinTones = ['#8D5524', '#C68642', '#7C4A24', '#5D2E1F', '#9C5E34'];
  
  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Fondo de tambor ancestral */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[#001a2d]"
          animate={{
            background: [
              'radial-gradient(circle at center, #001a2d, #012c4d)',
              'radial-gradient(circle at center, #012c4d, #001a2d)',
              'radial-gradient(circle at center, #001a2d, #012c4d)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Patrón adinkra */}
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#aedd2b] text-xl"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 15}deg) translateY(-120px)`,
            }}
            animate={{
              rotate: [i * 15, i * 15 + 360],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            • {/* Símbolo adinkra simplificado */}
          </motion.div>
        ))}
      </div>
      
      {/* Tambor central pulsante */}
      <motion.div
        className="relative w-32 h-32 rounded-full bg-[#5D2E1F] flex items-center justify-center shadow-2xl border-4 border-[#8D5524]"
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 0 0 rgba(174, 221, 43, 0.2)',
            '0 0 0 20px rgba(174, 221, 43, 0)',
            '0 0 0 0 rgba(174, 221, 43, 0.2)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Patrón de tambor */}
        <div className="absolute w-full h-full rounded-full border-4 border-[#C68642] opacity-70" />
        <div className="absolute w-3/4 h-3/4 rounded-full border-4 border-[#9C5E34] opacity-70" />
        
        {/* Cuerdas del tambor */}
        <div className="absolute w-full h-full">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 w-1 h-full bg-[#8D5524]"
              style={{
                transform: `translateX(-50%) rotate(${i * 45}deg)`
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Manos afrodescendientes en círculo */}
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {skinTones.map((skinTone, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl origin-center"
            style={{
              left: '50%',
              top: '-40px',
              x: '-50%',
              y: '-50%',
              transform: `rotate(${index * 72}deg) translateY(120px) rotate(${-index * 72}deg)`
            }}
            animate={{
              rotate: [0, -360],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2
            }}
          >
            {/* Mano con tono de piel específico */}
            <div 
              className="text-5xl"
              style={{ 
                filter: `hue-rotate(${index * 20}deg) saturate(1.2)`,
                textShadow: '0 0 8px rgba(0,0,0,0.5)'
              }}
            >
              <span style={{ color: skinTone }}>✋🏾</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Movimiento de palmas */}
      <motion.div
        className="absolute w-full h-full"
        animate={{
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl"
          animate={{
            y: ['-30px', '0px', '-30px'],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ color: skinTones[1] }}
        >
          ✋🏾
        </motion.div>
        
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-5xl rotate-180"
          animate={{
            y: ['30px', '0px', '30px'],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          style={{ color: skinTones[3] }}
        >
          ✋🏾
        </motion.div>
      </motion.div>
      
      {/* Elementos culturales orbitantes */}
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotate: -360 }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {['🌍', '🥁', '🎶', '💃🏾', '🔥', '🌴', '🌊', '🎨'].map((element, index) => (
          <motion.div
            key={index}
            className="absolute text-3xl origin-center"
            style={{
              left: '50%',
              top: '-40px',
              x: '-50%',
              y: '-50%',
              transform: `rotate(${index * 45}deg) translateY(160px) rotate(${-index * 45}deg)`
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.4, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3
            }}
          >
            {element}
          </motion.div>
        ))}
      </motion.div>
      
      {/* Texto sagrado afro */}
      <motion.div
        className="absolute bottom-0 w-full text-center"
        animate={{
          y: [0, -10, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="text-[#aedd2b] font-bold text-xl tracking-widest">SANKOFA</div>
        <div className="text-white/80 text-sm mt-1">Volver atrás para avanzar</div>
      </motion.div>
      
      {/* Partículas de energía rítmica */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#aedd2b]"
          style={{
            top: '50%',
            left: '50%',
            width: '6px',
            height: '6px',
          }}
          animate={{
            x: [
              '0px', 
              `${Math.cos(i * 0.314) * 180}px`, 
              `${Math.cos(i * 0.314 + 0.5) * 180}px`,
              '0px'
            ],
            y: [
              '0px', 
              `${Math.sin(i * 0.314) * 180}px`, 
              `${Math.sin(i * 0.314 + 0.5) * 180}px`,
              '0px'
            ],
            opacity: [0, 1, 0.5, 0],
            scale: [0, 1, 1.5, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
      
      {/* Olas de sonido */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-[#aedd2b] rounded-full"
            style={{
              width: 100 + i * 60,
              height: 100 + i * 60,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3 - i * 0.05, 0.5 - i * 0.05, 0.3 - i * 0.05]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
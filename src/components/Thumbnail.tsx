'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaVolumeUp, FaClock, FaEye, FaHeart, FaShareAlt, FaBookmark, FaFire } from 'react-icons/fa';
import { ThumbnailProps } from '@/lib/type';
import { categoryConfig } from '@/lib/constants';

const Thumbnail = ({
  title,
  creator,
  views,
  duration,
  category,
  thumbnailUrl,
  accentColor = '#aedd2b',
  onClick,
  className = '',
  culturalSignificance = 0,
  communityRating = 0,
  culturalTags = [],
  isTrending = false
}: ThumbnailProps & { 
  culturalSignificance?: number; 
  communityRating?: number;
  culturalTags?: string[];
  isTrending?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showCulturalInfo, setShowCulturalInfo] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const config = categoryConfig[category];
  const bgColor = accentColor || config.defaultColor;

  // Efecto para mostrar información cultural después de un hover prolongado
  useEffect(() => {
    if (isHovered) {
      hoverTimeout.current = setTimeout(() => {
        setShowCulturalInfo(true);
      }, 800);
    } else {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
      setShowCulturalInfo(false);
      setShowTags(false);
    }

    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, [isHovered]);

  // Manejar interacciones rápidas
  const handleQuickAction = (action: 'like' | 'save') => {
    if (action === 'like') {
      setIsLiked(!isLiked);
    } else {
      setIsSaved(!isSaved);
    }
  };

  // Calcular la energía cultural (valor único)
  const culturalEnergy = Math.min(100, Math.round((culturalSignificance + communityRating) / 2));

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl shadow-lg cursor-pointer group ${className}`}
      whileHover={{ 
        y: -10,
        scale: 1.03,
        rotate: isHovered ? Math.random() * 2 - 1 : 0 // Ligero movimiento orgánico
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        boxShadow: isHovered 
          ? `0 15px 40px ${bgColor}60` 
          : '0 8px 20px rgba(255, 255, 255, .5)',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Contenedor de la miniatura con perspectiva 3D */}
      <div className="relative w-full aspect-video overflow-hidden transform group-hover:rotate-x-3 transition-transform duration-500">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: bgColor }}
          >
            <span className="text-5xl">{config.icon}</span>
          </div>
        )}
        
        {/* Capa cultural dinámica */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
        
        {/* Efecto de energía cultural */}
        {culturalEnergy > 0 && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  backgroundColor: bgColor,
                  width: `${culturalEnergy}px`,
                  height: `${culturalEnergy}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.3
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 0.4, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        )}
        
        {/* Badge de categoría con efecto de profundidad */}
        <motion.div 
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-medium text-white flex items-center z-10 shadow-lg"
          style={{ backgroundColor: bgColor }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="mr-1">{config.icon}</span>
          {config.label}
        </motion.div>
        
        {/* Indicador de tendencia cultural */}
        {isTrending && (
          <motion.div 
            className="absolute top-3 right-3 bg-gradient-to-r from-[#ff6b35] to-[#ff9a3c] px-2 py-1 rounded-full text-xs font-bold text-white flex items-center z-10"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <FaFire className="mr-1" />
            TENDENCIA
          </motion.div>
        )}
        
        {/* Duración con efecto de profundidad */}
        <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded-lg text-sm flex items-center z-10 backdrop-blur-sm shadow-lg">
          <FaClock className="mr-1" size={12} />
          {duration}
        </div>
        
        {/* Indicador de energía cultural */}
        <div className="absolute bottom-3 left-3 bg-black/80 text-white px-2 py-1 rounded-lg text-sm flex items-center z-10 backdrop-blur-sm shadow-lg">
          <div className="w-3 h-3 rounded-full mr-2 animate-pulse" style={{ backgroundColor: bgColor }}></div>
          <span>Energía: {culturalEnergy}%</span>
        </div>
        
        {/* Botón de reproducción con efecto 3D */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
        >
          <motion.div
            className="bg-white/20 backdrop-blur-lg rounded-full p-4 shadow-2xl"
            animate={{ 
              scale: isHovered ? [1, 1.1, 1] : 1,
              rotate: isHovered ? [0, 10, -10, 0] : 0
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{ 
              boxShadow: `0 0 0 10px ${bgColor}40, 0 0 0 20px ${bgColor}20`
            }}
          >
            <motion.div
              className="bg-white rounded-full p-4 flex items-center justify-center shadow-inner"
              style={{ color: bgColor }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaPlay size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Acciones rápidas */}
        <div className="absolute top-14 right-3 flex flex-col gap-2 z-10">
          <motion.button
            className="p-2 rounded-full bg-black/60 text-white backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleQuickAction('like');
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 20
            }}
            whileHover={{ scale: 1.1, backgroundColor: '#ff3b30' }}
            whileTap={{ scale: 0.9 }}
          >
            <FaHeart className={isLiked ? 'text-red-500' : ''} />
          </motion.button>
          
          <motion.button
            className="p-2 rounded-full bg-black/60 text-white backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleQuickAction('save');
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 20
            }}
            whileHover={{ scale: 1.1, backgroundColor: bgColor }}
            whileTap={{ scale: 0.9 }}
          >
            <FaBookmark className={isSaved ? 'text-yellow-400' : ''} />
          </motion.button>
        </div>
        
        {/* Etiquetas culturales flotantes */}
        {showCulturalInfo && culturalTags.length > 0 && (
          <div className="absolute bottom-14 left-0 right-0 flex justify-center flex-wrap gap-2 z-10 px-2">
            {culturalTags.map((tag, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 bg-black/70 text-white rounded-full text-xs font-medium backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}
      </div>
      
      {/* Información del contenido con efecto de elevación */}
      <motion.div 
        className="p-4 bg-white relative overflow-hidden"
        animate={{ height: showCulturalInfo ? 'auto' : 'auto' }}
      >
        {/* Indicador de energía cultural */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
          <motion.div 
            className="h-full"
            style={{ backgroundColor: bgColor }}
            initial={{ width: 0 }}
            animate={{ width: `${culturalEnergy}%` }}
            transition={{ duration: 1.5 }}
          />
        </div>
        
        <motion.h3 
          className="font-bold text-gray-900 mb-1 mt-2 truncate group-hover:text-[#02416d] transition-colors"
        >
          {title}
        </motion.h3>
        
        <div className="flex justify-between items-start">
          <p className="text-gray-600 text-sm">por {creator}</p>
          
          <motion.button
            className="text-gray-400 hover:text-[#02416d] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setShowTags(!showTags);
            }}
            whileHover={{ scale: 1.1 }}
          >
            <FaShareAlt />
          </motion.button>
        </div>
        
        {/* Estadísticas con animación */}
        <motion.div
          className="flex justify-between items-center mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center text-gray-500 text-sm">
            <FaEye className="mr-1" size={12} />
            <span>{views.toLocaleString()} vistas</span>
          </div>
          
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaHeart 
                key={i}
                size={12}
                className={`mr-0.5 ${i < Math.round(communityRating / 20) ? 'text-red-500' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Información cultural emergente */}
        <AnimatePresence>
          {showCulturalInfo && (
            <motion.div
              className="mt-3 p-3 bg-[#012c4d]/10 rounded-lg border border-[#02416d]/20"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <h4 className="text-sm font-bold text-[#02416d] mb-1">Significado Cultural</h4>
              <p className="text-xs text-gray-700">
                Este contenido preserva tradiciones de la comunidad y tiene un valor cultural significativo
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Efecto de aura cultural al hacer hover */}
      {isHovered && (
        <motion.div 
          className="absolute inset-0 rounded-xl pointer-events-none z-0"
          initial={{ 
            boxShadow: `0 0 0px ${bgColor}40`
          }}
          animate={{ 
            boxShadow: [
              `0 0 0px ${bgColor}40`,
              `0 0 30px ${bgColor}80`,
              `0 0 10px ${bgColor}40`,
              `0 0 30px ${bgColor}80`
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Partículas de energía cultural */}
      {isHovered && culturalEnergy > 50 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: bgColor,
                width: `${Math.random() * 10 + 2}px`,
                height: `${Math.random() * 10 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                x: [0, Math.random() * 100 - 50],
                opacity: [1, 0],
                scale: [1, 0]
              }}
              transition={{
                duration: 1 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Thumbnail;
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaPlay, FaVolumeUp, FaClock, FaEye } from 'react-icons/fa';
import { ContentType, ThumbnailProps } from '@/lib/type';

const Thumbnail = ({
  title,
  creator,
  views,
  duration,
  category,
  thumbnailUrl,
  accentColor = '#aedd2b',
  onClick,
  className = ''
}: ThumbnailProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Configuración por tipo de contenido
  const categoryConfig = {
    video: {
      icon: '🎬',
      label: 'Video',
      defaultColor: '#02416d'
    },
    podcast: {
      icon: '🎙️',
      label: 'Podcast',
      defaultColor: '#9bc926'
    },
    documentary: {
      icon: '🎞️',
      label: 'Documental',
      defaultColor: '#012c4d'
    }
  };
  
  const config = categoryConfig[category];
  const bgColor = accentColor || config.defaultColor;
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl shadow-lg cursor-pointer ${className}`}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        boxShadow: isHovered 
          ? `0 10px 30px ${bgColor}40` 
          : '0 5px 15px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Contenedor de la miniatura */}
      <div className="relative w-full aspect-video overflow-hidden">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: bgColor }}
          >
            <span className="text-5xl">{config.icon}</span>
          </div>
        )}
        
        {/* Efecto de superposición al hacer hover */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
        
        {/* Badge de categoría */}
        <div 
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-medium text-white flex items-center z-10"
          style={{ backgroundColor: bgColor }}
        >
          <span className="mr-1">{config.icon}</span>
          {config.label}
        </div>
        
        {/* Duración */}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center z-10">
          <FaClock className="mr-1" size={12} />
          {duration}
        </div>
        
        {/* Botón de reproducción animado */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
        >
          <div className="bg-white/20 backdrop-blur-md rounded-full p-4">
            <motion.div
              className="bg-white rounded-full p-4 flex items-center justify-center"
              animate={{ 
                scale: isHovered ? [1, 1.1, 1] : 1,
                rotate: isHovered ? [0, 10, -10, 0] : 0
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ color: bgColor }}
            >
              <FaPlay size={24} />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Información del contenido */}
      <div className="p-4 bg-white">
        <motion.h3 
          className="font-bold text-gray-900 mb-1 truncate"
          animate={{ color: isHovered ? bgColor : '#1f2937' }}
        >
          {title}
        </motion.h3>
        <p className="text-gray-600 text-sm mb-3">por {creator}</p>
        
        {/* Estadísticas */}
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-500 text-sm">
            <FaEye className="mr-1" size={12} />
            <span>{views.toLocaleString()} vistas</span>
          </div>
          
          {category === 'podcast' && (
            <div className="flex items-center text-gray-500 text-sm">
              <FaVolumeUp className="mr-1" size={12} />
              <span>Audio</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Efecto de resplandor al hacer hover */}
      {isHovered && (
        <motion.div 
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ 
            boxShadow: `0 0 0px ${bgColor}40`
          }}
          animate={{ 
            boxShadow: [`0 0 0px ${bgColor}40`, `0 0 20px ${bgColor}80`, `0 0 0px ${bgColor}40`]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

export default Thumbnail;
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const trendingContent = [
  {
    id: 1,
    title: "Rituales Ancestrales Andinos",
    creator: "Comunidad Quechua",
    views: "24.5K",
    likes: "1.2K",
    category: "Documental",
    duration: "22 min",
    thumbnail: "/trending1.jpg",
    accent: "#aedd2b"
  },
  {
    id: 2,
    title: "Voces del Amazonas",
    creator: "Guardianes de la Selva",
    views: "18.3K",
    likes: "945",
    category: "Podcast",
    duration: "38 min",
    thumbnail: "/trending2.jpg",
    accent: "#02416d"
  },
  {
    id: 3,
    title: "Bailes Tradicionales de África Occidental",
    creator: "Danza Tribal",
    views: "32.1K",
    likes: "2.3K",
    category: "Video",
    duration: "15 min",
    thumbnail: "/trending3.jpg",
    accent: "#9bc926"
  },
  {
    id: 4,
    title: "Cantos Gregorianos Modernos",
    creator: "Coro Catedralicio",
    views: "12.7K",
    likes: "1.8K",
    category: "Audio",
    duration: "42 min",
    thumbnail: "/trending4.jpg",
    accent: "#012c4d"
  },
  {
    id: 5,
    title: "Tejedoras de los Andes",
    creator: "Artesanías Milenarias",
    views: "27.8K",
    likes: "3.1K",
    category: "Documental",
    duration: "28 min",
    thumbnail: "/trending5.jpg",
    accent: "#c5f04a"
  }
];

const TrendingCard = ({ content, index }: { content: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-white shadow-xl h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Fondo con efecto de gradiente dinámico */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"
        style={{ background: `linear-gradient(to bottom, transparent 30%, ${content.accent}20 100%)` }}
      />
      
      {/* Imagen de fondo con efecto de zoom */}
      <motion.div 
        className="absolute inset-0 bg-gray-200"
        animate={{ 
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Imagen de fondo simulada */}
        <div className="w-full h-full bg-gradient-to-r from-[#012c4d] to-[#02416d]" />
      </motion.div>
      
      {/* Badge de tendencia */}
      <motion.div 
        className="absolute top-4 left-4 bg-gradient-to-r from-[#ff6b35] to-[#ff9a3c] text-white px-3 py-1 rounded-full z-20 flex items-center"
        animate={{ 
          scale: isHovered ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 0.8 }}
      >
        <span className="mr-1">🔥</span>
        <span className="font-bold text-sm">Trending</span>
      </motion.div>
      
      {/* Contenido */}
      <div className="relative z-20 h-full flex flex-col justify-end p-6">
        {/* Categoría y duración */}
        <div className="flex justify-between items-center mb-3">
          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {content.category}
          </span>
          <span className="bg-black/30 text-white px-2 py-1 rounded text-sm">
            {content.duration}
          </span>
        </div>
        
        {/* Título y creador */}
        <motion.h3 
          className="text-xl font-bold text-white mb-2"
          animate={{ 
            y: isHovered ? 0 : 5,
            textShadow: isHovered ? `0 0 10px ${content.accent}` : "none"
          }}
        >
          {content.title}
        </motion.h3>
        <p className="text-white/90 mb-4">por {content.creator}</p>
        
        {/* Estadísticas */}
        <div className="flex justify-between mb-6">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#aedd2b] mr-2"></div>
            <span className="text-white/90">{content.views} vistas</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#ff6b35] mr-2"></div>
            <span className="text-white/90">{content.likes} likes</span>
          </div>
        </div>
        
        {/* Botón de reproducción con efecto */}
        <motion.button
          className="w-full bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold py-3 rounded-full flex items-center justify-center group"
          whileHover={{ scale: 1.02 }}
          animate={{ 
            y: isHovered ? 0 : 10,
            opacity: isHovered ? 1 : 0.9
          }}
        >
          <span className="mr-2">▶</span>
          <span>Reproducir ahora</span>
          <motion.span
            className="ml-2"
            animate={{ 
              x: isHovered ? [0, 5, 0] : 0
            }}
            transition={{ 
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
      
      {/* Efecto de resplandor al hacer hover */}
      {isHovered && (
        <motion.div 
          className="absolute inset-0 rounded-2xl"
          initial={{ 
            boxShadow: `0 0 0px ${content.accent}40`
          }}
          animate={{ 
            boxShadow: [`0 0 0px ${content.accent}40`, `0 0 30px ${content.accent}80`, `0 0 0px ${content.accent}40`]
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

const TrendingSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'Todo' },
    { id: 'videos', label: 'Videos' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'documentaries', label: 'Documentales' },
    { id: 'audio', label: 'Audios' }
  ];
  
  return (
    <div className="container mx-auto px-4 py-16 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#aedd2b] rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#02416d] rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="text-center mb-12 relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-[#02416d] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contenido Destacado
        </motion.h2>
        <motion.div
          className="w-24 h-1 bg-[#aedd2b] mx-auto rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.p 
          className="mt-6 text-xl text-[#012c4d] max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Descubre lo que la comunidad está disfrutando esta semana
        </motion.p>
      </div>
      
      {/* Filtros */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`px-5 py-2 rounded-full transition-all ${
              activeFilter === filter.id
                ? 'bg-[#02416d] text-white'
                : 'bg-white text-[#012c4d] border border-[#012c4d]/20 hover:border-[#02416d]'
            }`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </motion.div>
      
      {/* Grid de contenido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trendingContent.map((content, index) => (
          <TrendingCard key={content.id} content={content} index={index} />
        ))}
      </div>
      
      {/* Ver más */}
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <button className="relative overflow-hidden group border-2 border-[#02416d] text-[#02416d] font-bold py-3 px-8 rounded-full">
          <span className="relative z-10">Ver todo el contenido destacado</span>
          <div className="absolute inset-0 bg-[#02416d] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            Explorar más
          </span>
        </button>
      </motion.div>
      
      {/* Elemento decorativo flotante */}
      <motion.div 
        className="absolute bottom-10 right-10 text-[#012c4d]/5 font-bold text-9xl rotate-12 pointer-events-none select-none hidden lg:block"
        animate={{ 
          rotate: [12, 15, 12],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        TRENDING
      </motion.div>
    </div>
  );
};

export default TrendingSection;
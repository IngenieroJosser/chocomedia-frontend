'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaMusic, FaTheaterMasks, FaFilm, FaPalette, FaBook, FaUtensils, FaSearch, FaFilter, FaChevronDown } from 'react-icons/fa';
import { events } from '@/lib/type';
import Header from '@/components/ui/home/header';

const EventsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Categorías de eventos
  const categories = [
    { id: 'all', name: 'Todos', icon: <FaCalendarAlt /> },
    { id: 'music', name: 'Música', icon: <FaMusic />, color: 'from-purple-500 to-indigo-600' },
    { id: 'theater', name: 'Teatro', icon: <FaTheaterMasks />, color: 'from-emerald-500 to-teal-600' },
    { id: 'cinema', name: 'Cine', icon: <FaFilm />, color: 'from-blue-500 to-cyan-600' },
    { id: 'art', name: 'Artes', icon: <FaPalette />, color: 'from-rose-500 to-pink-600' },
    { id: 'literature', name: 'Literatura', icon: <FaBook />, color: 'from-amber-500 to-orange-500' },
    { id: 'gastronomy', name: 'Gastronomía', icon: <FaUtensils />, color: 'from-red-500 to-orange-500' },
  ];
  
  // Eventos destacados (featured)
  const featuredEvents = events.filter(event => event.featured);
  
  // Eventos filtrados por categoría
  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(event => event.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001a2d] to-[#000f1c] text-white">
      <Header />
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000f1c] z-10" />
        
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#aedd2b] to-[#9bc926]">
                Eventos Culturales
              </span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-white/90">
              Descubre experiencias únicas que celebran nuestra herencia cultural. Participa, aprende y conéctate.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold text-lg flex items-center gap-2 mx-auto"
            >
              <FaTicketAlt /> Ver próximos eventos
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Eventos Destacados */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            Eventos <span className="text-[#aedd2b]">Destacados</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/80 max-w-2xl mx-auto"
          >
            Experiencias seleccionadas que no te puedes perder
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, index) => {
            const category = categories.find(cat => cat.id === event.category);
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className={`bg-[#012c4d]/50 backdrop-blur-sm rounded-2xl border border-[#aedd2b]/30 overflow-hidden ${category?.color ? `hover:bg-gradient-to-br ${category.color}/20` : ''}`}
              >
                <div className="h-56 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#012c4d] z-10" />
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(https://source.unsplash.com/random/800x600/?event,${event.category},${index})` }}
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-[#aedd2b] text-[#02416d] px-3 py-1 rounded-full font-bold text-sm">
                      Destacado
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                    {category?.icon && (
                      <span className="bg-black/40 p-2 rounded-full">
                        {category.icon}
                      </span>
                    )}
                    <span className="font-medium">{category?.name}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[#aedd2b]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-[#aedd2b]" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-6">{event.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="px-4 py-2 bg-[#02416d] rounded-full font-bold">
                      {event.price}
                    </span>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold"
                    >
                      Reservar
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
      
      {/* Filtros y Búsqueda */}
      <section className="py-10 bg-[#001a2d] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="w-full md:w-2/3 relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70">
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Buscar eventos por nombre, lugar o categoría..."
                className="w-full pl-12 pr-4 py-4 bg-[#012c4d]/50 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#aedd2b] transition-all"
              />
            </div>
            
            <div className="w-full md:w-auto relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-3 px-6 py-4 bg-[#012c4d]/50 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 w-full"
              >
                <FaFilter className="text-[#aedd2b]" />
                <span>Filtrar eventos</span>
                <FaChevronDown className={`ml-auto transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="absolute top-full right-0 mt-2 bg-[#012c4d] backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 p-4 z-10 w-full min-w-[250px]"
                >
                  <div className="mb-4">
                    <h4 className="font-bold mb-2">Categorías</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setActiveCategory(category.id)}
                          className={`px-4 py-2 rounded-lg text-center transition-all ${
                            activeCategory === category.id
                              ? 'bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold'
                              : 'bg-[#001a2d] hover:bg-[#00213a]'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2">Fecha</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="px-3 py-2 bg-[#001a2d] hover:bg-[#00213a] rounded-lg">
                        Esta semana
                      </button>
                      <button className="px-3 py-2 bg-[#001a2d] hover:bg-[#00213a] rounded-lg">
                        Este mes
                      </button>
                      <button className="px-3 py-2 bg-[#001a2d] hover:bg-[#00213a] rounded-lg">
                        Próximos
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Todos los Eventos */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map(category => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold'
                  : 'bg-[#012c4d]/50 backdrop-blur-sm border border-[#aedd2b]/30'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => {
            const category = categories.find(cat => cat.id === event.category);
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className={`bg-[#012c4d]/50 backdrop-blur-sm rounded-2xl border border-[#aedd2b]/30 overflow-hidden ${category?.color ? `hover:bg-gradient-to-br ${category.color}/20` : ''}`}
              >
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#012c4d] z-10" />
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(https://source.unsplash.com/random/800x600/?event,${event.category},${index + 3})` }}
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-[#02416d] px-3 py-1 rounded-full font-bold text-sm">
                      {event.price}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {category?.icon && (
                      <span className="bg-[#02416d] p-2 rounded-lg text-[#aedd2b]">
                        {category.icon}
                      </span>
                    )}
                    <h3 className="text-xl font-bold">{event.title}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[#aedd2b]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-[#aedd2b]" />
                      <span className="truncate max-w-[120px]">{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {event.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-[#02416d] rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-[#012c4d] border border-[#aedd2b]/30 hover:bg-[#02416d]"
                    >
                      Ver detalles
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold flex items-center gap-2"
                    >
                      <FaTicketAlt /> Reservar
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
      
      {/* CTA para Organizadores */}
      <section className="py-20 bg-gradient-to-r from-[#012c4d] to-[#001a2d] px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#aedd2b]/20 rounded-full z-0" />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#aedd2b]/10 rounded-full z-0" />
                <div className="relative z-10">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Organizas <span className="text-[#aedd2b]">eventos culturales</span>?
              </h2>
              
              <p className="text-white/90 mb-8">
                Únete a nuestra plataforma y lleva tu evento a miles de personas apasionadas por la cultura. Ofrecemos herramientas para promoción, venta de boletos y gestión de asistentes.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-[#aedd2b] p-3 rounded-full mt-1">
                    <FaTicketAlt className="text-[#02416d] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Venta de boletos</h3>
                    <p className="text-white/80">Sistema seguro y fácil de usar para vender entradas a tus eventos.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#aedd2b] p-3 rounded-full mt-1">
                    <FaMapMarkerAlt className="text-[#02416d] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Promoción dirigida</h3>
                    <p className="text-white/80">Llega a tu audiencia ideal con nuestras herramientas de marketing.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#aedd2b] p-3 rounded-full mt-1">
                    <FaCalendarAlt className="text-[#02416d] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Gestión de eventos</h3>
                    <p className="text-white/80">Controla asistencia, entradas y más desde un solo lugar.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold"
                >
                  Publicar evento
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full bg-transparent border border-[#aedd2b] text-white"
                >
                  Más información
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 px-4 bg-[#001a2d]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#012c4d]/50 backdrop-blur-sm rounded-3xl border border-[#aedd2b]/30 p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              No te pierdas <span className="text-[#aedd2b]">ningún evento</span>
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Suscríbete a nuestro newsletter y recibe las últimas novedades, eventos destacados y promociones exclusivas directamente en tu correo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-6 py-4 bg-[#012c4d]/30 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#aedd2b] transition-all"
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold"
              >
                Suscribirme
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
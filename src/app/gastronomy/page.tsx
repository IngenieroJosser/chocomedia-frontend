'use client';
import { motion } from 'framer-motion';
import { FaUtensils, FaFire, FaLeaf, FaStar, FaHeart, FaSeedling } from 'react-icons/fa';
import { GiFruitBowl, GiMeat, GiFishingNet, GiHotSpices } from 'react-icons/gi';
import { traditionalDishes } from '@/lib/type';
import Header from '@/components/ui/home/header';

const GastronomyPage = () => {
  // Categorías gastronómicas
  const categories = [
    { id: 1, name: "Platos Principales", icon: <FaUtensils />, count: 24 },
    { id: 2, name: "Carnes", icon: <GiMeat />, count: 18 },
    { id: 3, name: "Mariscos", icon: <GiFishingNet />, count: 15 },
    { id: 4, name: "Vegetarianos", icon: <FaLeaf />, count: 22 },
    { id: 5, name: "Postres", icon: <GiFruitBowl />, count: 12 },
    { id: 6, name: "Especias", icon: <GiHotSpices />, count: 35 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001a2d] to-[#000f1c] text-white">
      <Header />
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30" />
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
                Gastronomía
              </span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-white/90">
              Descubre el sabor de nuestras tradiciones culinarias, donde cada plato cuenta una historia ancestral
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold flex items-center gap-2"
            >
              <FaLeaf /> Platos Vegetarianos
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-[#02416d]/50 backdrop-blur-sm border border-[#aedd2b]/30 text-white font-bold flex items-center gap-2"
            >
              <FaFire /> Platos Picantes
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Categorías */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            Explora Nuestras <span className="text-[#aedd2b]">Categorías</span> Culinarias
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/80 max-w-2xl mx-auto"
          >
            Descubre la diversidad de sabores que ofrecemos, desde platos ancestrales hasta creaciones contemporáneas
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-[#012c4d]/50 backdrop-blur-sm rounded-2xl border border-[#aedd2b]/30 p-6 hover:border-[#aedd2b]/60 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#aedd2b]/10 p-3 rounded-xl text-[#aedd2b] text-xl">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.name}</h3>
              </div>
              <p className="text-white/70 mb-4">Explora nuestras {category.count} recetas tradicionales</p>
              <div className="flex justify-between items-center">
                <span className="text-[#aedd2b] font-bold">Ver todos</span>
                <span className="text-sm bg-[#02416d] px-3 py-1 rounded-full">{category.count} recetas</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Platos Tradicionales */}
      <section className="py-16 bg-[#001a2d] px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-4"
            >
              <span className="text-[#aedd2b]">Platos</span> Tradicionales
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/80 max-w-2xl mx-auto"
            >
              Sabores que han pasado de generación en generación, preservando nuestra identidad cultural
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {traditionalDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-[#012c4d]/50 backdrop-blur-sm rounded-2xl border border-[#aedd2b]/30 overflow-hidden"
              >
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#012c4d] z-10" />
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(https://source.unsplash.com/random/600x400/?${dish.name.replace(/\s+/g, '-')})` }}
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-[#aedd2b] text-[#02416d] px-3 py-1 rounded-full font-bold text-sm">
                      {dish.region}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{dish.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar className="text-white/30" />
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-4">{dish.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full ${i < dish.spiceLevel ? 'bg-red-500' : 'bg-white/20'}`}
                      />
                    ))}
                    <span className="text-sm ml-2">Nivel picante</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {dish.ingredients.map((ingredient, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-[#02416d] rounded-full text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button className="text-[#aedd2b] font-bold hover:underline flex items-center gap-2">
                      Ver receta completa
                    </button>
                    <button className="text-white/70 hover:text-[#aedd2b]">
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sección de Especias */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            className="md:w-1/2"
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
            className="md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <GiHotSpices className="text-3xl text-[#aedd2b]" />
              <h2 className="text-3xl font-bold">Especias <span className="text-[#aedd2b]">Ancestrales</span></h2>
            </div>
            
            <p className="text-white/90 mb-6">
              Nuestra cocina se basa en especias que han sido cultivadas y utilizadas por siglos, transmitiendo sabores únicos que definen nuestra identidad culinaria.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#aedd2b] p-2 rounded-full mt-1">
                  <FaSeedling className="text-[#02416d]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Cultivo Tradicional</h3>
                  <p className="text-white/80">Especias cultivadas con métodos ancestrales que preservan su pureza y sabor.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-[#aedd2b] p-2 rounded-full mt-1">
                  <FaLeaf className="text-[#02416d]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Orígenes Ancestrales</h3>
                  <p className="text-white/80">Técnicas de recolección que respetan los ciclos naturales y las tradiciones.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-[#aedd2b] p-2 rounded-full mt-1">
                  <FaFire className="text-[#02416d]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Sabor Auténtico</h3>
                  <p className="text-white/80">Combinaciones de especias que crean perfiles de sabor únicos e inigualables.</p>
                </div>
              </div>
            </div>
            
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold">
              Descubrir Especias
            </button>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-[#012c4d] to-[#001a2d] px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#012c4d]/50 backdrop-blur-sm rounded-3xl border border-[#aedd2b]/30 p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para <span className="text-[#aedd2b]">explorar</span> nuestra gastronomía?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Únete a nuestra comunidad gastronómica y descubre recetas ancestrales, técnicas tradicionales y sabores que han resistido el paso del tiempo.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold text-lg"
              >
                Ver Todas las Recetas
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-transparent border border-[#aedd2b] text-white font-bold text-lg"
              >
                Descargar Recetario
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GastronomyPage;
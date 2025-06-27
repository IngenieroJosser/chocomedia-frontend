'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaYoutube,
  FaPodcast,
  FaMusic,
  FaFilm
} from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-[#012c4d] to-[#001a2d] text-white pt-20 pb-10 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#aedd2b] mix-blend-screen"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-[#02416d] mix-blend-screen"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-[#9bc926] mix-blend-screen"></div>
      </div>
      
      {/* Contenido principal del footer */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Columna 1: Logo y descripción */}
          <div>
            <div className="flex items-center mb-6">
              <div className="relative w-12 h-12 rounded-full bg-[#aedd2b] flex items-center justify-center mr-3">
                <div className="absolute w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm"></div>
                <span className="absolute text-[#02416d] font-extrabold text-xl">C</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl tracking-wider">SENDA</span>
                <span className="text-[#aedd2b] text-xs font-light tracking-widest">WORLDWIDE</span>
              </div>
            </div>
            
            <p className="text-white/80 mb-6">
              Conectando culturas a través de la voz. Comparte, descubre y celebra la diversidad cultural del mundo.
            </p>
            
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebookF />, name: 'Facebook', color: '#3b5998' },
                { icon: <FaTwitter />, name: 'Twitter', color: '#1da1f2' },
                { icon: <FaInstagram />, name: 'Instagram', color: '#e1306c' },
                { icon: <FaLinkedinIn />, name: 'LinkedIn', color: '#0077b5' },
                { icon: <FaYoutube />, name: 'YouTube', color: '#ff0000' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#02416d] flex items-center justify-center text-white hover:text-white"
                  whileHover={{ 
                    y: -5,
                    scale: 1.1,
                    backgroundColor: social.color
                  }}
                  onMouseEnter={() => setHoveredItem(social.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  aria-label={social.name}
                >
                  {social.icon}
                  {hoveredItem === social.name && (
                    <motion.span 
                      className="absolute -bottom-6 text-xs font-medium text-[#aedd2b]"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {social.name}
                    </motion.span>
                  )}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Columna 2: Enlaces rápidos */}
          <div>
            <motion.h3 
              className="text-lg font-bold mb-6 text-[#aedd2b] border-b border-[#aedd2b]/30 pb-2 inline-block"
              whileHover={{ x: 5 }}
            >
              Explorar
            </motion.h3>
            <ul className="space-y-4">
              {[
                { name: 'Inicio', url: '#' },
                { name: 'Explorar', url: '#' },
                { name: 'Categorías', url: '#' },
                { name: 'Tendencias', url: '#' },
                { name: 'Creadores', url: '#' },
                { name: 'Eventos', url: '#' }
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a 
                    href={link.url} 
                    className="text-white/80 hover:text-[#aedd2b] transition-colors flex items-center"
                  >
                    <span className="mr-2 text-[#aedd2b]">•</span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Columna 3: Categorías */}
          <div>
            <motion.h3 
              className="text-lg font-bold mb-6 text-[#aedd2b] border-b border-[#aedd2b]/30 pb-2 inline-block"
              whileHover={{ x: 5 }}
            >
              Contenido
            </motion.h3>
            <ul className="space-y-4">
              {[
                { name: 'Podcasts', icon: <FaPodcast className="mr-2 text-[#aedd2b]" /> },
                { name: 'Música', icon: <FaMusic className="mr-2 text-[#aedd2b]" /> },
                { name: 'Documentales', icon: <FaFilm className="mr-2 text-[#aedd2b]" /> },
                { name: 'Entrevistas', icon: <span className="mr-2 text-[#aedd2b]">🎙️</span> },
                { name: 'Historias', icon: <span className="mr-2 text-[#aedd2b]">📖</span> },
                { name: 'Educación', icon: <span className="mr-2 text-[#aedd2b]">🎓</span> }
              ].map((category, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a 
                    href="#" 
                    className="text-white/80 hover:text-[#aedd2b] transition-colors flex items-center"
                  >
                    {category.icon}
                    {category.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Columna 4: Newsletter y contacto */}
          <div>
            <motion.h3 
              className="text-lg font-bold mb-6 text-[#aedd2b] border-b border-[#aedd2b]/30 pb-2 inline-block"
              whileHover={{ x: 5 }}
            >
              Mantente Conectado
            </motion.h3>
            
            <form onSubmit={handleSubscribe} className="mb-8">
              <p className="text-white/80 mb-4">
                Suscríbete para recibir las últimas novedades y contenido exclusivo.
              </p>
              
              <div className="relative mb-3">
                <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#aedd2b]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-[#02416d] border border-[#aedd2b]/30 focus:border-[#aedd2b] focus:outline-none text-white placeholder-white/60"
                />
              </div>
              
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold py-3 px-6 rounded-full hover:shadow-lg hover:shadow-[#aedd2b]/40 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Suscribirse
              </motion.button>
              
              {isSubscribed && (
                <motion.div
                  className="mt-3 text-[#aedd2b] text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  ¡Gracias por suscribirte!
                </motion.div>
              )}
            </form>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <MdLocationOn className="text-[#aedd2b] mt-1 mr-3" />
                <span className="text-white/80">
                  Av. Cultura 1234, Ciudad Global
                </span>
              </div>
              <div className="flex items-center">
                <MdPhone className="text-[#aedd2b] mr-3" />
                <span className="text-white/80">
                  +1 (234) 567-8900
                </span>
              </div>
              <div className="flex items-center">
                <MdEmail className="text-[#aedd2b] mr-3" />
                <span className="text-white/80">
                  hola@senda.com
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Línea divisora */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-[#aedd2b]/50 to-transparent my-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        
        {/* Pie de página inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Senda. Todos los derechos reservados.
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'Términos', url: '#' },
              { name: 'Privacidad', url: '#' },
              { name: 'Cookies', url: '#' },
              { name: 'Accesibilidad', url: '#' },
              { name: 'Contribuir', url: '#' }
            ].map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                className="text-white/60 hover:text-[#aedd2b] transition-colors text-sm"
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Elemento decorativo flotante */}
      <motion.div 
        className="absolute bottom-10 left-10 text-[#02416d]/20 font-bold text-6xl pointer-events-none select-none"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        CULTURASENDA
      </motion.div>
    </footer>
  );
};

export default Footer;
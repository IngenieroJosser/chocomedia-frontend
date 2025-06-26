'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isTablet, setIsTablet] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Detectar tamaño de pantalla para tablet
  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkTablet();
    window.addEventListener('resize', checkTablet);
    
    return () => window.removeEventListener('resize', checkTablet);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Inicio", path: "/", icon: "🏠" },
    { name: "Explorar", path: "/explore", icon: "🔍" },
    { name: "Acerca de", path: "/about", icon: "❓" },
  ];

  // Efecto de partículas mágicas
  useEffect(() => {
    if (!headerRef.current) return;
    
    const createParticle = () => {
      if (!mobileMenuOpen || !headerRef.current) return;
      
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full";
      
      // Tamaño aleatorio entre 2px y 6px
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Color aleatorio entre los tonos de la marca
      const colors = ["#aedd2b", "#9bc926", "#c5f04a", "#ffffff"];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Posición aleatoria dentro del header
      const headerRect = headerRef.current.getBoundingClientRect();
      particle.style.left = `${Math.random() * headerRect.width}px`;
      particle.style.top = `${Math.random() * headerRect.height}px`;
      
      // Animación
      particle.animate(
        [
          { opacity: 1, transform: "scale(1)" },
          { opacity: 0, transform: "scale(0)" }
        ],
        {
          duration: Math.random() * 2000 + 1000,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)"
        }
      ).onfinish = () => particle.remove();
      
      headerRef.current.appendChild(particle);
    };
    
    let interval: NodeJS.Timeout;
    if (mobileMenuOpen) {
      interval = setInterval(createParticle, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mobileMenuOpen]);

  // Manejar clic en elementos de navegación
  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Header para desktop y tablet */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <motion.div 
          ref={headerRef}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 100 }}
          className={`relative w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] rounded-full shadow-2xl backdrop-blur-md transition-all duration-500 overflow-hidden ${
            isScrolled 
              ? "bg-[#02416d]/90 border border-[#aedd2b]/20" 
              : "bg-[#02416d]/80 border border-white/10"
          }`}
          style={{
            boxShadow: "0 10px 30px rgba(2, 65, 109, 0.5)",
            background: "radial-gradient(circle at top left, #02416d, #013258)"
          }}
        >
          {/* Efecto de luz sutil */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(174,221,43,0.07)_0%,_transparent_70%)] opacity-30"></div>
          </div>
          
          <nav className="relative flex justify-between items-center py-2 px-4 md:px-8 z-10">
            {/* Logo con animación mejorada */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <Link 
                href="/" 
                className="flex items-center group"
                aria-label="Ir a la página de inicio"
              >
                <motion.div 
                  className="relative w-10 h-10 rounded-full bg-[#aedd2b] flex items-center justify-center mr-3"
                  animate={{ 
                    rotate: hoveredItem === "logo" ? 360 : 0,
                    scale: hoveredItem === "logo" ? 1.1 : 1
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onMouseEnter={() => setHoveredItem("logo")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="absolute w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm animate-pulse-slow"></div>
                  <span className="absolute text-[#02416d] font-extrabold text-xl">C</span>
                  
                  {/* Efecto de partículas */}
                  {hoveredItem === "logo" && (
                    <>
                      <motion.div 
                        className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-[#aedd2b]"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.7 }}
                        transition={{ delay: 0.1 }}
                      ></motion.div>
                      <motion.div 
                        className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-[#aedd2b]"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.7 }}
                        transition={{ delay: 0.2 }}
                      ></motion.div>
                    </>
                  )}
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl tracking-wider">CHOCOMEDIA</span>
                  <span className="text-[#aedd2b] text-xs font-light tracking-widest">WORLDWIDE</span>
                </div>
              </Link>
            </motion.div>
            
            {/* Navegación principal - Visible en tablet y desktop */}
            <div className={`hidden ${isTablet ? 'md:flex' : 'lg:flex'} space-x-4 md:space-x-6 ml-4 md:ml-12`}>
              {navItems.slice(0, 4).map((item) => (
                <motion.div
                  key={item.name}
                  className="relative"
                  whileHover={{ y: -2 }}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link 
                    href={item.path}
                    className={`relative flex items-center group text-base md:text-lg font-medium ${
                      pathname === item.path 
                        ? "text-[#aedd2b]" 
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.name}
                    <div 
                      className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#aedd2b] transition-all duration-500 group-hover:w-full ${
                        pathname === item.path ? "w-full" : ""
                      }`}
                    ></div>
                  </Link>
                  
                  {/* Efecto de brillo al hacer hover */}
                  {hoveredItem === item.name && (
                    <motion.div 
                      className="absolute -inset-1 md:-inset-2 bg-[#aedd2b]/20 blur-md rounded-full pointer-events-none"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    ></motion.div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Acciones de usuario */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Botón de inicio de sesión - Visible en tablet y desktop */}
              <motion.button 
                className="hidden md:block relative bg-gradient-to-r from-[#aedd2b] to-[#9bc926] hover:from-[#c5f04a] hover:to-[#aedd2b] text-[#02416d] font-bold py-2 md:py-2.5 px-5 md:px-7 rounded-full text-sm shadow-lg hover:shadow-xl hover:shadow-[#aedd2b]/40 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Iniciar sesión"
                onClick={() => handleNavigation('/login')}
              >
                <span className="relative z-10">Iniciar sesión</span>
                
                {/* Efecto de pulso */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-[#aedd2b]"
                  initial={{ scale: 1, opacity: 0.3 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 2 
                  }}
                ></motion.div>
              </motion.button>
              
              {/* Botón de menú móvil con animación mejorada - Visible solo en móvil */}
              <motion.button 
                className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileMenuOpen}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute left-0 top-1/2 w-full h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45 -translate-y-1/2" : "-translate-y-2"}`}></span>
                  <span className={`absolute left-0 top-1/2 w-full h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
                  <span className={`absolute left-0 top-1/2 w-full h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1/2" : "translate-y-2"}`}></span>
                </div>
              </motion.button>
            </div>
          </nav>
        </motion.div>
      </header>
      
      {/* Menú móvil con efectos mágicos - Visible solo en móvil */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-[#012c4d]/95 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="absolute top-24 right-0 left-0 mx-auto w-[85%] max-w-md"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div className="bg-[#02416d] rounded-2xl border border-[#aedd2b]/30 shadow-2xl p-6 relative overflow-hidden">
                {/* Efecto de fondo mágico */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(174,221,43,0.1)_0%,_transparent_70%)]"></div>
                
                <nav className="flex flex-col space-y-4 relative z-10">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                    </motion.div>
                  ))}
                </nav>
              </div>
              
              {/* Pie de menú móvil */}
              <motion.div 
                className="mt-8 text-center text-white/70 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p>Chocomedia © {new Date().getFullYear()}</p>
                <p className="mt-1">Conectando culturas a través de la voz</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
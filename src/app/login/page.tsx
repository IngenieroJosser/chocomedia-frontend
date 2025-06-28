'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaTwitter, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ForgotPassword from '@/components/ui/auth/forgot-password';
import { IValidateAccount } from '@/lib/auth';
import { validateAccount } from '@/services/auth-service';

const LoginPage = () => {
  const [formDataLogin, setFormDataLogin] = useState<IValidateAccount>({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [success, setSuccess] = useState(false);
  const [isClient, setIsClient] = useState(false); // Nuevo estado para controlar renderizado en cliente

  const router = useRouter();
  
  // Efecto para marcar que estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Efecto de partículas flotantes (solo para dispositivos móviles)
  useEffect(() => {
    if (!formRef.current || !isClient) return;
    
    // Detectar si es dispositivo móvil
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full bg-[#aedd2b]";
      
      // Tamaño aleatorio
      const size = Math.random() * 8 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Posición aleatoria dentro del formulario
      const formRect = formRef.current!.getBoundingClientRect();
      particle.style.left = `${Math.random() * formRect.width}px`;
      particle.style.top = `${Math.random() * formRect.height}px`;
      
      // Animación
      particle.animate(
        [
          { opacity: 1, transform: "scale(1)" },
          { opacity: 0, transform: "scale(0)" }
        ],
        {
          duration: Math.random() * 3000 + 2000,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)"
        }
      ).onfinish = () => particle.remove();
      
      formRef.current!.appendChild(particle);
    };
    
    let interval: NodeJS.Timeout;
    interval = setInterval(createParticle, 300);
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isClient]); // Dependencia añadida

  // Cerrar modal al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowForgotPasswordModal(false);
      }
    };

    if (showForgotPasswordModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showForgotPasswordModal]);

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataLogin(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitValidateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (!formDataLogin.email || !formDataLogin.password) {
      setError('Todos los campos son requeridos');
      setIsLoading(false);
      return;
    }

    try {
      await validateAccount(formDataLogin);
      setSuccess(true);
      setIsLoading(false);

      setTimeout(() => {
        router.push('/explore');
      }, 2000);

    } catch (error: any) {
      setError(error.response?.data?.message || 'Credenciales invalidas');
      setIsLoading(false);
    }
  };

  const openForgotPasswordModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForgotPasswordModal(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  // Generar posiciones solo en cliente
  const riverLines = isClient 
    ? Array.from({ length: 10 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        width: Math.random() * 100 + 50,
      }))
    : [];

  const floatingIcons = isClient
    ? ['🎭', '📖', '🎨', '🎬', '🎙️', '🥁'].map(icon => ({
        icon,
        top: Math.random() * 100,
        left: Math.random() * 100,
      }))
    : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#012c4d] to-[#001a2d] p-4 relative">
      {/* Fondo con animación - Solo en cliente */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {riverLines.map((line, i) => (
            <motion.div
              key={i}
              className="absolute h-0.5 bg-[#aedd2b] rounded-full"
              style={{
                top: `${line.top}%`,
                left: `${line.left}%`,
                width: `${line.width}%`,
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
      )}
      
      {/* Contenedor principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Formulario */}
        <motion.div
          ref={formRef}
          className="bg-[#012c4d]/90 backdrop-blur-lg rounded-3xl border border-[#aedd2b]/30 shadow-2xl overflow-hidden relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Efecto de luz */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#aedd2b] animate-pulse-slow"></div>
          
          <div className="p-8 sm:p-10">
            {/* Logo */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <div className="bg-[#aedd2b] rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-[#02416d] font-bold text-2xl">C</span>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl font-bold text-center text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Bienvenido a <span className="text-[#aedd2b]">SENDA</span>
            </motion.h1>
            
            <motion.p 
              className="text-center text-white/80 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Conecta con culturas, descubre historias
            </motion.p>
            
            {/* Formulario */}
            <form onSubmit={handleSubmitValidateAccount}>
              {/* Campo Email */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <FaUser className="text-[#aedd2b]" />
                  </div>
                  <input
                    type="email"
                    name='email'
                    value={formDataLogin.email}
                    onChange={handleChangeForm}
                    className="w-full pl-12 pr-4 py-3 bg-[#02416d]/30 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#aedd2b] transition-all"
                    placeholder="Correo electrónico"
                    required
                  />
                </div>
              </motion.div>
              
              {/* Campo Contraseña */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <FaLock className="text-[#aedd2b]" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name='password'
                    value={formDataLogin.password}
                    onChange={handleChangeForm}
                    className="w-full pl-12 pr-12 py-3 bg-[#02416d]/30 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#aedd2b] transition-all"
                    placeholder="*******"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#aedd2b]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </motion.div>
              
              {/* Opciones */}
              <motion.div
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#aedd2b] bg-gray-700 border-gray-600 rounded focus:ring-[#aedd2b] focus:ring-2"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-white">
                    Recordarme
                  </label>
                </div>
                <button 
                  onClick={openForgotPasswordModal}
                  className="text-sm text-[#aedd2b] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </motion.div>
              
              {/* Botón de Login */}
              <motion.button
                type="submit"
                className={`w-full py-3 px-4 rounded-xl text-lg font-bold transition-all relative overflow-hidden ${
                  isLoading 
                    ? 'bg-[#aedd2b]/70 cursor-not-allowed' 
                    : 'bg-[#aedd2b] hover:bg-[#9bc926]'
                }`}
                disabled={isLoading}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: isLoading ? 1 : 1.03 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <div className="w-6 h-6 border-t-2 border-[#02416d] border-solid rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <>
                    <span className="relative z-10 text-[#02416d]">Iniciar Sesión</span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                      }}
                    />
                  </>
                )}
              </motion.button>
              
              {/* Mensaje de éxito */}
              {success && (
                <motion.div
                  className="mt-4 p-3 bg-green-500/20 border border-green-500/50 text-green-300 rounded-xl text-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  ¡Inicio de sesión exitoso! Redirigiendo...
                </motion.div>
              )}
              
              {/* Mensaje de error */}
              {error && (
                <motion.div
                  className="mt-4 p-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl text-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  {error}
                </motion.div>
              )}
            </form>
            
            {/* Separador */}
            <motion.div
              className="flex items-center my-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <div className="flex-grow h-px bg-[#aedd2b]/30"></div>
              <span className="mx-4 text-white/60 text-sm">O continúa con</span>
              <div className="flex-grow h-px bg-[#aedd2b]/30"></div>
            </motion.div>
            
            {/* Botones de redes sociales */}
            <motion.div
              className="grid grid-cols-3 gap-4 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <button aria-label='Icono de Google' className="bg-[#02416d]/50 backdrop-blur-sm py-3 rounded-xl border border-[#aedd2b]/20 hover:bg-[#aedd2b]/10 transition-colors flex items-center justify-center">
                <FaGoogle className="text-white text-xl" />
              </button>
              <button aria-label='Icono de Facebook' className="bg-[#02416d]/50 backdrop-blur-sm py-3 rounded-xl border border-[#aedd2b]/20 hover:bg-[#aedd2b]/10 transition-colors flex items-center justify-center">
                <FaFacebook className="text-white text-xl" />
              </button>
              <button aria-label='Icono de Twitter - X' className="bg-[#02416d]/50 backdrop-blur-sm py-3 rounded-xl border border-[#aedd2b]/20 hover:bg-[#aedd2b]/10 transition-colors flex items-center justify-center">
                <FaTwitter className="text-white text-xl" />
              </button>
            </motion.div>
            
            {/* Registro */}
            <motion.div
              className="text-center text-white/80 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <p>
                ¿No tienes una cuenta?{' '}
                <Link 
                  href="/register" 
                  className="text-[#aedd2b] font-medium hover:underline relative z-20"
                  aria-label="Ir a la página de registro"
                  passHref
                >
                  Regístrate ahora
                </Link>
              </p>
            </motion.div>
          </div>
          
          {/* Olas decorativas */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden opacity-30">
            <motion.div
              className="absolute bottom-0 w-200 h-full bg-no-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23aedd2b'%3E%3C/path%3E%3C/svg%3E")`,
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
        </motion.div>
        
        {/* Elementos decorativos flotantes - Solo en cliente */}
        {isClient && floatingIcons.map(({icon, top, left}, index) => (
          <motion.div
            key={index}
            className="absolute text-3xl text-[#aedd2b]"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              zIndex: -1
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {icon}
          </motion.div>
        ))}
      </motion.div>

      {/* Modal para recuperar contraseña */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <button
              aria-label='Cerrar el modal de olvidar contraseña'
              onClick={closeForgotPasswordModal}
              className="absolute top-4 right-4 z-10 text-white hover:text-[#aedd2b] transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
            <ForgotPassword onClose={closeForgotPasswordModal} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaGoogle, FaFacebook, FaTwitter, FaSeedling } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import TermsModal from '@/components/ui/auth/terms-and-conditions';
import PrivacyModal from '@/components/ui/auth/privacy-policy';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Efecto de partículas culturales
  useEffect(() => {
    if (!formRef.current) return;
    
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full";
      
      // Tamaño y color aleatorio
      const size = Math.random() * 8 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Colores temáticos
      const colors = ["#aedd2b", "#9bc926", "#c5f04a", "#02416d", "#012c4d"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.backgroundColor = color;
      
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
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validaciones básicas
    if (!name || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setIsLoading(true);
    
    // Simulación de registro
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#012c4d] to-[#001a2d] p-4">
      {/* Fondo con animación fluvial */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 bg-[#aedd2b] rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}%`,
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
          {/* Efecto de luz superior */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#aedd2b] animate-pulse-slow"></div>
          
          <div className="p-8 sm:p-10">
            {/* Logo y título */}
            <motion.div 
              className="flex flex-col items-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <div className="bg-[#aedd2b] rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <FaSeedling className="text-[#02416d] text-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-center text-white">
                Únete a <span className="text-[#aedd2b]">ChocóMedia</span>
              </h1>
              <p className="text-center text-white/80 mt-2">
                Comienza tu viaje cultural
              </p>
            </motion.div>
            
            {/* Mensaje de éxito */}
            {success && (
              <motion.div
                className="mb-6 p-4 bg-[#aedd2b]/20 border border-[#aedd2b] text-[#aedd2b] rounded-xl text-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <p className="font-medium">¡Registro exitoso!</p>
                <p className="text-sm mt-1">Redirigiendo a tu panel...</p>
              </motion.div>
            )}
            
            {/* Formulario */}
            {!success && (
              <form onSubmit={handleSubmit}>
                {/* Campo Nombre */}
                <motion.div
                  className="mb-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <FaUser className="text-[#aedd2b]" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-[#02416d]/30 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#aedd2b] transition-all"
                      placeholder="Nombre completo"
                      required
                    />
                  </div>
                </motion.div>
                
                {/* Campo Email */}
                <motion.div
                  className="mb-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <FaEnvelope className="text-[#aedd2b]" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-[#02416d]/30 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#aedd2b] transition-all"
                      placeholder="Correo electrónico"
                      required
                    />
                  </div>
                </motion.div>
                
                {/* Campo Contraseña */}
                <motion.div
                  className="mb-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <FaLock className="text-[#aedd2b]" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                
                {/* Indicador de seguridad de contraseña */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="flex items-center mb-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`flex-grow h-1 mx-1 rounded-full ${
                          password.length < 6 ? 'bg-red-500/50' :
                          password.length < 8 ? (level <= 2 ? 'bg-orange-500' : 'bg-gray-700') :
                          level <= 3 ? 'bg-[#aedd2b]' : 'bg-gray-700'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-xs text-white/60">
                    {password.length < 6 
                      ? 'Contraseña débil' 
                      : password.length < 8 
                        ? 'Contraseña media' 
                        : 'Contraseña fuerte'}
                  </p>
                </motion.div>
                
                {/* Términos y condiciones */}
                <motion.div
                  className="flex items-start mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 text-[#aedd2b] bg-gray-700 border-gray-600 rounded focus:ring-[#aedd2b] focus:ring-2"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-white">
                    Acepto los 
                    <button 
                      type="button"
                      className="text-[#aedd2b] hover:underline mx-1"
                      onClick={() => setShowTermsModal(true)}
                    >
                      Términos y Condiciones
                    </button> 
                    y la 
                    <button 
                      type="button"
                      className="text-[#aedd2b] hover:underline ml-1"
                      onClick={() => setShowPrivacyModal(true)}
                    >
                      Política de Privacidad
                    </button>
                  </label>
                </motion.div>
                
                {/* Botón de Registro */}
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
                  transition={{ delay: 1.1 }}
                  whileHover={{ scale: isLoading ? 1 : 1.03 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading ? (
                    <div className="flex justify-center">
                      <div className="w-6 h-6 border-t-2 border-[#02416d] border-solid rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10 text-[#02416d]">Crear Cuenta</span>
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
            )}
            
            {/* Separador */}
            {!success && (
              <motion.div
                className="flex items-center my-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex-grow h-px bg-[#aedd2b]/30"></div>
                <span className="mx-4 text-white/60 text-sm">O regístrate con</span>
                <div className="flex-grow h-px bg-[#aedd2b]/30"></div>
              </motion.div>
            )}
            
            {/* Botones de redes sociales */}
            {!success && (
              <motion.div
                className="grid grid-cols-3 gap-4 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <button className="bg-[#02416d]/50 backdrop-blur-sm py-3 rounded-xl border border-[#aedd2b]/20 hover:bg-[#aedd2b]/10 transition-colors flex items-center justify-center">
                  <FaGoogle className="text-white text-xl" />
                </button>
                <button className="bg-[#02416d]/50 backdrop-blur-sm py-3 rounded-xl border border-[#aedd2b]/20 hover:bg-[#aedd2b]/10 transition-colors flex items-center justify-center">
                  <FaFacebook className="text-white text-xl" />
                </button>
                <button className="bg-[#02416d]/50 backdrop-blur-sm py-3 rounded-xl border border-[#aedd2b]/20 hover:bg-[#aedd2b]/10 transition-colors flex items-center justify-center">
                  <FaTwitter className="text-white text-xl" />
                </button>
              </motion.div>
            )}
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
        
        {/* Elementos decorativos flotantes culturales */}
        {['🎭', '📖', '🎨', '🎬', '🎙️', '🥁', '📚', '🎤'].map((icon, index) => (
          <motion.div
            key={index}
            className="absolute text-3xl text-[#aedd2b]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
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
        
        {/* Enlace a login FUERA del formulario */}
        <motion.div
          className="mt-6 text-center text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: success ? 0.5 : 1.4 }}
        >
          <p>
            ¿Ya tienes una cuenta?{' '}
            <button 
              onClick={() => router.push('/login')}
              className="text-[#aedd2b] font-medium hover:underline cursor-pointer"
            >
              Inicia sesión
            </button>
          </p>
        </motion.div>
      </motion.div>

      {/* Modal para Términos y Condiciones */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -20 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-2xl"
            >
              <TermsModal setShowTermsModal={setShowTermsModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal para Política de Privacidad */}
      <AnimatePresence>
        {showPrivacyModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -20 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-2xl"
            >
              <PrivacyModal setShowPrivacyModal={setShowPrivacyModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegisterPage;
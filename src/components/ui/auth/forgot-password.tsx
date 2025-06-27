'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Efecto de partículas flotantes
  useEffect(() => {
    if (!formRef.current) return;
    
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full bg-[#aedd2b]";
      
      const size = Math.random() * 6 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      const formRect = formRef.current!.getBoundingClientRect();
      particle.style.left = `${Math.random() * formRect.width}px`;
      particle.style.top = `${Math.random() * formRect.height}px`;
      
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

  // Manejar el contador de reenvío
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Validación simple del correo
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      setIsLoading(false);
      return;
    }
    
    try {
      // Simulación de petición a la API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Éxito - mostrar mensaje y activar contador
      setSuccess(true);
      setCountdown(60);
    } catch (err) {
      setError('Ocurrió un error. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setSuccess(true);
    setCountdown(60);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#012c4d] to-[#001a2d] p-4">
      {/* Fondo con animación */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(10)].map((_, i) => (
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
          {/* Efecto de luz */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#aedd2b] animate-pulse-slow"></div>
          
          <div className="p-8 sm:p-10">
            {/* Botón para volver */}
            <div className="mb-6">
              <button 
                onClick={() => router.back()}
                className="flex items-center text-[#aedd2b] hover:text-[#9bc926] transition-colors"
              >
                <FaArrowLeft className="mr-2" /> Volver
              </button>
            </div>
            
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
              {success ? '¡Correo enviado!' : 'Recupera tu contraseña'}
            </motion.h1>
            
            <motion.p 
              className="text-center text-white/80 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {success 
                ? 'Te hemos enviado un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada.' 
                : 'Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.'}
            </motion.p>
            
            {!success ? (
              <form onSubmit={handleSubmit}>
                {/* Campo Email */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
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
                
                {/* Botón de Enviar */}
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
                      <span className="relative z-10 text-[#02416d]">Enviar enlace</span>
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
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-[#aedd2b] flex items-center justify-center">
                    <FaCheck className="text-[#02416d] text-4xl" />
                  </div>
                </div>
                
                <motion.button
                  onClick={handleResend}
                  className={`w-full py-3 px-4 rounded-xl text-lg font-bold transition-all relative overflow-hidden mb-4 ${
                    countdown > 0 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-[#aedd2b] hover:bg-[#9bc926]'
                  }`}
                  disabled={countdown > 0}
                  whileHover={{ scale: countdown > 0 ? 1 : 1.03 }}
                  whileTap={{ scale: countdown > 0 ? 1 : 0.98 }}
                >
                  <span className="relative z-10">
                    {countdown > 0 
                      ? `Reenviar en ${countdown}s` 
                      : 'Reenviar correo'}
                  </span>
                </motion.button>
                
                <p className="text-sm text-white/70">
                  ¿No recibiste el correo? Revisa tu carpeta de spam o 
                  <button 
                    onClick={handleResend}
                    disabled={countdown > 0}
                    className={`ml-1 ${countdown > 0 ? 'text-gray-400' : 'text-[#aedd2b] hover:underline'}`}
                  >
                    solicita un nuevo enlace
                  </button>
                </p>
              </motion.div>
            )}
            
            {/* Mensajes de error */}
            {error && (
              <motion.div
                className="mt-4 p-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl text-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                {error}
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
        
        {/* Elementos decorativos flotantes */}
        {['🔒', '📧', '🔑', '✉️', '🔓'].map((icon, index) => (
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
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
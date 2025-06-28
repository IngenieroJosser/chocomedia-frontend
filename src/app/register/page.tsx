'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaGoogle, FaFacebook, FaTwitter, FaSeedling } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import TermsModal from '@/components/ui/auth/terms-and-conditions';
import PrivacyModal from '@/components/ui/auth/privacy-policy';
import { ICreateAccount } from '@/lib/auth';
import { createAccount } from '@/services/auth-service';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formDataRegister, setFormDataRegister] = useState<ICreateAccount>({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Efecto de fondo holográfico
  useEffect(() => {
    if (!formRef.current) return;
    
    const createHolographicEffect = () => {
      const container = formRef.current!;
      const effect = document.createElement('div');
      effect.className = 'absolute inset-0 pointer-events-none opacity-30';
      
      // Patrón de líneas holográficas
      for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.className = 'absolute h-px bg-[#aedd2b] rounded-full';
        line.style.top = `${Math.random() * 100}%`;
        line.style.left = '0';
        line.style.width = '100%';
        line.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        
        effect.appendChild(line);
      }
      
      container.appendChild(effect);
      
      // Animación de líneas
      const lines = effect.querySelectorAll('div');
      lines.forEach((line, i) => {
        const duration = 10 + Math.random() * 10;
        line.animate(
          [
            { transform: 'translateY(0px)', opacity: 0.1 },
            { transform: `translateY(${Math.random() * 40 - 20}px)`, opacity: 0.5 },
            { transform: `translateY(${Math.random() * 40 - 20}px)`, opacity: 0.1 }
          ],
          {
            duration: duration * 1000,
            iterations: Infinity,
            easing: 'ease-in-out'
          }
        );
      });
    };
    
    createHolographicEffect();
  }, []);

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataRegister(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formDataRegister.name || !formDataRegister.email || !formDataRegister.password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    
    if (formDataRegister.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await createAccount(formDataRegister);
      setSuccess(true);
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al registrar la cuenta');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#001a2d] to-[#000f1c] p-4 overflow-hidden relative">
      {/* Efecto de partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#aedd2b]"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Contenedor principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full max-w-md z-10"
      >
        {/* Formulario con efecto de vidrio y borde luminoso */}
        <motion.div
          ref={formRef}
          className="bg-[#012c4d]/70 backdrop-blur-2xl rounded-3xl border border-[#aedd2b]/40 shadow-2xl overflow-hidden relative"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            boxShadow: '0 0 30px rgba(2, 65, 109, 0.7), 0 0 60px rgba(174, 221, 43, 0.3)'
          }}
        >
          {/* Efecto de borde luminoso animado */}
          <motion.div 
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{
              boxShadow: [
                `inset 0 0 10px rgba(174, 221, 43, 0.3)`,
                `inset 0 0 20px rgba(174, 221, 43, 0.5)`,
                `inset 0 0 10px rgba(174, 221, 43, 0.3)`
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          />
          
          <div className="p-8 sm:p-10">
            {/* Logo y título con efecto de gradiente */}
            <motion.div 
              className="flex flex-col items-center mb-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-[#aedd2b] to-[#9bc926] rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-lg"
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <FaSeedling className="text-[#02416d] text-3xl" />
              </motion.div>
              <h1 className="text-3xl font-bold text-center text-white">
                Únete a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#aedd2b] to-[#9bc926]">ChocóMedia</span>
              </h1>
              <p className="text-center text-white/80 mt-2">
                Comienza tu viaje cultural
              </p>
            </motion.div>
            
            {/* Mensaje de éxito */}
            {success && (
              <motion.div
                className="mb-6 p-4 bg-gradient-to-r from-[#aedd2b]/20 to-[#9bc926]/20 border border-[#aedd2b] text-[#aedd2b] rounded-xl text-center backdrop-blur-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-medium">¡Registro exitoso!</p>
                <p className="text-sm mt-1">Redirigiendo a tu panel...</p>
              </motion.div>
            )}
            
            {/* Formulario */}
            {!success && (
              <form onSubmit={handleSubmitCreateAccount}>
                {/* Campo Nombre con efecto de foco */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onFocus={() => setActiveField('name')}
                  onBlur={() => setActiveField(null)}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <FaUser className={`transition-colors ${activeField === 'name' ? 'text-[#aedd2b] scale-110' : 'text-[#aedd2b]/70'}`} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formDataRegister.name}
                      onChange={handleChangeForm}
                      className="w-full pl-12 pr-4 py-3.5 bg-[#02416d]/30 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#aedd2b] transition-all"
                      placeholder="Nombre completo"
                      required
                    />
                    <motion.div 
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#aedd2b] to-[#9bc926] ${activeField === 'name' ? 'w-full' : 'w-0'}`}
                      animate={{ width: activeField === 'name' ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
                
                {/* Campo Email */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <FaEnvelope className={`transition-colors ${activeField === 'email' ? 'text-[#aedd2b] scale-110' : 'text-[#aedd2b]/70'}`} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formDataRegister.email}
                      onChange={handleChangeForm}
                      className="w-full pl-12 pr-4 py-3.5 bg-[#02416d]/30 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#aedd2b] transition-all"
                      placeholder="Correo electrónico"
                      required
                    />
                    <motion.div 
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#aedd2b] to-[#9bc926] ${activeField === 'email' ? 'w-full' : 'w-0'}`}
                      animate={{ width: activeField === 'email' ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
                
                {/* Campo Contraseña */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  onFocus={() => setActiveField('password')}
                  onBlur={() => setActiveField(null)}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <FaLock className={`transition-colors ${activeField === 'password' ? 'text-[#aedd2b] scale-110' : 'text-[#aedd2b]/70'}`} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formDataRegister.password}
                      onChange={handleChangeForm}
                      className="w-full pl-12 pr-12 py-3.5 bg-[#02416d]/30 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#aedd2b] transition-all"
                      placeholder="Contraseña"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#aedd2b] hover:text-[#9bc926] transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <motion.div 
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#aedd2b] to-[#9bc926] ${activeField === 'password' ? 'w-full' : 'w-0'}`}
                      animate={{ width: activeField === 'password' ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
                
                {/* Indicador de seguridad de contraseña animado */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="flex items-center mb-1">
                    {[1, 2, 3].map((level) => (
                      <motion.div
                        key={level}
                        className={`flex-grow h-1.5 mx-1 rounded-full ${
                          formDataRegister.password.length < 6 ? 'bg-red-500/50' :
                          formDataRegister.password.length < 8 ? (level <= 2 ? 'bg-orange-500' : 'bg-[#02416d]') :
                          level <= 3 ? 'bg-[#aedd2b]' : 'bg-[#02416d]'
                        }`}
                        animate={{ 
                          scaleY: formDataRegister.password.length > 0 ? [1, 1.5, 1] : 1 
                        }}
                        transition={{ duration: 0.5, delay: level * 0.1 }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-white/60">
                    {formDataRegister.password.length < 6 
                      ? 'Contraseña débil' 
                      : formDataRegister.password.length < 8 
                        ? 'Contraseña media' 
                        : 'Contraseña fuerte'}
                  </p>
                </motion.div>
                
                {/* Términos y condiciones */}
                <motion.div
                  className="flex items-start mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-5 h-5 text-[#aedd2b] bg-[#02416d]/50 border-[#aedd2b]/50 rounded focus:ring-[#aedd2b] focus:ring-2"
                    required
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-white">
                    Acepto los 
                    <button 
                      type="button"
                      className="text-[#aedd2b] hover:underline mx-1 font-medium"
                      onClick={() => setShowTermsModal(true)}
                    >
                      Términos y Condiciones
                    </button> 
                    y la 
                    <button 
                      type="button"
                      className="text-[#aedd2b] hover:underline ml-1 font-medium"
                      onClick={() => setShowPrivacyModal(true)}
                    >
                      Política de Privacidad
                    </button>
                  </label>
                </motion.div>
                
                {/* Botón de Registro con efecto de gradiente */}
                <motion.button
                  type="submit"
                  className={`w-full py-4 px-4 rounded-xl text-lg font-bold transition-all relative overflow-hidden group ${
                    isLoading 
                      ? 'bg-gradient-to-r from-[#aedd2b]/70 to-[#9bc926]/70 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#aedd2b] to-[#9bc926] hover:opacity-90'
                  }`}
                  disabled={isLoading}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading ? (
                    <div className="flex justify-center">
                      <motion.div
                        className="w-6 h-6 border-t-2 border-[#02416d] border-solid rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10 text-[#02416d] font-bold">Crear Cuenta</span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                      />
                    </>
                  )}
                </motion.button>
                
                {/* Mensaje de error */}
                {error && (
                  <motion.div
                    className="mt-5 p-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/50 text-red-300 rounded-xl text-sm backdrop-blur-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    {error}
                  </motion.div>
                )}
              </form>
            )}
            
            {/* Separador animado */}
            {!success && (
              <motion.div
                className="flex items-center my-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div 
                  className="flex-grow h-px bg-[#aedd2b]/30"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 0.8 }}
                />
                <span className="mx-4 text-white/60 text-sm">O regístrate con</span>
                <motion.div 
                  className="flex-grow h-px bg-[#aedd2b]/30"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            )}
            
            {/* Botones de redes sociales con efecto de elevación */}
            {!success && (
              <motion.div
                className="grid grid-cols-3 gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <motion.button
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#02416d]/50 backdrop-blur-sm py-3 rounded-xl border border-[#aedd2b]/20 hover:bg-[#aedd2b]/10 transition-colors flex items-center justify-center"
                >
                  <FaGoogle className="text-white text-xl" />
                </motion.button>
                <motion.button
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#02416d]/50 backdrop-blur-sm py-3 rounded-xl border border-[#aedd2b]/20 hover:bg-[#aedd2b]/10 transition-colors flex items-center justify-center"
                >
                  <FaFacebook className="text-white text-xl" />
                </motion.button>
                <motion.button
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#02416d]/50 backdrop-blur-sm py-3 rounded-xl border border-[#aedd2b]/20 hover:bg-[#aedd2b]/10 transition-colors flex items-center justify-center"
                >
                  <FaTwitter className="text-white text-xl" />
                </motion.button>
              </motion.div>
            )}
          </div>
          
          {/* Olas decorativas animadas */}
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
            className="absolute text-4xl text-[#aedd2b] opacity-50"
            style={{
              top: `${10 + index * 10}%`,
              left: `${Math.random() * 90 + 5}%`,
              zIndex: -1
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0]
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {icon}
          </motion.div>
        ))}
        
        {/* Enlace a login con efecto de brillo */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: success ? 0.5 : 1.4 }}
        >
          <p className="text-white/80">
            ¿Ya tienes una cuenta?{' '}
            <motion.button 
              onClick={() => router.push('/login')}
              className="text-[#aedd2b] font-bold hover:underline cursor-pointer relative"
              whileHover={{ scale: 1.05 }}
            >
              <span>Inicia sesión</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-[#aedd2b]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </p>
        </motion.div>
      </motion.div>

      {/* Modal para Términos y Condiciones con efecto 3D */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40, rotateX: 45 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, y: -40, rotateX: -45 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-gradient-to-b from-[#012c4d] to-[#001a2d] rounded-2xl border border-[#aedd2b]/40 shadow-2xl overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <div className="p-1 bg-gradient-to-r from-[#aedd2b] to-[#9bc926]">
                <div className="bg-[#012c4d] p-6">
                  <TermsModal setShowTermsModal={setShowTermsModal} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal para Política de Privacidad con efecto 3D */}
      <AnimatePresence>
        {showPrivacyModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40, rotateX: 45 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, y: -40, rotateX: -45 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-gradient-to-b from-[#012c4d] to-[#001a2d] rounded-2xl border border-[#aedd2b]/40 shadow-2xl overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <div className="p-1 bg-gradient-to-r from-[#aedd2b] to-[#9bc926]">
                <div className="bg-[#012c4d] p-6">
                  <PrivacyModal setShowPrivacyModal={setShowPrivacyModal} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegisterPage;
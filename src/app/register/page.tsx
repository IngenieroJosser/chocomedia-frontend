'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaGoogle, FaFacebook, FaTwitter, FaSeedling, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { ICreateAccount } from '@/lib/auth';
import { createAccount } from '@/services/auth-service';
import Header from '@/components/ui/home/header';

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
  const [isClient, setIsClient] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!formRef.current || !isClient) return;
    
    const createHolographicEffect = () => {
      const container = formRef.current!;
      const effect = document.createElement('div');
      effect.className = 'absolute inset-0 pointer-events-none opacity-30';
      
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
  }, [isClient]);

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


  const TermsModal = () => (
    <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
      <div className="bg-gradient-to-r from-[#012c4d] to-[#001a2d] rounded-xl p-1 mb-6">
        <div className="flex items-center gap-4 bg-[#012c4d] p-4 rounded-lg">
          <div className="bg-[#aedd2b]/10 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#aedd2b]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#aedd2b]">Términos y Condiciones</h2>
            <p className="text-white/80 text-sm">Última actualización: 15 de Octubre, 2023</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6 text-white/90">
        <div className="bg-[#012c4d]/50 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-[#aedd2b]/10 p-2 rounded-full mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#aedd2b]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">1. Uso del Servicio</h3>
          </div>
          <p className="mb-3">
            ChocóMedia proporciona una plataforma para compartir y promover contenido cultural. Al utilizar nuestro servicio, aceptas:
          </p>
          <ul className="space-y-2">
            {[
              "No subir contenido ilegal, difamatorio o que viole derechos de terceros",
              "Mantener la precisión de la información de tu cuenta",
              "Ser responsable de toda actividad que ocurra bajo tu cuenta"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="bg-[#aedd2b] w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-[#012c4d]/50 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-[#aedd2b]/10 p-2 rounded-full mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#aedd2b]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">2. Contenido del Usuario</h3>
          </div>
          <p className="mb-3">
            Tú conservas los derechos de propiedad intelectual de todo el contenido que publiques. Al publicar contenido, nos concedes una licencia mundial no exclusiva para:
          </p>
          <ul className="space-y-2">
            {[
              "Almacenar, mostrar y distribuir tu contenido",
              "Promover tu contenido dentro de nuestra plataforma",
              "Adaptar tu contenido para fines técnicos"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="bg-[#aedd2b] w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-[#012c4d]/50 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-[#aedd2b]/10 p-2 rounded-full mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#aedd2b]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">3. Privacidad</h3>
          </div>
          <p>
            Respetamos tu privacidad y protegemos tus datos personales. Consulta nuestra Política de Privacidad para más detalles sobre cómo manejamos tu información.
          </p>
        </div>
        
        <div className="bg-[#012c4d]/50 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-[#aedd2b]/10 p-2 rounded-full mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#aedd2b]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">4. Modificaciones</h3>
          </div>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Las actualizaciones serán notificadas a través de nuestro sitio web.
          </p>
        </div>
        
        <div className="flex justify-center mt-8">
          <motion.button
            onClick={() => setShowTermsModal(false)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            He leído y acepto los términos
          </motion.button>
        </div>
      </div>
    </div>
  );

  const PrivacyModal = () => (
    <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
      <div className="bg-gradient-to-r from-[#012c4d] to-[#001a2d] rounded-xl p-1 mb-6">
        <div className="flex items-center gap-4 bg-[#012c4d] p-4 rounded-lg">
          <div className="bg-[#aedd2b]/10 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#aedd2b]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#aedd2b]">Política de Privacidad</h2>
            <p className="text-white/80 text-sm">Última actualización: 15 de Octubre, 2023</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6 text-white/90">
        <div className="bg-[#012c4d]/50 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-[#aedd2b]/10 p-2 rounded-full mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#aedd2b]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">1. Información que Recopilamos</h3>
          </div>
          <p className="mb-3">
            Recopilamos información que nos proporcionas directamente al registrarte y usar nuestros servicios:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: "👤", title: "Datos personales", desc: "Nombre, email, información de contacto" },
              { icon: "🔐", title: "Credenciales", desc: "Usuario, contraseña (encriptada)" },
              { icon: "🎨", title: "Contenido", desc: "Tus publicaciones y creaciones" },
              { icon: "📊", title: "Interacciones", desc: "Actividad en la plataforma" }
            ].map((item, i) => (
              <div key={i} className="bg-[#001a2d] p-4 rounded-lg border border-[#aedd2b]/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <h4 className="font-bold text-[#aedd2b]">{item.title}</h4>
                </div>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#012c4d]/50 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-[#aedd2b]/10 p-2 rounded-full mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#aedd2b]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.049l1.715-5.349L11 6.477V5h2a1 1 0 110 2H9a1 1 0 01-1-1V3a1 1 0 112 0v.523l2.78 1.112L9.252 13.2a1 1 0 01-.285 1.049A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.049l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">2. Cómo Usamos tu Información</h3>
          </div>
          <p className="mb-3">
            Utilizamos tu información para los siguientes propósitos:
          </p>
          <div className="relative mt-6">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#aedd2b]/30 ml-5"></div>
            <ul className="space-y-8 pl-12">
              {[
                { icon: "🚀", title: "Proporcionar servicios", desc: "Operar y mejorar nuestra plataforma" },
                { icon: "🎯", title: "Personalizar experiencia", desc: "Adaptar contenido a tus intereses" },
                { icon: "📬", title: "Comunicación", desc: "Enviar actualizaciones y novedades" },
                { icon: "🛡️", title: "Seguridad", desc: "Proteger nuestra plataforma y usuarios" }
              ].map((item, i) => (
                <li key={i} className="relative">
                  <div className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-[#012c4d] border-2 border-[#aedd2b] flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-[#aedd2b]">{item.title}</h4>
                  <p className="text-white/80">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-[#012c4d]/50 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-[#aedd2b]/10 p-2 rounded-full mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#aedd2b]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">3. Compartir Información</h3>
          </div>
          <p className="mb-3">
            Solo compartimos información en las siguientes situaciones:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { icon: "✅", title: "Con tu consentimiento", color: "from-green-500/20 to-green-600/20" },
              { icon: "⚖️", title: "Requisitos legales", color: "from-blue-500/20 to-blue-600/20" },
              { icon: "🤝", title: "Proveedores de servicio", color: "from-purple-500/20 to-purple-600/20" }
            ].map((item, i) => (
              <div key={i} className={`bg-gradient-to-r ${item.color} p-0.5 rounded-xl`}>
                <div className="bg-[#012c4d] rounded-xl p-4 h-full flex flex-col items-center text-center">
                  <span className="text-3xl mb-3">{item.icon}</span>
                  <h4 className="font-bold">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#012c4d]/50 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-[#aedd2b]/10 p-2 rounded-full mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#aedd2b]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">4. Seguridad de Datos</h3>
          </div>
          <p className="mb-4">
            Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
          </p>
          <div className="flex flex-wrap gap-2">
            {["Encriptación AES-256", "Autenticación de dos factores", "Auditorías de seguridad regulares", "Protección contra DDoS", "Copias de seguridad diarias"].map((item, i) => (
              <span key={i} className="px-3 py-1 bg-[#001a2d] rounded-full text-sm border border-[#aedd2b]/30">
                {item}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <motion.button
            onClick={() => setShowPrivacyModal(false)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d] font-bold flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Entendido
          </motion.button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#001a2d] to-[#000f1c] p-4 overflow-hidden relative">
      <Header />
      
      {/* Efecto de partículas de fondo - Solo en cliente */}
      {isClient && (
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
      )}
      
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
        
        {/* Elementos decorativos flotantes culturales - Solo en cliente */}
        {isClient && (
          <>
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
          </>
        )}
        
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
              <div className="p-1 bg-gradient-to-r from-[#aedd2b] to-[#9bc926] relative">
                <button 
                  onClick={() => setShowTermsModal(false)}
                  className="absolute top-3 right-3 z-20 text-white hover:text-[#02416d] transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
                <div className="bg-[#012c4d] p-6">
                  <TermsModal />
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
              <div className="p-1 bg-gradient-to-r from-[#aedd2b] to-[#9bc926] relative">
                <button 
                  onClick={() => setShowPrivacyModal(false)}
                  className="absolute top-3 right-3 z-20 text-white hover:text-[#02416d] transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
                <div className="bg-[#012c4d] p-6">
                  <PrivacyModal />
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
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronDown, FaChevronUp, FaLock, FaShieldAlt, FaUserShield, FaHandHoldingHeart, FaLeaf, FaWater, FaTree } from 'react-icons/fa';

interface PrivacyModalProps {
  setShowPrivacyModal: (value: boolean) => void;
}

const PrivacyModal = ({ setShowPrivacyModal }: PrivacyModalProps) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const privacySections = [
    {
      title: "La Cosecha de Información",
      icon: <FaLeaf className="text-[#aedd2b]" />,
      content: "Como cultivadores de esta comunidad digital, recogemos solo lo necesario: tu nombre, correo electrónico y lo esencial para hacer crecer tu experiencia en ChocóMedia. Nunca más de lo que podemos abrazar con respeto.",
      culturalNote: "En nuestras tierras, solo tomamos lo que la naturaleza ofrece generosamente, nunca más."
    },
    {
      title: "El Uso de tu Savia",
      icon: <FaWater className="text-[#aedd2b]" />,
      content: "Tu información es como el agua que nutre nuestros cultivos digitales. La usamos para:",
      listItems: [
        "Regar y hacer crecer nuestros servicios",
        "Dar forma única a tu experiencia cultural",
        "Enviarte mensajes como brisas cargadas de noticias",
        "Proteger nuestro jardín digital de intrusos"
      ],
      culturalNote: "El agua es vida, y la cuidamos como a nuestra propia sangre."
    },
    {
      title: "Compartir con la Comunidad",
      icon: <FaTree className="text-[#aedd2b]" />,
      content: "Tus datos personales son semillas sagradas que no vendemos ni comerciamos. Solo compartimos con aliados de confianza que nos ayudan a cuidar este bosque digital, siempre bajo nuestra vigilancia.",
      culturalNote: "En la minga, compartimos herramientas pero nunca las semillas ancestrales."
    },
    {
      title: "Las Huellas Digitales (Cookies)",
      icon: <FaShieldAlt className="text-[#aedd2b]" />,
      content: "Usamos pequeñas huellas digitales (cookies) para recordar tus pasos y hacer tu camino más suave. Puedes borrarlas como las olas borran las huellas en la playa, desde la configuración de tu navegador.",
      culturalNote: "Solo seguimos huellas cuando es necesario para proteger el camino."
    },
    {
      title: "El Tejido de Protección",
      icon: <FaUserShield className="text-[#aedd2b]" />,
      content: "Hemos tejido una red de seguridad con las fibras más fuertes para proteger tu información. Pero como ninguna red pesquera es perfecta, te pedimos navegar con conciencia en estas aguas digitales.",
      culturalNote: "Nuestras redes ancestrales protegen, pero el mar siempre tiene sus misterios."
    },
    {
      title: "La Danza de los Cambios",
      icon: <FaHandHoldingHeart className="text-[#aedd2b]" />,
      content: "Esta política puede bailar al ritmo de los nuevos tiempos. Te avisaremos con el repique del cununo cuando hagamos cambios significativos, para que siempre estés en el mismo compás que nosotros.",
      culturalNote: "Como el río cambia su curso pero mantiene su esencia, así evolucionamos."
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative w-full max-w-4xl bg-gradient-to-br from-[#001a2d] to-[#012c4d] rounded-3xl border-2 border-[#aedd2b]/40 shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          transition={{ type: "spring", damping: 25, delay: 0.1 }}
        >
          {/* Fondo con patrones culturales */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDApIj4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzAwMTEyNSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDIwIDIwTTQwIDBMMjAgMjBNMCA0MEwyMCAyME00MCA0MEwyMCAyME0yMCAwTDQwIDIwTDIwIDQwTDAgMjBaIiBzdHJva2U9IiNhZWRkMmIiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSI+PC9wYXRoPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSI+PC9yZWN0Pgo8L3N2Zz4=')]"></div>
          </div>
          
          {/* Olas decorativas en la parte inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden opacity-40">
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
          
          {/* Cabecera con elementos culturales */}
          <div className="relative z-10 p-8 bg-gradient-to-r from-[#012c4d]/80 to-[#001a2d]/80 border-b border-[#aedd2b]/40">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  <span className="text-[#aedd2b]">Protección de Datos</span> en ChocóMedia
                </h1>
                <p className="text-white/80 mt-2">
                  Un compromiso sagrado con tu privacidad
                </p>
              </div>
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="text-white/70 hover:text-white text-xl p-2 rounded-full hover:bg-[#012c4d] transition-all"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-6">
              {['🌿', '🔒', '🛡️', '🌊', '🌳'].map((icon, index) => (
                <motion.div
                  key={index}
                  className="text-2xl"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3 + index, 
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Contenido principal con acordeones */}
          <div className="relative z-10 max-h-[60vh] overflow-y-auto p-6">
            <div className="space-y-6">
              {privacySections.map((section, index) => (
                <motion.div
                  key={index}
                  className="bg-[#012c4d]/60 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <button
                    className="w-full flex items-center justify-between p-4 text-left"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-[#aedd2b]/20 p-2 rounded-lg">
                        {section.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{section.title}</h3>
                    </div>
                    {activeSection === index ? <FaChevronUp className="text-[#aedd2b]" /> : <FaChevronDown className="text-[#aedd2b]" />}
                  </button>
                  
                  <AnimatePresence>
                    {activeSection === index && (
                      <motion.div
                        className="px-4 pb-4 border-t border-[#aedd2b]/20"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mt-4 text-white/90">
                          <p>{section.content}</p>
                          
                          {section.listItems && (
                            <ul className="mt-3 space-y-2 pl-5">
                              {section.listItems.map((item, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-[#aedd2b] mr-2">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                          
                          <div className="mt-4 p-3 bg-[#001a2d] border-l-4 border-[#aedd2b] rounded-r-lg">
                            <p className="text-[#aedd2b] italic">"Sabiduría Ancestral"</p>
                            <p className="mt-1">{section.culturalNote}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            
            {/* Compromiso final */}
            <motion.div
              className="mt-8 p-6 bg-gradient-to-r from-[#001a2d] to-[#012c4d] rounded-xl border border-[#aedd2b]/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#aedd2b]/20 p-4 rounded-full mb-4">
                  <FaLock className="text-[#aedd2b] text-2xl" />
                </div>
                
                <h3 className="text-xl font-bold text-[#aedd2b] mb-3">
                  Nuestro Juramento de Protección
                </h3>
                
                <p className="text-white/80 mb-4">
                  "Protegemos tus datos como protegemos nuestras raíces culturales: 
                  con respeto, dedicación y un compromiso inquebrantable"
                </p>
                
                <div className="flex items-start w-full mb-4">
                  <input
                    type="checkbox"
                    id="accept-privacy"
                    className="mt-1 w-5 h-5 text-[#aedd2b] bg-gray-700 border-gray-600 rounded focus:ring-[#aedd2b] focus:ring-2"
                    checked={acceptedPrivacy}
                    onChange={() => setAcceptedPrivacy(!acceptedPrivacy)}
                  />
                  <label htmlFor="accept-privacy" className="ml-3 text-white text-left">
                    <span className="font-bold text-[#aedd2b]">Confío en la protección de ChocóMedia</span>
                    <p className="mt-1 text-white/80">
                      Al marcar esta casilla, reconozco que he comprendido cómo cuidamos tu información
                      y acepto formar parte de esta comunidad protegida.
                    </p>
                  </label>
                </div>
                
                <motion.button
                  className={`w-full py-3 px-4 rounded-xl text-lg font-bold transition-all relative overflow-hidden ${
                    !acceptedPrivacy 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-[#aedd2b] hover:bg-[#9bc926]'
                  }`}
                  disabled={!acceptedPrivacy}
                  whileHover={{ scale: acceptedPrivacy ? 1.03 : 1 }}
                  whileTap={{ scale: acceptedPrivacy ? 0.98 : 1 }}
                >
                  <span className="relative z-10 text-[#02416d]">Entrar al Santuario Digital</span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut"
                    }}
                  />
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          {/* Pie de página con elementos culturales */}
          <div className="relative z-10 p-6 bg-[#001a2d] border-t border-[#aedd2b]/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-[#aedd2b] w-3 h-3 rounded-full animate-pulse"></div>
                <p className="text-white/70 text-sm">
                  ChocóMedia · Donde tu privacidad es un territorio sagrado
                </p>
              </div>
              
              <div className="flex gap-2">
                {['🌴', '🔐', '🌺', '🛡️'].map((icon, index) => (
                  <motion.div
                    key={index}
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      y: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 3 + index, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PrivacyModal;
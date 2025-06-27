'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronDown, FaChevronUp, FaCheck, FaSeedling, FaWater, FaMusic, FaHandshake } from 'react-icons/fa';

interface TermsModalProps {
  setShowTermsModal: (value: boolean) => void;
}

const TermsModal = ({ setShowTermsModal }: TermsModalProps) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const termsSections = [
    {
      title: "Aceptación de los Términos",
      icon: <FaCheck className="text-[#aedd2b]" />,
      content: "Al registrarte en ChocóMedia, aceptas navegar por nuestras aguas culturales. Si no estás de acuerdo con algún aspecto de estos términos, te invitamos a reflexionar bajo la sombra de nuestros árboles antes de continuar.",
      culturalNote: "En la tradición chocoana, los acuerdos se sellan con un apretón de manos y una mirada sincera."
    },
    {
      title: "Uso del Servicio",
      icon: <FaSeedling className="text-[#aedd2b]" />,
      content: "ChocóMedia es un jardín digital donde crece la cultura del Pacífico. Te invitamos a caminar por sus senderos con respeto, usando nuestro servicio solo para fines que honren nuestras raíces y tradiciones.",
      culturalNote: "Así como nuestros mayores cuidan el bosque, cuidamos esta plataforma para las generaciones futuras."
    },
    {
      title: "Contenido del Usuario",
      icon: <FaWater className="text-[#aedd2b]" />,
      content: "Eres el río que alimenta nuestra plataforma con tu contenido. Al compartirlo, permites que fluya por nuestro ecosistema digital, llegando a otras comunidades que valoran nuestra herencia cultural.",
      culturalNote: "El agua que compartes vuelve a ti en forma de lluvia. Así funciona el ciclo de la creación colectiva."
    },
    {
      title: "Propiedad Intelectual",
      icon: <FaMusic className="text-[#aedd2b]" />,
      content: "Los ritmos, colores y palabras que conforman ChocóMedia son nuestra esencia. Invitamos a compartir la belleza, pero pedimos respeto por el origen. No copies sin reconocimiento, no modifiques sin consulta.",
      culturalNote: "En nuestras comunidades, cada canción tiene su dueño y cada historia su narrador. Respetamos esta tradición."
    },
    {
      title: "Responsabilidad",
      icon: <FaHandshake className="text-[#aedd2b]" />,
      content: "ChocóMedia es un puente entre culturas, pero cada viajero es responsable de su equipaje. No seremos responsables por maletas perdidas en este viaje digital, aunque siempre estaremos para señalar el camino.",
      culturalNote: "Como en las mingas comunitarias, cada quien aporta lo que puede y recibe según sus necesidades."
    },
    {
      title: "Modificaciones",
      icon: <FaChevronDown className="text-[#aedd2b]" />,
      content: "Así como los ríos cambian su curso, estos términos pueden evolucionar. Te avisaremos con el sonido del bombo y el cununo cuando lleguen cambios significativos.",
      culturalNote: "Nuestros ancestros enseñaron que solo el cambio es permanente. Aceptamos esta sabiduría en nuestra plataforma."
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
          className="relative w-full max-w-4xl bg-gradient-to-br from-[#012c4d] to-[#001a2d] rounded-3xl border-2 border-[#aedd2b]/40 shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          transition={{ type: "spring", damping: 25, delay: 0.1 }}
        >
          {/* Patrón cultural de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+CjxwYXRoIGQ9Ik0wIDBIMjBWMjBIMHoiIGZpbGw9Im5vbmUiPjwvcGF0aD4KPHBhdGggZD0iTTAgMGgxdjFIMHoiIGZpbGw9IiNhZWRkMmIiPjwvcGF0aD4KPHBhdGggZD0iTTAgMGgxdjFIMHoiIGZpbGw9IiMwMTJjNGQiPjwvcGF0aD4KPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiPjwvcmVjdD4KPC9zdmc+')]"></div>
          </div>
          
          {/* Olas decorativas en la parte inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden opacity-30">
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
          <div className="relative z-10 p-8 bg-gradient-to-r from-[#012c4d]/80 to-[#02416d]/80 border-b border-[#aedd2b]/40">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  <span className="text-[#aedd2b]">Términos y Condiciones</span> de ChocóMedia
                </h1>
                <p className="text-white/80 mt-2">
                  Un pacto cultural para nuestro viaje digital
                </p>
              </div>
              <button 
                onClick={() => setShowTermsModal(false)}
                className="text-white/70 hover:text-white text-xl p-2 rounded-full hover:bg-[#012c4d] transition-all"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-6">
              {['🎭', '🥁', '📖', '🎨', '🎤'].map((icon, index) => (
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
            <div className="space-y-4">
              {termsSections.map((section, index) => (
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
                          <div className="mt-3 p-3 bg-[#001a2d] border-l-4 border-[#aedd2b] rounded-r-lg">
                            <p className="text-[#aedd2b] italic">"Sabiduría Chocoana"</p>
                            <p className="mt-1">{section.culturalNote}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            
            {/* Acuerdo final */}
            <motion.div
              className="mt-8 p-6 bg-gradient-to-r from-[#001a2d] to-[#012c4d] rounded-xl border border-[#aedd2b]/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="accept-terms"
                  className="mt-1 w-5 h-5 text-[#aedd2b] bg-gray-700 border-gray-600 rounded focus:ring-[#aedd2b] focus:ring-2"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                />
                <label htmlFor="accept-terms" className="ml-3 text-white">
                  <span className="font-bold text-[#aedd2b]">Acepto los términos culturales</span>
                  <p className="mt-1 text-white/80">
                    Al marcar esta casilla, confirmo que he leído y comprendido estos términos,
                    y me comprometo a honrar la cultura chocoana en cada interacción dentro de la plataforma.
                  </p>
                </label>
              </div>
              
              <motion.button
                className={`w-full mt-4 py-3 px-4 rounded-xl text-lg font-bold transition-all relative overflow-hidden ${
                  !acceptedTerms 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-[#aedd2b] hover:bg-[#9bc926]'
                }`}
                disabled={!acceptedTerms}
                whileHover={{ scale: acceptedTerms ? 1.03 : 1 }}
                whileTap={{ scale: acceptedTerms ? 0.98 : 1 }}
              >
                <span className="relative z-10 text-[#02416d]">Continuar con respeto</span>
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
            </motion.div>
          </div>
          
          {/* Pie de página con elementos culturales */}
          <div className="relative z-10 p-6 bg-[#001a2d] border-t border-[#aedd2b]/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-[#aedd2b] w-3 h-3 rounded-full"></div>
                <p className="text-white/70 text-sm">
                  ChocóMedia · Honrando nuestras raíces, construyendo nuestro futuro
                </p>
              </div>
              
              <div className="flex gap-2">
                {['🌿', '🌊', '🎶', '🌅'].map((icon, index) => (
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

export default TermsModal;
'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaPalette, FaBookOpen, FaArrowLeft, FaCheck, FaMusic, FaTheaterMasks, FaFilm, FaUtensils, FaLanguage, FaLeaf, FaWineBottle } from 'react-icons/fa';
import { GiMaterialsScience } from 'react-icons/gi';
import { IoMdColorPalette } from 'react-icons/io';
import Particles from '@/components/ui/particles';

const CreatorRegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSuccess, setFormSuccess] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Solo se ejecuta en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Datos de ejemplo para el formulario
  const [formData, setFormData] = useState({
    name: '',
    artisticName: '',
    email: '',
    password: '',
    confirmPassword: '',
    culturalDomain: '',
    bio: '',
    community: '',
    inspiration: ''
  });

  const culturalDomains = [
    { id: 'visual-arts', name: 'Artes Visuales', icon: <IoMdColorPalette className="text-2xl" />, color: "from-purple-500 to-indigo-600" },
    { id: 'music-dance', name: 'Música y Danza', icon: <FaMusic className="text-2xl" />, color: "from-rose-500 to-pink-600" },
    { id: 'literature', name: 'Literatura', icon: <FaBookOpen className="text-2xl" />, color: "from-amber-500 to-orange-500" },
    { id: 'theater', name: 'Teatro', icon: <FaTheaterMasks className="text-2xl" />, color: "from-emerald-500 to-teal-600" },
    { id: 'cinema', name: 'Cine', icon: <FaFilm className="text-2xl" />, color: "from-blue-500 to-cyan-600" },
    { id: 'crafts', name: 'Artesanía', icon: <FaWineBottle className="text-2xl" />, color: "from-amber-700 to-amber-900" },
    { id: 'gastronomy', name: 'Gastronomía', icon: <FaUtensils className="text-2xl" />, color: "from-red-500 to-orange-500" },
    { id: 'languages', name: 'Lenguas Indígenas', icon: <FaLanguage className="text-2xl" />, color: "from-green-500 to-lime-500" },
    { id: 'medicine', name: 'Medicina Tradicional', icon: <FaLeaf className="text-2xl" />, color: "from-green-600 to-emerald-700" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validación en tiempo real
    if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setFormErrors(prev => ({ ...prev, email: 'Formato de email inválido' }));
      } else {
        setFormErrors(prev => ({ ...prev, email: '' }));
      }
    }
    
    if (name === 'password' && value.length < 8 && value.length > 0) {
      setFormErrors(prev => ({ ...prev, password: 'La contraseña debe tener al menos 8 caracteres' }));
    } else if (name === 'password') {
      setFormErrors(prev => ({ ...prev, password: '' }));
    }
    
    if ((name === 'password' || name === 'confirmPassword') && formData.password !== formData.confirmPassword && formData.confirmPassword) {
      setFormErrors(prev => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden' }));
    } else if (name === 'confirmPassword' && value === formData.password) {
      setFormErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const validateStep = () => {
    const errors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.name.trim()) errors.name = 'Nombre es requerido';
      if (!formData.artisticName.trim()) errors.artisticName = 'Nombre artístico es requerido';
      if (!formData.email.trim()) {
        errors.email = 'Email es requerido';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) errors.email = 'Formato de email inválido';
      }
    }
    
    if (currentStep === 2 && !selectedDomain) {
      errors.domain = 'Por favor selecciona un dominio cultural';
    }
    
    if (currentStep === 3) {
      if (!formData.password) {
        errors.password = 'Contraseña es requerida';
      } else if (formData.password.length < 8) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres';
      }
      
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Confirma tu contraseña';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = async () => {
    if (!validateStep()) {
      await controls.start({
        x: [0, -10, 10, -10, 0],
        transition: { duration: 0.5 }
      });
      return;
    }
    
    if (currentStep === 3) {
      setIsLoading(true);
      // Simulación de registro exitoso
      setTimeout(() => {
        setIsLoading(false);
        setFormSuccess(true);
      }, 2000);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleDomainSelect = (domain: string) => {
    setSelectedDomain(domain);
    setFormData(prev => ({ ...prev, culturalDomain: domain }));
    setTimeout(handleNextStep, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextStep();
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, label: 'Información Personal' },
      { number: 2, label: 'Dominio Cultural' },
      { number: 3, label: 'Seguridad' }
    ];
    
    return (
      <div className="flex justify-center mb-8">
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center w-full max-w-md justify-between relative">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-[#02416d] z-0" />
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center z-10">
                <motion.div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step.number === currentStep 
                      ? 'bg-[#aedd2b] text-[#02416d] scale-110' 
                      : step.number < currentStep 
                        ? 'bg-[#9bc926] text-[#012c4d]' 
                        : 'bg-[#02416d] text-white/70'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {step.number}
                </motion.div>
                <motion.div 
                  className={`mt-2 text-xs font-medium text-center max-w-[100px] transition-colors ${
                    step.number === currentStep ? 'text-white' : 'text-white/60'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {step.label}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#000f1c] to-[#001a2d] p-4 relative overflow-hidden">
      <Particles />
      
      {/* Contenedor principal */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full max-w-2xl z-10"
      >
        {/* Formulario con efecto de vidrio y borde luminoso */}
        <motion.div
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
                `inset 0 0 30px rgba(174, 221, 43, 0.7)`,
                `inset 0 0 20px rgba(174, 221, 43, 0.5)`,
                `inset 0 0 10px rgba(174, 221, 43, 0.3)`
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity
            }}
          />
          
          <div className="p-8 sm:p-10">
            {/* Logo y título con efecto de gradiente para creadores */}
            <motion.div 
              className="flex flex-col items-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-[#aedd2b] to-[#9bc926] rounded-full w-24 h-24 flex items-center justify-center mb-4 shadow-lg"
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <FaPalette className="text-[#02416d] text-4xl" />
              </motion.div>
              <h1 className="text-3xl font-bold text-center text-white">
                Únete como <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#aedd2b] to-[#9bc926]">Creador Cultural</span>
              </h1>
              <p className="text-center text-white/80 mt-2">
                Comparte tu herencia cultural con el mundo
              </p>
            </motion.div>
            
            {/* Indicador de pasos personalizado */}
            {renderStepIndicator()}
            
            {/* Formulario por pasos */}
            <AnimatePresence mode="wait">
              {!formSuccess ? (
                <motion.form
                  onSubmit={handleSubmit}
                  animate={controls}
                  className="space-y-6"
                >
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Campo Nombre */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        onFocus={() => setActiveField('name')}
                        onBlur={() => setActiveField(null)}
                      >
                        <label className="block text-white/80 mb-2 font-medium">
                          Nombre completo <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <FaUser className={`transition-colors ${activeField === 'name' ? 'text-[#aedd2b] scale-110' : 'text-[#aedd2b]/70'}`} />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3.5 bg-[#02416d]/30 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#aedd2b] transition-all"
                            placeholder="Tu nombre real"
                          />
                          <motion.div 
                            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#aedd2b] to-[#9bc926] ${activeField === 'name' ? 'w-full' : 'w-0'}`}
                            animate={{ width: activeField === 'name' ? '100%' : '0%' }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        {formErrors.name && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-rose-400 text-sm mt-1"
                          >
                            {formErrors.name}
                          </motion.div>
                        )}
                      </motion.div>
                      
                      {/* Campo Nombre Artístico */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55 }}
                        onFocus={() => setActiveField('artisticName')}
                        onBlur={() => setActiveField(null)}
                      >
                        <label className="block text-white/80 mb-2 font-medium">
                          Nombre artístico <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <FaUser className={`transition-colors ${activeField === 'artisticName' ? 'text-[#aedd2b] scale-110' : 'text-[#aedd2b]/70'}`} />
                          </div>
                          <input
                            type="text"
                            name="artisticName"
                            value={formData.artisticName}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3.5 bg-[#02416d]/30 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#aedd2b] transition-all"
                            placeholder="Como te conocerá la comunidad"
                          />
                          <motion.div 
                            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#aedd2b] to-[#9bc926] ${activeField === 'artisticName' ? 'w-full' : 'w-0'}`}
                            animate={{ width: activeField === 'artisticName' ? '100%' : '0%' }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        {formErrors.artisticName && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-rose-400 text-sm mt-1"
                          >
                            {formErrors.artisticName}
                          </motion.div>
                        )}
                      </motion.div>
                      
                      {/* Campo Email */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        onFocus={() => setActiveField('email')}
                        onBlur={() => setActiveField(null)}
                      >
                        <label className="block text-white/80 mb-2 font-medium">
                          Correo electrónico <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <FaEnvelope className={`transition-colors ${activeField === 'email' ? 'text-[#aedd2b] scale-110' : 'text-[#aedd2b]/70'}`} />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3.5 bg-[#02416d]/30 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#aedd2b] transition-all"
                            placeholder="tu@email.com"
                          />
                          <motion.div 
                            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#aedd2b] to-[#9bc926] ${activeField === 'email' ? 'w-full' : 'w-0'}`}
                            animate={{ width: activeField === 'email' ? '100%' : '0%' }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        {formErrors.email && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-rose-400 text-sm mt-1"
                          >
                            {formErrors.email}
                          </motion.div>
                        )}
                      </motion.div>
                      
                      {/* Botón de siguiente */}
                      <motion.button
                        type="button"
                        className="w-full py-4 px-4 rounded-xl text-lg font-bold transition-all relative overflow-hidden group mt-8 bg-gradient-to-r from-[#aedd2b] to-[#9bc926] hover:opacity-90"
                        onClick={handleNextStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 text-[#02416d] font-bold">Siguiente</span>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                        />
                      </motion.button>
                    </motion.div>
                  )}
                  
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-white">
                          Selecciona tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#aedd2b] to-[#9bc926]">dominio cultural</span>
                        </h2>
                        <p className="text-white/70 mt-2">
                          ¿En qué área cultural te especializas?
                        </p>
                        {formErrors.domain && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-rose-400 text-sm mt-2"
                          >
                            {formErrors.domain}
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        {culturalDomains.map((domain) => (
                          <motion.button
                            key={domain.id}
                            type="button"
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all relative overflow-hidden group ${
                              selectedDomain === domain.id
                                ? `border-transparent bg-gradient-to-br ${domain.color} shadow-lg`
                                : 'border-[#02416d] hover:border-[#aedd2b]'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDomainSelect(domain.id)}
                          >
                            <div className={`p-2 rounded-full mb-3 transition-colors ${
                              selectedDomain === domain.id ? 'bg-white/20' : 'bg-[#02416d]'
                            }`}>
                              <div className={`${selectedDomain === domain.id ? 'text-white' : 'text-[#aedd2b]'}`}>
                                {domain.icon}
                              </div>
                            </div>
                            <span className={`font-medium transition-colors ${
                              selectedDomain === domain.id ? 'text-white' : 'text-white/90'
                            }`}>{domain.name}</span>
                            
                            {selectedDomain === domain.id && (
                              <motion.div 
                                className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring" }}
                              >
                                <FaCheck className="text-[#02416d] text-xs" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                      
                      <div className="flex justify-between mt-8">
                        <motion.button
                          type="button"
                          className="py-3 px-6 rounded-xl font-bold transition-all relative overflow-hidden group bg-[#02416d]/50 backdrop-blur-sm border border-[#aedd2b]/30"
                          onClick={handlePrevStep}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative z-10 text-white flex items-center gap-2">
                            <FaArrowLeft /> Volver
                          </span>
                        </motion.button>
                        
                        <motion.button
                          type="button"
                          className="py-3 px-6 rounded-xl font-bold transition-all relative overflow-hidden group bg-gradient-to-r from-[#aedd2b] to-[#9bc926]"
                          onClick={handleNextStep}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={!selectedDomain}
                        >
                          <span className="relative z-10 text-[#02416d]">Siguiente</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                  
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Campo Contraseña */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        onFocus={() => setActiveField('password')}
                        onBlur={() => setActiveField(null)}
                      >
                        <label className="block text-white/80 mb-2 font-medium">
                          Contraseña <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <FaLock className={`transition-colors ${activeField === 'password' ? 'text-[#aedd2b] scale-110' : 'text-[#aedd2b]/70'}`} />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-12 py-3.5 bg-[#02416d]/30 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#aedd2b] transition-all"
                            placeholder="Mínimo 8 caracteres"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#aedd2b] hover:text-[#9bc926] transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                          <motion.div 
                            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#aedd2b] to-[#9bc926] ${activeField === 'password' ? 'w-full' : 'w-0'}`}
                            animate={{ width: activeField === 'password' ? '100%' : '0%' }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        {formErrors.password && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-rose-400 text-sm mt-1"
                          >
                            {formErrors.password}
                          </motion.div>
                        )}
                      </motion.div>
                      
                      {/* Campo Confirmar Contraseña */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55 }}
                        onFocus={() => setActiveField('confirmPassword')}
                        onBlur={() => setActiveField(null)}
                      >
                        <label className="block text-white/80 mb-2 font-medium">
                          Confirmar contraseña <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <FaLock className={`transition-colors ${activeField === 'confirmPassword' ? 'text-[#aedd2b] scale-110' : 'text-[#aedd2b]/70'}`} />
                          </div>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-12 py-3.5 bg-[#02416d]/30 backdrop-blur-sm rounded-xl border border-[#aedd2b]/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#aedd2b] transition-all"
                            placeholder="Repite tu contraseña"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#aedd2b] hover:text-[#9bc926] transition-colors"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                          <motion.div 
                            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#aedd2b] to-[#9bc926] ${activeField === 'confirmPassword' ? 'w-full' : 'w-0'}`}
                            animate={{ width: activeField === 'confirmPassword' ? '100%' : '0%' }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        {formErrors.confirmPassword && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-rose-400 text-sm mt-1"
                          >
                            {formErrors.confirmPassword}
                          </motion.div>
                        )}
                      </motion.div>
                      
                      <div className="flex items-center mt-4">
                        <input
                          type="checkbox"
                          id="terms"
                          className="mt-1 w-5 h-5 text-[#aedd2b] bg-[#02416d]/50 border-[#aedd2b]/50 rounded focus:ring-[#aedd2b] focus:ring-2"
                        />
                        <label htmlFor="terms" className="ml-3 text-sm text-white/80">
                          Acepto los <span className="text-[#aedd2b] hover:underline cursor-pointer">Términos y Condiciones</span> y la <span className="text-[#aedd2b] hover:underline cursor-pointer">Política de Privacidad</span>
                        </label>
                      </div>
                      
                      <div className="flex justify-between mt-8">
                        <motion.button
                          type="button"
                          className="py-3 px-6 rounded-xl font-bold transition-all relative overflow-hidden group bg-[#02416d]/50 backdrop-blur-sm border border-[#aedd2b]/30"
                          onClick={handlePrevStep}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative z-10 text-white flex items-center gap-2">
                            <FaArrowLeft /> Volver
                          </span>
                        </motion.button>
                        
                        {/* Botón de Registro */}
                        <motion.button
                          type="submit"
                          className={`py-3 px-8 rounded-xl text-lg font-bold transition-all relative overflow-hidden group ${
                            isLoading 
                              ? 'bg-gradient-to-r from-[#aedd2b]/70 to-[#9bc926]/70 cursor-not-allowed' 
                              : 'bg-gradient-to-r from-[#aedd2b] to-[#9bc926] hover:opacity-90'
                          }`}
                          disabled={isLoading}
                          whileHover={{ scale: isLoading ? 1 : 1.05 }}
                          whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        >
                          {isLoading ? (
                            <div className="flex justify-center">
                              <div className="w-5 h-5 border-t-2 border-[#02416d] border-solid rounded-full animate-spin" />
                            </div>
                          ) : (
                            <>
                              <span className="relative z-10 text-[#02416d] font-bold">Registrarme</span>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-10"
                >
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-[#aedd2b] to-[#9bc926] rounded-full flex items-center justify-center mx-auto mb-6"
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <FaCheck className="text-[#02416d] text-4xl" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    ¡Registro Completo!
                  </h2>
                  <p className="text-white/80 mb-8 max-w-md mx-auto">
                    Bienvenido a nuestra comunidad de creadores culturales. Hemos enviado un correo de verificación a tu dirección de email.
                  </p>
                  <motion.button
                    className="py-3 px-8 rounded-xl text-lg font-bold bg-gradient-to-r from-[#aedd2b] to-[#9bc926] text-[#02416d]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continuar al Dashboard
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Registro */}
            {!formSuccess && (
              <motion.div
                className="text-center mt-8 text-white/80 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <p>
                  ¿Ya tienes cuenta?{' '}
                  <button 
                    className="text-[#aedd2b] font-bold hover:underline relative"
                    aria-label="Iniciar sesión"
                  >
                    <span>Inicia sesión como creador</span>
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#aedd2b]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                </p>
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
      </motion.div>
    </div>
  );
};

export default CreatorRegisterPage;
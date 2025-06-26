'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Thumbnail from '@/components/Thumbnail';
import { 
  FaTimes, FaPlay, FaFilm, FaMicrophone, FaBook, 
  FaMapMarkerAlt, FaUsers, FaHandsHelping, FaHistory,
  FaSearch, FaFilter
} from 'react-icons/fa';
import { GiFamilyTree, GiRiver } from 'react-icons/gi';
import { BsFillChatQuoteFill, BsDroplet } from 'react-icons/bs';
import SpinnerCulture from '@/components/SpinnerCulture';

// Tipos de contenido
type ContentType = 'video' | 'podcast' | 'documentary';

// Interfaz para los elementos de contenido
interface ContentItem {
  id: string;
  title: string;
  creator: string;
  views: number;
  duration: string;
  category: ContentType;
  thumbnailUrl?: string;
  contentUrl: string;
  description: string;
  accentColor?: string;
  tags: string[];
  uploadDate: string;
  location: string;
  culturalSignificance: string;
  communityConnections: string[];
  ancestralStories: string[];
  culturalImpact: number;
  isTrending?: boolean;
  culturalEnergy?: number;
}

const ViewContent = () => {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<ContentType | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'community' | 'history'>('content');
  const [culturalConnection, setCulturalConnection] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'recent' | 'popular' | 'cultural'>('cultural');

  // Datos de ejemplo enriquecidos
  const sampleContent: ContentItem[] = [
    {
      id: '1',
      title: 'Tradiciones del Chocó',
      creator: 'Cultura Viva',
      views: 15000,
      duration: '12:45',
      category: 'video',
      thumbnailUrl: '/choco-tradition.jpg',
      contentUrl: 'https://example.com/video1.mp4',
      description: 'Un recorrido por las tradiciones ancestrales de la región del Chocó, mostrando sus danzas, música y costumbres.',
      accentColor: '#02416d',
      tags: ['tradición', 'cultura', 'danza'],
      uploadDate: '2023-05-15',
      location: 'Quibdó, Chocó',
      culturalSignificance: 'Este documental preserva técnicas ancestrales de danza que estaban en peligro de desaparecer.',
      communityConnections: ['Asociación de Danzantes', 'Guardianes del Folclor', 'Escuela de Saberes Ancestrales'],
      ancestralStories: [
        "La danza de la lluvia: Un ritual para pedir abundancia a los espíritus de la naturaleza",
        "El significado de los colores en los trajes tradicionales",
        "Cómo la música africana se fusionó con ritmos indígenas"
      ],
      culturalImpact: 92,
      culturalEnergy: 95,
      isTrending: true
    },
    {
      id: '2',
      title: 'Voces del Pacífico',
      creator: 'Radio Ancestral',
      views: 8500,
      duration: '45:22',
      category: 'podcast',
      thumbnailUrl: '/pacific-voices.jpg',
      contentUrl: 'https://example.com/audio1.mp3',
      description: 'Entrevista con líderes comunitarios sobre la preservación de las lenguas nativas en la costa pacífica.',
      accentColor: '#aedd2b',
      tags: ['lenguas', 'comunidad', 'entrevista'],
      uploadDate: '2023-06-20',
      location: 'Buenaventura, Valle del Cauca',
      culturalSignificance: 'Este podcast ha ayudado a revitalizar el uso del criollo palenquero entre jóvenes.',
      communityConnections: ['Consejo de Ancianos', 'Escuela Bilingüe Palenque', 'Colectivo de Jóvenes Lingüistas'],
      ancestralStories: [
        "El origen del criollo palenquero: Una lengua de resistencia",
        "Historias de libertad contadas a través de los cantos tradicionales",
        "La importancia de los proverbios en la educación comunitaria"
      ],
      culturalImpact: 88,
      culturalEnergy: 90,
      isTrending: true
    },
    {
      id: '3',
      title: 'Ríos de Vida',
      creator: 'Documentales del Mundo',
      views: 23000,
      duration: '1:28:15',
      category: 'documentary',
      thumbnailUrl: '/rivers-of-life.jpg',
      contentUrl: 'https://example.com/docu1.mp4',
      description: 'Documental sobre la importancia de los ríos en las comunidades afrodescendientes e indígenas del Chocó.',
      accentColor: '#012c4d',
      tags: ['medio ambiente', 'comunidades', 'ríos'],
      uploadDate: '2023-04-10',
      location: 'Río Atrato, Chocó',
      culturalSignificance: 'Este documental ha generado conciencia sobre la protección de los ríos sagrados.',
      communityConnections: ['Guardianes del Río Atrato', 'Consejo Comunitario Mayor'],
      ancestralStories: [
        "El río como ser vivo: La sentencia del Río Atrato",
        "Rituales de agradecimiento a los espíritus del agua",
        "Historias de los primeros pobladores a lo largo del río"
      ],
      culturalImpact: 95,
      culturalEnergy: 98,
      isTrending: true
    },
    {
      id: '4',
      title: 'Tejidos Ancestrales',
      creator: 'Artesanías Vivas',
      views: 9200,
      duration: '08:30',
      category: 'video',
      thumbnailUrl: '/ancestral-weaving.jpg',
      contentUrl: 'https://example.com/video2.mp4',
      description: 'Proceso completo de creación de tejidos tradicionales con técnicas transmitidas por generaciones.',
      accentColor: '#02416d',
      tags: ['artesanía', 'técnica', 'tradición'],
      uploadDate: '2023-07-05',
      location: 'San Jacinto, Bolívar',
      culturalSignificance: 'Preservación de técnicas de tejido que datan de más de 300 años.',
      communityConnections: ['Tejedoras de San Jacinto', 'Museo del Tejido Ancestral'],
      ancestralStories: [
        "Los símbolos ocultos en los tejidos y su significado espiritual",
        "Cómo el tejido sirvió como mapa de escape durante la colonización",
        "La leyenda de la araña que enseñó a tejer"
      ],
      culturalImpact: 85,
      culturalEnergy: 87
    },
    {
      id: '5',
      title: 'Sonidos de la Selva',
      creator: 'Naturaleza Auditiva',
      views: 12500,
      duration: '32:18',
      category: 'podcast',
      thumbnailUrl: '/jungle-sounds.jpg',
      contentUrl: 'https://example.com/audio2.mp3',
      description: 'Una experiencia auditiva inmersiva con los sonidos característicos de la selva chocoana.',
      accentColor: '#9bc926',
      tags: ['naturaleza', 'sonidos', 'meditación'],
      uploadDate: '2023-05-28',
      location: 'Selva del Darién',
      culturalSignificance: 'Registro sonoro de especies en peligro de extinción.',
      communityConnections: ['Guardabosques del Darién', 'Fundación Naturaleza Viva'],
      ancestralStories: [
        "El lenguaje secreto de los animales según la tradición Emberá",
        "Cómo interpretar los mensajes de la selva",
        "El canto del jaguar: mitos y realidades"
      ],
      culturalImpact: 78,
      culturalEnergy: 80
    },
    {
      id: '6',
      title: 'Guardianes del Bosque',
      creator: 'Eco Films',
      views: 18700,
      duration: '1:15:42',
      category: 'documentary',
      thumbnailUrl: '/forest-guardians.jpg',
      contentUrl: 'https://example.com/docu2.mp4',
      description: 'Historia de las comunidades que protegen los bosques del Chocó de la deforestación ilegal.',
      accentColor: '#001a2d',
      tags: ['conservación', 'comunidad', 'bosques'],
      uploadDate: '2023-03-15',
      location: 'Bahía Solano, Chocó',
      culturalSignificance: 'Documental que ha impulsado políticas de protección forestal.',
      communityConnections: ['Comunidades Locales de Bahía Solano', 'ONG Protección Forestal'],
      ancestralStories: [
        "El árbol de la vida: mito fundacional de la comunidad",
        "Rituales de siembra y cosecha",
        "Historias de los espíritus protectores del bosque"
      ],
      culturalImpact: 90,
      culturalEnergy: 92
    },
    {
      id: '7',
      title: 'Gastronomía Chocoana',
      creator: 'Sabores Ancestrales',
      views: 21400,
      duration: '15:20',
      category: 'video',
      thumbnailUrl: '/choco-cuisine.jpg',
      contentUrl: 'https://example.com/video3.mp4',
      description: 'Preparación de platos tradicionales con ingredientes locales y técnicas ancestrales.',
      accentColor: '#02416d',
      tags: ['gastronomía', 'cocina', 'tradición'],
      uploadDate: '2023-06-12',
      location: 'Quibdó, Chocó',
      culturalSignificance: 'Rescate de recetas ancestrales en peligro de desaparecer.',
      communityConnections: ['Cocineras Tradicionales del Chocó', 'Escuela de Gastronomía Ancestral'],
      ancestralStories: [
        "El origen del sancocho chocoano: fusión de tres culturas",
        "Los secretos medicinales de las especias locales",
        "Rituales alrededor de la comida"
      ],
      culturalImpact: 83,
      culturalEnergy: 85
    },
    {
      id: '8',
      title: 'Leyendas del Pacífico',
      creator: 'Cuentos Orales',
      views: 7600,
      duration: '28:45',
      category: 'podcast',
      thumbnailUrl: '/pacific-legends.jpg',
      contentUrl: 'https://example.com/audio3.mp3',
      description: 'Narración de leyendas tradicionales transmitidas oralmente por generaciones en comunidades costeras.',
      accentColor: '#c5f04a',
      tags: ['leyendas', 'oralidad', 'cultura'],
      uploadDate: '2023-04-30',
      location: 'Guapi, Cauca',
      culturalSignificance: 'Preservación de la tradición oral de comunidades afrodescendientes.',
      communityConnections: ['Narradores Tradicionales del Pacífico', 'Biblioteca Oral Comunitaria'],
      ancestralStories: [
        "La leyenda de la sirena del río Guapi",
        "El duende protector de los manglares",
        "Historias de aparecidos y su significado moral"
      ],
      culturalImpact: 87,
      culturalEnergy: 89
    }
  ];

  // Simular carga de datos
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setTimeout(() => {
          setContent(sampleContent);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Error al cargar el contenido. Por favor, inténtelo de nuevo.');
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Abrir modal con contenido seleccionado
  const openContentModal = (item: ContentItem) => {
    setSelectedContent(item);
    setIsModalOpen(true);
    setCulturalConnection(null);
    setIsPlaying(false);
    document.body.style.overflow = 'hidden';
  };

  // Cerrar modal
  const closeContentModal = () => {
    setIsModalOpen(false);
    setSelectedContent(null);
    document.body.style.overflow = 'auto';
  };

  // Filtrar y ordenar contenido
  const filteredContent = activeCategory === 'all' 
    ? content 
    : content.filter(item => item.category === activeCategory);

  const searchedContent = searchQuery
    ? filteredContent.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredContent;

  const sortedContent = [...searchedContent].sort((a, b) => {
    if (sortOption === 'recent') {
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    } else if (sortOption === 'popular') {
      return b.views - a.views;
    } else {
      return b.culturalEnergy! - a.culturalEnergy!;
    }
  });

  // Obtener icono y texto para la categoría
  const getCategoryInfo = (category: ContentType) => {
    switch (category) {
      case 'video':
        return { icon: <FaFilm className="mr-2" />, text: 'Video' };
      case 'podcast':
        return { icon: <FaMicrophone className="mr-2" />, text: 'Podcast' };
      case 'documentary':
        return { icon: <FaBook className="mr-2" />, text: 'Documental' };
      default:
        return { icon: null, text: '' };
    }
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Renderizar conexiones culturales
  const renderCulturalConnections = () => {
    if (!selectedContent) return null;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {selectedContent.communityConnections.map((connection, index) => (
          <motion.div
            key={index}
            className={`p-4 rounded-xl cursor-pointer transition-all ${
              culturalConnection === connection 
                ? 'bg-[#aedd2b]/20 border-2 border-[#aedd2b]' 
                : 'bg-[#02416d]/30 hover:bg-[#02416d]/50'
            }`}
            whileHover={{ y: -5 }}
            onClick={() => setCulturalConnection(culturalConnection === connection ? null : connection)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#012c4d] flex items-center justify-center mr-3">
                <FaUsers className="text-[#aedd2b]" />
              </div>
              <h4 className="font-bold text-white">{connection}</h4>
            </div>
            
            {culturalConnection === connection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 text-white/80 text-sm"
              >
                <p>Esta organización trabaja activamente en la preservación de esta tradición. Puedes contactarlos para:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Aprender técnicas tradicionales</li>
                  <li>Participar en eventos comunitarios</li>
                  <li>Apoyar sus iniciativas de preservación</li>
                </ul>
                <button className="mt-3 flex items-center text-[#aedd2b] font-medium">
                  <FaHandsHelping className="mr-2" /> Conectar con la comunidad
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  // Renderizar historias ancestrales
  const renderAncestralStories = () => {
    if (!selectedContent) return null;
    
    return (
      <div className="space-y-6 mt-6">
        {selectedContent.ancestralStories.map((story, index) => (
          <motion.div
            key={index}
            className="p-4 bg-[#02416d]/30 rounded-xl border border-[#02416d]/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-[#012c4d] flex items-center justify-center">
                  <BsFillChatQuoteFill className="text-[#aedd2b] text-xl" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">Sabiduría Ancestral #{index + 1}</h4>
                <p className="text-white/80">{story}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Renderizar impacto cultural
  const renderCulturalImpact = () => {
    if (!selectedContent) return null;
    
    return (
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-white">Impacto Cultural</h4>
          <span className="text-[#aedd2b] font-bold">{selectedContent.culturalImpact}%</span>
        </div>
        
        <div className="w-full bg-[#012c4d] h-4 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#aedd2b] to-[#9bc926]"
            initial={{ width: 0 }}
            animate={{ width: `${selectedContent.culturalImpact}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        
        <p className="text-white/80 text-sm mt-2">
          Este contenido ha contribuido significativamente a la preservación de tradiciones ancestrales
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#012c4d] to-[#001a2d]">
        <SpinnerCulture />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#012c4d] to-[#001a2d]">
        <div className="bg-[#02416d] p-8 rounded-2xl shadow-xl max-w-md text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl text-white font-bold mb-2">Error al cargar el contenido</h2>
          <p className="text-white/90 mb-6">{error}</p>
          <button 
            className="bg-[#aedd2b] text-[#02416d] font-bold py-2 px-6 rounded-full hover:bg-[#9bc926] transition-colors"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#012c4d] to-[#001a2d] pb-20">
      {/* Encabezado */}
      <div className="pt-24 pb-12 px-4 text-center">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explora Nuestra <span className="text-[#aedd2b]">Cultura</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-white/90 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Descubre videos, podcasts y documentales que celebran la rica herencia cultural de nuestra región
        </motion.p>
        
        <motion.div
          className="w-24 h-1 bg-[#aedd2b] mx-auto mt-6 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
      </div>
      
      {/* Filtros y búsqueda */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 px-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar contenido cultural..."
            className="w-full pl-10 pr-4 py-3 bg-[#012c4d] text-white rounded-full border border-[#02416d] focus:outline-none focus:ring-2 focus:ring-[#aedd2b] focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          <button
            className={`px-4 py-2 rounded-full font-medium flex items-center transition-all ${
              activeCategory === 'all' 
                ? 'bg-[#aedd2b] text-[#02416d]' 
                : 'bg-[#02416d] text-white hover:bg-[#013258]'
            }`}
            onClick={() => setActiveCategory('all')}
          >
            <GiRiver className="mr-2" /> Todos
          </button>
          
          <button
            className={`px-4 py-2 rounded-full font-medium flex items-center transition-all ${
              activeCategory === 'video' 
                ? 'bg-[#02416d] text-white' 
                : 'bg-[#013258] text-white/90 hover:bg-[#02416d]'
            }`}
            onClick={() => setActiveCategory('video')}
          >
            <FaFilm className="mr-2" /> Videos
          </button>
          
          <button
            className={`px-4 py-2 rounded-full font-medium flex items-center transition-all ${
              activeCategory === 'podcast' 
                ? 'bg-[#aedd2b] text-[#02416d]' 
                : 'bg-[#013258] text-white/90 hover:bg-[#02416d]'
            }`}
            onClick={() => setActiveCategory('podcast')}
          >
            <FaMicrophone className="mr-2" /> Podcasts
          </button>
          
          <button
            className={`px-4 py-2 rounded-full font-medium flex items-center transition-all ${
              activeCategory === 'documentary' 
                ? 'bg-[#012c4d] text-white' 
                : 'bg-[#013258] text-white/90 hover:bg-[#02416d]'
            }`}
            onClick={() => setActiveCategory('documentary')}
          >
            <FaBook className="mr-2" /> Documentales
          </button>
          
          <div className="relative">
            <select
              className="pl-10 pr-6 py-2 bg-[#02416d] text-white rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-[#aedd2b]"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
            >
              <option value="cultural">Por Energía Cultural</option>
              <option value="popular">Más Populares</option>
              <option value="recent">Más Recientes</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Galería de contenido - Grilla Fluvial */}
      <div className="container mx-auto px-4">
        {sortedContent.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/80 text-xl">No se encontró contenido en esta categoría</p>
          </div>
        ) : (
          <div className="relative min-h-[120vh]">
            {/* Fondo de río cultural */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#012c4d] to-[#001a2d]"></div>
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 h-1 bg-[#aedd2b] rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 100 + 50}%`,
                  }}
                  animate={{
                    y: [0, 1000],
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

            {/* Grilla fluvial */}
            <motion.div 
              className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {sortedContent.map((item, index) => {
                // Calcular posición basada en significado cultural
                const rowSpan = item.culturalImpact > 80 ? 2 : 1;
                const colSpan = item.culturalImpact > 90 ? 2 : 1;
                const rotation = (index % 3) * (index % 2 === 0 ? 1 : -1) * 2;
                const translateY = Math.sin(index * 0.5) * 20;
                
                return (
                  <motion.div
                    key={item.id}
                    className={`relative overflow-hidden rounded-2xl ${
                      rowSpan > 1 ? 'row-span-2' : ''
                    } ${colSpan > 1 ? 'col-span-2' : ''}`}
                    style={{
                      gridRow: `span ${rowSpan}`,
                      gridColumn: `span ${colSpan}`,
                    }}
                    initial={{ opacity: 0, y: 50, rotate: rotation }}
                    animate={{ 
                      opacity: 1, 
                      y: translateY,
                      rotate: 0
                    }}
                    transition={{ 
                      delay: 0.1 * index, 
                      type: "spring", 
                      damping: 12,
                      stiffness: 100
                    }}
                    whileHover={{
                      y: -10,
                      scale: 1.03,
                      zIndex: 10,
                      rotate: item.culturalImpact > 80 ? (Math.random() * 4 - 2) : 0
                    }}
                  >
                    {/* Corriente cultural */}
                    <motion.div 
                      className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full opacity-30 pointer-events-none"
                      style={{ backgroundColor: item.accentColor || '#aedd2b' }}
                      animate={{
                        scale: [1, 3, 1],
                        opacity: [0.3, 0.1, 0.3]
                      }}
                      transition={{
                        duration: 4 + index,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Nodo de conexión cultural */}
                    {index > 0 && (
                      <motion.div
                        className="absolute top-1/2 left-0 w-8 h-1 z-0"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '2rem', opacity: 0.5 }}
                        transition={{ delay: 0.2 * index }}
                      >
                        <svg width="100%" height="100%">
                          <line 
                            x1="0" y1="1" 
                            x2="100%" y2="1" 
                            stroke={item.accentColor || '#aedd2b'} 
                            strokeWidth="2"
                            strokeDasharray="4,4"
                          />
                        </svg>
                      </motion.div>
                    )}
                    
                    {/* Elemento de contenido */}
                    <Thumbnail
                      title={item.title}
                      creator={item.creator}
                      views={item.views}
                      duration={item.duration}
                      category={item.category}
                      thumbnailUrl={item.thumbnailUrl}
                      accentColor={item.accentColor}
                      onClick={() => openContentModal(item)}
                      culturalSignificance={item.culturalImpact}
                      culturalTags={item.tags}
                      isTrending={item.isTrending}
                    />
                    
                    {/* Olas de energía cultural */}
                    {item.culturalImpact > 70 && (
                      <div className="absolute -bottom-4 left-0 right-0 h-4 overflow-hidden">
                        {[...Array(3)].map((_, waveIndex) => (
                          <motion.div
                            key={waveIndex}
                            className="absolute bottom-0 w-200 h-4 bg-no-repeat"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='${encodeURIComponent(item.accentColor || '#aedd2b')}'%3E%3C/path%3E%3C/svg%3E")`,
                              backgroundSize: '1200px 120px',
                            }}
                            animate={{
                              x: [0, -600],
                            }}
                            transition={{
                              duration: 10 + waveIndex * 3,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Indicador de energía cultural */}
                    <div className="absolute top-4 right-4 bg-[#012c4d] rounded-full px-3 py-1 text-xs font-bold flex items-center z-20">
                      <BsDroplet className="text-[#aedd2b] mr-1" />
                      <span>{item.culturalEnergy}%</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            
            {/* Islas de conocimiento */}
            {sortedContent.length > 4 && (
              <div className="absolute top-1/4 left-10 right-10 flex justify-between pointer-events-none">
                {['Sabiduría Ancestral', 'Tradiciones Vivas', 'Futuro Cultural'].map((island, i) => (
                  <motion.div
                    key={i}
                    className="bg-[#02416d] text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-sm"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 + i * 0.3, type: "spring" }}
                    whileHover={{ 
                      y: -10,
                      scale: 1.05,
                      backgroundColor: '#aedd2b',
                      color: '#012c4d'
                    }}
                  >
                    <span className="font-bold">{island}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Modal revolucionario para contenido */}
      <AnimatePresence>
        {isModalOpen && selectedContent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContentModal}
          >
            <motion.div
              className="relative bg-[#012c4d] rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #012c4d, #001a2d)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)"
              }}
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fondo cultural dinámico */}
              <div className="absolute inset-0 overflow-hidden z-0">
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url(${selectedContent.thumbnailUrl || '/cultural-pattern.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(10px)'
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#012c4d]/80 to-[#012c4d]"></div>
                
                {/* Elementos culturales flotantes */}
                {selectedContent.tags.map((tag, index) => (
                  <motion.div
                    key={index}
                    className="absolute text-[#aedd2b] font-bold opacity-30"
                    style={{
                      fontSize: '3rem',
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, Math.random() * 40 - 20, 0],
                      rotate: [0, Math.random() * 20 - 10]
                    }}
                    transition={{
                      duration: 10 + Math.random() * 20,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>

              {/* Contenido principal */}
              <div className="relative z-10 h-full flex flex-col lg:flex-row">
                {/* Panel izquierdo - Reproductor y contexto */}
                <div className="w-full lg:w-7/12">
                  {/* Encabezado */}
                  <div className="p-6 flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-2">
                        {getCategoryInfo(selectedContent.category).icon}
                        <h2 className="text-2xl font-bold text-white ml-2">
                          {selectedContent.title}
                        </h2>
                      </div>
                      <p className="text-[#aedd2b]">por {selectedContent.creator}</p>
                    </div>
                    <button
                      className="text-white/70 hover:text-white p-2 transition-colors"
                      onClick={closeContentModal}
                      aria-label="Cerrar"
                    >
                      <FaTimes size={24} />
                    </button>
                  </div>
                  
                  {/* Reproductor inmersivo */}
                  <div className="relative aspect-video mx-4 rounded-xl overflow-hidden shadow-2xl">
                    {selectedContent.category === 'podcast' ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#012c4d] to-[#001a2d]">
                        {/* Visualizador de ondas de sonido culturales */}
                        <div className="w-full max-w-md px-4 mb-8">
                          <div className="flex justify-center space-x-1 h-16 items-end">
                            {[...Array(40)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-1 bg-[#aedd2b] rounded-t"
                                style={{ height: `${Math.random() * 40 + 10}px` }}
                                animate={{
                                  height: [`${Math.random() * 40 + 10}px`, `${Math.random() * 60 + 20}px`, `${Math.random() * 40 + 10}px`]
                                }}
                                transition={{
                                  duration: 1 + Math.random() * 2,
                                  repeat: Infinity,
                                  repeatType: "reverse"
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-center px-4">
                          <h3 className="text-white text-2xl font-bold mb-2">{selectedContent.title}</h3>
                          <p className="text-white/80">{selectedContent.creator}</p>
                        </div>
                        
                        <div className="mt-8 w-full max-w-md px-4">
                          <div className="flex justify-between text-white/80 text-sm mb-1">
                            <span>0:00</span>
                            <span>{selectedContent.duration}</span>
                          </div>
                          <div className="bg-[#02416d] h-2 w-full rounded-full">
                            <div 
                              className="bg-[#aedd2b] h-2 rounded-full"
                              style={{ width: '33%' }}
                            ></div>
                          </div>
                        </div>
                        
                        <button 
                          className="mt-8 bg-[#aedd2b] text-[#02416d] rounded-full p-4 hover:bg-[#9bc926] transition-colors shadow-lg"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? <FaTimes size={24} /> : <FaPlay size={24} />}
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#012c4d] to-[#001a2d]">
                        <div className="text-center relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-48 rounded-full bg-[#02416d] opacity-20 animate-ping"></div>
                          </div>
                          <div 
                            className="w-32 h-32 rounded-full bg-[#02416d] flex items-center justify-center mx-auto mb-6 relative z-10 shadow-2xl cursor-pointer"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            {isPlaying ? (
                              <FaTimes className="text-[#aedd2b]" size={48} />
                            ) : (
                              <FaPlay className="text-[#aedd2b] ml-2" size={48} />
                            )}
                          </div>
                          <p className="text-white/90 text-xl max-w-md px-4 relative z-10">
                            {isPlaying ? "Detener experiencia" : "Iniciar experiencia inmersiva"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Contexto cultural */}
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-[#aedd2b] text-xl font-bold mb-3 flex items-center">
                        <FaHistory className="mr-2" /> Contexto Histórico
                      </h3>
                      <p className="text-white/90 leading-relaxed">
                        {selectedContent.culturalSignificance}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#02416d]/50 rounded-xl p-4">
                        <h4 className="text-white font-bold mb-2 flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-[#aedd2b]" /> Ubicación
                        </h4>
                        <p className="text-white/80 text-sm">{selectedContent.location}</p>
                        <div className="mt-2 h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-[#aedd2b]/20 rounded-full flex items-center justify-center mb-2">
                              <FaMapMarkerAlt className="text-[#aedd2b] text-2xl" />
                            </div>
                            <span className="text-white/60">Mapa cultural interactivo</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[#02416d]/50 rounded-xl p-4">
                        <h4 className="text-white font-bold mb-2 flex items-center">
                          <GiFamilyTree className="mr-2 text-[#aedd2b]" /> Linaje Ancestral
                        </h4>
                        <p className="text-white/80 text-sm">Conectado a tradiciones de 3 generaciones</p>
                        <div className="mt-2 flex items-center">
                          <div className="flex -space-x-2">
                            {[...Array(3)].map((_, i) => (
                              <div 
                                key={i} 
                                className="w-8 h-8 rounded-full bg-gray-300 border-2 border-[#012c4d] flex items-center justify-center text-xs font-bold"
                              >
                                {i+1}°
                              </div>
                            ))}
                          </div>
                          <button className="ml-2 text-[#aedd2b] text-sm font-medium">
                            Explorar linaje
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Panel derecho - Conexiones culturales */}
                <div className="w-full lg:w-5/12 bg-[#001a2d] border-l border-[#02416d]/50">
                  <div className="p-6">
                    {/* Navegación por pestañas */}
                    <div className="flex border-b border-[#02416d] mb-6">
                      <button
                        className={`py-3 px-4 font-medium relative ${
                          activeTab === 'content' 
                            ? 'text-[#aedd2b]' 
                            : 'text-white/70 hover:text-white'
                        }`}
                        onClick={() => setActiveTab('content')}
                      >
                        Contenido
                        {activeTab === 'content' && (
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 h-1 bg-[#aedd2b]"
                            layoutId="tabIndicator"
                          />
                        )}
                      </button>
                      
                      <button
                        className={`py-3 px-4 font-medium relative ${
                          activeTab === 'community' 
                            ? 'text-[#aedd2b]' 
                            : 'text-white/70 hover:text-white'
                        }`}
                        onClick={() => setActiveTab('community')}
                      >
                        Comunidad
                        {activeTab === 'community' && (
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 h-1 bg-[#aedd2b]"
                            layoutId="tabIndicator"
                          />
                        )}
                      </button>
                      
                      <button
                        className={`py-3 px-4 font-medium relative ${
                          activeTab === 'history' 
                            ? 'text-[#aedd2b]' 
                            : 'text-white/70 hover:text-white'
                        }`}
                        onClick={() => setActiveTab('history')}
                      >
                        Historia
                        {activeTab === 'history' && (
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 h-1 bg-[#aedd2b]"
                            layoutId="tabIndicator"
                          />
                        )}
                      </button>
                    </div>
                    
                    {/* Contenido de las pestañas */}
                    <div className="overflow-auto max-h-[60vh] pr-2">
                      {activeTab === 'content' && (
                        <>
                          <div className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-4">Detalles</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-[#aedd2b] font-bold text-sm mb-1">Subido el</h4>
                                <p className="text-white/80">{formatDate(selectedContent.uploadDate)}</p>
                              </div>
                              <div>
                                <h4 className="text-[#aedd2b] font-bold text-sm mb-1">Visualizaciones</h4>
                                <p className="text-white/80">{selectedContent.views.toLocaleString()}</p>
                              </div>
                              <div>
                                <h4 className="text-[#aedd2b] font-bold text-sm mb-1">Duración</h4>
                                <p className="text-white/80">{selectedContent.duration}</p>
                              </div>
                              <div>
                                <h4 className="text-[#aedd2b] font-bold text-sm mb-1">Significado Cultural</h4>
                                <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                                  <div 
                                    className="bg-[#aedd2b] h-2 rounded-full" 
                                    style={{ width: `${selectedContent.culturalImpact}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-[#aedd2b] font-bold text-sm mb-2">Descripción</h4>
                            <p className="text-white/90 leading-relaxed">{selectedContent.description}</p>
                          </div>
                          
                          <div className="mt-6">
                            <h4 className="text-[#aedd2b] font-bold text-sm mb-2">Etiquetas Culturales</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedContent.tags.map((tag, index) => (
                                <span 
                                  key={index}
                                  className="px-3 py-1 rounded-full bg-[#02416d] text-white/90 text-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                      
                      {activeTab === 'community' && (
                        <>
                          <h3 className="text-xl font-bold text-white mb-4">Conexiones Culturales</h3>
                          <p className="text-white/80 mb-4">
                            Este contenido está conectado con comunidades que preservan estas tradiciones.
                            Conecta directamente con ellos para aprender más o colaborar.
                          </p>
                          
                          {renderCulturalConnections()}
                          
                          <div className="mt-8">
                            <h4 className="text-[#aedd2b] font-bold text-sm mb-2">¿Quieres contribuir?</h4>
                            <p className="text-white/80 mb-3">
                              Comparte tu conocimiento o experiencia relacionada con esta tradición
                            </p>
                            <textarea 
                              className="w-full bg-[#012c4d] border border-[#02416d] rounded-lg p-3 text-white/90 placeholder-white/50"
                              rows={3}
                              placeholder="Comparte tu historia, conocimiento o pregunta..."
                            ></textarea>
                            <button className="mt-3 bg-[#aedd2b] text-[#02416d] font-bold py-2 px-6 rounded-full hover:bg-[#9bc926] transition-colors">
                              Enviar contribución
                            </button>
                          </div>
                        </>
                      )}
                      
                      {activeTab === 'history' && (
                        <>
                          <h3 className="text-xl font-bold text-white mb-4">Sabiduría Ancestral</h3>
                          <p className="text-white/80 mb-4">
                            Historias y conocimientos transmitidos a través de generaciones relacionados
                            con este contenido.
                          </p>
                          
                          {renderAncestralStories()}
                          
                          <div className="mt-8">
                            <h4 className="text-[#aedd2b] font-bold text-sm mb-2">Línea de Tiempo Cultural</h4>
                            <div className="relative pl-8 mt-4">
                              {/* Línea vertical */}
                              <div className="absolute left-4 top-0 bottom-0 w-1 bg-[#02416d]"></div>
                              
                              {/* Puntos de tiempo */}
                              <div className="relative mb-8">
                                <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-[#aedd2b] border-4 border-[#012c4d]"></div>
                                <div className="ml-6">
                                  <h5 className="font-bold text-white">Siglo XVIII</h5>
                                  <p className="text-white/80 text-sm">Orígenes de esta tradición en comunidades indígenas</p>
                                </div>
                              </div>
                              
                              <div className="relative mb-8">
                                <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-[#aedd2b] border-4 border-[#012c4d]"></div>
                                <div className="ml-6">
                                  <h5 className="font-bold text-white">1950s</h5>
                                  <p className="text-white/80 text-sm">Fusión con tradiciones africanas traídas por comunidades desplazadas</p>
                                </div>
                              </div>
                              
                              <div className="relative">
                                <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-[#aedd2b] border-4 border-[#012c4d]"></div>
                                <div className="ml-6">
                                  <h5 className="font-bold text-white">2020s</h5>
                                  <p className="text-white/80 text-sm">Revitalización y preservación digital por nuevas generaciones</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewContent;
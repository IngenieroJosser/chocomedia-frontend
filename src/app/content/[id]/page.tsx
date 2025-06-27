'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, FaUsers, FaHandshake, FaMapMarkerAlt, 
  FaHistory, FaBook, FaShare, FaHeart, 
  FaRss, FaEnvelope, FaGlobeAmericas, FaTree,
  FaTimes, FaComment, FaClock, FaEye
} from 'react-icons/fa';
import { GiFamilyTree } from 'react-icons/gi';
import { BsFillChatQuoteFill } from 'react-icons/bs';
import Link from 'next/link';
import Thumbnail from '@/components/Thumbnail';
import SpinnerCulture from '@/components/SpinnerCulture';
import { ContentItem, ContentType, CulturalLineage, Creator } from '@/lib/type';

// Función para convertir vistas de cadena a número
const parseViews = (viewStr: string): number => {
  if (viewStr.includes('M')) {
    return parseFloat(viewStr.replace('M', '')) * 1000000;
  } else if (viewStr.includes('K')) {
    return parseFloat(viewStr.replace('K', '')) * 1000;
  }
  return parseInt(viewStr, 10);
};

// Función para mapear categorías al tipo ContentType
const mapCategory = (cat: string): ContentType => {
  switch (cat) {
    case "Documental": 
      return 'documentary';
    case "Educativo": 
    case "Entrevista": 
    case "Artesanía": 
    case "Ritual": 
    default:
      return 'video';
  }
};

// Generador de fechas aleatorias para uploadDate
const randomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

// Formatear fecha legible
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

const CreatorProfile = () => {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'content' | 'community' | 'history' | 'collaborations'>('content');
  const [isFollowing, setIsFollowing] = useState(false);
  const [culturalEnergy, setCulturalEnergy] = useState(0);
  
  // Estados para el modal de contenido
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Lista de creadores disponibles
  const creators: Creator[] = [
    {
      id: "1",
      name: "María Chocó",
      tagline: "Guardiana de tradiciones afrocolombianas",
      bio: "Nacida en Quibdó, María ha dedicado su vida a documentar y preservar las tradiciones orales, musicales y artesanales de las comunidades del Chocó. Con más de 15 años de experiencia en antropología cultural, su trabajo ha sido reconocido por la UNESCO.",
      location: "Quibdó, Chocó, Colombia",
      followers: "24.8K",
      culturalImpact: 92,
      traditions: ["Música de marimba", "Tejido wounaan", "Cantos de arrullo"],
      communities: ["Consejo Comunitario Mayor", "Fundación Rio Atrato", "Colectivo Jóvenes del Pacífico"],
      collaborations: ["Museo del Oro Bogotá", "Festival Petronio Álvarez", "National Geographic"],
      culturalLineage: [
        { generation: "Abuela", name: "Rosa Angulo", role: "Cantadora tradicional" },
        { generation: "Madre", name: "Luisa Palacios", role: "Tejedora de werregue" },
        { generation: "Actual", name: "María Chocó", role: "Documentalista cultural" }
      ],
      profileImage: "/creator-profile.jpg"
    },
    {
      id: "2",
      name: "Carlos Wayuu",
      tagline: "Tejedor de sueños guajiros",
      bio: "Maestro artesano wayuu de la Alta Guajira, Carlos preserva el arte milenario del tejido de mochilas y chinchorros. Su trabajo ha sido expuesto en galerías internacionales y enseña a nuevas generaciones las técnicas ancestrales.",
      location: "Uribia, Guajira, Colombia",
      followers: "18.3K",
      culturalImpact: 88,
      traditions: ["Tejido wayuu", "Leyendas ancestrales", "Música de gaitas"],
      communities: ["Asociación de Artesanos Wayuu", "Resguardo indígena de Mayapo"],
      collaborations: ["Artesanías de Colombia", "Museo del Caribe", "Bienal de Arte Indígena"],
      culturalLineage: [
        { generation: "Bisabuelo", name: "José Epinayú", role: "Narrero tradicional" },
        { generation: "Abuelo", name: "Miguel Pushaina", role: "Tejedor de sueños" },
        { generation: "Actual", name: "Carlos Wayuu", role: "Maestro artesano" }
      ],
      profileImage: "/creator-wayuu.jpg"
    },
    {
      id: "3",
      name: "Ana Arhuaca",
      tagline: "Guardiana de la Sierra Nevada",
      bio: "Líder espiritual arhuaca que conecta la sabiduría ancestral con el mundo moderno. Como médica tradicional, preserva los conocimientos sobre plantas medicinales y rituales sagrados de la Sierra Nevada de Santa Marta.",
      location: "Sierra Nevada, Magdalena, Colombia",
      followers: "15.7K",
      culturalImpact: 95,
      traditions: ["Mochila arhuaca", "Rituales sagrados", "Agricultura tradicional"],
      communities: ["Cabildo indígena arhuaco", "Guardianes del corazón del mundo"],
      collaborations: ["MinAmbiente Colombia", "National Geographic Society", "Universidad del Magdalena"],
      culturalLineage: [
        { generation: "Mamo", name: "Domingo Zalabata", role: "Guía espiritual" },
        { generation: "Madre", name: "Rosa Villafaña", role: "Partera tradicional" },
        { generation: "Actual", name: "Ana Arhuaca", role: "Médica tradicional" }
      ],
      profileImage: "/creator-arhuaca.jpg"
    },
    {
      id: "4",
      name: "Jorge Páez",
      tagline: "Cantor de joropo llanero",
      bio: "Cuarta generación de músicos llaneros, Jorge es virtuoso del arpa, el cuatro y la bandola. Ganador del Festival de la Leyenda Vallenata en la categoría de música llanera, transmite su pasión a jóvenes en su escuela de música tradicional.",
      location: "Villavicencio, Meta, Colombia",
      followers: "21.4K",
      culturalImpact: 85,
      traditions: ["Joropo", "Arpa llanera", "Cuentos de vaquería"],
      communities: ["Fundación Alma Llanera", "Escuela de Música Tradicional"],
      collaborations: ["Festival Mundial del Joropo", "Ministerio de Cultura", "Teatro Mayor Julio Mario Santo Domingo"],
      culturalLineage: [
        { generation: "Bisabuelo", name: "Pedro Páez", role: "Coplero tradicional" },
        { generation: "Abuelo", name: "Ramón Páez", role: "Arpista legendario" },
        { generation: "Actual", name: "Jorge Páez", role: "Músico y compositor" }
      ],
      profileImage: "/creator-llanero.jpg"
    },
    {
      id: "5",
      name: "Diana Inga",
      tagline: "Medicina tradicional del Putumayo",
      bio: "Taita y conocedora de los secretos de la selva amazónica, Diana preserva la medicina tradicional de los pueblos inga. Dirige un centro de sanación donde combina saberes ancestrales con prácticas contemporáneas.",
      location: "Mocoa, Putumayo, Colombia",
      followers: "12.9K",
      culturalImpact: 90,
      traditions: ["Plantas medicinales", "Yagé", "Cantos de sanación"],
      communities: ["Minga indígena del Putumayo", "Red de Taitas del Amazonas"],
      collaborations: ["Organización Nacional Indígena", "Universidad de la Amazonia", "Ministerio de Salud"],
      culturalLineage: [
        { generation: "Taita", name: "Manuel Jacanamijoy", role: "Curador tradicional" },
        { generation: "Abuela", name: "Rosa Chindoy", role: "Paramera y rezandera" },
        { generation: "Actual", name: "Diana Inga", role: "Taita y guardiana" }
      ],
      profileImage: "/creator-inga.jpg"
    }
  ];

  // Función para generar contenido específico para cada creador
  const generateCreatorContent = (creator: Creator): ContentItem[] => {
    return [
      {
        id: `content-${creator.id}-1`,
        title: `Documental: ${creator.traditions[0]}`,
        creator: creator.name,
        views: parseViews(`${(Math.floor(Math.random() * 10) + 1)}.${Math.floor(Math.random() * 9)}M`),
        duration: "22:45",
        category: mapCategory("Documental"),
        thumbnailUrl: "/doc-thumb.jpg",
        accentColor: "#aedd2b",
        culturalImpact: 92,
        tags: [creator.traditions[0], "Patrimonio", "Cultura Viva"],
        isTrending: true,
        contentUrl: "/videos/documental.mp4",
        description: `Documental sobre ${creator.traditions[0]} en ${creator.location}`,
        uploadDate: randomDate(new Date(2020, 0, 1), new Date()),
        location: creator.location,
        culturalSignificance: "Alta",
        communityConnections: creator.communities.slice(0, 2),
        ancestralStories: [creator.culturalLineage[0].name, creator.culturalLineage[1].name]
      },
      {
        id: `content-${creator.id}-2`,
        title: `Taller de ${creator.traditions[1] || creator.traditions[0]}`,
        creator: creator.name,
        views: parseViews(`${Math.floor(Math.random() * 800) + 200}K`),
        duration: "45:18",
        category: mapCategory("Educativo"),
        thumbnailUrl: "/workshop-thumb.jpg",
        accentColor: "#f9a825",
        culturalImpact: 88,
        tags: [creator.traditions[1] || creator.traditions[0], "Aprendizaje", "Taller"],
        isTrending: false,
        contentUrl: "/videos/taller.mp4",
        description: `Taller práctico sobre ${creator.traditions[1] || creator.traditions[0]}`,
        uploadDate: randomDate(new Date(2020, 0, 1), new Date()),
        location: creator.location,
        culturalSignificance: "Media",
        communityConnections: creator.communities.slice(0, 1),
        ancestralStories: [creator.culturalLineage[0].name]
      },
      {
        id: `content-${creator.id}-3`,
        title: `Entrevista: ${creator.name} y su legado`,
        creator: creator.name,
        views: parseViews(`${(Math.floor(Math.random() * 5) + 1)}.${Math.floor(Math.random() * 9)}M`),
        duration: "38:12",
        category: mapCategory("Entrevista"),
        thumbnailUrl: "/interview-thumb.jpg",
        accentColor: "#26a69a",
        culturalImpact: 95,
        tags: ["Entrevista", "Legado", "Tradición Oral"],
        isTrending: true,
        contentUrl: "/videos/entrevista.mp4",
        description: `Entrevista exclusiva con ${creator.name} sobre su legado cultural`,
        uploadDate: randomDate(new Date(2020, 0, 1), new Date()),
        location: creator.location,
        culturalSignificance: "Muy alta",
        communityConnections: creator.communities,
        ancestralStories: creator.culturalLineage.map(m => m.name)
      },
      {
        id: `content-${creator.id}-4`,
        title: `Proceso creativo: ${creator.traditions[2] || creator.traditions[0]}`,
        creator: creator.name,
        views: parseViews(`${Math.floor(Math.random() * 500) + 100}K`),
        duration: "15:30",
        category: mapCategory("Artesanía"),
        thumbnailUrl: "/process-thumb.jpg",
        accentColor: "#5c6bc0",
        culturalImpact: 85,
        tags: [creator.traditions[2] || creator.traditions[0], "Proceso", "Creación"],
        isTrending: false,
        contentUrl: "/videos/proceso.mp4",
        description: `Proceso creativo de ${creator.traditions[2] || creator.traditions[0]}`,
        uploadDate: randomDate(new Date(2020, 0, 1), new Date()),
        location: creator.location,
        culturalSignificance: "Moderada",
        communityConnections: creator.communities.slice(1, 3),
        ancestralStories: creator.culturalLineage.slice(0, 2).map(m => m.name)
      },
      {
        id: `content-${creator.id}-5`,
        title: `Ritual de ${creator.communities[0].split(" ")[0]}`,
        creator: creator.name,
        views: parseViews(`${(Math.floor(Math.random() * 3) + 1)}.${Math.floor(Math.random() * 9)}M`),
        duration: "52:10",
        category: mapCategory("Ritual"),
        thumbnailUrl: "/ritual-thumb.jpg",
        accentColor: "#ec407a",
        culturalImpact: 98,
        tags: ["Ritual", "Espiritualidad", "Comunidad"],
        isTrending: true,
        contentUrl: "/videos/ritual.mp4",
        description: `Ritual tradicional de la comunidad ${creator.communities[0].split(" ")[0]}`,
        uploadDate: randomDate(new Date(2020, 0, 1), new Date()),
        location: creator.location,
        culturalSignificance: "Sagrada",
        communityConnections: [creator.communities[0]],
        ancestralStories: creator.culturalLineage.map(m => m.name)
      }
    ];
  };

  // Simular carga de datos del creador
  useEffect(() => {
    const fetchCreator = async () => {
      try {
        setTimeout(() => {
          // Seleccionar un creador aleatorio
          const randomCreator = creators[Math.floor(Math.random() * creators.length)];
          setCreator(randomCreator);
          
          // Generar contenido específico para este creador
          setContent(generateCreatorContent(randomCreator));
          setLoading(false);
        }, 800);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchCreator();
  }, []);

  // Animación de energía cultural
  useEffect(() => {
    if (creator) {
      const timer = setTimeout(() => {
        setCulturalEnergy(creator.culturalImpact);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [creator]);

  // Abrir modal con contenido seleccionado
  const openContentModal = (item: ContentItem) => {
    setSelectedContent(item);
    setIsModalOpen(true);
    setIsPlaying(false);
    document.body.style.overflow = 'hidden';
  };

  // Cerrar modal
  const closeContentModal = () => {
    setIsModalOpen(false);
    setSelectedContent(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#012c4d] to-[#001a2d]">
        <SpinnerCulture />
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#012c4d] to-[#001a2d]">
        <div className="text-center">
          <h2 className="text-xl text-white font-bold mb-4">Creador no encontrado</h2>
          <Link 
            href="/explore" 
            className="bg-[#aedd2b] text-[#02416d] font-bold py-2 px-6 rounded-full hover:bg-[#9bc926] transition-colors"
          >
            Explorar contenido
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#012c4d] to-[#001a2d] pb-20">
      {/* Cabecera con efecto de río cultural */}
      <div className="relative h-96 md:h-80 overflow-hidden">
        {/* Fondo dinámico */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a2d] to-[#012c4d]"></div>
        
        {/* Olas culturales */}
        <div className="absolute bottom-0 left-0 right-0 h-24">
          <motion.div 
            className="absolute bottom-0 w-200 h-full bg-no-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23012c4d'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundSize: '1200px 120px',
            }}
            animate={{
              x: [0, -600],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        {/* Patrones culturales */}
        {creator.traditions.slice(0, 3).map((tradition: string, index: number) => (
          <motion.div
            key={index}
            className="absolute text-[#aedd2b] opacity-10 text-4xl md:text-6xl font-bold"
            style={{
              top: `${20 + index * 20}%`,
              left: `${10 + index * 20}%`,
              transform: `rotate(${index * 15}deg)`,
            }}
            animate={{
              rotate: [0, 5, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {tradition}
          </motion.div>
        ))}
        
        {/* Contenido de cabecera - Reestructurado para móviles */}
        <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end w-full gap-6">
            {/* Avatar con borde cultural */}
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#aedd2b] shadow-2xl">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
              </div>
              
              {/* Indicador de energía cultural */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#012c4d] rounded-full px-3 py-1 text-sm font-bold flex items-center shadow-lg border border-[#02416d]">
                <div className="w-2 h-2 rounded-full bg-[#aedd2b] mr-2 animate-pulse"></div>
                <span>{culturalEnergy}%</span>
              </div>
            </motion.div>
            
            {/* Información del creador - Centrada en móviles */}
            <div className="text-white flex-1">
              <div className="text-center md:text-left">
                <motion.h1 
                  className="text-2xl md:text-4xl font-bold"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {creator.name}
                </motion.h1>
                
                <motion.p 
                  className="text-[#aedd2b] text-lg md:text-xl mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {creator.tagline}
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-wrap justify-center md:justify-start items-center gap-2 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center bg-[#02416d]/50 px-3 py-1 rounded-full text-sm md:text-base">
                  <FaUsers className="text-[#aedd2b] mr-2" />
                  <span>{creator.followers} seguidores</span>
                </div>
                
                <div className="flex items-center bg-[#02416d]/50 px-3 py-1 rounded-full text-sm md:text-base">
                  <FaMapMarkerAlt className="text-[#aedd2b] mr-2" />
                  <span>{creator.location}</span>
                </div>
              </motion.div>
              
              {/* Acciones para móviles - Debajo de la información */}
              <motion.div 
                className="flex justify-center gap-3 mt-4 md:hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button 
                  className={`flex items-center px-4 py-2 rounded-full font-medium transition-all text-sm ${
                    isFollowing 
                      ? 'bg-[#aedd2b] text-[#012c4d]' 
                      : 'bg-[#02416d] text-white hover:bg-[#013258]'
                  }`}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <FaRss className="mr-2" />
                  {isFollowing ? 'Siguiendo' : 'Seguir'}
                </button>
                
                <button className="bg-[#02416d] text-white px-4 py-2 rounded-full hover:bg-[#013258] transition-colors flex items-center text-sm">
                  <FaShare className="mr-2" /> Compartir
                </button>
              </motion.div>
            </div>
            
            {/* Acciones para escritorio - A la derecha */}
            <motion.div 
              className="ml-auto hidden md:flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button 
                className={`flex items-center px-4 py-2 rounded-full font-medium transition-all ${
                    isFollowing 
                      ? 'bg-[#aedd2b] text-[#012c4d]' 
                      : 'bg-[#02416d] text-white hover:bg-[#013258]'
                  }`}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                <FaRss className="mr-2" />
                {isFollowing ? 'Siguiendo' : 'Seguir'}
              </button>
              
              <button className="bg-[#02416d] text-white px-4 py-2 rounded-full hover:bg-[#013258] transition-colors flex items-center">
                <FaShare className="mr-2" /> Compartir
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cuerpo del perfil */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Columna izquierda - Información detallada */}
          <div className="w-full lg:w-1/3">
            {/* Biografía */}
            <motion.div 
              className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <FaBook className="text-[#aedd2b] mr-2" /> Biografía Cultural
              </h3>
              <p className="text-white/90 leading-relaxed">
                {creator.bio}
              </p>
              
              <div className="mt-6">
                <h4 className="text-[#aedd2b] font-bold mb-2">Tradiciones Preservadas</h4>
                <div className="flex flex-wrap gap-2">
                  {creator.traditions.map((tradition: string, index: number) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-[#02416d]/50 text-white/90 rounded-full text-sm"
                    >
                      {tradition}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Linaje Cultural */}
            <motion.div 
              className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d] mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <GiFamilyTree className="text-[#aedd2b] mr-2 text-xl" /> Linaje Cultural
              </h3>
              
              <div className="space-y-4">
                {creator.culturalLineage.map((member: CulturalLineage, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-full bg-[#02416d] flex items-center justify-center">
                        <div className="text-[#aedd2b]">
                          {index === 0 && <FaTree />}
                          {index === 1 && <FaHistory />}
                          {index === 2 && <FaUsers />}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{member.generation}: {member.name}</h4>
                      <p className="text-white/80 text-sm">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Conexiones Comunitarias */}
            <motion.div 
              className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d] mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <FaHandshake className="text-[#aedd2b] mr-2" /> Conexiones Comunitarias
              </h3>
              
              <div className="space-y-3">
                {creator.communities.map((community: string, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-[#02416d]/30 rounded-lg hover:bg-[#02416d]/50 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-[#012c4d] flex items-center justify-center mr-3">
                      <FaUsers className="text-[#aedd2b]" />
                    </div>
                    <span className="text-white/90">{community}</span>
                  </div>
                ))}
              </div>
              
              <button className="mt-4 w-full bg-[#02416d] hover:bg-[#013258] text-white py-2 rounded-lg transition-colors flex items-center justify-center">
                <FaEnvelope className="mr-2" /> Contactar comunidad
              </button>
            </motion.div>
            
            {/* Colaboraciones Destacadas */}
            <motion.div 
              className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d] mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <FaGlobeAmericas className="text-[#aedd2b] mr-2" /> Colaboraciones
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {creator.collaborations.map((collab: string, index: number) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-[#aedd2b]/10 text-[#aedd2b] rounded-full text-sm border border-[#aedd2b]/30"
                  >
                    {collab}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Columna derecha - Contenido y pestañas */}
          <div className="w-full lg:w-2/3">
            {/* Navegación por pestañas */}
            <motion.div 
              className="flex overflow-x-auto pb-1 mb-6 scrollbar-hide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                className={`px-4 py-3 font-medium whitespace-nowrap relative ${
                  activeTab === 'content' 
                    ? 'text-[#aedd2b] border-b-2 border-[#aedd2b]' 
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={() => setActiveTab('content')}
              >
                <span className="flex items-center">
                  <FaPlay className="mr-2" /> Contenido ({content.length})
                </span>
              </button>
              
              <button
                className={`px-4 py-3 font-medium whitespace-nowrap relative ${
                  activeTab === 'community' 
                    ? 'text-[#aedd2b] border-b-2 border-[#aedd2b]' 
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={() => setActiveTab('community')}
              >
                <span className="flex items-center">
                  <FaUsers className="mr-2" /> Comunidad
                </span>
              </button>
              
              <button
                className={`px-4 py-3 font-medium whitespace-nowrap relative ${
                  activeTab === 'history' 
                    ? 'text-[#aedd2b] border-b-2 border-[#aedd2b]' 
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={() => setActiveTab('history')}
              >
                <span className="flex items-center">
                  <FaHistory className="mr-2" /> Historia Cultural
                </span>
              </button>
              
              <button
                className={`px-4 py-3 font-medium whitespace-nowrap relative ${
                  activeTab === 'collaborations' 
                    ? 'text-[#aedd2b] border-b-2 border-[#aedd2b]' 
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={() => setActiveTab('collaborations')}
              >
                <span className="flex items-center">
                  <FaHandshake className="mr-2" /> Colaboraciones
                </span>
              </button>
            </motion.div>
            
            {/* Contenido de las pestañas */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {activeTab === 'content' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.map((item: ContentItem) => (
                    <motion.div
                      key={item.id}
                      className="relative"
                      whileHover={{ 
                        y: -10,
                        scale: 1.02,
                        zIndex: 10
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Corriente cultural */}
                      <motion.div 
                        className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-20 pointer-events-none"
                        style={{ backgroundColor: item.accentColor || '#aedd2b' }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.2, 0.1, 0.2]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      <Thumbnail
                        title={item.title}
                        creator={item.creator}
                        views={item.views}
                        duration={item.duration}
                        category={item.category}
                        thumbnailUrl={item.thumbnailUrl}
                        accentColor={item.accentColor}
                        culturalSignificance={item.culturalImpact}
                        culturalTags={item.tags}
                        isTrending={item.isTrending}
                        onClick={() => openContentModal(item)}
                      />
                      
                      {/* Acciones */}
                      <div className="flex justify-between mt-2">
                        <button className="text-white/70 hover:text-[#aedd2b] transition-colors">
                          <FaHeart className="mr-1 inline" /> 245
                        </button>
                        <button className="text-white/70 hover:text-[#aedd2b] transition-colors">
                          <FaShare className="mr-1 inline" /> Compartir
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {activeTab === 'community' && (
                <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d]">
                  <h3 className="text-xl font-bold text-white mb-4">Comunidades Activas</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {creator.communities.map((community: string, index: number) => (
                      <motion.div
                        key={index}
                        className="p-4 bg-[#02416d]/30 rounded-xl border border-[#02416d]/50 hover:border-[#aedd2b]/50 transition-colors"
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-full bg-[#012c4d] flex items-center justify-center mr-3">
                            <FaUsers className="text-[#aedd2b]" />
                          </div>
                          <h4 className="font-bold text-white">{community}</h4>
                        </div>
                        
                        <p className="text-white/80 text-sm mb-3">
                          Comunidad dedicada a la preservación de tradiciones locales con más de 10 años de trayectoria.
                        </p>
                        
                        <div className="flex">
                          <button className="text-[#aedd2b] text-sm font-medium flex items-center">
                            <FaEnvelope className="mr-1" /> Contactar
                          </button>
                          <button className="text-[#aedd2b] text-sm font-medium flex items-center ml-4">
                            <FaHandshake className="mr-1" /> Colaborar
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-xl font-bold text-white mb-4">Eventos Comunitarios</h4>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Taller de Marimba", date: "15 Oct 2023", location: "Quibdó" },
                        { title: "Festival de Tejidos Tradicionales", date: "28 Nov 2023", location: "Medellín" },
                        { title: "Encuentro de Sabedores Ancestrales", date: "5 Dic 2023", location: "Bogotá" }
                      ].map((event, index) => (
                        <div key={index} className="flex p-4 bg-[#02416d]/30 rounded-xl border border-[#02416d]/50">
                          <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-[#012c4d] flex items-center justify-center mr-4">
                            <div className="text-center">
                              <div className="text-[#aedd2b] font-bold">15</div>
                              <div className="text-white/80 text-xs">OCT</div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-bold text-white">{event.title}</h5>
                            <p className="text-white/80 text-sm flex items-center mt-1">
                              <FaMapMarkerAlt className="mr-2" /> {event.location}
                            </p>
                          </div>
                          <button className="ml-auto self-center bg-[#aedd2b] text-[#012c4d] px-3 py-1 rounded-full text-sm font-bold hover:bg-[#9bc926] transition-colors">
                            Participar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Otros creadores destacados */}
                  <div className="mt-12">
                    <h4 className="text-xl font-bold text-white mb-4">Otros Creadores Destacados</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {creators
                        .filter(c => c.id !== creator.id)
                        .map((otherCreator: Creator) => (
                          <motion.div
                            key={otherCreator.id}
                            className="bg-[#02416d]/30 rounded-xl border border-[#02416d]/50 p-4 hover:border-[#aedd2b]/50 transition-colors cursor-pointer"
                            whileHover={{ y: -5 }}
                          >
                            <div className="flex justify-center">
                              <div className="w-16 h-16 rounded-full border-2 border-[#aedd2b] overflow-hidden">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                              </div>
                            </div>
                            <h5 className="text-center font-bold text-white mt-3">{otherCreator.name}</h5>
                            <p className="text-center text-[#aedd2b] text-sm mt-1">{otherCreator.tagline}</p>
                            <div className="mt-3 flex flex-wrap gap-1 justify-center">
                              {otherCreator.traditions.slice(0, 2).map((tradition, index) => (
                                <span key={index} className="text-xs bg-[#012c4d] text-white/80 px-2 py-1 rounded-full">
                                  {tradition}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'history' && (
                <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d]">
                  <h3 className="text-xl font-bold text-white mb-4">Línea de Tiempo Cultural</h3>
                  
                  <div className="relative pl-8 mt-8">
                    {/* Línea vertical */}
                    <div className="absolute left-4 top-0 bottom-0 w-1 bg-[#02416d]"></div>
                    
                    {/* Puntos de tiempo */}
                    <div className="relative mb-12">
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#aedd2b] border-4 border-[#012c4d]"></div>
                      <div className="ml-8">
                        <h5 className="font-bold text-white text-lg">2010 - Inicios</h5>
                        <p className="text-white/80 mb-3">
                          Comenzó documentando las tradiciones orales de su comunidad con una cámara prestada
                        </p>
                        <div className="flex overflow-x-auto gap-2 pb-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex-shrink-0 w-24 h-24 bg-gray-700 rounded-lg"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative mb-12">
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#aedd2b] border-4 border-[#012c4d]"></div>
                      <div className="ml-8">
                        <h5 className="font-bold text-white text-lg">2015 - Reconocimiento</h5>
                        <p className="text-white/80 mb-3">
                          Premio Nacional de Patrimonio Cultural por su documental "Cantos del Atrato"
                        </p>
                        <div className="flex overflow-x-auto gap-2 pb-2">
                          {[1, 2].map((i) => (
                            <div key={i} className="flex-shrink-0 w-24 h-24 bg-gray-700 rounded-lg"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#aedd2b] border-4 border-[#012c4d]"></div>
                      <div className="ml-8">
                        <h5 className="font-bold text-white text-lg">2023 - Actualidad</h5>
                        <p className="text-white/80 mb-3">
                          Lidera el proyecto "Memoria Viva" para digitalizar tradiciones ancestrales
                        </p>
                        <div className="flex overflow-x-auto gap-2 pb-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex-shrink-0 w-24 h-24 bg-gray-700 rounded-lg"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12">
                    <h4 className="text-xl font-bold text-white mb-4">Sabiduría Ancestral</h4>
                    
                    <div className="space-y-4">
                      {[
                        "Cuando el río suena, piedras trae, pero también historias que contar",
                        "La marimba no solo es un instrumento, es la voz de nuestros ancestros",
                        "Tejer no es solo unir hilos, es conectar generaciones"
                      ].map((wisdom, index) => (
                        <div key={index} className="flex p-4 bg-[#02416d]/30 rounded-xl border border-[#02416d]/50">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-12 h-12 rounded-full bg-[#012c4d] flex items-center justify-center">
                              <BsFillChatQuoteFill className="text-[#aedd2b] text-xl" />
                            </div>
                          </div>
                          <p className="text-white/90 italic">"{wisdom}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'collaborations' && (
                <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d]">
                  <h3 className="text-xl font-bold text-white mb-4">Colaboraciones Destacadas</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {creator.collaborations.map((collab: string, index: number) => (
                      <motion.div
                        key={index}
                        className="p-5 bg-[#02416d]/30 rounded-xl border border-[#02416d]/50 hover:border-[#aedd2b]/50 transition-colors"
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-center mb-4">
                          <div className="w-16 h-16 rounded-lg bg-[#012c4d] flex items-center justify-center mr-4">
                            <div className="text-2xl text-[#aedd2b]">
                              {index % 3 === 0 && <FaBook />}
                              {index % 3 === 1 && <FaGlobeAmericas />}
                              {index % 3 === 2 && <FaHandshake />}
                            </div>
                          </div>
                          <h4 className="font-bold text-white text-lg">{collab}</h4>
                        </div>
                        
                        <p className="text-white/80 text-sm mb-4">
                          Colaboración centrada en la preservación de {creator.traditions[index % creator.traditions.length]}.
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[#aedd2b] text-sm">Proyecto activo</span>
                          <button className="bg-[#aedd2b] text-[#012c4d] px-3 py-1 rounded-full text-sm font-bold hover:bg-[#9bc926] transition-colors">
                            Ver proyecto
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-xl font-bold text-white mb-4">Iniciativas Conjuntas</h4>
                    
                    <div className="space-y-4">
                      {[
                        "Digitalización de archivos sonoros tradicionales",
                        "Escuela itinerante de saberes ancestrales",
                        "Exposición internacional de arte tradicional"
                      ].map((initiative, index) => (
                        <div key={index} className="flex items-center p-4 bg-[#02416d]/30 rounded-xl border border-[#02416d]/50">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#012c4d] flex items-center justify-center mr-4">
                            <div className="text-[#aedd2b]">
                              <FaTree />
                            </div>
                          </div>
                          <span className="text-white/90">{initiative}</span>
                          <div className="ml-auto w-3 h-3 rounded-full bg-[#aedd2b] animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal para ver contenido detallado */}
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
              className="relative bg-[#012c4d] rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
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
              </div>

              {/* Contenido principal del modal */}
              <div className="relative z-10">
                {/* Encabezado */}
                <div className="p-6 flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedContent.title}
                    </h2>
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
                
                {/* Reproductor */}
                <div className="relative aspect-video mx-4 rounded-xl overflow-hidden shadow-2xl">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#012c4d] to-[#001a2d]">
                    <div className="text-center relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center">
                          {/* Aquí iría el reproductor de video real en una implementación completa */}
                          <div className="text-center">
                            <FaPlay className="text-5xl text-[#aedd2b]" />
                            <p className="mt-2 text-white">Reproducir video</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Descripción y estadísticas */}
                <div className="p-6">
                  <div className="mb-6">
                    <p className="text-white/90 leading-relaxed">
                      {selectedContent.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#aedd2b]">245</div>
                      <div className="text-white/80 text-sm">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#aedd2b]">42</div>
                      <div className="text-white/80 text-sm">Comentarios</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#aedd2b]">{selectedContent.views.toLocaleString()}</div>
                      <div className="text-white/80 text-sm">Visualizaciones</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <button className="flex items-center bg-[#02416d] text-white px-4 py-2 rounded-full hover:bg-[#013258] transition-colors">
                      <FaHeart className="mr-2" /> Like
                    </button>
                    <button className="flex items-center bg-[#02416d] text-white px-4 py-2 rounded-full hover:bg-[#013258] transition-colors">
                      <FaComment className="mr-2" /> Comentar
                    </button>
                    <button className="flex items-center bg-[#02416d] text-white px-4 py-2 rounded-full hover:bg-[#013258] transition-colors">
                      <FaShare className="mr-2" /> Compartir
                    </button>
                  </div>
                  
                  {/* Información adicional */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-white/80">
                      <FaClock className="mr-2 text-[#aedd2b]" />
                      <span>{selectedContent.duration}</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <FaEye className="mr-2 text-[#aedd2b]" />
                      <span>Publicado el {formatDate(selectedContent.uploadDate)}</span>
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

export default CreatorProfile;
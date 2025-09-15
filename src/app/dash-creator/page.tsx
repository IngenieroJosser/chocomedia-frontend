'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, FaUsers, FaChartLine, FaBell, 
  FaUpload, FaEdit, FaCog, FaBook, 
  FaHeart, FaComment, FaShare, FaArrowUp,
  FaArrowDown, FaCalendarAlt, FaRegClock,
  FaTimes, FaEye, FaMapMarkerAlt, FaHandshake,
  FaBlog
} from 'react-icons/fa';
import { GiTreeGrowth } from 'react-icons/gi';
import { BsGraphUpArrow, BsFillLightningChargeFill } from 'react-icons/bs';
import SpinnerCulture from '@/components/SpinnerCulture';
import Thumbnail from '@/components/Thumbnail';
import { ContentItem, ContentType } from '@/lib/type';

const DashboardCreator = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'analytics' | 'community'>('dashboard');
  const [culturalEnergy, setCulturalEnergy] = useState(0);
  
  // Datos del creador (simulados)
  const creator = {
    name: "María Chocó",
    tagline: "Guardiana de tradiciones afrocolombianas",
    profileImage: "/creator-profile.jpg",
    followers: "24.8K",
    culturalImpact: 92,
    traditions: ["Música de marimba", "Tejido wounaan", "Cantos de arrullo"],
    contentCount: 18,
    collaborations: 7
  };

  // Estadísticas del dashboard
  const stats = {
    totalViews: 1248000,
    newFollowers: 248,
    engagementRate: 8.2,
    culturalImpact: 92,
    contentPerformance: [
      { name: "Documental: Cantos del Atrato", views: 482000, change: 12 },
      { name: "Taller de Tejido Wounaan", views: 315000, change: 8 },
      { name: "Ritual de Arraigo", views: 198000, change: -3 },
      { name: "Entrevista con Sabedores", views: 153000, change: 24 }
    ],
    recentActivity: [
      { type: "new_follower", user: "Carlos Wayuu", time: "2 horas" },
      { type: "content_like", user: "Ana Arhuaca", content: "Documental: Cantos del Atrato", time: "5 horas" },
      { type: "collab_request", user: "Museo del Oro", time: "1 día" },
      { type: "content_comment", user: "Jorge Páez", content: "Taller de Tejido Wounaan", time: "1 día" }
    ],
    culturalGrowth: [
      { month: "Ene", impact: 78 },
      { month: "Feb", impact: 82 },
      { month: "Mar", impact: 85 },
      { month: "Abr", impact: 88 },
      { month: "May", impact: 90 },
      { month: "Jun", impact: 92 }
    ]
  };

  // Generar contenido para el dashboard con todas las propiedades requeridas
  const generateContent = (): ContentItem[] => {
    return [
      {
        id: "content-1",
        title: "Documental: Cantos del Atrato",
        creator: creator.name,
        views: 482000,
        duration: "22:45",
        category: 'documentary' as ContentType,
        thumbnailUrl: "/doc-thumb.jpg",
        accentColor: "#aedd2b",
        culturalImpact: 92,
        tags: [creator.traditions[0]],
        isTrending: true,
        contentUrl: "/videos/documental.mp4",
        description: "Documental sobre tradiciones musicales del Pacífico colombiano",
        uploadDate: "2023-06-15",
        location: "Quibdó, Colombia",
        culturalSignificance: "Alta",
        communityConnections: ["Consejo Comunitario Mayor"],
        ancestralStories: ["Rosa Angulo", "Luisa Palacios"]
      },
      {
        id: "content-2",
        title: "Taller de Tejido Wounaan",
        creator: creator.name,
        views: 315000,
        duration: "45:18",
        category: 'video' as ContentType,
        thumbnailUrl: "/workshop-thumb.jpg",
        accentColor: "#f9a825",
        culturalImpact: 88,
        tags: [creator.traditions[1]],
        isTrending: false,
        contentUrl: "/videos/taller.mp4",
        description: "Taller práctico sobre técnicas de tejido tradicional",
        uploadDate: "2023-05-28",
        location: "Medellín, Colombia",
        culturalSignificance: "Media",
        communityConnections: ["Fundación Rio Atrato"],
        ancestralStories: ["Rosa Angulo"]
      },
      {
        id: "content-3",
        title: "Ritual de Arraigo",
        creator: creator.name,
        views: 198000,
        duration: "52:10",
        category: 'video' as ContentType,
        thumbnailUrl: "/ritual-thumb.jpg",
        accentColor: "#ec407a",
        culturalImpact: 98,
        tags: ["Ritual"],
        isTrending: true,
        contentUrl: "/videos/ritual.mp4",
        description: "Ceremonia tradicional de conexión con la tierra",
        uploadDate: "2023-07-02",
        location: "Nuquí, Colombia",
        culturalSignificance: "Sagrada",
        communityConnections: ["Colectivo Jóvenes del Pacífico"],
        ancestralStories: ["Rosa Angulo", "Luisa Palacios"]
      },
      {
        id: "content-4",
        title: "Entrevista con Sabedores",
        creator: creator.name,
        views: 153000,
        duration: "38:12",
        category: 'video' as ContentType,
        thumbnailUrl: "/interview-thumb.jpg",
        accentColor: "#26a69a",
        culturalImpact: 95,
        tags: ["Entrevista"],
        isTrending: true,
        contentUrl: "/videos/entrevista.mp4",
        description: "Conversación con guardianes de saberes ancestrales",
        uploadDate: "2023-06-22",
        location: "Bogotá, Colombia",
        culturalSignificance: "Alta",
        communityConnections: ["Consejo Comunitario Mayor"],
        ancestralStories: ["Rosa Angulo", "Luisa Palacios"]
      }
    ];
  };

  const content = generateContent();

  // Simular carga de datos
  useEffect(() => {
    setTimeout(() => {
      setCulturalEnergy(creator.culturalImpact);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#012c4d] to-[#001a2d]">
        <SpinnerCulture />
      </div>
    );
  }

  // Formatear números grandes
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#012c4d] to-[#001a2d] pb-10">
      {/* Cabecera del dashboard */}
      <div className="bg-gradient-to-r from-[#001a2d] to-[#012c4d] py-6 px-4 md:px-8 border-b border-[#02416d]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#aedd2b]">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{creator.name}</h1>
                <p className="text-[#aedd2b] text-sm">{creator.tagline}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <button className="relative p-2 text-white/80 hover:text-white transition-colors">
                <FaBell className="text-xl" />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#aedd2b]"></span>
              </button>
              
              <div className="flex items-center gap-2 bg-[#02416d] px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-[#aedd2b] animate-pulse"></div>
                <span className="text-white font-bold">{culturalEnergy}%</span>
                <span className="text-white/70 text-sm">Energía Cultural</span>
              </div>
              
              <button className="bg-[#aedd2b] text-[#012c4d] font-bold px-4 py-2 rounded-full flex items-center hover:bg-[#9bc926] transition-colors">
                <FaUpload className="mr-2" /> Nuevo Contenido
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navegación */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 md:gap-4">
          <button
            className={`px-4 py-3 font-medium rounded-xl flex items-center transition-colors ${
              activeTab === 'dashboard' 
                ? 'bg-[#aedd2b] text-[#012c4d]' 
                : 'bg-[#02416d] text-white hover:bg-[#013258]'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BsGraphUpArrow className="mr-2" /> Dashboard
          </button>
          
          <button
            className={`px-4 py-3 font-medium rounded-xl flex items-center transition-colors ${
              activeTab === 'content' 
                ? 'bg-[#aedd2b] text-[#012c4d]' 
                : 'bg-[#02416d] text-white hover:bg-[#013258]'
            }`}
            onClick={() => setActiveTab('content')}
          >
            <FaPlay className="mr-2" /> Mi Contenido
          </button>
          
          <button
            className={`px-4 py-3 font-medium rounded-xl flex items-center transition-colors ${
              activeTab === 'analytics' 
                ? 'bg-[#aedd2b] text-[#012c4d]' 
                : 'bg-[#02416d] text-white hover:bg-[#013258]'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            <FaChartLine className="mr-2" /> Estadísticas
          </button>
          
          <button
            className={`px-4 py-3 font-medium rounded-xl flex items-center transition-colors ${
              activeTab === 'community' 
                ? 'bg-[#aedd2b] text-[#012c4d]' 
                : 'bg-[#02416d] text-white hover:bg-[#013258]'
            }`}
            onClick={() => setActiveTab('community')}
          >
            <FaUsers className="mr-2" /> Comunidad
          </button>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Columna izquierda - Estadísticas principales */}
                <div className="lg:col-span-2">
                  {/* Tarjeta de bienvenida */}
                  <motion.div 
                    className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d] mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-white">Bienvenida, {creator.name.split(' ')[0]}!</h2>
                        <p className="text-white/80 mt-2">
                          Tu energía cultural está en <span className="text-[#aedd2b] font-bold">{culturalEnergy}%</span>. 
                          Continúa compartiendo tu sabiduría para mantener viva nuestra cultura.
                        </p>
                      </div>
                      <div className="bg-[#02416d] p-4 rounded-xl flex flex-col items-center">
                        <div className="text-[#aedd2b] text-3xl font-bold">{creator.contentCount}</div>
                        <div className="text-white text-sm">Contenidos publicados</div>
                      </div>
                    </div>
                    
                    {/* Olas culturales */}
                    <div className="mt-6 h-16 relative overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#001a2d] to-[#012c4d]"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-8">
                        {creator.traditions.map((tradition, index) => (
                          <motion.div
                            key={index}
                            className="absolute text-[#aedd2b] opacity-10 text-xl font-bold whitespace-nowrap"
                            style={{ bottom: '10px', left: `${index * 30}%` }}
                            animate={{ 
                              x: [0, -1000],
                            }}
                            transition={{
                              duration: 20 + index * 5,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          >
                            {tradition}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Estadísticas rápidas */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <motion.div 
                      className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-4 border border-[#02416d]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="text-white/70 text-sm">Visualizaciones</div>
                      <div className="text-2xl font-bold text-white mt-1">{formatNumber(stats.totalViews)}</div>
                      <div className="flex items-center text-[#aedd2b] text-sm mt-2">
                        <FaArrowUp className="mr-1" /> 12% este mes
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-4 border border-[#02416d]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="text-white/70 text-sm">Seguidores</div>
                      <div className="text-2xl font-bold text-white mt-1">{creator.followers}</div>
                      <div className="flex items-center text-[#aedd2b] text-sm mt-2">
                        <FaArrowUp className="mr-1" /> +{stats.newFollowers} nuevos
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-4 border border-[#02416d]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="text-white/70 text-sm">Interacción</div>
                      <div className="text-2xl font-bold text-white mt-1">{stats.engagementRate}%</div>
                      <div className="flex items-center text-[#aedd2b] text-sm mt-2">
                        <BsFillLightningChargeFill className="mr-1" /> +2.4%
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-4 border border-[#02416d]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="text-white/70 text-sm">Colaboraciones</div>
                      <div className="text-2xl font-bold text-white mt-1">{creator.collaborations}</div>
                      <div className="flex items-center text-[#aedd2b] text-sm mt-2">
                        <FaHandshake className="mr-1" /> 2 nuevas
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Rendimiento de contenido */}
                  <motion.div 
                    className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <FaChartLine className="text-[#aedd2b] mr-2" /> Rendimiento de Contenido
                    </h3>
                    
                    <div className="space-y-4">
                      {stats.contentPerformance.map((item, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-center p-3 bg-[#02416d]/30 rounded-xl border border-[#02416d]/50"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#012c4d] flex items-center justify-center mr-4">
                            <FaPlay className="text-[#aedd2b]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-white">{item.name}</h4>
                            <div className="flex items-center text-sm mt-1">
                              <FaEye className="mr-2 text-[#aedd2b]" />
                              <span className="text-white/80">{formatNumber(item.views)} visualizaciones</span>
                            </div>
                          </div>
                          <div className={`flex items-center text-sm font-bold ${
                            item.change > 0 ? 'text-[#aedd2b]' : 'text-[#ec407a]'
                          }`}>
                            {item.change > 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                            {Math.abs(item.change)}%
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                {/* Columna derecha - Actividad y crecimiento */}
                <div>
                  {/* Actividad reciente */}
                  <motion.div 
                    className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d] mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-white flex items-center">
                        <FaBell className="text-[#aedd2b] mr-2" /> Actividad Reciente
                      </h3>
                      <span className="text-[#aedd2b] text-sm">Ver todo</span>
                    </div>
                    
                    <div className="space-y-4">
                      {stats.recentActivity.map((activity, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-start p-3 bg-[#02416d]/30 rounded-xl border border-[#02416d]/50"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <div className="flex-shrink-0 mt-1 mr-3">
                            <div className="w-8 h-8 rounded-full bg-[#012c4d] flex items-center justify-center">
                              {activity.type === 'new_follower' && <FaUsers className="text-[#aedd2b]" />}
                              {activity.type === 'content_like' && <FaHeart className="text-[#aedd2b]" />}
                              {activity.type === 'collab_request' && <FaHandshake className="text-[#aedd2b]" />}
                              {activity.type === 'content_comment' && <FaComment className="text-[#aedd2b]" />}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="text-white">
                              {activity.type === 'new_follower' && (
                                <><span className="font-bold">{activity.user}</span> empezó a seguirte</>
                              )}
                              {activity.type === 'content_like' && (
                                <><span className="font-bold">{activity.user}</span> dio me gusta a <span className="text-[#aedd2b]">{activity.content}</span></>
                              )}
                              {activity.type === 'collab_request' && (
                                <><span className="font-bold">{activity.user}</span> te envió una solicitud de colaboración</>
                              )}
                              {activity.type === 'content_comment' && (
                                <><span className="font-bold">{activity.user}</span> comentó en <span className="text-[#aedd2b]">{activity.content}</span></>
                              )}
                            </div>
                            <div className="text-white/50 text-xs mt-1 flex items-center">
                              <FaRegClock className="mr-1" /> Hace {activity.time}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Crecimiento cultural */}
                  <motion.div 
                    className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <GiTreeGrowth className="text-[#aedd2b] mr-2 text-2xl" /> Tu Impacto Cultural
                    </h3>
                    
                    <div className="flex items-end justify-between h-40 mb-4">
                      {stats.culturalGrowth.map((item, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div className="text-white/50 text-xs mb-1">{item.month}</div>
                          <motion.div 
                            className="w-3/4 bg-gradient-to-t from-[#aedd2b] to-[#8bb422] rounded-t-lg"
                            style={{ height: `${item.impact}%` }}
                            initial={{ height: 0 }}
                            animate={{ height: `${item.impact}%` }}
                            transition={{ 
                              duration: 0.8,
                              delay: 0.1 * index
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center mt-6">
                      <div>
                        <div className="text-white/70 text-sm">Impacto Actual</div>
                        <div className="text-2xl font-bold text-[#aedd2b]">{culturalEnergy}%</div>
                      </div>
                      <div className="bg-[#02416d] px-3 py-1 rounded-full text-[#aedd2b] font-bold flex items-center">
                        <FaArrowUp className="mr-1" /> 14% en 6 meses
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Acciones rápidas */}
                  <motion.div 
                    className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d] mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <BsFillLightningChargeFill className="text-[#aedd2b] mr-2" /> Acciones Rápidas
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button className="bg-[#02416d] hover:bg-[#013258] text-white p-4 rounded-xl flex flex-col items-center transition-colors">
                        <FaUpload className="text-2xl text-[#aedd2b] mb-2" />
                        <span>Subir Contenido</span>
                      </button>
                      
                      <button className="bg-[#02416d] hover:bg-[#013258] text-white p-4 rounded-xl flex flex-col items-center transition-colors">
                        <FaEdit className="text-2xl text-[#aedd2b] mb-2" />
                        <span>Editar Perfil</span>
                      </button>
                      
                      <button className="bg-[#02416d] hover:bg-[#013258] text-white p-4 rounded-xl flex flex-col items-center transition-colors">
                        <FaBook className="text-2xl text-[#aedd2b] mb-2" />
                        <span>Sabiduría</span>
                      </button>
                      
                      <button className="bg-[#02416d] hover:bg-[#013258] text-white p-4 rounded-xl flex flex-col items-center transition-colors">
                        <FaBlog className="text-2xl text-[#aedd2b] mb-2" />
                        <span>Aportar al Blog</span>
                      </button>
                      
                      <button className="bg-[#02416d] hover:bg-[#013258] text-white p-4 rounded-xl flex flex-col items-center transition-colors">
                        <FaCog className="text-2xl text-[#aedd2b] mb-2" />
                        <span>Ajustes</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
            
            {activeTab === 'content' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-4 border border-[#02416d]">
                    <div className="text-white/70 text-sm">Total Contenido</div>
                    <div className="text-2xl font-bold text-white mt-1">{creator.contentCount}</div>
                  </div>
                  
                  <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-4 border border-[#02416d]">
                    <div className="text-white/70 text-sm">Visualizaciones Totales</div>
                    <div className="text-2xl font-bold text-white mt-1">{formatNumber(stats.totalViews)}</div>
                  </div>
                  
                  <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-4 border border-[#02416d]">
                    <div className="text-white/70 text-sm">Mejor Contenido</div>
                    <div className="text-2xl font-bold text-[#aedd2b] mt-1">482K</div>
                  </div>
                  
                  <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-4 border border-[#02416d]">
                    <div className="text-white/70 text-sm">Nuevos Hoy</div>
                    <div className="text-2xl font-bold text-white mt-1">0</div>
                  </div>
                </div>
                
                <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d]">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Tu Biblioteca Cultural</h2>
                    <div className="flex gap-2">
                      <select className="bg-[#02416d] text-white px-3 py-2 rounded-lg">
                        <option>Todos</option>
                        <option>Documentales</option>
                        <option>Talleres</option>
                        <option>Rituales</option>
                        <option>Entrevistas</option>
                      </select>
                      <select className="bg-[#02416d] text-white px-3 py-2 rounded-lg">
                        <option>Recientes primero</option>
                        <option>Más populares</option>
                        <option>Mayor impacto</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.map((item) => (
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
                          onClick={() => {}}
                        />
                        
                        <div className="mt-3 flex justify-between">
                          <div className="text-white/70 text-sm flex items-center">
                            <FaCalendarAlt className="mr-2" />
                            {new Date(item.uploadDate).toLocaleDateString('es-ES', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          
                          <div className="flex gap-3">
                            <button className="text-white/70 hover:text-[#aedd2b] transition-colors">
                              <FaEdit />
                            </button>
                            <button className="text-white/70 hover:text-[#aedd2b] transition-colors">
                              <FaShare />
                            </button>
                            <button className="text-white/70 hover:text-[#ec407a] transition-colors">
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <button className="bg-[#02416d] hover:bg-[#013258] text-white px-6 py-3 rounded-full transition-colors flex items-center">
                      <FaUpload className="mr-2" /> Subir más contenido
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d]">
                  <h3 className="text-xl font-bold text-white mb-4">Desempeño General</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#02416d]/30 p-4 rounded-xl">
                      <div className="text-white/70 text-sm">Visualizaciones Totales</div>
                      <div className="text-2xl font-bold text-white mt-1">{formatNumber(stats.totalViews)}</div>
                    </div>
                    
                    <div className="bg-[#02416d]/30 p-4 rounded-xl">
                      <div className="text-white/70 text-sm">Tasa de Finalización</div>
                      <div className="text-2xl font-bold text-white mt-1">68%</div>
                    </div>
                    
                    <div className="bg-[#02416d]/30 p-4 rounded-xl">
                      <div className="text-white/70 text-sm">Tasa de Interacción</div>
                      <div className="text-2xl font-bold text-white mt-1">{stats.engagementRate}%</div>
                    </div>
                    
                    <div className="bg-[#02416d]/30 p-4 rounded-xl">
                      <div className="text-white/70 text-sm">Nuevos Seguidores</div>
                      <div className="text-2xl font-bold text-white mt-1">+{stats.newFollowers}</div>
                    </div>
                  </div>
                  
                  <div className="h-64 bg-[#02416d]/20 rounded-xl flex items-center justify-center">
                    <div className="text-center text-white/50">
                      <BsGraphUpArrow className="text-4xl mx-auto mb-2" />
                      <p>Gráfico de visualizaciones en los últimos 30 días</p>
                      <p className="text-sm">(Implementación completa con biblioteca de gráficos)</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d]">
                  <h3 className="text-xl font-bold text-white mb-4">Audiencia</h3>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-white">Distribución Geográfica</div>
                      <div className="text-[#aedd2b] text-sm">Ver mapa completo</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white">Colombia</span>
                          <span className="text-white">62%</span>
                        </div>
                        <div className="h-2 bg-[#02416d] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#aedd2b] rounded-full" 
                            style={{ width: '62%' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white">México</span>
                          <span className="text-white">18%</span>
                        </div>
                        <div className="h-2 bg-[#02416d] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#aedd2b] rounded-full" 
                            style={{ width: '18%' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white">España</span>
                          <span className="text-white">9%</span>
                        </div>
                        <div className="h-2 bg-[#02416d] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#aedd2b] rounded-full" 
                            style={{ width: '9%' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white">Estados Unidos</span>
                          <span className="text-white">7%</span>
                        </div>
                        <div className="h-2 bg-[#02416d] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#aedd2b] rounded-full" 
                            style={{ width: '7%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-white mb-2">Distribución por Edad</div>
                    <div className="flex items-end justify-between h-32">
                      <div className="flex flex-col items-center">
                        <div className="text-white text-sm">18-24</div>
                        <div className="w-8 bg-[#aedd2b] rounded-t-lg mt-2" style={{ height: '70%' }}></div>
                        <div className="text-white text-xs mt-1">32%</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="text-white text-sm">25-34</div>
                        <div className="w-8 bg-[#aedd2b] rounded-t-lg mt-2" style={{ height: '90%' }}></div>
                        <div className="text-white text-xs mt-1">48%</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="text-white text-sm">35-44</div>
                        <div className="w-8 bg-[#aedd2b] rounded-t-lg mt-2" style={{ height: '40%' }}></div>
                        <div className="text-white text-xs mt-1">15%</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="text-white text-sm">45+</div>
                        <div className="w-8 bg-[#aedd2b] rounded-t-lg mt-2" style={{ height: '20%' }}></div>
                        <div className="text-white text-xs mt-1">5%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2 bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d]">
                  <h3 className="text-xl font-bold text-white mb-4">Impacto Cultural</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#02416d]/30 p-6 rounded-xl">
                      <div className="text-[#aedd2b] text-4xl font-bold mb-2">92%</div>
                      <div className="text-white text-lg font-bold mb-2">Impacto Actual</div>
                      <p className="text-white/80">
                        Tu contenido está preservando activamente tradiciones ancestrales y llegando a nuevas generaciones.
                      </p>
                    </div>
                    
                    <div className="bg-[#02416d]/30 p-6 rounded-xl">
                      <div className="text-[#aedd2b] text-4xl font-bold mb-2">78%</div>
                      <div className="text-white text-lg font-bold mb-2">Transmisión Cultural</div>
                      <p className="text-white/80">
                        La mayoría de tus espectadores reportan haber aprendido sobre su propia cultura gracias a tu trabajo.
                      </p>
                    </div>
                    
                    <div className="bg-[#02416d]/30 p-6 rounded-xl">
                      <div className="text-[#aedd2b] text-4xl font-bold mb-2">64%</div>
                      <div className="text-white text-lg font-bold mb-2">Influencia Educativa</div>
                      <p className="text-white/80">
                        Tu contenido es utilizado en 32 instituciones educativas para enseñar sobre patrimonio cultural.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-bold text-white">Áreas de Oportunidad</h4>
                      <span className="text-[#aedd2b] text-sm">Ver plan de crecimiento</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-[#02416d]/30 rounded-xl border border-[#02416d]/50">
                        <div className="font-bold text-white mb-2">Comunidades Indígenas</div>
                        <p className="text-white/80 mb-3">Podrías aumentar tu alcance en comunidades indígenas en un 35%</p>
                        <div className="h-2 bg-[#02416d] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#aedd2b] rounded-full" 
                            style={{ width: '45%' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-[#02416d]/30 rounded-xl border border-[#02416d]/50">
                        <div className="font-bold text-white mb-2">Audiencia Joven</div>
                        <p className="text-white/80 mb-3">Tu contenido podría adaptarse mejor para audiencias menores de 25 años</p>
                        <div className="h-2 bg-[#02416d] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#aedd2b] rounded-full" 
                            style={{ width: '30%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'community' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d] mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-white">Tu Comunidad Cultural</h3>
                      <button className="bg-[#aedd2b] text-[#012c4d] font-bold px-4 py-2 rounded-full flex items-center hover:bg-[#9bc926] transition-colors">
                        <FaUsers className="mr-2" /> Gestionar Comunidad
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-[#02416d]/30 p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-[#aedd2b]">{creator.followers}</div>
                        <div className="text-white">Seguidores</div>
                      </div>
                      
                      <div className="bg-[#02416d]/30 p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-[#aedd2b]">42</div>
                        <div className="text-white">Colaboradores</div>
                      </div>
                      
                      <div className="bg-[#02416d]/30 p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-[#aedd2b]">18</div>
                        <div className="text-white">Comunidades</div>
                      </div>
                      
                      <div className="bg-[#02416d]/30 p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-[#aedd2b]">7</div>
                        <div className="text-white">Proyectos</div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-bold text-white mb-4">Creadores Destacados en Tu Red</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Carlos Wayuu', 'Ana Arhuaca', 'Jorge Páez', 'Diana Inga'].map((name, index) => (
                          <div key={index} className="flex items-center p-3 bg-[#02416d]/30 rounded-xl border border-[#02416d]/50">
                            <div className="w-12 h-12 rounded-full bg-[#012c4d] flex items-center justify-center mr-4">
                              <div className="text-[#aedd2b]">
                                <FaUsers />
                              </div>
                            </div>
                            <div>
                              <h5 className="font-bold text-white">{name}</h5>
                              <p className="text-white/80 text-sm">Guardianes Culturales</p>
                            </div>
                            <button className="ml-auto bg-[#02416d] text-white px-3 py-1 rounded-full text-sm hover:bg-[#013258] transition-colors">
                              Contactar
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d]">
                    <h3 className="text-xl font-bold text-white mb-4">Proyectos Colaborativos</h3>
                    
                    <div className="space-y-4">
                      {[
                        { 
                          title: "Archivo Sonoro Ancestral", 
                          collaborators: 8, 
                          progress: 75,
                          description: "Digitalización de cantos tradicionales del Pacífico Colombiano"
                        },
                        { 
                          title: "Escuela Itinerante de Saberes", 
                          collaborators: 12, 
                          progress: 40,
                          description: "Talleres prácticos en comunidades rurales"
                        },
                        { 
                          title: "Memoria Viva: Tejidos", 
                          collaborators: 5, 
                          progress: 25,
                          description: "Documental interactivo sobre técnicas de tejido ancestral"
                        }
                      ].map((project, index) => (
                        <div key={index} className="p-4 bg-[#02416d]/30 rounded-xl border border-[#02416d]/50">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-white text-lg">{project.title}</h4>
                            <span className="bg-[#aedd2b] text-[#012c4d] px-3 py-1 rounded-full text-sm font-bold">
                              {project.progress}%
                            </span>
                          </div>
                          
                          <p className="text-white/80 mb-4">{project.description}</p>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-white/80 text-sm">
                              <FaUsers className="mr-2 text-[#aedd2b]" />
                              <span>{project.collaborators} colaboradores</span>
                            </div>
                            
                            <button className="bg-[#02416d] text-white px-3 py-1 rounded-full text-sm hover:bg-[#013258] transition-colors">
                              Gestionar Proyecto
                            </button>
                          </div>
                          
                          <div className="mt-3 h-2 bg-[#02416d] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#aedd2b] rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d] mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Eventos Culturales</h3>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Festival de Marimba", date: "15 Ago 2023", location: "Quibdó, Chocó" },
                        { title: "Encuentro de Tejedoras", date: "22 Ago 2023", location: "Medellín" },
                        { title: "Taller de Cantos Tradicionales", date: "5 Sep 2023", location: "Cali" },
                        { title: "Exposición Cultural del Pacífico", date: "18 Sep 2023", location: "Bogotá" }
                      ].map((event, index) => (
                        <div key={index} className="flex items-center p-3 bg-[#02416d]/30 rounded-xl border border-[#02416d]/50">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-12 h-12 rounded-lg bg-[#012c4d] flex flex-col items-center justify-center">
                              <div className="text-[#aedd2b] font-bold">15</div>
                              <div className="text-white/80 text-xs">AGO</div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h5 className="font-bold text-white">{event.title}</h5>
                            <p className="text-white/80 text-sm flex items-center mt-1">
                              <FaMapMarkerAlt className="mr-2" /> {event.location}
                            </p>
                          </div>
                          <button className="bg-[#02416d] text-white px-3 py-1 rounded-full text-sm hover:bg-[#013258] transition-colors">
                            Participar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#02416d]">
                    <h3 className="text-xl font-bold text-white mb-4">Reconocimientos</h3>
                    
                    <div className="space-y-4">
                      {[
                        { 
                          title: "Premio Nacional de Patrimonio", 
                          year: 2021,
                          description: "Por la preservación de tradiciones orales afrocolombianas"
                        },
                        { 
                          title: "Mención UNESCO", 
                          year: 2022,
                          description: "Por documental 'Cantos del Atrato'"
                        },
                        { 
                          title: "Medalla al Mérito Cultural", 
                          year: 2023,
                          description: "Gobernación del Chocó"
                        }
                      ].map((award, index) => (
                        <div key={index} className="p-4 bg-[#02416d]/30 rounded-xl border border-[#02416d]/50">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-white">{award.title}</h4>
                            <span className="text-[#aedd2b] font-bold">{award.year}</span>
                          </div>
                          <p className="text-white/80">{award.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardCreator;
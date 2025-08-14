'use client';

import { useState } from 'react';
import { 
  FaChartBar, FaUsers, FaPlay, FaTags, 
  FaFlag, FaCog, FaSearch, FaBell, 
  FaUserCircle, FaEdit, FaTrash, FaCheck, FaTimes,
  FaEye, FaUser, FaVideo, FaFolder, FaExclamationTriangle, FaCogs,
  FaPlus, FaDownload, FaFilter
} from 'react-icons/fa';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [contentFilter, setContentFilter] = useState('all');

  // Datos simulados
  const stats = {
    totalUsers: 1248,
    newUsers: 24,
    totalContent: 5421,
    pendingContent: 12,
    reports: 8,
    interactions: 1248000,
    topContent: "Documental: Cantos del Atrato",
    topCreator: "María Chocó",
    culturalGrowth: 92
  };

  const users = [
    { id: 1, name: "María Chocó", email: "maria@example.com", role: "creator", status: "active", joined: "2023-01-15", contentCount: 18 },
    { id: 2, name: "Carlos Wayuu", email: "carlos@example.com", role: "creator", status: "active", joined: "2023-02-20", contentCount: 12 },
    { id: 3, name: "Ana Arhuaca", email: "ana@example.com", role: "user", status: "active", joined: "2023-03-10", contentCount: 0 },
    { id: 4, name: "Jorge Páez", email: "jorge@example.com", role: "user", status: "suspended", joined: "2023-04-05", contentCount: 0 },
    { id: 5, name: "Diana Inga", email: "diana@example.com", role: "creator", status: "pending", joined: "2023-05-12", contentCount: 5 }
  ];

  const content = [
    { id: 1, title: "Documental: Cantos del Atrato", creator: "María Chocó", category: "documentary", status: "approved", views: 482000, uploadDate: "2023-06-15", culturalImpact: 92 },
    { id: 2, title: "Taller de Tejido Wounaan", creator: "María Chocó", category: "workshop", status: "approved", views: 315000, uploadDate: "2023-05-28", culturalImpact: 88 },
    { id: 3, title: "Ritual de Arraigo", creator: "Carlos Wayuu", category: "ritual", status: "pending", views: 198000, uploadDate: "2023-07-02", culturalImpact: 98 },
    { id: 4, title: "Entrevista con Sabedores", creator: "María Chocó", category: "interview", status: "approved", views: 153000, uploadDate: "2023-06-22", culturalImpact: 95 },
    { id: 5, title: "Cocina Tradicional del Pacífico", creator: "Diana Inga", category: "tutorial", status: "rejected", views: 98000, uploadDate: "2023-07-10", culturalImpact: 85 }
  ];

  const categories = [
    { id: 1, name: "Documental", count: 42, culturalImpact: 92 },
    { id: 2, name: "Taller", count: 28, culturalImpact: 88 },
    { id: 3, name: "Ritual", count: 15, culturalImpact: 98 },
    { id: 4, name: "Entrevista", count: 37, culturalImpact: 95 },
    { id: 5, name: "Música", count: 53, culturalImpact: 90 },
    { id: 6, name: "Artesanía", count: 22, culturalImpact: 87 }
  ];

  const reports = [
    { id: 1, contentTitle: "Ritual de Arraigo", reason: "Contenido inapropiado", reportedBy: "user124", status: "pending", date: "2023-07-05" },
    { id: 2, contentTitle: "Cantos Ancestrales", reason: "Derechos de autor", reportedBy: "user542", status: "resolved", date: "2023-06-28" },
    { id: 3, contentTitle: "Tejido Wounaan", reason: "Información incorrecta", reportedBy: "user789", status: "pending", date: "2023-07-10" }
  ];

  // Formateador de números
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Manejar selección de usuarios
  const toggleUserSelection = (id: number) => {
    setSelectedUsers(prev => 
      prev.includes(id) 
        ? prev.filter(userId => userId !== id) 
        : [...prev, id]
    );
  };

  // Manejar selección de todos los usuarios
  const toggleAllUsers = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
  };

  // Filtrar contenido según el estado seleccionado
  const filteredContent = contentFilter === 'all' 
    ? content 
    : content.filter(item => item.status === contentFilter);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#001a2d] to-[#002c4d] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-[#012c4d] to-[#001a2d] border-r border-[#02416d]">
        <div className="p-4 border-b border-[#02416d]">
          <h1 className="text-xl font-bold flex items-center">
            <div className="bg-[#aedd2b] w-8 h-8 rounded-lg flex items-center justify-center mr-2">
              <span className="text-[#012c4d] font-bold">CM</span>
            </div>
            ChocoMedia Admin
          </h1>
        </div>
        <nav className="p-4">
          <ul>
            {[
              { id: 'dashboard', icon: <FaChartBar />, label: 'Dashboard' },
              { id: 'users', icon: <FaUsers />, label: 'Usuarios' },
              { id: 'content', icon: <FaPlay />, label: 'Contenido' },
              { id: 'categories', icon: <FaTags />, label: 'Categorías' },
              { id: 'reports', icon: <FaFlag />, label: 'Reportes' },
              { id: 'settings', icon: <FaCog />, label: 'Configuración' }
            ].map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full flex items-center p-3 rounded-xl mb-2 transition-all ${
                    activeTab === item.id
                      ? 'bg-[#aedd2b] text-[#012c4d] shadow-lg'
                      : 'text-white/80 hover:bg-[#02416d] hover:text-white'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-gradient-to-r from-[#012c4d] to-[#001a2d] border-b border-[#02416d] p-4">
          <div className="flex justify-between items-center">
            <div className="relative w-1/3">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#013258] border border-[#02416d] focus:outline-none focus:ring-2 focus:ring-[#aedd2b] text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-white/60" />
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-white/80 hover:text-white transition-colors">
                <FaBell className="text-xl" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#aedd2b]"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#013258] border border-[#02416d] flex items-center justify-center">
                  <FaUserCircle className="text-[#aedd2b]" />
                </div>
                <span>Administrador</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 overflow-auto">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Panel de Control</h1>
              
              {/* Estadísticas rápidas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#012c4d]/80 backdrop-blur-sm p-6 rounded-2xl border border-[#02416d]">
                  <div className="flex items-center">
                    <div className="mr-4 p-3 rounded-xl bg-[#013258]">
                      <FaUser className="text-2xl text-[#aedd2b]" />
                    </div>
                    <div>
                      <h3 className="text-white/80">Usuarios Totales</h3>
                      <p className="text-2xl font-bold">{stats.totalUsers}</p>
                      <p className="text-[#aedd2b] flex items-center">
                        <span className="inline-block mr-1">+{stats.newUsers}</span> nuevos
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#012c4d]/80 backdrop-blur-sm p-6 rounded-2xl border border-[#02416d]">
                  <div className="flex items-center">
                    <div className="mr-4 p-3 rounded-xl bg-[#013258]">
                      <FaVideo className="text-2xl text-[#aedd2b]" />
                    </div>
                    <div>
                      <h3 className="text-white/80">Contenido Total</h3>
                      <p className="text-2xl font-bold">{stats.totalContent}</p>
                      <p className="text-[#ec407a] flex items-center">
                        <span className="inline-block mr-1">{stats.pendingContent}</span> pendientes
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#012c4d]/80 backdrop-blur-sm p-6 rounded-2xl border border-[#02416d]">
                  <div className="flex items-center">
                    <div className="mr-4 p-3 rounded-xl bg-[#013258]">
                      <FaFolder className="text-2xl text-[#aedd2b]" />
                    </div>
                    <div>
                      <h3 className="text-white/80">Interacciones</h3>
                      <p className="text-2xl font-bold">{formatNumber(stats.interactions)}</p>
                      <p className="text-[#42a5f5] flex items-center">
                        <span className="inline-block mr-1">+12%</span> este mes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Destacados */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#012c4d]/80 backdrop-blur-sm p-6 rounded-2xl border border-[#02416d]">
                  <h3 className="font-bold text-lg mb-4">Contenido Destacado</h3>
                  <div className="flex items-center p-4 bg-[#013258]/50 rounded-xl">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <div className="ml-4">
                      <div className="font-bold">{stats.topContent}</div>
                      <div className="text-[#aedd2b]">Por {stats.topCreator}</div>
                      <div className="text-white/80 mt-1">482K visualizaciones · Impacto cultural: 92%</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#012c4d]/80 backdrop-blur-sm p-6 rounded-2xl border border-[#02416d]">
                  <h3 className="font-bold text-lg mb-4">Crecimiento Cultural</h3>
                  <div className="flex items-center">
                    <div className="text-4xl font-bold text-[#aedd2b]">{stats.culturalGrowth}%</div>
                    <div className="ml-4">
                      <div>Impacto cultural promedio</div>
                      <div className="flex items-center text-[#42a5f5] mt-1">
                        <span className="mr-1">+14%</span> en los últimos 6 meses
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 h-4 bg-[#013258] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#aedd2b] to-[#8bb422] rounded-full" 
                      style={{ width: `${stats.culturalGrowth}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Actividad reciente */}
              <div className="bg-[#012c4d]/80 backdrop-blur-sm p-6 rounded-2xl border border-[#02416d]">
                <h3 className="font-bold text-lg mb-4">Actividad Reciente</h3>
                <div className="space-y-3">
                  {[
                    { action: "Nuevo usuario registrado", user: "Diana Inga", time: "Hace 2 horas" },
                    { action: "Contenido aprobado", content: "Ritual de Arraigo", time: "Hace 5 horas" },
                    { action: "Reporte resuelto", content: "Cantos Ancestrales", time: "Ayer" },
                    { action: "Usuario suspendido", user: "Jorge Páez", time: "Ayer" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-[#013258]/30 rounded-xl border border-[#02416d]/50">
                      <div className="bg-[#013258] p-2 rounded-lg mr-4">
                        <FaUserCircle className="text-[#aedd2b]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.action}</div>
                        <div className="text-white/70 text-sm">
                          {item.user && `Usuario: ${item.user}`}
                          {item.content && `Contenido: ${item.content}`}
                        </div>
                      </div>
                      <div className="text-white/50 text-sm">{item.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Usuarios */}
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
                <div className="flex space-x-3">
                  <button className="bg-[#013258] hover:bg-[#02416d] px-4 py-2 rounded-xl flex items-center transition-colors">
                    <FaDownload className="mr-2" /> Exportar
                  </button>
                  <button className="bg-[#aedd2b] text-[#012c4d] px-4 py-2 rounded-xl flex items-center hover:bg-[#9bc926] transition-colors font-bold">
                    <FaPlus className="mr-2" /> Nuevo Usuario
                  </button>
                </div>
              </div>
              
              <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl border border-[#02416d] overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b border-[#02416d]">
                  <div className="relative w-1/2">
                    <input
                      type="text"
                      placeholder="Buscar usuarios..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#013258] border border-[#02416d] focus:outline-none focus:ring-2 focus:ring-[#aedd2b] text-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-white/60" />
                  </div>
                  <select className="bg-[#013258] border border-[#02416d] text-white px-4 py-2 rounded-xl">
                    <option>Todos los roles</option>
                    <option>Creador</option>
                    <option>Usuario</option>
                  </select>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#013258]">
                      <tr>
                        <th className="px-6 py-4 text-left">
                          <input
                            type="checkbox"
                            checked={selectedUsers.length === users.length && users.length > 0}
                            onChange={toggleAllUsers}
                            className="rounded text-[#aedd2b] focus:ring-[#aedd2b]"
                          />
                        </th>
                        <th className="px-6 py-4 text-left">Usuario</th>
                        <th className="px-6 py-4 text-left">Rol</th>
                        <th className="px-6 py-4 text-left">Estado</th>
                        <th className="px-6 py-4 text-left">Contenido</th>
                        <th className="px-6 py-4 text-left">Registro</th>
                        <th className="px-6 py-4 text-left">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#02416d]">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-[#013258]/30">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => toggleUserSelection(user.id)}
                              className="rounded text-[#aedd2b] focus:ring-[#aedd2b]"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10" />
                              <div className="ml-4">
                                <div className="font-medium">{user.name}</div>
                                <div className="text-white/70 text-sm">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 capitalize">{user.role}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.status === 'active' 
                                ? 'bg-green-500/20 text-green-400'
                                : user.status === 'suspended'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {user.status === 'active' ? 'Activo' : user.status === 'suspended' ? 'Suspendido' : 'Pendiente'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {user.role === 'creator' ? (
                              <div className="flex items-center">
                                <span className="text-[#aedd2b] mr-2">{user.contentCount}</span>
                                <span>contenidos</span>
                              </div>
                            ) : '-'}
                          </td>
                          <td className="px-6 py-4 text-white/70">
                            {new Date(user.joined).toLocaleDateString('es-ES', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-400 hover:text-blue-300 p-2">
                                <FaEye />
                              </button>
                              <button className="text-yellow-400 hover:text-yellow-300 p-2">
                                <FaEdit />
                              </button>
                              <button className="text-red-400 hover:text-red-300 p-2">
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Contenido */}
          {activeTab === 'content' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestión de Contenido</h1>
                <button className="bg-[#aedd2b] text-[#012c4d] px-4 py-2 rounded-xl flex items-center hover:bg-[#9bc926] transition-colors font-bold">
                  <FaPlus className="mr-2" /> Nuevo Contenido
                </button>
              </div>
              
              <div className="mb-4 flex space-x-3">
                <button 
                  className={`px-4 py-2 rounded-xl ${contentFilter === 'all' ? 'bg-[#aedd2b] text-[#012c4d]' : 'bg-[#013258] hover:bg-[#02416d]'}`}
                  onClick={() => setContentFilter('all')}
                >
                  Todos
                </button>
                <button 
                  className={`px-4 py-2 rounded-xl ${contentFilter === 'pending' ? 'bg-[#aedd2b] text-[#012c4d]' : 'bg-[#013258] hover:bg-[#02416d]'}`}
                  onClick={() => setContentFilter('pending')}
                >
                  Pendientes
                </button>
                <button 
                  className={`px-4 py-2 rounded-xl ${contentFilter === 'approved' ? 'bg-[#aedd2b] text-[#012c4d]' : 'bg-[#013258] hover:bg-[#02416d]'}`}
                  onClick={() => setContentFilter('approved')}
                >
                  Aprobados
                </button>
                <button 
                  className={`px-4 py-2 rounded-xl ${contentFilter === 'rejected' ? 'bg-[#aedd2b] text-[#012c4d]' : 'bg-[#013258] hover:bg-[#02416d]'}`}
                  onClick={() => setContentFilter('rejected')}
                >
                  Rechazados
                </button>
              </div>
              
              <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl border border-[#02416d] overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b border-[#02416d]">
                  <div className="relative w-1/2">
                    <input
                      type="text"
                      placeholder="Buscar contenido..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#013258] border border-[#02416d] focus:outline-none focus:ring-2 focus:ring-[#aedd2b] text-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-white/60" />
                  </div>
                  <div className="flex space-x-2">
                    <select className="bg-[#013258] border border-[#02416d] text-white px-4 py-2 rounded-xl">
                      <option>Ordenar por</option>
                      <option>Más reciente</option>
                      <option>Más visto</option>
                      <option>Mayor impacto</option>
                    </select>
                    <button className="bg-[#013258] border border-[#02416d] text-white px-4 py-2 rounded-xl flex items-center">
                      <FaFilter className="mr-2" /> Filtros
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#013258]">
                      <tr>
                        <th className="px-6 py-4 text-left">Título</th>
                        <th className="px-6 py-4 text-left">Creador</th>
                        <th className="px-6 py-4 text-left">Categoría</th>
                        <th className="px-6 py-4 text-left">Visualizaciones</th>
                        <th className="px-6 py-4 text-left">Impacto</th>
                        <th className="px-6 py-4 text-left">Estado</th>
                        <th className="px-6 py-4 text-left">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#02416d]">
                      {filteredContent.map((item) => (
                        <tr key={item.id} className="hover:bg-[#013258]/30">
                          <td className="px-6 py-4">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-white/70 text-sm">
                              {new Date(item.uploadDate).toLocaleDateString('es-ES', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4">{item.creator}</td>
                          <td className="px-6 py-4 capitalize">{item.category}</td>
                          <td className="px-6 py-4">{formatNumber(item.views)}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <span className="text-[#aedd2b] mr-2">{item.culturalImpact}%</span>
                              <div className="w-16 h-2 bg-[#013258] rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#aedd2b] to-[#8bb422] rounded-full" 
                                  style={{ width: `${item.culturalImpact}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              item.status === 'approved' 
                                ? 'bg-green-500/20 text-green-400'
                                : item.status === 'pending'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {item.status === 'approved' ? 'Aprobado' : item.status === 'pending' ? 'Pendiente' : 'Rechazado'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-400 hover:text-blue-300 p-2">
                                <FaEye />
                              </button>
                              <button className="text-yellow-400 hover:text-yellow-300 p-2">
                                <FaEdit />
                              </button>
                              {item.status === 'pending' && (
                                <>
                                  <button className="text-green-400 hover:text-green-300 p-2">
                                    <FaCheck />
                                  </button>
                                  <button className="text-red-400 hover:text-red-300 p-2">
                                    <FaTimes />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Categorías */}
          {activeTab === 'categories' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Categorías y Etiquetas</h1>
                <button className="bg-[#aedd2b] text-[#012c4d] px-4 py-2 rounded-xl flex items-center hover:bg-[#9bc926] transition-colors font-bold">
                  <FaPlus className="mr-2" /> Nueva Categoría
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {categories.map((category) => (
                  <div key={category.id} className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl border border-[#02416d] p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{category.name}</h3>
                      <div className="flex items-center mt-2">
                        <span className="text-white/70 mr-3">{category.count} contenidos</span>
                        <div className="flex items-center">
                          <span className="text-[#aedd2b] mr-1">{category.culturalImpact}%</span>
                          <div className="w-12 h-2 bg-[#013258] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#aedd2b] to-[#8bb422] rounded-full" 
                              style={{ width: `${category.culturalImpact}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-yellow-400 hover:text-yellow-300 p-2">
                        <FaEdit />
                      </button>
                      <button className="text-red-400 hover:text-red-300 p-2">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl border border-[#02416d] p-6">
                <h3 className="font-bold text-lg mb-4">Añadir Nueva Categoría</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 mb-2">Nombre de la categoría</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-xl bg-[#013258] border border-[#02416d] focus:outline-none focus:ring-2 focus:ring-[#aedd2b] text-white"
                      placeholder="Ej: Danzas tradicionales"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2">Descripción</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-xl bg-[#013258] border border-[#02416d] focus:outline-none focus:ring-2 focus:ring-[#aedd2b] text-white"
                      placeholder="Breve descripción de la categoría"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button className="bg-[#aedd2b] text-[#012c4d] px-6 py-3 rounded-xl font-bold hover:bg-[#9bc926] transition-colors">
                    Guardar Categoría
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reportes */}
          {activeTab === 'reports' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Reportes de Usuarios</h1>
              
              <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl border border-[#02416d] overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b border-[#02416d]">
                  <div className="relative w-1/2">
                    <input
                      type="text"
                      placeholder="Buscar reportes..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#013258] border border-[#02416d] focus:outline-none focus:ring-2 focus:ring-[#aedd2b] text-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-white/60" />
                  </div>
                  <select className="bg-[#013258] border border-[#02416d] text-white px-4 py-2 rounded-xl">
                    <option>Todos los estados</option>
                    <option>Pendientes</option>
                    <option>Resueltos</option>
                  </select>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#013258]">
                      <tr>
                        <th className="px-6 py-4 text-left">Contenido</th>
                        <th className="px-6 py-4 text-left">Razón</th>
                        <th className="px-6 py-4 text-left">Reportado por</th>
                        <th className="px-6 py-4 text-left">Fecha</th>
                        <th className="px-6 py-4 text-left">Estado</th>
                        <th className="px-6 py-4 text-left">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#02416d]">
                      {reports.map((report) => (
                        <tr key={report.id} className="hover:bg-[#013258]/30">
                          <td className="px-6 py-4 font-medium">{report.contentTitle}</td>
                          <td className="px-6 py-4">{report.reason}</td>
                          <td className="px-6 py-4">{report.reportedBy}</td>
                          <td className="px-6 py-4 text-white/70">
                            {new Date(report.date).toLocaleDateString('es-ES', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              report.status === 'pending' 
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-green-500/20 text-green-400'
                            }`}>
                              {report.status === 'pending' ? 'Pendiente' : 'Resuelto'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-400 hover:text-blue-300 p-2">
                                <FaEye />
                              </button>
                              <button className="text-green-400 hover:text-green-300 p-2">
                                <FaCheck />
                              </button>
                              <button className="text-red-400 hover:text-red-300 p-2">
                                <FaTimes />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Configuración */}
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Configuración del Sitio</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl border border-[#02416d] p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <FaCogs className="mr-2" /> Configuración General
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 mb-2">Nombre del Sitio</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 rounded-xl bg-[#013258] border border-[#02416d] focus:outline-none focus:ring-2 focus:ring-[#aedd2b] text-white"
                        defaultValue="ChocoMedia"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/80 mb-2">Dominio</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 rounded-xl bg-[#013258] border border-[#02416d] focus:outline-none focus:ring-2 focus:ring-[#aedd2b] text-white"
                        defaultValue="chocomedia.org"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-white/80 mb-2">Descripción</label>
                      <textarea 
                        className="w-full px-4 py-2 rounded-xl bg-[#013258] border border-[#02416d] focus:outline-none focus:ring-2 focus:ring-[#aedd2b] text-white"
                        rows={3}
                        defaultValue="Plataforma para la preservación y difusión de culturas ancestrales"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/80 mb-2">Logotipo</label>
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <button className="ml-4 bg-[#013258] hover:bg-[#02416d] px-4 py-2 rounded-xl">
                          Cambiar
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white/80 mb-2">Favicon</label>
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                        <button className="ml-4 bg-[#013258] hover:bg-[#02416d] px-4 py-2 rounded-xl">
                          Cambiar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#012c4d]/80 backdrop-blur-sm rounded-2xl border border-[#02416d] p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <FaUser className="mr-2" /> Configuración de Usuarios
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 mb-2">Permitir nuevos registros</label>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#aedd2b]"></div>
                        <span className="ml-3">Sí, permitir registros</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-white/80 mb-2">Rol predeterminado</label>
                      <select className="w-full px-4 py-2 rounded-xl bg-[#013258] border border-[#02416d] focus:outline-none focus:ring-2 focus:ring-[#aedd2b] text-white">
                        <option>Usuario</option>
                        <option>Creador</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-white/80 mb-2">Moderación de contenido</label>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#aedd2b]"></div>
                        <span className="ml-3">Revisión previa a publicación</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-white/80 mb-2">Notificaciones</label>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#aedd2b]"></div>
                        <span className="ml-3">Recibir alertas importantes</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="bg-[#aedd2b] text-[#012c4d] px-6 py-3 rounded-xl font-bold hover:bg-[#9bc926] transition-colors">
                  Guardar Cambios
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
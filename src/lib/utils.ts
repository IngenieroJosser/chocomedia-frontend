import { ContentItem, Creator } from "./type";

// Configuración por tipo de contenido
export const categoryConfig = {
  video: {
    icon: '🎬',
    label: 'Video',
    defaultColor: '#02416d'
  },
  podcast: {
    icon: '🎙️',
    label: 'Podcast',
    defaultColor: '#9bc926'
  },
  documentary: {
    icon: '🎞️',
    label: 'Documental',
    defaultColor: '#012c4d'
  }
};

export const sampleContent: ContentItem[] = [
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
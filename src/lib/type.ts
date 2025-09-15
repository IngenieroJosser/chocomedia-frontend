export type ContentType = 'video' | 'podcast' | 'documentary';

export interface ThumbnailProps {
  title: string;
  creator: string;
  views: number;
  duration: string;
  category: ContentType;
  thumbnailUrl?: string;
  accentColor?: string;
  onClick?: () => void;
  className?: string;
}

export interface ContentItem {
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

// Definir tipos para la estructura del creador
export interface CulturalLineage {
  generation: string;
  name: string;
  role: string;
}

export interface Creator {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  location: string;
  followers: string;
  culturalImpact: number;
  traditions: string[];
  communities: string[];
  collaborations: string[];
  culturalLineage: CulturalLineage[];
  profileImage: string;
}

export interface CreatorRegisterFormData {
  name: string;
  email: string;
  password: string;
  artisticName: string;
  culturalDomain: string;
}

// Datos de ejemplo para platos tradicionales
export const traditionalDishes = [
  { 
    id: 1, 
    name: "Mole Poblano", 
    description: "Pollo bañado en salsa de chocolate, chiles y especias", 
    ingredients: ["Chocolate", "Chiles", "Ajonjolí", "Pollo"],
    region: "Puebla",
    spiceLevel: 3
  },
  { 
    id: 2, 
    name: "Cochinita Pibil", 
    description: "Cerdo marinado en achiote y jugo de naranja agria", 
    ingredients: ["Cerdo", "Achiote", "Naranja agria", "Hojas de plátano"],
    region: "Yucatán",
    spiceLevel: 2
  },
  { 
    id: 3, 
    name: "Chiles en Nogada", 
    description: "Chiles rellenos cubiertos con salsa de nuez y granada", 
    ingredients: ["Chile poblano", "Carne picada", "Nuez", "Granada"],
    region: "Puebla",
    spiceLevel: 1
  },
  { 
    id: 4, 
    name: "Pozole", 
    description: "Sopa de maíz cacahuazintle con carne y guarniciones", 
    ingredients: ["Maíz cacahuazintle", "Cerdo", "Rábano", "Lechuga"],
    region: "Jalisco",
    spiceLevel: 3
  }
];

// Eventos de ejemplo
export const events = [
  {
    id: 1,
    title: "Festival de Música Tradicional",
    date: "15 Oct 2023",
    time: "18:00 - 22:00",
    location: "Plaza Central, Ciudad de México",
    category: "music",
    price: "Gratis",
    featured: true,
    description: "Una noche mágica con los mejores exponentes de la música tradicional mexicana. Conciertos, talleres y experiencias culturales.",
    tags: ["En vivo", "Familiar", "Al aire libre"]
  },
  {
    id: 2,
    title: "Exposición: Arte Ancestral Indígena",
    date: "20 Oct - 15 Nov 2023",
    time: "10:00 - 20:00",
    location: "Museo Nacional de Culturas",
    category: "art",
    price: "$120 - $250",
    featured: true,
    description: "Recorrido por 500 años de arte indígena. Piezas nunca antes exhibidas de culturas prehispánicas.",
    tags: ["Exposición", "Historia", "Educativo"]
  },
  {
    id: 3,
    title: "Taller de Cocina Prehispánica",
    date: "22 Oct 2023",
    time: "11:00 - 14:00",
    location: "Escuela de Gastronomía Tradicional",
    category: "gastronomy",
    price: "$350",
    featured: false,
    description: "Aprende a preparar platillos ancestrales con ingredientes autóctonos. Incluye degustación y recetario.",
    tags: ["Taller", "Degustación", "Interactivo"]
  },
  {
    id: 4,
    title: "Ciclo de Cine Indígena Contemporáneo",
    date: "25-28 Oct 2023",
    time: "16:00 - 21:00",
    location: "Cineteca Nacional",
    category: "cinema",
    price: "$80 por función",
    featured: false,
    description: "Proyecciones de películas dirigidas por cineastas indígenas. Charlas con directores al final de cada proyección.",
    tags: ["Cine", "Charlas", "Cultural"]
  },
  {
    id: 5,
    title: "Obra Teatral: La Leyenda del Quinto Sol",
    date: "28 Oct 2023",
    time: "19:00 - 21:00",
    location: "Teatro de la Ciudad",
    category: "theater",
    price: "$200 - $400",
    featured: false,
    description: "Espectáculo multidisciplinario que combina danza, teatro y proyecciones para contar la creación del mundo según la cosmovisión náhuatl.",
    tags: ["Teatro", "Danza", "Multidisciplinario"]
  },
  {
    id: 6,
    title: "Noche de Poesía en Lenguas Originarias",
    date: "30 Oct 2023",
    time: "20:00 - 22:00",
    location: "Casa de la Literatura",
    category: "literature",
    price: "Gratis",
    featured: true,
    description: "Recital bilingüe con poetas contemporáneos que escriben en sus lenguas maternas. Traducciones simultáneas disponibles.",
    tags: ["Literatura", "Poesía", "En vivo"]
  },
];

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
  details?: any;
}
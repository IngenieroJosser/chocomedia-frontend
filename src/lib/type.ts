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

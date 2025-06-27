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
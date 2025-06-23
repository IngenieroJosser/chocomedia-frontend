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
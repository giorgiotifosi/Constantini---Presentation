
export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  imageUrls: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

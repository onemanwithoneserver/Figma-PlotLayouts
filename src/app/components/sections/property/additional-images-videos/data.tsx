export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  label: string;
}

export const GALLERY_ITEMS: MediaItem[] = [
  { id: 'g1', type: 'image', src: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=600&h=400&fit=crop', alt: 'Project entrance', label: 'Entrance' },
  { id: 'g2', type: 'image', src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop', alt: 'Aerial layout view', label: 'Aerial View' },
  { id: 'g3', type: 'video', src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop', alt: 'Clubhouse walkthrough', label: 'Clubhouse' },
  { id: 'g4', type: 'image', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', alt: 'Internal roads', label: 'Roads' },
  { id: 'g5', type: 'image', src: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=600&h=400&fit=crop', alt: 'Plot boundary', label: 'Plot View' },
  { id: 'g6', type: 'video', src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop', alt: 'Site progress', label: 'Progress' },
];

export const galleryAskSellerQuestions: string[] = [
  'Can I get a virtual or live video walkthrough of the project?',
  'Are the gallery images recent and representative of the current state?',
  'Are there more photos of the plot boundaries available?',
  'Can the site visit be scheduled on a weekend?',
  'Is drone footage of the full layout available?',
];

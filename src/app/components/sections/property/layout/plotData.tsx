export interface LayoutImage {
  src: string;
  label: string;
}

export interface PlotSize {
  size: string;
  sqYd: number;
  pricePerSqYd: number;
}

export const layoutImages: LayoutImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&h=500&fit=crop',
    label: 'Master Layout Plan',
  },
  {
    src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop',
    label: 'Phase 1 Plot Grid',
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    label: 'Internal Road Network',
  },
];

export const plotSizes: PlotSize[] = [
  { size: '100 Sq.Yd', sqYd: 100, pricePerSqYd: 18000 },
  { size: '150 Sq.Yd', sqYd: 150, pricePerSqYd: 17500 },
  { size: '200 Sq.Yd', sqYd: 200, pricePerSqYd: 16800 },
  { size: '240 Sq.Yd', sqYd: 240, pricePerSqYd: 16000 },
];

export const layoutAskSellerQuestions: string[] = [
  'What is the exact plot demarcation process after booking?',
  'Is the layout HMDA / DTCP approved?',
  'Are corner plots available at the quoted price?',
  'What is the estimated registration timeline?',
  'Is the road-facing plot available in 100 Sq.Yd size?',
];

export interface AmenityTab {
  id: string;
  label: string;
  imageUrl: string;
  items: string[];
}

export const AMENITY_TABS: AmenityTab[] = [
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    items: [
      'Grand Entrance Arch with Security Cabin',
      '30ft & 20ft Wide BT Roads',
      'Underground Electrical Lines',
      'Underground Water Supply Lines',
      'Underground Drainage / Sewage',
      'Street Lights on All Roads',
    ],
  },
  {
    id: 'green',
    label: 'Green Spaces',
    imageUrl: 'https://images.unsplash.com/photo-1584483785640-10901e16f734?auto=format&fit=crop&w=800&q=80',
    items: [
      '15% Open Green Area',
      'Central Park (1 Acre)',
      'Avenue Trees Along Roads',
      "Children's Play Area",
      'Walking / Jogging Track',
      'Landscaped Gardens',
    ],
  },
  {
    id: 'clubhouse',
    label: 'Clubhouse',
    imageUrl: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5d1?auto=format&fit=crop&w=800&q=80',
    items: [
      '2,400 Sq.Ft Clubhouse',
      'Indoor Games Room',
      'Community Hall',
      'Outdoor Seating Lounge',
      'Gym & Fitness Zone',
      'Multi-Purpose Courts',
    ],
  },
  {
    id: 'security',
    label: 'Security',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    items: [
      '6ft RCC Compound Wall',
      'CCTV Surveillance at Entry/Exit',
      '24/7 Security Guard',
      'Access-Controlled Main Gate',
      'Visitor Management System',
    ],
  },
];

export const amenitiesAskSellerQuestions: string[] = [
  'Are all amenities ready and operational?',
  'Is the clubhouse open for residents currently?',
  'Is there a separate swimming pool for kids and adults?',
  'Are gym and wellness facilities included in maintenance?',
  'What are the operating hours for amenities?',
];

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SectionTabNav from '../shared/SectionTabNav';
import AskSeller from '../shared/AskSeller';

interface AmenityTab {
  id: string;
  label: string;
  imageUrl: string;
  items: string[];
}

const AMENITY_TABS: AmenityTab[] = [
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

const AmenitiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(AMENITY_TABS[0].id);
  const current = AMENITY_TABS.find((t) => t.id === activeTab)!;

  return (
    <div>
      <SectionTabNav
        tabs={AMENITY_TABS.map(({ id, label }) => ({ id, label }))}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        layoutId="amenity-active-pill"
      />

      <div className="px-4 py-4 flex flex-col gap-4">
        <div className="w-full h-48 sm:h-64 rounded-md overflow-hidden bg-neutral-100">
          <img
            src={current.imageUrl}
            alt={current.label}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-2">
          {current.items.map((item) => (
            <div key={item} className="flex items-start gap-2.5">
              <CheckCircleOutlineIcon sx={{ fontSize: 16, color: '#1F7A63', mt: 0.25, flexShrink: 0 }} />
              <Typography sx={{ fontSize: '0.8125rem', fontWeight: 500, color: '#1A1A1A', lineHeight: 1.4 }}>
                {item}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      <AskSeller
        initialQuestions={[
          'Are all amenities ready and operational?',
          'Is the clubhouse open for residents currently?',
          'Is there a separate swimming pool for kids and adults?',
          'Are gym and wellness facilities included in maintenance?',
          'What are the operating hours for amenities?',
        ]}
      />
    </div>
  );
};

export default AmenitiesSection;
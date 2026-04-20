import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface AmenityTab {
  id: string;
  label: string;
  items: string[];
}

const AMENITY_TABS: AmenityTab[] = [
  {
    id: 'infrastructure',
    label: 'Infrastructure',
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
    items: [
      '6ft RCC Compound Wall',
      'CCTV Surveillance at Entry/Exit',
      '24ÃƒÆ’Ã¢â‚¬â€7 Security Guard',
      'Access-Controlled Main Gate',
      'Visitor Management System',
    ],
  },
];

const AmenitiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const current = AMENITY_TABS[activeTab];

  return (
    <div>
      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        variant="scrollable"
        scrollButtons={false}
        sx={{ px: 2, minHeight: 40, borderBottom: '1px solid #E0E0E0' }}
      >
        {AMENITY_TABS.map((t, i) => (
          <Tab
            key={t.id}
            label={t.label}
            sx={{
              minHeight: 40,
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: activeTab === i ? '#1F7A63' : '#666666',
              px: 1.5,
              minWidth: 'auto',
            }}
          />
        ))}
      </Tabs>

      <div className="px-4 py-3 flex flex-col gap-2">
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
  );
};

export default AmenitiesSection;
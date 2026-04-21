import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import SectionTabNav from '../shared/SectionTabNav';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import TrainOutlinedIcon from '@mui/icons-material/TrainOutlined';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';

interface DistanceItem {
  name: string;
  distance: string;
  time: string;
  category: string;
}

const ALL_DISTANCES: DistanceItem[] = [
  { name: 'ORR Junction (Exit 12)', distance: '4.5 km', time: '8 min', category: 'highway' },
  { name: 'NH-163 Hyderabad', distance: '2 km', time: '4 min', category: 'highway' },
  { name: 'RRR (Shankarpally)', distance: '18 km', time: '22 min', category: 'highway' },
  { name: 'Shankarpally Railway', distance: '6 km', time: '12 min', category: 'transit' },
  { name: 'TSRTC Bus Stop', distance: '1.2 km', time: '3 min', category: 'transit' },
  { name: 'Gachibowli (Proposed Metro)', distance: '24 km', time: '35 min', category: 'transit' },
  { name: 'Oakridge International School', distance: '3.2 km', time: '7 min', category: 'school' },
  { name: 'Chevella Govt. School', distance: '1.5 km', time: '4 min', category: 'school' },
  { name: 'IIT Hyderabad', distance: '8 km', time: '15 min', category: 'school' },
  { name: 'Continental Hospital', distance: '22 km', time: '28 min', category: 'hospital' },
  { name: 'Chevella PHC', distance: '2 km', time: '5 min', category: 'hospital' },
  { name: 'Satyabama Hospital', distance: '5 km', time: '10 min', category: 'hospital' },
  { name: 'D-Mart Chandanagar', distance: '18 km', time: '25 min', category: 'market' },
  { name: 'Chevella Local Market', distance: '1.8 km', time: '5 min', category: 'market' },
  { name: 'Inorbit Mall', distance: '26 km', time: '38 min', category: 'market' },
  { name: 'Nehru Zoological Park', distance: '35 km', time: '48 min', category: 'leisure' },
  { name: 'KBR Park Hyderabad', distance: '28 km', time: '40 min', category: 'leisure' },
];

const TABS = [
  { id: 'all', label: 'All', icon: <DirectionsCarOutlinedIcon sx={{ fontSize: 16 }} /> },
  { id: 'highway', label: 'Highway', icon: <DirectionsCarOutlinedIcon sx={{ fontSize: 16 }} /> },
  { id: 'transit', label: 'Transit', icon: <TrainOutlinedIcon sx={{ fontSize: 16 }} /> },
  { id: 'school', label: 'Schools', icon: <SchoolOutlinedIcon sx={{ fontSize: 16 }} /> },
  { id: 'hospital', label: 'Hospital', icon: <LocalHospitalOutlinedIcon sx={{ fontSize: 16 }} /> },
  { id: 'market', label: 'Shopping', icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 16 }} /> },
  { id: 'leisure', label: 'Leisure', icon: <ParkOutlinedIcon sx={{ fontSize: 16 }} /> },
];

const MAX_DIST_KM = 40;

export default function InteractiveCommute() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? ALL_DISTANCES
    : ALL_DISTANCES.filter((d) => d.category === activeTab);

  const parseKm = (dist: string) => parseFloat(dist.replace(' km', ''));

  return (
    <div className="pb-2">
      <SectionTabNav
        tabs={TABS.map(({ id, label }) => ({ id, label }))}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        layoutId="location-active-pill"
      />

      <Divider />

      {/* Distance list */}
      <div className="flex flex-col divide-y divide-[#F0F0F0]">
        {filtered.map((item, i) => {
          const km = parseKm(item.distance);
          const pct = Math.min((km / MAX_DIST_KM) * 100, 100);
          return (
            <div key={i} className="px-4 py-2.5 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1A1A1A' }}>
                  {item.name}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#1F7A63', flexShrink: 0, ml: 1 }}>
                  {item.distance}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-[#E0E0E0] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#1F7A63]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <Typography sx={{ fontSize: '0.6875rem', color: '#9E9E9E', flexShrink: 0 }}>
                  {item.time} drive
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

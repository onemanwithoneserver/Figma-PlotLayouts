import React from 'react';
import Typography from '@mui/material/Typography';

interface HighlightItem {
  title: string;
  description: string;
}

const highlightsData: HighlightItem[] = [
  { title: 'HMDA Approved Layout', description: 'Fully approved by HMDA with Final LP received — safe, legal investment.' },
  { title: '30ft & 20ft BT Roads', description: 'Wide internal roads with black-top finish for smooth vehicle access.' },
  { title: 'Underground Utilities', description: 'Electricity, water, and sewage lines laid underground — clutter-free streets.' },
  { title: '15% Open Green Spaces', description: 'Parks, walking paths, and open zones covering 15% of total layout area.' },
  { title: 'Bank Loan Available', description: 'Pre-approved loans from SBI, HDFC, and Axis Bank for easy financing.' },
  { title: 'Low Density — Only 312 Plots', description: 'Spacious layout with just 312 plots on 12 acres — exclusive community.' },
];

const Highlights: React.FC = () => {
  return (
    <ul className="p-4 flex flex-col gap-3 m-0 list-none">
      {highlightsData.map((item, i) => (
        <li
          key={item.title}
          className="flex items-stretch rounded-md border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="w-12 flex-shrink-0 flex items-center justify-center bg-gray-50 border-r border-gray-200 border-l-[3px] border-l-[#1F7A63]">
            <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#1F7A63' }}>
              {String(i + 1).padStart(2, '0')}
            </Typography>
          </div>

          <div className="flex-1 px-4 py-3 flex flex-col justify-center gap-1">
            <div className="flex items-center">
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A1A' }}>
                {item.title}
              </Typography>
            </div>
            
            <Typography sx={{ fontSize: '0.75rem', color: '#666666', lineHeight: 1.5 }}>
              {item.description}
            </Typography>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Highlights;
import React from 'react';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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
    <div className="p-4 flex flex-col gap-2">
      {highlightsData.map((item, i) => (
        <div
          key={i}
          className="flex items-stretch rounded-[4px] border border-[#E0E0E0] bg-white overflow-hidden"
        >
          {/* Left accent bar + number */}
          <div className="w-11 flex-shrink-0 flex items-center justify-center bg-[#F5F5F5] border-r border-[#E0E0E0] relative">
            <div className="absolute inset-y-0 left-0 w-[3px] bg-[#1F7A63]" />
            <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#1F7A63' }}>
              {String(i + 1).padStart(2, '0')}
            </Typography>
          </div>

          {/* Content */}
          <div className="flex-1 px-3 py-2.5 flex flex-col justify-center gap-0.5">
            <div className="flex items-center gap-1.5">
              <CheckCircleOutlineIcon sx={{ fontSize: 14, color: '#1F7A63', flexShrink: 0 }} />
              <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1A1A1A' }}>
                {item.title}
              </Typography>
            </div>
            <Typography sx={{ fontSize: '0.75rem', color: '#666666', lineHeight: 1.4, pl: '22px' }}>
              {item.description}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Highlights;

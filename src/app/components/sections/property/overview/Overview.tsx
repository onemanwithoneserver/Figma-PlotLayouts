import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// PNG icons
import skyscrapperIcon from '../images/popup-images/skyscrapper.png';
import propertyIcon from '../images/popup-images/property.png';
import approvalsIcon from '../images/popup-images/Approvals.png';
import unitFacingIcon from '../images/popup-images/UnitFacing.png';
import blueprint1Icon from '../images/popup-images/blueprint1.png';
import locationIcon from '../images/popup-images/location.png';
import blueprintIcon from '../images/popup-images/blueprint.png';
import researchIcon from '../images/popup-images/research.png';
import overpopulationIcon from '../images/popup-images/overpopulation.png';
import clubhouseIcon from '../images/popup-images/ClubhouseArea.png';
import orr1Icon from '../images/popup-images/orr1.png';
import rrr1Icon from '../images/popup-images/rrr1.png';
import highway1Icon from '../images/popup-images/highway1.png';
import ocIcon from '../images/popup-images/oc.png';
import stackIcon from '../images/popup-images/stack.png';
import roadsWidthIcon from '../images/popup-images/Roads_Width.png';
import loan1Icon from '../images/popup-images/loan1.png';

interface OverviewItem {
  icon: string;
  label: string;
  value: string;
}

const OverviewTile: React.FC<{ item: OverviewItem }> = ({ item }) => (
  <div className="flex flex-col items-center text-center py-3 px-2 rounded-[4px] bg-[#F5F5F5] border border-[#E0E0E0]">
    <img
      src={item.icon}
      alt={item.label}
      className="w-6 h-6 mb-1.5 object-contain"
    />
    <Typography
      sx={{
        fontSize: '0.625rem',
        fontWeight: 600,
        color: '#666666',
        textTransform: '',
        letterSpacing: '0.04em',
        lineHeight: 1.2,
        mb: 0.5,
      }}
    >
      {item.label}
    </Typography>
    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3 }}>
      {item.value}
    </Typography>
  </div>
);

const Overview: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const allData: OverviewItem[] = [
    { icon: propertyIcon,       label: 'Inventory Type', value: 'Open Plots' },
    { icon: approvalsIcon,      label: 'Approvals',      value: 'HMDA / LPA' },
    { icon: locationIcon,       label: 'Mandal',         value: 'Chevella' },
    { icon: locationIcon,       label: 'District',       value: 'Rangareddy' },
    { icon: stackIcon,          label: 'Land Zoning',    value: 'Residential' },
    { icon: blueprint1Icon,     label: 'Plot Sizes',     value: '100–240 Sq.Yd' },
    { icon: unitFacingIcon,     label: 'Facing',         value: 'North & East' },
    { icon: overpopulationIcon, label: 'Density',        value: 'Low – 312 Plots' },
    { icon: clubhouseIcon,      label: 'Clubhouse',      value: 'Yes – 2,400 Sq.Ft' },
    { icon: orr1Icon,           label: 'ORR Distance',   value: '4.5 km' },
    { icon: rrr1Icon,           label: 'RRR Distance',   value: '18 km' },
    { icon: highway1Icon,       label: 'Highway',        value: 'NH-163 – 2 km' },
    { icon: roadsWidthIcon,     label: 'Road Width',     value: '30 ft / 20 ft' },
    { icon: loan1Icon,          label: 'Loan Facility',  value: 'SBI, HDFC, Axis' },
    { icon: skyscrapperIcon,    label: 'Project Type',   value: 'Residential Plots' },
    { icon: ocIcon,             label: 'LP Status',      value: 'Final LP Received' },
    { icon: researchIcon,       label: 'RERA',           value: 'Valid till Dec 2028' },
    { icon: blueprintIcon,      label: 'Total Area',     value: '12 Acres' },
  ];

  const displayed = showAll ? allData : allData.slice(0, 6);

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-2 mb-4">
        {displayed.map((item) => (
          <OverviewTile key={item.label} item={item} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          variant="contained"
          size="small"
          onClick={() => setShowAll(!showAll)}
          endIcon={showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          sx={{
            backgroundColor: '#1F7A63',
            color: '#FFFFFF',
            borderRadius: '4px',
            fontSize: '0.8125rem',
            fontWeight: 600,
            px: 2.5,
            '&:hover': { backgroundColor: '#145a47' },
          }}
        >
          {showAll ? 'Show less' : 'See all details'}
        </Button>
      </div>
    </div>
  );
};

export default Overview;
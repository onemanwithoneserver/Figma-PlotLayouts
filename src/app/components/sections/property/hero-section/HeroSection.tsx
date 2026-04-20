import React from 'react';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import accountNewLogo from '../images/account_new.png';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="flex-1 flex flex-col items-center gap-1 py-3 px-1 rounded-[4px] bg-[#F5F5F5] border border-[#E0E0E0]">
    <div className="text-[#1F7A63]">{icon}</div>
    <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, textAlign: 'center' }}>
      {value}
    </Typography>
    <Typography sx={{ fontSize: '0.6875rem', color: '#666666', textAlign: 'center', lineHeight: 1.2 }}>
      {label}
    </Typography>
  </div>
);

const HeroSection: React.FC = () => {
  return (
    <Card elevation={0} sx={{ borderRadius: '8px 8px 0 0', border: 'none' }}>
      {/* Header Image */}
      <div className="relative h-[240px] overflow-hidden bg-[#1A1A1A]">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop"
          alt="Vasavi Skyla Plot Layout Aerial View"
          className="w-full h-full object-cover"
          style={{ opacity: 0.88 }}
        />

        {/* HMDA badge ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â top right, flat */}
        <div className="absolute top-3 right-3 z-10">
          <Chip
            icon={<CheckCircleOutlineIcon sx={{ fontSize: 14, color: '#FFFFFF !important' }} />}
            label="HMDA Approved"
            size="small"
            sx={{
              backgroundColor: '#1F7A63',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.6875rem',
              height: 26,
              borderRadius: '4px',
              '& .MuiChip-icon': { color: '#FFFFFF' },
            }}
          />
        </div>

        {/* Price badge ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â bottom left, flat */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="bg-[#1F7A63] rounded-[4px] px-3 py-1.5 inline-flex items-baseline gap-1">
            <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
              ₹18,000
            </Typography>
            <Typography sx={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
              /sq.yd onwards
            </Typography>
          </div>
        </div>
      </div>

      {/* Project info block */}
      <div className="px-4 py-3">
        {/* Name + location row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <Typography sx={{ fontSize: '1.125rem', fontWeight: 800, color: '#1A1A1A', lineHeight: 1.2, mb: 0.5 }}>
              Vasavi Skyla
            </Typography>
            <div className="flex items-center gap-1">
              <LocationOnOutlinedIcon sx={{ fontSize: 14, color: '#1F7A63' }} />
              <Typography sx={{ fontSize: '0.75rem', color: '#666666', fontWeight: 500 }}>
                Chevella, Rangareddy, Telangana
              </Typography>
            </div>
          </div>
          <Chip
            label="Open Plots"
            size="small"
            sx={{
              backgroundColor: '#E8F5E9',
              color: '#1F7A63',
              fontWeight: 600,
              fontSize: '0.6875rem',
              borderRadius: '4px',
              flexShrink: 0,
            }}
          />
        </div>

        <Divider sx={{ mb: 2 }} />

        {/* Developer row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-[4px] border border-[#E0E0E0] overflow-hidden flex-shrink-0 flex items-center justify-center bg-white p-0.5">
            <img src={accountNewLogo} alt="Gully Properties" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1A1A1A' }}>
                Gully Properties
              </Typography>
              <VerifiedIcon sx={{ fontSize: 14, color: '#1F7A63' }} />
            </div>
            <Typography sx={{ fontSize: '0.6875rem', color: '#666666' }}>Developer</Typography>
          </div>
        </div>

        {/* 3 stat cards */}
        <div className="flex gap-2">
          <StatCard
            icon={<SquareFootOutlinedIcon sx={{ fontSize: 22 }} />}
            value="12 Acres"
            label="Total Land"
          />
          <StatCard
            icon={<HomeWorkOutlinedIcon sx={{ fontSize: 22 }} />}
            value="312 Plots"
            label="Total Plots"
          />
          <StatCard
            icon={<AccountBalanceOutlinedIcon sx={{ fontSize: 22 }} />}
            value="Loan ✔"
            label="Bank Finance"
          />
        </div>
      </div>
    </Card>
  );
};

export default HeroSection;
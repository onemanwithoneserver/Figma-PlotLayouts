import React, { useState, useEffect } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TiltCard from '../shared/TiltCard';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import { HeroCardData, heroCardData } from './data';

const StatCard = ({ icon, label, value, delay }: { icon: any, label: string, value: string, delay: string }) => (
  <div className={`flex flex-col items-center justify-center rounded-[8px] bg-[#ECECE8] p-2 shadow-[3px_3px_6px_#CBCBC7,-3px_-3px_6px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] transition-shadow duration-200 animate-fade-blur-in opacity-0 ${delay} min-h-[72px]`}>
    <div className="mb-1 text-[#5C6B63]">{icon}</div>
    <span className="text-[12px] font-semibold text-[#1A2B22] tracking-wide">{value}</span>
    <span className="text-[11px] uppercase font-semibold tracking-[0.05em] text-[#5C6B63] mt-0.5">{label}</span>
  </div>
);

export const PremiumPropertyCard: React.FC<HeroCardData> = ({
  imageSrc, approvalType, price, priceUnit, projectName, location, developerName, isVerified, totalLand, totalPlots, loanAvailable
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="w-full overflow-hidden bg-[#ECECE8] shadow-[0_6px_16px_#CBCBC7,0_-2px_4px_#FFFFFF] relative transition-shadow duration-200 rounded-b-[8px] neu-shimmer-surface">
      
      <div className="relative h-[240px] w-full overflow-hidden">
        <img src={imageSrc} alt={projectName} className="relative z-10 h-full w-full object-cover transition-transform duration-[6s] ease-out group-hover/card:scale-105" />
        
        <div className="absolute right-0 top-0 z-20 animate-fade-blur-in opacity-0 [animation-delay:40ms]">
          <div className="flex items-center gap-1.5 rounded-bl-[8px] bg-[#ECECE8] px-3 py-1.5 shadow-[-3px_3px_6px_#CBCBC7]">
            <CheckCircleOutlineIcon sx={{ fontSize: 14, color: '#2F6F4E' }} />
            <span className="text-[11px] font-semibold tracking-[0.02em] text-[#2F6F4E]">{approvalType}</span>
          </div>
        </div>
        
        <div className="absolute right-0 bottom-0 z-20 animate-fade-blur-in opacity-0 [animation-delay:80ms]">
          <div className="flex flex-col bg-[#ECECE8] px-4 py-2.5 rounded-tl-[8px] shadow-[-3px_-3px_8px_#CBCBC7]">
            <div className="flex items-baseline gap-1">
              <span className="text-[12px] font-bold text-[#1A2B22]">₹</span>
              <span className="text-2xl font-bold text-[#1A2B22] tracking-tight">{price}</span>
            </div>
            <span className="text-[11px] font-medium text-[#3D5048] tracking-[0.02em]">{priceUnit}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3 relative z-10">
        <div className="animate-fade-blur-in opacity-0 [animation-delay:120ms]">
          <h1 className="text-[20px] font-bold text-[#1A2B22] leading-snug mb-1 tracking-tight">{projectName}</h1>
          <div className="flex items-center gap-1.5 text-[#3D5048]">
            {/* Swapped Outlined for Solid Filled Icon */}
            <LocationOnIcon sx={{ fontSize: 16, color: '#2F6F4E' }} />
            <span className="text-[13px] font-medium">{location}</span>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.06)] to-transparent animate-fade-blur-in opacity-0 [animation-delay:160ms]" />

        <div className="flex items-center justify-between animate-fade-blur-in opacity-0 [animation-delay:200ms]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#ECECE8] shadow-[3px_3px_6px_#CBCBC7,-3px_-3px_6px_#FFFFFF]">
              <PersonIcon sx={{ fontSize: 18, color: '#C8A97E' }} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-[14px] font-bold text-[#1A2B22]">{developerName}</span>
                {isVerified && <VerifiedIcon sx={{ fontSize: 16, color: '#2F6F4E' }} />}
              </div>
              <span className="text-[11px] font-semibold text-[#2F6F4E] tracking-[0.02em]">verified developer</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1">
          <StatCard icon={<LandscapeOutlinedIcon sx={{ fontSize: 18 }} />} value={totalLand} label="Land" delay="[animation-delay:240ms]" />
          <StatCard icon={<HomeWorkOutlinedIcon sx={{ fontSize: 18 }} />} value={totalPlots} label="Plots" delay="[animation-delay:280ms]" />
          <StatCard icon={<AccountBalanceOutlinedIcon sx={{ fontSize: 18 }} />} value={loanAvailable ? "Yes" : "No"} label="Loan" delay="[animation-delay:320ms]" />
        </div>
      </div>


    </div>
  );
};

export default function HeroSection() {
  return (
    <div className="w-full flex items-start justify-center">
      <TiltCard>
        <PremiumPropertyCard {...heroCardData} />
      </TiltCard>
    </div>
  );
}
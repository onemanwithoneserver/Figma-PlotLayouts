import React, { useState, useEffect } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import { HeroCardData, heroCardData } from './data';

const StatCard = ({ icon, label, value, delay }: { icon: any, label: string, value: string, delay: string }) => (
  <div className={`relative flex flex-col items-center justify-center rounded-[8px] bg-[rgba(255,255,255,0.62)] p-2 border border-[rgba(255,255,255,0.64)] shadow-[0_2px_10px_rgba(31,65,46,0.08)] transition-all duration-[260ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[2px] hover:bg-[rgba(255,255,255,0.84)] hover:shadow-[0_4px_12px_rgba(31,65,46,0.12)] hover:scale-[1.01] animate-fade-blur-in opacity-0 ${delay} group overflow-hidden`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[280ms] pointer-events-none" />
    <div className="mb-[2px] text-[#4F5B53] group-hover:text-[#2F6F4E] transition-colors duration-[260ms]">{icon}</div>
    <span className="text-[12px] font-semibold text-[#142218] tracking-[0.01em] relative z-10">{value}</span>
    <span className="text-[10px]  font-medium tracking-[0.05em] text-[#4F5B53] group-hover:text-[#33543f] relative z-10 transition-colors">{label}</span>
  </div>
);

export const PremiumPropertyCard: React.FC<HeroCardData> = ({
  imageSrc, approvalType, price, priceUnit, projectName, location, developerName, isVerified, totalLand, totalPlots, loanAvailable
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="w-full overflow-hidden bg-[rgba(255,255,255,0.62)] backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.66)] shadow-[0_4px_14px_rgba(31,65,46,0.1)] relative group/card transition-all duration-[260ms] ease-[cubic-bezier(0.4,0,0.2,1)] rounded-b-[8px]">
      <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.5)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover/card:left-[200%] pointer-events-none z-20" />
      
      <div className="relative h-[380px] w-full overflow-hidden rounded-lg">
        <img src={imageSrc} alt="Vasavi Plots aerial view" loading="eager" className="relative z-10 h-full w-full object-cover transition-transform duration-[6s] ease-out group-hover/card:scale-105" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        
        <div className="absolute top-3 right-3 z-20 animate-fade-blur-in opacity-0 [animation-delay:40ms]">
          <div className="flex items-center gap-[2px] rounded bg-[#1A6B4A]/90 px-2 py-1 shadow-[-2px_2px_8px_rgba(26,107,74,0.22)]">
            <CheckCircleOutlineIcon sx={{ fontSize: 14, color: '#FFFFFF' }} />
            <span className="text-[11px] font-semibold tracking-[0.02em] text-[#FFFFFF]">{approvalType}</span>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-6 right-6 z-20 animate-fade-blur-in opacity-0 [animation-delay:80ms]">
          <p className="text-white/70 text-[11px] font-medium  tracking-widest mb-1">Starting from</p>
          <p className="text-white text-3xl font-semibold leading-tight">
            ₹{price}
            <span className="text-base font-normal text-white/70 ml-1">{priceUnit}</span>
          </p>
        </div>
      </div>

      <div className="px-3 py-3 space-y-2 relative z-10">
        <div className="animate-fade-blur-in opacity-0 [animation-delay:120ms]">
          <h1 className="text-[22px] font-bold text-[#142218] leading-[1.18] mb-[2px] tracking-tight">{projectName}</h1>
          <div className="flex items-center gap-[2px] text-[#4f5b53]">
            <LocationOnIcon sx={{ fontSize: 16, color: '#2F6F4E' }} />
            <span className="text-[13px] font-medium tracking-[0.01em]">{location}</span>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.06)] to-transparent animate-fade-blur-in opacity-0 [animation-delay:160ms]" />

        <div className="flex items-center justify-between animate-fade-blur-in opacity-0 [animation-delay:200ms]">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[rgba(255,255,255,0.74)] border border-[rgba(255,255,255,0.66)] shadow-[0_2px_8px_rgba(31,65,46,0.08)]">
              <PersonIcon sx={{ fontSize: 18, color: '#C8A97E' }} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                <span className="text-[14px] font-bold text-[#142218]">{developerName}</span>
                {isVerified && <VerifiedIcon sx={{ fontSize: 16, color: '#2F6F4E' }} />}
              </div>
              <span className="text-[10px] font-semibold text-[#1f4f36] tracking-[0.02em]">verified developer</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 pt-0.5">
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
      <PremiumPropertyCard {...heroCardData} />
    </div>
  );
}
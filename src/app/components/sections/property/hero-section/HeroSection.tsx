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
  <div className={`relative flex flex-col items-center justify-center rounded-[8px] bg-[rgba(255,255,255,0.65)] p-1.5 border border-[rgba(255,255,255,0.6)] shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[3px] hover:bg-[rgba(255,255,255,0.9)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.02] animate-fade-blur-in opacity-0 ${delay} group overflow-hidden`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[280ms] pointer-events-none" />
    <div className="mb-0.5 text-[#4A5560] group-hover:text-[#2F6F4E] transition-colors duration-[280ms]">{icon}</div>
    <span className="text-[12px] font-semibold text-[#1A1F24] tracking-wide relative z-10">{value}</span>
    <span className="text-[10px] uppercase font-medium tracking-[0.05em] text-[#6B7280] group-hover:text-[#4A5560] relative z-10 transition-colors">{label}</span>
  </div>
);

export const PremiumPropertyCard: React.FC<HeroCardData> = ({
  imageSrc, approvalType, price, priceUnit, projectName, location, developerName, isVerified, totalLand, totalPlots, loanAvailable
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="w-full overflow-hidden bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.6)] shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] relative group/card transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] rounded-b-[8px]">
      <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.5)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover/card:left-[200%] pointer-events-none z-20" />
      
      <div className="relative h-[240px] w-full overflow-hidden">
        <img src={imageSrc} alt={projectName} className="relative z-10 h-full w-full object-cover transition-transform duration-[6s] ease-out group-hover/card:scale-105" />
        
        <div className="absolute right-0 top-0 z-20 animate-fade-blur-in opacity-0 [animation-delay:40ms]">
          <div className="flex items-center gap-1 rounded-bl-[8px] bg-[rgba(255,255,255,0.85)] px-2 py-1 backdrop-blur-[20px] border-b border-l border-[rgba(255,255,255,0.6)] shadow-[-4px_4px_12px_rgba(0,0,0,0.05)]">
            <CheckCircleOutlineIcon sx={{ fontSize: 14, color: '#2F6F4E' }} />
            <span className="text-[11px] font-semibold tracking-[0.02em] text-[#2F6F4E]">{approvalType}</span>
          </div>
        </div>
        
        <div className="absolute right-0 bottom-0 z-20 animate-fade-blur-in opacity-0 [animation-delay:80ms]">
          <div className="flex flex-col bg-[rgba(255,255,255,0.85)] backdrop-blur-[20px] border-t border-l border-[rgba(255,255,255,0.6)] px-3 py-1.5 rounded-tl-[8px] shadow-[-4px_-4px_16px_rgba(0,0,0,0.06)] transition-transform duration-[280ms] hover:scale-[1.02] origin-bottom-right">
            <div className="flex items-baseline gap-0.5 relative z-10">
              <span className="text-[12px] font-bold text-[#1A1F24]">₹</span>
              <span className="text-2xl font-bold text-[#1A1F24] tracking-tight">{price}</span>
            </div>
            <span className="text-[10px] font-medium text-[#4A5560] tracking-[0.02em] relative z-10">{priceUnit}</span>
          </div>
        </div>
      </div>

      <div className="px-3 py-3 space-y-2.5 relative z-10">
        <div className="animate-fade-blur-in opacity-0 [animation-delay:120ms]">
          <h1 className="text-xl font-bold text-[#1A1F24] leading-snug mb-0.5 tracking-tight">{projectName}</h1>
          <div className="flex items-center gap-1 text-[#4A5560]">
            {/* Swapped Outlined for Solid Filled Icon */}
            <LocationOnIcon sx={{ fontSize: 16, color: '#2F6F4E' }} />
            <span className="text-[13px] font-medium">{location}</span>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.06)] to-transparent animate-fade-blur-in opacity-0 [animation-delay:160ms]" />

        <div className="flex items-center justify-between animate-fade-blur-in opacity-0 [animation-delay:200ms]">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[rgba(255,255,255,0.8)] border border-[rgba(255,255,255,0.6)] shadow-[0_2px_4px_rgba(0,0,0,0.04)]">
              <PersonIcon sx={{ fontSize: 18, color: '#C8A97E' }} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                <span className="text-[14px] font-bold text-[#1A1F24]">{developerName}</span>
                {isVerified && <VerifiedIcon sx={{ fontSize: 16, color: '#2F6F4E' }} />}
              </div>
              <span className="text-[10px] font-semibold text-[#2F6F4E] tracking-[0.02em]">verified developer</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 pt-0.5">
          <StatCard icon={<LandscapeOutlinedIcon sx={{ fontSize: 18 }} />} value={totalLand} label="Land" delay="[animation-delay:240ms]" />
          <StatCard icon={<HomeWorkOutlinedIcon sx={{ fontSize: 18 }} />} value={totalPlots} label="Plots" delay="[animation-delay:280ms]" />
          <StatCard icon={<AccountBalanceOutlinedIcon sx={{ fontSize: 18 }} />} value={loanAvailable ? "Yes" : "No"} label="Loan" delay="[animation-delay:320ms]" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeBlurIn { 
          from { opacity: 0; filter: blur(6px); transform: translateY(12px); } 
          to { opacity: 1; filter: blur(0px); transform: translateY(0); } 
        }
        .animate-fade-blur-in { animation: fadeBlurIn 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}} />
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
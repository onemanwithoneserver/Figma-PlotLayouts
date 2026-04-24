import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import { HeroCardData, heroCardData } from './data';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, filter: 'blur(6px)', y: 15 },
  show: { 
    opacity: 1, 
    filter: 'blur(0px)', 
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <motion.div 
    variants={itemVariants}
    className="relative flex flex-col items-center justify-center rounded-[8px] bg-white/60 backdrop-blur-md p-2 border border-[#E2E8F0] shadow-[0_2px_8px_rgba(26,107,74,0.06)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:bg-white/90 hover:shadow-[0_4px_12px_rgba(26,107,74,0.12)] hover:scale-[1.01] group overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    <div className="mb-[2px] text-[#4A5568] group-hover:text-[#1A6B4A] transition-colors duration-300">{icon}</div>
    <span className="text-[12px] font-semibold text-[#1A1A2E] tracking-[0.01em] relative z-10">{value}</span>
    <span className="text-[10px] font-medium tracking-[0.05em] text-[#4A5568] group-hover:text-[#1A1A2E] relative z-10 transition-colors">{label}</span>
  </motion.div>
);

export const PremiumPropertyCard: React.FC<HeroCardData> = ({
  imageSrc, approvalType, price, priceUnit, projectName, location, developerName, isVerified, totalLand, totalPlots, loanAvailable
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full overflow-hidden bg-white/60 backdrop-blur-[12px] border-b border-[#E2E8F0] shadow-[0_4px_14px_rgba(26,107,74,0.08)] relative group/card transition-all duration-300 ease-out rounded-b-[8px]"
    >
      <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover/card:left-[200%] pointer-events-none z-20" />
      
      <div className="relative h-[380px] w-full overflow-hidden rounded-lg">
        <img src={imageSrc} alt={`${projectName} aerial view`} loading="eager" className="relative z-10 h-full w-full object-cover transition-transform duration-[6s] ease-out group-hover/card:scale-105" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1A1A2E]/60 via-transparent to-transparent pointer-events-none" />
        
        <motion.div variants={itemVariants} className="absolute top-3 right-3 z-20">
          <div className="flex items-center gap-[2px] rounded bg-[#1A6B4A]/95 px-2 py-1 shadow-[0_2px_8px_rgba(26,107,74,0.25)] border border-[#D4F5E7]/20">
            <CheckCircleOutlineIcon sx={{ fontSize: 14, color: '#FFFFFF' }} />
            <span className="text-[11px] font-semibold tracking-[0.02em] text-[#FFFFFF]">{approvalType}</span>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          className="absolute bottom-0 right-0 z-20 bg-white/80 backdrop-blur-md pl-6 pr-5 pt-3 pb-3 rounded-tl-[24px] border-t border-l border-white/60 shadow-[-4px_-4px_16px_rgba(0,0,0,0.06)] flex flex-col"
        >
          <div className="flex items-center gap-1">
            <span className="text-[18px] font-extrabold text-[#1A1A2E] mt-1">₹</span>
            <span className="text-[32px] font-black text-[#1A1A2E] leading-none tracking-tight">{price}</span>
          </div>
          <span className="text-[13px] font-medium text-[#4A5568] mt-0.5">{priceUnit} onwards</span>
        </motion.div>
      </div>

      <div className="px-3 py-3 space-y-2 relative z-10">
        <motion.div variants={itemVariants}>
          <h1 className="text-[22px] font-bold text-[#1A1A2E] leading-[1.18] mb-[2px] tracking-tight">{projectName}</h1>
          <div className="flex items-center gap-[2px] text-[#4A5568]">
            <LocationOnIcon sx={{ fontSize: 16, color: '#1A6B4A' }} />
            <span className="text-[13px] font-medium tracking-[0.01em]">{location}</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent" />

        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#D4F5E7]/50 border border-[#1A6B4A]/10 shadow-sm transition-colors group-hover/card:bg-[#D4F5E7]">
              <PersonIcon sx={{ fontSize: 18, color: '#F5A623' }} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                <span className="text-[14px] font-bold text-[#1A1A2E]">{developerName}</span>
                {isVerified && <VerifiedIcon sx={{ fontSize: 16, color: '#1A6B4A' }} />}
              </div>
              <span className="text-[10px] font-semibold text-[#1A6B4A] tracking-[0.02em]">verified developer</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-1.5 pt-0.5">
          <StatCard icon={<LandscapeOutlinedIcon sx={{ fontSize: 18 }} />} value={totalLand} label="Land" />
          <StatCard icon={<HomeWorkOutlinedIcon sx={{ fontSize: 18 }} />} value={totalPlots} label="Plots" />
          <StatCard icon={<AccountBalanceOutlinedIcon sx={{ fontSize: 18 }} />} value={loanAvailable ? "Yes" : "No"} label="Loan" />
        </div>
      </div>
    </motion.div>
  );
};

export default function HeroSection() {
  return (
    <div className="w-full flex items-start justify-center bg-[#F5F7FA]">
      <PremiumPropertyCard {...heroCardData} />
    </div>
  );
}
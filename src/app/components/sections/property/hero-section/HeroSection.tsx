import React from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { heroCardData } from './data';
import type { HeroCardData } from './data';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="flex flex-col items-center justify-center gap-1 p-2 rounded-[8px] bg-[#EEF4F0] border border-[#C8DBCF] shadow-sm hover:shadow-md hover:border-[#15653A] transition-all duration-300 group">
    <div className="text-[#2F7D4E] group-hover:scale-110 transition-transform duration-300">
      {React.cloneElement(icon as React.ReactElement, { sx: { fontSize: 20 } })}
    </div>
    <div className="flex flex-col items-center">
      <span className="text-[0.75rem] font-bold text-[#0B1F17] leading-tight">
        {value}
      </span>
      <span className="text-[0.6rem] font-medium text-[#64786D] leading-tight mt-0.5 uppercase tracking-wider">
        {label}
      </span>
    </div>
  </div>
);

export const PremiumPropertyCard: React.FC<HeroCardData> = ({
  imageSrc,
  approvalType,
  price,
  priceUnit,
  projectName,
  location,
  propertyType,
  developerName,
  developerLogo,
  isVerified,
  totalLand,
  totalPlots,
  loanAvailable,
}) => {
  return (
    <div className="font-outfit bg-[#ffffff] rounded-[4px] overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-[390px] mx-auto group cursor-pointer animate-fade-in-up">
      <div className="relative h-[220px] overflow-hidden bg-[#0B1F17]">
        <img
          src={imageSrc}
          alt={projectName}
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F17]/90 via-[#0B1F17]/20 to-transparent" />

        <div className="absolute top-2.5 right-2.5 z-10">
          <div className="flex items-center gap-1 text-white px-2 py-0.5 rounded-[4px] shadow-sm bg-[#15653A] animate-fade-down">
            <CheckCircleOutlineIcon sx={{ fontSize: 12 }} />
            <span className="text-[0.625rem] font-bold tracking-wide">
              {approvalType}
            </span>
          </div>
        </div>

        <div className="absolute bottom-2.5 left-2.5 z-10 animate-fade-up">
          <div className="rounded-[4px] px-2.5 py-1 flex items-baseline gap-1 bg-white/10 border border-white/20 backdrop-blur-md">
            <span className="text-[1rem] font-extrabold text-white leading-none drop-shadow-md">
              {price}
            </span>
            <span className="text-[0.65rem] font-medium text-white/90 drop-shadow-md">
              {priceUnit}
            </span>
          </div>
        </div>
      </div>

      <div className="p-3 bg-[#ffffff]">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-[1.125rem] font-extrabold text-[#0B1F17] leading-tight mb-0.5 truncate">
              {projectName}
            </h1>
            <div className="flex items-center gap-1 text-[#64786D]">
              <LocationOnOutlinedIcon sx={{ fontSize: 14, color: '#2F7D4E' }} />
              <span className="text-[0.7rem] font-medium truncate">
                {location}
              </span>
            </div>
          </div>

          <button className="flex-shrink-0 bg-[#EEF4F0] hover:bg-[#15653A] text-[#15653A] hover:text-white text-[0.65rem] font-bold px-2.5 py-1.5 rounded-[4px] transition-all duration-300 border border-[#C8DBCF] hover:border-[#15653A]">
            {propertyType}
          </button>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C8DBCF] to-transparent mb-3" />

        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-[4px] border border-[#C8DBCF] overflow-hidden flex-shrink-0 flex items-center justify-center bg-white p-0.5">
            <img
              src={developerLogo}
              alt={developerName}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32?text=Logo';
              }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1">
              <span className="text-[0.75rem] font-bold text-[#0B1F17]">
                {developerName}
              </span>
              {isVerified && (
                <VerifiedIcon sx={{ fontSize: 14, color: '#15653A' }} />
              )}
            </div>
            <span className="text-[0.6rem] font-medium text-[#64786D] uppercase tracking-tighter leading-none">
              Developer
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          <StatCard
            icon={<LandscapeOutlinedIcon />}
            value={totalLand}
            label="Total Land"
          />
          <StatCard
            icon={<HomeWorkOutlinedIcon />}
            value={totalPlots}
            label="Total Plots"
          />
          <StatCard
            icon={<AccountBalanceOutlinedIcon />}
            value={loanAvailable ? "Loan ✓" : "No Loan"}
            label="Bank Fin."
          />
        </div>
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  return <PremiumPropertyCard {...heroCardData} />;
};

export default HeroSection;
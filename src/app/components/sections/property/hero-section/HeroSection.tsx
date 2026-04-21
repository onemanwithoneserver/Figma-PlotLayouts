import React from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import accountNewLogo from '../images/account_new.png';

export interface PropertyCardProps {
  imageSrc: string;
  approvalType: string;
  price: string;
  priceUnit: string;
  projectName: string;
  location: string;
  propertyType: string;
  developerName: string;
  developerLogo: string;
  isVerified: boolean;
  totalLand: string;
  totalPlots: string;
  loanAvailable: boolean;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-[6px] bg-white border border-[#EAEAEA] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(31,122,99,0.08)] hover:border-[#1F7A63]/30 transition-all duration-300 group">
    <div className="text-[#1F7A63] group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div className="flex flex-col items-center">
      <span className="text-[0.875rem] font-bold text-[#1A1A1A] leading-tight">
        {value}
      </span>
      <span className="text-[0.6875rem] font-medium text-[#666666] leading-tight mt-0.5">
        {label}
      </span>
    </div>
  </div>
);

export const PremiumPropertyCard: React.FC<PropertyCardProps> = ({
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
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
          .font-outfit { font-family: 'Outfit', sans-serif; }
        `}
      </style>

      <div className="font-outfit bg-white rounded-[8px] border border-[#EAEAEA] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 max-w-[390px] mx-auto group cursor-pointer">
        <div className="relative h-[240px] overflow-hidden bg-black">
          <img
            src={imageSrc}
            alt={projectName}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/20 to-transparent" />

          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center gap-1 bg-[#1F7A63] text-white px-2.5 py-1 rounded-[4px] shadow-sm">
              <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />
              <span className="text-[0.6875rem] font-bold tracking-wide ">
                {approvalType}
              </span>
            </div>
          </div>

          <div className="absolute bottom-3 left-3 z-10">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-[6px] px-3 py-1.5 flex items-baseline gap-1 shadow-lg">
              <span className="text-[1.125rem] font-extrabold text-white leading-none drop-shadow-md">
                {price}
              </span>
              <span className="text-[0.6875rem] font-medium text-white/90 drop-shadow-md">
                {priceUnit}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-[1.25rem] font-extrabold text-[#1A1A1A] leading-tight mb-1 truncate">
                {projectName}
              </h2>
              <div className="flex items-center gap-1 text-[#666666]">
                <LocationOnOutlinedIcon sx={{ fontSize: 16, color: '#1F7A63' }} />
                <span className="text-[0.75rem] font-medium truncate">
                  {location}
                </span>
              </div>
            </div>
            
            <button className="flex-shrink-0 bg-[#E8F5E9] hover:bg-[#1F7A63] text-[#1F7A63] hover:text-white text-[0.75rem] font-bold px-3.5 py-2 rounded-[6px] transition-all duration-300 shadow-sm hover:shadow-md border border-[#1F7A63]/20 hover:border-[#1F7A63]">
              {propertyType}
            </button>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E0E0E0] to-transparent mb-4" />

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-[6px] border border-[#EAEAEA] overflow-hidden flex-shrink-0 flex items-center justify-center bg-[#FAFAFA] p-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <img 
                src={developerLogo} 
                alt={developerName} 
                className="w-full h-full object-contain" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=Logo';
                }}
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <span className="text-[0.875rem] font-bold text-[#1A1A1A]">
                  {developerName}
                </span>
                {isVerified && (
                  <VerifiedIcon sx={{ fontSize: 16, color: '#1F7A63' }} />
                )}
              </div>
              <span className="text-[0.6875rem] font-medium text-[#888888] tracking-wide  mt-0.5">
                Developer
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <StatCard
              icon={<LandscapeOutlinedIcon sx={{ fontSize: 24 }} />}
              value={totalLand}
              label="Total Land"
            />
            <StatCard
              icon={<HomeWorkOutlinedIcon sx={{ fontSize: 24 }} />}
              value={totalPlots}
              label="Total Plots"
            />
            <StatCard
              icon={<AccountBalanceOutlinedIcon sx={{ fontSize: 24 }} />}
              value={loanAvailable ? "Loan ✓" : "No Loan"}
              label="Bank Finance"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const HeroSection: React.FC = () => {
  return (
    <PremiumPropertyCard
      imageSrc="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop"
      approvalType="HMDA Approved"
      price="₹18,000"
      priceUnit="/sq.yd onwards"
      projectName="Vasavi plots"
      location="Chevella, Rangareddy, Telangana"
      propertyType="Open Plots"
      developerName="Gully Properties"
      developerLogo={accountNewLogo}
      isVerified={true}
      totalLand="12 Acres"
      totalPlots="312 Plots"
      loanAvailable={true}
    />
  );
};

export default HeroSection;
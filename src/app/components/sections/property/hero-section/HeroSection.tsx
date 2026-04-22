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
  <div className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-[var(--radius-md)] bg-white border border-[var(--border-subtle)] shadow-[0_2px_8px_var(--overlay-dark-4)] hover:shadow-[0_4px_12px_var(--primary-alpha-8)] hover:border-[var(--accent-border)] transition-all duration-300 group">
    <div className="text-[var(--accent-primary)] group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div className="flex flex-col items-center">
      <span className="text-[0.875rem] font-bold text-[var(--text-primary)] leading-tight">
        {value}
      </span>
      <span className="text-[0.6875rem] font-medium text-[var(--text-muted)] leading-tight mt-0.5">
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
    <div className="font-outfit bg-white rounded-[2px] border border-[var(--border-subtle)] overflow-hidden shadow-[0_4px_20px_var(--overlay-dark-6)] hover:shadow-[0_8px_30px_var(--overlay-dark-12)] transition-shadow duration-300 max-w-[390px] mx-auto group cursor-pointer">
      <div className="relative h-[240px] overflow-hidden bg-black">
        <img
          src={imageSrc}
          alt={projectName}
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--text-color)]/90 via-[var(--text-color)]/20 to-transparent" />

        {/* Approval badge */}
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 text-white px-2.5 py-1 rounded-[var(--radius-sm)] shadow-sm" style={{ background: 'var(--gradient-accent)' }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />
            <span className="text-[0.6875rem] font-bold tracking-wide">
              {approvalType}
            </span>
          </div>
        </div>

        {/* Price overlay — glassmorphic */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="glass-card rounded-[var(--radius-md)] px-3 py-1.5 flex items-baseline gap-1">
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
            <h1 className="text-[1.25rem] font-extrabold text-[var(--text-primary)] leading-tight mb-1 truncate">
              {projectName}
            </h1>
            <div className="flex items-center gap-1 text-[var(--text-muted)]">
              <LocationOnOutlinedIcon sx={{ fontSize: 16, color: 'var(--accent-primary)' }} />
              <span className="text-[0.75rem] font-medium truncate">
                {location}
              </span>
            </div>
          </div>
          
          <button className="flex-shrink-0 bg-[var(--accent-soft)] hover:bg-[var(--accent-primary)] text-[var(--accent-primary)] hover:text-white text-[0.75rem] font-bold px-3.5 py-2 rounded-[var(--radius-md)] transition-all duration-300 shadow-sm hover:shadow-md border border-[var(--accent-border)] hover:border-[var(--accent-primary)]">
            {propertyType}
          </button>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent mb-4" />

        {/* Developer row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-[var(--radius-md)] border border-[var(--border-subtle)] overflow-hidden flex-shrink-0 flex items-center justify-center bg-[var(--bg-section-light)] p-1 shadow-[0_2px_8px_var(--overlay-dark-4)]">
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
              <span className="text-[0.875rem] font-bold text-[var(--text-primary)]">
                {developerName}
              </span>
              {isVerified && (
                <VerifiedIcon sx={{ fontSize: 16, color: 'var(--accent-primary)' }} />
              )}
            </div>
            <span className="text-[0.6875rem] font-medium text-[var(--text-muted)] tracking-wide mt-0.5">
              Developer
            </span>
          </div>
        </div>

        {/* Stat grid */}
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
  );
};

const HeroSection: React.FC = () => {
  return <PremiumPropertyCard {...heroCardData} />;
};

export default HeroSection;
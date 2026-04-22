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
  <div className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-white)] border border-[var(--color-border)] shadow-sm hover:shadow-[var(--glass-shadow-hover)] hover:border-[var(--color-secondary)] transition-all duration-300 group">
    <div className="text-[var(--color-secondary)] group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div className="flex flex-col items-center">
      <span className="text-[0.875rem] font-bold text-[var(--color-text-primary)] leading-tight">
        {value}
      </span>
      <span className="text-[0.6875rem] font-medium text-[var(--color-text-muted)] leading-tight mt-0.5">
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
    <div className="font-outfit bg-[var(--color-bg-white)] rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden shadow-[var(--glass-shadow)] hover:shadow-[var(--glass-shadow-hover)] transition-shadow duration-300 max-w-[390px] mx-auto group cursor-pointer animate-fade-in-up">
      <div className="relative h-[240px] overflow-hidden bg-black">
        <img
          src={imageSrc}
          alt={projectName}
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,26,16,0.9)] via-[rgba(10,26,16,0.2)] to-transparent" />

        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 text-[var(--color-bg-white)] px-2.5 py-1 rounded-[var(--radius-sm)] shadow-sm bg-[var(--color-accent)] animate-fade-down animation-delay-300">
            <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />
            <span className="text-[0.6875rem] font-bold tracking-wide">
              {approvalType}
            </span>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 z-10 animate-fade-up animation-delay-200">
          <div className="glass-card rounded-[var(--radius-md)] px-3 py-1.5 flex items-baseline gap-1 bg-[rgba(255,255,255,0.15)] border-[rgba(255,255,255,0.3)] backdrop-blur-md">
            <span className="text-[1.125rem] font-extrabold text-white leading-none drop-shadow-md">
              {price}
            </span>
            <span className="text-[0.6875rem] font-medium text-white/90 drop-shadow-md">
              {priceUnit}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-[var(--color-bg-white)]">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-[1.25rem] font-extrabold text-[var(--color-text-primary)] leading-tight mb-1 truncate">
              {projectName}
            </h1>
            <div className="flex items-center gap-1 text-[var(--color-text-muted)]">
              <LocationOnOutlinedIcon sx={{ fontSize: 16, color: 'var(--color-accent)' }} />
              <span className="text-[0.75rem] font-medium truncate">
                {location}
              </span>
            </div>
          </div>

          <button className="flex-shrink-0 bg-[var(--color-bg-soft)] hover:bg-[var(--color-accent)] text-[var(--color-accent)] hover:text-white text-[0.75rem] font-bold px-3.5 py-2 rounded-[var(--radius-md)] transition-all duration-300 shadow-sm hover:shadow-[var(--glass-shadow)] border border-[var(--color-border-hover)] hover:border-[var(--color-accent)]">
            {propertyType}
          </button>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mb-4" />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden flex-shrink-0 flex items-center justify-center bg-[var(--color-bg-white)] p-1 shadow-sm">
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
              <span className="text-[0.875rem] font-bold text-[var(--color-text-primary)]">
                {developerName}
              </span>
              {isVerified && (
                <VerifiedIcon sx={{ fontSize: 16, color: 'var(--color-accent)' }} />
              )}
            </div>
            <span className="text-[0.6875rem] font-medium text-[var(--color-text-muted)] tracking-wide mt-0.5">
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
  );
};

const HeroSection: React.FC = () => {
  return <PremiumPropertyCard {...heroCardData} />;
};

export default HeroSection;
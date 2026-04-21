import accountNewLogo from '../images/account_new.png';

/** Stat card displayed below hero image */
export interface StatItem {
  id: string;
  label: string;
  value: string;
  icon: 'landscape' | 'homeWork' | 'accountBalance';
}

/** Full property card data */
export interface HeroCardData {
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

export const heroCardData: HeroCardData = {
  imageSrc: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop',
  approvalType: 'HMDA Approved',
  price: '₹18,000',
  priceUnit: '/sq.yd onwards',
  projectName: 'Vasavi plots',
  location: 'Chevella, Rangareddy, Telangana',
  propertyType: 'Open Plots',
  developerName: 'Gully Properties',
  developerLogo: accountNewLogo,
  isVerified: true,
  totalLand: '12 Acres',
  totalPlots: '312 Plots',
  loanAvailable: true,
};

export const statItems: StatItem[] = [
  { id: 'land',   label: 'Total Land',   value: '12 Acres',  icon: 'landscape' },
  { id: 'plots',  label: 'Total Plots',  value: '312 Plots', icon: 'homeWork' },
  { id: 'loan',   label: 'Bank Finance', value: 'Loan ✓',    icon: 'accountBalance' },
];

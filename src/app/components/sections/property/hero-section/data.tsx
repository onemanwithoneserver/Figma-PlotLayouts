export interface HeroCardData {
  imageSrc: string;
  approvalType: string;
  price: string;
  priceUnit: string;
  projectName: string;
  location: string;
  developerName: string;
  isVerified: boolean;
  totalLand: string;
  totalPlots: string;
  loanAvailable: boolean;
}

export const heroCardData: HeroCardData = {
  imageSrc: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop',
  approvalType: 'HMDA Approved',
  price: '18,000',
  priceUnit: '/sq.yd onwards',
  projectName: 'Vasavi Plots',
  location: 'Chevella, Rangareddy, Telangana',
  developerName: 'Gully Properties',
  isVerified: true,
  totalLand: '12 Acres',
  totalPlots: '312 Plots',
  loanAvailable: true,
};
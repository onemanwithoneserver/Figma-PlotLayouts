import React from 'react';
import { 
  LayoutGrid, 
  Zap, 
  BarChart3, 
  Map as MapIcon, 
  MapPin, 
  ShieldCheck, 
  IndianRupee, 
  Image as ImageIcon, 
  MessageSquareText, 
  HelpCircle 
} from 'lucide-react';

export type HeadingIconName =
  | 'overview'
  | 'highlights'
  | 'project-status'
  | 'layout'
  | 'location'
  | 'amenities'
  | 'pricing'
  | 'gallery'
  | 'ask-seller'
  | 'default';

interface HeadingIconProps {
  name: HeadingIconName;
  className?: string;
}

const IconMap: Record<HeadingIconName, React.ElementType> = {
  overview: LayoutGrid,
  highlights: Zap,
  'project-status': BarChart3,
  layout: MapIcon,
  location: MapPin, // Solid fill logic consistent with Hero Section
  amenities: ShieldCheck,
  pricing: IndianRupee,
  gallery: ImageIcon,
  'ask-seller': MessageSquareText,
  default: HelpCircle,
};

const HeadingIcon: React.FC<HeadingIconProps> = ({ name, className = '' }) => {
  const IconComponent = IconMap[name] || IconMap.default;

  return (
    <span 
      className={`inline-flex items-center justify-center transition-colors duration-280 ${className}`} 
      aria-hidden="true"
    >
      <IconComponent 
        strokeWidth={2.2} 
        className="w-full h-full" 
      />
    </span>
  );
};

export default HeadingIcon;
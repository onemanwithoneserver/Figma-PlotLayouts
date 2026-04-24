import React from 'react';
import HeadingIcon from './HeadingIcon';
import type { HeadingIconName } from './HeadingIcon';

interface ContentSectionProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, action, children, className = '' }) => {
  const iconByTitle: Record<string, HeadingIconName> = {
    Overview: 'overview',
    Highlights: 'highlights',
    'Layout & Plot Availability': 'layout',
    'Location & Distance': 'location',
    Amenities: 'amenities',
    'Pricing & Payment Plans': 'pricing',
    'Gallery': 'gallery',
  };

  const iconName = iconByTitle[title] ?? 'default';

  return (
    <div
      className={`relative overflow-hidden bg-[#ECECE8] rounded-[8px] shadow-[5px_5px_10px_#CBCBC7,-5px_-5px_10px_#FFFFFF] transition-shadow duration-200 animate-fade-blur-in opacity-0 ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[8px] bg-[#ECECE8] shadow-[3px_3px_6px_#CBCBC7,-3px_-3px_6px_#FFFFFF] flex items-center justify-center">
            <HeadingIcon name={iconName} className="w-4 h-4 text-[#2F6F4E]" />
          </div>
          <h2 className="text-[15px] font-bold text-[#1A2B22] tracking-tight leading-none">
            {title}
          </h2>
        </div>

        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>

      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default ContentSection;
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
  };

  const iconName = iconByTitle[title] ?? 'default';

  return (
    <div className={`flex flex-col w-full group p-[2px] ${className}`}>
      <div className="flex items-center justify-between min-h-[48px] p-[2px] m-[2px] relative z-20">
        <div className="flex items-center gap-[2px]">
          <div className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#2F6F4E]/10 border border-[#2F6F4E]/18 shadow-[0_1px_4px_rgba(31,65,46,0.12)] transition-transform duration-300 group-hover:scale-[1.03] m-[2px]">
            <HeadingIcon name={iconName} className="w-4 h-4 text-[#2F6F4E]" />
          </div>
          <h2 className="text-[16px] font-bold text-[#142218] tracking-tight leading-[1.2] p-[2px]">
            {title}
          </h2>
        </div>
        
        {action && (
          <div className="flex-shrink-0 animate-[fadeIn_0.4s_ease-out_forwards] opacity-0 [animation-delay:100ms] p-[2px] m-[2px]">
            {action}
          </div>
        )}
      </div>

      <div className="relative z-20 px-[2px] m-[2px]">
        {children}
      </div>
    </div>
  );
};

export default ContentSection;
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
    <section className={`w-full group p-2 ${className}`}>
      <div className="mb-2 flex items-center justify-between min-h-[48px] relative z-20">
        <div className="flex items-center gap-[2px]">
          <div className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#2F8F7B]/10 border border-[#2F8F7B]/18 shadow-[0_1px_4px_rgba(24,66,55,0.12)] transition-transform duration-300 group-hover:scale-[1.03] m-[2px]">
            <HeadingIcon name={iconName} className="w-4 h-4 text-[#2F8F7B]" />
          </div>
          <h2 className="text-2xl font-semibold font-outfit text-[#1A1A2E] tracking-tight leading-[1.2]">
            {title}
          </h2>
        </div>
        
        {action && (
          <div className="flex-shrink-0 animate-[fadeIn_0.4s_ease-out_forwards] opacity-0 [animation-delay:100ms]">
            {action}
          </div>
        )}
      </div>

      <div className="relative z-20 flex flex-col gap-2">
        {children}
      </div>
    </section>
  );
};

export default ContentSection;
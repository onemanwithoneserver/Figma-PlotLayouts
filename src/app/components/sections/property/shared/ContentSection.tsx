import React from 'react';
import { motion } from 'framer-motion';
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
        <div className="flex items-center gap-[4px]">
          {/* Updated Icon Wrapper with Primary Tint and Primary colors */}
          <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-[#D4F5E7]/50 border border-[#1A6B4A]/10 shadow-sm transition-transform duration-300 group-hover:scale-[1.05] group-hover:bg-[#D4F5E7] m-[2px]">
            <HeadingIcon name={iconName} className="w-4 h-4 text-[#1A6B4A]" />
          </div>
          <h2 className="text-[20px] font-bold font-outfit text-[#1A1A2E] tracking-tight leading-[1.2]">
            {title}
          </h2>
        </div>
        
        {action && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            {action}
          </motion.div>
        )}
      </div>

      <div className="relative z-20 flex flex-col gap-2">
        {children}
      </div>
    </section>
  );
};

export default ContentSection;
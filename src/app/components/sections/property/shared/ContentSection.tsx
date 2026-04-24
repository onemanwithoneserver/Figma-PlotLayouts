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
    <div
      className={`
        relative overflow-hidden
        bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] 
        border border-[rgba(255,255,255,0.6)] 
        shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]
        rounded-[8px] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)]
        hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:bg-[rgba(255,255,255,0.8)]
        animate-fade-blur-in opacity-0
        ${className}
      `}
    >
      {/* Light shift sweep overlay on hover */}
      <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.4)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none z-10" />

      {/* Header Row */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-[rgba(0,0,0,0.05)] relative z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[8px] bg-[rgba(47,111,78,0.1)] border border-[rgba(47,111,78,0.2)] flex items-center justify-center">
            <HeadingIcon name={iconName} className="w-4 h-4 text-[#2F6F4E]" />
          </div>
          <h2 className="text-[15px] font-bold text-[#1A1F24] tracking-tight leading-none">
            {title}
          </h2>
        </div>
        
        {action && (
          <div className="flex-shrink-0 animate-fade-blur-in opacity-0" style={{ animationDelay: '100ms' }}>
            {action}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="relative z-20 bg-transparent">
        {children}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeBlurIn { 
          from { opacity: 0; filter: blur(6px); transform: translateY(12px); } 
          to { opacity: 1; filter: blur(0px); transform: translateY(0); } 
        }
        .animate-fade-blur-in { animation: fadeBlurIn 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}} />
    </div>
  );
};

export default ContentSection;
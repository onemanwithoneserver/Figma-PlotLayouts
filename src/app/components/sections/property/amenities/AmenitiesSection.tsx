import React, { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SectionTabNav from '../shared/SectionTabNav';
import AskSeller from '../shared/AskSeller';
import { AMENITY_TABS, amenitiesAskSellerQuestions } from './data';

const AmenitiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(AMENITY_TABS[0].id);
  const current = AMENITY_TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="w-full">
      <SectionTabNav
        tabs={AMENITY_TABS.map(({ id, label }) => ({ id, label }))}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        layoutId="amenity-active-pill"
      />

      <div className="px-2 py-2 flex flex-col gap-2.5">
        <div 
          className="relative w-full h-[160px] rounded-[4px] overflow-hidden group shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-[rgba(255,255,255,0.4)] animate-fade-blur-in opacity-0"
          style={{ animationDelay: '40ms' }}
        >
          <img
            src={current.imageUrl}
            alt={current.label}
            className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.4)] via-[rgba(0,0,0,0.05)] to-transparent pointer-events-none" />
          <div className="absolute bottom-2 left-3">
            <span className="text-[14px] font-bold text-[#FFFFFF] tracking-wide drop-shadow-md">
              {current.label} Highlights
            </span>
          </div>
        </div>

        <ul className="flex flex-col gap-1.5" role="list" aria-label={`${current.label} amenities`}>
          {current.items.map((item, index) => {
            const delay = 80 + index * 40;
            return (
              <li
                key={item}
                className="group relative flex items-center gap-2.5 px-2 py-1.5 rounded-[4px] bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.6)] shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] cursor-pointer transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[2px] hover:scale-[1.01] hover:bg-[rgba(255,255,255,0.85)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden animate-fade-blur-in opacity-0"
                style={{ animationDelay: `${delay}ms` }}
                role="listitem"
              >
                <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.5)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none z-10" />

                <div className="flex items-center justify-center w-7 h-7 shrink-0 rounded-[4px] bg-[rgba(47,111,78,0.08)] border border-[rgba(47,111,78,0.15)] transition-all duration-[280ms] group-hover:bg-[rgba(47,111,78,0.15)] group-hover:scale-110 relative z-10">
                  <CheckCircleOutlineIcon
                    sx={{ fontSize: 16 }}
                    className="text-[#2F6F4E]"
                  />
                </div>

                <span className="text-[13px] font-semibold text-[#4A5560] leading-tight transition-colors duration-[280ms] group-hover:text-[#1A1F24] relative z-10">
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-1 px-2" >
        <AskSeller initialQuestions={amenitiesAskSellerQuestions} />
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

export default AmenitiesSection;
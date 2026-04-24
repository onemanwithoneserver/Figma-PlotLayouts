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
          className="relative w-full h-[160px] rounded-[4px] overflow-hidden group shadow-[0_1px_6px_rgba(31,65,46,0.08)] border border-[rgba(255,255,255,0.68)] animate-fade-blur-in opacity-0"
          style={{ animationDelay: '40ms' }}
        >
          <img
            src={current.imageUrl}
            alt={current.label}
            className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,34,24,0.34)] via-[rgba(20,34,24,0.06)] to-transparent pointer-events-none" />
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
                className="group relative flex items-center gap-2.5 px-2 py-1.5 rounded-[4px] bg-[rgba(255,255,255,0.62)] backdrop-blur-[8px] border border-[rgba(255,255,255,0.68)] shadow-[0_1px_6px_rgba(31,65,46,0.08)] cursor-pointer transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[1px] hover:bg-[rgba(255,255,255,0.76)] hover:shadow-[0_2px_8px_rgba(31,65,46,0.1)] overflow-hidden animate-fade-blur-in opacity-0"
                style={{ animationDelay: `${delay}ms` }}
                role="listitem"
              >
                <div className="flex items-center justify-center w-7 h-7 shrink-0 rounded-[4px] bg-[rgba(47,111,78,0.08)] border border-[rgba(47,111,78,0.14)] transition-all duration-[240ms] group-hover:bg-[rgba(47,111,78,0.12)] group-hover:scale-[1.03] relative z-10">
                  <CheckCircleOutlineIcon
                    sx={{ fontSize: 16 }}
                    className="text-[#2F6F4E]"
                  />
                </div>

                <span className="text-[13px] font-semibold text-[#4f5b53] leading-tight transition-colors duration-[240ms] group-hover:text-[#142218] relative z-10">
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
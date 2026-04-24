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

      <div className="px-3 py-4 flex flex-col gap-4">
        <div 
          className="relative w-full h-[160px] rounded-[8px] overflow-hidden group shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-[rgba(255,255,255,0.4)] animate-fade-blur-in opacity-0"
          style={{ animationDelay: '40ms' }}
        >
          <img
            src={current.imageUrl}
            alt={current.label}
            className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.4)] via-[rgba(0,0,0,0.05)] to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4">
            <span className="text-[14px] font-bold text-[#FFFFFF] tracking-wide drop-shadow-md">
              {current.label} Highlights
            </span>
          </div>
        </div>

        <ul className="flex flex-col gap-2.5" role="list" aria-label={`${current.label} amenities`}>
          {current.items.map((item, index) => {
            const delay = 80 + index * 40;
            return (
              <li
                key={item}
                className="flex items-center gap-3 px-3 py-2.5 rounded-[8px] bg-[#ECECE8] shadow-[3px_3px_6px_#CBCBC7,-3px_-3px_6px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] transition-shadow duration-200 animate-fade-blur-in opacity-0"
                style={{ animationDelay: `${delay}ms` }}
                role="listitem"
              >
                <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.5)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none z-10" />

                <div className="flex items-center justify-center w-7 h-7 shrink-0 rounded-[8px] bg-[#ECECE8] shadow-[2px_2px_4px_#CBCBC7,-2px_-2px_4px_#FFFFFF]">
                  <CheckCircleOutlineIcon
                    sx={{ fontSize: 16 }}
                    className="text-[#2F6F4E]"
                  />
                </div>

                <span className="text-[13px] font-semibold text-[#1A2B22] leading-tight">
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-2 pb-6">
        <AskSeller initialQuestions={amenitiesAskSellerQuestions} />
      </div>

    </div>
  );
};

export default AmenitiesSection;
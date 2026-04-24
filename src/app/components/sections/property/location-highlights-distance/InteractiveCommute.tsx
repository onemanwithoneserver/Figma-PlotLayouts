import React, { useState } from 'react';
import { Icons, INITIAL_TABS, INITIAL_DATA, PlaceItem } from './commuteData';
import SectionTabNav from '../shared/SectionTabNav';

function PlaceIcon({ icon }: { icon: string }) {
  return (
    <div className="flex items-center justify-center w-9 h-9 shrink-0 rounded-[4px] bg-[rgba(47,111,78,0.08)] border border-[rgba(47,111,78,0.15)] transition-all duration-[280ms] group-hover:bg-[rgba(47,111,78,0.15)] group-hover:scale-110 relative z-10 text-[#2F6F4E]">
      {icon === 'school' ? <Icons.School /> :
        icon === 'hospital' ? <Icons.Hospital /> :
          icon === 'tree' ? <Icons.Tree /> :
            icon === 'shopping' ? <Icons.ShoppingBag /> :
              <Icons.Building />}
    </div>
  );
}

function PlaceRow({ item, index }: { item: PlaceItem; index: number }) {
  const delay = 40 + index * 40;

  return (
    <div 
      className="glass group relative flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[2px] hover:scale-[1.01] hover:bg-[rgba(255,255,255,0.85)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden animate-fade-blur-in opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.5)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none z-10" />

      <PlaceIcon icon={item.icon} />
      
      <div className="flex-1 min-w-0 relative z-10">
        <p className="text-[13px] font-bold text-[#1A1F24] truncate transition-colors duration-[280ms]">
          {item.name}
        </p>
        <p className="text-[11px] font-medium text-[#4A5568] mt-[2px] transition-colors duration-[280ms] group-hover:text-[#3d495d]">
          {item.distance}
          <span className="mx-1.5 opacity-40">&middot;</span>
          {item.time} drive
        </p>
      </div>
      
      <div className="flex-shrink-0 text-[#4A5568] transition-colors duration-[280ms] group-hover:text-[#1A6B4A] pr-1 relative z-10 group-hover:translate-x-1">
        <Icons.ChevronRight />
      </div>
    </div>
  );
}

export default function InteractiveCommute() {
  const [activeTab, setActiveTab] = useState(INITIAL_TABS[0].id);
  const currentData = INITIAL_DATA[activeTab];

  return (
    <div className="w-full">
      <SectionTabNav
        tabs={INITIAL_TABS.map(({ id, label }) => ({ id, label }))}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        layoutId="commute-active-pill"
      />

      <div className="px-2 py-2 flex flex-col gap-2.5">
        <div className="flex flex-col gap-2.5">
          {currentData.items.map((item, index) => (
            <PlaceRow key={item.id} item={item} index={index} />
          ))}
        </div>

    
      </div>


    
    </div>
  );
}
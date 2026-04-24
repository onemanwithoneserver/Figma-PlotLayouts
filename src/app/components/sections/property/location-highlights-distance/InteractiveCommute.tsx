import React, { useState } from 'react';
import { Icons, INITIAL_TABS, INITIAL_DATA, PlaceItem } from './commuteData';
import SectionTabNav from '../shared/SectionTabNav';

function PlaceIcon({ icon }: { icon: string }) {
  return (
    <div className="flex items-center justify-center w-9 h-9 shrink-0 rounded-[8px] bg-[#ECECE8] shadow-[2px_2px_4px_#CBCBC7,-2px_-2px_4px_#FFFFFF] text-[#2F6F4E]">
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
      className="flex items-center gap-3 px-3 py-2.5 rounded-[8px] bg-[#ECECE8] shadow-[3px_3px_6px_#CBCBC7,-3px_-3px_6px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#CBCBC7,inset_-2px_-2px_4px_#FFFFFF] transition-shadow duration-200 cursor-pointer animate-fade-blur-in opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >

      <PlaceIcon icon={item.icon} />
      
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-[#1A2B22] truncate">
          {item.name}
        </p>
        <p className="text-[11px] font-medium text-[#5C6B63] mt-[2px]">
          {item.distance}
          <span className="mx-1.5 opacity-40">&middot;</span>
          {item.time} drive
        </p>
      </div>
      
      <div className="flex-shrink-0 text-[#5C6B63] pr-1">
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

      <div className="px-3 py-4 flex flex-col gap-2.5">
        <div className="flex flex-col gap-2.5">
          {currentData.items.map((item, index) => (
            <PlaceRow key={item.id} item={item} index={index} />
          ))}
        </div>

        {currentData.title && (
          <p 
            className="text-[11px] font-medium text-[#5C6B63] mt-2 px-1 italic animate-fade-blur-in opacity-0"
            style={{ animationDelay: `${40 + currentData.items.length * 40}ms` }}
          >
            * {currentData.title}
          </p>
        )}
      </div>

    </div>
  );
}
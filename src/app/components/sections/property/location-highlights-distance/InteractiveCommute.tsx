import React, { useState } from 'react';
import { Icons, INITIAL_TABS, INITIAL_DATA, PlaceItem } from './commuteData';
import TabNavigation from './TabNavigation';

function PlaceIcon({ icon }: { icon: string }) {
  return (
    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-[7px] bg-[#E8F5E9] text-[#1F7A63]">
      {icon === 'school'   ? <Icons.School /> :
       icon === 'hospital' ? <Icons.Hospital /> :
       icon === 'tree'     ? <Icons.Tree /> :
       icon === 'shopping' ? <Icons.ShoppingBag /> :
       <Icons.Building />}
    </div>
  );
}

function PlaceRow({ item }: { item: PlaceItem }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-[7px] bg-white border border-neutral-200 cursor-pointer hover:bg-neutral-50 transition-colors">
      <PlaceIcon icon={item.icon} />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#1A1A1A] truncate">{item.name}</p>
        <p className="text-[11px] font-medium text-neutral-500 mt-0.5">
          {item.distance}
          <span className="mx-1 text-neutral-300">&middot;</span>
          {item.time} drive
        </p>
      </div>
      <div className="flex-shrink-0 text-neutral-400">
        <Icons.ChevronRight />
      </div>
    </div>
  );
}

export default function InteractiveCommute() {
  const [activeTab, setActiveTab] = useState(INITIAL_TABS[0].id);
  const currentData = INITIAL_DATA[activeTab];

  return (
    <div className="font-['Outfit',_sans-serif]">
      <TabNavigation
        tabs={INITIAL_TABS}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />

      <div className="px-3 pt-3 pb-2">
        <div className="flex flex-col gap-1.5">
          {currentData.items.map((item) => (
            <PlaceRow key={item.id} item={item} />
          ))}
        </div>

        {currentData.title && (
          <p className="text-[10px] font-medium text-[#6B5E57] mt-2 px-0.5">
            * {currentData.title}
          </p>
        )}
      </div>
    </div>
  );
}

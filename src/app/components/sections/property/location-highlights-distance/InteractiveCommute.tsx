import React, { useState } from 'react';
import { Icons, INITIAL_TABS, INITIAL_DATA, PlaceItem } from './commuteData';
import SectionTabNav from '../shared/SectionTabNav';

function PlaceIcon({ icon }: { icon: string }) {
  return (
    <div className="w-[34px] h-[34px] flex-shrink-0 flex items-center justify-center rounded-[8px] bg-[rgba(255,255,255,0.8)] border border-[var(--color-border)] text-[var(--color-secondary)] transition-all duration-200 group-hover:bg-[rgba(255,255,255,0.2)] group-hover:border-[rgba(255,255,255,0.2)] group-hover:text-[var(--color-bg-white)]">
      {icon === 'school' ? <Icons.School /> :
        icon === 'hospital' ? <Icons.Hospital /> :
          icon === 'tree' ? <Icons.Tree /> :
            icon === 'shopping' ? <Icons.ShoppingBag /> :
              <Icons.Building />}
    </div>
  );
}

function PlaceRow({ item }: { item: PlaceItem }) {
  return (
    <div className="group flex items-center gap-2.5 p-2 rounded-[9px] bg-[var(--color-bg-soft)] border border-[var(--color-bg-mid)] cursor-pointer transition-all duration-200 ease-out hover:bg-[var(--color-secondary)] hover:border-[var(--color-secondary)] hover:translate-x-1 hover:shadow-[var(--glass-shadow)]">
      <PlaceIcon icon={item.icon} />
      <div className="flex-1 min-w-0">
        <p className="text-[12.5px] font-bold text-[var(--color-text-primary)] truncate transition-colors duration-200 group-hover:text-[var(--color-bg-white)]">{item.name}</p>
        <p className="text-[10.5px] font-medium text-[var(--color-text-muted)] mt-[1px] transition-colors duration-200 group-hover:text-[var(--color-bg-white)]">
          {item.distance}
          <span className="mx-1 opacity-50">&middot;</span>
          {item.time} drive
        </p>
      </div>
      <div className="flex-shrink-0 text-[var(--color-text-muted)] transition-colors duration-200 group-hover:text-[rgba(255,255,255,0.5)] pr-1">
        <Icons.ChevronRight />
      </div>
    </div>
  );
}

export default function InteractiveCommute() {
  const [activeTab, setActiveTab] = useState(INITIAL_TABS[0].id);
  const currentData = INITIAL_DATA[activeTab];

  return (
    <div className="font-outfit">
      <SectionTabNav
        tabs={INITIAL_TABS.map(({ id, label }) => ({ id, label }))}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        layoutId="commute-active-pill"
      />

      <div className="px-3 pt-3 pb-2 flex flex-col gap-1.5">
        <div className="flex flex-col gap-1.5">
          {currentData.items.map((item) => (
            <PlaceRow key={item.id} item={item} />
          ))}
        </div>

        {currentData.title && (
          <p className="text-[9.5px] font-medium text-[var(--color-text-muted)] mt-2 px-0.5 italic">
            * {currentData.title}
          </p>
        )}
      </div>
    </div>
  );
}
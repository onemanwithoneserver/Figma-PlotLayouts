import React, { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SectionTabNav from '../shared/SectionTabNav';
import AskSeller from '../shared/AskSeller';
import { AMENITY_TABS, amenitiesAskSellerQuestions } from './data';

const AmenitiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(AMENITY_TABS[0].id);
  const current = AMENITY_TABS.find((t) => t.id === activeTab)!;

  return (
    <div>
      <SectionTabNav
        tabs={AMENITY_TABS.map(({ id, label }) => ({ id, label }))}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        layoutId="amenity-active-pill"
      />

      <div className="px-3 py-3 flex flex-col gap-3 font-outfit">
        <div className="relative w-full h-[130px] rounded-[var(--radius-md)] overflow-hidden group">
          <img
            src={current.imageUrl}
            alt={current.label}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/40 to-transparent pointer-events-none" />
        </div>

        <ul className="flex flex-col gap-1.5" role="list" aria-label={`${current.label} amenities`}>
          {current.items.map((item) => (
            <li
              key={item}
              className="group flex items-center gap-2 px-2.5 py-2 bg-[var(--color-bg-soft)] border border-[var(--color-bg-mid)] rounded-lg text-[0.75rem] font-semibold text-[var(--color-text-secondary)] cursor-pointer transition-all duration-200 hover:bg-[var(--color-secondary)] hover:border-[var(--color-secondary)] hover:text-white hover:translate-x-1"
              role="listitem"
            >
              <CheckCircleOutlineIcon
                sx={{ fontSize: 14 }}
                className="text-[var(--color-secondary)] group-hover:text-white transition-colors duration-200 flex-shrink-0"
              />
              <span className="leading-tight">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <AskSeller initialQuestions={amenitiesAskSellerQuestions} />
    </div>
  );
};

export default AmenitiesSection;
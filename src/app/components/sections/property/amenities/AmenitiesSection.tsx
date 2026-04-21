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

      <div className="px-3 py-3 flex flex-col gap-4">
        {/* Category image */}
        <div className="w-full h-48 sm:h-64 rounded-[var(--radius-md)] overflow-hidden bg-[var(--bg-section-light)] shadow-sm">
          <img
            src={current.imageUrl}
            alt={current.label}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Amenity checklist */}
        <ul className="flex flex-col gap-2.5" role="list" aria-label={`${current.label} amenities`}>
          {current.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5" role="listitem">
              <CheckCircleOutlineIcon sx={{ fontSize: 16, color: 'var(--accent-primary)', mt: '2px', flexShrink: 0 }} />
              <span className="text-[0.8125rem] font-medium text-[var(--text-primary)] leading-[1.4]">
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
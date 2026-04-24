import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SectionTabNav from '../shared/SectionTabNav';
import { AMENITY_TABS, amenitiesAskSellerQuestions } from './data';
import AskSeller from '../shared/AskSeller';

const AmenitiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(AMENITY_TABS[0].id);
  const current = AMENITY_TABS.find((t) => t.id === activeTab)!;

  // Framer Motion variants for clean, staggered animations on tab switch
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, filter: 'blur(6px)', y: 10 },
    show: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <div className="w-full">
      <SectionTabNav
        tabs={AMENITY_TABS.map(({ id, label }) => ({ id, label }))}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        layoutId="amenity-active-pill"
      />

      <div className="px-2 py-2 flex flex-col gap-4">
        {/* Image Header */}
        <motion.div 
          key={`img-${current.id}`} // Forces re-animation when tab changes
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="relative w-full h-[160px] rounded-lg overflow-hidden group shadow-[0_2px_8px_rgba(26,107,74,0.06)] border border-[#E2E8F0]"
        >
          <img
            src={current.imageUrl}
            alt={current.label}
            className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
          {/* Adjusted gradient to use the new Text Primary color for deep contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/70 via-[#1A1A2E]/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-2 left-3">
            <span className="text-[14px] font-bold text-white tracking-wide drop-shadow-md">
              {current.label} Highlights
            </span>
          </div>
        </motion.div>

        {/* Amenities List */}
        <motion.ul 
          key={`list-${current.id}`} // Forces re-animation when tab changes
          className="flex flex-col gap-2" 
          role="list" 
          aria-label={`${current.label} amenities`}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {current.items.map((item) => (
            <motion.li
              key={item}
              variants={itemVariants}
              className="bg-white/60 backdrop-blur-md border border-white/70 group relative flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer transition-all duration-300 ease-out hover:-translate-y-[1px] hover:bg-white/85 hover:shadow-[0_4px_12px_rgba(26,107,74,0.08)] overflow-hidden"
              role="listitem"
            >
              <div className="flex items-center justify-center w-7 h-7 shrink-0 rounded bg-[#D4F5E7]/50 border border-[#1A6B4A]/10 transition-all duration-300 group-hover:bg-[#D4F5E7] group-hover:scale-105 relative z-10">
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 16 }}
                  className="text-[#1A6B4A]"
                />
              </div>

              <span className="text-[13px] font-semibold text-[#4A5568] leading-tight transition-colors duration-300 group-hover:text-[#1A1A2E] relative z-10">
                {item}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <AskSeller initialQuestions={amenitiesAskSellerQuestions} headingIconName="ask-seller" />
      </div>
    </div>
  );
};

export default AmenitiesSection;
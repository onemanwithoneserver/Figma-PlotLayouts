import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icons, INITIAL_TABS, INITIAL_DATA, PlaceItem } from './commuteData';
import SectionTabNav from '../shared/SectionTabNav';

// Framer Motion Variants for staggered list animations
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

function PlaceIcon({ icon }: { icon: string }) {
  return (
    <div className="flex items-center justify-center w-9 h-9 shrink-0 rounded-[4px] bg-[#D4F5E7]/50 border border-[#1A6B4A]/10 transition-all duration-[280ms] group-hover:bg-[#D4F5E7] group-hover:scale-110 relative z-10 text-[#1A6B4A]">
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
    <motion.div 
      variants={itemVariants}
      className="group relative flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/60 backdrop-blur-md border border-[#E2E8F0] shadow-[0_2px_8px_rgba(26,107,74,0.06)] cursor-pointer transition-all duration-300 ease-out hover:-translate-y-[2px] hover:scale-[1.01] hover:bg-white/90 hover:shadow-[0_6px_16px_rgba(26,107,74,0.12)] overflow-hidden"
    >
      {/* Shine Effect */}
      <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none z-10" />

      <PlaceIcon icon={item.icon} />
      
      <div className="flex-1 min-w-0 relative z-10">
        <p className="text-[13px] font-bold text-[#1A1A2E] truncate transition-colors duration-300">
          {item.name}
        </p>
        <p className="text-[11px] font-medium text-[#4A5568] mt-[2px] transition-colors duration-300 group-hover:text-[#1A1A2E]">
          {item.distance}
          <span className="mx-1.5 opacity-40">&middot;</span>
          {item.time} drive
        </p>
      </div>
      
      <div className="flex-shrink-0 text-[#4A5568] transition-all duration-300 group-hover:text-[#1A6B4A] pr-1 relative z-10 group-hover:translate-x-1">
        <Icons.ChevronRight />
      </div>
    </motion.div>
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
        {/* The key prop ensures the container re-mounts/re-animates when the tab changes */}
        <motion.div 
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-2.5"
        >
          {currentData.items.map((item) => (
            <PlaceRow key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
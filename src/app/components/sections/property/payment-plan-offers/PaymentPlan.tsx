import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTabNav from '../shared/SectionTabNav';
import { PLOTS, DEV_CHARGES, LEGAL_CHARGES, BOOKING_STEPS, PAYMENT_TABS, fmtINR, paymentAskSellerQuestions } from './data';
import type { Plot } from './data';
import type { PricingTier } from '../../../../types/plot';
import AskSeller from '../shared/AskSeller';

const getSqYdFromSize = (size: Plot['size']) => Number.parseInt(size, 10);

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

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)' }}
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SizeDropdown = ({ value, onChange }: { value: Plot; onChange: (p: Plot) => void }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative mb-3 z-[100]">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        className="bg-white/60 backdrop-blur-md rounded-lg border border-[#E2E8F0] shadow-sm group flex items-center justify-between w-full px-3 py-2.5 focus:outline-none focus:border-[#1A6B4A] transition-all duration-300 ease-out hover:bg-white/85 hover:shadow-[0_4px_12px_rgba(26,107,74,0.08)] overflow-hidden relative"
      >
        <div className="flex items-center gap-2 relative z-10">
          <span className="text-[12px] font-semibold text-[#4A5568] tracking-[0.05em] transition-colors">Plot Size</span>
          <span className="h-3 w-px bg-[#E2E8F0]" />
          <span className="text-[14px] font-bold text-[#1A1A2E] tracking-tight">{value.label}</span>
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <span className="text-[12px] font-semibold text-[#2563EB]">
            ₹{value.pricePerSqYd.toLocaleString('en-IN')} / Sq.Yd
          </span>
          <span className="text-[#1A6B4A]">
            <ChevronDown open={open} />
          </span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            role="listbox"
            aria-label="Select plot size"
            className="bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-[0_8px_24px_rgba(26,107,74,0.12)] rounded-lg absolute z-[100] top-full mt-1 w-full overflow-hidden"
          >
            {PLOTS.map((plot) => {
              const isSelected = plot.size === value.size;
              return (
                <li
                  key={plot.size}
                  role="option"
                  onClick={() => { onChange(plot); setOpen(false); }}
                  className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors duration-200 ${isSelected ? 'bg-[#D4F5E7]/50' : 'hover:bg-[#F5F7FA]'}`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-200 ${isSelected ? 'bg-[#1A6B4A] scale-110 shadow-[0_0_6px_rgba(26,107,74,0.34)]' : 'bg-[#E2E8F0]'}`}
                    />
                    <span className={`text-[13px] font-bold tracking-tight ${isSelected ? 'text-[#1A6B4A]' : 'text-[#1A1A2E]'}`}>
                      {plot.label}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className={`text-[13px] font-bold ${plot.available ? 'text-[#2563EB]' : 'text-[#F5A623]'}`}>
                      ₹{(plot.totalPrice / 100000).toFixed(1)}L
                    </p>
                    <p className={`text-[11px] font-medium ${plot.available ? 'text-[#4A5568]' : 'text-[#F5A623]'}`}>
                      {plot.available ? `₹${plot.pricePerSqYd.toLocaleString('en-IN')} / Sq.Yd` : 'Unavailable'}
                    </p>
                  </div>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingRow = ({ tier }: { tier: PricingTier }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -2 }}
    className="rounded-lg border border-[#E2E8F0] bg-white/60 shadow-sm backdrop-blur p-3 transition-colors hover:bg-white/85 hover:border-[#1A6B4A]/20"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-[#1A1A2E]">{tier.label}</p>
        <p className="text-xs text-[#4A5568]">{tier.dimensions}</p>
      </div>
      <p className="text-sm font-bold text-[#1A1A2E]">₹{tier.pricePerSqYd.toLocaleString('en-IN')}/sq yd</p>
    </div>
  </motion.div>
);

const PriceTab = ({ isLoading }: { isLoading: boolean }) => (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    animate="show"
    className="flex flex-col overflow-hidden"
  >
    {isLoading
      ? Array.from({ length: 4 }).map((_, i) => (
          <div key={`price-skeleton-${i}`} className="px-3 py-2.5">
            <div className="skeleton h-[16px] w-[52%] mb-2" />
            <div className="skeleton h-[12px] w-[34%]" />
          </div>
        ))
      : PLOTS.map((plot) => (
          <div key={plot.size} className="px-2 py-1.5">
            <PricingRow tier={plot} />
          </div>
        ))}
    <motion.div variants={itemVariants} className="px-3 py-1.5 border-t border-[#E2E8F0] mt-2">
      <p className="text-[11px] font-medium text-[#4A5568] italic text-center">
        * GST, registration &amp; development charges extra
      </p>
    </motion.div>
  </motion.div>
);

const CostTab = ({ selected, onSelect }: { selected: Plot; onSelect: (p: Plot) => void }) => {
  const plotCost = selected.totalPrice;
  const plotSqYd = getSqYdFromSize(selected.size);
  const gst = Math.round(plotCost * 0.05);
  const regCharges = Math.round(plotCost * 0.01);
  const total = plotCost + gst + regCharges + DEV_CHARGES + LEGAL_CHARGES;

  const items = [
    { label: `Plot Cost (${plotSqYd} Sq.Yd)`, value: fmtINR(plotCost) },
    { label: 'GST (5%)', value: fmtINR(gst) },
    { label: 'Registration Charges (1%)', value: fmtINR(regCharges) },
    { label: 'Development Charges', value: fmtINR(DEV_CHARGES) },
    { label: 'Documentation / Legal', value: fmtINR(LEGAL_CHARGES) },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col relative z-[100]"
    >
      <motion.div variants={itemVariants} className="relative z-[100]">
        <SizeDropdown value={selected} onChange={onSelect} />
      </motion.div>

      <motion.div variants={itemVariants} className="relative z-10 bg-white/60 backdrop-blur-md rounded-lg border border-[#E2E8F0] shadow-sm px-3 py-1.5 mb-3">
        {items.map((row, i) => (
          <div key={row.label}>
            <div className="flex items-center justify-between py-2">
              <p className="text-[13px] font-semibold text-[#4A5568]">{row.label}</p>
              <p className="text-[13px] font-bold text-[#1A1A2E] tracking-tight">{row.value}</p>
            </div>
            {i < items.length - 1 && <div className="h-[1px] bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent w-full" />}
          </div>
        ))}
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="relative z-10 flex items-center justify-between px-3 py-3 rounded-[8px] bg-[#1A6B4A] shadow-[0_4px_12px_rgba(26,107,74,0.25)] transition-all duration-300 hover:-translate-y-[1px]"
      >
        <p className="text-[14px] font-semibold text-[#FFFFFF] tracking-wide relative z-20">Total (approx.)</p>
        <p className="text-[20px] font-bold text-[#FFFFFF] tracking-tight relative z-20">{fmtINR(total)}</p>
      </motion.div>

      <motion.p variants={itemVariants} className="text-[11px] font-medium text-[#4A5568] mt-2 italic text-center relative z-10">
        * Varies based on unit selection &amp; statutory charges
      </motion.p>
    </motion.div>
  );
};

const BookingTab = () => (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    animate="show"
    className="flex flex-col gap-2"
  >
    {BOOKING_STEPS.map((row) => (
      <motion.div
        key={row.label}
        variants={itemVariants}
        className="bg-white/60 backdrop-blur-md rounded-lg border border-[#E2E8F0] shadow-sm group relative flex items-start gap-3 px-3 py-2.5 transition-all duration-300 ease-out hover:-translate-y-[1px] hover:bg-white/85 hover:shadow-[0_4px_12px_rgba(26,107,74,0.08)] overflow-hidden"
      >
        <span className="text-[12px] font-bold text-[#1A6B4A] bg-[#D4F5E7]/50 border border-[#1A6B4A]/10 w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-[8px] group-hover:bg-[#D4F5E7] group-hover:scale-105 transition-all duration-300 relative z-20">
          {row.step}
        </span>
        
        <div className="flex-1 min-w-0 relative z-20">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[14px] font-bold text-[#1A1A2E] tracking-tight">{row.label}</p>
            <p className="text-[13px] font-extrabold text-[#1A1A2E] flex-shrink-0 tracking-tight">
              {row.value}
            </p>
          </div>
          <p className="text-[12px] font-medium text-[#4A5568] mt-0.5 leading-snug">{row.note}</p>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

const PaymentPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState(PAYMENT_TABS[0].id);
  const [selectedPlot, setSelectedPlot] = useState<Plot>(PLOTS[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 550);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      <SectionTabNav
        tabs={PAYMENT_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        layoutId="payment-active-pill"
      />
      <div className="px-2 py-3 relative z-[50]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'price' && <PriceTab isLoading={isLoading} />}
            {activeTab === 'cost' && <CostTab selected={selectedPlot} onSelect={setSelectedPlot} />}
            {activeTab === 'booking' && <BookingTab />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-0 pb-1 relative z-10">
        <AskSeller initialQuestions={paymentAskSellerQuestions} headingIconName="ask-seller" />
      </div>
    </div>
  );
};

export default PaymentPlan;
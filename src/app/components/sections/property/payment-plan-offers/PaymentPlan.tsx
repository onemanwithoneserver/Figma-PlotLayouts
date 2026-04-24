import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTabNav from '../shared/SectionTabNav';
import { PLOTS, DEV_CHARGES, LEGAL_CHARGES, BOOKING_STEPS, PAYMENT_TABS, fmtINR, paymentAskSellerQuestions } from './data';
import type { Plot } from './data';
import type { PricingTier } from '../../../../types/plot';
import AskSeller from '../shared/AskSeller';

const getSqYdFromSize = (size: Plot['size']) => Number.parseInt(size, 10);

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
    <div ref={ref} className="relative mb-3 z-30">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        className="glass-elevated group flex items-center justify-between w-full px-3 py-2.5 focus:outline-none focus:border-[#1A6B4A] transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(255,255,255,0.76)] hover:shadow-[0_2px_8px_rgba(31,65,46,0.1)] overflow-hidden relative"
      >
        <div className="flex items-center gap-2 relative z-10">
          <span className="text-[12px] font-semibold text-[#5a665e]  tracking-[0.05em] group-hover:text-[#46524a] transition-colors">Plot Size</span>
          <span className="h-3 w-px bg-[rgba(0,0,0,0.1)]" />
          <span className="text-[14px] font-bold text-[#142218] tracking-tight">{value.label}</span>
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <span className="text-[12px] font-semibold text-[#4f5b53]">
            ₹{value.pricePerSqYd.toLocaleString('en-IN')} / Sq.Yd
          </span>
          <span className="text-[#1A6B4A]">
            <ChevronDown open={open} />
          </span>
        </div>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select plot size"
          className="glass-elevated absolute z-40 top-full mt-1 w-full overflow-hidden animate-fade-blur-in opacity-0"
        >
          {PLOTS.map((plot) => {
            const isSelected = plot.size === value.size;
            return (
              <li
                key={plot.size}
                role="option"
                onClick={() => { onChange(plot); setOpen(false); }}
                className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors duration-[240ms] ${isSelected ? 'bg-[rgba(47,111,78,0.08)]' : 'hover:bg-[rgba(255,255,255,0.9)]'}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-[240ms] ${isSelected ? 'bg-[#2F6F4E] scale-110 shadow-[0_0_6px_rgba(47,111,78,0.34)]' : 'bg-[#a9b6ad]'}`}
                  />
                  <span className={`text-[13px] font-bold tracking-tight ${isSelected ? 'text-[#1A6B4A]' : 'text-[#1A1A2E]'}`}>
                    {plot.label}
                  </span>
                </div>
                <div className="text-right">
                  <p className={`text-[13px] font-bold ${plot.available ? (isSelected ? 'text-[#1A6B4A]' : 'text-[#1A1A2E]') : 'text-[#C53030]'}`}>
                    ₹{(plot.totalPrice / 100000).toFixed(1)}L
                  </p>
                  <p className={`text-[11px] font-medium ${plot.available ? 'text-[#5a665e]' : 'text-[#C53030]'}`}>
                    {plot.available ? `₹${plot.pricePerSqYd.toLocaleString('en-IN')} / Sq.Yd` : 'Unavailable'}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const PricingRow = ({ tier }: { tier: PricingTier }) => (
  <motion.div
    whileHover={{ y: -2 }}
    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    className="rounded-lg border border-white/40 bg-white/65 backdrop-blur p-3"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-[#1A1A2E]">{tier.label}</p>
        <p className="text-xs text-[#4A5568]">{tier.dimensions}</p>
      </div>
      <p className="text-sm font-bold text-primary">₹{tier.pricePerSqYd.toLocaleString('en-IN')}/sq yd</p>
    </div>
  </motion.div>
);

const PriceTab = ({ isLoading }: { isLoading: boolean }) => (
  <div className="glass-elevated flex flex-col animate-fade-blur-in opacity-0 overflow-hidden">
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
    <div className="bg-[rgba(0,0,0,0.02)] px-3 py-1.5 border-t border-[rgba(0,0,0,0.04)]">
      <p className="text-[11px] font-medium text-[#5a665e] italic">
        * GST, registration &amp; development charges extra
      </p>
    </div>
  </div>
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
    <div className="flex flex-col animate-fade-blur-in opacity-0" style={{ animationDelay: '40ms' }}>
      <SizeDropdown value={selected} onChange={onSelect} />

      <div className="glass-elevated px-3 py-1.5 mb-3">
        {items.map((row, i) => (
          <div key={row.label}>
            <div className="flex items-center justify-between py-2">
              <p className="text-[13px] font-semibold text-[#4f5b53]">{row.label}</p>
              <p className="text-[13px] font-bold text-[#1A1A2E] tracking-tight">{row.value}</p>
            </div>
            {i < items.length - 1 && <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.06)] to-transparent w-full" />}
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-between px-3 py-3 rounded-[8px] bg-[#1A6B4A] shadow-[0_2px_8px_rgba(31,65,46,0.22)] transition-all duration-[240ms] hover:-translate-y-[1px]">
        <p className="text-[14px] font-semibold text-[#FFFFFF] tracking-wide relative z-20">Total (approx.)</p>
        <p className="text-[20px] font-bold text-[#FFFFFF] tracking-tight relative z-20">{fmtINR(total)}</p>
      </div>

      <p className="text-[11px] font-medium text-[#5a665e] mt-2 italic text-center">
        * Varies based on unit selection &amp; statutory charges
      </p>
    </div>
  );
};

const BookingTab = () => (
  <div className="flex flex-col gap-2">
    {BOOKING_STEPS.map((row, index) => {
      const delay = 40 + index * 40;
      return (
        <div
          key={row.label}
          className="glass-elevated group relative flex items-start gap-3 px-3 py-2.5 transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[1px] hover:bg-[rgba(255,255,255,0.76)] hover:shadow-[0_2px_8px_rgba(31,65,46,0.1)] overflow-hidden animate-fade-blur-in opacity-0"
          style={{ animationDelay: `${delay}ms` }}
        >
          <span className="text-[12px] font-bold text-[#2F6F4E] bg-[rgba(47,111,78,0.08)] border border-[rgba(47,111,78,0.14)] w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-[8px] group-hover:bg-[rgba(47,111,78,0.12)] group-hover:scale-[1.03] transition-all duration-[240ms] relative z-20">
            {row.step}
          </span>
          
          <div className="flex-1 min-w-0 relative z-20">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[14px] font-bold text-[#142218] transition-colors duration-[240ms] tracking-tight">{row.label}</p>
              <p className="text-[13px] font-bold text-[#B84B2C] flex-shrink-0 tracking-tight transition-transform duration-[240ms] group-hover:scale-[1.02]">{row.value}</p>
            </div>
            <p className="text-[12px] font-medium text-[#5a665e] mt-0.5 leading-snug transition-colors duration-[240ms] group-hover:text-[#46524a]">{row.note}</p>
          </div>
        </div>
      );
    })}
  </div>
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
      <div className="px-2 py-3">
        {activeTab === 'price' && <PriceTab isLoading={isLoading} />}
        {activeTab === 'cost' && <CostTab selected={selectedPlot} onSelect={setSelectedPlot} />}
        {activeTab === 'booking' && <BookingTab />}
      </div>

      <div className="px-0 pb-1">
        <AskSeller initialQuestions={paymentAskSellerQuestions} headingIconName="ask-seller" />
      </div>
    </div>
  );
};

export default PaymentPlan;
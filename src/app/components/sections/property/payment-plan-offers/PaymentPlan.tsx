import React, { useState, useRef, useEffect } from 'react';
import SectionTabNav from '../shared/SectionTabNav';

type Plot = { size: string; sqYd: number; pricePerSqYd: number };

const PLOTS: Plot[] = [
  { size: '100 Sq.Yd', sqYd: 100, pricePerSqYd: 18000 },
  { size: '150 Sq.Yd', sqYd: 150, pricePerSqYd: 17500 },
  { size: '200 Sq.Yd', sqYd: 200, pricePerSqYd: 16800 },
  { size: '240 Sq.Yd', sqYd: 240, pricePerSqYd: 16000 },
];

const DEV_CHARGES = 150000;
const LEGAL_CHARGES = 15000;

function fmtINR(n: number): string {
  return 'Rs. ' + n.toLocaleString('en-IN');
}

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
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
    <div ref={ref} className="relative mb-3">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open ? 'true' : 'false'}
        className="flex items-center justify-between w-full px-3 py-2.5 rounded-[5px] bg-white border border-[#E5DFD4] focus:outline-none focus:border-[#E76F26] transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-[#6B5E57]">Plot Size</span>
          <span className="h-3 w-px bg-[#E5DFD4]" />
          <span className="text-[13px] font-semibold text-[#322822]">{value.size}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-[#6B5E57]">
            Rs. {value.pricePerSqYd.toLocaleString('en-IN')}/Sq.Yd
          </span>
          <span className="text-[#6B5E57]">
            <ChevronDown open={open} />
          </span>
        </div>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select plot size"
          className="absolute z-20 top-full mt-1 w-full rounded-[5px] bg-white border border-[#E5DFD4] shadow-lg overflow-hidden"
        >
          {PLOTS.map((plot) => {
            const isSelected = plot.size === value.size;
            return (
              <li
                key={plot.size}
                role="option"
                aria-selected={isSelected ? 'true' : 'false'}
                onClick={() => { onChange(plot); setOpen(false); }}
                className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#FFF4EC]' : 'hover:bg-[#FAFAF8]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: isSelected ? '#E76F26' : 'transparent' }}
                  />
                  <span className={`text-[13px] font-semibold ${isSelected ? 'text-[#E76F26]' : 'text-[#322822]'}`}>
                    {plot.size}
                  </span>
                </div>
                <div className="text-right">
                  <p className={`text-[12px] font-bold ${isSelected ? 'text-[#E76F26]' : 'text-[#322822]'}`}>
                    Rs. {((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
                  </p>
                  <p className="text-[10px] text-[#6B5E57]">
                    Rs. {plot.pricePerSqYd.toLocaleString('en-IN')}/Sq.Yd
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

// ---- Price Tab ----
const PriceTab = () => (
  <div className="flex flex-col gap-1.5">
    {PLOTS.map((plot, i, arr) => (
      <div key={plot.size}>
        <div className="flex items-center justify-between px-1 py-2.5">
          <div>
            <p className="text-[13px] font-semibold text-[#322822]">{plot.size} Plot</p>
            <p className="text-[11px] font-medium text-[#6B5E57] mt-0.5">
              Rs. {plot.pricePerSqYd.toLocaleString('en-IN')}/Sq.Yd
            </p>
          </div>
          <p className="text-[15px] font-bold text-[#E76F26]">
            Rs. {((plot.pricePerSqYd * plot.sqYd) / 100000).toFixed(1)}L
          </p>
        </div>
        {i < arr.length - 1 && <div className="h-px bg-[#E5DFD4]" />}
      </div>
    ))}
    <p className="text-[10px] font-medium text-[#6B5E57] mt-1 px-0.5">
      * GST, registration &amp; development charges extra
    </p>
  </div>
);

// ---- Cost Tab ----
const CostTab = ({ selected, onSelect }: { selected: Plot; onSelect: (p: Plot) => void }) => {
  const plotCost = selected.pricePerSqYd * selected.sqYd;
  const gst = Math.round(plotCost * 0.05);
  const regCharges = Math.round(plotCost * 0.01);
  const total = plotCost + gst + regCharges + DEV_CHARGES + LEGAL_CHARGES;

  const items = [
    { label: `Plot Cost (${selected.size})`, value: fmtINR(plotCost) },
    { label: 'GST (5%)', value: fmtINR(gst) },
    { label: 'Registration Charges (1%)', value: fmtINR(regCharges) },
    { label: 'Development Charges', value: fmtINR(DEV_CHARGES) },
    { label: 'Documentation / Legal', value: fmtINR(LEGAL_CHARGES) },
  ];

  return (
    <div className="flex flex-col">
      <SizeDropdown value={selected} onChange={onSelect} />

      {items.map((row, i) => (
        <div key={row.label}>
          <div className="flex items-center justify-between py-2.5">
            <p className="text-[12px] font-medium text-[#6B5E57]">{row.label}</p>
            <p className="text-[12px] font-semibold text-[#322822]">{row.value}</p>
          </div>
          {i < items.length - 1 && <div className="h-px bg-[#E5DFD4]" />}
        </div>
      ))}

      <div className="flex items-center justify-between px-3 py-2.5 rounded-[5px] bg-[#FFF4EC] border border-[#FFD4B2] mt-2">
        <p className="text-[13px] font-semibold text-[#322822]">Total (approx.)</p>
        <p className="text-[15px] font-bold text-[#E76F26]">{fmtINR(total)}</p>
      </div>

      <p className="text-[10px] font-medium text-[#6B5E57] mt-2 px-0.5">
        * Varies based on unit selection &amp; statutory charges
      </p>
    </div>
  );
};

// ---- Booking Tab ----
const BOOKING_STEPS = [
  { step: '01', label: 'Booking Amount',  value: 'Rs. 1,00,000',    note: 'Refundable upon cancellation' },
  { step: '02', label: 'Within 30 Days',  value: '25% of Plot Cost', note: 'After booking confirmation' },
  { step: '03', label: 'On Agreement',    value: '50% of Plot Cost', note: 'Sale agreement execution' },
  { step: '04', label: 'On Registration', value: 'Balance Amount',   note: 'At time of plot registration' },
];

const BookingTab = () => (
  <div className="flex flex-col gap-1.5">
    {BOOKING_STEPS.map((row) => (
      <div
        key={row.label}
        className="flex items-start gap-3 px-3 py-2.5 rounded-[5px] bg-white border border-[#E5DFD4]"
      >
        <span className="mt-0.5 text-[10px] font-bold text-[#E76F26] bg-[#FFF4EC] w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-[4px]">
          {row.step}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13px] font-semibold text-[#322822]">{row.label}</p>
            <p className="text-[12px] font-semibold text-[#E76F26] flex-shrink-0">{row.value}</p>
          </div>
          <p className="text-[10px] font-medium text-[#6B5E57] mt-0.5">{row.note}</p>
        </div>
      </div>
    ))}
  </div>
);

// ---- Root ----
const TABS = [
  { id: 'price',   label: 'Price/Sq.Yd' },
  { id: 'cost',    label: 'Cost' },
  { id: 'booking', label: 'Booking' },
];

const PaymentPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [selectedPlot, setSelectedPlot] = useState<Plot>(PLOTS[0]);

  return (
    <div className="font-['Outfit',_sans-serif]">
      <SectionTabNav
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        layoutId="payment-active-pill"
      />
      <div className="px-3 py-3">
        {activeTab === 'price'   && <PriceTab />}
        {activeTab === 'cost'    && <CostTab    selected={selectedPlot} onSelect={setSelectedPlot} />}
        {activeTab === 'booking' && <BookingTab />}
      </div>
    </div>
  );
};

export default PaymentPlan;
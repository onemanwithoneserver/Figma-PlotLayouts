import React from 'react';

interface CostItem {
  id: string;
  component: string;
  amount: string;
  info: string;
  hasInfoIcon?: boolean;
  highlight?: boolean;
}

const Icons = {
  InfoCircle: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--warning-color-alt)" stroke="none" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  )
};

const COST_BREAKDOWN: CostItem[] = [
  { id: '1', component: 'Base Price', amount: '₹8,200 / sq.ft', info: 'Carpet area basis', hasInfoIcon: true, highlight: true },
  { id: '2', component: 'Floor Rise Charges', amount: '₹3,00,000', info: 'Above 5th floor' },
  { id: '3', component: 'Amenities Charges', amount: '₹3,50,000', info: 'One-time' },
  { id: '4', component: 'Maintenance Deposit', amount: '₹1,20,000', info: '12 months advance', hasInfoIcon: true },
  { id: '5', component: 'Corpus Fund', amount: '₹75,000', info: 'One-time' },
  { id: '6', component: 'Gas Pipeline', amount: '₹35,000', info: 'One-time' },
  { id: '7', component: 'Parking', amount: '₹2,50,000', info: '1 covered slot' },
  { id: '8', component: 'Legal & Documentation', amount: '₹25,000', info: 'Govt + admin' },
  { id: '9', component: 'GST', amount: 'As applicable', info: 'Under-const. only', hasInfoIcon: true },
];

export default function Cost() {
  return (
    <div className="w-full bg-white font-['Outfit',_sans-serif]">
      <div className="px-2 pt-2 pb-1.5">
        <p className="text-[14px] font-medium text-[var(--color-brown-light)]">Transparent breakup of major charges</p>
      </div>

      <div className="px-2 pb-2 flex flex-col gap-1">
        {COST_BREAKDOWN.map((item) => (
          <div
            key={item.id}
            className={`rounded-[5px] px-2 py-1.5 flex items-center justify-between gap-2 ${item.highlight ? 'bg-[var(--warning-color-bg)] border border-[var(--warning-color-light)]' : 'bg-white border border-[var(--bg-muted-dark)]'}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <p className="text-[12px] font-semibold text-[var(--color-brown-dark)]">{item.component}</p>
                {item.highlight && <span className="text-[9px] font-medium text-[var(--warning-color-alt)] bg-[var(--warning-color-bg)] px-1 py-0.5 rounded-[5px]">Key</span>}
              </div>
              <p className="text-[10px] font-medium text-[var(--color-brown-light)] mt-0.5 flex items-center gap-1">
                {item.info}
                {item.hasInfoIcon && (
                  <button
                    aria-label={`More info about ${item.component}`}
                    className="flex-shrink-0 focus-visible:ring-2 focus-visible:ring-[var(--color-brown-dark)]/20 rounded-[5px] outline-none"
                  >
                    <Icons.InfoCircle />
                  </button>
                )}
              </p>
            </div>
            <p className="text-[12px] font-semibold text-[var(--color-brown-dark)] flex-shrink-0 text-right">{item.amount}</p>
          </div>
        ))}
      </div>

      <div className="px-2 pb-2">
        <div className="rounded-[5px] p-2 bg-[var(--warning-color-bg)] border border-[var(--warning-color-light)]">
          <p className="text-[10px] font-medium text-[var(--color-brown-light)] mb-0.5">Estimated Total</p>
          <p className="text-[18px] font-bold text-[var(--color-brown-dark)]">
            ₹1.58 Cr
            <span className="text-[12px] font-medium text-[var(--color-brown-light)] ml-1">to 1.62 Cr</span>
          </p>
          <p className="text-[10px] text-[var(--color-brown-light)] mt-0.5 mb-1.5">*Varies based on unit floor, type & statutory charges</p>
          <button
            className="flex items-center gap-1 bg-[var(--warning-color-alt)] text-white text-[11px] font-semibold px-2 py-1 rounded-[5px] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--warning-color-alt)]/20 focus-visible:outline-none"
            aria-label="View seller-wise pricing breakdown"
          >
            View Seller-wise Pricing
          </button>
        </div>
      </div>

    </div>
  );
}

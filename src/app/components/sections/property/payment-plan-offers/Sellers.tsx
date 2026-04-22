import React from 'react';

interface Seller {
  id: string;
  name: string;
  type: 'Developer' | 'Strategic Partner' | 'Agency';
  rating: number;
  tags: string[];
  isVerified: boolean;
}

const Icons = {
  Verified: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--warning-color-alt)" stroke="white" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Star: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--warning-color-alt)">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  ExternalLink: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  )
};

const SELLERS: Seller[] = [
  {
    id: 's1',
    name: 'Prestige Group Sales',
    type: 'Developer',
    rating: 4.9,
    tags: ['Direct', 'Best Price'],
    isVerified: true
  },
  {
    id: 's2',
    name: 'Anarock Property Consultants',
    type: 'Strategic Partner',
    rating: 4.7,
    tags: ['Bulk Deals', 'Assisted Visit'],
    isVerified: true
  },
];

export default function Sellers() {
  return (
    <div className="w-full bg-white font-['Outfit',_sans-serif] p-2">
      <div className="mb-1.5">
      </div>

      <div className="flex flex-col gap-1.5 mb-2">
        {SELLERS.map((seller) => (
          <article key={seller.id} className="rounded-[5px] bg-white border border-[var(--bg-muted-dark)] overflow-hidden">
            <div className="p-2">
              <div className="flex justify-between items-start gap-2 mb-1.5">
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    <h4 className="text-[13px] font-semibold text-[var(--color-brown-dark)] leading-snug">{seller.name}</h4>
                    {seller.isVerified && (
                      <span title="Verified seller">
                        <Icons.Verified />
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-medium text-[var(--warning-color-alt)] bg-[var(--warning-color-bg)] px-1.5 py-0.5 rounded-[5px]">{seller.type}</span>
                    <div className="flex items-center gap-0.5" aria-label={`Rating: ${seller.rating} out of 5`}>
                      <Icons.Star />
                      <span className="text-[10px] font-semibold text-[var(--color-brown-dark)]">{seller.rating}</span>
                    </div>
                  </div>
                </div>
                <button
                  aria-label={`Visit ${seller.name} profile`}
                  className="flex-shrink-0 flex items-center gap-1 text-[11px] font-medium text-[var(--color-brown-dark)] bg-white border border-[var(--bg-muted-dark)] px-2 py-1 rounded-[5px] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-brown-dark)]/20 focus-visible:outline-none"
                >
                  Profile <Icons.ExternalLink />
                </button>
              </div>

              <div className="flex flex-wrap gap-1">
                {seller.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium text-[var(--color-brown-light)] bg-[var(--bg-offwhite)] px-1.5 py-0.5 rounded-[5px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-[5px] p-2 bg-[var(--warning-color-bg)] border border-[var(--warning-color-light)]">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-medium text-[var(--color-brown-light)] mb-0.5">Starting from</p>
            <p className="text-[17px] font-bold text-[var(--color-brown-dark)]">
              &#x20B9;1.58 Cr
              <span className="text-[11px] font-medium text-[var(--color-brown-light)] ml-1">onwards</span>
            </p>
          </div>
          <button
            aria-label="Get a personalised price quote"
            className="flex-shrink-0 bg-[var(--warning-color-alt)] text-white font-medium text-[11px] px-2 py-1 rounded-[5px] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--warning-color-alt)]/20 focus-visible:outline-none"
          >
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
}

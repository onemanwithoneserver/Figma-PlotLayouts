import React from 'react';
import { Check, X } from 'lucide-react';

interface StatPillProps {
  icon?: string;
  svgIcon?: string;
  label: string;
  value: string;
  valid: boolean;
}

const StatPill: React.FC<StatPillProps> = ({ icon, svgIcon, label, value, valid }) => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center group font-outfit">
      <div className="relative w-[80px] h-[80px] mb-2.5">
        <div className="absolute inset-0 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-white)] flex items-center justify-center shadow-[var(--glass-shadow)] transition-all duration-300 group-hover:shadow-[var(--glass-shadow-hover)] group-hover:scale-105 group-hover:border-[var(--color-secondary)]">
          {svgIcon ? (
            <img src={svgIcon} alt={label} className="w-8 h-8 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
          ) : (
            <span className="text-2xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">{icon}</span>
          )}
        </div>

        <div className={`absolute bottom-0 left-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${valid ? 'bg-[var(--color-success)] shadow-[0_4px_10px_rgba(45,189,96,0.3)]' : 'bg-[var(--color-error)] shadow-[0_4px_10px_rgba(214,48,49,0.3)]'
          }`}>
          {valid ? (
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          ) : (
            <X className="w-4 h-4 text-white" strokeWidth={2.5} />
          )}
        </div>

        <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[var(--color-error)] flex items-center justify-center shadow-[0_4px_10px_rgba(214,48,49,0.3)] transition-all duration-300 group-hover:scale-110">
          <X className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
      </div>

      <p className="text-[13px] font-bold text-[var(--color-text-primary)] text-center drop-shadow-sm transition-colors duration-300 group-hover:text-[var(--color-primary)]">
        {value}
      </p>
    </div>
  );
};

export default StatPill;
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
    <div className="flex-shrink-0 flex flex-col items-center group font-inter animate-fade-blur-in opacity-0">
      {/* Main Glass Circle */}
      <div className="relative w-20 h-20 mb-3">
        <div className="absolute inset-0 rounded-full border border-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] group-hover:scale-105 group-hover:bg-[rgba(255,255,255,0.85)] group-hover:border-[#2F6F4E]/30 overflow-hidden">
          
          {/* Subtle Light Sweep on Hover */}
          <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] transition-all duration-700 group-hover:left-[100%] pointer-events-none" />

          {svgIcon ? (
            <img 
              src={svgIcon} 
              alt={label} 
              className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110 relative z-10" 
            />
          ) : (
            <span className="text-2xl transition-transform duration-300 group-hover:scale-110 relative z-10">
              {icon}
            </span>
          )}
        </div>

        {/* Status Badge - Floating Glass Style */}
        <div 
          className={`absolute bottom-0 right-0 w-7 h-7 rounded-full border border-white flex items-center justify-center transition-all duration-[280ms] shadow-lg z-20 ${
            valid 
              ? 'bg-[#2F6F4E] shadow-[0_4px_12px_rgba(47,111,78,0.3)]' 
              : 'bg-[#C65A3A] shadow-[0_4px_12px_rgba(198,90,58,0.3)]'
          }`}
        >
          {valid ? (
            <Check className="w-4 h-4 text-white" strokeWidth={3.5} />
          ) : (
            <X className="w-4 h-4 text-white" strokeWidth={3.5} />
          )}
        </div>
      </div>

      {/* Value Label */}
      <p className="text-[13px] font-bold text-[#1A1F24] text-center tracking-tight transition-colors duration-200 group-hover:text-[#2F6F4E] ">
        {value}
      </p>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeBlurIn { 
          from { opacity: 0; filter: blur(6px); transform: translateY(12px); } 
          to { opacity: 1; filter: blur(0px); transform: translateY(0); } 
        }
        .animate-fade-blur-in { animation: fadeBlurIn 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}} />
    </div>
  );
};

export default StatPill;
import React from "react";

interface ProjectFileItem {
  id: number;
  label: string;
}

const PROJECT_FILES: ProjectFileItem[] = [
  { id: 1, label: "Brochure" },
  { id: 2, label: "HMDA" },
  { id: 3, label: "RERA" },
  { id: 4, label: "Floor Plans" },
  { id: 5, label: "Price Card" },
];

const PdfIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    aria-hidden="true"
  >
    {/* Page Fold Style */}
    <path
      d="M17 5H32L41 14V42C41 44.209 39.209 46 37 46H17C14.791 46 13 44.209 13 42V9C13 6.791 14.791 5 17 5Z"
      stroke="#2F6F4E"
      strokeWidth="2.5"
      strokeLinejoin="round"
      opacity="0.8"
    />
    <path
      d="M32 5V11.8C32 13.015 32.985 14 34.2 14H41"
      stroke="#2F6F4E"
      strokeWidth="2.5"
      strokeLinejoin="round"
      opacity="0.8"
    />
    {/* Modern PDF Badge */}
    <rect x="3" y="24" width="34" height="12" rx="4" fill="#C65A3A" />
    <text
      x="20"
      y="33"
      textAnchor="middle"
      fill="#ffffff"
      fontSize="8"
      fontWeight="800"
      fontFamily="Outfit, sans-serif"
      letterSpacing="0.5"
    >
      PDF
    </text>
  </svg>
);

const EyeIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ProjectFilesSection: React.FC = () => {
  return (
    <div className="w-full rounded-[8px] bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.6)] px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] animate-fade-blur-in opacity-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-bold text-[#1A1F24] tracking-tight">Project Files</h2>
        
        <button
          type="button"
          className="group flex items-center gap-1.5 rounded-[8px] bg-[#2F6F4E] px-3 py-1.5 text-[11px] font-bold text-[#ffffff] shadow-[0_4px_12px_rgba(47,111,78,0.2)] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(47,111,78,0.3)] active:scale-95 "
        >
          <EyeIcon className="transition-transform duration-[280ms] group-hover:scale-110" />
          view all
        </button>
      </div>

      <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
        <div className="flex min-w-max items-start gap-3">
          {PROJECT_FILES.map((file, index) => (
            <button
              key={file.id}
              type="button"
              className="group flex w-[72px] shrink-0 flex-col items-center justify-center gap-2 rounded-[8px] px-2 py-3 bg-[rgba(255,255,255,0.4)] border border-[rgba(0,0,0,0.05)] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(255,255,255,0.8)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] animate-fade-blur-in opacity-0"
              style={{ animationDelay: `${(index + 1) * 60}ms` }}
            >
              <div className="relative">
                <PdfIcon className="h-10 w-10 transition-transform duration-[280ms] group-hover:scale-110" />
                {/* Subtle Glow behind Icon */}
                <div className="absolute inset-0 bg-[#2F6F4E]/5 blur-xl -z-10 group-hover:bg-[#2F6F4E]/10 transition-colors" />
              </div>
              
              <span className="whitespace-nowrap text-center text-[11px] font-bold tracking-tight text-[#4A5560] transition-colors duration-[280ms] group-hover:text-[#2F6F4E] ">
                {file.label}
              </span>
            </button>
          ))}
        </div>
      </div>


    
    </div>
  );
};

export default ProjectFilesSection;
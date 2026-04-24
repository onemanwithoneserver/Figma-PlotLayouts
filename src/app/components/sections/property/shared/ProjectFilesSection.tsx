import React from "react";
import { motion } from "framer-motion";

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

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, filter: 'blur(6px)', y: 15 },
  show: { 
    opacity: 1, 
    filter: 'blur(0px)', 
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  }
};

const PdfIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    aria-hidden="true"
  >
    {/* Page Fold Style - Using Primary Color */}
    <path
      d="M17 5H32L41 14V42C41 44.209 39.209 46 37 46H17C14.791 46 13 44.209 13 42V9C13 6.791 14.791 5 17 5Z"
      stroke="#1A6B4A"
      strokeWidth="2.5"
      strokeLinejoin="round"
      opacity="0.8"
    />
    <path
      d="M32 5V11.8C32 13.015 32.985 14 34.2 14H41"
      stroke="#1A6B4A"
      strokeWidth="2.5"
      strokeLinejoin="round"
      opacity="0.8"
    />
    {/* Modern PDF Badge - Using Accent Color with Primary Text for contrast */}
    <rect x="3" y="24" width="34" height="12" rx="4" fill="#F5A623" />
    <text
      x="20"
      y="33"
      textAnchor="middle"
      fill="#1A1A2E"
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
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full rounded-[8px] bg-white/60 backdrop-blur-md border border-[#E2E8F0] px-4 py-4 shadow-[0_2px_8px_rgba(26,107,74,0.06)]"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-bold text-[#1A1A2E] tracking-tight">Project Files</h2>
        
        <button
          type="button"
          className="group flex items-center gap-1.5 rounded-[8px] bg-[#1A6B4A] px-3 py-1.5 text-[11px] font-bold text-[#ffffff] shadow-[0_4px_12px_rgba(26,107,74,0.2)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(26,107,74,0.3)] active:scale-95"
        >
          <EyeIcon className="transition-transform duration-300 group-hover:scale-110" />
          view all
        </button>
      </motion.div>

      <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
        <div className="flex min-w-max items-start gap-3 pb-2 pt-1">
          {PROJECT_FILES.map((file) => (
            <motion.button
              variants={itemVariants}
              key={file.id}
              type="button"
              className="group flex w-[72px] shrink-0 flex-col items-center justify-center gap-2 rounded-[8px] px-2 py-3 bg-white/40 border border-[#E2E8F0] transition-all duration-300 ease-out hover:bg-white/85 hover:-translate-y-1 hover:border-[#1A6B4A]/20 hover:shadow-[0_6px_16px_rgba(26,107,74,0.08)] outline-none focus-visible:ring-2 focus-visible:ring-[#1A6B4A]/50"
            >
              <div className="relative">
                <PdfIcon className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#1A6B4A]/5 blur-xl -z-10 group-hover:bg-[#1A6B4A]/15 transition-colors" />
              </div>
              
              <span className="whitespace-nowrap text-center text-[11px] font-bold tracking-tight text-[#4A5568] transition-colors duration-300 group-hover:text-[#1A6B4A]">
                {file.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectFilesSection;
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
    <path
      d="M17 5H32L41 14V42C41 44.209 39.209 46 37 46H17C14.791 46 13 44.209 13 42V9C13 6.791 14.791 5 17 5Z"
      stroke="var(--text-dark)"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
    <path
      d="M32 5V11.8C32 13.015 32.985 14 34.2 14H41"
      stroke="var(--text-dark)"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
    <rect x="3" y="23" width="36" height="14" rx="2.8" fill="var(--error-color-alt)" />
    <text
      x="21"
      y="32.5"
      textAnchor="middle"
      fill="var(--background-color)"
      fontSize="8.8"
      fontWeight="800"
      fontFamily="Arial, Helvetica, sans-serif"
      letterSpacing="0.5"
    >
      PDF
    </text>
  </svg>
);

const EyeIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="13"
    height="13"
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
    <div className="w-full rounded-[5px] bg-[var(--text-dark)] border px-3 py-2">
      <div className="flex items-center justify-between px-1 pb-3 pt-1">
        <h2 className="text-[18px] px-2 font-bold text-white drop-shadow-sm">Project Files</h2>
        <button
  type="button"
  className="group flex items-center gap-1 rounded-[5px] border border-[var(--warning-color)] bg-gradient-to-br from-[var(--warning-color)] to-[var(--warning-color-alt2)] px-2.5 py-1.5 text-[11px] font-bold text-white shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--warning-color)] focus-visible:ring-offset-2"
  title="View"
>
  <EyeIcon className="transition-transform duration-200 group-hover:scale-110" />
  View All
</button>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max items-start gap-1.5">
        {PROJECT_FILES.map((file) => (
          <button
            key={file.id}
            type="button"
            className="group flex w-[64px] shrink-0 flex-col items-center justify-start gap-1.5 rounded-[5px] px-1 py-1.5 text-[var(--color-brown-dark)] bg-white/90 transition-all duration-200 hover:bg-white hover:text-[var(--warning-color)] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--warning-color)]"
          >
            <PdfIcon className="h-11 w-11 transition-transform duration-200 group-hover:scale-105" />
            <span className="whitespace-nowrap text-center text-[11px] font-bold leading-tight text-[var(--color-brown-dark)] transition-colors duration-200 group-hover:text-[var(--warning-color)]">
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
import React from 'react';
import Card from '@mui/material/Card';

interface ContentSectionProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, action, children, className = '' }) => {
  return (
    <Card
      elevation={0}
      className={`font-outfit border border-[var(--color-border)] bg-[var(--color-bg-white)] shadow-sm ${className}`}
      sx={{
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-transparent">
        <h2 className="text-[16px] font-bold text-[var(--color-text-primary)] leading-tight">
          {title}
        </h2>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      <div className="bg-[var(--color-bg-white)]">
        {children}
      </div>
    </Card>
  );
};

export default ContentSection;
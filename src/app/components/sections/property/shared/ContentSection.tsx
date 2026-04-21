import React from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

interface ContentSectionProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, action, children }) => {
  return (
    <Card elevation={0} sx={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-2.5 bg-white">
        <h2 className="text-[0.9375rem] font-bold text-[var(--text-primary)] leading-tight">
          {title}
        </h2>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      <Divider sx={{ borderColor: 'var(--border-subtle)' }} />
      {children}
    </Card>
  );
};

export default ContentSection;

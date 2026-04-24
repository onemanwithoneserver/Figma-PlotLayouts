import React from 'react';

export const SectionSkeleton: React.FC = () => (
  <div className="glass-elevated p-[8px] space-y-[8px]">
    <div className="skeleton h-[16px] w-[62%]" />
    <div className="skeleton h-[12px] w-[42%]" />
    <div className="skeleton h-[84px] w-full" />
  </div>
);

export const OverviewSkeleton: React.FC = () => <SectionSkeleton />;
export const HighlightsSkeleton: React.FC = () => <SectionSkeleton />;
export const PricingSkeleton: React.FC = () => <SectionSkeleton />;
export const TimelineSkeleton: React.FC = () => <SectionSkeleton />;
export const GallerySkeleton: React.FC = () => <SectionSkeleton />;

const InitialLoadingState: React.FC = () => {
  return (
    <div className="w-full px-[8px] pt-[8px] pb-[12px] page-enter">
      <div className="glass-elevated p-[8px] space-y-[8px]">
        <div className="skeleton h-[168px] w-full" />
        <div className="skeleton h-[16px] w-[62%]" />
        <div className="skeleton h-[12px] w-[42%]" />
        <div className="grid grid-cols-3 gap-[8px] pt-[4px]">
          <div className="skeleton h-[56px] w-full" />
          <div className="skeleton h-[56px] w-full" />
          <div className="skeleton h-[56px] w-full" />
        </div>
      </div>

      <div className="mt-[8px] glass-elevated p-[8px] space-y-[8px]">
        <div className="skeleton h-[16px] w-[48%]" />
        <div className="gradient-loader" />
        <div className="flex items-center justify-between">
          <div className="skeleton h-[12px] w-[44%]" />
          <div className="circular-loader" />
        </div>
      </div>
    </div>
  );
};

export default InitialLoadingState;

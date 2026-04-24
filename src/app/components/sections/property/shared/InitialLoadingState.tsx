import React from 'react';

// Helper component for clean, consistent skeleton blocks
const SkeletonBlock: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-[#E2E8F0] animate-pulse rounded-[6px] ${className}`} />
);

export const SectionSkeleton: React.FC = () => (
  <div className="bg-white/60 backdrop-blur-md border border-[#E2E8F0] shadow-sm rounded-lg p-3 space-y-2.5">
    <SkeletonBlock className="h-4 w-[62%]" />
    <SkeletonBlock className="h-3 w-[42%]" />
    <SkeletonBlock className="h-[84px] w-full" />
  </div>
);

export const OverviewSkeleton: React.FC = () => <SectionSkeleton />;
export const HighlightsSkeleton: React.FC = () => <SectionSkeleton />;
export const PricingSkeleton: React.FC = () => <SectionSkeleton />;
export const TimelineSkeleton: React.FC = () => <SectionSkeleton />;
export const GallerySkeleton: React.FC = () => <SectionSkeleton />;

const InitialLoadingState: React.FC = () => {
  return (
    <div className="w-full px-2 pt-2 pb-3">
      {/* Hero Section Skeleton */}
      <div className="bg-white/60 backdrop-blur-md border border-[#E2E8F0] shadow-[0_4px_14px_rgba(26,107,74,0.06)] rounded-lg p-3 space-y-2.5">
        <SkeletonBlock className="h-[168px] w-full rounded-lg" />
        <div className="pt-1">
          <SkeletonBlock className="h-5 w-[62%] mb-2" />
          <SkeletonBlock className="h-3 w-[42%]" />
        </div>
        
        <div className="grid grid-cols-3 gap-2 pt-2">
          <SkeletonBlock className="h-14 w-full" />
          <SkeletonBlock className="h-14 w-full" />
          <SkeletonBlock className="h-14 w-full" />
        </div>
      </div>

      {/* Progress / Secondary Skeleton */}
      <div className="mt-2 bg-white/60 backdrop-blur-md border border-[#E2E8F0] shadow-[0_2px_8px_rgba(26,107,74,0.06)] rounded-lg p-4 space-y-3.5">
        <div className="flex items-center justify-between">
          <SkeletonBlock className="h-4 w-[48%]" />
          <SkeletonBlock className="h-4 w-[15%]" />
        </div>
        
        {/* Simulated Gradient Loader Bar */}
        <div className="h-2.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden flex">
          <div className="h-full w-1/3 bg-[#D4F5E7] animate-pulse" />
        </div>
        
        <div className="flex items-center justify-between pt-0.5">
          <SkeletonBlock className="h-3 w-[44%]" />
          <SkeletonBlock className="h-4 w-4 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default InitialLoadingState;
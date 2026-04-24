import React from 'react';

const InitialLoadingState: React.FC = () => {
  return (
    <div className="w-full px-[8px] pt-[8px] pb-[12px] page-enter">
      <div className="glass-card rounded-[8px] p-[8px] space-y-[8px]">
        <div className="skeleton h-[168px] w-full" />
        <div className="skeleton h-[16px] w-[62%]" />
        <div className="skeleton h-[12px] w-[42%]" />
        <div className="grid grid-cols-3 gap-[8px] pt-[4px]">
          <div className="skeleton h-[56px] w-full" />
          <div className="skeleton h-[56px] w-full" />
          <div className="skeleton h-[56px] w-full" />
        </div>
      </div>

      <div className="mt-[8px] glass-card rounded-[8px] p-[8px] space-y-[8px]">
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

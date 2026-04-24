import React, { useState } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import { videoTourData } from './data';

const VideoTourSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full relative group cursor-pointer overflow-hidden rounded-[8px] bg-[rgba(255,255,255,0.62)] backdrop-blur-[8px] border border-[rgba(255,255,255,0.68)] shadow-[0_1px_6px_rgba(31,65,46,0.08)] animate-fade-blur-in opacity-0">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={videoTourData.thumbnailUrl}
          alt={videoTourData.thumbnailAlt}
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[rgba(20,34,24,0.08)]" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="pointer-events-auto flex flex-col items-center gap-1.5 focus:outline-none"
          aria-label={`Play video tour (${videoTourData.duration})`}
        >
          <div className="w-16 h-16 rounded-[8px] bg-[rgba(255,255,255,0.82)] backdrop-blur-[8px] border border-[rgba(255,255,255,0.7)] flex items-center justify-center shadow-[0_2px_10px_rgba(31,65,46,0.12)] transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04] group-active:scale-[0.98]" 
               style={{ backgroundColor: isPlaying ? 'rgba(47,111,78,0.9)' : undefined }}>
            <PlayCircleOutlineIcon 
              sx={{ fontSize: 36, color: isPlaying ? '#FFFFFF' : '#2F6F4E' }} 
              className="transition-colors duration-200"
            />
          </div>
          
          <span className="text-white text-[11px] font-bold  tracking-[0.08em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] opacity-95 transition-opacity">
            {videoTourData.ctaLabel}
          </span>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[rgba(20,34,24,0.55)] via-[rgba(20,34,24,0.2)] to-transparent flex items-end justify-between px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-all duration-[240ms] translate-y-[2px] group-hover:translate-y-0 z-30">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-[4px] bg-[#2F6F4E] animate-pulse shadow-[0_0_6px_rgba(47,111,78,0.7)]" />
          <span className="text-white/95 text-[11px] font-semibold tracking-wide">0:00 / {videoTourData.duration}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="text-white/80 hover:text-white transition-all duration-[240ms] focus:outline-none hover:scale-[1.04] active:scale-[0.98]"
            aria-label="Volume"
          >
            <VolumeUpOutlinedIcon sx={{ fontSize: 22 }} />
          </button>
          <button
            className="text-white/80 hover:text-white transition-all duration-[240ms] focus:outline-none hover:scale-[1.04] active:scale-[0.98]"
            aria-label="Fullscreen"
          >
            <FullscreenOutlinedIcon sx={{ fontSize: 22 }} />
          </button>
        </div>
      </div>


    
    </div>
  );
};

export default VideoTourSection;
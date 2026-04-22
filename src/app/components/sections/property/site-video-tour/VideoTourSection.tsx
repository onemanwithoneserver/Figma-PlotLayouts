import React, { useState } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import { videoTourData } from './data';

const VideoTourSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="font-outfit border border-[var(--border-subtle)] rounded-[2px] overflow-hidden bg-[var(--text-color)] w-full relative group shadow-sm cursor-pointer">
      {/* Video Thumbnail */}
      <img
        src={videoTourData.thumbnailUrl}
        alt={videoTourData.thumbnailAlt}
        className="w-full aspect-video object-cover opacity-75 group-hover:opacity-60 transition-opacity duration-500"
        loading="lazy"
      />

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="pointer-events-auto flex flex-col items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-[var(--radius-md)]"
          aria-label={`Play video tour (${videoTourData.duration})`}
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[var(--radius-lg)] bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_4px_12px_var(--overlay-dark-15)] group-hover:scale-110 transition-all duration-300" style={{ background: isPlaying ? 'var(--accent-primary)' : undefined }}>
            <PlayCircleOutlineIcon sx={{ fontSize: 34, color: 'var(--background-color)' }} />
          </div>
          <span className="text-white text-[0.75rem] font-bold tracking-widest drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity duration-300">
            {videoTourData.ctaLabel}
          </span>
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_var(--error-alpha-80)]" />
          <span className="text-white/90 text-[0.75rem] font-medium tracking-wide">0:00 / {videoTourData.duration}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="compact-touch text-white/80 hover:text-white transition-colors focus:outline-none hover:scale-110 transform duration-200"
            aria-label="Volume"
          >
            <VolumeUpOutlinedIcon sx={{ fontSize: 20 }} />
          </button>
          <button 
            className="compact-touch text-white/80 hover:text-white transition-colors focus:outline-none hover:scale-110 transform duration-200"
            aria-label="Fullscreen"
          >
            <FullscreenOutlinedIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTourSection;
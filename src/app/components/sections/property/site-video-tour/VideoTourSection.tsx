import React, { useState } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import { videoTourData } from './data';

const VideoTourSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full relative group cursor-pointer overflow-hidden rounded-[8px] bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.6)] shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] animate-fade-blur-in opacity-0">
      {/* Thumbnail with slight zoom effect on hover */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={videoTourData.thumbnailUrl}
          alt={videoTourData.thumbnailAlt}
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Light shift overlay */}
        <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.3)] to-transparent skew-x-[-20deg] transition-all duration-[600ms] ease-in-out group-hover:left-[200%] pointer-events-none z-10" />
      </div>

      {/* Main Play Action Area */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="pointer-events-auto flex flex-col items-center gap-3 focus:outline-none group/play"
          aria-label={`Play video tour (${videoTourData.duration})`}
        >
          {/* Glass Play Button */}
          <div className="w-16 h-16 rounded-[8px] bg-[rgba(255,255,255,0.8)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.6)] flex items-center justify-center shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/play:scale-110 group-hover/play:-translate-y-1 group-active/play:scale-95" 
               style={{ backgroundColor: isPlaying ? 'rgba(47,111,78,0.9)' : undefined }}>
            <PlayCircleOutlineIcon 
              sx={{ fontSize: 36, color: isPlaying ? '#FFFFFF' : '#2F6F4E' }} 
              className="transition-colors duration-200"
            />
          </div>
          
          <span className="text-white text-[11px] font-bold uppercase tracking-[0.1em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] opacity-90 group-hover/play:opacity-100 transition-opacity">
            {videoTourData.ctaLabel}
          </span>
        </button>
      </div>

      {/* Modern Video Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[rgba(0,0,0,0.5)] via-[rgba(0,0,0,0.2)] to-transparent flex items-end justify-between px-4 py-3 opacity-0 group-hover:opacity-100 transition-all duration-[280ms] translate-y-2 group-hover:translate-y-0 z-30">
        <div className="flex items-center gap-2">
          {/* Status Indicator */}
          <div className="w-2 h-2 rounded-full bg-[#C65A3A] animate-pulse shadow-[0_0_8px_rgba(198,90,58,0.8)]" />
          <span className="text-white/95 text-[11px] font-semibold tracking-wide">0:00 / {videoTourData.duration}</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="text-white/80 hover:text-white transition-all focus:outline-none hover:scale-110 active:scale-95"
            aria-label="Volume"
          >
            <VolumeUpOutlinedIcon sx={{ fontSize: 22 }} />
          </button>
          <button
            className="text-white/80 hover:text-white transition-all focus:outline-none hover:scale-110 active:scale-95"
            aria-label="Fullscreen"
          >
            <FullscreenOutlinedIcon sx={{ fontSize: 22 }} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeBlurIn { 
          from { opacity: 0; filter: blur(6px); transform: translateY(12px); } 
          to { opacity: 1; filter: blur(0px); transform: translateY(0); } 
        }
        .animate-fade-blur-in { animation: fadeBlurIn 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}} />
    </div>
  );
};

export default VideoTourSection;
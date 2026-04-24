import React, { useEffect, useState } from 'react';
import HeroSection from './property/hero-section/HeroSection';
import VideoTourSection from './property/site-video-tour/VideoTourSection';
import ContentSection from './property/shared/ContentSection';
import Overview from './property/overview/Overview';
import Highlights from './property/project-highlights/Highlights';
import ProjectTimeline from './property/project-progress/ProjectTimeline';
import Layout from './property/layout/Layout';
import InteractiveCommute from './property/location-highlights-distance/InteractiveCommute';
import AmenitiesSection from './property/amenities/AmenitiesSection';
import PaymentPlan from './property/payment-plan-offers/PaymentPlan';
import GallerySection from './property/additional-images-videos/GallerySection';
import ScheduleVisitFAB from './property/project-meet/ScheduleVisitFAB';
import FooterNav from './property/shared/FooterNav';
import HorizontalTabNavigation from './property/shared/HorizontalTabNavigation';

const PropertyDetails: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F8FA] to-[#EEF1F5] overflow-x-clip max-w-[390px] mx-auto relative font-inter text-[#1A1F24] selection:bg-[#2F6F4E]/20 selection:text-[#2F6F4E]">
      {/* Subtle Noise Texture */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Floating Ambient Light Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden max-w-[390px] mx-auto">
        <div className="absolute top-[-10%] right-[-20%] w-[350px] h-[350px] rounded-full bg-[#2F6F4E]/10 blur-[100px]" />
        <div className="absolute top-[35%] left-[-25%] w-[300px] h-[300px] rounded-full bg-[#C8A97E]/15 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[-15%] w-[400px] h-[400px] rounded-full bg-[#C65A3A]/10 blur-[110px]" />
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          .font-inter { 
            font-family: 'Inter', sans-serif; 
            line-height: 1.5;
          }
          
          /* Refactored Section Styles: Background merged into parent */
          .pd-section {
            position: relative;
            z-index: 10;
            border-radius: 8px !important; 
            background: rgba(255, 255, 255, 0.65) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.6) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6) !important;
            overflow: hidden;
          }

          /* Ensure children components don't bring their own backgrounds */
          .pd-section > div {
             background: transparent !important;
             border: none !important;
             box-shadow: none !important;
             backdrop-filter: none !important;
          }
        `}
      </style>

      <div className="relative z-10 pt-2">
        <HeroSection />
      </div>

      <FooterNav />

      <div className="relative z-10 flex flex-col gap-4 py-2 px-2">
        
        <div className="pd-section">
          <VideoTourSection />
        </div>
        
        <HorizontalTabNavigation />
        
        <div id="overview" className="pd-section scroll-mt-8">
          <ContentSection title="Overview">
            <Overview />
          </ContentSection>
        </div>

        <div id="highlights" className="pd-section scroll-mt-8">
          <ContentSection title="Highlights">
            <Highlights />
          </ContentSection>
        </div>

        <div id="project-status" className=" scroll-mt-8">
          <ProjectTimeline />
        </div>

        <div id="layout" className="pd-section scroll-mt-8">
          <ContentSection title="Layout & Plot Availability">
            <Layout />
          </ContentSection>
        </div>

        <div id="location" className="pd-section scroll-mt-8">
          <ContentSection title="Location & Distance">
            <InteractiveCommute />
          </ContentSection>
        </div>

        <div id="amenities" className="pd-section scroll-mt-8">
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C8A97E] to-transparent z-20 opacity-90" />
          <ContentSection title="Amenities">
            <AmenitiesSection />
          </ContentSection>
        </div>

        <div id="payment" className="pd-section scroll-mt-8">
          <ContentSection title="Pricing & Payment Plans">
            <PaymentPlan />
          </ContentSection>
        </div>

        <div id="gallery" className="pd-section scroll-mt-8">
          <GallerySection />
        </div>
      </div>

      {/* Glass Back-to-Top Button */}
      {showBackToTop && (
        <div className="fixed bottom-0 left-0 right-0 z-[54] flex justify-center pointer-events-none">
          <div className="relative w-full max-w-[390px]">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="absolute right-5 bottom-[90px] pointer-events-auto w-10 h-10 rounded-[8px] bg-[rgba(255,255,255,0.65)] border border-[rgba(255,255,255,0.6)] shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center backdrop-blur-[20px]"
            >
              <svg className="w-5 h-5 text-[#2F6F4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <ScheduleVisitFAB />
    </div>
  );
};

export default PropertyDetails;
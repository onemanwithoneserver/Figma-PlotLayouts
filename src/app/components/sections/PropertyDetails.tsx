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

  const glassSectionClass = "relative z-10 bg-white/52 backdrop-blur-[14px] border border-white/55 shadow-[0_2px_12px_rgba(47,111,78,0.06)] overflow-hidden scroll-mt-[2px]";

  return (
    <div className="min-h-screen bg-[#ECECE8] overflow-x-clip w-full max-w-[400px] mx-auto relative font-inter text-[#111827] selection:bg-[#2F6F4E]/20 selection:text-[#2F6F4E]">
      
      <div 
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden max-w-[400px] mx-auto">
        <div className="absolute top-[-8%] right-[-18%] w-[320px] h-[320px] rounded-full bg-[#2F6F4E]/8 blur-[90px]" />
        <div className="absolute top-[36%] left-[-22%] w-[280px] h-[280px] rounded-full bg-[#2F6F4E]/5 blur-[110px]" />
        <div className="absolute bottom-[6%] right-[-14%] w-[360px] h-[360px] rounded-full bg-[#D0E8D8]/40 blur-[100px]" />
      </div>

      <div className="relative z-10 pt-[2px]">
        <HeroSection />
      </div>

      <FooterNav />

      <div className={`relative z-10 flex flex-col gap-[2px] py-[4px] transition-[padding] duration-300 ${showBackToTop ? 'pb-[100px]' : 'pb-[10px]'}`}>
        
        <div className={glassSectionClass}>
          <VideoTourSection />
        </div>
        
        <HorizontalTabNavigation />
        
        <div id="overview" className={glassSectionClass}>
          <ContentSection title="Overview">
            <Overview />
          </ContentSection>
        </div>

        <div id="highlights" className={glassSectionClass}>
          <ContentSection title="Highlights">
            <Highlights />
          </ContentSection>
        </div>

        <div id="project-status" className="scroll-mt-[2px] relative z-10">
          <ProjectTimeline />
        </div>

        <div id="layout" className={glassSectionClass}>
          <ContentSection title="Layout & Plot Availability">
            <Layout />
          </ContentSection>
        </div>

        <div id="location" className={glassSectionClass}>
          <ContentSection title="Location & Distance">
            <InteractiveCommute />
          </ContentSection>
        </div>

        <div id="amenities" className={glassSectionClass}>
          <div className="" />
          <ContentSection title="Amenities">
            <AmenitiesSection />
          </ContentSection>
        </div>

        <div id="payment" className={glassSectionClass}>
          <ContentSection title="Pricing & Payment Plans">
            <PaymentPlan />
          </ContentSection>
        </div>

        <div id="gallery" className={glassSectionClass}>
          <ContentSection title="Gallery">
            <GallerySection />
          </ContentSection>
        </div>
      </div>

      {showBackToTop && (
        <div className="fixed bottom-0 left-0 right-0 z-[54] flex justify-center pointer-events-none">
          <div className="relative w-full max-w-[400px]">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="absolute right-[2px] bottom-[90px] pointer-events-auto w-10 h-10 rounded-[4px] bg-white/80 border border-white/60 shadow-sm flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-md"
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
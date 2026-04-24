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
    <div className="min-h-screen bg-[#ECECE8] overflow-x-clip max-w-[390px] mx-auto relative font-inter text-[#1A2B22] selection:bg-[#2F6F4E]/20 selection:text-[#2F6F4E]">
      <style>
        {`
          .font-inter {
            font-family: 'Inter', sans-serif;
            line-height: 1.5;
          }

          .pd-section {
            position: relative;
            z-index: 10;
            border-radius: 8px;
            background: #ECECE8;
            box-shadow: 5px 5px 10px #CBCBC7, -5px -5px 10px #FFFFFF;
            overflow: hidden;
          }

          .pd-section > div {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
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
            <ContentSection title="Gallery">
              <GallerySection />
            </ContentSection>
        </div>
      </div>

      {/* Glass Back-to-Top Button */}
      {showBackToTop && (
        <div className="fixed bottom-0 left-0 right-0 z-[54] flex justify-center pointer-events-none">
          <div className="relative w-full max-w-[390px]">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="absolute right-4 bottom-[88px] pointer-events-auto w-11 h-11 rounded-[8px] bg-[#ECECE8] shadow-[5px_5px_10px_#CBCBC7,-5px_-5px_10px_#FFFFFF] active:shadow-[inset_3px_3px_6px_#CBCBC7,inset_-3px_-3px_6px_#FFFFFF] flex items-center justify-center transition-all duration-200"
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
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
import InitialLoadingState from './property/shared/InitialLoadingState';

const PropertyDetails: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsBooting(false), 750);
    return () => window.clearTimeout(timer);
  }, []);

  const glassSectionClass = "relative z-10 bg-[rgba(255,255,255,0.62)] backdrop-blur-[8px] border border-[rgba(255,255,255,0.68)] shadow-[0_1px_6px_rgba(24,66,55,0.08)] overflow-hidden scroll-mt-[4px] ";

  return (
    <div className="min-h-screen app-gradient-bg overflow-x-clip w-full max-w-[400px] mx-auto relative text-[#10251e] selection:bg-[#2F8F7B]/20 selection:text-[#1f6b5b] page-enter">
      <div className="noise-overlay" />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden max-w-[400px] mx-auto">
        <div className="absolute top-[-8%] right-[-18%] w-[320px] h-[320px] rounded-full bg-[#2F8F7B]/6 blur-[90px]" />
        <div className="absolute top-[36%] left-[-22%] w-[280px] h-[280px] rounded-full bg-[#2F8F7B]/4 blur-[110px]" />
        <div className="absolute bottom-[6%] right-[-14%] w-[360px] h-[360px] rounded-full bg-[#D4EBE3]/38 blur-[100px]" />
      </div>

      {isBooting ? (
        <div className="relative z-10">
          <InitialLoadingState />
        </div>
      ) : (
        <>

          <div className="relative z-10 pt-[2px]">
            <HeroSection />
          </div>

          <FooterNav />

          <div className={`relative z-10 flex flex-col gap-[4px] py-[4px] transition-[padding] duration-300 ${showBackToTop ? 'pb-[100px]' : 'pb-[12px]'}`}>
        
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

            <div id="project-status" className="scroll-mt-[4px] relative z-10">
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
                  className="absolute right-[2px] bottom-[90px] pointer-events-auto w-10 h-10 rounded-[8px] bg-[rgba(255,255,255,0.76)] border border-[rgba(255,255,255,0.7)] shadow-[0_2px_10px_rgba(24,66,55,0.08)] flex items-center justify-center backdrop-blur-[10px] transition-all duration-300 hover:bg-[rgba(255,255,255,0.9)] hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(24,66,55,0.12)] active:scale-[0.98] soft-focus"
                >
                  <svg className="w-5 h-5 text-[#2F8F7B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <ScheduleVisitFAB />
        </>
      )}
    </div>
  );
};

export default PropertyDetails;
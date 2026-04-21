import React, { useEffect, useRef, useState } from 'react';
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
import SellerQueries from './property/amenities/SellerQueries';
import FooterNav from './property/shared/FooterNav';
import HorizontalTabNavigation from './property/shared/HorizontalTabNavigation';

const PropertyDetails: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.pd-section').forEach((el) =>
      observerRef.current?.observe(el)
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 220);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-app)] overflow-x-clip max-w-[390px] mx-auto relative font-outfit">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
          .font-outfit { font-family: 'Outfit', sans-serif; }
          .pd-section > div { border-radius: 2px !important; }
        `}
      </style>

      {/* HERO SECTION */}
      <HeroSection />
      <HorizontalTabNavigation />
      <FooterNav />

      <div className="flex flex-col gap-2 px-2 pt-2 pb-0">
        
        {/* VIDEO TOUR */}
        <div className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out rounded-[2px] overflow-hidden">
          <VideoTourSection />
        </div>

        {/* OVERVIEW */}
        <div id="overview" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[2px] overflow-hidden">
          <ContentSection title="Overview">
            <Overview />
          </ContentSection>
        </div>

        {/* HIGHLIGHTS — elevated section bg */}
        <div id="highlights" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[2px] overflow-hidden bg-[var(--bg-section-light)]">
          <ContentSection title="Highlights">
            <Highlights />
          </ContentSection>
        </div>

        {/* PROJECT STATUS */}
        <div id="project-status" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[2px] overflow-hidden">
          <ProjectTimeline />
        </div>

        {/* LAYOUT AVAILABILITY */}
        <div id="layout" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[2px] overflow-hidden">
          <ContentSection title="Layout & Plot Availability">
            <Layout />
          </ContentSection>
        </div>

        {/* ASK SELLER */}
        <div id="ask-seller" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[2px] overflow-hidden">
          <ContentSection title="Ask Seller">
            <SellerQueries />
          </ContentSection>
        </div>

        {/* LOCATION HIGHLIGHTS */}
        <div id="location" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[2px] overflow-hidden">
          <ContentSection title="Location & Distance">
            <InteractiveCommute />
          </ContentSection>
        </div>

        {/* AMENITIES — elevated section bg */}
        <div id="amenities" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[2px] overflow-hidden bg-[var(--bg-section-muted)]">
          <ContentSection title="Amenities">
            <AmenitiesSection />
          </ContentSection>
        </div>

        {/* PRICING & PAYMENT */}
        <div id="payment" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[2px] overflow-hidden">
          <ContentSection title="Pricing & Payment Plans">
            <PaymentPlan />
          </ContentSection>
        </div>

        {/* GALLERY */}
        <div id="gallery" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[2px] overflow-hidden">
          <GallerySection />
        </div>

      </div>

      {/* BACK TO TOP */}
      {showBackToTop && (
        <div className="fixed bottom-0 left-0 right-0 z-[54] flex justify-center pointer-events-none">
          <div className="relative w-full max-w-[390px]">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="absolute right-3 bottom-[72px] pointer-events-auto w-8 h-8 rounded-[var(--radius-sm)] bg-white border border-[var(--accent-border)] shadow-[0_2px_12px_rgba(31,122,92,0.22)] flex items-center justify-center hover:bg-[var(--accent-soft)] hover:border-[var(--accent-primary)] transition-colors"
            >
              <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* FLOATING: Schedule Visit FAB */}
      <ScheduleVisitFAB />

    </div>
  );
};

export default PropertyDetails;
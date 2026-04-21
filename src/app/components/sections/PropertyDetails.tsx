import React, { useEffect, useRef } from 'react';
import Divider from '@mui/material/Divider';
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
import ProjectMeet from './property/project-meet/ProjectMeet';
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

  return (
    <div className="min-h-screen bg-[#F5F5F5] overflow-x-clip max-w-[390px] mx-auto relative font-outfit">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
          .font-outfit { font-family: 'Outfit', sans-serif; }
          .pd-section > div { border-radius: 4px !important; }
        `}
      </style>

      {/* HERO SECTION */}
      <HeroSection />
      <HorizontalTabNavigation />
      <FooterNav />

      <div className="flex flex-col gap-2 px-2 pt-2 pb-24">
        
        {/* VIDEO TOUR */}
        <div className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out rounded-[4px] overflow-hidden">
          <VideoTourSection />
        </div>

        {/* OVERVIEW */}
        <div id="overview" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[4px] overflow-hidden">
          <ContentSection title="Overview">
            <Overview />
          </ContentSection>
        </div>

        {/* HIGHLIGHTS */}
        <div id="highlights" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[4px] overflow-hidden">
          <ContentSection title="Highlights">
            <Highlights />
          </ContentSection>
        </div>

        {/* PROJECT STATUS */}
        <div id="project-status" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[4px] overflow-hidden">
          <ProjectTimeline />
        </div>

        {/* LAYOUT AVAILABILITY */}
        <div id="layout" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[4px] overflow-hidden">
          <ContentSection title="Layout & Plot Availability">
            <Layout />
          </ContentSection>
        </div>

        {/* ASK SELLER */}
        <div id="ask-seller" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[4px] overflow-hidden">
          <ContentSection title="Ask Seller">
            <SellerQueries />
          </ContentSection>
        </div>

        {/* LOCATION HIGHLIGHTS */}
        <div id="location" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[4px] overflow-hidden">
          <ContentSection title="Location & Distance">
            <InteractiveCommute />
          </ContentSection>
        </div>

        {/* AMENITIES */}
        <div id="amenities" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[4px] overflow-hidden">
          <ContentSection title="Amenities">
            <AmenitiesSection />
          </ContentSection>
        </div>

        {/* PRICING & PAYMENT */}
        <div id="payment" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[4px] overflow-hidden">
          <ContentSection title="Pricing & Payment Plans">
            <PaymentPlan />
          </ContentSection>
        </div>

        {/* GALLERY */}
        <div id="gallery" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[4px] overflow-hidden">
          <GallerySection />
        </div>

        {/* SCHEDULE VISIT */}
        <div id="project-meet" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[4px] overflow-hidden">
          <ContentSection title="Schedule Site Visit">
            <ProjectMeet />
          </ContentSection>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;
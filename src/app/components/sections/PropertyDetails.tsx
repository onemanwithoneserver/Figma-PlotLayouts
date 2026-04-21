import React, { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
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
  const [overviewTab, setOverviewTab] = useState<'overview' | 'highlights'>('overview');

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

        {/* OVERVIEW & HIGHLIGHTS */}
        <div id="overview" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4 rounded-[4px]">
          <Card elevation={0} sx={{ borderRadius: '4px', border: '1px solid #EAEAEA', overflow: 'hidden' }}>
            <div className="flex items-center border-b border-[#EAEAEA] bg-white">
              {(['overview', 'highlights'] as const).map((tab) => {
                const isActive = overviewTab === tab;
                const label = tab === 'overview' ? 'Overview' : 'Highlights';
                return (
                  <button
                    key={tab}
                    onClick={() => setOverviewTab(tab)}
                    className="flex flex-col items-center px-5 py-2.5 outline-none flex-1 hover:bg-[#FAFAFA] transition-colors"
                  >
                    <Typography className="font-outfit" sx={{
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#1F7A63' : '#666666',
                      transition: 'color 0.2s',
                    }}>
                      {label}
                    </Typography>
                    <div style={{
                      height: 2.5,
                      width: '100%',
                      borderRadius: '4px 4px 0 0',
                      marginTop: 6,
                      backgroundColor: isActive ? '#1F7A63' : 'transparent',
                      transition: 'background-color 0.2s',
                    }} />
                  </button>
                );
              })}
            </div>
            {overviewTab === 'overview' ? <Overview /> : <Highlights />}
          </Card>
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
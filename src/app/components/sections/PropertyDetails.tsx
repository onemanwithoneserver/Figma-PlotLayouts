import React, { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import HeroSection from './property/HeroSection';
import VideoTourSection from './property/VideoTourSection';
import ContentSection from './property/ContentSection';
import Overview from './property/Overview&Highlight/Overview';
import Highlights from './property/Overview&Highlight/Highlights';
import ProjectTimeline from './property/ProjectTimelineSection/ProjectTimeline';
import Layout from './property/Layout&Towers/Layout';
import InteractiveCommute from './property/DistanceCommuteSection/InteractiveCommute';
import AmenitiesSection from './property/AmenitiesSection/AmenitiesSection';
import PaymentPlan from './property/PaymentPlansSection/PaymentPlan';
import GallerySection from './property/GallerySection';
import ProjectMeet from './property/ProjectMeetSection/ProjectMeet';
import SellerQueries from './property/AmenitiesSection/SellerQueries';
import FooterNav from './property/FooterNav';
import HorizontalTabNavigation from './property/HorizontalTabNavigation';

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
    <div className="min-h-screen bg-[#F5F5F5] overflow-x-clip max-w-[390px] mx-auto relative">
      {/* 1+2. HEADER IMAGE + HERO */}
      <HeroSection />

      <HorizontalTabNavigation />

      <FooterNav />

      <div className="flex flex-col gap-3 px-2 pt-3 pb-24">
        {/* 3. SITE VIDEO TOUR */}
        <div className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out">
          <VideoTourSection />
        </div>

        {/* 4+5. OVERVIEW & HIGHLIGHTS — tabbed */}
        <div id="overview" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4">
          <Card elevation={0}>
            {/* Tab header */}
            <div className="flex items-center border-b border-[#E0E0E0]">
              {(['overview', 'highlights'] as const).map((tab) => {
                const isActive = overviewTab === tab;
                const label = tab === 'overview' ? 'Overview' : 'Highlights';
                return (
                  <button
                    key={tab}
                    onClick={() => setOverviewTab(tab)}
                    className="flex flex-col items-center px-5 py-3 outline-none"
                  >
                    <Typography sx={{
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#1F7A63' : '#757575',
                      transition: 'color 0.2s',
                    }}>
                      {label}
                    </Typography>
                    <div style={{
                      height: 2,
                      width: '100%',
                      borderRadius: 1,
                      marginTop: 4,
                      backgroundColor: isActive ? '#1F7A63' : 'transparent',
                      transition: 'background-color 0.2s',
                    }} />
                  </button>
                );
              })}
            </div>
            <Divider />
            {overviewTab === 'overview' ? <Overview /> : <Highlights />}
          </Card>
        </div>

        {/* 6. PROJECT STATUS */}
        <div id="project-status" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4">
          <ProjectTimeline />
        </div>

        {/* 7. LAYOUT AVAILABILITY */}
        <div id="layout" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4">
          <ContentSection title="Layout & Plot Availability">
            <Layout />
          </ContentSection>
        </div>

        {/* 8. ASK SELLER */}
        <div id="ask-seller" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4">
          <ContentSection title="Ask Seller">
            <SellerQueries />
          </ContentSection>
        </div>

        {/* 9. LOCATION HIGHLIGHTS & DISTANCE */}
        <div id="location" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4">
          <ContentSection title="Location & Distance">
            <InteractiveCommute />
          </ContentSection>
        </div>

        {/* 10. AMENITIES */}
        <div id="amenities" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4">
          <ContentSection title="Amenities">
            <AmenitiesSection />
          </ContentSection>
        </div>

        {/* 11. PRICING & PAYMENT PLANS */}
        <div id="payment" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4">
          <ContentSection title="Pricing & Payment Plans">
            <PaymentPlan />
          </ContentSection>
        </div>

        {/* 12. GALLERY */}
        <div id="gallery" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4">
          <GallerySection />
        </div>

        {/* 13. SITE VISIT / PROJECT MEET */}
        <div id="project-meet" className="pd-section opacity-0 translate-y-4 transition-all duration-500 ease-out scroll-mt-4">
          <ContentSection title="Schedule Site Visit">
            <ProjectMeet />
          </ContentSection>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;


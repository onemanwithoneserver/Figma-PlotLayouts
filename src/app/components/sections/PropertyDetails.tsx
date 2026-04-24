import React, { Suspense, useEffect, useState } from 'react';
import HeroSection from './property/hero-section/HeroSection';
import ContentSection from './property/shared/ContentSection';
import Overview from './property/overview/Overview';
import ScheduleVisitFAB from './property/project-meet/ScheduleVisitFAB';
import FooterNav from './property/shared/FooterNav';
import HorizontalTabNavigation from './property/shared/HorizontalTabNavigation';
import InitialLoadingState, {
  GallerySkeleton,
  HighlightsSkeleton,
  PricingSkeleton,
  SectionSkeleton,
  TimelineSkeleton,
} from './property/shared/InitialLoadingState';
import FadeInSection from './property/shared/FadeInSection';

/* Lazy-loaded below-fold sections (audit §12 — Performance) */
const Highlights = React.lazy(() => import('./property/project-highlights/Highlights'));
const ProjectTimeline = React.lazy(() => import('./property/project-progress/ProjectTimeline'));
const LayoutSection = React.lazy(() => import('./property/layout/Layout'));
const AmenitiesSection = React.lazy(() => import('./property/amenities/AmenitiesSection'));
const PaymentPlan = React.lazy(() => import('./property/payment-plan-offers/PaymentPlan'));
const InteractiveCommute = React.lazy(() => import('./property/location-highlights-distance/InteractiveCommute'));
const GallerySection = React.lazy(() => import('./property/additional-images-videos/GallerySection'));
const VideoTourSection = React.lazy(() => import('./property/site-video-tour/VideoTourSection'));

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

          <FadeInSection delay={0.72}>
              <div className={glassSectionClass}>
                <Suspense fallback={null}>
                  <VideoTourSection />
                </Suspense>
              </div>
            </FadeInSection>


            <HorizontalTabNavigation />

            <div id="overview" className={glassSectionClass}>
              <ContentSection title="Overview">
                <Overview />
              </ContentSection>
            </div>

            <FadeInSection delay={0.16}>
              <div id="highlights" className={glassSectionClass}>
                <ContentSection title="Highlights">
                  <Suspense fallback={<HighlightsSkeleton />}>
                    <Highlights />
                  </Suspense>
                </ContentSection>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.24}>
              <div id="project-status" className="scroll-mt-[4px] relative z-10">
                <Suspense fallback={<TimelineSkeleton />}>
                  <ProjectTimeline />
                </Suspense>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.32}>
              <div id="layout" className={glassSectionClass}>
                <ContentSection title="Layout &amp; Plot Availability">
                  <Suspense fallback={<SectionSkeleton />}>
                    <LayoutSection />
                  </Suspense>
                </ContentSection>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.48}>
              <div id="location" className={glassSectionClass}>
                <ContentSection title="Location &amp; Distance">
                  <Suspense fallback={<SectionSkeleton />}>
                    <InteractiveCommute />
                  </Suspense>
                </ContentSection>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.40}>
              <div id="amenities" className={glassSectionClass}>
                <ContentSection title="Amenities">
                  <Suspense fallback={<SectionSkeleton />}>
                    <AmenitiesSection />
                  </Suspense>
                </ContentSection>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.56}>
              <div id="payment" className={glassSectionClass}>
                <ContentSection title="Pricing &amp; Payment Plans">
                  <Suspense fallback={<PricingSkeleton />}>
                    <PaymentPlan />
                  </Suspense>
                </ContentSection>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.64}>
              <div id="gallery" className={glassSectionClass}>
                <ContentSection title="Gallery">
                  <Suspense fallback={<GallerySkeleton />}>
                    <GallerySection />
                  </Suspense>
                </ContentSection>
              </div>
            </FadeInSection>

            
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
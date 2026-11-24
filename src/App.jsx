import { useCallback, useEffect, useRef, useState } from 'react';
import { FLAVORS } from './data/flavors';
import { useRevealAndSectionObserver } from './hooks/useRevealObserver';
import { useSmoothScroll } from './hooks/useSmoothScroll';

import Header from './components/Header';
import MobileDrawer from './components/MobileDrawer';
import HeroScrollCanvas from './components/HeroScrollCanvas';
import MarqueeStrip from './components/MarqueeStrip';
import RangeSpotlight from './components/RangeSpotlight';
import WhyPowerCrunch from './components/WhyPowerCrunch';
import AvailableFlavours from './components/AvailableFlavours';
import NutritionSection from './components/NutritionSection';
import IngredientsSection from './components/IngredientsSection';
import ReviewsSection from './components/ReviewsSection';
import BestSellersSection from './components/BestSellersSection';
import JoinCrewSection from './components/JoinCrewSection';
import Footer from './components/Footer';
import ClaimBoxDrawer from './components/ClaimBoxDrawer';

export default function App() {
  const [activeFlavorId, setActiveFlavorId] = useState('red-velvet');
  const [heroResetSignal, setHeroResetSignal] = useState(0);
  const [nutritionPulseKey, setNutritionPulseKey] = useState(0);
  const [spotlightCountUpSignal, setSpotlightCountUpSignal] = useState(0);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [claimDrawerOpen, setClaimDrawerOpen] = useState(false);

  const headerProgressRef = useRef(null);
  const activeFlavor = FLAVORS[activeFlavorId];

  // Sync dynamic body[data-flavor] & mobile browser theme-color meta
  useEffect(() => {
    document.body.dataset.flavor = activeFlavorId;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && activeFlavor?.themeColor) {
      meta.setAttribute('content', activeFlavor.themeColor);
    }
  }, [activeFlavorId, activeFlavor]);

  // Passive reading progress hairline along bottom edge of scrolled header
  useEffect(() => {
    const updateProgress = () => {
      if (!headerProgressRef.current) return;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      headerProgressRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  // Close mobile drawer on Escape or resize >= 768px
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const handleNavigate = useSmoothScroll(closeMobileMenu);

  const handleSpotlightEnter = useCallback(() => {
    setSpotlightCountUpSignal((n) => n + 1);
  }, []);

  useRevealAndSectionObserver(setActiveSection, handleSpotlightEnter);

  const handleSelectFlavor = useCallback(
    (flavorId, { resetScroll = false } = {}) => {
      if (!FLAVORS[flavorId]) return;
      setActiveFlavorId((prev) => {
        if (prev !== flavorId) {
          setNutritionPulseKey((k) => k + 1);
        }
        return flavorId;
      });
      if (resetScroll) {
        setHeroResetSignal((s) => s + 1);
      }
    },
    []
  );

  const handleClaimBox = useCallback((flavorId) => {
    if (flavorId && FLAVORS[flavorId]) {
      setActiveFlavorId((prev) => {
        if (prev !== flavorId) {
          setNutritionPulseKey((k) => k + 1);
        }
        return flavorId;
      });
    }
    setMobileMenuOpen(false);
    setClaimDrawerOpen(true);
  }, []);

  const closeClaimDrawer = useCallback(() => setClaimDrawerOpen(false), []);

  return (
    <>
      <Header
        isScrolled={isHeaderScrolled}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((open) => !open)}
        onNavigate={handleNavigate}
        headerProgressRef={headerProgressRef}
      />

      <MobileDrawer
        isOpen={mobileMenuOpen}
        activeFlavor={activeFlavorId}
        onClose={closeMobileMenu}
        onNavigate={handleNavigate}
        onSelectFlavor={handleSelectFlavor}
      />

      <main>
        <HeroScrollCanvas
          activeFlavor={activeFlavorId}
          resetSignal={heroResetSignal}
          onSelectFlavor={handleSelectFlavor}
          onHeaderScrolledChange={setIsHeaderScrolled}
        />

        <MarqueeStrip />

        <RangeSpotlight
          flavor={activeFlavor}
          activeFlavor={activeFlavorId}
          countUpSignal={spotlightCountUpSignal}
          onSelectFlavor={handleSelectFlavor}
          onClaimBox={handleClaimBox}
        />

        <WhyPowerCrunch flavor={activeFlavor} onNavigate={handleNavigate} />

        <AvailableFlavours
          activeFlavor={activeFlavorId}
          onSelectFlavor={handleSelectFlavor}
          onClaimBox={handleClaimBox}
        />

        <NutritionSection
          flavor={activeFlavor}
          activeFlavor={activeFlavorId}
          updatePulseKey={nutritionPulseKey}
          onSelectFlavor={handleSelectFlavor}
        />

        <IngredientsSection flavor={activeFlavor} />

        <ReviewsSection />

        <BestSellersSection
          flavor={activeFlavor}
          onNavigate={handleNavigate}
          onClaimBox={handleClaimBox}
        />

        <JoinCrewSection activeFlavorName={activeFlavor.name} />
      </main>

      <Footer
        onNavigate={handleNavigate}
        onSelectFlavor={handleSelectFlavor}
      />

      <ClaimBoxDrawer
        isOpen={claimDrawerOpen}
        activeFlavor={activeFlavorId}
        onClose={closeClaimDrawer}
        onSelectFlavor={handleSelectFlavor}
      />
    </>
  );
}

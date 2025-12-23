import React, { useEffect, useRef, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

// Components
import Header from './components/Header';
import MenuOverlay from './components/MenuOverlay';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

// Pages
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Policy from './pages/Policy';
import Sauna from './pages/Sauna';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll with tuned settings
    const lenis = new Lenis({
      duration: 1.5, // Slightly longer duration for a smoother, heavier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Stop/Start scroll when menu is toggled
  useEffect(() => {
    if (lenisRef.current) {
      if (isMenuOpen || loading) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isMenuOpen, loading]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <div className="min-h-screen flex flex-col relative">
        <ScrollToTop />
        <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        
        <Routes>
          {/* Default Redirect to /lv */}
          <Route path="/" element={<Navigate to="/lv" replace />} />
          
          {/* i18n Routes */}
          <Route path="/:lang" element={<Home isPreloading={loading} />} />
          <Route path="/:lang/sauna" element={<Sauna />} />
          <Route path="/:lang/gallery" element={<Gallery />} />
          <Route path="/:lang/policy" element={<Policy />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
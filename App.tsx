import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

// Components
import Header from './components/Header';
import MenuOverlay from './components/MenuOverlay';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import BackToTop from './components/BackToTop';

// Pages
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Policy from './pages/Policy';
import Sauna from './pages/Sauna';

// Scroll handling component
const ScrollHandler = ({ lenis }: { lenis: Lenis | null }) => {
  const { pathname } = useLocation();
  const { lang } = useParams();
  const prevLang = useRef(lang);

  useEffect(() => {
    // Determine if only the language changed (e.g. /lv -> /en)
    const isLangChange = prevLang.current && lang && prevLang.current !== lang;
    prevLang.current = lang;

    if (lenis) {
      if (isLangChange) {
        // Smooth scroll to top for language change animation
        lenis.scrollTo(0, { duration: 1.2, lock: true });
      } else {
        // Immediate reset for page navigation
        lenis.scrollTo(0, { immediate: true });
      }
    } else {
      // Fallback for no Lenis
      window.scrollTo({ top: 0, behavior: isLangChange ? 'smooth' : 'auto' });
    }
  }, [pathname, lang, lenis]);

  return null;
};

const AppContent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Theme state initialization
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    } catch {
      return 'light';
    }
  });
  
  const lenisRef = useRef<Lenis | null>(null);

  // Force Theme Application
  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // 1. Apply on mount/change
  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // 2. Safeguard: Re-apply on location change to prevent loss during navigation
  const location = useLocation();
  useLayoutEffect(() => {
    applyTheme(theme);
  }, [location, theme]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <ScrollHandler lenis={lenisRef.current} />

      <div className="min-h-screen flex flex-col relative bg-cream dark:bg-cream-dark transition-colors duration-500">
        <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        
        <Routes>
          <Route path="/" element={<Navigate to="/lv" replace />} />
          <Route path="/:lang" element={<Home isPreloading={loading} />} />
          <Route path="/:lang/sauna" element={<Sauna />} />
          <Route path="/:lang/gallery" element={<Gallery />} />
          <Route path="/:lang/policy" element={<Policy />} />
        </Routes>

        <Footer theme={theme} toggleTheme={toggleTheme} />
        <BackToTop />
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
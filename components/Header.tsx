import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { PHONE_HREF, PHONE_NUMBER } from '../constants';
import clsx from 'clsx';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { lang } = useParams();
  const currentLang = lang || 'lv';
  
  // Check if we are on the home page
  const isHome = location.pathname === `/${currentLang}` || location.pathname === `/${currentLang}/`;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    if (isMenuOpen) toggleMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Visual Logic
  const shouldUseDarkTheme = isMenuOpen || !isHome || scrolled;

  const textColorClass = shouldUseDarkTheme ? 'text-charcoal-900' : 'text-white';
  const burgerColorClass = shouldUseDarkTheme ? 'bg-charcoal-900' : 'bg-white';
  const phoneColorClass = shouldUseDarkTheme ? 'text-charcoal-800' : 'text-white';

  return (
    <header 
      className={clsx(
        "fixed top-0 left-0 right-0 z-[60] px-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled 
          ? "py-4" 
          : "bg-transparent py-8"
      )}
    >
      {/* Liquid Glass Container */}
      <div 
        className={clsx(
            "max-w-[1400px] mx-auto flex justify-between items-center rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled 
                ? "bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] px-6 py-3" 
                : "bg-transparent border border-transparent px-0"
        )}
      >
        {/* Logo */}
        <Link 
          to={`/${currentLang}`}
          className={clsx(
            "font-serif text-2xl font-medium tracking-tight relative z-[70] hover:opacity-70 transition-colors duration-300",
            textColorClass
          )}
        >
          Mežlīči.
        </Link>
        
        <div className="flex items-center gap-8 md:gap-10">
          <a 
            href={PHONE_HREF} 
            className={clsx(
                "hidden md:block text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300",
                phoneColorClass,
                scrolled || isMenuOpen ? "opacity-100" : "opacity-0 lg:opacity-80 hover:opacity-100"
            )}
          >
            {PHONE_NUMBER}
          </a>
          
          <button 
            onClick={toggleMenu}
            className="relative z-[70] w-10 h-10 flex flex-col justify-center items-end gap-[6px] group cursor-pointer border-none bg-transparent outline-none"
            aria-label="Toggle Menu"
          >
            <span 
              className={clsx(
                "w-8 h-[2px] transition-all duration-500 origin-center group-hover:bg-taupe-500",
                burgerColorClass,
                isMenuOpen && "translate-y-[8px] rotate-45 !bg-charcoal-900"
              )} 
            />
            <span 
              className={clsx(
                "w-5 h-[2px] transition-all duration-500 group-hover:bg-taupe-500",
                burgerColorClass,
                isMenuOpen && "opacity-0 scale-0"
              )} 
            />
            <span 
              className={clsx(
                "w-8 h-[2px] transition-all duration-500 origin-center group-hover:bg-taupe-500",
                burgerColorClass,
                isMenuOpen && "-translate-y-[8px] -rotate-45 !bg-charcoal-900"
              )} 
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, PHONE_HREF, PHONE_NUMBER } from '../constants';
import clsx from 'clsx';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  // Robust detection
  const pathLang = location.pathname.split('/')[1];
  const currentLang = ['en', 'ru'].includes(pathLang) ? pathLang : 'lv';

  return (
    <div 
      className={clsx(
        "fixed inset-0 bg-cream/60 dark:bg-cream-dark/80 backdrop-blur-3xl z-50 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <div 
        className="absolute inset-0 z-0" 
        onClick={onClose} 
        aria-hidden="true"
      />
      
      <nav className="flex flex-col gap-6 md:gap-8 text-center relative z-10 p-6">
        {NAV_LINKS.map((link) => {
           // Construct path with language prefix
           const to = link.path === '/' ? `/${currentLang}` : `/${currentLang}${link.path}`;
           
           return (
            <Link
              key={link.path}
              to={to}
              onClick={onClose}
              className="font-serif text-5xl md:text-7xl text-charcoal-900 dark:text-white hover:text-taupe-500 transition-colors duration-300"
            >
              {link.label}
            </Link>
           );
        })}
        
        <div className="w-12 h-px bg-charcoal-900/10 dark:bg-white/10 mx-auto my-6" />
        
        <div className="text-charcoal-800/60 dark:text-white/60 text-sm tracking-widest uppercase flex flex-col items-center">
          <p className="mb-2">Rezervācija</p>
          <a 
            href={PHONE_HREF} 
            className="text-xl md:text-2xl text-charcoal-900 dark:text-white font-serif hover:text-taupe-600 transition-colors"
          >
            {PHONE_NUMBER}
          </a>
        </div>
      </nav>
    </div>
  );
};

export default MenuOverlay;
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'phosphor-react';
import ExternalLink from './ExternalLink';
import KamaltekLogo from './KamaltekLogo';
import clsx from 'clsx';

interface FooterProps {
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
}

const Footer: React.FC<FooterProps> = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Robust language detection from URL path since Footer is outside Routes
  const pathLang = location.pathname.split('/')[1];
  const currentLang = (['en', 'ru'].includes(pathLang) ? pathLang : 'lv') as 'lv' | 'en' | 'ru';

  const t = {
    lv: { brand: 'Mežlīči.', desc: 'Eleganta atpūtas vieta tiem, kas novērtē dabas tuvumu un mieru Daugavas kreisajā krastā.', settings: 'Uzstādījumi', info: 'Informācija', dev: 'Izstrāde', rights: 'Visas tiesības aizsargātas', contact: 'Kontakti', gallery: 'Galerija', sauna: 'Pirts', policy: 'Privātums' },
    en: { brand: 'Mežlīči.', desc: 'An elegant retreat for those who appreciate nature and peace on the banks of the Daugava.', settings: 'Settings', info: 'Information', dev: 'Development', rights: 'All rights reserved', contact: 'Contacts', gallery: 'Gallery', sauna: 'Sauna', policy: 'Privacy' },
    ru: { brand: 'Mežlīči.', desc: 'Элегантное место отдыха для тех, кто ценит близость к природе и покой на берегу Даугавы.', settings: 'Настройки', info: 'Информация', dev: 'Разработка', rights: 'Все права защищены', contact: 'Контакты', gallery: 'Галерея', sauna: 'Баня', policy: 'Конфиденциальность' }
  }[currentLang] || { brand: 'Mežlīči.', desc: '', settings: 'Settings', info: 'Info', dev: 'Dev', rights: '', contact: 'Contact', gallery: 'Gallery', sauna: 'Sauna', policy: 'Privacy' };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === `/${currentLang}` || location.pathname === `/${currentLang}/`) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/${currentLang}`);
      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const changeLanguage = (newLang: string) => {
    if (newLang === currentLang) return;
    
    const pathParts = location.pathname.split('/');
    pathParts[1] = newLang; 
    navigate(pathParts.join('/'));
  };

  return (
    <footer className="bg-charcoal-900 dark:bg-mantle text-white/70 pt-24 pb-12 px-6 text-sm mt-auto transition-colors duration-500 border-t border-white/5 relative z-40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 border-b border-white/10 pb-16">
        
        {/* Brand */}
        <div className="md:col-span-1">
          <Link to={`/${currentLang}`} className="font-serif text-3xl block mb-6 text-white hover:text-taupe-500 transition-colors">
            {t.brand}
          </Link>
          <p className="text-white/40 leading-relaxed max-w-xs font-light">
            {t.desc}
          </p>
        </div>
        
        {/* Settings - Swapped Order: Theme first, Language second */}
        <div>
          <h4 className="text-taupe-500 uppercase tracking-[0.2em] text-[10px] font-bold mb-6">{t.settings}</h4>
          <div className="flex flex-col items-start gap-8">
            
            {/* Theme - Simple Toggle */}
            <button 
              onClick={toggleTheme}
              className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                 {theme === 'dark' ? <Moon size={16} weight="fill" /> : <Sun size={16} weight="fill" />}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-taupe-500 transition-colors">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </button>

            {/* Language - Buttons */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5">
                {['lv', 'en', 'ru'].map((l) => (
                  <button 
                    key={l}
                    onClick={() => changeLanguage(l)}
                    className={clsx(
                      "w-10 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all",
                      currentLang === l 
                        ? "bg-taupe-500 text-white shadow-lg scale-105" 
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {l}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-taupe-500 uppercase tracking-[0.2em] text-[10px] font-bold mb-6">{t.info}</h4>
          <ul className="space-y-4 text-[13px] font-medium">
            <li><Link to={`/${currentLang}/gallery`} className="text-white/40 hover:text-white transition-colors hover:translate-x-1 inline-block duration-300">{t.gallery}</Link></li>
            <li><Link to={`/${currentLang}/sauna`} className="text-white/40 hover:text-white transition-colors hover:translate-x-1 inline-block duration-300">{t.sauna}</Link></li>
            <li><Link to={`/${currentLang}/policy`} className="text-white/40 hover:text-white transition-colors hover:translate-x-1 inline-block duration-300">{t.policy}</Link></li>
            <li><button onClick={handleContactClick} className="text-white/40 hover:text-white transition-colors text-left hover:translate-x-1 inline-block duration-300">{t.contact}</button></li>
          </ul>
        </div>

        {/* Dev / Logo - HIGHLY VISIBLE */}
        <div className="flex flex-col items-start md:items-end md:text-right justify-between">
          <div>
            <h4 className="text-taupe-500 uppercase tracking-[0.2em] text-[10px] font-bold mb-6">{t.dev}</h4>
            <ExternalLink href="https://www.kamaltek.com" className="group block">
                {/* Replaced with reusable component */}
                <KamaltekLogo 
                  className="md:items-end group-hover:translate-x-[-4px] transition-transform duration-300"
                />
            </ExternalLink>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-white/20">
        <p>© {new Date().getFullYear()} Mežlīči</p>
        <p>{t.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Globe, Gear } from 'phosphor-react';
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
  
  const pathLang = location.pathname.split('/')[1];
  const currentLang = (['en', 'ru'].includes(pathLang) ? pathLang : 'lv') as 'lv' | 'en' | 'ru';

  const t = {
    lv: { brand: 'Mežlīči.', desc: 'Eleganta atpūtas vieta tiem, kas novērtē dabas tuvumu un mieru Daugavas kreisajā krastā.', settings: 'Uzstādījumi', info: 'Informācija', dev: 'Izstrāde', rights: 'Visas tiesības aizsargātas', contact: 'Kontakti', gallery: 'Galerija', sauna: 'Pirts', policy: 'Privātums', light: 'Gaišs', dark: 'Tumšs' },
    en: { brand: 'Mežlīči.', desc: 'An elegant retreat for those who appreciate nature and peace on the banks of the Daugava.', settings: 'Settings', info: 'Information', dev: 'Development', rights: 'All rights reserved', contact: 'Contacts', gallery: 'Gallery', sauna: 'Sauna', policy: 'Privacy', light: 'Light', dark: 'Dark' },
    ru: { brand: 'Mežlīči.', desc: 'Элегантное место отдыха для тех, кто ценит близость к природе и покой на берегу Даугавы.', settings: 'Настройки', info: 'Информация', dev: 'Разработка', rights: 'Все права защищены', contact: 'Контакты', gallery: 'Галерея', sauna: 'Баня', policy: 'Конфиденциальность', light: 'Свет', dark: 'Тьма' }
  }[currentLang] || { brand: 'Mežlīči.', desc: '', settings: 'Settings', info: 'Info', dev: 'Dev', rights: '', contact: 'Contact', gallery: 'Gallery', sauna: 'Sauna', policy: 'Privacy', light: 'Light', dark: 'Dark' };

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

  // Styles
  const containerClass = "bg-[#F3F3F5] dark:bg-[#080808] text-charcoal-900 dark:text-stone-300 border-t border-stone-200 dark:border-white/10";
  const headingClass = "text-charcoal-900 dark:text-white uppercase tracking-[0.2em] text-[10px] font-bold mb-6 flex items-center gap-2";
  const textClass = "text-charcoal-900/80 dark:text-stone-400 hover:text-charcoal-900 dark:hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block font-medium";
  const brandClass = "font-serif text-3xl block mb-6 text-charcoal-900 dark:text-white hover:text-taupe-500 transition-colors";
  
  // Settings UI - Refined
  const controlGroupClass = "bg-white dark:bg-white/5 p-1 rounded-xl shadow-sm border border-stone-200 dark:border-white/5 flex items-center gap-1 w-full";
  const toggleBtnClass = (active: boolean) => clsx(
    "flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 relative z-10",
    active 
      ? "bg-charcoal-900 dark:bg-stone-200 text-white dark:text-charcoal-900 shadow-sm" 
      : "text-charcoal-900/60 dark:text-white/40 hover:text-charcoal-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10"
  );

  return (
    <footer className={clsx("pt-20 pb-12 px-6 text-sm mt-auto transition-colors duration-500 relative z-40", containerClass)}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 border-b border-stone-200 dark:border-white/10 pb-16">
        
        {/* Brand */}
        <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
          <Link to={`/${currentLang}`} className={brandClass}>
            {t.brand}
          </Link>
          <p className="text-charcoal-900/70 dark:text-stone-500 leading-relaxed max-w-xs font-light text-[13px]">
            {t.desc}
          </p>
        </div>
        
        {/* Settings Control Panel */}
        <div className="md:col-span-3 flex flex-col items-center md:items-start">
          <h4 className={headingClass}>
             <Gear size={14} weight="fill" className="text-taupe-500" />
             {t.settings}
          </h4>
          <div className="flex flex-col gap-3 w-full max-w-[220px]">
            {/* Theme Toggle */}
            <div className={controlGroupClass}>
              <button onClick={() => theme !== 'light' && toggleTheme?.()} className={toggleBtnClass(theme === 'light')}>
                 <Sun size={14} weight="fill" /> {t.light}
              </button>
              <button onClick={() => theme !== 'dark' && toggleTheme?.()} className={toggleBtnClass(theme === 'dark')}>
                 <Moon size={14} weight="fill" /> {t.dark}
              </button>
            </div>

            {/* Language Switcher */}
            <div className={controlGroupClass}>
                {['lv', 'en', 'ru'].map((l) => (
                  <button 
                    key={l}
                    onClick={() => changeLanguage(l)}
                    className={toggleBtnClass(currentLang === l)}
                  >
                    {l}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="md:col-span-2 flex flex-col items-center md:items-start">
          <h4 className={headingClass}>{t.info}</h4>
          <ul className="space-y-3 text-[13px] font-medium flex flex-col items-center md:items-start">
            <li><Link to={`/${currentLang}/gallery`} className={textClass}>{t.gallery}</Link></li>
            <li><Link to={`/${currentLang}/sauna`} className={textClass}>{t.sauna}</Link></li>
            <li><Link to={`/${currentLang}/policy`} className={textClass}>{t.policy}</Link></li>
            <li><button onClick={handleContactClick} className={textClass}>{t.contact}</button></li>
          </ul>
        </div>

        {/* Dev / Logo */}
        <div className="md:col-span-3 flex flex-col items-center md:items-end md:text-right">
            <h4 className={headingClass}>{t.dev}</h4>
            <ExternalLink href="https://www.kamaltek.com" className="group block">
                <KamaltekLogo 
                  classNameIcon="text-charcoal-900 dark:text-white group-hover:text-taupe-500"
                  classNameText="text-charcoal-900 dark:text-white"
                  className="md:items-end group-hover:-translate-x-2 transition-transform duration-300"
                />
            </ExternalLink>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-charcoal-900/40 dark:text-white/30">
        <p>© {new Date().getFullYear()} Mežlīči</p>
        <p>{t.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'phosphor-react';
import { useLocation } from 'react-router-dom';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Robust detection
  const pathLang = location.pathname.split('/')[1];
  const currentLang = (['en', 'ru'].includes(pathLang) ? pathLang : 'lv') as 'lv' | 'en' | 'ru';

  const t = {
    lv: { title: 'Ārēja saite', desc: 'Jūs tiekat novirzīts uz ārēju resursu.', cancel: 'Atcelt', continue: 'Turpināt' },
    en: { title: 'External Link', desc: 'You are being redirected to an external source.', cancel: 'Cancel', continue: 'Continue' },
    ru: { title: 'Внешняя ссылка', desc: 'Вы переходите на внешний ресурс.', cancel: 'Отмена', continue: 'Перейти' }
  }[currentLang] || { title: 'External Link', desc: 'Redirecting to external source.', cancel: 'Cancel', continue: 'Continue' };

  const handleConfirm = () => {
    setIsOpen(false);
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <button 
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {children}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in transition-all duration-500"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Compact, professional modal - Updated dark bg to Stone Dark (Surface0) */}
          <div className="relative bg-[#FDFCF8] dark:bg-stone-dark rounded-[2rem] p-8 max-w-[320px] w-full shadow-2xl animate-slide-up border border-white/10 ring-1 ring-black/5">
            <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-stone/50 dark:bg-white/5 flex items-center justify-center text-charcoal-900 dark:text-white mb-6">
                    <ArrowUpRight size={28} weight="light" />
                </div>
                
                <h3 className="font-serif text-lg text-charcoal-900 dark:text-white mb-2 font-medium">
                    {t.title}
                </h3>
                <p className="text-charcoal-800/60 dark:text-white/50 text-xs leading-relaxed mb-8 px-2 font-sans">
                    {t.desc}
                </p>

                <div className="flex flex-col gap-3 w-full">
                    <button 
                        onClick={handleConfirm}
                        className="w-full py-4 bg-charcoal-900 dark:bg-white text-white dark:text-charcoal-900 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        {t.continue}
                        <ArrowRight size={14} weight="bold" />
                    </button>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-charcoal-900/40 dark:text-white/40 hover:text-charcoal-900 dark:hover:text-white transition-colors"
                    >
                        {t.cancel}
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExternalLink;
import React, { useState } from 'react';
import { ExternalLink as ExternalLinkIcon, X, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  classNameLabel?: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children, className, classNameLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

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

      {/* Modal Portal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-md animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content - Minimalist Design */}
          <div className="relative bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-slide-up border border-stone/50">
            
            <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-3 mb-2 text-taupe-600">
                    <ExternalLinkIcon size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest">Ārēja saite</span>
                </div>
                
                <h3 className="font-serif text-2xl text-charcoal-900 mb-4 leading-tight">
                    Jūs atstājat Mežlīčus
                </h3>
                
                <p className="text-charcoal-800/60 mb-8 font-sans text-sm leading-relaxed">
                    Jūs tiekat novirzīts uz citu vietni. Mēs neesam atbildīgi par ārējo resursu saturu.
                </p>

                <div className="flex items-center gap-4 w-full">
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="flex-1 py-3 bg-stone/30 text-charcoal-900 rounded-lg font-bold text-xs hover:bg-stone/50 transition-colors"
                    >
                        Atcelt
                    </button>
                    <button 
                        onClick={handleConfirm}
                        className="flex-[2] py-3 bg-charcoal-900 text-white rounded-lg font-bold text-xs hover:bg-taupe-500 transition-colors shadow-lg flex items-center justify-center gap-2 group"
                    >
                        Turpināt
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
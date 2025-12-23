import React, { useState } from 'react';
import { ExternalLink as ExternalLinkIcon, X } from 'lucide-react';
import clsx from 'clsx';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  classNameLabel?: string; // Optional styling for the button label itself
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
            className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-slide-up border border-white/20">
            <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-charcoal-800/40 hover:text-charcoal-900 transition-colors"
            >
                <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-taupe-50 rounded-full flex items-center justify-center mb-6 text-taupe-600">
                    <ExternalLinkIcon size={28} />
                </div>
                
                <h3 className="font-serif text-2xl text-charcoal-900 mb-3">
                    Pamest vietni?
                </h3>
                
                <p className="text-charcoal-800/70 mb-8 font-light leading-relaxed">
                    Jūs tiekat novirzīts uz ārēju resursu. Vai vēlaties turpināt?
                </p>

                <div className="flex flex-col gap-3 w-full">
                    <button 
                        onClick={handleConfirm}
                        className="w-full py-4 bg-charcoal-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-taupe-500 transition-colors shadow-lg"
                    >
                        Turpināt
                    </button>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="w-full py-4 bg-transparent text-charcoal-900/50 rounded-xl font-bold uppercase tracking-widest text-xs hover:text-charcoal-900 transition-colors"
                    >
                        Atcelt
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
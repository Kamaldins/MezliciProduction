import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
          onComplete();
        }
      });

      tl.to(barRef.current, {
        x: '0%',
        duration: 1.2,
        ease: 'power2.inOut'
      })
      .to(containerRef.current, {
        y: '-100%',
        duration: 0.8,
        ease: 'power4.inOut',
        delay: 0.2
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 bg-cream z-[9999] flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6">
        <span className="font-serif text-4xl italic text-charcoal-900 tracking-wider">
          Mežlīči
        </span>
        <div className="w-24 h-[1px] bg-stone relative overflow-hidden">
          <div 
            ref={barRef} 
            className="absolute inset-0 bg-taupe-500 transform -translate-x-full" 
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    // Safety timeout: Ensure app loads even if animation fails/hangs on mobile
    const safetyTimeout = setTimeout(() => {
        if (containerRef.current && containerRef.current.style.display !== 'none') {
            onComplete();
        }
    }, 3500);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(safetyTimeout);
          onComplete();
        }
      });

      // Initial state setup to prevent FOUC
      gsap.set(barRef.current, { x: '-100%' });
      
      tl.to(barRef.current, {
        x: '0%',
        duration: 1.5,
        ease: 'power2.inOut'
      })
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in'
      }, "-=0.2")
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut'
      });

    }, containerRef);

    return () => {
        clearTimeout(safetyTimeout);
        ctx.revert();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: '#FDFCF8' }} // Inline style ensures visibility immediately
    >
      <div className="flex flex-col items-center gap-6 overflow-hidden p-4">
        <span 
          ref={textRef}
          className="font-serif text-4xl italic text-charcoal-900 tracking-wider block"
        >
          Mežlīči
        </span>
        <div className="w-32 h-[2px] bg-stone/50 relative overflow-hidden rounded-full">
          <div 
            ref={barRef} 
            className="absolute inset-0 bg-taupe-500 w-full h-full" 
            style={{ transform: 'translateX(-100%)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
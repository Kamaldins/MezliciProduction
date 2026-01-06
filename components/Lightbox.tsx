import React, { useEffect, useCallback } from 'react';
import { GalleryImage } from '../types';
import { X, CaretLeft, CaretRight } from 'phosphor-react';
import clsx from 'clsx';

interface LightboxProps {
  isOpen: boolean;
  image: GalleryImage | null;
  totalImages: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ 
  isOpen, 
  image, 
  totalImages, 
  onClose, 
  onNext, 
  onPrev 
}) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !image) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal-900/40 backdrop-blur-2xl animate-fade-in"
      onClick={onClose}
    >
      {/* Top Bar Controls (Glass) */}
      <div className="absolute top-6 right-6 z-50 flex gap-4">
         <span className="hidden md:flex items-center justify-center px-4 h-12 rounded-full bg-white/10 border border-white/10 text-white/90 text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg">
            {image.id + 1} / {totalImages}
         </span>
         <button 
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10 backdrop-blur-md shadow-lg group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Floating Navigation (Glass) */}
      <div className="absolute inset-x-0 bottom-10 flex justify-center gap-6 z-50 pointer-events-none">
         <button 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="pointer-events-auto w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10 backdrop-blur-md shadow-xl hover:scale-110 active:scale-95"
        >
          <CaretLeft size={24} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="pointer-events-auto w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10 backdrop-blur-md shadow-xl hover:scale-110 active:scale-95"
        >
          <CaretRight size={24} />
        </button>
      </div>

      {/* Main Image Container */}
      <div 
        className="relative max-w-[90vw] max-h-[80vh] md:max-h-[85vh] transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={image.src} 
          alt={`Gallery item ${image.id + 1}`}
          className="w-full h-full object-contain rounded-2xl shadow-2xl ring-1 ring-white/10"
        />
        {/* Mobile Counter */}
        <div className="md:hidden absolute -bottom-16 left-0 right-0 text-center">
            <span className="text-white/80 text-[10px] font-bold tracking-[0.3em] uppercase bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                {image.id + 1} / {totalImages}
            </span>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
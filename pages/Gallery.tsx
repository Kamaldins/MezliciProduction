import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Lightbox from '../components/Lightbox';
import { GALLERY_IMAGES } from '../constants';
import { GalleryImage } from '../types';

const Gallery: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { lang } = useParams();
  const currentLang = lang || 'lv';

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  return (
    <>
      <div className="pt-32 px-6 pb-24 min-h-screen bg-cream animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-20">
            <h1 className="font-serif text-5xl md:text-7xl text-charcoal-900 mb-6">Galerija</h1>
            <Link 
              to={`/${currentLang}`}
              className="inline-block text-xs font-bold uppercase tracking-widest border-b border-charcoal-900 pb-1 hover:text-taupe-600 hover:border-taupe-600 transition-colors"
            >
              Atgriezties
            </Link>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_IMAGES.map((img, index) => (
              <div 
                key={img.id}
                onClick={() => openLightbox(index)}
                className="aspect-[4/5] bg-stone rounded-2xl overflow-hidden group relative cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img 
                  src={img.src} 
                  alt={`Gallery ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-charcoal-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/90 px-5 py-2 rounded-full text-charcoal-900 text-[10px] uppercase tracking-widest font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm">
                    Apskatīt
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox 
        isOpen={lightboxOpen}
        image={GALLERY_IMAGES[currentImageIndex]}
        totalImages={GALLERY_IMAGES.length}
        onClose={() => setLightboxOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
};

export default Gallery;
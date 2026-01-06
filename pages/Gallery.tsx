import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Lightbox from '../components/Lightbox';
import { GALLERY_IMAGES } from '../constants';
import SEO from '../components/SEO';

const Gallery: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { lang } = useParams();
  const currentLang = lang || 'lv';

  const t = {
    lv: { title: 'Galerija', back: 'Atgriezties', view: 'Apskatīt' },
    en: { title: 'Gallery', back: 'Return', view: 'View' },
    ru: { title: 'Галерея', back: 'Вернуться', view: 'Смотреть' }
  }[currentLang as 'lv' | 'en' | 'ru'] || { title: 'Galerija', back: 'Atgriezties', view: 'Apskatīt' };

  const seoKeywords = {
    lv: "galerija, foto, interjers, daba, atpūtas vieta, bildes, brīvdienu māja foto",
    en: "gallery, photos, interior, nature, rest place, pictures, holiday home photos",
    ru: "галерея, фото, интерьер, природа, место отдыха, картинки, фото дома отдыха"
  }[currentLang as 'lv'|'en'|'ru'] || "galerija";

  const seoDesc = {
    lv: "Ieskats Mežlīču brīvdienu mājā un apkārtnē. Apskatiet mūsu interjeru un dabas ainavas.",
    en: "A glimpse into Mežlīči holiday home and surroundings. View our interior and nature landscapes.",
    ru: "Взгляд на дом отдыха Mežlīči и окрестности. Посмотрите наш интерьер и природные пейзажи."
  }[currentLang as 'lv'|'en'|'ru'] || "Galerija";

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
      <SEO 
        title={`${t.title} | Mežlīči`}
        description={seoDesc}
        keywords={seoKeywords}
        lang={currentLang}
      />
      <div className="pt-32 px-6 pb-24 min-h-screen bg-cream dark:bg-cream-dark transition-colors duration-500 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-20">
            <h1 className="font-serif text-5xl md:text-7xl text-charcoal-900 dark:text-cream mb-6 transition-colors">{t.title}</h1>
            <Link 
              to={`/${currentLang}`}
              className="inline-block text-xs font-bold uppercase tracking-widest border-b border-charcoal-900 dark:border-white/50 text-charcoal-900 dark:text-white/70 pb-1 hover:text-taupe-600 dark:hover:text-white hover:border-taupe-600 transition-colors"
            >
              {t.back}
            </Link>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_IMAGES.map((img, index) => (
              <div 
                key={img.id}
                onClick={() => openLightbox(index)}
                className="aspect-[4/5] bg-stone dark:bg-stone-dark rounded-2xl overflow-hidden group relative cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img 
                  src={img.src} 
                  alt={`Gallery ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-charcoal-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/90 px-5 py-2 rounded-full text-charcoal-900 text-[10px] uppercase tracking-widest font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm">
                    {t.view}
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
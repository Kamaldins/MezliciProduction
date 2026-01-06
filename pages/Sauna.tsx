import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'phosphor-react';
import SEO from '../components/SEO';

const Sauna: React.FC = () => {
  const { lang } = useParams();
  const currentLang = lang || 'lv';

  const t = {
    lv: { back: 'Atpakaļ uz sākumu', title: 'Pirts relaksācijai', quote: '"Autentiska koka pirts ar visu nepieciešamo jūsu atpūtai un veselībai."', offer: 'Pirts piedāvājums', cta_title: 'Vēlaties rezervēt?', cta_desc: 'Pirts ir pieejama tikai kopā ar brīvdienu mājas īri.', cta_btn: 'Sazināties ar mums' },
    en: { back: 'Back to home', title: 'Sauna for Relaxation', quote: '"Authentic wooden sauna with everything you need for rest and health."', offer: 'Sauna Features', cta_title: 'Ready to Book?', cta_desc: 'The sauna is available exclusively with the holiday home rental.', cta_btn: 'Contact Us' },
    ru: { back: 'Назад на главную', title: 'Баня для релаксации', quote: '"Аутентичная деревянная баня со всем необходимым для вашего отдыха и здоровья."', offer: 'Предложение бани', cta_title: 'Хотите забронировать?', cta_desc: 'Баня доступна только при аренде дома для отдыха.', cta_btn: 'Связаться с нами' }
  }[currentLang as 'lv'|'en'|'ru'] || {};

  const seoKeywords = {
    lv: "pirts, sauna, relaksācija, pirts rituāli, atpūta, koka pirts, veselība",
    en: "sauna, bathhouse, relaxation, sauna rituals, rest, wooden sauna, health",
    ru: "баня, сауна, релаксация, банные ритуалы, отдых, деревянная баня, здоровье"
  }[currentLang as 'lv'|'en'|'ru'] || "pirts, sauna";

  const seoDesc = t.quote ? t.quote.replace(/"/g, '') : "Autentiska koka pirts jūsu atpūtai.";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-cream dark:bg-cream-dark pt-32 pb-24 px-6 transition-colors">
      <SEO 
        title={`${t.title || 'Pirts'} | Mežlīči`}
        description={seoDesc}
        keywords={seoKeywords}
        lang={currentLang}
      />
      <div className="max-w-7xl mx-auto">
         <div className="mb-12">
            <Link to={`/${currentLang}`} className="text-xs font-bold uppercase tracking-widest text-charcoal-900/50 dark:text-cream/40 hover:text-taupe-500 transition-colors">
              ← {t.back}
            </Link>
         </div>

         <header className="max-w-4xl mb-16">
            <h1 className="font-serif text-5xl md:text-7xl text-charcoal-900 dark:text-cream mb-6">{t.title}</h1>
            <p className="text-xl md:text-2xl text-taupe-600 font-serif italic max-w-2xl leading-relaxed">{t.quote}</p>
         </header>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="space-y-8">
               <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-stone/20 dark:border-white/5">
                  <img src="https://i.ibb.co/hxtqWnNq/Whats-App-Image-2025-10-25-at-16-40-19-4.jpg" alt="Pirts" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
               </div>
               <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-stone/20 dark:border-white/5">
                  <img src="https://i.ibb.co/fVr4nwTP/Whats-App-Image-2025-10-25-at-16-40-18-3.jpg" alt="Pirts iekšā" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
               </div>
            </div>

            <div className="space-y-12 lg:sticky lg:top-32">
               <div className="prose prose-lg dark:prose-invert text-charcoal-800/80 dark:text-cream/60 font-light leading-relaxed">
                  <p>{currentLang === 'lv' ? 'Mūsu pirts ir veidota, lai sniegtu maksimālu relaksāciju.' : currentLang === 'ru' ? 'Наша баня создана для максимального расслабления.' : 'Our sauna is designed for maximum relaxation.'}</p>
               </div>

               <div className="bg-white dark:bg-stone-dark p-10 rounded-3xl shadow-sm border border-stone/30 dark:border-white/5">
                  <h3 className="font-serif text-2xl text-charcoal-900 dark:text-cream mb-8">{t.offer}</h3>
                  <ul className="space-y-4">
                     {['Malkas krāsns', 'Koka apdare', 'Slotiņas', 'Duša', 'Izeja uz terasi'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-4 text-charcoal-800/80 dark:text-cream/60">
                           <span className="w-5 h-5 rounded-full bg-taupe-500/10 flex items-center justify-center text-taupe-600"><CheckCircle size={16} weight="fill" /></span>
                           <span className="font-light">{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               <div className="bg-taupe-500/10 p-10 rounded-3xl border border-taupe-500/20">
                  <h3 className="font-serif text-xl text-charcoal-900 dark:text-cream mb-4">{t.cta_title}</h3>
                  <p className="text-charcoal-800/70 dark:text-cream/50 mb-8 text-sm">{t.cta_desc}</p>
                  <Link 
                    to={`/${currentLang}`} 
                    onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)}
                    className="group inline-flex items-center gap-4 px-8 py-4 bg-charcoal-900 dark:bg-taupe-500 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:-translate-y-1 transition-all shadow-lg"
                  >
                     {t.cta_btn}
                     <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>
         </div>
      </div>
    </main>
  );
};

export default Sauna;
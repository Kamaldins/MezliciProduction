import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PHONE_HREF, ADDRESS, MAPS_LINK, WAZE_LINK, APPLE_MAPS_LINK, PHONE_NUMBER } from '../constants';
import { Link, useParams } from 'react-router-dom';
import { House, Tree, MapPin, CheckCircle, ArrowRight, CaretRight, MapTrifold, Car, Compass, Phone, EnvelopeSimple } from 'phosphor-react';
import ExternalLink from '../components/ExternalLink';
import SEO from '../components/SEO';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC<{ isPreloading?: boolean }> = ({ isPreloading = false }) => {
  const { lang } = useParams();
  const currentLang = lang || 'lv';
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const translations = {
    lv: {
      tag: ADDRESS,
      title: "Miers.",
      subtitle: "Daba. Daugava.",
      desc: "Atgūsti spēkus un relaksējies klusā meža ielokā. Brīvdienu māja, kur laiks apstājas.",
      btn: "Rezervēt",
      amenities: "Kas jūs sagaida",
      offers: "Piedāvājums",
      sauna_link: "Vairāk par pirti",
      location_tag: "Koordinātes",
      location_desc: "Vienkārša piekļuve, izmantojot populārākās navigācijas lietotnes.",
      contact_tag: "Kontakti",
      booking: "Rezervācija",
      quote: '"Sazinieties ar mums, lai vienotos par labāko laiku jūsu atpūtai."',
      call: "Zvanīt mums",
      email_label: "Rakstīt e-pastu",
      email: "info@mezlici.lv"
    },
    en: {
      tag: ADDRESS,
      title: "Peace.",
      subtitle: "Nature. Daugava.",
      desc: "Restore your energy and relax in a quiet forest setting. A holiday home where time stands still.",
      btn: "Book Now",
      amenities: "What Awaits You",
      offers: "Offerings",
      sauna_link: "More about Sauna",
      location_tag: "Coordinates",
      location_desc: "Easy access using popular navigation apps.",
      contact_tag: "Contacts",
      booking: "Booking",
      quote: '"Contact us to arrange the perfect time for your stay."',
      call: "Call Us",
      email_label: "Send Email",
      email: "info@mezlici.lv"
    },
    ru: {
      tag: ADDRESS,
      title: "Покой.",
      subtitle: "Природа. Даугава.",
      desc: "Восстановите силы и отдохните в тихом лесном уголке. Дом для отдыха, где время останавливается.",
      btn: "Бронировать",
      amenities: "Что вас ожидает",
      offers: "Предложение",
      sauna_link: "Подробнее о бане",
      location_tag: "Координаты",
      location_desc: "Легкий доступ с помощью популярных навигационных приложений.",
      contact_tag: "Контакты",
      booking: "Бронирование",
      quote: '"Свяжитесь с нами, чтобы договориться о лучшем времени для вашего отдыха."',
      call: "Позвонить",
      email_label: "Написать",
      email: "info@mezlici.lv"
    }
  }[currentLang as 'lv' | 'en' | 'ru'] || {};

  const seoKeywords = {
    lv: "brīvdienu māja, atpūta pie daugavas, pirts, namiņš mežā, ķegums, relaksācija, naktsmītne",
    en: "holiday home, rest by daugava, sauna, cabin in forest, kegums, relaxation, accommodation",
    ru: "дом отдыха, отдых у даугавы, баня, домик в лесу, кегумс, релаксация, ночлег"
  }[currentLang as 'lv'|'en'|'ru'] || "brīvdienu māja";

  useEffect(() => {
    if (isPreloading) return;

    const ctx = gsap.context(() => {
      // 1. Hero Parallax & Fade Out
      if (heroRef.current && heroContentRef.current) {
        gsap.to("#hero-bg", {
          yPercent: 30,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });

        gsap.to(heroContentRef.current, {
          y: -100,
          opacity: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "60% top",
            scrub: true
          }
        });
      }

      // 2. Section Reveal Animations
      gsap.utils.toArray('.reveal-text').forEach((elem: any) => {
        gsap.fromTo(elem, 
          { y: 40, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 1, ease: "power3.out", 
            scrollTrigger: {
              trigger: elem,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // 3. Hero Entry Animation
      gsap.fromTo(".hero-anim", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isPreloading]);

  const mapBtnClass = "flex-1 min-w-[120px] px-4 py-4 bg-white dark:bg-stone-dark rounded-xl text-[10px] font-bold uppercase tracking-widest border border-stone-200 dark:border-white/10 text-charcoal-900 dark:text-gray-200 hover:bg-taupe-500 hover:text-white hover:border-taupe-500 dark:hover:bg-taupe-500 dark:hover:text-white dark:hover:border-taupe-500 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg flex items-center justify-center gap-2 group";

  return (
    <main className="flex-1 w-full overflow-hidden bg-cream dark:bg-cream-dark transition-colors duration-500">
      <SEO 
        title={`Mežlīči | ${translations.subtitle || 'Atpūta pie Daugavas'}`}
        description={translations.desc || 'Brīvdienu māja pie Daugavas.'}
        keywords={seoKeywords}
        lang={currentLang}
      />
      
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            id="hero-bg"
            src="https://i.ibb.co/mVH0z4S8/Whats-App-Image-2025-10-25-at-16-40-18.jpg" 
            className="w-full h-full object-cover scale-105" 
            alt="Mežlīči"
          />
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50 transition-colors duration-500" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-cream dark:from-cream-dark to-transparent" />
        </div>

        <div ref={heroContentRef} className="relative z-10 max-w-7xl mx-auto w-full pt-20 md:pt-16">
          <span className="block text-white/90 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4 md:mb-6 hero-anim opacity-0">
            {translations.tag}
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.9] md:leading-[0.85] text-white mb-6 md:mb-8 hero-anim opacity-0 hero-text-shadow tracking-tight">
            {translations.title}<br/>
            <span className="italic font-normal text-white/80">{translations.subtitle}</span>
          </h1>
          <p className="max-w-xl text-white/90 text-base md:text-2xl leading-relaxed hero-anim opacity-0 font-light drop-shadow-md mb-8 md:mb-12 text-balance">
            {translations.desc}
          </p>
          <div className="hero-anim opacity-0">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-4 px-8 py-4 bg-white text-charcoal-900 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {translations.btn}
              <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* --- AMENITIES --- */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-cream dark:bg-cream-dark transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 reveal-text">
            <span className="text-taupe-500 text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">{translations.offers}</span>
            <h2 className="font-serif text-4xl md:text-7xl text-charcoal-900 dark:text-gray-100 transition-colors">
              {translations.amenities}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard 
              icon={<House size={32} weight="light" className="text-taupe-500" />}
              title={currentLang === 'lv' ? "Mājā pieejams" : currentLang === 'ru' ? "В доме имеется" : "In the House"}
              items={currentLang === 'lv' ? ["Pirts relaksācijai", "Pilnībā aprīkota virtuve", "Modernas labierīcības", "Guļamvieta līdz 10 viesiem"] : currentLang === 'ru' ? ["Баня для отдыха", "Оборудованная кухня", "Удобства", "До 10 спальных мест"] : ["Sauna for relaxation", "Fully equipped kitchen", "Modern amenities", "Sleeps up to 10 guests"]}
            />
            <FeatureCard 
              icon={<Tree size={32} weight="light" className="text-taupe-500" />}
              title={currentLang === 'lv' ? "Āra aktivitātes" : currentLang === 'ru' ? "На улице" : "Outdoor Activities"}
              items={currentLang === 'lv' ? ["Peldvieta ar laipu", "Laiva & Kubls", "Aizverama terase", "Plaša pļava"] : currentLang === 'ru' ? ["Купальня с мостиком", "Лодка и чан", "Крытая терраса", "Просторный луг"] : ["Swimming area", "Boat & Hot tub", "Enclosed terrace", "Spacious meadow"]}
            />
            <FeatureCard 
              icon={<MapPin size={32} weight="light" className="text-taupe-500" />}
              title={currentLang === 'lv' ? "Atrašanās vieta" : currentLang === 'ru' ? "Локация" : "Location"}
              items={currentLang === 'lv' ? ["Daugavas kreisais krasts", "Meža ieskauta vide", "Privāta piekļuve", "Tuvu Ķeguma pilsētai"] : currentLang === 'ru' ? ["Левый берег Даугавы", "В окружении леса", "Приватный доступ", "Рядом с Кегумсом"] : ["Left bank of Daugava", "Forest surroundings", "Private access", "Near Kegums city"]}
            />
          </div>
          
          <div className="mt-12 md:mt-16 text-center reveal-text">
             <Link 
              to={`/${currentLang}/sauna`}
              className="group inline-flex items-center gap-4 px-8 py-4 bg-transparent border border-charcoal-900/40 dark:border-white/40 text-charcoal-900 dark:text-gray-200 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-charcoal-900 hover:text-white dark:hover:bg-white dark:hover:text-charcoal-900 hover:-translate-y-1 transition-all duration-300"
            >
              {translations.sauna_link}
              <CaretRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- MAP --- */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-stone-100 dark:bg-stone-dark transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12 reveal-text">
            <div className="max-w-xl">
              <span className="text-taupe-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">{translations.location_tag}</span>
              <h2 className="font-serif text-4xl md:text-6xl text-charcoal-900 dark:text-gray-100 mb-6 leading-tight">
                {ADDRESS}
              </h2>
              <p className="text-charcoal-900/80 dark:text-gray-300 font-light text-lg">
                {translations.location_desc}
              </p>
            </div>
            
            {/* Navigation Buttons Control Group */}
            <div className="w-full md:w-auto grid grid-cols-2 md:grid-cols-3 gap-3">
              <ExternalLink href={WAZE_LINK} className={mapBtnClass}>
                <Car size={20} className="text-taupe-500 group-hover:text-white transition-colors" />
                Waze
              </ExternalLink>
              <ExternalLink href={MAPS_LINK} className={mapBtnClass}>
                <MapTrifold size={20} className="text-taupe-500 group-hover:text-white transition-colors" />
                Google
              </ExternalLink>
              <ExternalLink href={APPLE_MAPS_LINK} className={clsx(mapBtnClass, "col-span-2 md:col-span-1")}>
                <Compass size={20} className="text-taupe-500 group-hover:text-white transition-colors" />
                Apple
              </ExternalLink>
            </div>
          </div>

          <div className="h-[400px] md:h-[650px] w-full relative overflow-hidden rounded-[2rem] shadow-2xl border border-stone-200 dark:border-white/10 reveal-text">
             {/* Map Integration - Reverted to Google Maps per request */}
            <iframe 
              src="https://maps.google.com/maps?q=56.7222882,24.7222041&t=h&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Mežlīči Location"
              className="dark:filter dark:grayscale-[20%] dark:contrast-125 transition-all duration-500"
            />
          </div>
        </div>
      </section>

      {/* --- CONTACT / RESERVATION --- */}
      <section id="contact" className="py-20 md:py-32 px-4 md:px-6 bg-cream dark:bg-cream-dark border-t border-stone-200 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto reveal-text">
          <div className="text-center mb-16">
            <span className="text-taupe-500 text-[11px] font-bold tracking-[0.3em] uppercase mb-6 block">{translations.contact_tag}</span>
            <h2 className="font-serif text-5xl md:text-7xl text-charcoal-900 dark:text-gray-100 leading-none">{translations.booking}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Contact Details (Redesigned for elegance) */}
            <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
              <div className="bg-white dark:bg-stone-dark p-8 md:p-10 rounded-[2.5rem] shadow-soft border border-stone-200 dark:border-white/5 h-full flex flex-col justify-center">
                 <p className="font-serif text-2xl text-charcoal-900 dark:text-gray-100 italic leading-relaxed mb-10">
                   {translations.quote}
                 </p>

                 <div className="space-y-4">
                    {/* Phone Card */}
                    <a 
                      href={PHONE_HREF} 
                      className="group flex items-center justify-between p-6 bg-charcoal-900 dark:bg-stone-100 text-white dark:text-charcoal-900 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center">
                           <Phone size={24} weight="fill" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">{translations.call}</span>
                           <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight">{PHONE_NUMBER}</span>
                        </div>
                      </div>
                      <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </a>

                    {/* Email Card */}
                    <a 
                      href={`mailto:${translations.email}`}
                      className="flex items-center gap-5 p-6 bg-stone-100 dark:bg-white/5 rounded-3xl hover:bg-stone-200 dark:hover:bg-white/10 transition-colors"
                    >
                       <div className="w-12 h-12 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-taupe-500 shadow-sm">
                           <EnvelopeSimple size={24} />
                       </div>
                       <div className="flex flex-col">
                           <span className="text-[10px] uppercase tracking-widest text-charcoal-900/50 dark:text-white/40 mb-1">{translations.email_label}</span>
                           <span className="font-medium text-lg text-charcoal-900 dark:text-white">{translations.email}</span>
                       </div>
                    </a>
                 </div>
              </div>
            </div>

            {/* Right Column: Calendar */}
            <div className="lg:col-span-7 w-full h-full min-h-[500px] bg-white dark:bg-stone-dark p-2 rounded-[2.5rem] shadow-soft border border-stone-200 dark:border-white/5 overflow-hidden order-1 lg:order-2">
               <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white">
                  <iframe 
                    src="https://calendar.google.com/calendar/embed?src=8b6becdf2ad7c40fcee5c32b695484bf1ae9f1080d335739732474da77b9cbfd%40group.calendar.google.com&ctz=Europe%2FRiga&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0" 
                    style={{ border: 0 }} 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no"
                    title="Booking Calendar"
                    className="w-full h-full min-h-[500px] dark:invert dark:hue-rotate-180 dark:opacity-90 dark:contrast-90 transition-all duration-500"
                  />
               </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

// Fixed FeatureCard with better contrast in Dark Mode and Responsive Padding
const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, items: string[] }> = ({ icon, title, items }) => (
  <div className="reveal-text bg-white dark:bg-stone-dark p-8 md:p-10 rounded-[2rem] border border-stone-200 dark:border-white/5 hover:border-taupe-500/50 transition-all duration-500 shadow-soft hover:shadow-xl h-full flex flex-col items-center text-center group">
     <div className="w-16 h-16 rounded-2xl bg-taupe-500/5 flex items-center justify-center mb-6 md:mb-8 shadow-inner group-hover:scale-110 transition-transform duration-300">
        {icon}
     </div>
     <h3 className="font-serif text-2xl md:text-3xl text-charcoal-900 dark:text-gray-100 mb-6 transition-colors">{title}</h3>
     <ul className="space-y-4 w-full">
        {items.map((item, idx) => (
           <li key={idx} className="flex items-center justify-center gap-3 text-charcoal-900/80 dark:text-stone-300 font-light text-base md:text-lg transition-colors">
              <CheckCircle weight="fill" className="w-5 h-5 text-taupe-500/80 flex-shrink-0" />
              <span>{item}</span>
           </li>
        ))}
     </ul>
  </div>
);

export default Home;
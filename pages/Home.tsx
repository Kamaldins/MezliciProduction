import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PHONE_HREF, ADDRESS, MAPS_LINK, WAZE_LINK, PHONE_NUMBER } from '../constants';
import { Link, useParams } from 'react-router-dom';
import { Home as HomeIcon, Tent, MapPin, Calendar, Check, Phone } from 'lucide-react';
import ExternalLink from '../components/ExternalLink';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  isPreloading?: boolean;
}

const Home: React.FC<HomeProps> = ({ isPreloading = false }) => {
  const { lang } = useParams();
  const currentLang = lang || 'lv';
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the preloader is still active, do not start animations yet.
    if (isPreloading) return;

    const ctx = gsap.context(() => {
      // Hero Animation - Smoother
      gsap.from(".reveal-hero", {
        y: 40, 
        opacity: 0, 
        duration: 1.5, 
        stagger: 0.1, 
        ease: "power2.out",
        delay: 0.1
      });
      
      // Parallax for Hero BG
      gsap.to("#hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Features Grid Stagger
      const cards = gsap.utils.toArray('.feature-card');
      gsap.from(cards, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 85%",
        }
      });

    }, [heroRef, featuresRef]);
    return () => ctx.revert();
  }, [isPreloading]); // Re-run effect when preloading finishes

  return (
    <main className="flex-1 w-full overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            id="hero-bg"
            src="https://i.ibb.co/mVH0z4S8/Whats-App-Image-2025-10-25-at-16-40-18.jpg" 
            className="w-full h-[120%] -mt-[5%] object-cover scale-105" 
            alt="Mežlīči Exterior"
          />
          {/* Enhanced Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-cream via-cream/50 to-transparent" />
        </div>

        <div ref={textRef} className="relative z-10 max-w-7xl mx-auto w-full pt-20 pl-4 md:pl-0">
          <span className="block text-white/90 text-xs font-bold tracking-[0.3em] uppercase mb-8 reveal-hero drop-shadow-lg">
            {ADDRESS}
          </span>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-white mb-10 reveal-hero hero-text-shadow tracking-tight">
            Miers.<br/>
            <span className="italic font-normal text-white/90">Daba. Daugava.</span>
          </h1>
          <p className="max-w-lg text-white/95 text-lg md:text-xl leading-relaxed reveal-hero font-medium drop-shadow-lg text-balance tracking-wide">
            Atgūsti spēkus un relaksējies klusā meža ielokā. Brīvdienu māja, kur laiks apstājas.
          </p>
          <div className="mt-14 reveal-hero">
            <a 
              href="#contact" 
              className="inline-block bg-white text-charcoal-900 px-10 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-taupe-500 hover:text-white transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Rezervēt Atpūtu
            </a>
          </div>
        </div>
      </section>

      {/* --- KAS JŪS SAGAIDA (AMENITIES) --- */}
      <section ref={featuresRef} className="py-24 md:py-32 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-5xl md:text-6xl text-charcoal-900 mb-20 text-center">
            Kas jūs sagaida
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Mājā pieejams */}
            <FeatureCard 
              icon={<HomeIcon className="w-6 h-6 text-taupe-600" />}
              title="Mājā pieejams"
              items={[
                "Pirts relaksācijai",
                "Pilnībā aprīkota virtuve",
                "Modernas labierīcības",
                "Guļamvieta mansardā (līdz 10 viesiem)"
              ]}
              iconBg="bg-taupe-50"
            />

            {/* Card 2: Āra aktivitātes */}
            <FeatureCard 
              icon={<Tent className="w-6 h-6 text-taupe-600" />}
              title="Āra aktivitātes"
              items={[
                "Plaša pļava ar telšu vietām",
                "Peldvieta ar laipu",
                "Laivas ielaišanas vieta un laiva",
                "Aizveramas terases svinību zona",
                "Kubls ar hidromasāžu"
              ]}
              iconBg="bg-taupe-50"
            />

            {/* Card 3: Atrašanās vieta */}
            <div className="feature-card bg-white p-10 rounded-2xl border border-stone/50 hover:border-taupe-500/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-taupe-50 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-taupe-600" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal-900 mb-4">Atrašanās vieta</h3>
              <p className="text-charcoal-800/70 font-light leading-relaxed">
                Daugavas kreisajā krastā pie Ķeguma HES
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
             {/* Card 4: Pieejamība */}
             <div className="feature-card bg-white p-10 rounded-2xl border border-stone/50 hover:border-taupe-500/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-taupe-50 flex items-center justify-center mb-6">
                  <Calendar className="w-6 h-6 text-taupe-600" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal-900 mb-4">Pieejamība</h3>
                <p className="text-charcoal-800/70 font-light leading-relaxed">
                  Māja ir pieejama no pl. 17:00 - 13:00 iepriekš piesakoties
                </p>
             </div>

             {/* Card 5: Adrese */}
             <div className="feature-card bg-white p-10 rounded-2xl border border-stone/50 hover:border-taupe-500/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-taupe-50 flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6 text-taupe-600" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal-900 mb-4">Adrese</h3>
                <p className="text-charcoal-800/70 font-bold leading-relaxed">
                  {ADDRESS}
                </p>
             </div>
          </div>
          
          <div className="mt-16 text-center">
             <Link 
              to={`/${currentLang}/sauna`}
              className="inline-block px-10 py-4 border border-charcoal-900 text-charcoal-900 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-taupe-500 hover:border-taupe-500 hover:text-white transition-all duration-300"
            >
              Uzzināt vairāk par pirti
            </Link>
          </div>
        </div>
      </section>

      {/* --- MAP --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <span className="text-taupe-600 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                Lokācija
              </span>
              <h2 className="font-serif text-5xl text-charcoal-900">
                {ADDRESS}
              </h2>
            </div>
            <div className="flex gap-4">
              <ExternalLink href={WAZE_LINK} className="px-6 py-3 bg-stone/30 rounded-full text-xs font-bold uppercase tracking-widest text-charcoal-900 hover:bg-taupe-500 hover:text-white transition-colors flex items-center gap-2">
                Waze
              </ExternalLink>
              <ExternalLink href={MAPS_LINK} className="px-6 py-3 bg-stone/30 rounded-full text-xs font-bold uppercase tracking-widest text-charcoal-900 hover:bg-taupe-500 hover:text-white transition-colors flex items-center gap-2">
                Google Maps
              </ExternalLink>
            </div>
          </div>

          <div className="h-[400px] md:h-[550px] w-full relative overflow-hidden rounded-3xl shadow-lg border border-stone/50 group my-8 md:my-0">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2166.002996924856!2d24.7222041!3d56.7222882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTbCsDQzJzIwLjIiTiAyNMKwNDMnMjYuMCJF!5e0!3m2!1sen!2slv!4v1625680000000!5m2!1sen!2slv&t=h" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Mežlīči Location"
              className="transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* --- CONTACT & CALENDAR --- */}
      <section id="contact" className="py-32 px-6 bg-cream border-t border-stone relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-taupe-500/5 rounded-full blur-3xl -z-0" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-serif text-5xl md:text-7xl text-charcoal-900 mb-8">Rezervēt Atpūtu</h2>
          <p className="font-serif text-2xl text-taupe-600 italic mb-12">
            "Mēs palīdzēsim rezervēt perfektu brīvdienu vietu."
          </p>

          {/* Improved Contact Card with High Visibility - Redesigned Button */}
          <div className="bg-white p-8 md:p-12 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] rounded-3xl max-w-xl mx-auto mb-16 border-2 border-taupe-500/20 hover:border-taupe-500 transition-colors duration-300 group">
            <p className="text-xs font-bold text-charcoal-900/60 uppercase tracking-[0.2em] mb-8">
              Sazināties ar Saimnieku Andreju
            </p>
            
            <a 
              href={PHONE_HREF} 
              className="flex flex-col md:flex-row items-center justify-center gap-6 group-hover:opacity-90 transition-opacity"
            >
              {/* Professional Tactile Button */}
              <div className="w-full md:w-auto bg-charcoal-900 text-white px-8 py-4 rounded-full flex items-center justify-center gap-4 shadow-xl hover:bg-taupe-500 transition-all duration-300 transform hover:-translate-y-1 active:scale-95">
                <Phone size={24} className="animate-pulse" />
                <span className="font-serif text-2xl md:text-3xl font-bold tracking-wide">
                  {PHONE_NUMBER}
                </span>
              </div>
            </a>
            <p className="mt-6 text-charcoal-800/40 text-xs uppercase tracking-widest">
                Zvanīt jebkurā laikā
            </p>
          </div>
          
          <div className="bg-white p-4 md:p-8 shadow-lg rounded-2xl border border-stone overflow-hidden">
            <iframe 
              src="https://calendar.google.com/calendar/embed?src=8b6becdf2ad7c40fcee5c32b695484bf1ae9f1080d335739732474da77b9cbfd%40group.calendar.google.com&ctz=Europe%2FRiga&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0" 
              style={{ border: 0 }} 
              width="100%" 
              height="450" 
              frameBorder="0" 
              scrolling="no"
              title="Booking Calendar"
            />
          </div>
        </div>
      </section>

    </main>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, items: string[], iconBg: string }> = ({ icon, title, items, iconBg }) => (
  <div className="feature-card bg-white p-10 rounded-2xl border border-stone/50 hover:border-taupe-500/30 transition-all duration-300 shadow-sm hover:shadow-md h-full">
     <div className="flex items-center gap-4 mb-6">
        <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0", iconBg)}>
           {icon}
        </div>
        <h3 className="font-serif text-2xl text-charcoal-900">{title}</h3>
     </div>
     <ul className="space-y-3">
        {items.map((item, idx) => (
           <li key={idx} className="flex items-start gap-3 text-charcoal-800/70 font-light">
              <Check className="w-5 h-5 text-taupe-500/60 mt-[2px] flex-shrink-0" />
              <span>{item}</span>
           </li>
        ))}
     </ul>
  </div>
);

export default Home;
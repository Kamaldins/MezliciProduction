import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';

const Sauna: React.FC = () => {
  const { lang } = useParams();
  const currentLang = lang || 'lv';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-cream pt-32 pb-24 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
         {/* Navigation */}
         <div className="mb-12">
            <Link 
              to={`/${currentLang}`}
              className="text-xs font-bold uppercase tracking-widest text-charcoal-900/50 hover:text-charcoal-900 transition-colors"
            >
              ← Atpakaļ uz sākumu
            </Link>
         </div>

         {/* Header */}
         <header className="max-w-4xl mb-16">
            <h1 className="font-serif text-5xl md:text-7xl text-charcoal-900 mb-6">Pirts relaksācijai</h1>
            <p className="text-xl md:text-2xl text-taupe-600 font-serif italic max-w-2xl leading-relaxed">
              "Autentiska koka pirts ar visu nepieciešamo jūsu atpūtai un veselībai."
            </p>
         </header>

         {/* Content Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Left Col: Images */}
            <div className="space-y-8">
               <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://i.ibb.co/hxtqWnNq/Whats-App-Image-2025-10-25-at-16-40-19-4.jpg" 
                    alt="Pirts ēka" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
               </div>
               <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://i.ibb.co/fVr4nwTP/Whats-App-Image-2025-10-25-at-16-40-18-3.jpg" 
                    alt="Pirts iekšskats" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
               </div>
            </div>

            {/* Right Col: Details */}
            <div className="space-y-12 lg:sticky lg:top-32">
               
               {/* Description */}
               <div className="prose prose-lg text-charcoal-800/80 font-light leading-relaxed">
                  <p>
                    Mūsu pirts ir veidota, lai sniegtu maksimālu relaksāciju. Tā ir aprīkota ar visu nepieciešamo - no tradicionāliem koka soliem līdz ērtiem atpūtas stūrīšiem. Pirts ir lieliska vieta, kur atgūt enerģiju pēc garas nedēļas vai aktīvas dienas dabā.
                  </p>
                  <p>
                    Pirts ir iekļauta mājas īres cenā un ir pieejama lietošanai visu uzturēšanās laiku, ļaujot jums baudīt pirts rituālus sev ērtākajā laikā.
                  </p>
               </div>

               {/* Features Box */}
               <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-stone">
                  <h3 className="font-serif text-2xl text-charcoal-900 mb-8">Pirts piedāvājums</h3>
                  <ul className="space-y-4">
                     <ListItem text="Autentiska malkas krāsns" />
                     <ListItem text="Dabīga koka apdare un lāvas" />
                     <ListItem text="Pirts slotiņas un ēteriskās eļļas" />
                     <ListItem text="Atsevišķa dušas telpa" />
                     <ListItem text="Tieša izeja uz terasi un kublu" />
                     <ListItem text="Pieejama visu diennakti" />
                  </ul>
               </div>

               {/* CTA */}
               <div className="bg-taupe-500/10 p-8 rounded-2xl border border-taupe-500/20">
                  <h3 className="font-serif text-xl text-charcoal-900 mb-4">Vēlaties rezervēt?</h3>
                  <p className="text-charcoal-800/70 mb-6 text-sm">
                     Pirts ir pieejama tikai kopā ar brīvdienu mājas īri.
                  </p>
                  <Link 
                     to={`/${currentLang}#contact`}
                     className="inline-block px-8 py-3 bg-charcoal-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-taupe-500 transition-colors"
                     onClick={() => {
                        // Go to home bottom
                        setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
                     }}
                  >
                     Sazināties ar mums
                  </Link>
               </div>

            </div>
         </div>
      </div>
    </main>
  );
};

const ListItem: React.FC<{ text: string }> = ({ text }) => (
    <li className="flex items-center gap-4 text-charcoal-800/80">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-taupe-500/10 flex items-center justify-center text-taupe-600">
            <Check size={14} strokeWidth={2.5} />
        </span>
        <span className="font-light text-lg">{text}</span>
    </li>
);

export default Sauna;
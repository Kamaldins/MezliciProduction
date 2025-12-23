import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Policy: React.FC = () => {
  const { lang } = useParams();
  const currentLang = lang || 'lv';

  return (
    <div className="pt-32 px-6 pb-24 min-h-screen bg-cream animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <Link 
          to={`/${currentLang}`}
          className="text-xs font-bold uppercase tracking-widest text-charcoal-900/50 hover:text-charcoal-900 transition-colors mb-12 block"
        >
          ← Atpakaļ
        </Link>
        <h1 className="font-serif text-5xl text-charcoal-900 mb-12">Privātuma Politika</h1>
        
        <div className="space-y-12 text-charcoal-800 leading-relaxed font-light text-lg">
          <p className="text-2xl font-serif italic text-charcoal-900">
            Mēs augstu vērtējam jūsu privātumu un datu drošību.
          </p>
          
          <PolicySection 
            title="1. Vispārīgie Noteikumi" 
            content="Brīvdienu māja 'Mežlīči' apņemas ievērot Vispārīgo datu aizsardzības regulu (GDPR). Mēs apkopojam tikai to informāciju, kas nepieciešama rezervācijas nodrošināšanai."
          />

          <PolicySection 
            title="2. Sīkdatnes" 
            content="Mēs izmantojam tikai tehniskās sīkdatnes, kas nepieciešamas mājaslapas korektai darbībai. Analītiskās sīkdatnes (ja tiek izmantotas) ir anonimizētas un kalpo tikai vietnes veiktspējas uzlabošanai."
          />

          <PolicySection 
            title="3. Rezervācijas Dati" 
            content="Jūsu tālruņa numurs un vārds, kas tiek izmantots saziņai un rezervācijai, tiek glabāts droši un netiek nodots trešajām pusēm mārketinga nolūkos."
          />

          <div className="pt-8 mt-12 border-t border-charcoal-900/10">
            <p className="text-sm text-charcoal-900/50">Atjaunots: 2025. gada Janvāris</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PolicySection: React.FC<{ title: string, content: string }> = ({ title, content }) => (
  <div className="space-y-4">
    <h3 className="font-bold text-charcoal-900 text-sm uppercase tracking-widest border-b border-stone pb-2">
      {title}
    </h3>
    <p>{content}</p>
  </div>
);

export default Policy;
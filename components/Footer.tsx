import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PHONE_HREF } from '../constants';

const Footer: React.FC = () => {
  const { lang } = useParams();
  const currentLang = lang || 'lv';

  return (
    <footer className="bg-charcoal-900 text-cream/80 py-24 px-6 text-sm mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <span className="font-serif text-3xl block mb-6 text-cream">Mežlīči.</span>
          <p className="text-cream/60 leading-relaxed max-w-xs text-balance">
            Klusuma un miera osta pie Daugavas. Radīts dabas mīļotājiem un tiem, kas meklē atelpu.
          </p>
        </div>
        
        {/* Spacer */}
        <div className="hidden md:block"></div>

        {/* Links */}
        <div>
          <h4 className="text-taupe-500 uppercase tracking-widest text-xs font-bold mb-6">Informācija</h4>
          <ul className="space-y-4 text-cream/70">
            <li>
              <Link to={`/${currentLang}/gallery`} className="hover:text-white transition-colors">
                Galerija
              </Link>
            </li>
            <li>
              <Link to={`/${currentLang}/policy`} className="hover:text-white transition-colors">
                Privātums & Sīkdatnes
              </Link>
            </li>
            <li>
              <a href={PHONE_HREF} className="hover:text-white transition-colors">
                Kontakti
              </a>
            </li>
          </ul>
        </div>

        {/* Credits */}
        <div>
          <h4 className="text-taupe-500 uppercase tracking-widest text-xs font-bold mb-6">Izstrāde</h4>
          <a 
            href="https://www.kamaltek.com/en/projects/mezlici-holiday-home" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block group"
          >
            <span className="text-2xl font-bold text-cream group-hover:text-taupe-500 transition-colors">
              Kamaltek
            </span>
            <span className="block text-xs text-cream/40 mt-1 group-hover:text-white transition-colors">
              Apskatīt projektu →
            </span>
          </a>
          <p className="text-cream/20 text-xs mt-8">© {new Date().getFullYear()} Visas tiesības aizsargātas</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
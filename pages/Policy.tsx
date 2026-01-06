import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';

const Policy: React.FC = () => {
  const { lang } = useParams();
  const currentLang = (lang as 'lv' | 'en' | 'ru') || 'lv';

  const t = {
    lv: {
      back: "Atpakaļ",
      title: "Privātuma Politika",
      intro: "Mēs augstu vērtējam jūsu privātumu un datu drošību.",
      sections: [
        { title: "1. Vispārīgie Noteikumi", content: "Brīvdienu māja 'Mežlīči' apņemas ievērot Vispārīgo datu aizsardzības regulu (GDPR) un Latvijas Republikas likumdošanu. Mēs apkopojam tikai to informāciju, kas nepieciešama rezervācijas nodrošināšanai un pakalpojuma sniegšanai." },
        { title: "2. Datu Vākšana un Apstrāde", content: "Mēs varam apstrādāt šādus personas datus: vārds, uzvārds, tālruņa numurs un citi dati, kurus jūs sniedzat saziņas laikā, lai veiktu rezervāciju. Šie dati tiek izmantoti tikai, lai sazinātos ar jums par pakalpojuma detaļām." },
        { title: "3. Sīkdatnes (Cookies)", content: "Mēs izmantojam tikai tehniskās sīkdatnes, kas nepieciešamas mājaslapas korektai darbībai un navigācijai. Mēs neizmantojam invazīvas izsekošanas tehnoloģijas vai trešo pušu mārketinga sīkdatnes bez jūsu piekrišanas." },
        { title: "4. Datu Nodošana Trešajām Pusēm", content: "Jūsu personas dati netiek nodoti trešajām pusēm, izņemot gadījumus, ja to pieprasa tiesībsargājošās iestādes saskaņā ar spēkā esošajiem tiesību aktiem." },
        { title: "5. Datu Glabāšana un Drošība", content: "Mēs veicam saprātīgus drošības pasākumus, lai aizsargātu jūsu datus no nesankcionētas piekļuves. Dati tiek glabāti tikai tik ilgi, cik tas ir nepieciešams pakalpojuma sniegšanai vai likumā noteikto prasību izpildei." },
        { title: "6. Jūsu Tiesības", content: "Jums ir tiesības pieprasīt informāciju par jūsu personas datiem, kas ir mūsu rīcībā, kā arī pieprasīt to labošanu vai dzēšanu. Lai izmantotu šīs tiesības, lūdzu, sazinieties ar mums, izmantojot norādīto kontaktinformāciju." }
      ],
      updated: "Atjaunots: 2025. gada Janvāris"
    },
    en: {
      back: "Back",
      title: "Privacy Policy",
      intro: "We highly value your privacy and data security.",
      sections: [
        { title: "1. General Provisions", content: "Holiday home 'Mežlīči' commits to adhering to the General Data Protection Regulation (GDPR) and the laws of the Republic of Latvia. We collect only the information necessary for securing reservations and providing services." },
        { title: "2. Data Collection and Processing", content: "We may process the following personal data: name, surname, phone number, and other data you provide during communication to make a reservation. This data is used solely to communicate with you regarding service details." },
        { title: "3. Cookies", content: "We use only technical cookies necessary for the correct operation and navigation of the website. We do not use invasive tracking technologies or third-party marketing cookies without your consent." },
        { title: "4. Data Transfer to Third Parties", content: "Your personal data is not transferred to third parties, except where required by law enforcement authorities in accordance with applicable laws." },
        { title: "5. Data Storage and Security", content: "We implement reasonable security measures to protect your data from unauthorized access. Data is stored only as long as necessary for providing the service or fulfilling legal requirements." },
        { title: "6. Your Rights", content: "You have the right to request information about your personal data in our possession, as well as request its correction or deletion. To exercise these rights, please contact us using the provided contact information." }
      ],
      updated: "Updated: January 2025"
    },
    ru: {
      back: "Назад",
      title: "Политика Конфиденциальности",
      intro: "Мы высоко ценим вашу конфиденциальность и безопасность данных.",
      sections: [
        { title: "1. Общие положения", content: "Дом отдыха 'Mežlīči' обязуется соблюдать Общий регламент по защите данных (GDPR) и законодательство Латвийской Республики. Мы собираем только ту информацию, которая необходима для обеспечения бронирования и предоставления услуг." },
        { title: "2. Сбор и обработка данных", content: "Мы можем обрабатывать следующие персональные данные: имя, фамилия, номер телефона и другие данные, которые вы предоставляете при общении для оформления бронирования. Эти данные используются исключительно для связи с вами по деталям услуги." },
        { title: "3. Файлы cookie", content: "Мы используем только технические файлы cookie, необходимые для корректной работы и навигации по сайту. Мы не используем инвазивные технологии отслеживания или сторонние маркетинговые файлы cookie без вашего согласия." },
        { title: "4. Передача данных третьим лицам", content: "Ваши персональные данные не передаются третьим лицам, за исключением случаев, когда этого требуют правоохранительные органы в соответствии с действующим законодательством." },
        { title: "5. Хранение и безопасность данных", content: "Мы принимаем разумные меры безопасности для защиты ваших данных от несанкционированного доступа. Данные хранятся только до тех пор, пока это необходимо для предоставления услуги или выполнения требований закона." },
        { title: "6. Ваши права", content: "Вы имеете право запросить информацию о ваших персональных данных, находящихся в нашем распоряжении, а также потребовать их исправления или удаления. Чтобы воспользоваться этими правами, пожалуйста, свяжитесь с нами, используя предоставленную контактную информацию." }
      ],
      updated: "Обновлено: Январь 2025"
    }
  }[currentLang] || null;

  if (!t) return null;

  const seoKeywords = {
    lv: "privātuma politika, gdpr, datu drošība, noteikumi",
    en: "privacy policy, gdpr, data security, terms",
    ru: "политика конфиденциальности, gdpr, безопасность данных, условия"
  }[currentLang] || "privātuma politika";

  return (
    <div className="pt-32 px-6 pb-24 min-h-screen bg-cream dark:bg-cream-dark transition-colors duration-500 animate-fade-in">
      <SEO 
        title={`${t.title} | Mežlīči`}
        description={t.intro}
        keywords={seoKeywords}
        lang={currentLang}
      />
      <div className="max-w-3xl mx-auto">
        <Link 
          to={`/${currentLang}`}
          className="text-xs font-bold uppercase tracking-widest text-charcoal-900/50 dark:text-white/40 hover:text-charcoal-900 dark:hover:text-white transition-colors mb-12 block"
        >
          ← {t.back}
        </Link>
        <h1 className="font-serif text-5xl text-charcoal-900 dark:text-cream mb-12 transition-colors">{t.title}</h1>
        
        <div className="space-y-12 text-charcoal-800 dark:text-cream/80 leading-relaxed font-light text-lg transition-colors">
          <p className="text-2xl font-serif italic text-charcoal-900 dark:text-cream">
            {t.intro}
          </p>
          
          {t.sections.map((section, idx) => (
            <PolicySection 
              key={idx} 
              title={section.title} 
              content={section.content} 
            />
          ))}

          <div className="pt-8 mt-12 border-t border-charcoal-900/10 dark:border-white/10">
            <p className="text-sm text-charcoal-900/50 dark:text-white/30">{t.updated}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PolicySection: React.FC<{ title: string, content: string }> = ({ title, content }) => (
  <div className="space-y-4">
    <h3 className="font-bold text-charcoal-900 dark:text-cream text-sm uppercase tracking-widest border-b border-stone dark:border-white/10 pb-2 transition-colors">
      {title}
    </h3>
    <p>{content}</p>
  </div>
);

export default Policy;
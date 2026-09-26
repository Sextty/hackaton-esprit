import React from 'react';
import { Language, PageId } from '../../types';
import { Rss, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { TwitterIcon, FacebookIcon, YoutubeIcon } from '../Common/SocialIcons';

interface FooterProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  return (
    <footer id="footer" className="bg-[#003087] text-white pt-10 pb-6 border-t border-[#002266] select-none">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        {/* Institutional Contact Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-white/10 text-xs text-white/90">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-5 h-5 text-[#C8A951] shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-white mb-0.5">
                {lang === 'ar' ? 'المقر المركزي للإدارة العامة' : 'Direction Générale des Douanes'}
              </strong>
              <span>
                {lang === 'ar'
                  ? 'نهج خير الدين باشا، 1002 تونس، الجمهورية التونسية'
                  : 'Rue Kheireddine Pacha, 1002 Tunis, Tunisie'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Phone className="w-5 h-5 text-[#C8A951] shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-white mb-0.5">
                {lang === 'ar' ? 'الاتصال والخط الأخضر' : 'Standard Téléphonique & Assistance'}
              </strong>
              <span>(+216) 71 799 700 / (+216) 71 840 900</span>
              <br />
              <span className="text-[#E5C778] font-bold">
                {lang === 'ar' ? 'الرقم الأخضر المجاني:' : 'Numéro vert gratuit:'} 80 10 30 66
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Mail className="w-5 h-5 text-[#C8A951] shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-white mb-0.5">
                {lang === 'ar' ? 'البريد الإلكتروني ومكتب المواطن' : 'Relations Usagers & Presse'}
              </strong>
              <span>dgd.dg@douane.gov.tn</span>
              <br />
              <button
                onClick={() => onNavigate('support')}
                className="text-[#E5C778] hover:underline cursor-pointer"
              >
                {lang === 'ar' ? 'بوابة التذاكر والعراض الإلكترونية ›' : 'Espace Ticket & Réclamations ›'}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Quick Links (all internal clone pages) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-white/80 py-6 border-b border-white/10">
          <button
            onClick={() => onNavigate('accueil')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'الرئيسية' : 'Accueil'}
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('particuliers')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'الأفراد (Voyageurs & TRE)' : 'Particuliers'}
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('professionnels')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'المهنيون (OEA & Export)' : 'Professionnels'}
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('douane')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'عن الديوانة' : 'Douane'}
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('sinda')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'مشروع سندة II' : 'Projet SINDA II'}
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('eservices')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'الخدمات الإلكترونية' : 'E-Services'}
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('news')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'الأخبار والبلاغات' : 'Actualités'}
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('douanetv')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'المرئيات' : 'Douane-TV'}
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('contact')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'دليل الاتصال' : 'Contact'}
          </button>
        </div>

        {/* Social channels (open DouaneTV video hub or news internally) */}
        <div className="flex items-center justify-center gap-4 py-6">
          <button
            onClick={() => onNavigate('news')}
            title="Twitter-Douane"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-[#C8A951] hover:text-[#003087] text-xs font-semibold transition-all duration-200 cursor-pointer"
          >
            <TwitterIcon className="w-4 h-4 text-white hover:text-[#003087]" />
            <span>Twitter-Douane</span>
          </button>

          <button
            onClick={() => onNavigate('news')}
            title="Facebook-Douane"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-[#C8A951] hover:text-[#003087] text-xs font-semibold transition-all duration-200 cursor-pointer"
          >
            <FacebookIcon className="w-4 h-4 text-white hover:text-[#003087]" />
            <span>Facebook-Douane</span>
          </button>

          <button
            onClick={() => onNavigate('douanetv')}
            title="Youtube-Douane"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-[#C8A951] hover:text-[#003087] text-xs font-semibold transition-all duration-200 cursor-pointer"
          >
            <YoutubeIcon className="w-4 h-4 text-white hover:text-[#003087]" />
            <span>Youtube-Douane</span>
          </button>

          <button
            onClick={() => onNavigate('news')}
            title="Feed RSS"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-[#C8A951] hover:text-[#003087] text-xs font-semibold transition-all duration-200 cursor-pointer"
          >
            <Rss className="w-4 h-4 text-white hover:text-[#003087]" />
            <span>Flux d'Actualités</span>
          </button>
        </div>

        {/* Exact Copyright */}
        <div className="text-center pt-2 border-t border-white/10 space-y-1">
          <p className="text-[12px] font-normal text-[#CCCCCC]">
            {lang === 'ar'
              ? 'جميع الحقوق محفوظة للديوانة التونسية، 2018 - 2026'
              : 'Tous droits réservés à la Douane Tunisienne, 2018 - 2026'}
          </p>
          <p className="text-[11px] text-white/50 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8A951]" />
            <span>
              {lang === 'ar'
                ? 'الجمهورية التونسية • وزارة المالية • الإدارة العامة للديوانة'
                : 'République Tunisienne • Ministère des Finances • Direction Générale des Douanes'}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

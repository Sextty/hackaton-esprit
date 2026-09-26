import React from 'react';
import { Language } from '../../types';
import { PhoneCall, HelpCircle, Rss } from 'lucide-react';
import { TwitterIcon, FacebookIcon, YoutubeIcon } from '../Common/SocialIcons';

interface TopBarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onSupportClick: () => void;
  onNavigateToSocial?: (network: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  lang,
  onLanguageChange,
  onSupportClick,
  onNavigateToSocial,
}) => {
  return (
    <div className="h-9 bg-[#002266] text-[#CCCCCC] text-[12px] border-b border-[#001848] select-none">
      <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
        {/* Left Section: "NOUS RÉPONDONS A VOS QUESTIONS." opens internal clone SupportPage */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={onSupportClick}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#C8A951] group-hover:scale-110 transition-transform" />
            <span className="font-bold text-white uppercase tracking-wider text-[11px] sm:text-[12px]">
              {lang === 'ar' ? 'نجيب على أسئلتكم' : 'NOUS RÉPONDONS A VOS QUESTIONS.'}
            </span>
          </button>

          <span className="text-[#004099] hidden md:inline">|</span>

          {/* Numéro vert officiel */}
          <div className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
            <PhoneCall className="w-3.5 h-3.5 text-[#C8A951]" />
            <span>
              {lang === 'ar' ? 'الرقم الأخضر المجاني:' : 'Numéro Vert:'}{' '}
              <strong className="text-white tracking-wider">80 10 30 66</strong>
            </span>
          </div>
        </div>

        {/* Right Section: Internal Social links trigger or video hub */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigateToSocial?.('twitter')}
              title="Twitter-Douane"
              className="text-[#CCCCCC] hover:text-white transition-colors cursor-pointer"
            >
              <TwitterIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateToSocial?.('facebook')}
              title="Facebook-Douane"
              className="text-[#CCCCCC] hover:text-white transition-colors cursor-pointer"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateToSocial?.('youtube')}
              title="Youtube-Douane"
              className="text-[#CCCCCC] hover:text-white transition-colors cursor-pointer"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateToSocial?.('feed')}
              title="Feed RSS"
              className="text-[#CCCCCC] hover:text-white transition-colors cursor-pointer"
            >
              <Rss className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[#004099]">|</span>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 text-[12px] font-medium tracking-wider">
            <button
              onClick={() => onLanguageChange('fr')}
              className={`px-1.5 py-0.5 transition-colors cursor-pointer flex items-center gap-1 ${
                lang === 'fr'
                  ? 'text-white font-bold underline decoration-[#C8A951] decoration-2 underline-offset-4'
                  : 'text-[#AAAAAA] hover:text-white'
              }`}
            >
              <span>FR</span>
            </button>
            <span className="text-[#666666]">|</span>
            <button
              onClick={() => onLanguageChange('ar')}
              className={`px-1.5 py-0.5 transition-colors cursor-pointer flex items-center gap-1 ${
                lang === 'ar'
                  ? 'text-white font-bold underline decoration-[#C8A951] decoration-2 underline-offset-4'
                  : 'text-[#AAAAAA] hover:text-white'
              }`}
            >
              <span>عربي</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

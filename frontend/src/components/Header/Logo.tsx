import React from 'react';
import { Language } from '../../types';

interface LogoProps {
  lang: Language;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ lang, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 cursor-pointer select-none group"
      title="Direction Générale des Douanes Tunisiennes"
    >
      {/* Official Customs Emblem Shield */}
      <div className="relative w-12 h-14 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
          {/* Shield Outline */}
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8A951" />
              <stop offset="50%" stopColor="#E5C778" />
              <stop offset="100%" stopColor="#9B7C2A" />
            </linearGradient>
            <linearGradient id="innerShield" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#003087" />
              <stop offset="100%" stopColor="#001F5C" />
            </linearGradient>
          </defs>

          {/* Golden Shield Border */}
          <path
            d="M 50 4 C 82 4, 94 18, 94 45 C 94 82, 50 114, 50 114 C 50 114, 6 82, 6 45 C 6 18, 18 4, 50 4 Z"
            fill="url(#shieldGrad)"
          />

          {/* Inner Navy Body */}
          <path
            d="M 50 9 C 78 9, 88 22, 88 45 C 88 78, 50 107, 50 107 C 50 107, 12 78, 12 45 C 12 22, 22 9, 50 9 Z"
            fill="url(#innerShield)"
          />

          {/* Tunisian Red Disc & Crescent Star */}
          <circle cx="50" cy="38" r="14" fill="#E71B24" />
          <circle cx="50" cy="38" r="11" fill="#FFFFFF" />
          <path
            d="M 49 30 A 8 8 0 1 0 49 46 A 6.5 6.5 0 1 1 49 30 Z"
            fill="#E71B24"
          />
          {/* 5-pointed star */}
          <polygon
            points="53,35 54.5,37 57,37.3 55,39 55.6,41.4 53.5,40.1 51.4,41.4 52,39 50,37.3 52.5,37"
            fill="#E71B24"
          />

          {/* Scales of Justice & Caduceus (Douane Emblem) */}
          {/* Balance beam */}
          <path d="M 32 62 L 68 62" stroke="#C8A951" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="62" r="2.5" fill="#FFFFFF" />
          {/* Vertical pillar */}
          <line x1="50" y1="56" x2="50" y2="88" stroke="#C8A951" strokeWidth="2.5" />
          <circle cx="50" cy="88" r="4" fill="#C8A951" />

          {/* Left Pan */}
          <line x1="34" y1="62" x2="28" y2="73" stroke="#E5C778" strokeWidth="1.2" />
          <line x1="34" y1="62" x2="40" y2="73" stroke="#E5C778" strokeWidth="1.2" />
          <path d="M 26 73 Q 34 80 42 73 Z" fill="#C8A951" />

          {/* Right Pan */}
          <line x1="66" y1="62" x2="60" y2="73" stroke="#E5C778" strokeWidth="1.2" />
          <line x1="66" y1="62" x2="72" y2="73" stroke="#E5C778" strokeWidth="1.2" />
          <path d="M 58 73 Q 66 80 74 73 Z" fill="#C8A951" />
        </svg>
      </div>

      {/* Bilingual Emblem Titles */}
      <div className="flex flex-col text-white">
        <span className="text-[10px] tracking-wider text-amber-300 font-semibold uppercase leading-tight">
          {lang === 'ar' ? 'الجمهورية التونسية • وزارة المالية' : 'République Tunisienne • Ministère des Finances'}
        </span>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="text-lg font-bold tracking-tight text-white leading-none">
            {lang === 'ar' ? 'الديوانة التونسية' : 'DOUANE TUNISIENNE'}
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C8A951]" />
        </div>
        <span className="text-[11px] text-blue-100 font-light tracking-wide leading-tight">
          {lang === 'ar' ? 'الإدارة العامة للديوانة' : 'Direction Générale des Douanes'}
        </span>
      </div>
    </div>
  );
};

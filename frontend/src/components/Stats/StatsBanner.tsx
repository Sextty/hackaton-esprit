import React from 'react';
import { Language } from '../../types';
import { statistics } from '../../data/mockData';
import { TrendingUp, ShieldAlert, Award } from 'lucide-react';

interface StatsBannerProps {
  lang: Language;
}

const statIcons = [TrendingUp, ShieldAlert, Award];

export const StatsBanner: React.FC<StatsBannerProps> = ({ lang }) => {
  return (
    <section className="bg-[#1A1A2E] text-white py-10 md:py-8 md:min-h-[140px] flex items-center relative overflow-hidden select-none border-y border-[#2A2A44]">
      {/* Subtle background glow */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#003087]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-[#C8A951]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15">
          {statistics.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <div
                key={idx}
                className="py-6 md:py-3 px-4 sm:px-8 text-center flex flex-col items-center justify-center group hover:bg-white/[0.02] transition-colors"
              >
                {/* Official Tag */}
                <div className="flex items-center gap-1.5 mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Icon className="w-4 h-4 text-[#C8A951]" />
                  <span className="text-[11px] uppercase tracking-wider text-white/60 font-semibold">
                    {lang === 'ar' ? 'مؤشر أداء رسمي 2025 - 2026' : 'Indicateur Officiel 2025 - 2026'}
                  </span>
                </div>

                {/* Key Stat Number */}
                <div className="text-3xl sm:text-4xl md:text-[38px] font-bold text-white tracking-tight leading-[46px] group-hover:scale-105 transition-transform duration-200">
                  <span className="bg-gradient-to-r from-white via-white to-[#E5C778] bg-clip-text text-transparent">
                    {lang === 'ar' ? stat.numberAr : stat.number}
                  </span>
                </div>

                {/* Exact Label from douane.gov.tn */}
                <p className="text-[13px] text-[#CCCCCC] font-normal leading-[19px] max-w-[280px] mt-2">
                  {stat.label[lang]}
                </p>

                {stat.sublabel && (
                  <p className="text-[11px] text-white/45 mt-1.5 italic">
                    {stat.sublabel[lang]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

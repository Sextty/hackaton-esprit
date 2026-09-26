import React from 'react';
import { Language, FeatureService } from '../../types';
import { featureServices } from '../../data/mockData';
import { Car, BookOpen, ShieldCheck, FileText, ArrowRight } from 'lucide-react';

interface FeatureCardsProps {
  lang: Language;
  onSelectService: (service: FeatureService) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Car,
  BookOpen,
  ShieldCheck,
  FileText,
};

export const FeatureCards: React.FC<FeatureCardsProps> = ({ lang, onSelectService }) => {
  return (
    <section className="bg-white py-10 border-b border-[#E0E0E0] select-none">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        {/* Section Header Accent */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#EEEEEE]">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#C8A951] rounded-full inline-block" />
            <h2 className="text-[17px] font-bold text-[#003087] uppercase tracking-wide">
              {lang === 'ar' ? 'الخدمات الإلكترونية ذات الأولوية' : 'SERVICES DOUANIERS ESSENTIELS'}
            </h2>
          </div>
          <span className="text-xs text-[#888888] font-medium hidden sm:inline">
            {lang === 'ar' ? 'معاملات سريعة 24/7' : 'Traitement dématérialisé 24h/24'}
          </span>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featureServices.map((service) => {
            const IconComponent = iconMap[service.iconName] || FileText;

            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className="group relative bg-white border border-[#E0E0E0] rounded-[4px] p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(0,48,135,0.12)] hover:border-[#0055B3] flex flex-col items-center justify-between cursor-pointer"
              >
                {/* Top Subtle Badge */}
                {service.tag && (
                  <span className="mb-3 text-[10px] font-semibold text-[#003087] bg-[#E8F0FE] px-2 py-0.5 rounded-[2px] uppercase tracking-wider">
                    {service.tag[lang]}
                  </span>
                )}

                {/* Icon Container ~64x64px */}
                <div className="w-16 h-16 rounded-full bg-[#F0F4FF] group-hover:bg-[#003087] flex items-center justify-center mb-4 transition-colors duration-200">
                  <IconComponent className="w-8 h-8 text-[#003087] group-hover:text-[#C8A951] transition-colors duration-200" />
                </div>

                {/* H3 Title: 16px, bold, #003087 */}
                <h3 className="text-[16px] font-bold text-[#003087] group-hover:text-[#0055B3] mb-2 leading-[22px] min-h-[44px] flex items-center justify-center transition-colors">
                  {service.title[lang]}
                </h3>

                {/* Description: 13px, #666666, 3 lines max */}
                <p className="text-[13px] text-[#666666] leading-[18px] line-clamp-3 mb-4">
                  {service.description[lang]}
                </p>

                {/* Interactive Action Indicator */}
                <div className="mt-auto pt-2 flex items-center gap-1.5 text-[12px] font-bold text-[#0055B3] group-hover:text-[#003087] transition-colors">
                  <span>{lang === 'ar' ? 'الدخول للخدمة' : 'Accéder au service'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>

                {/* Bottom decorative bar on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C8A951] rounded-b-[4px] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

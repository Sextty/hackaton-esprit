import React, { useState } from 'react';
import { Language, EServiceItem } from '../../types';
import { allEServicesList } from '../../data/mockData';
import { Laptop, User, Building2, ArrowRight } from 'lucide-react';

interface EServicesHubProps {
  lang: Language;
  onOpenModal: (action: string) => void;
  onViewAllEServices?: () => void;
}

export const EServicesHub: React.FC<EServicesHubProps> = ({
  lang,
  onOpenModal,
  onViewAllEServices,
}) => {
  const [tab, setTab] = useState<'all' | 'particulier' | 'entreprise'>('all');

  const filtered = allEServicesList.filter((item) => {
    if (tab === 'all') return true;
    return item.audience === tab;
  });

  return (
    <section className="bg-white py-12 border-b border-[#E0E0E0] select-none">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-[#EEEEEE]">
          <div>
            <div className="flex items-center gap-2 text-[#003087] mb-1">
              <Laptop className="w-5 h-5 text-[#C8A951]" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {lang === 'ar' ? 'المنظومة الرقمية الموحدة' : 'Guichet Numérique Unique'}
              </span>
            </div>
            <h2 className="text-[24px] font-bold text-[#003087] uppercase tracking-wide leading-tight">
              {lang === 'ar' ? 'كتالوج الخدمات الإلكترونية الرسمية' : 'PORTAIL DES E-SERVICES DOUANIERS'}
            </h2>
            <div className="w-10 h-[3px] bg-[#C8A951] mt-2 mb-2" />
            <p className="text-sm italic text-[#666666]">
              {lang === 'ar'
                ? 'كافة الإجراءات المميكنة المتاحة للمواطنين، المسافرين والشركات الاقتصادية'
                : 'L’ensemble des téléprocédures et simulateurs de la Direction Générale des Douanes'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-4 md:mt-0 flex items-center gap-1.5 p-1 bg-[#F5F5F5] rounded-md border border-[#E0E0E0] self-start md:self-auto">
            <button
              onClick={() => setTab('all')}
              className={`px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                tab === 'all'
                  ? 'bg-[#003087] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#003087]'
              }`}
            >
              {lang === 'ar' ? 'الكل' : 'Tous'} ({allEServicesList.length})
            </button>
            <button
              onClick={() => setTab('particulier')}
              className={`px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                tab === 'particulier'
                  ? 'bg-[#003087] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#003087]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'الأفراد' : 'Particuliers'}</span>
            </button>
            <button
              onClick={() => setTab('entreprise')}
              className={`px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                tab === 'entreprise'
                  ? 'bg-[#003087] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#003087]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'الشركات' : 'Entreprises'}</span>
            </button>
          </div>
        </div>

        {/* E-Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAFAFA] hover:bg-white rounded border border-[#E5E5E5] hover:border-[#0055B3] p-5 transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    item.audience === 'particulier'
                      ? 'bg-blue-100 text-[#003087]'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.audience === 'particulier'
                      ? (lang === 'ar' ? 'فضاء المواطن' : 'Particuliers')
                      : (lang === 'ar' ? 'فضاء المهنيين' : 'Entreprises')}
                  </span>

                  {item.badge && (
                    <span className="text-[10px] font-bold bg-[#C8A951] text-[#001f5c] px-2 py-0.5 rounded shadow-xs uppercase">
                      {item.badge[lang]}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-[#003087] group-hover:text-[#0055B3] mb-2 leading-snug transition-colors">
                  {item.name[lang]}
                </h3>

                <p className="text-xs text-[#666666] leading-relaxed mb-4">
                  {item.desc[lang]}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-between">
                <button
                  onClick={() => {
                    if (item.action.startsWith('modal_')) {
                      onOpenModal(item.action.replace('modal_', ''));
                    } else if (item.action === 'page' && onViewAllEServices) {
                      onViewAllEServices();
                    } else {
                      onOpenModal('taxation');
                    }
                  }}
                  className="w-full py-2 bg-[#F0F4FF] group-hover:bg-[#003087] text-[#003087] group-hover:text-white rounded-[3px] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <span>{lang === 'ar' ? 'تشغيل الخدمة الرقمية' : 'Lancer le téléservice'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

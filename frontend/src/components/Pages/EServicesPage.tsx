import React, { useState } from 'react';
import { Language } from '../../types';
import { allEServicesList } from '../../data/mockData';
import { Laptop, User, Building2, ChevronRight, Home, ArrowRight, Calculator, FileText, ShieldCheck, Coins, CheckCircle2, Search } from 'lucide-react';

interface EServicesPageProps {
  lang: Language;
  onNavigateHome: () => void;
  onOpenModal: (action: string) => void;
  initialAudience?: 'all' | 'particulier' | 'entreprise';
}

export const EServicesPage: React.FC<EServicesPageProps> = ({
  lang,
  onNavigateHome,
  onOpenModal,
  initialAudience = 'all',
}) => {
  const [filter, setFilter] = useState<'all' | 'particulier' | 'entreprise'>(initialAudience);
  const [search, setSearch] = useState('');

  const filtered = allEServicesList.filter((item) => {
    const matchAudience = filter === 'all' || item.audience === filter;
    const matchSearch =
      !search ||
      item.name.fr.toLowerCase().includes(search.toLowerCase()) ||
      item.name.ar.includes(search) ||
      item.desc.fr.toLowerCase().includes(search.toLowerCase());
    return matchAudience && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F5] select-none">
      {/* Title Banner */}
      <div className="h-20 bg-[#003087] border-t border-[#002266] flex flex-col justify-center text-center text-white relative">
        <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">
          {lang === 'ar' ? 'بوابة الخدمات الإلكترونية الرسمية' : 'Guichet Unique des E-Services Douaniers'}
        </h1>
        <div className="flex items-center justify-center gap-1.5 text-[12px] text-white/80 mt-1">
          <button
            onClick={onNavigateHome}
            className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'الرئيسية' : 'Accueil'}</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#C8A951]" />
          <span className="text-white font-semibold">
            {lang === 'ar' ? 'الخدمات الإلكترونية' : 'E-Services'}
          </span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8">
        {/* Controls: Search & Filter Tabs */}
        <div className="bg-white p-4 rounded border border-[#E0E0E0] mb-8 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={lang === 'ar' ? 'بحث في الخدمات الإلكترونية...' : 'Rechercher un téléservice...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#CCCCCC] rounded text-xs focus:border-[#0055B3] focus:outline-none"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-[#F5F5F5] p-1 rounded border border-[#E0E0E0] self-stretch md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 md:flex-initial px-4 py-1.5 rounded text-xs font-bold uppercase transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#003087] text-white'
                  : 'text-[#666666] hover:text-[#003087]'
              }`}
            >
              {lang === 'ar' ? 'كافة الخدمات' : 'Tous'} ({allEServicesList.length})
            </button>
            <button
              onClick={() => setFilter('particulier')}
              className={`flex-1 md:flex-initial px-4 py-1.5 rounded text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                filter === 'particulier'
                  ? 'bg-[#003087] text-white'
                  : 'text-[#666666] hover:text-[#003087]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'الأفراد' : 'Particuliers'}</span>
            </button>
            <button
              onClick={() => setFilter('entreprise')}
              className={`flex-1 md:flex-initial px-4 py-1.5 rounded text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                filter === 'entreprise'
                  ? 'bg-[#003087] text-white'
                  : 'text-[#666666] hover:text-[#003087]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'المؤسسات' : 'Entreprises'}</span>
            </button>
          </div>
        </div>

        {/* 14 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded border border-[#E0E0E0] hover:border-[#0055B3] p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    item.audience === 'particulier'
                      ? 'bg-blue-100 text-[#003087]'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.audience === 'particulier'
                      ? (lang === 'ar' ? 'فضاء المواطن' : 'Particulier')
                      : (lang === 'ar' ? 'فضاء المؤسسة' : 'Entreprise')}
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

              <div className="pt-3 border-t border-[#F0F0F0] flex items-center justify-between">
                <button
                  onClick={() => {
                    if (item.action.startsWith('modal_')) {
                      onOpenModal(item.action.replace('modal_', ''));
                    } else if (item.action === 'page' && item.subpage) {
                      alert(`Ouverture du module interactif : ${item.name.fr}`);
                    } else {
                      onOpenModal('taxation');
                    }
                  }}
                  className="w-full py-2 bg-[#F0F4FF] group-hover:bg-[#003087] text-[#003087] group-hover:text-white rounded-[3px] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <span>{lang === 'ar' ? 'تشغيل الخدمة الرقمية' : 'Accéder au service'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

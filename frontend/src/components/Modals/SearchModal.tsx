import React, { useState } from 'react';
import { Language } from '../../types';
import { X, Search, FileText, ArrowRight, ExternalLink } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSelectAction: (actionType: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectAction,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickLinks = [
    { titleFr: 'Simulation FCR & Véhicules', titleAr: 'محاكاة السيارات و FCR', action: 'taxation' },
    { titleFr: 'Permis de circulation touristique (DAC)', titleAr: 'رخصة الجولان السياحية DAC', action: 'dac' },
    { titleFr: 'Situation administrative Wadh3iati', titleAr: 'متابعة وضعيتي الجمركية', action: 'wadh3iati' },
    { titleFr: 'Tarif douanier & Nomenclatures SH', titleAr: 'جدول التعريفة الجمركية', action: 'tarif' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in select-none">
      <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full border border-[#003087]/20 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E0E0E0] flex items-center gap-3 bg-[#F9FAFB]">
          <Search className="w-5 h-5 text-[#003087]" />
          <input
            type="text"
            autoFocus
            placeholder={
              lang === 'ar'
                ? 'ابحث عن خدمة، إجراء، نص قانوني أو معلومة...'
                : 'Rechercher un service, une démarche, un tarif, une loi...'
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm outline-none bg-transparent text-[#333333]"
          />
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Links Suggestions */}
        <div className="p-5 space-y-4 text-xs">
          <p className="font-bold text-[#888888] uppercase tracking-wider">
            {lang === 'ar' ? 'الخدمات السريعة المقترحة' : 'Services et accès rapides'}
          </p>
          <div className="space-y-1.5">
            {quickLinks.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectAction(item.action);
                  onClose();
                }}
                className="w-full p-2.5 rounded hover:bg-[#F0F4FF] flex items-center justify-between text-left text-[#003087] font-semibold transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#C8A951]" />
                  <span>{lang === 'ar' ? item.titleAr : item.titleFr}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#0055B3] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

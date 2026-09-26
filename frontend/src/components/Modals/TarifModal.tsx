import React, { useState } from 'react';
import { Language } from '../../types';
import { X, BookOpen, Search, FileSpreadsheet } from 'lucide-react';

interface TarifModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const sampleTarifs = [
  { code: '8703.23.19', descFr: 'Véhicules de tourisme à moteur à explosion essence > 1500 cm³', descAr: 'سيارات سياحية ذات محرك بنزين يفوق 1500 سم³', dd: '20%', tva: '19%', dc: '10%' },
  { code: '8471.30.00', descFr: 'Machines automatiques de traitement de l’information (Ordinateurs portables)', descAr: 'آلات معالجة المعلومات المحمولة (حواسيب)', dd: '0%', tva: '19%', dc: '0%' },
  { code: '8517.13.00', descFr: 'Smartphones et téléphones cellulaires', descAr: 'هواتف ذكية وأجهزة اتصالات خلوية', dd: '0%', tva: '19%', dc: '0%' },
  { code: '0901.21.00', descFr: 'Café torréfié non décaféiné', descAr: 'بن محمص غير منزوع منه الكافيين', dd: '36%', tva: '19%', dc: '0%' },
];

export const TarifModal: React.FC<TarifModalProps> = ({ isOpen, onClose, lang }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = sampleTarifs.filter((t) =>
    t.code.includes(searchTerm) ||
    t.descFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.descAr.includes(searchTerm)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in select-none">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full border border-[#003087]/20 overflow-hidden">
        <div className="bg-[#003087] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-[#C8A951]" />
            <div>
              <h3 className="text-base font-bold uppercase">
                {lang === 'ar' ? 'التعريفة الجمركية والبنود المنسقة' : 'Tarifs & Nomenclature Douanière'}
              </h3>
              <p className="text-xs text-blue-200">
                {lang === 'ar' ? 'البحث بالبند الجمركي، التسمية ونسب الرسوم (DD, TVA, DC)' : 'Recherche par Code SH, désignation et taux applicables'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder={lang === 'ar' ? 'ابحث برقم البند أو اسم البضاعة (مثال: 8703 أو حواسيب أو سيارات)' : 'Rechercher par Code SH ou marchandise (ex: 8703, ordinateur, café)...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#CCCCCC] rounded text-xs focus:border-[#0055B3] focus:outline-none"
            />
            <Search className="w-4 h-4 text-[#888888] absolute left-3 top-2.5" />
          </div>

          <div className="overflow-x-auto border border-[#E0E0E0] rounded">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#003087] text-white">
                <tr>
                  <th className="p-2.5">Code SH</th>
                  <th className="p-2.5">{lang === 'ar' ? 'تعيين البضاعة' : 'Désignation'}</th>
                  <th className="p-2.5 text-center">Droit Douane</th>
                  <th className="p-2.5 text-center">TVA</th>
                  <th className="p-2.5 text-center">Droit Conso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E0E0]">
                {filtered.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#F9FAFB]">
                    <td className="p-2.5 font-bold text-[#003087] font-mono">{item.code}</td>
                    <td className="p-2.5 text-[#333333]">{lang === 'ar' ? item.descAr : item.descFr}</td>
                    <td className="p-2.5 text-center font-semibold text-emerald-700">{item.dd}</td>
                    <td className="p-2.5 text-center">{item.tva}</td>
                    <td className="p-2.5 text-center">{item.dc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

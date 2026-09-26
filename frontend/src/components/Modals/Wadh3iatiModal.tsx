import React, { useState } from 'react';
import { Language } from '../../types';
import { X, ShieldCheck, Search, CheckCircle, Clock } from 'lucide-react';

interface Wadh3iatiModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const Wadh3iatiModal: React.FC<Wadh3iatiModalProps> = ({ isOpen, onClose, lang }) => {
  const [matricule, setMatricule] = useState('');
  const [cinPassport, setCinPassport] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matricule.trim()) return;

    setSearchResult({
      vehicle: matricule.toUpperCase(),
      ownerDoc: cinPassport || '09876543',
      status: 'Régularisé — Situation conforme',
      statusAr: 'مستوفاة ومسواة قانونياً',
      authorizationExpiry: '15 Décembre 2026',
      customsBureau: 'Bureau des Douanes de Tunis Port (La Goulette)',
      customsBureauAr: 'مكتب الديوانة بميناء حلق الوادي',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in select-none">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full border border-[#003087]/20 overflow-hidden">
        {/* Header */}
        <div className="bg-[#003087] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#C8A951]" />
            <div>
              <h3 className="text-base font-bold uppercase">
                {lang === 'ar' ? 'خدمة وضعيتي — متابعة الوضعية الديوانية للسيارة' : 'Service Wadh3iati — Situation Véhicule'}
              </h3>
              <p className="text-xs text-blue-200">
                {lang === 'ar' ? 'التحقق الآني من صلاحية الرخص والوضع الجمركي' : 'Vérification instantanée de la régularité douanière'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleLookup} className="p-6 space-y-4 text-sm text-[#333333]">
          <div>
            <label className="block text-xs font-bold text-[#003087] uppercase mb-1">
              {lang === 'ar' ? 'رقم اللوحة المنجمية أو الرقم الجمركي' : 'Numéro d’immatriculation ou N° Diptyque'}
            </label>
            <input
              type="text"
              required
              placeholder="ex: 215 TUN 4920 ou 75-DX-990"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              className="w-full border border-[#CCCCCC] rounded px-3 py-2 text-xs focus:border-[#0055B3] focus:outline-none uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#003087] uppercase mb-1">
              {lang === 'ar' ? 'رقم بطاقة التعريف أو جواز السفر' : 'N° CIN ou Passeport du titulaire'}
            </label>
            <input
              type="text"
              required
              placeholder={lang === 'ar' ? 'أدخل رقم الهوية' : 'N° Document d’identité'}
              value={cinPassport}
              onChange={(e) => setCinPassport(e.target.value)}
              className="w-full border border-[#CCCCCC] rounded px-3 py-2 text-xs focus:border-[#0055B3] focus:outline-none uppercase"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#003087] hover:bg-[#002266] text-white font-bold text-xs uppercase tracking-wider rounded-[3px] shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{lang === 'ar' ? 'التحقق من الوضعية' : 'Consulter ma situation'}</span>
          </button>

          {/* Results */}
          {searchResult && (
            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-300 rounded-md animate-fade-in space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>
                  {lang === 'ar' ? searchResult.statusAr : searchResult.status}
                </span>
              </div>
              <div className="space-y-1 text-xs text-[#444444] pt-2 border-t border-emerald-200">
                <p>
                  <strong>{lang === 'ar' ? 'العربة المسجلة:' : 'Véhicule :'}</strong> {searchResult.vehicle}
                </p>
                <p>
                  <strong>{lang === 'ar' ? 'تاريخ نهاية صلاحية الرخصة:' : 'Date d’échéance du permis :'}</strong> {searchResult.authorizationExpiry}
                </p>
                <p>
                  <strong>{lang === 'ar' ? 'مكتب التعيين الإداري:' : 'Bureau douanier de rattachement :'}</strong>{' '}
                  {lang === 'ar' ? searchResult.customsBureauAr : searchResult.customsBureau}
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

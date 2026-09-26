import React, { useState } from 'react';
import { Language } from '../../types';
import { X, Calculator, CheckCircle2, AlertCircle } from 'lucide-react';

interface TaxationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const TaxationModal: React.FC<TaxationModalProps> = ({ isOpen, onClose, lang }) => {
  const [vehicleType, setVehicleType] = useState('tourisme');
  const [engineType, setEngineType] = useState('essence');
  const [cylinder, setCylinder] = useState('1600');
  const [ageYears, setAgeYears] = useState('2');
  const [estimatedValue, setEstimatedValue] = useState('45000');
  const [regime, setRegime] = useState('fcr_partiel');
  const [result, setResult] = useState<{ taxes: number; totalEstimated: number; rate: string } | null>(null);

  if (!isOpen) return null;

  const calculateTaxes = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(estimatedValue) || 40000;
    let rate = 0.25; // default 25% FCR partiel
    let rateLabel = '25% (Régime FCR privilégié)';

    if (regime === 'fcr_total') {
      rate = 0;
      rateLabel = '0% (Exonération totale RS)';
    } else if (regime === 'commun') {
      rate = 0.85;
      rateLabel = '85% (Régime commun Droit de douane + TVA + Consommation)';
    }

    const calculatedTaxes = Math.round(value * rate);
    setResult({
      taxes: calculatedTaxes,
      totalEstimated: Math.round(value + calculatedTaxes),
      rate: rateLabel,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in select-none">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full border border-[#003087]/20 overflow-hidden">
        {/* Header */}
        <div className="bg-[#003087] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calculator className="w-6 h-6 text-[#C8A951]" />
            <div>
              <h3 className="text-base font-bold uppercase">
                {lang === 'ar' ? 'محتسب معاليم الديوانة للسيارات (FCR والنظام العام)' : 'Simulateur Officiel de Taxation Véhicule'}
              </h3>
              <p className="text-xs text-blue-200">
                {lang === 'ar' ? 'وفق أحكام قانون المالية ومجلة الديوانة' : 'Conforme aux barèmes de la loi de finances en vigueur'}
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

        {/* Content Form */}
        <form onSubmit={calculateTaxes} className="p-6 space-y-4 text-sm text-[#333333]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Régime d'importation */}
            <div>
              <label className="block text-xs font-bold text-[#003087] uppercase mb-1">
                {lang === 'ar' ? 'النظام الجمركي المعتمد' : 'Régime d’importation'}
              </label>
              <select
                value={regime}
                onChange={(e) => setRegime(e.target.value)}
                className="w-full border border-[#CCCCCC] rounded px-3 py-2 text-xs focus:border-[#0055B3] focus:outline-none"
              >
                <option value="fcr_partiel">
                  {lang === 'ar' ? 'امتياز FCR مع دفع 25% (سلسلة عادية ن ت)' : 'FCR Partiel (Paiement 25% - Série normale)'}
                </option>
                <option value="fcr_total">
                  {lang === 'ar' ? 'امتياز FCR مع إعفاء كلي (نظام ن ت غير قابلة للتفويت)' : 'FCR Total (Exonération 100% - Incessible RS)'}
                </option>
                <option value="commun">
                  {lang === 'ar' ? 'النظام العام (تسوية ديوانية كاملة)' : 'Régime de droit commun (Taxes intégrales)'}
                </option>
              </select>
            </div>

            {/* Type de motorisation */}
            <div>
              <label className="block text-xs font-bold text-[#003087] uppercase mb-1">
                {lang === 'ar' ? 'نوع المحرك والطاقة' : 'Motorisation'}
              </label>
              <select
                value={engineType}
                onChange={(e) => setEngineType(e.target.value)}
                className="w-full border border-[#CCCCCC] rounded px-3 py-2 text-xs focus:border-[#0055B3] focus:outline-none"
              >
                <option value="essence">{lang === 'ar' ? 'بنزين (Essence)' : 'Essence'}</option>
                <option value="diesel">{lang === 'ar' ? 'غازوال (Diesel)' : 'Diesel'}</option>
                <option value="hybride">{lang === 'ar' ? 'هجين (Hybride - تخفيض تفضيلي)' : 'Hybride (Taux réduit)'}</option>
                <option value="electrique">{lang === 'ar' ? 'كهربائي 100% (معفى جزئياً)' : '100% Électrique (Avantage écologique)'}</option>
              </select>
            </div>

            {/* Cylindrée */}
            <div>
              <label className="block text-xs font-bold text-[#003087] uppercase mb-1">
                {lang === 'ar' ? 'سعة الأسطوانة (سم³)' : 'Cylindrée (cm³)'}
              </label>
              <input
                type="number"
                value={cylinder}
                onChange={(e) => setCylinder(e.target.value)}
                placeholder="1600"
                className="w-full border border-[#CCCCCC] rounded px-3 py-2 text-xs focus:border-[#0055B3] focus:outline-none"
              />
            </div>

            {/* Valeur déclarée (TND ou équivalent devises) */}
            <div>
              <label className="block text-xs font-bold text-[#003087] uppercase mb-1">
                {lang === 'ar' ? 'القيمة التقريبية للعربة (دينار تونسي)' : 'Valeur estimée du véhicule (TND)'}
              </label>
              <input
                type="number"
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
                placeholder="45000"
                className="w-full border border-[#CCCCCC] rounded px-3 py-2 text-xs focus:border-[#0055B3] focus:outline-none"
              />
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#003087] hover:bg-[#002266] text-white font-bold text-xs uppercase tracking-wider rounded-[3px] shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>{lang === 'ar' ? 'احتساب الرسوم التقديرية' : 'Calculer les droits et taxes'}</span>
            </button>
          </div>

          {/* Results Box */}
          {result && (
            <div className="mt-4 p-4 bg-[#F0F4FF] border border-[#0055B3]/30 rounded-md animate-fade-in space-y-2">
              <div className="flex items-center gap-2 text-[#003087] font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{lang === 'ar' ? 'النتيجة التقديرية للاحتساب' : 'Résultat de l’estimation douanière'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <span className="text-[#666666]">{lang === 'ar' ? 'النسبة المطبقة:' : 'Taux d’imposition :'}</span>
                  <div className="font-bold text-[#003087]">{result.rate}</div>
                </div>
                <div>
                  <span className="text-[#666666]">{lang === 'ar' ? 'المبلغ التقديري للأداءات:' : 'Droits & taxes à payer :'}</span>
                  <div className="text-base font-bold text-emerald-700">{result.taxes.toLocaleString()} TND</div>
                </div>
              </div>
              <p className="text-[11px] text-[#888888] italic pt-1 border-t border-blue-200">
                {lang === 'ar'
                  ? '* ملاحظة: هذه المحاكاة إرشادية وتخضع للمعاينة الفنية ومطابقة ملف الوثائق لدى مكتب التوريد.'
                  : '* Note : Cette estimation est fournie à titre indicatif sous réserve de conformité du dossier technique.'}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

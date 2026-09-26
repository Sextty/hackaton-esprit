import React, { useState } from 'react';
import { Language } from '../../types';
import { X, Coins, CheckCircle, ShieldAlert, ArrowRight } from 'lucide-react';

interface DeviseModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const DeviseModal: React.FC<DeviseModalProps> = ({ isOpen, onClose, lang }) => {
  const [currency, setCurrency] = useState('EUR');
  const [amount, setAmount] = useState('5000');
  const [nationality, setNationality] = useState('non_resident');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in select-none">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full border border-[#003087]/20 overflow-hidden">
        {/* Header */}
        <div className="bg-[#003087] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Coins className="w-6 h-6 text-[#C8A951]" />
            <div>
              <h3 className="text-base font-bold uppercase">
                {lang === 'ar' ? 'استمارة التصريح بتوريد العملة الأجنبية' : 'Déclaration d’Importation de Devises'}
              </h3>
              <p className="text-xs text-blue-200">
                {lang === 'ar' ? 'وفق مقتضيات قانون الصرف والتراتيب البنكية بتونس' : 'Réglementation des changes de la Banque Centrale de Tunisie'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-base font-bold text-[#003087]">
              {lang === 'ar' ? 'تم تسجيل التصريح المسبق بالعملة بنجاح' : 'Déclaration préalable enregistrée avec succès !'}
            </h4>
            <p className="text-xs text-[#666666] max-w-sm mx-auto">
              {lang === 'ar'
                ? `المبلغ المصرح به: ${amount} ${currency}. يرجى التوجه إلى شباك الديوانة بالمعبر لختم التصريح الكتابي قبل مغادرة المنطقة الجمركية.`
                : `Montant déclaré : ${amount} ${currency}. Veuillez vous présenter au bureau des douanes à votre arrivée pour validation et visa réglementaire.`}
            </p>
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] rounded flex items-center gap-2 text-left">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'التصريح إجباري لكل مبلغ يفوق ما يعادل 20.000 دينار تونسي للمقيمين أو 5.000 دينار لغير المقيمين الراغبين بإعادة تصديرها.'
                  : 'Rappel : La déclaration est obligatoire pour tout montant égal ou supérieur à la contrevaleur de 20 000 TND (ou 5 000 TND en vue de réexportation).'}
              </span>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="px-5 py-2 bg-[#003087] text-white text-xs font-bold uppercase rounded-[3px]"
            >
              {lang === 'ar' ? 'تعديل أو تصريح جديد' : 'Nouveau calcul'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-[#333333]">
            <div className="p-3 bg-[#F0F4FF] border border-[#0055B3]/20 rounded text-[#003087]">
              <strong>{lang === 'ar' ? 'تنبيه قانوني هام :' : 'Réglementation :'}{' '}</strong>
              {lang === 'ar'
                ? 'يتعين على كل مسافر يدخل التراب التونسي وبحوزته مبالغ نقدية بالعملة الأجنبية التصريح بها لدى مكتب الدخول بالمعبر.'
                : 'Tout voyageur important des devises en billets de banque doit souscrire une déclaration à l’entrée s’il souhaite en réexporter ou ouvrir un compte en devises.'}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#003087] uppercase mb-1">
                  {lang === 'ar' ? 'العملة الأجنبية' : 'Devise'}
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full border border-[#CCCCCC] rounded px-3 py-2"
                >
                  <option value="EUR">Euro (€ - EUR)</option>
                  <option value="USD">Dollar US ($ - USD)</option>
                  <option value="CAD">Dollar Canadien (CAD)</option>
                  <option value="GBP">Livre Sterling (£ - GBP)</option>
                  <option value="CHF">Franc Suisse (CHF)</option>
                  <option value="SAR">Riyal Saoudien (SAR)</option>
                  <option value="AED">Dirham EAU (AED)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#003087] uppercase mb-1">
                  {lang === 'ar' ? 'المبلغ بالعملة' : 'Montant en devises'}
                </label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-[#CCCCCC] rounded px-3 py-2 font-mono"
                  placeholder="5000"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#003087] uppercase mb-1">
                {lang === 'ar' ? 'الصفة الإقامية' : 'Statut de résidence'}
              </label>
              <select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full border border-[#CCCCCC] rounded px-3 py-2"
              >
                <option value="non_resident">
                  {lang === 'ar' ? 'غير مقيم (تونسي بالخارج أو أجنبي)' : 'Non-résident (TRE ou touriste étranger)'}
                </option>
                <option value="resident">
                  {lang === 'ar' ? 'مقيم بالبلاد التونسية' : 'Résident en Tunisie'}
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#003087] hover:bg-[#002266] text-white font-bold text-xs uppercase tracking-wider rounded-[3px] shadow transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span>{lang === 'ar' ? 'تأكيد التسجيل المسبق' : 'Valider la pré-déclaration'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

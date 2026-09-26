import React, { useState } from 'react';
import { Language } from '../../types';
import { X, FileText, CheckCircle2, QrCode } from 'lucide-react';

interface DACModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const DACModal: React.FC<DACModalProps> = ({ isOpen, onClose, lang }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    passeport: '',
    matricule: '',
    portEntree: 'la_goulette',
    dateArrivee: '2026-10-01',
  });
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
            <FileText className="w-6 h-6 text-[#C8A951]" />
            <div>
              <h3 className="text-base font-bold uppercase">
                {lang === 'ar' ? 'مطلب رخصة جولان العربات السياحية (DAC)' : 'Demande d’Autorisation de Circulation (DAC)'}
              </h3>
              <p className="text-xs text-blue-200">
                {lang === 'ar' ? 'إجراء استباقي قبل الوصول للموانئ والمعابر الحدودية' : 'Procédure anticipée pour véhicules de tourisme étrangers'}
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
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-base font-bold text-[#003087]">
              {lang === 'ar' ? 'تم تسجيل مطلب رخصة الجولان بنجاح' : 'Votre demande DAC a été enregistrée avec succès !'}
            </h4>
            <p className="text-xs text-[#666666] max-w-sm mx-auto">
              {lang === 'ar'
                ? 'تم إنشاء رمز الاستجابة السريعة (QR-Code) الخاص برخصتك. يرجى الاستظهار به عند النزول بمكتب التفتيش.'
                : 'Votre QR-code officiel a été généré. Veuillez le présenter lors du débarquement pour un passage fluide.'}
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded inline-block">
              <QrCode className="w-24 h-24 mx-auto text-[#003087]" />
              <span className="text-[11px] font-mono text-[#888888] mt-1 block">DAC-TN-2026-9941</span>
            </div>
            <div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 bg-[#003087] text-white text-xs font-bold uppercase rounded-[3px]"
              >
                {lang === 'ar' ? 'طلب جديد' : 'Nouvelle demande'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-[#333333]">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#003087] uppercase mb-1">
                  {lang === 'ar' ? 'اللقب' : 'Nom'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Ben Ali"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full border border-[#CCCCCC] rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-bold text-[#003087] uppercase mb-1">
                  {lang === 'ar' ? 'الاسم' : 'Prénom'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Mohamed"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="w-full border border-[#CCCCCC] rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#003087] uppercase mb-1">
                  {lang === 'ar' ? 'رقم جواز السفر' : 'N° Passeport'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: U1234567"
                  value={formData.passeport}
                  onChange={(e) => setFormData({ ...formData, passeport: e.target.value })}
                  className="w-full border border-[#CCCCCC] rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-bold text-[#003087] uppercase mb-1">
                  {lang === 'ar' ? 'الرقم المنجمي للعربة' : 'Immatriculation véhicule'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: AA-123-BB"
                  value={formData.matricule}
                  onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
                  className="w-full border border-[#CCCCCC] rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#003087] uppercase mb-1">
                  {lang === 'ar' ? 'ميناء أو معبر الدخول' : 'Poste frontière / Port'}
                </label>
                <select
                  value={formData.portEntree}
                  onChange={(e) => setFormData({ ...formData, portEntree: e.target.value })}
                  className="w-full border border-[#CCCCCC] rounded px-3 py-2"
                >
                  <option value="la_goulette">{lang === 'ar' ? 'ميناء حلق الوادي' : 'Port de La Goulette'}</option>
                  <option value="zarzis">{lang === 'ar' ? 'ميناء جرجيس' : 'Port de Zarzis'}</option>
                  <option value="ras_jedir">{lang === 'ar' ? 'معبر رأس جدير' : 'Poste Ras Jedir'}</option>
                  <option value="melloula">{lang === 'ar' ? 'معبر ملولة' : 'Poste Melloula'}</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-[#003087] uppercase mb-1">
                  {lang === 'ar' ? 'تاريخ الدخول المرتقب' : 'Date d’entrée prévue'}
                </label>
                <input
                  type="date"
                  value={formData.dateArrivee}
                  onChange={(e) => setFormData({ ...formData, dateArrivee: e.target.value })}
                  className="w-full border border-[#CCCCCC] rounded px-3 py-2"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#003087] hover:bg-[#002266] text-white font-bold text-xs uppercase tracking-wider rounded-[3px] shadow transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span>{lang === 'ar' ? 'إرسال المطلب واستخراج التصريح' : 'Générer mon autorisation'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

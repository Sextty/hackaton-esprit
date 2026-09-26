import React, { useState } from 'react';
import { Language } from '../../types';
import { MapPin, Phone, Mail, Clock, Send, ChevronRight, Home, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  lang: Language;
  onNavigateHome: () => void;
}

const customsOffices = [
  { name: 'Direction Générale des Douanes (Siège)', address: 'Rue Kheireddine Pacha, 1002 Tunis', tel: '(+216) 71 799 700', email: 'dgd.dg@douane.gov.tn' },
  { name: 'Bureau des Douanes de Radès (Zone Portuaire)', address: 'Port Commercial de Radès', tel: '(+216) 71 449 300', email: 'bureau.rades@douane.gov.tn' },
  { name: 'Bureau Frontalier de La Goulette Nord', address: 'Gare Maritime de La Goulette', tel: '(+216) 71 735 400', email: 'bureau.goulette@douane.gov.tn' },
  { name: 'Bureau des Douanes de l’Aéroport Tunis-Carthage', address: 'Aéroport International de Tunis-Carthage', tel: '(+216) 71 751 000', email: 'bureau.aeroport@douane.gov.tn' },
  { name: 'Direction Régionale des Douanes de Sousse', address: 'Avenue Habib Bourguiba, Sousse', tel: '(+216) 73 225 100', email: 'dr.sousse@douane.gov.tn' },
  { name: 'Direction Régionale des Douanes de Sfax', address: 'Port de Pêche & Commerce, Sfax', tel: '(+216) 74 298 200', email: 'dr.sfax@douane.gov.tn' },
  { name: 'Bureau Frontalier de Zarzis & Djerba', address: 'Port Commercial de Zarzis', tel: '(+216) 75 690 100', email: 'bureau.zarzis@douane.gov.tn' },
  { name: 'Bureau des Douanes de Bizerte', address: 'Zone Franche Portuaire, Bizerte', tel: '(+216) 72 431 500', email: 'bureau.bizerte@douane.gov.tn' },
];

export const ContactPage: React.FC<ContactPageProps> = ({ lang, onNavigateHome }) => {
  const [formData, setFormData] = useState({ nom: '', email: '', sujet: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] select-none">
      <div className="h-20 bg-[#003087] border-t border-[#002266] flex flex-col justify-center text-center text-white relative">
        <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">
          {lang === 'ar' ? 'الاتصال والمصالح الديوانية' : 'Coordonnées & Annuaire des Douanes'}
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
            {lang === 'ar' ? 'الاتصال' : 'Contact'}
          </span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white p-6 rounded border border-[#E0E0E0] shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#003087] uppercase border-b border-[#EEEEEE] pb-2">
                {lang === 'ar' ? 'المقر المركزي' : 'Siège Central'}
              </h2>
              <div className="space-y-3 text-xs text-[#555555]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C8A951] shrink-0 mt-0.5" />
                  <span>Direction Générale des Douanes, Rue Kheireddine Pacha, 1002 Tunis</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C8A951] shrink-0" />
                  <span>(+216) 71 799 700 / (+216) 71 840 900</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C8A951] shrink-0" />
                  <span>dgd.dg@douane.gov.tn</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#C8A951] shrink-0" />
                  <span>Du Lundi au Vendredi : 08h30 — 17h30 (Permanence 24h/24 aux frontières)</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 text-xs">
                <strong>Numéro Vert Gratuit :</strong> 80 10 30 66
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 rounded border border-[#E0E0E0] shadow-xs">
              <h2 className="text-base font-bold text-[#003087] uppercase border-b border-[#EEEEEE] pb-2 mb-4">
                {lang === 'ar' ? 'نموذج المراسلة والاستفسار' : 'Formulaire de Contact en Ligne'}
              </h2>

              {sent ? (
                <div className="p-6 text-center space-y-3 bg-emerald-50 border border-emerald-200 rounded animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-sm font-bold text-emerald-900">
                    {lang === 'ar' ? 'تم إرسال رسالتكم بنجاح' : 'Votre message a été transmis avec succès !'}
                  </h3>
                  <p className="text-xs text-emerald-800">
                    Nos services vous répondront dans les plus brefs délais à l'adresse fournie.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-4 py-2 bg-[#003087] text-white text-xs font-bold rounded uppercase cursor-pointer"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#333333]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#003087] uppercase mb-1">
                        {lang === 'ar' ? 'الاسم الكامل' : 'Nom & Prénom'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full border border-[#CCCCCC] rounded px-3 py-2 focus:border-[#0055B3] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#003087] uppercase mb-1">
                        {lang === 'ar' ? 'البريد الإلكتروني' : 'Adresse Email'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-[#CCCCCC] rounded px-3 py-2 focus:border-[#0055B3] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#003087] uppercase mb-1">
                      {lang === 'ar' ? 'موضوع الرسالة' : 'Sujet'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.sujet}
                      onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                      className="w-full border border-[#CCCCCC] rounded px-3 py-2 focus:border-[#0055B3] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#003087] uppercase mb-1">
                      {lang === 'ar' ? 'نص الرسالة أو الاستفسار' : 'Votre Message'}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-[#CCCCCC] rounded px-3 py-2 focus:border-[#0055B3] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#003087] hover:bg-[#002266] text-white text-xs font-bold uppercase rounded-[3px] shadow transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'إرسال الرسالة' : 'Envoyer mon message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Directory of Customs Offices in Tunisia */}
        <div>
          <h2 className="text-base font-bold text-[#003087] uppercase mb-4">
            {lang === 'ar' ? 'دليل الإدارات والمكاتب الجهوية للديوانة' : 'Annuaire des Directions & Bureaux Régionaux des Douanes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {customsOffices.map((office, idx) => (
              <div key={idx} className="bg-white p-4 rounded border border-[#E0E0E0] shadow-2xs hover:border-[#0055B3] transition-all">
                <h4 className="font-bold text-[#003087] mb-1">{office.name}</h4>
                <p className="text-[#666666] mb-2">{office.address}</p>
                <div className="text-[11px] text-[#444444] space-y-0.5">
                  <p><strong>Tél :</strong> {office.tel}</p>
                  <p><strong>Email :</strong> {office.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

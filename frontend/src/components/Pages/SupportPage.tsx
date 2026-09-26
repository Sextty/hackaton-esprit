import React, { useState } from 'react';
import { Language } from '../../types';
import { HelpCircle, Search, FileQuestion, PlusCircle, CheckCircle, ChevronRight, Home, PhoneCall } from 'lucide-react';

interface SupportPageProps {
  lang: Language;
  onNavigateHome: () => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ lang, onNavigateHome }) => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [newTicket, setNewTicket] = useState({ nom: '', cin: '', email: '', categorie: 'fcr', question: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketNumber.trim()) return;
    setSearchResult(
      lang === 'ar'
        ? `التذكرة رقم #${ticketNumber} مسجلة بتاريخ 22 سبتمبر 2026. الحالة: بصدد الدرس لدى الإدارة العامة للديوانة (مكتب العلاقات مع المواطن).`
        : `Ticket de réclamation #${ticketNumber} du 22/09/2026 : En cours d'instruction par la cellule des relations citoyennes (Statut : En traitement).`
    );
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] select-none">
      <div className="h-20 bg-[#003087] border-t border-[#002266] flex flex-col justify-center text-center text-white relative">
        <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">
          {lang === 'ar' ? 'بوابة التذاكر والعراض الإلكترونية — نجيب على أسئلتكم' : 'Espace Ticket & Support — Nous Répondons à vos Questions'}
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
            {lang === 'ar' ? 'المساعدة والتذاكر' : 'Support Ticket'}
          </span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Suivi de Ticket */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded border border-[#E0E0E0] shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-[#003087]">
                <Search className="w-5 h-5 text-[#C8A951]" />
                <h2 className="text-base font-bold uppercase">
                  {lang === 'ar' ? 'متابعة تذكرة سابقة' : 'Consulter le Statut d’un Ticket'}
                </h2>
              </div>
              <form onSubmit={handleTrack} className="space-y-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder="ex: TK-2026-98432"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#0055B3] focus:outline-none uppercase"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#003087] hover:bg-[#002266] text-white font-bold uppercase rounded-[3px] transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'تتبع العريضة' : 'Vérifier la réponse'}
                </button>
              </form>

              {searchResult && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded text-xs animate-fade-in">
                  {searchResult}
                </div>
              )}
            </div>

            <div className="bg-[#F0F4FF] p-5 rounded border border-[#0055B3]/20 text-xs text-[#003087] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <PhoneCall className="w-4 h-4 text-[#C8A951]" />
                <span>{lang === 'ar' ? 'الخط الأخضر المباشر' : 'Numéro Vert Dédié'}</span>
              </div>
              <p className="text-[#555555]">
                Pour toute réclamation urgente aux postes frontaliers ou ports : <strong>80 10 30 66</strong> (Appel gratuit depuis la Tunisie).
              </p>
            </div>
          </div>

          {/* Déposer un nouveau ticket */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 rounded border border-[#E0E0E0] shadow-xs">
              <div className="flex items-center gap-2 mb-4 text-[#003087] border-b border-[#EEEEEE] pb-2">
                <PlusCircle className="w-5 h-5 text-[#C8A951]" />
                <h2 className="text-base font-bold uppercase">
                  {lang === 'ar' ? 'تقديم طلب استفسار أو عريضة جديدة' : 'Ouvrir un Nouveau Ticket d’Assistance'}
                </h2>
              </div>

              {submitted ? (
                <div className="p-6 text-center space-y-3 bg-emerald-50 border border-emerald-200 rounded animate-fade-in">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-bold text-emerald-900">
                    {lang === 'ar' ? 'تم تسجيل تذكرتكم بنجاح تحت رقم #TK-2026-8819' : 'Ticket enregistré avec succès ! Réf : #TK-2026-8819'}
                  </h3>
                  <p className="text-xs text-emerald-800">
                    Un accusé de réception a été envoyé à votre adresse email. Vous recevrez une réponse sous 48 heures ouvrables.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-[#003087] text-white text-xs font-bold rounded uppercase cursor-pointer"
                  >
                    Nouveau ticket
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCreate} className="space-y-4 text-xs text-[#333333]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#003087] uppercase mb-1">
                        {lang === 'ar' ? 'الاسم واللقب' : 'Nom & Prénom'}
                      </label>
                      <input
                        type="text"
                        required
                        value={newTicket.nom}
                        onChange={(e) => setNewTicket({ ...newTicket, nom: e.target.value })}
                        className="w-full border border-[#CCCCCC] rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#003087] uppercase mb-1">
                        {lang === 'ar' ? 'رقم بطاقة التعريف أو جواز السفر' : 'N° CIN ou Passeport'}
                      </label>
                      <input
                        type="text"
                        required
                        value={newTicket.cin}
                        onChange={(e) => setNewTicket({ ...newTicket, cin: e.target.value })}
                        className="w-full border border-[#CCCCCC] rounded px-3 py-2 uppercase"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#003087] uppercase mb-1">
                        {lang === 'ar' ? 'البريد الإلكتروني' : 'Adresse Email'}
                      </label>
                      <input
                        type="email"
                        required
                        value={newTicket.email}
                        onChange={(e) => setNewTicket({ ...newTicket, email: e.target.value })}
                        className="w-full border border-[#CCCCCC] rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#003087] uppercase mb-1">
                        {lang === 'ar' ? 'الموضوع أو الخدمة المعنية' : 'Catégorie de la Demande'}
                      </label>
                      <select
                        value={newTicket.categorie}
                        onChange={(e) => setNewTicket({ ...newTicket, categorie: e.target.value })}
                        className="w-full border border-[#CCCCCC] rounded px-3 py-2"
                      >
                        <option value="fcr">Avantage FCR & Véhicules</option>
                        <option value="devises">Déclaration de devises & change</option>
                        <option value="colis">Colis postaux & envois</option>
                        <option value="dac">Autorisation de circulation (Diptyque)</option>
                        <option value="sinda">Plateforme SINDA II</option>
                        <option value="autre">Autre réclamation générale</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#003087] uppercase mb-1">
                      {lang === 'ar' ? 'تفاصيل الاستفسار أو المطلب' : 'Détail de votre requête'}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={newTicket.question}
                      onChange={(e) => setNewTicket({ ...newTicket, question: e.target.value })}
                      placeholder="Précisez votre demande, référence de dossier ou bureau douanier concerné..."
                      className="w-full border border-[#CCCCCC] rounded px-3 py-2"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#003087] hover:bg-[#002266] text-white text-xs font-bold uppercase rounded-[3px] shadow transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'تسجيل وإرسال التذكرة' : 'Valider & Déposer mon ticket'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

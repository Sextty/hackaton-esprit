import React, { useState } from 'react';
import { Language } from '../../types';
import { Building, Award, FileSpreadsheet, PackageCheck, ShieldCheck, ChevronRight, Home, ArrowRight, Download, CheckCircle2 } from 'lucide-react';

interface ProfessionnelsPageProps {
  lang: Language;
  onNavigateHome: () => void;
  onOpenTarif: () => void;
  initialSubpage?: string;
}

export const ProfessionnelsPage: React.FC<ProfessionnelsPageProps> = ({
  lang,
  onNavigateHome,
  onOpenTarif,
  initialSubpage = 'all',
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialSubpage);

  const tabs = [
    { id: 'all', label: { fr: 'Tous les thèmes', ar: 'كافة المحاور' } },
    { id: 'commissionnaires', label: { fr: 'Commissionnaires en douane', ar: 'موسطو الديوانة' } },
    { id: 'entreprises', label: { fr: 'Entreprises exportatrices', ar: 'المؤسسات المصدرة' } },
    { id: 'mad', label: { fr: 'Magasins & Aires (MAD)', ar: 'مستودعات التسريح' } },
    { id: 'oea', label: { fr: 'Opérateurs Économiques Agréés (OEA)', ar: 'المتعامل المعتمد (OEA)' } },
    { id: 'themes', label: { fr: 'Tarifs & Régimes', ar: 'التعريفة والأنظمة' } },
    { id: 'formulaires', label: { fr: 'Formulaires Pro', ar: 'استمارات المهنيين' } },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] select-none">
      {/* BAND TITRE DE PAGE */}
      <div className="h-20 bg-[#003087] border-t border-[#002266] flex flex-col justify-center text-center text-white relative">
        <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">
          {lang === 'ar' ? 'فضاء المهنيين والمتعاملين الاقتصاديين' : 'Espace Professionnels & Entreprises'}
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
            {lang === 'ar' ? 'المهنيون' : 'Professionnels'}
          </span>
          {activeTab !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#C8A951]" />
              <span className="text-[#E5C778]">
                {tabs.find((t) => t.id === activeTab)?.label[lang]}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-[#E0E0E0]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#003087] text-white shadow-sm'
                  : 'bg-white text-[#555555] hover:bg-[#E8F0FE] hover:text-[#003087] border border-[#E0E0E0]'
              }`}
            >
              {tab.label[lang]}
            </button>
          ))}
        </div>

        {/* OEA Feature Box */}
        {(activeTab === 'all' || activeTab === 'oea') && (
          <div className="mb-10 bg-white border border-[#E0E0E0] rounded p-6 shadow-xs animate-fade-in">
            <div className="flex items-center gap-2 mb-2 text-[#003087]">
              <Award className="w-6 h-6 text-[#C8A951]" />
              <h2 className="text-lg font-bold uppercase">
                {lang === 'ar' ? 'برنامج الشريك الاقتصادي المعتمد (OEA)' : 'Statut d’Opérateur Économique Agréé (OEA)'}
              </h2>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed mb-4">
              Le statut OEA est accordé par la Direction Générale des Douanes aux entreprises tunisiennes fiables, transparentes et solvables. Il offre le passage prioritaire au couloir vert, l’allègement des contrôles documentaires et physiques, et la dispense des garanties financières.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-xs">
              <div className="p-3 bg-[#F0F4FF] rounded border border-blue-200">
                <CheckCircle2 className="w-4 h-4 text-[#003087] mb-1" />
                <strong className="block text-[#003087]">Couloir Vert Automatisé</strong>
                <span className="text-[#666666]">Délivrance immédiate du Bon à Enlever (BAE).</span>
              </div>
              <div className="p-3 bg-[#F0F4FF] rounded border border-blue-200">
                <CheckCircle2 className="w-4 h-4 text-[#003087] mb-1" />
                <strong className="block text-[#003087]">Interlocuteur Unique</strong>
                <span className="text-[#666666]">Cellule dédiée au suivi personnalisé de l'entreprise.</span>
              </div>
              <div className="p-3 bg-[#F0F4FF] rounded border border-blue-200">
                <CheckCircle2 className="w-4 h-4 text-[#003087] mb-1" />
                <strong className="block text-[#003087]">Reconnaissance Mutuelle</strong>
                <span className="text-[#666666]">Accords bilatéraux avec les partenaires de la Tunisie.</span>
              </div>
            </div>
            <a
              href="https://www.douane.gov.tn/demande-de-certification-oea/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#003087] hover:bg-[#002266] text-white text-xs font-bold uppercase rounded-[3px] transition-colors"
            >
              <span>Déposer un dossier de candidature OEA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Entreprises exportatrices & Régimes */}
        {(activeTab === 'all' || activeTab === 'entreprises' || activeTab === 'themes') && (
          <div className="mb-10 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Building className="w-5 h-5 text-[#003087]" />
              <h2 className="text-lg font-bold text-[#003087] uppercase">
                {lang === 'ar' ? 'المؤسسات المصدرة والأنظمة الجمركية الاقتصادية' : 'Régimes Douaniers Économiques & Entreprises Exportatrices'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white p-5 rounded border border-[#E0E0E0] text-xs space-y-2.5">
                <h4 className="font-bold text-sm text-[#003087]">
                  {lang === 'ar' ? 'القبول المؤقت والتحويل تحت المراقبة' : 'Perfectionnement Actif & Admission Temporaire'}
                </h4>
                <p className="text-[#666666] leading-relaxed">
                  Permet d'importer en suspension des droits et taxes des matières premières, composants et pièces détachées destinés à être réexportés après ouvraison ou transformation industrielle.
                </p>
                <button
                  onClick={onOpenTarif}
                  className="text-xs font-bold text-[#0055B3] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                >
                  <span>Rechercher les codes SH concernés</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="bg-white p-5 rounded border border-[#E0E0E0] text-xs space-y-2.5">
                <h4 className="font-bold text-sm text-[#003087]">
                  {lang === 'ar' ? 'مستودعات ومساحات التسريح الجمركي (MAD)' : 'Entrepôts Sous Douane & Aires de Dédouanement'}
                </h4>
                <p className="text-[#666666] leading-relaxed">
                  Stockage de marchandises en suspension de droits de douane dans l'attente d'une assignation à un régime douanier définitif, avec gestion dématérialisée sous SINDA.
                </p>
                <span className="text-[11px] text-[#003087] font-bold bg-[#E8F0FE] px-2 py-0.5 rounded inline-block">
                  Réglementation MAD agréée
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Commissionnaires en douane */}
        {(activeTab === 'all' || activeTab === 'commissionnaires') && (
          <div className="mb-10 bg-white p-6 rounded border border-[#E0E0E0] shadow-xs animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <PackageCheck className="w-5 h-5 text-[#003087]" />
              <h2 className="text-lg font-bold text-[#003087] uppercase">
                {lang === 'ar' ? 'دليل موسطي الديوانة وشروط الاعتماد' : 'Commissionnaires en Douane Agréés'}
              </h2>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed mb-4">
              L'exercice de la profession de commissionnaire en douane en Tunisie est soumis à l'agrément ministériel préalable. Retrouvez les conditions d'octroi, les sessions d'examens professionnels et l'annuaire national des agents assermentés.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-[#444444] space-y-1">
              <strong>Annuaire officiel des Commissionnaires en Douane :</strong>
              <p>Plus de 380 bureaux agréés opérant sur les bureaux frontaliers de Radès, La Goulette, Sfax, Sousse et aéroports.</p>
            </div>
          </div>
        )}

        {/* Formulaires Professionnels */}
        {(activeTab === 'all' || activeTab === 'formulaires') && (
          <div className="mb-10 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <FileSpreadsheet className="w-5 h-5 text-[#003087]" />
              <h2 className="text-lg font-bold text-[#003087] uppercase">
                {lang === 'ar' ? 'مطبوعات واستمارات المهنيين' : 'Formulaires Professionnels Téléchargeables'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Dossier de candidature Statut OEA (Questionnaire d’auto-évaluation)', size: '420 Ko' },
                { title: 'Demande d’ouverture d’un Magasin et Aire de Dédouanement (MAD)', size: '280 Ko' },
                { title: 'Demande d’agrément de Commissionnaire en douane agréé', size: '190 Ko' },
                { title: 'Déclaration préalable de transformation sous douane (Perfectionnement actif)', size: '235 Ko' },
              ].map((form, idx) => (
                <div key={idx} className="bg-white p-4 rounded border border-[#E0E0E0] flex items-center justify-between shadow-2xs hover:border-[#003087]">
                  <div>
                    <h4 className="text-xs font-bold text-[#333333]">{form.title}</h4>
                    <span className="text-[11px] text-[#888888]">PDF ({form.size}) • Direction des Régimes</span>
                  </div>
                  <button
                    onClick={() => alert(`Téléchargement de : ${form.title}`)}
                    className="px-3 py-1.5 bg-[#E8F0FE] text-[#003087] hover:bg-[#003087] hover:text-white rounded text-xs font-bold transition-colors cursor-pointer"
                  >
                    Télécharger
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

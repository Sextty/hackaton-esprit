import React, { useState } from 'react';
import { Language } from '../../types';
import { History, Shield, BookOpen, UserPlus, Gavel, Newspaper, ChevronRight, Home, ArrowRight, DownloadCloud, CheckCircle2 } from 'lucide-react';

interface DouanePageProps {
  lang: Language;
  onNavigateHome: () => void;
  initialSubpage?: string;
}

export const DouanePage: React.FC<DouanePageProps> = ({
  lang,
  onNavigateHome,
  initialSubpage = 'all',
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialSubpage);

  const tabs = [
    { id: 'all', label: { fr: 'Présentation globale', ar: 'نظرة شاملة' } },
    { id: 'histoire', label: { fr: 'Histoire & Organisation', ar: 'التاريخ والتنظيم' } },
    { id: 'textes', label: { fr: 'Textes & Code des douanes', ar: 'مجلة الديوانة والتشريعات' } },
    { id: 'recrutement', label: { fr: 'Concours & Recrutement', ar: 'الانتداب والمناظرات' } },
    { id: 'avis', label: { fr: 'Ventes aux enchères & Avis', ar: 'البتات العمومية' } },
    { id: 'revue', label: { fr: 'Revue & Publications', ar: 'مجلة الديوانة' } },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] select-none">
      {/* BAND TITRE DE PAGE */}
      <div className="h-20 bg-[#003087] border-t border-[#002266] flex flex-col justify-center text-center text-white relative">
        <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">
          {lang === 'ar' ? 'التعريف بالإدارة العامة للديوانة' : 'La Douane Tunisienne — Institution & Missions'}
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
            {lang === 'ar' ? 'عن الديوانة' : 'Douane'}
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

        {/* Global Overview / Missions */}
        {(activeTab === 'all' || activeTab === 'histoire') && (
          <div className="mb-10 animate-fade-in space-y-6">
            <div className="bg-white p-6 rounded border border-[#E0E0E0] shadow-xs">
              <div className="flex items-center gap-2.5 mb-3 text-[#003087]">
                <Shield className="w-6 h-6 text-[#C8A951]" />
                <h2 className="text-lg font-bold uppercase">
                  {lang === 'ar' ? 'رسالة ومهام الديوانة التونسية' : 'Missions Fondamentales de la Douane Tunisienne'}
                </h2>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed mb-6">
                Créée sous sa forme moderne après l’indépendance, la Direction Générale des Douanes relève du Ministère des Finances. Elle exerce une triple mission stratégique pour la souveraineté et le développement économique de la Tunisie :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                <div className="p-4 bg-[#F0F4FF] rounded border border-blue-200">
                  <strong className="block text-sm text-[#003087] mb-1.5">1. Mission Fiscale</strong>
                  <p className="text-[#555555] leading-relaxed">
                    Perception des droits et taxes douanières, TVA et redevances à l'importation. La douane mobilise des ressources financières cruciales pour le budget de l'État.
                  </p>
                </div>

                <div className="p-4 bg-[#F0F4FF] rounded border border-blue-200">
                  <strong className="block text-sm text-[#003087] mb-1.5">2. Mission Économique</strong>
                  <p className="text-[#555555] leading-relaxed">
                    Protection du tissu industriel national contre le dumping, la contrebande et la contrefaçon. Encouragement des exportations grâce aux régimes douaniers économiques.
                  </p>
                </div>

                <div className="p-4 bg-[#F0F4FF] rounded border border-blue-200">
                  <strong className="block text-sm text-[#003087] mb-1.5">3. Mission Sécuritaire</strong>
                  <p className="text-[#555555] leading-relaxed">
                    Surveillance continue des frontières terrestres, maritimes et des aéroports par le corps de la Garde Douanière pour intercepter stupéfiants, armes et flux financiers illicites.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Textes législatifs & Code des douanes */}
        {(activeTab === 'all' || activeTab === 'textes') && (
          <div className="mb-10 bg-white p-6 rounded border border-[#E0E0E0] shadow-xs animate-fade-in">
            <div className="flex items-center gap-2.5 mb-3 text-[#003087]">
              <BookOpen className="w-6 h-6 text-[#C8A951]" />
              <h2 className="text-lg font-bold uppercase">
                {lang === 'ar' ? 'النصوص التشريعية ومجلة الديوانة' : 'Textes Législatifs, Réglementaires & Code des Douanes'}
              </h2>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed mb-4">
              Consultez l'ensemble du corpus juridique régissant l'activité douanière en Tunisie, notamment le Code des Douanes promulgué par la loi n° 2008-34, ainsi que les Bulletins Officiels des Douanes (BOD).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#003087]">Code des Douanes Tunisien Intégral</h4>
                  <span className="text-[11px] text-[#888888]">Loi n° 2008-34 avec mise à jour Loi de Finances 2026</span>
                </div>
                <button
                  onClick={() => alert('Ouverture du Code des Douanes annoté 2026.')}
                  className="px-3 py-1.5 bg-[#003087] text-white text-xs font-bold uppercase rounded-[3px] hover:bg-[#002266]"
                >
                  Consulter
                </button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#003087]">Bulletin Officiel des Douanes (BOD)</h4>
                  <span className="text-[11px] text-[#888888]">Dernières circulaires et décisions d'application générales</span>
                </div>
                <button
                  onClick={() => alert('Accès au répertoire des Bulletins Officiels.')}
                  className="px-3 py-1.5 bg-[#003087] text-white text-xs font-bold uppercase rounded-[3px] hover:bg-[#002266]"
                >
                  Consulter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Concours & Recrutement */}
        {(activeTab === 'all' || activeTab === 'recrutement') && (
          <div className="mb-10 bg-white p-6 rounded border border-[#E0E0E0] shadow-xs animate-fade-in">
            <div className="flex items-center gap-2.5 mb-3 text-[#003087]">
              <UserPlus className="w-6 h-6 text-[#C8A951]" />
              <h2 className="text-lg font-bold uppercase">
                {lang === 'ar' ? 'مناظرات الانتداب والتكوين بالمدارس الوطنية' : 'Concours de Recrutement & Formation Douanière'}
              </h2>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded text-xs space-y-2 mb-4">
              <strong className="block text-amber-900 font-bold">
                Communiqué officiel de recrutement — Sous-lieutenants des Douanes (Sessions 2024 / 2025 / 2026) :
              </strong>
              <p className="text-amber-800">
                Les listes des candidats admissibles aux épreuves physiques et aux examens d'aptitude médicale sont mises à disposition des postulants. Veuillez vous munir de votre convocation officielle.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://www.douane.gov.tn/recrutement/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#003087] text-white text-xs font-bold uppercase rounded-[3px] hover:bg-[#002266]"
              >
                Accéder au portail des concours
              </a>
            </div>
          </div>
        )}

        {/* Ventes aux enchères publiques */}
        {(activeTab === 'all' || activeTab === 'avis') && (
          <div className="mb-10 bg-white p-6 rounded border border-[#E0E0E0] shadow-xs animate-fade-in">
            <div className="flex items-center gap-2.5 mb-3 text-[#003087]">
              <Gavel className="w-6 h-6 text-[#C8A951]" />
              <h2 className="text-lg font-bold uppercase">
                {lang === 'ar' ? 'البتات العمومية والبيوعات بالمزاد العلني' : 'Ventes aux Enchères Publiques & Avis'}
              </h2>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed mb-4">
              La Direction Générale des Douanes organise périodiquement des ventes aux enchères publiques de marchandises et de véhicules confisqués au profit du Trésor Public (Bureaux de Tunis Port, Radès, Sousse et Sfax).
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-[#555555]">
              <strong>Prochaine vacation publique annoncée :</strong> Lot de véhicules touristiques et outillages industriels au bureau frontalier de Radès.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

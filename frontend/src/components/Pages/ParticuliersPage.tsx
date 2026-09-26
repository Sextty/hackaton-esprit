import React, { useState } from 'react';
import { Language } from '../../types';
import { Plane, Car, Coins, Package, ShieldAlert, DownloadCloud, ChevronRight, Home, ArrowRight, CheckCircle2, FileText, AlertCircle, ExternalLink } from 'lucide-react';

interface ParticuliersPageProps {
  lang: Language;
  onNavigateHome: () => void;
  onOpenTaxation: () => void;
  onOpenDAC: () => void;
  onOpenDevise: () => void;
  initialSubpage?: string;
}

export const ParticuliersPage: React.FC<ParticuliersPageProps> = ({
  lang,
  onNavigateHome,
  onOpenTaxation,
  onOpenDAC,
  onOpenDevise,
  initialSubpage = 'all',
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialSubpage);

  const tabs = [
    { id: 'all', label: { fr: 'Tous les services', ar: 'كافة الخدمات' } },
    { id: 'voyageurs', label: { fr: 'Voyageurs', ar: 'المسافرون' } },
    { id: 'fcr', label: { fr: 'Tunisiens à l’étranger (FCR)', ar: 'التونسيون بالخارج (FCR)' } },
    { id: 'devises', label: { fr: 'Devises & Change', ar: 'العملة والصرف' } },
    { id: 'colis', label: { fr: 'Colis postaux', ar: 'الطرود البريدية' } },
    { id: 'prohibitions', label: { fr: 'Prohibitions & Restrictions', ar: 'المحظورات' } },
    { id: 'formulaires', label: { fr: 'Formulaires', ar: 'المطبوعات' } },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] select-none">
      {/* 3.2 BAND TITRE DE PAGE — 80px #003087 */}
      <div className="h-20 bg-[#003087] border-t border-[#002266] flex flex-col justify-center text-center text-white relative">
        <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">
          {lang === 'ar' ? 'فضاء الأفراد والمسافرين' : 'Espace Particuliers & Citoyens'}
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
            {lang === 'ar' ? 'الأفراد' : 'Particuliers'}
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

        {/* Content based on selected tab */}
        {activeTab === 'all' || activeTab === 'voyageurs' ? (
          <div className="mb-10 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="w-5 h-5 text-[#003087]" />
              <h2 className="text-lg font-bold text-[#003087] uppercase">
                {lang === 'ar' ? 'دليل المسافرين — التراتيب والإعفاءات' : 'Guide des Voyageurs — Franchises & Formalités'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded border border-[#E0E0E0] shadow-2xs">
                <h3 className="font-bold text-sm text-[#003087] mb-2">
                  {lang === 'ar' ? 'الأمتعة الشخصية والهدايا' : 'Effets Personnels & Tolérances'}
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed mb-3">
                  Franchise totale sur les vêtements usagés, 200 cigarettes (ou 100 cigarillos ou 50 cigares) et 1 litre d'alcool fort pour les voyageurs de plus de 17 ans.
                </p>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  {lang === 'ar' ? 'معفى من المعاليم' : 'Exonération totale'}
                </span>
              </div>

              <div className="bg-white p-5 rounded border border-[#E0E0E0] shadow-2xs">
                <h3 className="font-bold text-sm text-[#003087] mb-2">
                  {lang === 'ar' ? 'العربات السياحية (Diptyque / DAC)' : 'Véhicule Touristique (DAC)'}
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed mb-3">
                  Octroi d’un permis de circulation temporaire de 3 mois renouvelable jusqu'à un an pour les non-résidents. Édition anticipée en ligne disponible.
                </p>
                <button
                  onClick={onOpenDAC}
                  className="text-xs font-bold text-[#0055B3] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'استخراج رخصة جولان DAC' : 'Souscrire mon permis DAC'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="bg-white p-5 rounded border border-[#E0E0E0] shadow-2xs">
                <h3 className="font-bold text-sm text-[#003087] mb-2">
                  {lang === 'ar' ? 'استرداد الأداء على القيمة المضافة (Détaxe)' : 'Détaxe Voyageurs (TVA)'}
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed mb-3">
                  Remboursement de la TVA pour les achats touristiques dépassant 200 TND par bordereau sous réserve de présentation des biens aux points de sortie.
                </p>
                <span className="text-[11px] text-[#003087] font-bold bg-[#E8F0FE] px-2 py-0.5 rounded">
                  {lang === 'ar' ? 'شباك الاسترجاع بالمطارات والموانئ' : 'Comptoirs de remboursement frontaliers'}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === 'all' || activeTab === 'fcr' ? (
          <div className="mb-10 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-5 h-5 text-[#003087]" />
              <h2 className="text-lg font-bold text-[#003087] uppercase">
                {lang === 'ar' ? 'التونسيون بالخارج وامتياز نظام FCR 2026' : 'Tunisiens Résidant à l’Étranger (TRE) & Régime FCR 2026'}
              </h2>
            </div>
            <div className="bg-white p-6 rounded border border-[#E0E0E0] shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-[#003087]">
                    {lang === 'ar' ? 'الشروط القانونية للامتياز الجبائي FCR' : 'Dispositions et Barèmes FCR en Vigueur'}
                  </h3>
                  <ul className="space-y-2 text-xs text-[#555555]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{lang === 'ar' ? 'إقامة فعلية بالخارج لمدة سنتين على الأقل دون تجاوز 120 يوماً بتونس في السنة.' : 'Séjour minimum de 2 ans à l’étranger sans excéder 120 jours par an en Tunisie.'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{lang === 'ar' ? 'امتياز السيارة FCR يمنح مرة واحدة في العمر لكل تونسي وتونسية مستوفين للشروط.' : 'Octroi unique par citoyen tunisien majeur remplissant les conditions de retour définitif.'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{lang === 'ar' ? 'خيار دفع 25% من المعاليم والتسجيل في السلسلة التونسية العادية (قابل للتفويت فوراً).' : 'Option d’immatriculation normale avec paiement forfaitaire de 25% des taxes (cessible sans restriction).'}</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <button
                      onClick={onOpenTaxation}
                      className="px-5 py-2.5 bg-[#003087] hover:bg-[#002266] text-white text-xs font-bold uppercase rounded-[3px] shadow transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>{lang === 'ar' ? 'فتح المحتسب الآلي FCR' : 'Lancer le Simulateur FCR'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-[#F0F4FF] p-5 rounded border border-[#0055B3]/20 space-y-3 text-xs">
                  <strong className="block font-bold text-[#003087] text-sm">
                    {lang === 'ar' ? 'الوثائق المطلوبة للملف' : 'Dossier administratif requis :'}
                  </strong>
                  <ul className="space-y-1.5 text-[#444444]">
                    <li>• {lang === 'ar' ? 'نسخة من بطاقة التعريف وجواز السفر مع أختام الدخول والخروج' : 'Copie CIN et passeport avec cachets des mouvements frontaliers'}</li>
                    <li>• {lang === 'ar' ? 'البطاقة الرمادية للسيارة باسم المعني' : 'Carte grise originale du véhicule au nom du demandeur'}</li>
                    <li>• {lang === 'ar' ? 'شهادة إقامة وتصريح بالعودة النهائية' : 'Certificat de résidence et déclaration de retour définitif'}</li>
                    <li>• {lang === 'ar' ? 'مطلب امتياز جبائي نموذج 6.3.41' : 'Demande d’avantage fiscal modèle officiel'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === 'all' || activeTab === 'devises' ? (
          <div className="mb-10 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Coins className="w-5 h-5 text-[#003087]" />
              <h2 className="text-lg font-bold text-[#003087] uppercase">
                {lang === 'ar' ? 'العملة والصرف والتصريح بالقيم المنقولة' : 'Devises & Réglementation des Changes'}
              </h2>
            </div>
            <div className="bg-white p-6 rounded border border-[#E0E0E0] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl text-xs text-[#555555]">
                <p>
                  {lang === 'ar'
                    ? 'يخضع استيراد وتصدير العملة الأجنبية لمقتضيات قانون الصرف التونسي. يجب التصريح وجوباً بكل مبلغ يفوق ما يعادل 20 ألف دينار للمقيمين أو 5 آلاف دينار لغير المقيمين الراغبين بإعادة تصديرها.'
                    : 'L’importation et l’exportation de devises sont soumises à la réglementation de change. La déclaration écrite est obligatoire pour les non-résidents désirant réexporter leurs devises au-delà de 5 000 TND.'}
                </p>
                <div className="flex items-center gap-2 text-amber-800 bg-amber-50 p-2.5 rounded border border-amber-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{lang === 'ar' ? 'التصريح يجب تقديمه وختمه قبل مغادرة النقطة الجمركية بالميناء أو المطار.' : 'Attention : La déclaration doit impérativement être visée avant la sortie de l’enceinte douanière.'}</span>
                </div>
              </div>
              <button
                onClick={onOpenDevise}
                className="px-5 py-2.5 bg-[#003087] hover:bg-[#002266] text-white text-xs font-bold uppercase rounded-[3px] shadow transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>{lang === 'ar' ? 'استمارة توريد العملة' : 'Formulaire en ligne devises'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : null}

        {activeTab === 'all' || activeTab === 'colis' ? (
          <div className="mb-10 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-[#003087]" />
              <h2 className="text-lg font-bold text-[#003087] uppercase">
                {lang === 'ar' ? 'الطرود البريدية والإرساليات السريعة' : 'Colis Postaux & Fret Aérien'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white p-5 rounded border border-[#E0E0E0] text-xs space-y-2">
                <h4 className="font-bold text-[#003087] text-sm">
                  {lang === 'ar' ? 'الطرود العائلية غير التجارية' : 'Envois familiaux occasionnels'}
                </h4>
                <p className="text-[#666666]">
                  Les cadeaux et envois sans caractère commercial de valeur inférieure à 100 TND bénéficient d’une franchise douanière. Au-delà, une taxation forfaitaire simplifiée s'applique.
                </p>
              </div>

              <div className="bg-white p-5 rounded border border-[#E0E0E0] text-xs space-y-2">
                <h4 className="font-bold text-[#003087] text-sm">
                  {lang === 'ar' ? 'الطرود التجارية وشركات الشحن' : 'Envois commerciaux & Fret Express'}
                </h4>
                <p className="text-[#666666]">
                  Assujettis aux formalités normales de dédouanement (déclaration détaillée via SINDA ou bordereau postal de dédouanement avec acquittement des droits).
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === 'all' || activeTab === 'prohibitions' ? (
          <div className="mb-10 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-bold text-[#003087] uppercase">
                {lang === 'ar' ? 'المحظورات والمواد الخاضعة للمقيدات' : 'Prohibitions Absolues & Restrictions Spécifiques'}
              </h2>
            </div>
            <div className="bg-white p-5 rounded border border-red-200 divide-y divide-slate-100 text-xs text-[#555555]">
              <div className="py-2.5 flex items-start gap-3">
                <span className="font-bold text-red-700 w-44 shrink-0">• Drones de loisir & pro</span>
                <span>Importation strictement interdite sans autorisation préalable délivrée par le Ministère de l’Intérieur et de la Défense.</span>
              </div>
              <div className="py-2.5 flex items-start gap-3">
                <span className="font-bold text-red-700 w-44 shrink-0">• Équipements télécoms</span>
                <span>Talkies-walkies, émetteurs radio et GPS marins nécessitent l’agrément de l'Agence Nationale des Fréquences (ANF).</span>
              </div>
              <div className="py-2.5 flex items-start gap-3">
                <span className="font-bold text-red-700 w-44 shrink-0">• Armes et munitions</span>
                <span>Armes de tir sportif ou de chasse soumises à permis d’importation et autorisation préalable du Ministère de l’Intérieur.</span>
              </div>
              <div className="py-2.5 flex items-start gap-3">
                <span className="font-bold text-red-700 w-44 shrink-0">• Espèces protégées (CITES)</span>
                <span>Interdiction stricte d’importation ou d’exportation d’espèces de faune et flore protégées sans certificat CITES officiel.</span>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === 'all' || activeTab === 'formulaires' ? (
          <div className="mb-10 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <DownloadCloud className="w-5 h-5 text-[#003087]" />
              <h2 className="text-lg font-bold text-[#003087] uppercase">
                {lang === 'ar' ? 'المطبوعات والاستمارات الرسمية للتحميل' : 'Téléchargement des Formulaires Officiels (PDF)'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Formulaire de Déclaration de Devises à l’entrée', size: '145 Ko', ref: 'CERFA-DGD-01' },
                { title: 'Demande d’avantage fiscal FCR (Modèle 6.3.41)', size: '210 Ko', ref: 'MOD-FCR-2026' },
                { title: 'Procuration pour conduite de véhicule étranger en Tunisie', size: '118 Ko', ref: 'PROC-VEH-04' },
                { title: 'Déclaration simplifiée des effets personnels et mobilier', size: '175 Ko', ref: 'DEC-DEM-02' },
              ].map((form, idx) => (
                <div key={idx} className="bg-white p-4 rounded border border-[#E0E0E0] flex items-center justify-between shadow-2xs hover:border-[#003087] transition-all">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#003087]" />
                    <div>
                      <h4 className="text-xs font-bold text-[#333333]">{form.title}</h4>
                      <span className="text-[11px] text-[#888888]">{form.ref} • PDF ({form.size})</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Téléchargement de ${form.title} simulé avec succès.`)}
                    className="px-3 py-1.5 bg-[#E8F0FE] text-[#003087] hover:bg-[#003087] hover:text-white rounded text-xs font-bold transition-colors cursor-pointer"
                  >
                    Télécharger
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

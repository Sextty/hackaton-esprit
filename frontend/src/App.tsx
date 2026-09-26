import React, { useState, useEffect } from 'react';
import { Language, FeatureService, NewsArticle, VideoItem, PageId } from './types';
import { TopBar } from './components/Header/TopBar';
import { Navbar } from './components/Header/Navbar';
import { HeroSlider } from './components/HeroSlider/HeroSlider';
import { FeatureCards } from './components/Features/FeatureCards';
import { EServicesHub } from './components/Features/EServicesHub';
import { StatsBanner } from './components/Stats/StatsBanner';
import { NewsSection } from './components/News/NewsSection';
import { DouaneTVSection } from './components/DouaneTV/DouaneTVSection';
import { ParticuliersPage } from './components/Pages/ParticuliersPage';
import { ProfessionnelsPage } from './components/Pages/ProfessionnelsPage';
import { DouanePage } from './components/Pages/DouanePage';
import { EServicesPage } from './components/Pages/EServicesPage';
import { NewsPage } from './components/Pages/NewsPage';
import { DouaneTVPage } from './components/Pages/DouaneTVPage';
import { ContactPage } from './components/Pages/ContactPage';
import { SupportPage } from './components/Pages/SupportPage';
import { Footer } from './components/Footer/Footer';
import { SupportWidget } from './components/SupportWidget/SupportWidget';
import { TaxationModal } from './components/Modals/TaxationModal';
import { Wadh3iatiModal } from './components/Modals/Wadh3iatiModal';
import { TarifModal } from './components/Modals/TarifModal';
import { DACModal } from './components/Modals/DACModal';
import { DeviseModal } from './components/Modals/DeviseModal';
import { NewsDetailModal } from './components/Modals/NewsDetailModal';
import { VideoPlayerModal } from './components/Modals/VideoPlayerModal';
import { SearchModal } from './components/Modals/SearchModal';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [activeNav, setActiveNav] = useState<PageId>('accueil');
  const [subpage, setSubpage] = useState<string>('all');

  // Modal States
  const [taxationOpen, setTaxationOpen] = useState(false);
  const [wadh3iatiOpen, setWadh3iatiOpen] = useState(false);
  const [tarifOpen, setTarifOpen] = useState(false);
  const [dacOpen, setDacOpen] = useState(false);
  const [deviseOpen, setDeviseOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Set document dir when language changes
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleOpenAction = (action: string) => {
    if (action === 'taxation') setTaxationOpen(true);
    else if (action === 'wadh3iati') setWadh3iatiOpen(true);
    else if (action === 'tarif') setTarifOpen(true);
    else if (action === 'dac') setDacOpen(true);
    else if (action === 'devise') setDeviseOpen(true);
  };

  const handleNavSelect = (page: PageId, newSubpage?: string) => {
    setActiveNav(page);
    if (newSubpage) setSubpage(newSubpage);
    else setSubpage('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceSelect = (service: FeatureService) => {
    if (service.actionType === 'modal_taxation') setTaxationOpen(true);
    else if (service.actionType === 'modal_wadh3iati') setWadh3iatiOpen(true);
    else if (service.actionType === 'modal_tarif') setTarifOpen(true);
    else if (service.actionType === 'modal_dac') setDacOpen(true);
    else if (service.actionType === 'modal_devise') setDeviseOpen(true);
    else if (service.pageTarget) handleNavSelect(service.pageTarget, service.subpageTarget);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#F5F5F5] font-sans antialiased text-[#333333] ${lang === 'ar' ? 'font-arabic' : ''}`}>
      {/* 3.1 & 4.8 TOP BAR — "NOUS RÉPONDONS A VOS QUESTIONS." */}
      <TopBar
        lang={lang}
        onLanguageChange={(newLang) => setLang(newLang)}
        onSupportClick={() => handleNavSelect('support')}
        onNavigateToSocial={(network) => {
          if (network === 'youtube') handleNavSelect('douanetv');
          else handleNavSelect('news');
        }}
      />

      {/* 3.1 & 4.7 HEADER & NAVBAR WITH COMPLETE IN-APP MEGA-MENU */}
      <Navbar
        lang={lang}
        activeNav={activeNav}
        onNavSelect={handleNavSelect}
        onSearchOpen={() => setSearchOpen(true)}
        onOpenModalAction={handleOpenAction}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        {activeNav === 'particuliers' ? (
          <ParticuliersPage
            lang={lang}
            onNavigateHome={() => handleNavSelect('accueil')}
            onOpenTaxation={() => setTaxationOpen(true)}
            onOpenDAC={() => setDacOpen(true)}
            onOpenDevise={() => setDeviseOpen(true)}
            initialSubpage={subpage}
          />
        ) : activeNav === 'professionnels' ? (
          <ProfessionnelsPage
            lang={lang}
            onNavigateHome={() => handleNavSelect('accueil')}
            onOpenTarif={() => setTarifOpen(true)}
            initialSubpage={subpage}
          />
        ) : activeNav === 'douane' ? (
          <DouanePage
            lang={lang}
            onNavigateHome={() => handleNavSelect('accueil')}
            initialSubpage={subpage}
          />
        ) : activeNav === 'eservices' ? (
          <EServicesPage
            lang={lang}
            onNavigateHome={() => handleNavSelect('accueil')}
            onOpenModal={handleOpenAction}
          />
        ) : activeNav === 'news' ? (
          <NewsPage
            lang={lang}
            onNavigateHome={() => handleNavSelect('accueil')}
            onSelectArticle={(article) => setSelectedArticle(article)}
          />
        ) : activeNav === 'douanetv' ? (
          <DouaneTVPage
            lang={lang}
            onNavigateHome={() => handleNavSelect('accueil')}
            onPlayVideo={(video) => setSelectedVideo(video)}
          />
        ) : activeNav === 'contact' ? (
          <ContactPage
            lang={lang}
            onNavigateHome={() => handleNavSelect('accueil')}
          />
        ) : activeNav === 'support' ? (
          <SupportPage
            lang={lang}
            onNavigateHome={() => handleNavSelect('accueil')}
          />
        ) : activeNav === 'sinda' ? (
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-12 animate-fade-in select-none">
            <div className="bg-white border border-[#E0E0E0] rounded-lg p-8 shadow-sm">
              <div className="flex items-center gap-3 text-[#003087] mb-4">
                <ShieldCheck className="w-8 h-8 text-[#C8A951]" />
                <h2 className="text-2xl font-bold uppercase">
                  {lang === 'ar' ? 'مشروع سندة II — المنظومة الديوانية الرقمية المتكاملة' : 'Système d’Information Douanier SINDA II'}
                </h2>
              </div>
              <div className="w-12 h-1 bg-[#C8A951] mb-6" />
              <p className="text-sm leading-relaxed text-[#555555] mb-6">
                {lang === 'ar'
                  ? 'مشروع وطني إستراتيجي يهدف إلى رقمنة 100% من الإجراءات الجمركية وتبسيط مسالك التجارة الخارجية، وربط كافة المتدخلين بالموانئ والمطارات والمعابر البرية بشباك موحد فائق الأمان.'
                  : 'Le projet SINDA II modernise l’ensemble de l’infrastructure douanière tunisienne : déclaration anticipée, télépaiement des droits et taxes, gestion du risque assistée par IA, et traçabilité temps réel des flux conteneurisés.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-[#F0F4FF] rounded border border-blue-200">
                  <CheckCircle2 className="w-5 h-5 text-[#003087] mb-2" />
                  <h4 className="font-bold text-xs uppercase text-[#003087]">Zéro Papier</h4>
                  <p className="text-xs text-slate-600 mt-1">Dématérialisation intégrale des liasses et quittances.</p>
                </div>
                <div className="p-4 bg-[#F0F4FF] rounded border border-blue-200">
                  <CheckCircle2 className="w-5 h-5 text-[#003087] mb-2" />
                  <h4 className="font-bold text-xs uppercase text-[#003087]">Guichet Unique</h4>
                  <p className="text-xs text-slate-600 mt-1">Interconnexion avec le TTN, ports (OMMP) et banques.</p>
                </div>
                <div className="p-4 bg-[#F0F4FF] rounded border border-blue-200">
                  <CheckCircle2 className="w-5 h-5 text-[#003087] mb-2" />
                  <h4 className="font-bold text-xs uppercase text-[#003087]">Dédouanement Express</h4>
                  <p className="text-xs text-slate-600 mt-1">Réduction des délais d’attente moyen sous 24h.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleNavSelect('eservices')}
                  className="px-5 py-2.5 bg-[#003087] text-white text-xs font-bold uppercase rounded-[3px] hover:bg-[#002266] cursor-pointer"
                >
                  {lang === 'ar' ? 'الخدمات المرتبطة بمنظومة سندة' : 'Accéder aux E-Services SINDA'}
                </button>
                <button
                  onClick={() => handleNavSelect('accueil')}
                  className="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold uppercase rounded-[3px] hover:bg-slate-50 cursor-pointer"
                >
                  {lang === 'ar' ? 'الرجوع إلى الصفحة الرئيسية' : 'Retour à l’accueil'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ACCUEIL (HOME) PAGE */
          <>
            {/* 1. HERO SLIDER */}
            <HeroSlider
              lang={lang}
              onExploreServices={() => {
                const el = document.getElementById('services-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setTaxationOpen(true);
              }}
              onOpenQuickGuide={() => handleNavSelect('particuliers')}
            />

            {/* 2. SERVICES BOARD — SECTION 3 FROM DOUANE.GOV.TN */}
            <div id="services-section">
              <FeatureCards
                lang={lang}
                onSelectService={handleServiceSelect}
              />
            </div>

            {/* 3. FACTS & FIGURES — SECTION 4 FROM DOUANE.GOV.TN */}
            <StatsBanner lang={lang} />

            {/* 4. COMPREHENSIVE E-SERVICES HUB (14 SERVICES) */}
            <EServicesHub
              lang={lang}
              onOpenModal={handleOpenAction}
              onViewAllEServices={() => handleNavSelect('eservices')}
            />

            {/* 5. NEWS SECTION — SECTION 5 FROM DOUANE.GOV.TN */}
            <NewsSection
              lang={lang}
              onSelectArticle={(article) => setSelectedArticle(article)}
              onViewAllNews={() => handleNavSelect('news')}
            />

            {/* 6. DOUANE-TV — SECTION 7 FROM DOUANE.GOV.TN */}
            <DouaneTVSection
              lang={lang}
              onPlayVideo={(video) => setSelectedVideo(video)}
              onViewMoreVideos={() => handleNavSelect('douanetv')}
            />
          </>
        )}
      </main>

      {/* FOOTER */}
      <Footer
        lang={lang}
        onNavigate={handleNavSelect}
      />

      {/* FLOATING SUPPORT WIDGET */}
      <SupportWidget lang={lang} />

      {/* INTERACTIVE MODALS */}
      <TaxationModal
        isOpen={taxationOpen}
        onClose={() => setTaxationOpen(false)}
        lang={lang}
      />

      <Wadh3iatiModal
        isOpen={wadh3iatiOpen}
        onClose={() => setWadh3iatiOpen(false)}
        lang={lang}
      />

      <TarifModal
        isOpen={tarifOpen}
        onClose={() => setTarifOpen(false)}
        lang={lang}
      />

      <DACModal
        isOpen={dacOpen}
        onClose={() => setDacOpen(false)}
        lang={lang}
      />

      <DeviseModal
        isOpen={deviseOpen}
        onClose={() => setDeviseOpen(false)}
        lang={lang}
      />

      <NewsDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        lang={lang}
      />

      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        lang={lang}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        lang={lang}
        onSelectAction={handleOpenAction}
      />
    </div>
  );
}

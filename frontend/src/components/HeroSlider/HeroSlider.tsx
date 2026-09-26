import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, FileCheck2, PlaneTakeoff, ExternalLink } from 'lucide-react';

interface HeroSliderProps {
  lang: Language;
  onExploreServices: () => void;
  onOpenQuickGuide: () => void;
}

const slides = [
  {
    id: 1,
    title: {
      fr: 'LA DOUANE TUNISIENNE',
      ar: 'الديوانة التونسية',
    },
    subtitle: {
      fr: 'Ensemble, on fait avancer la Tunisie',
      ar: 'معا، نمضي قدماً لبناء تونس',
    },
    tagline: {
      fr: 'Portail web officiel de la Direction Générale des Douanes',
      ar: 'البوابة الرسمية للإدارة العامة للديوانة التونسية',
    },
    cta: {
      fr: 'ACCÉDER AUX E-SERVICES',
      ar: 'الدخول للخدمات الإلكترونية',
    },
    badge: {
      fr: 'Portail Officiel',
      ar: 'البوابة الرسمية',
    },
    image: 'https://www.douane.gov.tn/wp-content/uploads/2018/05/Slider_home_DGR_QUEST_FR.jpg',
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: {
      fr: 'SYSTÈME DOUANIER DÉMATÉRIALISÉ SINDA II',
      ar: 'المنظومة المعلوماتية الحديثة "سندة 2"',
    },
    subtitle: {
      fr: 'Modernisation intégrale et guichet unique du commerce extérieur',
      ar: 'رقمنة شاملة لكافة الإجراءات وتسريع التخليص الجمركي للبضائع',
    },
    tagline: {
      fr: 'Une avancée technologique au service de l’économie nationale',
      ar: 'نقلة نوعية لتيسير المبادلات التجارية وحماية الاقتصاد الوطني',
    },
    cta: {
      fr: 'DÉCOUVRIR LE PROJET SINDA II',
      ar: 'اكتشف مشروع سندة II',
    },
    badge: {
      fr: 'Transition Numérique',
      ar: 'التحول الرقمي',
    },
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80',
    icon: FileCheck2,
  },
  {
    id: 3,
    title: {
      fr: 'TUNISIENS À L’ÉTRANGER (TRE) : NOUVEAUTÉS FCR & DAC',
      ar: 'التونسيون بالخارج: تسهيلات رخص الجولان وامتياز FCR',
    },
    subtitle: {
      fr: 'Éditez en ligne votre permis de circulation avant l’arrivée aux ports',
      ar: 'استخرج رخصة الجولان مسبقاً وتعرف على شروط امتياز FCR للسيارات',
    },
    tagline: {
      fr: 'Facilitations douanières et simplification des démarches estivales',
      ar: 'إجراءات استباقية ميسرة لاستقبال الجالية التونسية بالخارج',
    },
    cta: {
      fr: 'ESPACE VOYAGEURS & FCR',
      ar: 'فضاء المسافرين و FCR',
    },
    badge: {
      fr: 'Facilitations 2026',
      ar: 'تسهيلات 2026',
    },
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80',
    icon: PlaneTakeoff,
  },
];

export const HeroSlider: React.FC<HeroSliderProps> = ({
  lang,
  onExploreServices,
  onOpenQuickGuide,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative h-[480px] w-full overflow-hidden bg-[#001848] select-none">
      {/* Background Slides */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={s.image}
            alt="Hero background"
            className="w-full h-full object-cover object-center filter brightness-90"
            onError={(e) => {
              // Fallback to high quality customs/port image if remote server blocks CORS
              e.currentTarget.src = 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80';
            }}
          />

          {/* Institutional Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-[#003087]/95 via-[#003087]/75 to-transparent ${
              lang === 'ar' ? 'bg-gradient-to-l' : ''
            }`}
          />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
      ))}

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-[1200px] mx-auto h-full px-6 sm:px-8 flex flex-col justify-center">
        <div className="max-w-[720px] text-white space-y-4 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C8A951]/20 border border-[#C8A951] text-[#E5C778] text-[11px] font-bold uppercase tracking-wider rounded-sm backdrop-blur-xs">
            {React.createElement(slide.icon, { className: 'w-3.5 h-3.5' })}
            <span>{slide.badge[lang]}</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-[38px] font-bold leading-[1.2] uppercase tracking-wide text-white drop-shadow-md">
            {slide.title[lang]}
          </h1>

          {/* Subtitle / Slogan */}
          <p className="text-lg sm:text-xl font-bold text-[#E5C778] tracking-wide">
            {slide.subtitle[lang]}
          </p>

          <p className="text-sm sm:text-base italic text-white/90 font-light max-w-[620px] leading-relaxed">
            « {slide.tagline[lang]} »
          </p>

          {/* CTA Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3.5">
            <button
              onClick={onExploreServices}
              className="px-6 py-3 bg-white text-[#003087] hover:bg-[#F0F4FF] text-[13px] sm:text-[14px] font-bold uppercase tracking-wider rounded-[3px] shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>{slide.cta[lang]}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenQuickGuide}
              className="px-5 py-3 border border-white/60 bg-black/20 hover:bg-white/20 text-white text-[13px] font-bold uppercase tracking-wider rounded-[3px] backdrop-blur-sm transition-all cursor-pointer"
            >
              {lang === 'ar' ? 'فضاء الأفراد والمسافرين' : 'Guide des Particuliers'}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-[#003087] text-white flex items-center justify-center backdrop-blur-sm transition-colors border border-white/20 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-[#003087] text-white flex items-center justify-center backdrop-blur-sm transition-colors border border-white/20 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all rounded-full cursor-pointer ${
              idx === currentSlide
                ? 'w-8 h-2.5 bg-[#C8A951]'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

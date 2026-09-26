import React from 'react';
import { Language, NewsArticle } from '../../types';
import { newsArticles } from '../../data/mockData';
import { ChevronRight, Calendar, MessageSquare, ArrowRight } from 'lucide-react';

interface NewsSectionProps {
  lang: Language;
  onSelectArticle: (article: NewsArticle) => void;
  onViewAllNews: () => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  lang,
  onSelectArticle,
  onViewAllNews,
}) => {
  return (
    <section className="bg-[#F5F5F5] py-12 select-none border-b border-[#E0E0E0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        {/* Section Header as in douane.gov.tn */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-2">
          <div>
            <h2 className="text-[24px] font-bold leading-[32px] text-[#003087] uppercase tracking-wide">
              {lang === 'ar' ? (
                <>المستجدات <span>الديوانية</span></>
              ) : (
                <>INFOS & <span>ACTUALITÉS</span></>
              )}
            </h2>
            <div className="w-10 h-[3px] bg-[#C8A951] mt-2 mb-2" />
            <p className="text-[14px] italic text-[#666666]">
              {lang === 'ar'
                ? 'متابعة جميع الأخبار والبلاغات الصحفية للديوانة التونسية'
                : "Suivez toute l'actualité et les communiqués de la Douane Tunisienne au quotidien"}
            </p>
          </div>

          {/* Plus d'actualité button navigates internally to NewsPage */}
          <button
            onClick={onViewAllNews}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#003087] border border-[#003087] hover:bg-[#F0F4FF] text-xs font-bold uppercase rounded-[3px] transition-colors cursor-pointer group self-start sm:self-auto shadow-xs"
          >
            <span>{lang === 'ar' ? 'إقرأ المزيد' : "Plus d'Actualité"}</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Cards Grid matching 4 real articles on douane.gov.tn */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {newsArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white rounded-[4px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group cursor-pointer border border-[#E0E0E0] hover:border-[#0055B3]"
            >
              {/* Image thumbnail: 260x200 */}
              <div className="relative h-[180px] w-full overflow-hidden bg-slate-100">
                <img
                  src={article.imageUrl}
                  alt={article.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                {/* Date overlay tag */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-[#003087]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] backdrop-blur-xs flex items-center gap-1 shadow-xs">
                    <Calendar className="w-2.5 h-2.5 text-[#C8A951]" />
                    {lang === 'ar' ? article.dateAr : article.date}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category tag */}
                  <div className="mb-2">
                    <span className="text-[10px] font-bold text-[#003087] bg-[#E8F0FE] px-2 py-0.5 rounded-[2px] uppercase">
                      {article.category[lang]}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-[13px] font-bold text-[#333333] group-hover:text-[#003087] leading-[19px] line-clamp-3 mb-2 transition-colors">
                    {article.title[lang]}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-[12px] text-[#666666] leading-[18px] line-clamp-2 mb-3">
                    {article.excerpt[lang]}
                  </p>
                </div>

                {/* Footer with Comments and Link */}
                <div className="pt-2.5 border-t border-[#F0F0F0] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#888888] flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-[#C8A951]" />
                    <span>0 {lang === 'ar' ? 'تعليقات' : 'commentaires'}</span>
                  </span>

                  <span className="font-bold text-[#0055B3] group-hover:text-[#003087] flex items-center gap-0.5 text-[11px]">
                    <span>{lang === 'ar' ? 'التفاصيل' : 'Lire'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

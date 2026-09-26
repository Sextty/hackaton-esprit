import React, { useState } from 'react';
import { Language, NewsArticle } from '../../types';
import { newsArticles } from '../../data/mockData';
import { Newspaper, Calendar, MessageSquare, ChevronRight, Home, ArrowRight, Search } from 'lucide-react';

interface NewsPageProps {
  lang: Language;
  onNavigateHome: () => void;
  onSelectArticle: (article: NewsArticle) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({
  lang,
  onNavigateHome,
  onSelectArticle,
}) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = newsArticles.filter((a) => {
    const matchCat = filter === 'all' || a.category.fr.toLowerCase().includes(filter);
    const matchSearch =
      !search ||
      a.title.fr.toLowerCase().includes(search.toLowerCase()) ||
      a.title.ar.includes(search) ||
      a.excerpt.fr.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F5] select-none">
      {/* Title Header */}
      <div className="h-20 bg-[#003087] border-t border-[#002266] flex flex-col justify-center text-center text-white relative">
        <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">
          {lang === 'ar' ? 'فضاء الأخبار والبلاغات الرسمية' : 'Salle de Presse & Actualités Douanières'}
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
            {lang === 'ar' ? 'المستجدات' : 'Actualités'}
          </span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8">
        {/* Controls */}
        <div className="bg-white p-4 rounded border border-[#E0E0E0] mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={lang === 'ar' ? 'البحث في البلاغات والمستجدات...' : 'Rechercher un communiqué...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#CCCCCC] rounded text-xs focus:border-[#0055B3] focus:outline-none"
            />
          </div>

          <div className="text-xs text-[#666666]">
            <span>{filtered.length} {lang === 'ar' ? 'مقالات منشورة' : 'articles publiés'}</span>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white rounded border border-[#E0E0E0] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={article.imageUrl}
                  alt={article.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute top-2.5 left-2.5 bg-[#003087]/90 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5 text-[#C8A951]" />
                  {lang === 'ar' ? article.dateAr : article.date}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#003087] bg-[#E8F0FE] px-2 py-0.5 rounded uppercase mb-2 inline-block">
                    {article.category[lang]}
                  </span>
                  <h3 className="text-sm font-bold text-[#333333] group-hover:text-[#003087] leading-snug mb-2 line-clamp-3 transition-colors">
                    {article.title[lang]}
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt[lang]}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0F0F0] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#888888] flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-[#C8A951]" />
                    0
                  </span>
                  <span className="font-bold text-[#0055B3] group-hover:text-[#003087] flex items-center gap-1">
                    <span>{lang === 'ar' ? 'قراءة التفاصيل' : 'Lire l’article'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

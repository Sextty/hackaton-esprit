import React from 'react';
import { Language, NewsArticle } from '../../types';
import { X, Calendar, Clock, Share2, Printer, Shield } from 'lucide-react';

interface NewsDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  lang: Language;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ article, onClose, lang }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in select-none">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full border border-[#003087]/20 overflow-hidden my-8">
        {/* Header bar */}
        <div className="bg-[#003087] text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#C8A951]" />
            <span className="text-xs uppercase font-bold tracking-wider">
              {article.category[lang]}
            </span>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero image */}
        <div className="relative h-64 w-full">
          <img src={article.imageUrl} alt={article.title[lang]} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-3 text-xs mb-1.5 opacity-90">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#C8A951]" />
                {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-bold leading-snug">
              {article.title[lang]}
            </h2>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-4 text-sm text-[#333333] leading-relaxed">
          <p className="font-semibold text-base text-[#003087]">
            {article.excerpt[lang]}
          </p>
          <div className="w-12 h-1 bg-[#C8A951] rounded-full" />
          <p className="text-[#555555]">
            {article.content[lang]}
          </p>

          <div className="pt-6 border-t border-[#E0E0E0] flex items-center justify-between text-xs text-[#888888]">
            <span>Direction Générale des Douanes Tunisiennes</span>
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 border border-[#CCCCCC] rounded hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

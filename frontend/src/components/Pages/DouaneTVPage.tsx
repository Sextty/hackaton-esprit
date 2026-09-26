import React from 'react';
import { Language, VideoItem } from '../../types';
import { douaneTvVideos } from '../../data/mockData';
import { Tv, Play, ChevronRight, Home, Calendar, Youtube } from 'lucide-react';

interface DouaneTVPageProps {
  lang: Language;
  onNavigateHome: () => void;
  onPlayVideo: (video: VideoItem) => void;
}

export const DouaneTVPage: React.FC<DouaneTVPageProps> = ({
  lang,
  onNavigateHome,
  onPlayVideo,
}) => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] select-none">
      {/* Title Header */}
      <div className="h-20 bg-[#003087] border-t border-[#002266] flex flex-col justify-center text-center text-white relative">
        <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">
          {lang === 'ar' ? 'فضاء الديوانة TV — المرئيات والبرامج التوعوية' : 'Douane-TV — Médiathèque & Podcasts Vidéo'}
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
            {lang === 'ar' ? 'الديوانة TV' : 'Douane TV'}
          </span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8">
        <div className="bg-white p-6 rounded border border-[#E0E0E0] mb-8 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#003087]">
                {lang === 'ar' ? 'القناة الرسمية للديوانة التونسية' : 'Chaîne Vidéo Officielle de la Douane Tunisienne'}
              </h2>
              <p className="text-xs text-[#666666]">
                Retrouvez les reportages de terrain, les interventions de la garde douanière et les podcasts explicatifs sur vos démarches.
              </p>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {douaneTvVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onPlayVideo(video)}
              className="bg-white rounded border border-[#E0E0E0] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-95"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#888888] mb-1.5">
                    <Calendar className="w-3 h-3 text-[#C8A951]" />
                    <span>{video.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#333333] group-hover:text-[#003087] leading-snug line-clamp-2 transition-colors">
                    {video.title[lang]}
                  </h3>
                </div>

                <div className="pt-3 border-t border-[#F0F0F0] mt-3 flex items-center justify-between text-xs">
                  <span className="font-bold text-red-600 flex items-center gap-1">
                    <Play className="w-3 h-3 fill-current" />
                    <span>Visionner la vidéo</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Language, VideoItem } from '../../types';
import { douaneTvVideos } from '../../data/mockData';
import { Play, Tv, Calendar, MessageSquare, ChevronRight } from 'lucide-react';

interface DouaneTVSectionProps {
  lang: Language;
  onPlayVideo: (video: VideoItem) => void;
  onViewMoreVideos: () => void;
}

export const DouaneTVSection: React.FC<DouaneTVSectionProps> = ({
  lang,
  onPlayVideo,
  onViewMoreVideos,
}) => {
  const mainVideo = douaneTvVideos[0];
  const sideVideos = douaneTvVideos.slice(1);

  return (
    <section className="bg-white py-12 select-none border-b border-[#E0E0E0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        {/* Section Header as in douane.gov.tn */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-2">
          <div>
            <div className="flex items-center gap-2 text-red-600 mb-1">
              <Tv className="w-4 h-4 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                {lang === 'ar' ? 'البوابة المرئية' : 'Médiathèque Officielle'}
              </span>
            </div>
            <h2 className="text-[24px] font-bold leading-[32px] text-[#003087] uppercase tracking-wide">
              {lang === 'ar' ? (
                <>فضاء <span>الديوانة TV</span></>
              ) : (
                <>EXPLOREZ <span>NOTRE DOUANE-TV</span></>
              )}
            </h2>
            <div className="w-10 h-[3px] bg-[#C8A951] mt-2 mb-2" />
            <p className="text-[14px] italic text-[#666666]">
              {lang === 'ar'
                ? 'كافة أنشطة وتوضيحات ومضات الديوانة التونسية بالفيديو'
                : "Toute l'information de la Douane Tunisienne en vidéos"}
            </p>
          </div>

          {/* "Voir Plus de Videos" button navigates internally to DouaneTVPage */}
          <button
            onClick={onViewMoreVideos}
            className="mt-4 sm:mt-0 px-5 py-2.5 bg-white text-[#003087] border border-[#003087] hover:bg-[#F0F4FF] text-xs font-bold uppercase tracking-wider rounded-[3px] transition-colors flex items-center gap-2 group cursor-pointer self-start sm:self-auto shadow-xs"
          >
            <span>{lang === 'ar' ? 'مشاهدة المزيد من الفيديوهات' : 'Voir Plus de Videos'}</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 2-Columns Layout identical to douane.gov.tn explore-section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Large Video Frame (col-md-6) */}
          <div className="lg:col-span-6 flex flex-col">
            <div
              onClick={() => onPlayVideo(mainVideo)}
              className="relative aspect-video lg:h-full min-h-[280px] rounded-[4px] overflow-hidden bg-slate-900 group cursor-pointer shadow-md"
            >
              <img
                src={mainVideo.thumbnailUrl}
                alt={mainVideo.title[lang]}
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-red-600 group-hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-115 transition-all duration-200">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
              </div>

              {/* Bottom Title Bar */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] bg-red-600 text-white font-bold uppercase px-2 py-0.5 rounded-[2px] mb-2 inline-block">
                  DOUANE PODCAST
                </span>
                <h3 className="text-base font-bold leading-snug line-clamp-2">
                  {mainVideo.title[lang]}
                </h3>
                <span className="text-xs text-slate-300 mt-1 block">
                  {mainVideo.date}
                </span>
              </div>
            </div>
          </div>

          {/* Side Popular Videos List (col-md-6) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            {sideVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => onPlayVideo(video)}
                className="bg-[#F9FAFB] hover:bg-[#F0F4FF] border border-[#E5E5E5] hover:border-[#0055B3] rounded-[4px] p-3 flex gap-4 cursor-pointer transition-all duration-200 group"
              >
                {/* Small Thumbnail: 220x140 */}
                <div className="relative w-44 sm:w-48 aspect-video shrink-0 rounded overflow-hidden bg-slate-900 shadow-xs">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-95"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-md">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Text Col */}
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-[#333333] group-hover:text-[#003087] leading-snug line-clamp-3 transition-colors">
                    {video.title[lang]}
                  </h4>

                  <div className="flex items-center gap-3 text-[11px] text-[#888888] pt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C8A951]" />
                      {video.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      0
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

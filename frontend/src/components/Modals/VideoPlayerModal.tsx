import React from 'react';
import { Language, VideoItem } from '../../types';
import { X, Tv, ExternalLink } from 'lucide-react';

interface VideoPlayerModalProps {
  video: VideoItem | null;
  onClose: () => void;
  lang: Language;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose, lang }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in select-none">
      <div className="bg-slate-900 text-white rounded-lg shadow-2xl max-w-3xl w-full border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-[#003087] px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tv className="w-5 h-5 text-red-500" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {lang === 'ar' ? 'الديوانة TV — البوابة المرئية الرسمية' : 'Douane TV — Lecteur Vidéo Officiel'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real YouTube Embedded Iframe */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={video.embedUrl}
            title={video.title[lang]}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Footer info & YouTube external link */}
        <div className="p-4 bg-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-bold text-white text-sm mb-1">{video.title[lang]}</h4>
            <span className="text-slate-400">{video.date} • Direction Générale des Douanes Tunisiennes</span>
          </div>

          <div className="flex items-center gap-2">
            {video.liveUrl && (
              <a
                href={video.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium text-xs cursor-pointer"
            >
              {lang === 'ar' ? 'إغلاق' : 'Fermer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

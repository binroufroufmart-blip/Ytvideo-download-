import React, { useState } from 'react';
import { SupportedLanguage, VideoFormat, VideoMetadata } from '../types';
import { translations } from '../utils/translations';
import {
  Play,
  Download,
  Film,
  Music,
  Image,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

interface VideoResultCardProps {
  video: VideoMetadata;
  language: SupportedLanguage;
  onDownload: (format: VideoFormat | 'thumbnail') => void;
  activeFormatTab: 'video' | 'audio' | 'thumbnail';
  setActiveFormatTab: (tab: 'video' | 'audio' | 'thumbnail') => void;
}

export const VideoResultCard: React.FC<VideoResultCardProps> = ({
  video,
  language,
  onDownload,
  activeFormatTab,
  setActiveFormatTab,
}) => {
  const t = translations[language];
  const [showPreview, setShowPreview] = useState(false);
  const [thumbError, setThumbError] = useState(false);

  const videoFormats = video.formats.filter((f) => f.type === 'video');
  const audioFormats = video.formats.filter((f) => f.type === 'audio');

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 my-6">
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
        {/* Top Details Section */}
        <div className="p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row gap-6 items-start">
          {/* Thumbnail / Preview Column */}
          <div className="w-full md:w-80 lg:w-96 shrink-0">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group">
              {showPreview ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <>
                  <img
                    src={thumbError ? `https://img.youtube.com/vi/${video.id}/hqdefault.jpg` : video.thumbnailUrl}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    onError={() => setThumbError(true)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Subtle dark gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/85 text-[11px] font-mono text-white tracking-wider font-semibold">
                    {video.durationFormatted}
                  </div>

                  {/* Play preview overlay button */}
                  <button
                    onClick={() => setShowPreview(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group"
                    title={t.previewVideo}
                  >
                    <div className="w-13 h-13 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg shadow-red-600/40 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </button>
                </>
              )}
            </div>

            {/* Preview toggle below thumbnail */}
            <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors py-1"
              >
                {showPreview ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span>{t.closePreview}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-red-400" />
                    <span>{t.previewVideo}</span>
                  </>
                )}
              </button>

              <a
                href={video.originalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Video Metadata Column */}
          <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
            <div>
              {/* Clean unboxed metadata separator */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-2">
                <span className="text-red-400 font-semibold">{t.formatsBadge}</span>
                <span aria-hidden="true">·</span>
                <span>{video.uploadDate}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{video.viewsFormatted}</span>
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug line-clamp-2 mb-3">
                {video.title}
              </h2>

              {/* Channel / Author */}
              <div className="flex items-center gap-2.5 text-sm text-slate-300 mb-4">
                <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-red-400">
                  {video.author.charAt(0)}
                </div>
                <span className="font-medium text-slate-200 truncate">{video.author}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              </div>
            </div>

            {/* Quick action bar */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 mt-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-300">
                  {language === 'ur'
                    ? '1080p 60fps ya MP3 320kbps foran chunein'
                    : 'Fast conversion to 1080p 60fps & 320kbps MP3 ready'}
                </span>
              </div>

              <button
                onClick={() => {
                  const rec = video.formats.find((f) => f.isRecommended && f.type === 'video');
                  if (rec) onDownload(rec);
                }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md shadow-red-600/30 transition-all ml-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.recommended} (1080p)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Formats Tabs Header */}
        <div className="px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-slate-950/50">
          <div className="flex items-center gap-2 sm:gap-4 py-3 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveFormatTab('video')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                activeFormatTab === 'video'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>{t.videoFormats}</span>
            </button>

            <button
              onClick={() => setActiveFormatTab('audio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                activeFormatTab === 'audio'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Music className="w-4 h-4" />
              <span>{t.audioFormats}</span>
            </button>

            <button
              onClick={() => setActiveFormatTab('thumbnail')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                activeFormatTab === 'thumbnail'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>{t.thumbnails}</span>
            </button>
          </div>
        </div>

        {/* Format Selection Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {activeFormatTab === 'video' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold">
                    <th className="pb-3 pl-2">{t.resolution}</th>
                    <th className="pb-3 text-center">Format</th>
                    <th className="pb-3 text-right">{t.fileSize}</th>
                    <th className="pb-3 text-right pr-2">{t.action}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {videoFormats.map((format) => (
                    <tr
                      key={format.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-3.5 pl-2">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{format.label}</span>
                          {format.isRecommended && (
                            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                              {t.recommended}
                            </span>
                          )}
                        </div>
                        {format.resolution && (
                          <div className="text-[11px] text-slate-400 font-mono">
                            {format.resolution} · {format.fps} FPS
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 text-center">
                        <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {format.container}
                        </span>
                      </td>
                      <td className="py-3.5 text-right font-mono tabular-nums text-slate-300">
                        {format.approxSize}
                      </td>
                      <td className="py-3.5 text-right pr-2">
                        <button
                          onClick={() => onDownload(format)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-red-600 group-hover:bg-red-600 transition-colors shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{t.downloadNow}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeFormatTab === 'audio' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold">
                    <th className="pb-3 pl-2">{t.resolution}</th>
                    <th className="pb-3 text-center">Format</th>
                    <th className="pb-3 text-right">{t.fileSize}</th>
                    <th className="pb-3 text-right pr-2">{t.action}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {audioFormats.map((format) => (
                    <tr
                      key={format.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-3.5 pl-2">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{format.label}</span>
                          {format.isRecommended && (
                            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                              {t.bestAudio}
                            </span>
                          )}
                        </div>
                        {format.bitrate && (
                          <div className="text-[11px] text-slate-400 font-mono">
                            Bitrate: {format.bitrate}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 text-center">
                        <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {format.container}
                        </span>
                      </td>
                      <td className="py-3.5 text-right font-mono tabular-nums text-slate-300">
                        {format.approxSize}
                      </td>
                      <td className="py-3.5 text-right pr-2">
                        <button
                          onClick={() => onDownload(format)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-red-600 group-hover:bg-red-600 transition-colors shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{t.downloadNow}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeFormatTab === 'thumbnail' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="aspect-video rounded-xl overflow-hidden mb-3 bg-slate-900 border border-slate-800">
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      alt={video.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-1">Max Resolution (1920x1080)</h4>
                  <p className="text-xs text-slate-400">Crisp high-definition YouTube video banner image</p>
                </div>
                <button
                  onClick={() => onDownload('thumbnail')}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md shadow-red-600/20 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download MaxRes JPG</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="aspect-video rounded-xl overflow-hidden mb-3 bg-slate-900 border border-slate-800">
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-1">Standard HD (480x360)</h4>
                  <p className="text-xs text-slate-400">Optimized lightweight thumbnail for blog or post</p>
                </div>
                <button
                  onClick={() => onDownload('thumbnail')}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Standard JPG</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

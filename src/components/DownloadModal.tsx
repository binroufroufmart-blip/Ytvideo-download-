import React from 'react';
import { SupportedLanguage, VideoFormat, VideoMetadata } from '../types';
import { translations } from '../utils/translations';
import { CheckCircle2, Download, X, HardDrive } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoMetadata | null;
  format: VideoFormat | 'thumbnail' | null;
  progress: number;
  speed: string;
  eta: string;
  isComplete: boolean;
  language: SupportedLanguage;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  video,
  format,
  progress,
  speed,
  eta,
  isComplete,
  language,
}) => {
  if (!isOpen || !video || !format) return null;

  const t = translations[language];
  const formatLabel =
    format === 'thumbnail' ? 'High-Res Thumbnail (JPG)' : `${format.label} (${format.container.toUpperCase()})`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
              isComplete
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
            }`}
          >
            {isComplete ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            ) : (
              <Download className="w-6 h-6 text-red-400" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isComplete ? t.completed : t.processing}
            </h3>
            <p className="text-xs text-slate-400">{formatLabel}</p>
          </div>
        </div>

        {/* Video Info Preview */}
        <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 mb-5 flex items-center gap-3">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            referrerPolicy="no-referrer"
            className="w-14 h-10 object-cover rounded-lg shrink-0 border border-slate-800"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-white truncate">{video.title}</h4>
            <p className="text-[11px] text-slate-400 truncate">{video.author}</p>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-slate-400">
              {isComplete ? 'Transfer Completed' : 'Converting & Streaming'}
            </span>
            <span className="font-mono tabular-nums font-bold text-white text-sm">
              {progress}%
            </span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-150 ${
                isComplete
                  ? 'bg-emerald-500 shadow-md shadow-emerald-500/40'
                  : 'bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 shadow-md shadow-red-500/40'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stats Row (Speed & ETA) */}
        {!isComplete ? (
          <div className="grid grid-cols-2 gap-2 text-xs mb-6 font-mono tabular-nums text-slate-400">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-[10px] uppercase text-slate-500 block mb-0.5">{t.speed}</span>
              <span className="font-semibold text-slate-200">{speed}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-[10px] uppercase text-slate-500 block mb-0.5">{t.eta}</span>
              <span className="font-semibold text-slate-200">{eta}</span>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300 flex items-center gap-2 mb-6">
            <HardDrive className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.downloadStarted}</span>
          </div>
        )}

        {/* Bottom Action Button */}
        {isComplete && (
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

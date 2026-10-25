import React from 'react';
import { DownloadHistoryItem, SupportedLanguage } from '../types';
import { translations } from '../utils/translations';
import { X, Trash2, Download, Copy, Check, Clock } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: DownloadHistoryItem[];
  onClearHistory: () => void;
  language: SupportedLanguage;
  onSelectVideo: (videoId: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onClearHistory,
  language,
  onSelectVideo,
}) => {
  if (!isOpen) return null;

  const t = translations[language];
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (id: string, videoId: string) => {
    navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${videoId}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-500" />
              <h3 className="font-bold text-white text-base">{t.historyTitle}</h3>
              <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={onClearHistory}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-850 transition-colors"
                  title={t.clearHistory}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-850 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <Clock className="w-12 h-12 text-slate-700 mb-3" />
                <p className="text-sm font-medium text-slate-300 mb-1">{t.noHistory}</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors group flex gap-3 items-center"
                >
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-12 object-cover rounded-xl shrink-0 border border-slate-800 bg-slate-900"
                  />
                  <div className="min-w-0 flex-1">
                    <h4
                      onClick={() => onSelectVideo(item.videoId)}
                      className="text-xs font-semibold text-white truncate cursor-pointer hover:text-red-400 transition-colors"
                    >
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1 font-mono">
                      <span className="uppercase text-red-400 font-semibold">{item.container}</span>
                      <span>·</span>
                      <span>{item.fileSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleCopy(item.id, item.videoId)}
                      className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                      title="Copy YouTube Link"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => onSelectVideo(item.videoId)}
                      className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                      title="Download again"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

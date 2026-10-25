import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../utils/translations';
import { extractYouTubeId, fetchVideoDetails } from '../utils/youtube';
import { Layers, Play, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface BatchDownloaderProps {
  language: SupportedLanguage;
  onSelectVideo: (videoId: string) => void;
}

interface BatchItem {
  url: string;
  id: string | null;
  title?: string;
  author?: string;
  thumbnailUrl?: string;
  status: 'pending' | 'loading' | 'success' | 'error';
}

export const BatchDownloader: React.FC<BatchDownloaderProps> = ({
  language,
  onSelectVideo,
}) => {
  const t = translations[language];
  const [text, setText] = useState('');
  const [items, setItems] = useState<BatchItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessBatch = async () => {
    const lines = text
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) return;

    const parsed: BatchItem[] = lines.map((line) => {
      const id = extractYouTubeId(line);
      return {
        url: line,
        id,
        status: id ? 'pending' : 'error',
      };
    });

    setItems(parsed);
    setIsProcessing(true);

    // Process each item
    for (let i = 0; i < parsed.length; i++) {
      const item = parsed[i];
      if (!item.id) continue;

      setItems((prev) =>
        prev.map((it, idx) => (idx === i ? { ...it, status: 'loading' } : it))
      );

      try {
        const details = await fetchVideoDetails(item.id);
        setItems((prev) =>
          prev.map((it, idx) =>
            idx === i
              ? {
                  ...it,
                  status: 'success',
                  title: details.title,
                  author: details.author,
                  thumbnailUrl: details.thumbnailUrl,
                }
              : it
          )
        );
      } catch {
        setItems((prev) =>
          prev.map((it, idx) => (idx === i ? { ...it, status: 'error' } : it))
        );
      }
    }

    setIsProcessing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{t.batchTitle}</h3>
            <p className="text-xs text-slate-400">
              {language === 'ur'
                ? 'Kayi YouTube links aik saath paste karein aur foran process karein'
                : 'Paste multiple YouTube URLs to batch parse and download them together'}
            </p>
          </div>
        </div>

        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.batchPlaceholder}
          className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500/80 font-mono"
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleProcessBatch}
            disabled={isProcessing || !text.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-red-600/30 transition-all"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Batch...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>{t.batchProcessBtn}</span>
              </>
            )}
          </button>
        </div>

        {/* Batch Results list */}
        {items.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Batch Queue ({items.length} items)
            </h4>

            {items.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {item.thumbnailUrl ? (
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title || 'Video'}
                      referrerPolicy="no-referrer"
                      className="w-14 h-10 object-cover rounded-lg shrink-0 border border-slate-800"
                    />
                  ) : (
                    <div className="w-14 h-10 bg-slate-900 rounded-lg flex items-center justify-center shrink-0 border border-slate-800 text-slate-500 text-xs">
                      #{idx + 1}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {item.title || item.url}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {item.author || (item.id ? `ID: ${item.id}` : 'Invalid link')}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {item.status === 'loading' && (
                    <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                  )}
                  {item.status === 'error' && (
                    <div className="flex items-center gap-1 text-xs text-rose-400">
                      <AlertCircle className="w-4 h-4" />
                      <span>Invalid</span>
                    </div>
                  )}
                  {item.status === 'success' && item.id && (
                    <button
                      onClick={() => onSelectVideo(item.id!)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Select</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

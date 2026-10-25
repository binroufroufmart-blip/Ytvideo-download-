import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../utils/translations';
import { SAMPLE_VIDEOS } from '../utils/youtube';
import { Search, Clipboard, X, ArrowRight, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface HeroSearchProps {
  language: SupportedLanguage;
  urlInput: string;
  setUrlInput: (val: string) => void;
  onAnalyze: (url?: string) => void;
  isLoading: boolean;
  errorMessage: string | null;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  language,
  urlInput,
  setUrlInput,
  onAnalyze,
  isLoading,
  errorMessage,
}) => {
  const t = translations[language];
  const [pasteFeedback, setPasteFeedback] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrlInput(text.trim());
        setPasteFeedback(true);
        setTimeout(() => setPasteFeedback(false), 2000);
        onAnalyze(text.trim());
      }
    } catch {
      // If clipboard permission denied or not supported, focus input
      const inputEl = document.getElementById('yt-url-input');
      inputEl?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      onAnalyze();
    }
  };

  return (
    <div className="w-full pt-10 pb-8 sm:pt-14 sm:pb-12 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Subtle kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-4 tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.formatsBadge} 4K · 1080p · 60FPS · MP3 320kbps</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 text-balance">
          {language === 'ur' ? (
            <>
              YouTube Video & Audio <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-amber-500">Fast Download</span> Karein
            </>
          ) : (
            <>
              Download YouTube Videos & Audio in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-amber-500">Studio Quality</span>
            </>
          )}
        </h1>

        {/* Tagline */}
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8 font-normal">
          {t.tagline}
        </p>

        {/* Main Search / Link Input Box */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl shadow-red-950/20 focus-within:border-red-500/80 focus-within:ring-2 focus-within:ring-red-500/20 transition-all duration-200">
            {/* Input icon */}
            <div className="hidden sm:flex items-center pl-3 text-slate-500 pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </div>

            {/* Input Element */}
            <input
              id="yt-url-input"
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.searchPlaceholder}
              autoComplete="off"
              spellCheck="false"
              className="w-full bg-transparent px-3 py-3 sm:py-3.5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
            />

            {/* Inline Action buttons inside the bar */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end shrink-0 pr-1">
              {/* Clear button if text exists */}
              {urlInput && (
                <button
                  type="button"
                  onClick={() => setUrlInput('')}
                  aria-label="Clear link"
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Paste button */}
              <button
                type="button"
                onClick={handlePaste}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700/60 transition-colors whitespace-nowrap"
                title="Paste link from clipboard"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>{pasteFeedback ? t.pasted : t.pasteBtn}</span>
              </button>

              {/* Main Submit Button */}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => onAnalyze()}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-red-600/30 transition-all whitespace-nowrap min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.analyzing}</span>
                  </>
                ) : (
                  <>
                    <span>{t.downloadBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm text-rose-400 bg-rose-950/40 border border-rose-800/50 rounded-xl px-4 py-2.5 max-w-xl mx-auto">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Quick Sample Links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">{t.quickSamples}</span>
          {SAMPLE_VIDEOS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => {
                setUrlInput(sample.url);
                onAnalyze(sample.url);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800/80 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-colors"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../utils/translations';
import { Youtube, History, Languages } from 'lucide-react';

interface HeaderProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  historyCount: number;
  onOpenHistory: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  activeSection,
  onNavigate,
  historyCount,
  onOpenHistory,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('downloader')}
          className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-lg shadow-red-600/20 group-hover:scale-105 transition-transform">
            <Youtube className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">
            Vid<span className="text-red-500">Flow</span>
            <span className="ml-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Pro</span>
          </span>
        </button>

        {/* Zone 2: Nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigate('downloader')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              activeSection === 'downloader'
                ? 'border-red-500 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t.navDownloader}
          </button>
          <button
            onClick={() => onNavigate('audio')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              activeSection === 'audio'
                ? 'border-red-500 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t.navAudio}
          </button>
          <button
            onClick={() => onNavigate('batch')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              activeSection === 'batch'
                ? 'border-red-500 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t.batchTitle}
          </button>
          <button
            onClick={() => onNavigate('faq')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              activeSection === 'faq'
                ? 'border-red-500 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t.navFaq}
          </button>
        </nav>

        {/* Zone 3: Actions (Language toggle + History button) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(language === 'en' ? 'ur' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors"
            title="Switch Language / زبان تبدیل کریں"
          >
            <Languages className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold">{language === 'en' ? 'اردو' : 'EN'}</span>
          </button>

          {/* History CTA */}
          <button
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors"
            title={t.historyTitle}
          >
            <History className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">{t.navHistory}</span>
            {historyCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

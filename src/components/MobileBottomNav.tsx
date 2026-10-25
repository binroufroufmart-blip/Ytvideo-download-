import React from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../utils/translations';
import { Download, Music, Layers, History } from 'lucide-react';

interface MobileBottomNavProps {
  language: SupportedLanguage;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  language,
  activeSection,
  onNavigate,
  onOpenHistory,
  historyCount,
}) => {
  const t = translations[language];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-slate-950/90 backdrop-blur-md border-t border-slate-800">
      <div className="grid grid-cols-4 items-center h-16 max-w-lg mx-auto px-2">
        {/* Tab 1: Downloader */}
        <button
          onClick={() => onNavigate('downloader')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeSection === 'downloader' ? 'text-red-500 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Download className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight truncate max-w-[64px]">
            {t.navDownloader}
          </span>
        </button>

        {/* Tab 2: Audio */}
        <button
          onClick={() => onNavigate('audio')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeSection === 'audio' ? 'text-red-500 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Music className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight truncate max-w-[64px]">
            {t.navAudio}
          </span>
        </button>

        {/* Tab 3: Batch */}
        <button
          onClick={() => onNavigate('batch')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeSection === 'batch' ? 'text-red-500 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight truncate max-w-[64px]">
            Batch
          </span>
        </button>

        {/* Tab 4: History */}
        <button
          onClick={onOpenHistory}
          className="relative flex flex-col items-center justify-center min-h-[44px] py-1 text-slate-400 hover:text-white transition-colors"
        >
          <div className="relative">
            <History className="w-5 h-5 mb-1" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full">
                {historyCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight truncate max-w-[64px]">
            {t.navHistory}
          </span>
        </button>
      </div>
    </nav>
  );
};

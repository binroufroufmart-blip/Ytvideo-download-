import React from 'react';
import { Youtube } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface FooterProps {
  language: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-10 px-4 sm:px-6 mt-16 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white">
            <Youtube className="w-4 h-4" />
          </div>
          <span className="font-bold text-white text-sm">VidFlow Pro</span>
          <span className="text-slate-600">·</span>
          <span>© 2026 VidFlow Inc.</span>
        </div>

        <div className="text-center md:text-right max-w-md text-slate-400">
          {language === 'ur'
            ? 'Sirf zaati aur taleemi maqasid ke liye istemal karein. Tamam copyright huqooq unke mutaliqa YouTube creators ke paas hain.'
            : 'For personal and educational backup use only. Respect copyright guidelines and original creators.'}
        </div>
      </div>
    </footer>
  );
};

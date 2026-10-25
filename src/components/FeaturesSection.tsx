import React from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../utils/translations';
import { Zap, ShieldCheck, Smartphone, Music2 } from 'lucide-react';

interface FeaturesSectionProps {
  language: SupportedLanguage;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ language }) => {
  const t = translations[language];

  const features =
    language === 'ur'
      ? [
          {
            icon: Zap,
            num: '01',
            title: 'Tez Tareen 4K & 1080p Stream Processing',
            description:
              'Baghair kisi intezar ke videos ko aala tareen 60fps frame rate aur 4K Ultra HD quality me hasil karein.',
          },
          {
            icon: Music2,
            num: '02',
            title: 'Studio Quality 320kbps MP3 Audio',
            description:
              'YouTube videos ko direct high-fidelity crystal clear MP3 aur M4A format me convert karein.',
          },
          {
            icon: Smartphone,
            num: '03',
            title: 'Mobile Aur Tablet Ke Liye Behtareen Design',
            description:
              'Android aur iPhone par aik haath se aasani se use hone wala modern aur teztar touch interface.',
          },
          {
            icon: ShieldCheck,
            num: '04',
            title: 'Bilkul Mehfooz Aur Baghair Kisi Registration Ke',
            description:
              'Kisi login ya account ki zaroorat nahi. Direct browser se safe aur foran download shuru hota hai.',
          },
        ]
      : [
          {
            icon: Zap,
            num: '01',
            title: 'Lightning 4K & 1080p 60FPS Video',
            description:
              'Extract crisp Ultra HD streams with high dynamic range and smooth 60fps motion without compression loss.',
          },
          {
            icon: Music2,
            num: '02',
            title: 'Studio Grade 320kbps Audio Extraction',
            description:
              'Convert any music track, podcast, or lecture to pristine 320kbps MP3 and uncompressed WAV sound.',
          },
          {
            icon: Smartphone,
            num: '03',
            title: 'Ergonomic Mobile Touch Experience',
            description:
              'Optimized thumb ergonomics, single-tap clipboard paste, and fluid touch responsiveness on iOS and Android.',
          },
          {
            icon: ShieldCheck,
            num: '04',
            title: '100% Secure, Private & Ad-Free Flow',
            description:
              'No account required, no malware, and no hidden popups. Clean direct browser streaming to your storage.',
          },
        ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {t.featuresTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
          {language === 'ur'
            ? 'Professional aur asaan tareeqe se YouTube media download karne ke jadeed features'
            : 'Designed from the ground up for speed, quality fidelity, and responsive simplicity'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-850/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 text-red-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-500">
                    {feat.num}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../utils/translations';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  language: SupportedLanguage;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const t = translations[language];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs =
    language === 'ur'
      ? [
          {
            q: 'Mobile (Android ya iPhone) par video kaise download karein?',
            a: 'YouTube app ya browser se video ka link copy karein, yahan search box me "Paste" dabayein, phir apni pasandeeda quality (maslan 1080p ya MP3) ke samne "Download" button dabayein. File seedhi aapke mobile ke Downloads folder me save ho jayegi.',
          },
          {
            q: 'Kya ye YouTube Shorts ko bhi support karta hai?',
            a: 'Ji haan! Tamam YouTube Shorts links mukammal vertical 1080x1920 HD resolution aur audio me download kiye ja sakte hain.',
          },
          {
            q: 'Kya iske liye koi fees ya account banana zaroori hai?',
            a: 'Nahi! VidFlow Pro 100% muft hai, kisi registration ya login ki zaroorat nahi hai aur koi hadd (limit) nahi hai.',
          },
          {
            q: 'Kaun kaun se formats dastyab hain?',
            a: 'Aap 4K (2160p), 1440p, 1080p 60fps, 720p, 480p, aur aala tareen 320kbps MP3 audio aur WAV me download kar sakte hain.',
          },
          {
            q: 'Downloaded files kahan save hoti hain?',
            a: 'Aapke browser ki default download directory me (Android par "Files/Downloads" aur iPhone Safari par "Files app -> Downloads" me).',
          },
        ]
      : [
          {
            q: 'How do I download YouTube videos on mobile (Android / iOS)?',
            a: 'Copy the video link from the YouTube app or browser, tap the "Paste" button in the search bar above, and click "Download" on your preferred resolution (1080p, 4K, or MP3). The file will be saved directly into your device downloads folder.',
          },
          {
            q: 'Does it support YouTube Shorts and clips?',
            a: 'Yes! All YouTube Shorts links are automatically recognized and converted in full vertical high-definition (1080x1920) MP4 format with synchronized audio.',
          },
          {
            q: 'Is VidFlow Pro free to use?',
            a: 'Yes, VidFlow Pro is completely free with no subscription, no credit card required, and no hidden download throttles.',
          },
          {
            q: 'Which video and audio resolutions are supported?',
            a: 'We support resolutions up to 4K Ultra HD (3840x2160), 1080p 60FPS Full HD, 720p HD, and studio-grade 320kbps MP3 and lossless audio formats.',
          },
          {
            q: 'Where are downloaded files saved on my device?',
            a: 'Downloaded files are saved in your default browser download folder (on Android: Files/Downloads; on iPhone: Files app under the Downloads folder).',
          },
        ];

  return (
    <section id="faq-section" className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs text-red-400 font-semibold uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Support & Guide</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {t.faqTitle}
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-base text-white hover:text-red-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-red-500' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

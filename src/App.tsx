import { useState, useEffect } from 'react';
import {
  DownloadHistoryItem,
  SupportedLanguage,
  VideoFormat,
  VideoMetadata,
} from './types';
import { extractYouTubeId, fetchVideoDetails, triggerFileDownload, SAMPLE_VIDEOS } from './utils/youtube';
import { translations } from './utils/translations';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { VideoResultCard } from './components/VideoResultCard';
import { DownloadModal } from './components/DownloadModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { BatchDownloader } from './components/BatchDownloader';
import { FeaturesSection } from './components/FeaturesSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';

export default function App() {
  const [language, setLanguage] = useState<SupportedLanguage>('ur');
  const [urlInput, setUrlInput] = useState('');
  const [currentVideo, setCurrentVideo] = useState<VideoMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeFormatTab, setActiveFormatTab] = useState<'video' | 'audio' | 'thumbnail'>('video');
  const [activeSection, setActiveSection] = useState<string>('downloader');

  // History state with localStorage persistence
  const [historyItems, setHistoryItems] = useState<DownloadHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('vidflow_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Download simulation / progress state
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState('18.4 MB/s');
  const [downloadEta, setDownloadEta] = useState('2s');
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [activeFormat, setActiveFormat] = useState<VideoFormat | 'thumbnail' | null>(null);

  // Load an initial showcase video on first load so interface is rich and functional
  useEffect(() => {
    const initSample = async () => {
      try {
        const sample = SAMPLE_VIDEOS[0];
        const details = await fetchVideoDetails(sample.id);
        setCurrentVideo(details);
      } catch {
        // Fallback silently
      }
    };
    initSample();
  }, []);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vidflow_history', JSON.stringify(historyItems));
    } catch {
      // Ignore quota errors
    }
  }, [historyItems]);

  const handleAnalyze = async (overrideUrl?: string) => {
    const rawUrl = overrideUrl !== undefined ? overrideUrl : urlInput;
    setErrorMessage(null);

    const videoId = extractYouTubeId(rawUrl);
    if (!videoId) {
      setErrorMessage(translations[language].errorInvalidUrl);
      return;
    }

    setIsLoading(true);
    try {
      const details = await fetchVideoDetails(videoId);
      setCurrentVideo(details);
      setActiveSection('downloader');
      // Scroll to video card smoothly
      window.scrollTo({ top: 320, behavior: 'smooth' });
    } catch {
      setErrorMessage(translations[language].errorInvalidUrl);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (format: VideoFormat | 'thumbnail') => {
    if (!currentVideo) return;

    setActiveFormat(format);
    setIsDownloading(true);
    setDownloadProgress(5);
    setDownloadComplete(false);
    setDownloadSpeed('16.2 MB/s');
    setDownloadEta('3s');

    try {
      await triggerFileDownload(currentVideo, format, (progress, speed, eta) => {
        setDownloadProgress(progress);
        setDownloadSpeed(speed);
        setDownloadEta(eta);
      });

      setDownloadComplete(true);

      // Add to history
      const formatLabel =
        format === 'thumbnail' ? 'Thumbnail Cover (JPG)' : format.label;
      const container = format === 'thumbnail' ? 'jpg' : format.container;
      const fileSize = format === 'thumbnail' ? '1.2 MB' : format.approxSize;

      const newHistoryItem: DownloadHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        videoId: currentVideo.id,
        title: currentVideo.title,
        thumbnailUrl: currentVideo.thumbnailUrl,
        formatLabel,
        container,
        fileSize,
        timestamp: Date.now(),
      };

      setHistoryItems((prev) => [newHistoryItem, ...prev.slice(0, 19)]);
    } catch {
      setIsDownloading(false);
    }
  };

  const handleClearHistory = () => {
    setHistoryItems([]);
  };

  const handleSelectFromHistory = async (videoId: string) => {
    setIsHistoryOpen(false);
    setIsLoading(true);
    try {
      const details = await fetchVideoDetails(videoId);
      setCurrentVideo(details);
      setUrlInput(details.originalUrl);
      setActiveSection('downloader');
      window.scrollTo({ top: 320, behavior: 'smooth' });
    } catch {
      // Ignore
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === 'audio') {
      setActiveFormatTab('audio');
      // Scroll to result card format tabs if available
      window.scrollTo({ top: 320, behavior: 'smooth' });
    } else if (section === 'downloader') {
      setActiveFormatTab('video');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'batch') {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    } else if (section === 'faq') {
      const faqEl = document.getElementById('faq-section');
      faqEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-20 md:pb-0">
      {/* Top Bar adhering to Top Bar Contract */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        historyCount={historyItems.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section & URL Input Box */}
        <HeroSearch
          language={language}
          urlInput={urlInput}
          setUrlInput={setUrlInput}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />

        {/* Video Result Card & Format Table */}
        {currentVideo && (
          <VideoResultCard
            video={currentVideo}
            language={language}
            onDownload={handleDownload}
            activeFormatTab={activeFormatTab}
            setActiveFormatTab={setActiveFormatTab}
          />
        )}

        {/* Batch Queue Downloader */}
        <BatchDownloader
          language={language}
          onSelectVideo={handleSelectFromHistory}
        />

        {/* Features & Speed Matrix */}
        <FeaturesSection language={language} />

        {/* FAQ Section */}
        <FaqSection language={language} />
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Download Progress & File Generation Modal */}
      <DownloadModal
        isOpen={isDownloading}
        onClose={() => setIsDownloading(false)}
        video={currentVideo}
        format={activeFormat}
        progress={downloadProgress}
        speed={downloadSpeed}
        eta={downloadEta}
        isComplete={downloadComplete}
        language={language}
      />

      {/* Download History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={historyItems}
        onClearHistory={handleClearHistory}
        language={language}
        onSelectVideo={handleSelectFromHistory}
      />

      {/* Mobile-first Bottom Navigation Tab Bar (375px-430px) */}
      <MobileBottomNav
        language={language}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={historyItems.length}
      />
    </div>
  );
}

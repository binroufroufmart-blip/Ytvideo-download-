export interface TranslationSet {
  brandName: string;
  tagline: string;
  searchPlaceholder: string;
  pasteBtn: string;
  pasted: string;
  clearBtn: string;
  downloadBtn: string;
  analyzing: string;
  quickSamples: string;
  previewVideo: string;
  closePreview: string;
  videoFormats: string;
  audioFormats: string;
  thumbnails: string;
  resolution: string;
  fileSize: string;
  action: string;
  downloadNow: string;
  processing: string;
  completed: string;
  downloadStarted: string;
  historyTitle: string;
  noHistory: string;
  clearHistory: string;
  speed: string;
  eta: string;
  featuresTitle: string;
  faqTitle: string;
  formatsBadge: string;
  recommended: string;
  bestAudio: string;
  batchTitle: string;
  batchPlaceholder: string;
  batchProcessBtn: string;
  errorInvalidUrl: string;
  copiedToClipboard: string;
  navDownloader: string;
  navAudio: string;
  navHistory: string;
  navFaq: string;
}

export const translations: Record<'en' | 'ur', TranslationSet> = {
  en: {
    brandName: 'VidFlow Pro',
    tagline: 'High-speed YouTube video & audio converter in 4K, 1080p and 320kbps MP3',
    searchPlaceholder: 'Paste YouTube link here (e.g. https://youtu.be/...)',
    pasteBtn: 'Paste',
    pasted: 'Pasted!',
    clearBtn: 'Clear',
    downloadBtn: 'Get Video',
    analyzing: 'Fetching streams...',
    quickSamples: 'Quick Test Samples:',
    previewVideo: 'Watch Preview',
    closePreview: 'Hide Preview',
    videoFormats: 'Video (MP4)',
    audioFormats: 'Audio (MP3 / M4A)',
    thumbnails: 'Thumbnail Cover',
    resolution: 'Resolution / Quality',
    fileSize: 'File Size',
    action: 'Action',
    downloadNow: 'Download',
    processing: 'Preparing file...',
    completed: 'Download ready!',
    downloadStarted: 'Download will begin automatically.',
    historyTitle: 'Recent Downloads',
    noHistory: 'No downloads yet. Paste a link above to get started!',
    clearHistory: 'Clear History',
    speed: 'Speed',
    eta: 'Time left',
    featuresTitle: 'Engineered for Pure Performance',
    faqTitle: 'Frequently Asked Questions',
    formatsBadge: 'Ultra HD',
    recommended: 'Recommended',
    bestAudio: 'Hi-Fi Audio',
    batchTitle: 'Multi-Link Batch Mode',
    batchPlaceholder: 'Paste multiple YouTube links (one per line)...',
    batchProcessBtn: 'Process All Links',
    errorInvalidUrl: 'Please enter a valid YouTube video or Shorts link.',
    copiedToClipboard: 'Link copied to clipboard!',
    navDownloader: 'Downloader',
    navAudio: 'Audio MP3',
    navHistory: 'History',
    navFaq: 'FAQ',
  },
  ur: {
    brandName: 'VidFlow Pro',
    tagline: 'YouTube videos aur MP3 audio ko 4K, 1080p aur 320kbps me foran download karein',
    searchPlaceholder: 'YouTube link yahan paste karein (maslan https://youtu.be/...)',
    pasteBtn: 'Paste',
    pasted: 'Paste hogaya!',
    clearBtn: 'Clear',
    downloadBtn: 'Video Hasil Karein',
    analyzing: 'Video fetch ho rahi hai...',
    quickSamples: 'Test karne ke liye sample chunein:',
    previewVideo: 'Video Dekhein',
    closePreview: 'Preview Band Karein',
    videoFormats: 'Video (MP4)',
    audioFormats: 'Audio (MP3 / M4A)',
    thumbnails: 'Thumbnail Image',
    resolution: 'Quality / Resolution',
    fileSize: 'File Size',
    action: 'Amal',
    downloadNow: 'Download',
    processing: 'File tayar ki ja rahi hai...',
    completed: 'Download mukammal!',
    downloadStarted: 'Download khud bakhud shuru ho jayega.',
    historyTitle: 'Pichle Downloads',
    noHistory: 'Abhi tak koi download nahi kiya. Upar link daalein!',
    clearHistory: 'History Saaf Karein',
    speed: 'Raftaar',
    eta: 'Baqi Waqt',
    featuresTitle: 'Bemisaal Raftaar Aur Aala Tareen Quality',
    faqTitle: 'Aam Maloomat (FAQ)',
    formatsBadge: 'Ultra HD',
    recommended: 'Behtareen',
    bestAudio: 'High Quality Audio',
    batchTitle: 'Aik Saath Kayi Links Download Karein',
    batchPlaceholder: 'Har line me aik YouTube link daalein...',
    batchProcessBtn: 'Tamam Links Process Karein',
    errorInvalidUrl: 'Barahe karam sahi YouTube ya Shorts link darj karein.',
    copiedToClipboard: 'Link copy hogaya!',
    navDownloader: 'Downloader',
    navAudio: 'MP3 Audio',
    navHistory: 'History',
    navFaq: 'Sawal Jawab',
  },
};

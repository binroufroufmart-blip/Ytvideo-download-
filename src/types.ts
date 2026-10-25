export type MediaType = 'video' | 'audio' | 'thumbnail';

export interface VideoFormat {
  id: string;
  label: string;
  container: 'mp4' | 'mp3' | 'm4a' | 'webm' | 'wav';
  type: MediaType;
  resolution?: string;
  bitrate?: string;
  approxSize: string;
  approxBytes: number;
  fps?: number;
  isRecommended?: boolean;
  hasAudio: boolean;
}

export interface VideoMetadata {
  id: string;
  originalUrl: string;
  title: string;
  author: string;
  authorUrl?: string;
  thumbnailUrl: string;
  durationFormatted: string;
  durationSeconds: number;
  viewsFormatted: string;
  uploadDate: string;
  formats: VideoFormat[];
}

export interface DownloadHistoryItem {
  id: string;
  videoId: string;
  title: string;
  thumbnailUrl: string;
  formatLabel: string;
  container: string;
  fileSize: string;
  timestamp: number;
  downloadUrl?: string;
}

export interface SampleVideo {
  label: string;
  url: string;
  title: string;
  author: string;
  id: string;
}

export type SupportedLanguage = 'en' | 'ur';

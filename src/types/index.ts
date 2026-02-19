export interface User {
  id: string;
  name: string;
  email: string;
  role: "listener" | "artist" | "admin";
  avatar?: string;
  createdAt: string;
}

export interface Artist {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  followers: number;
  verified: boolean;
  genres: string[];
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    website?: string;
  };
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  hlsUrl: string;
  duration: number;
  views: number;
  likes: number;
  artistId: string;
  artistName: string;
  genres: string[];
  publishedAt: string;
  status: "published" | "draft" | "processing";
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  cover?: string;
  userId: string;
  videos: string[];
  createdAt: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  method: "stripe" | "paypal" | "mercadopago" | "crypto";
  status: "completed" | "pending" | "failed";
  description: string;
}

export interface KPIData {
  totalViews: number;
  viewsChange: number;
  followers: number;
  followersChange: number;
  revenue: number;
  revenueChange: number;
  totalVideos: number;
  videosChange: number;
}

export interface ChartDataPoint {
  date: string;
  views?: number;
  revenue?: number;
  followers?: number;
}

export interface PaymentMethod {
  id: string;
  type: "stripe" | "paypal" | "mercadopago" | "crypto";
  isConnected: boolean;
  details?: Record<string, string>;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export interface PlayerState {
  currentVideo: Video | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  isExpanded: boolean;
  queue: Video[];
}

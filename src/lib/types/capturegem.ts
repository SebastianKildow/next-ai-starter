/**
 * CaptureGem Type Definitions
 * Generated from: /api/FRONTEND_SPEC.md
 */

// ============================================================================
// Rating Types
// ============================================================================

export type RatingTier = 'S++' | 'S+' | 'S' | 'A+' | 'A' | 'B' | 'C' | 'D';

export interface Ratings {
  overall: RatingTier;
  face: RatingTier;
  body: RatingTier;
  ass: RatingTier;
  boobs: RatingTier;
  vibe: RatingTier;
  production: RatingTier;
}

// ============================================================================
// Pricing Types
// ============================================================================

export interface PricingInfo {
  pvt?: string;          // e.g., "44/10" (44 tokens/min, 10 min minimum)
  pvt_rate?: number;     // e.g., 44
  pvt_min?: number;      // e.g., 10
  toy?: string;          // e.g., "2/1low" or "1tk/5sec"
  toy_costs?: string[];  // Full list of toy pricing
}

// ============================================================================
// Tags & Categories
// ============================================================================

export interface TagCategories {
  appearance: string[];
  bodyParts: string[];
  personality: string[];
  value: string[];
  special: string[];
}

// ============================================================================
// Notes & Documentation
// ============================================================================

export interface Note {
  time: string;         // ISO timestamp
  note: string;         // Freeform note text
  source?: string;      // "user", "speed_add_profile", "ai"
  url?: string;         // Related URL
}

// ============================================================================
// Enriched Profile Types
// ============================================================================

export interface TipMenuItem {
  name: string;
  price: number;
  description?: string;
}

export interface Review {
  author?: string;
  rating?: number;
  text: string;
  date?: string;
}

export interface EnrichedProfile {
  // Demographics
  name?: string;
  age?: number | string;
  from?: string;              // e.g., "CO" or "Colombia"
  languages?: string[];       // e.g., ["EN", "ES"]
  
  // Physical Attributes
  bodyType?: string;          // e.g., "Curvy", "Slim", "Athletic"
  ethnicity?: string;         // e.g., "Latina", "Asian"
  hair?: string;              // e.g., "Brown", "Blonde"
  eyeColor?: string;          // e.g., "Brown", "Blue"
  specifics?: string[];       // e.g., ["Tattoos", "Piercings"]
  
  // Personality & Style
  subculture?: string;        // e.g., "Alternative", "Girl Next Door"
  interests?: string[];       // e.g., ["Dancing", "Music"]
  
  // Pricing (from profile page)
  pvtRate?: string;           // e.g., "44"
  pvtMin?: string;            // e.g., "10"
  toyCosts?: string[];        // e.g., ["2/1low", "1tk/5sec"]
  
  // Interactive Features
  tipMenu?: TipMenuItem[];
  
  // Reviews & Ratings
  ratingOutOf5?: number | string;  // e.g., 4.8
  reviews?: Review[];
  
  // Social & Media
  socialLinks?: string[];
  avatarUrl?: string;
  coverUrl?: string;
  profileUrl?: string;
  welcomeText?: string;
  
  // Metadata
  lastCrawled?: string;       // ISO timestamp
  crawlStatus?: 'ok' | 'error' | 'skipped';
}

// ============================================================================
// Model Types
// ============================================================================

export interface Model {
  // Identity
  username: string;
  site: string;
  displayName?: string;
  
  // Ratings
  ratings: Ratings;
  
  // Pricing
  pricing: PricingInfo;
  
  // Tags
  tags: string[];
  tagCategories?: TagCategories;
  
  // Metadata
  recordings: number;
  autoRecord: boolean;
  lastUpdated: string;        // ISO timestamp
  addedAt?: string;           // ISO timestamp
  prospect?: boolean;
  rating?: number;            // Legacy 0-5 rating
  
  // Notes
  notes: Note[];
  structuredNotes?: string;   // Bracket format: [O:S+] [F:S] [B:A]
  
  // Enriched Profile
  enrichedProfile?: EnrichedProfile;
}

// ============================================================================
// Model Card (UI Optimized)
// ============================================================================

export type ValueTier = 'budget' | 'standard' | 'premium' | 'luxury';

export interface ModelCard {
  username: string;
  site: string;
  displayData: {
    avatarUrl?: string;
    displayName?: string;
    rating: RatingTier;
    
    // Quick stats for card header
    quickStats: {
      recordings: number;
      pvtRate?: string;
      age?: number | string;
      from?: string;
    };
    
    // Full ratings breakdown
    ratings: {
      face: RatingTier;
      body: RatingTier;
      ass: RatingTier;
      boobs: RatingTier;
      vibe: RatingTier;
      production: RatingTier;
    };
    
    tags: string[];
    
    tipMenu?: TipMenuItem[];
    
    recentNotes: string[];
    reviewSnippets?: string[];
    valueTier?: ValueTier;
    prospect: boolean;
  };
}

// ============================================================================
// Dashboard Data
// ============================================================================

export interface DashboardSummary {
  totalModels: number;
  averageScore: number;
  
  ratingDistribution: {
    'S++': number;
    'S+': number;
    'S': number;
    'A+': number;
    'A': number;
    'B': number;
    'C': number;
    'D': number;
  };
  
  topTags: {
    [tagName: string]: number;
  };
  
  pvtBuckets: {
    '<=25': number;
    '26-49': number;
    '>=50': number;
  };
  
  recordingStats: {
    totalRecordings: number;
    averagePerModel: number;
    topRecordedModels: Array<{
      username: string;
      count: number;
    }>;
    autoRecordEnabled: number;
  };
}

export interface DashboardData {
  generatedAt: string;
  summary: DashboardSummary;
  top50: Model[];
  models: Model[];
  prospects: Model[];
  enrichedProfiles: {
    [username: string]: EnrichedProfile;
  };
}

// ============================================================================
// API Response Types
// ============================================================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ModelCardsResponse {
  cards: ModelCard[];
}

export interface TagsResponse {
  categories: {
    appearance: string[];
    body_parts: string[];
    personality: string[];
    value: string[];
    special: string[];
  };
  recent: string[];
  popular: Array<{
    tag: string;
    count: number;
  }>;
}

// ============================================================================
// Filter & Query Types
// ============================================================================

export interface FilterState {
  search?: string;
  rating?: RatingTier;
  tags?: string[];
  minRecs?: number;
  prospect?: boolean;
  sort?: 'rating' | 'recs' | 'name' | 'added';
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
  page?: number;
}

// ============================================================================
// Rating Color Maps (for UI)
// ============================================================================

export const RATING_COLORS: Record<RatingTier, string> = {
  'S++': 'bg-purple-600',
  'S+': 'bg-indigo-600',
  'S': 'bg-blue-600',
  'A+': 'bg-green-600',
  'A': 'bg-gray-600',
  'B': 'bg-yellow-600',
  'C': 'bg-orange-600',
  'D': 'bg-red-600',
};

export const RATING_TEXT_COLORS: Record<RatingTier, string> = {
  'S++': 'text-purple-600',
  'S+': 'text-indigo-600',
  'S': 'text-blue-600',
  'A+': 'text-green-600',
  'A': 'text-gray-600',
  'B': 'text-yellow-600',
  'C': 'text-orange-600',
  'D': 'text-red-600',
};

export const RATING_BORDER_COLORS: Record<RatingTier, string> = {
  'S++': 'border-purple-600',
  'S+': 'border-indigo-600',
  'S': 'border-blue-600',
  'A+': 'border-green-600',
  'A': 'border-gray-600',
  'B': 'border-yellow-600',
  'C': 'border-orange-600',
  'D': 'border-red-600',
};

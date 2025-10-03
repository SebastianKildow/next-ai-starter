export type RatingTier = "S++" | "S+" | "S" | "A+" | "A" | "B" | "C" | "D"

export type ModelStatus = "online" | "offline" | "private" | "group"

export interface ModelRatings {
  overall: RatingTier
  face: RatingTier
  body: RatingTier
  ass: RatingTier
  boobs: RatingTier
  vibe: RatingTier
  production: RatingTier
}

export interface PricingInfo {
  pvtRate: number // tokens per minute
  pvtMinimum: number // minimum minutes
  toyRate?: string // e.g., "2/1low" or "1tk/5sec"
}

export type SortOption = "overall" | "value" | "recent" | "spent" | "recordings"

export interface Note {
  time: string // ISO timestamp
  note: string
  source?: "user" | "speed_add_profile" | "ai"
  url?: string
}

export interface TipMenuItem {
  name: string
  price: number
  description?: string
}

export interface Review {
  author?: string
  rating?: number
  text: string
  date?: string
}

export interface EnrichedProfile {
  // Demographics
  name?: string
  age?: number | string
  from?: string
  languages?: string[]

  // Physical Attributes
  bodyType?: string
  ethnicity?: string
  hair?: string
  eyeColor?: string
  specifics?: string[]

  // Personality & Style
  subculture?: string
  interests?: string[]

  // Pricing
  pvtRate?: string
  pvtMin?: string
  toyCosts?: string[]

  // Interactive Features
  tipMenu?: TipMenuItem[]

  // Reviews & Ratings
  ratingOutOf5?: number | string
  reviews?: Review[]

  // Social & Media
  socialLinks?: string[]
  avatarUrl?: string
  coverUrl?: string
  profileUrl?: string
  welcomeText?: string

  // Metadata
  lastCrawled?: string
  crawlStatus?: "ok" | "error" | "skipped"
}

export interface Model {
  // Identity
  username: string
  site: string
  displayName?: string

  // Ratings
  ratings: ModelRatings

  // Pricing
  pricing: {
    pvt?: string // e.g., "44/10"
    pvt_rate?: number
    pvt_min?: number
    toy?: string
    toy_costs?: string[]
  }

  // Tags
  tags: string[]
  tagCategories?: {
    appearance: string[]
    bodyParts: string[]
    personality: string[]
    value: string[]
    special: string[]
  }

  // Metadata
  recordings: number
  autoRecord: boolean
  lastUpdated: string
  addedAt?: string
  prospect?: boolean
  rating?: number // Legacy 0-5 rating

  // Notes
  notes: Note[]
  structuredNotes?: string

  // Enriched Profile
  enrichedProfile?: EnrichedProfile

  // Status (for UI)
  status?: ModelStatus
  avatar?: string
}

export interface ModelCard {
  username: string
  site: string
  displayData: {
    avatarUrl?: string
    displayName?: string
    rating: RatingTier

    quickStats: {
      recordings: number
      pvtRate?: string
      age?: number | string
      from?: string
    }

    ratings: {
      face: RatingTier
      body: RatingTier
      ass: RatingTier
      boobs: RatingTier
      vibe: RatingTier
      production: RatingTier
    }

    tags: string[]
    tipMenu?: TipMenuItem[]
    recentNotes: string[]
    reviewSnippets?: string[]
    valueTier?: "budget" | "standard" | "premium" | "luxury"
    prospect: boolean
  }
}

export interface DashboardSummary {
  totalModels: number
  averageScore: number

  ratingDistribution: {
    "S++": number
    "S+": number
    S: number
    "A+": number
    A: number
    B: number
    C: number
    D: number
  }

  topTags: {
    [tagName: string]: number
  }

  pvtBuckets: {
    "<=25": number
    "26-49": number
    ">=50": number
  }

  recordingStats: {
    totalRecordings: number
    averagePerModel: number
    topRecordedModels: Array<{
      username: string
      count: number
    }>
    autoRecordEnabled: number
  }
}

export interface DashboardData {
  generatedAt: string
  summary: DashboardSummary
  top50: Model[]
  models: Model[]
  prospects: Model[]
  enrichedProfiles: {
    [username: string]: EnrichedProfile
  }
}

export type ModelStatus = "online" | "offline" | "away" | "private"
export type RatingTier = "platinum" | "gold" | "silver" | "bronze" | "unrated"
export type SortOption = "rating" | "name" | "recent" | "price"

export interface FilterState {
  search: string
  status: ModelStatus | "all"
  ratingTier: RatingTier | "all"
  tags: string[]
  priceRange: [number, number]
  sortBy: SortOption
  showProspects: boolean
}

export interface FilterOptions {
  statuses: ModelStatus[]
  ratingTiers: RatingTier[]
  availableTags: string[]
  priceRange: {
    min: number
    max: number
  }
}

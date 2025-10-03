import type { Model, FilterState, RatingTier } from "@/lib/types/capturegem"
import { ratingToScore } from "../rating-utils"

// UI-specific sort options
export type SortOption = "rating" | "name" | "recent" | "price" | "recordings"

/**
 * Filters models based on the current filter state
 */
export function filterModels(models: Model[], filters: FilterState): Model[] {
  return models.filter((model) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch =
        model.username.toLowerCase().includes(searchLower) ||
        (model.displayName && model.displayName.toLowerCase().includes(searchLower)) ||
        model.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      if (!matchesSearch) return false
    }

    // Rating filter (matches overall rating)
    if (filters.rating && model.ratings.overall !== filters.rating) {
      return false
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasAllTags = filters.tags.every((tag) =>
        model.tags.some((modelTag) => modelTag.toLowerCase() === tag.toLowerCase()),
      )
      if (!hasAllTags) return false
    }

    // Minimum recordings filter
    if (filters.minRecs && model.recordings < filters.minRecs) {
      return false
    }

    // Prospects filter
    if (filters.prospect !== undefined && model.prospect !== filters.prospect) {
      return false
    }

    return true
  })
}

/**
 * Sorts models based on the selected sort option
 */
export function sortModels(models: Model[], sortBy: SortOption = 'rating', order: 'asc' | 'desc' = 'desc'): Model[] {
  const sorted = [...models]
  const multiplier = order === 'desc' ? -1 : 1

  switch (sortBy) {
    case "rating":
      return sorted.sort((a, b) => {
        const scoreA = ratingToScore(a.ratings.overall)
        const scoreB = ratingToScore(b.ratings.overall)
        return (scoreB - scoreA) * multiplier
      })
    case "name":
      return sorted.sort((a, b) => {
        const nameA = a.displayName || a.username
        const nameB = b.displayName || b.username
        return nameA.localeCompare(nameB) * multiplier
      })
    case "recent":
      return sorted.sort((a, b) => {
        const aTime = a.addedAt ? new Date(a.addedAt).getTime() : 0
        const bTime = b.addedAt ? new Date(b.addedAt).getTime() : 0
        return (bTime - aTime) * multiplier
      })
    case "price":
      return sorted.sort((a, b) => {
        const priceA = a.pricing.pvt_rate || 0
        const priceB = b.pricing.pvt_rate || 0
        return (priceA - priceB) * multiplier
      })
    case "recordings":
      return sorted.sort((a, b) => {
        return (b.recordings - a.recordings) * multiplier
      })
    default:
      return sorted
  }
}

/**
 * Apply both filtering and sorting
 */
export function applyFilters(models: Model[], filters: FilterState): Model[] {
  let result = filterModels(models, filters)
  
  if (filters.sort) {
    result = sortModels(result, filters.sort as SortOption, filters.order)
  }
  
  return result
}

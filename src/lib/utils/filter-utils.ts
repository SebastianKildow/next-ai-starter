import type { Model } from "@/types/model"
import type { FilterState, SortOption } from "@/types/filters"

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
        model.displayName.toLowerCase().includes(searchLower) ||
        model.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      if (!matchesSearch) return false
    }

    // Status filter
    if (filters.status !== "all" && model.status !== filters.status) {
      return false
    }

    // Rating tier filter
    if (filters.ratingTier !== "all" && model.ratingTier !== filters.ratingTier) {
      return false
    }

    // Prospects filter
    if (filters.showProspects && !model.isProspect) {
      return false
    }

    // Tag filter
    if (filters.tags.length > 0) {
      const hasAllTags = filters.tags.every((tag) =>
        model.tags.some((modelTag) => modelTag.toLowerCase() === tag.toLowerCase()),
      )
      if (!hasAllTags) return false
    }

    // Price range filter
    const [minPrice, maxPrice] = filters.priceRange
    if (model.pricing.privateShow < minPrice || model.pricing.privateShow > maxPrice) {
      return false
    }

    return true
  })
}

/**
 * Sorts models based on the selected sort option
 */
export function sortModels(models: Model[], sortBy: SortOption): Model[] {
  const sorted = [...models]

  switch (sortBy) {
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating)
    case "name":
      return sorted.sort((a, b) => a.displayName.localeCompare(b.displayName))
    case "recent":
      return sorted.sort((a, b) => {
        const aTime = a.lastSession ? new Date(a.lastSession).getTime() : 0
        const bTime = b.lastSession ? new Date(b.lastSession).getTime() : 0
        return bTime - aTime
      })
    case "price":
      return sorted.sort((a, b) => a.pricing.privateShow - b.pricing.privateShow)
    default:
      return sorted
  }
}

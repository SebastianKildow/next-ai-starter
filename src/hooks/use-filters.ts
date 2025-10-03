"use client"

import { useState, useCallback } from "react"
import type { FilterState, RatingTier } from "@/lib/types/capturegem"

// Default filters
const DEFAULT_FILTERS: FilterState = {
  limit: 50,
  sort: 'rating',
  order: 'desc',
}

/**
 * Custom hook for managing filter state
 */
export function useFilters(initialFilters: FilterState = DEFAULT_FILTERS) {
  const [filters, setFilters] = useState<FilterState>(initialFilters)

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const setSearch = useCallback(
    (search: string) => {
      updateFilter("search", search)
    },
    [updateFilter],
  )

  const setRating = useCallback(
    (rating: RatingTier | undefined) => {
      updateFilter("rating", rating)
    },
    [updateFilter],
  )

  const setTags = useCallback(
    (tags: string[]) => {
      updateFilter("tags", tags)
    },
    [updateFilter],
  )

  const setSort = useCallback(
    (sort: FilterState['sort']) => {
      updateFilter("sort", sort)
    },
    [updateFilter],
  )

  const toggleProspects = useCallback(() => {
    setFilters((prev) => ({ ...prev, prospect: !prev.prospect }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  return {
    filters,
    setSearch,
    setRating,
    setTags,
    setSort,
    toggleProspects,
    resetFilters,
    updateFilter,
  }
}

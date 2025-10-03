"use client"

import { useState, useCallback } from "react"
import type { FilterState, SortOption, ModelStatus, RatingTier } from "@/types/filters"
import { DEFAULT_FILTERS } from "@/lib/constants"

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

  const setStatus = useCallback(
    (status: ModelStatus | "all") => {
      updateFilter("status", status)
    },
    [updateFilter],
  )

  const setRatingTier = useCallback(
    (tier: RatingTier | "all") => {
      updateFilter("ratingTier", tier)
    },
    [updateFilter],
  )

  const setSortBy = useCallback(
    (sortBy: SortOption) => {
      updateFilter("sortBy", sortBy)
    },
    [updateFilter],
  )

  const toggleProspects = useCallback(() => {
    setFilters((prev) => ({ ...prev, showProspects: !prev.showProspects }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  return {
    filters,
    setSearch,
    setStatus,
    setRatingTier,
    setSortBy,
    toggleProspects,
    resetFilters,
    updateFilter,
  }
}

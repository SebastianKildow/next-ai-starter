"use client"

import { useState, useEffect, useMemo } from "react"
import type { Model } from "@/types/model"
import type { FilterState } from "@/types/filters"
import { fetchModels } from "@/lib/api/models"
import { filterModels, sortModels } from "@/lib/utils/filter-utils"

/**
 * Custom hook for managing model data with filtering and sorting
 */
export function useModels(filters: FilterState) {
  const [models, setModels] = useState<Model[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Fetch models on mount
  useEffect(() => {
    async function loadModels() {
      try {
        setIsLoading(true)
        const data = await fetchModels()
        setModels(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load models"))
      } finally {
        setIsLoading(false)
      }
    }

    loadModels()
  }, [])

  // Apply filters and sorting
  const filteredModels = useMemo(() => {
    let result = filterModels(models, filters)
    result = sortModels(result, filters.sortBy)
    return result
  }, [models, filters])

  return {
    models: filteredModels,
    allModels: models,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true)
      fetchModels()
        .then(setModels)
        .finally(() => setIsLoading(false))
    },
  }
}

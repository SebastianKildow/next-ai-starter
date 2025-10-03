import type { Model } from "@/types/model"
import { mockModels } from "@/lib/api/models"

/**
 * Simulates fetching all models from the API
 * In production, this would be a real API call
 */
export async function fetchModels(): Promise<Model[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockModels
}

/**
 * Simulates fetching a single model by ID
 */
export async function fetchModelById(id: string): Promise<Model | null> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return mockModels.find((model) => model.id === id) || null
}

/**
 * Simulates updating a model's favorite status
 */
export async function toggleModelFavorite(id: string): Promise<Model | null> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  const model = mockModels.find((m) => m.id === id)
  if (model) {
    model.isFavorite = !model.isFavorite
    return model
  }
  return null
}

/**
 * Simulates adding a note to a model
 */
export async function addModelNote(id: string, content: string, tags?: string[]): Promise<Model | null> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  const model = mockModels.find((m) => m.id === id)
  if (model) {
    model.notes.push({
      id: `n${Date.now()}`,
      content,
      timestamp: new Date().toISOString(),
      source: "manual",
      tags,
    })
    return model
  }
  return null
}

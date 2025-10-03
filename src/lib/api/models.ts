/**
 * DEPRECATED: This file is deprecated.
 * Use src/lib/api/capturegem-client.ts for all API calls.
 * 
 * This file is kept for backward compatibility during migration.
 * All functions now proxy to capturegem-client.
 */

import type { Model } from "@/lib/types/capturegem"
import { fetchModels as fetchModelsAPI, fetchModel } from "./capturegem-client"

/**
 * Fetches all models from the API
 * @deprecated Use fetchModels() from capturegem-client directly
 */
export async function fetchModels(): Promise<Model[]> {
  const response = await fetchModelsAPI({ limit: 1000 })
  return response.data
}

/**
 * Fetches a single model by username
 * @deprecated Use fetchModel() from capturegem-client directly
 */
export async function fetchModelById(username: string): Promise<Model | null> {
  try {
    return await fetchModel(username)
  } catch (error) {
    console.error(`Failed to fetch model ${username}:`, error)
    return null
  }
}

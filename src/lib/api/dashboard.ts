/**
 * DEPRECATED: This file is deprecated.
 * Use src/lib/api/capturegem-client.ts for all API calls.
 * 
 * This file is kept for backward compatibility during migration.
 */

import type { DashboardSummary } from "@/lib/types/capturegem"
import { fetchAnalyticsSummary } from "./capturegem-client"

/**
 * Fetches dashboard summary data
 * @deprecated Use fetchAnalyticsSummary() from capturegem-client directly
 */
export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  return await fetchAnalyticsSummary()
}

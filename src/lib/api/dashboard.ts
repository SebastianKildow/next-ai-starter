import type { DashboardSummary } from "@/types/dashboard"
import { mockDashboardSummary } from "@/types/dashboard"

/**
 * Simulates fetching dashboard summary data
 */
export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockDashboardSummary
}

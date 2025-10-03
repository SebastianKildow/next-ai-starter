import type { DashboardSummary } from "@/types/dashboard"

export const mockDashboardSummary: DashboardSummary = {
  totalModels: 15,
  activeModels: 8,
  averageScore: 8.2,
  topPerformers: 4,
  ratingDistribution: {
    platinum: 4,
    gold: 5,
    silver: 3,
    bronze: 2,
    unrated: 1,
  },
  pricingBuckets: {
    budget: 3,
    moderate: 6,
    premium: 4,
    luxury: 2,
  },
}

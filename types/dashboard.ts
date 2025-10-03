export interface DashboardSummary {
  totalModels: number
  activeModels: number
  averageScore: number
  topPerformers: number
  ratingDistribution: {
    platinum: number
    gold: number
    silver: number
    bronze: number
    unrated: number
  }
  pricingBuckets: {
    budget: number
    moderate: number
    premium: number
    luxury: number
  }
}

export interface DashboardStats {
  totalSpent: number
  totalSessions: number
  averageSessionCost: number
  favoriteCount: number
}

import type { RatingTier } from "@/types/model"

/**
 * Converts a rating tier to a numeric score (0-100)
 */
export function ratingToScore(rating: RatingTier): number {
  const scores: Record<RatingTier, number> = {
    "S++": 100,
    "S+": 95,
    S: 88,
    "A+": 82,
    A: 75,
    B: 65,
    C: 50,
    D: 35,
  }
  return scores[rating] || 0
}

/**
 * Converts a rating tier to a Tailwind text color class
 */
export function ratingToColor(rating: RatingTier): string {
  if (rating.startsWith("S")) return "text-yellow-400"
  if (rating.startsWith("A")) return "text-blue-400"
  if (rating === "B") return "text-green-400"
  return "text-zinc-400"
}

/**
 * Converts a rating tier to a Tailwind background color class
 */
export function ratingToBgColor(rating: RatingTier): string {
  if (rating.startsWith("S")) return "bg-yellow-500"
  if (rating.startsWith("A")) return "bg-blue-500"
  if (rating === "B") return "bg-green-500"
  return "bg-zinc-500"
}

/**
 * Calculates a value score based on price and rating
 */
export function calculateValueScore(price: number, rating: RatingTier): number {
  const ratingScore = ratingToScore(rating)
  const priceScore = Math.max(0, 100 - price)
  return Math.round((ratingScore + priceScore) / 20)
}

/**
 * Determines if a model is a value deal (low price, high rating)
 */
export function isValueDeal(price: number): boolean {
  return price <= 30
}

/**
 * Determines if a model is in the premium tier
 */
export function isPremiumTier(rating: RatingTier): boolean {
  return rating.startsWith("S")
}

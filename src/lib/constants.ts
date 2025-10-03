export const RATING_COLORS = {
  S: "text-yellow-500",
  A: "text-blue-500",
  B: "text-green-500",
  DEFAULT: "text-gray-500",
} as const

export const RATING_BG_COLORS = {
  S: "bg-yellow-500",
  A: "bg-blue-500",
  B: "bg-green-500",
  DEFAULT: "bg-gray-500",
} as const

export const RATING_SCORES = {
  "S++": 100,
  "S+": 95,
  S: 88,
  "A+": 82,
  A: 75,
  B: 65,
  C: 50,
  D: 35,
} as const

export const STATUS_COLORS = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  private: "bg-purple-500",
  group: "bg-blue-500",
} as const

export const STATUS_LABELS = {
  online: "Online",
  offline: "Offline",
  private: "In Private",
  group: "Group Show",
} as const

export const VALUE_THRESHOLD = 30
export const CARD_PREVIEW_TAG_LIMIT = 4
export const TIP_MENU_PREVIEW_LIMIT = 2
export const TOP_TAGS_LIMIT = 8
export const TOP_RECORDED_MODELS_LIMIT = 5

export const DEFAULT_FILTERS = {
  search: "",
  status: "all" as const,
  ratingTier: "all" as const,
  tags: [],
  priceRange: [0, 100] as [number, number],
  sortBy: "rating" as const,
  showProspects: false,
}

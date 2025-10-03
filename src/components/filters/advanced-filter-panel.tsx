"use client"

import { useState, useEffect } from 'react'
import { Search, X, ChevronDown, Filter as FilterIcon, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RatingTier } from '@/lib/types/capturegem'
import { useDebounce } from '@/hooks/use-debounce'

interface AdvancedFilterPanelProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedRating: string | null
  onRatingChange: (rating: string | null) => void
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  sortBy: string
  onSortChange: (sort: string) => void
  showProspectsOnly: boolean
  onProspectsToggle: (show: boolean) => void
  availableTags?: string[]
  modelCount?: number
}

const RATING_TIERS: RatingTier[] = ['S++', 'S+', 'S', 'A+', 'A', 'B', 'C', 'D']
const RATING_COLORS: Record<string, string> = {
  'S++': 'bg-purple-600 hover:bg-purple-700',
  'S+': 'bg-indigo-600 hover:bg-indigo-700',
  'S': 'bg-blue-600 hover:bg-blue-700',
  'A+': 'bg-green-600 hover:bg-green-700',
  'A': 'bg-gray-600 hover:bg-gray-700',
  'B': 'bg-yellow-600 hover:bg-yellow-700',
  'C': 'bg-orange-600 hover:bg-orange-700',
  'D': 'bg-red-600 hover:bg-red-700',
}

const COMMON_TAGS = ['YOUNG', 'ASS', 'PREMIUM', 'VALUE', 'THICK', 'CUTE', 'INTERACTIVE', 'SQUIRT']

export function AdvancedFilterPanel({
  searchQuery,
  onSearchChange,
  selectedRating,
  onRatingChange,
  selectedTags,
  onTagsChange,
  sortBy,
  onSortChange,
  showProspectsOnly,
  onProspectsToggle,
  availableTags = COMMON_TAGS,
  modelCount,
}: AdvancedFilterPanelProps) {
  const [showAllTags, setShowAllTags] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  
  // Local search state for immediate UI feedback
  const [localSearch, setLocalSearch] = useState(searchQuery)
  
  // Debounce the actual search to reduce re-renders
  const debouncedSearch = useDebounce(localSearch, 300)
  
  // Update parent when debounced value changes
  useEffect(() => {
    if (debouncedSearch !== searchQuery) {
      onSearchChange(debouncedSearch)
    }
  }, [debouncedSearch, searchQuery, onSearchChange])

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }

  const handleClearFilters = () => {
    setLocalSearch('')
    onSearchChange('')
    onRatingChange(null)
    onTagsChange([])
    onProspectsToggle(false)
  }

  const activeFilterCount = 
    (searchQuery ? 1 : 0) +
    (selectedRating ? 1 : 0) +
    selectedTags.length +
    (showProspectsOnly ? 1 : 0)

  const tagsToShow = showAllTags ? availableTags : availableTags.slice(0, 8)

  return (
    <div className="rounded-2xl border border-zinc-700/50 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FilterIcon className="h-5 w-5 text-zinc-400" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-purple-600 px-2 py-0.5 text-xs font-bold text-white">
              {activeFilterCount}
            </span>
          )}
          {modelCount !== undefined && (
            <span className="text-sm text-zinc-400">
              {modelCount} models
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Clear all
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronDown 
              className={cn(
                "h-5 w-5 transition-transform",
                !isExpanded && "-rotate-180"
              )}
            />
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by name, username, or tags..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 py-3 pl-12 pr-10 text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            />
            {localSearch && (
              <button
                onClick={() => {
                  setLocalSearch('')
                  onSearchChange('')
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Rating Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Rating Tier
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onRatingChange(null)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
                  !selectedRating
                    ? "bg-zinc-700 text-white"
                    : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                )}
              >
                All
              </button>
              {RATING_TIERS.map((tier) => (
                <button
                  key={tier}
                  onClick={() => onRatingChange(tier)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-bold transition-all",
                    selectedRating === tier
                      ? RATING_COLORS[tier] + " text-white"
                      : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                  )}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Tags {selectedTags.length > 0 && `(${selectedTags.length} selected)`}
            </label>
            <div className="flex flex-wrap gap-2">
              {tagsToShow.map((tag) => {
                const isSelected = selectedTags.includes(tag)
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
                      isSelected
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800"
                    )}
                  >
                    {tag}
                    {isSelected && (
                      <X className="ml-1 inline h-3 w-3" />
                    )}
                  </button>
                )
              })}
              
              {availableTags.length > 8 && (
                <button
                  onClick={() => setShowAllTags(!showAllTags)}
                  className="rounded-lg bg-zinc-800/50 px-3 py-1.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                >
                  {showAllTags ? 'Show less' : `+${availableTags.length - 8} more`}
                </button>
              )}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 border-t border-zinc-700/50 pt-4">
            <button
              onClick={() => onProspectsToggle(!showProspectsOnly)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                showProspectsOnly
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
              )}
            >
              <Star className="h-4 w-4" />
              Prospects Only
            </button>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm font-medium text-white focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            >
              <option value="overall">Sort: Overall Rating</option>
              <option value="value">Sort: Best Value</option>
              <option value="recordings">Sort: Most Recordings</option>
              <option value="recent">Sort: Recently Added</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

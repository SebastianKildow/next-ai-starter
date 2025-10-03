"use client"

import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SortOption } from "@/types/model"

interface FilterBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedStatus: string | null
  onStatusChange: (status: string | null) => void
  selectedRating: string | null
  onRatingChange: (rating: string | null) => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  showProspectsOnly: boolean
  onProspectsToggle: (show: boolean) => void
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedRating,
  onRatingChange,
  sortBy,
  onSortChange,
  showProspectsOnly,
  onProspectsToggle,
}: FilterBarProps) {
  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          placeholder="Search models, tags, or usernames..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-neutral-200 border-zinc-700 bg-zinc-800/50 py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-600 dark:border-neutral-800"
          aria-label="Search models"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {/* Status Filters */}
        <button
          onClick={() => onStatusChange(null)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-all",
            !selectedStatus
              ? "bg-zinc-700 text-white"
              : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300",
          )}
          aria-pressed={!selectedStatus}
        >
          All Status
        </button>
        <button
          onClick={() => onStatusChange("online")}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-all",
            selectedStatus === "online"
              ? "bg-green-600 text-white"
              : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300",
          )}
          aria-pressed={selectedStatus === "online"}
        >
          🟢 Online
        </button>
        <button
          onClick={() => onStatusChange("private")}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-all",
            selectedStatus === "private"
              ? "bg-purple-600 text-white"
              : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300",
          )}
          aria-pressed={selectedStatus === "private"}
        >
          Private
        </button>

        <div className="mx-2 w-px bg-zinc-700" />

        {/* Rating Filters */}
        <button
          onClick={() => onRatingChange(null)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-all",
            !selectedRating
              ? "bg-zinc-700 text-white"
              : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300",
          )}
          aria-pressed={!selectedRating}
        >
          All Ratings
        </button>
        <button
          onClick={() => onRatingChange("S")}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-all",
            selectedRating === "S"
              ? "bg-yellow-600 text-white"
              : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300",
          )}
          aria-pressed={selectedRating === "S"}
        >
          S Tier
        </button>
        <button
          onClick={() => onRatingChange("A")}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-all",
            selectedRating === "A"
              ? "bg-blue-600 text-white"
              : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300",
          )}
          aria-pressed={selectedRating === "A"}
        >
          A Tier
        </button>

        <div className="mx-2 w-px bg-zinc-700" />

        {/* Prospects Filter */}
        <button
          onClick={() => onProspectsToggle(!showProspectsOnly)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-all",
            showProspectsOnly
              ? "bg-purple-600 text-white"
              : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300",
          )}
          aria-pressed={showProspectsOnly}
        >
          🎯 Prospects Only
        </button>

        <div className="mx-2 w-px bg-zinc-700" />

        {/* Sort Options */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-lg border border-neutral-200 border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm font-medium text-white focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-600 dark:border-neutral-800"
          aria-label="Sort models"
        >
          <option value="overall">Sort: Overall Rating</option>
          <option value="value">Sort: Best Value</option>
          <option value="recordings">Sort: Most Recordings</option>
          <option value="recent">Sort: Recently Added</option>
        </select>
      </div>
    </div>
  )
}

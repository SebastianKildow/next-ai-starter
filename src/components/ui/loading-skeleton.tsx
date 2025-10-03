"use client"

import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  count?: number
  className?: string
}

export function LoadingSkeleton({ count = 6, className }: LoadingSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-4",
            "border border-zinc-700/50 animate-pulse",
            className
          )}
        >
          {/* Header */}
          <div className="mb-3 flex items-start gap-3">
            <div className="h-16 w-16 rounded-xl bg-zinc-800" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-32 rounded bg-zinc-800" />
              <div className="h-4 w-24 rounded bg-zinc-800" />
              <div className="h-3 w-20 rounded bg-zinc-800" />
            </div>
          </div>

          {/* Rating Bar */}
          <div className="mb-3">
            <div className="h-2 w-full rounded-full bg-zinc-800" />
          </div>

          {/* Pricing Grid */}
          <div className="mb-3 grid grid-cols-2 gap-2">
            <div className="h-20 rounded-lg bg-zinc-800/50" />
            <div className="h-20 rounded-lg bg-zinc-800/50" />
          </div>

          {/* Ratings Grid */}
          <div className="mb-3 grid grid-cols-3 gap-1">
            {Array.from({ length: 6 }).map((_, j) => (
              <div key={j} className="h-12 rounded bg-zinc-800/50" />
            ))}
          </div>

          {/* Tags */}
          <div className="mb-3 flex flex-wrap gap-1">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="h-6 w-16 rounded bg-zinc-800" />
            ))}
          </div>

          {/* Footer */}
          <div className="h-8 rounded bg-zinc-800/30" />
        </div>
      ))}
    </div>
  )
}

export function DashboardLoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-zinc-800" />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-64 rounded-xl bg-zinc-800" />
        <div className="h-64 rounded-xl bg-zinc-800" />
      </div>

      {/* Tags */}
      <div className="h-32 rounded-xl bg-zinc-800" />
    </div>
  )
}

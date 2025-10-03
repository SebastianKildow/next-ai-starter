"use client"

import { memo } from 'react'
import type { Model } from "@/lib/types/capturegem"
import { LazyImage } from '../ui/lazy-image'
import {
  ratingToScore,
  ratingToColor,
  ratingToBgColor,
  calculateValueScore,
  isValueDeal,
  isPremiumTier,
} from "@/lib/rating-utils"
import { cn } from "@/lib/utils"
import { DollarSign, Video, TrendingUp, Sparkles, MessageSquare, Target } from "lucide-react"
import { STATUS_COLORS, STATUS_LABELS, CARD_PREVIEW_TAG_LIMIT, TIP_MENU_PREVIEW_LIMIT } from "@/lib/constants"

interface ModelCardProps {
  model: Model
  onClick?: () => void
}

export const ModelCard = memo(function ModelCard({ model, onClick }: ModelCardProps) {
  const enriched = model.enrichedProfile
  const pvtRate = model.pricing.pvt_rate || 0
  const valueScore = calculateValueScore(pvtRate, model.ratings.overall)
  const isValue = isValueDeal(pvtRate)
  const isPremium = isPremiumTier(model.ratings.overall)

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "") {
          e.preventDefault()
          onClick?.()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${model.displayName || model.username}`}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 transition-all duration-300",
        "border border-zinc-700/50 hover:border-zinc-600 hover:shadow-xl hover:shadow-zinc-900/50 hover:scale-[1.02]",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950",
        isPremium && "ring-2 ring-yellow-500/30",
      )}
    >
      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute right-3 top-3 z-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 px-2 py-1 text-xs font-bold text-black">
          <Sparkles className="inline h-3 w-3" /> {model.ratings.overall}
        </div>
      )}

      {model.prospect && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 text-xs font-bold text-white">
          <Target className="inline h-3 w-3" /> Prospect
        </div>
      )}

      {/* Header Section */}
      <div className="mb-3 flex items-start gap-3">
        {/* Avatar */}
        <div className="relative">
          <LazyImage
            src={enriched?.avatarUrl || "/placeholder.svg"}
            alt={model.displayName || model.username}
            className="h-16 w-16 rounded-xl ring-2 ring-zinc-700"
          />
        </div>

        {/* Name & Info */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-white">{model.displayName || model.username}</h3>
          <p className="text-xs text-zinc-400">@{model.username}</p>
          <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
            {enriched?.age && <span>{enriched.age}yo</span>}
            {enriched?.from && <span>• {enriched.from}</span>}
          </div>
        </div>
      </div>

      {/* Overall Rating Bar */}
      <div className="mb-3">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="font-mono text-zinc-400">OVERALL</span>
          <span className={cn("font-bold", ratingToColor(model.ratings.overall))}>{model.ratings.overall}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className={cn("h-full transition-all", ratingToBgColor(model.ratings.overall))}
            style={{ width: `${ratingToScore(model.ratings.overall)}%` }}
            role="progressbar"
            aria-valuenow={ratingToScore(model.ratings.overall)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* Pricing & Value */}
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-zinc-800/50 p-2">
          <div className="flex items-center gap-1 text-xs text-zinc-400">
            <DollarSign className="h-3 w-3" />
            <span>PVT</span>
          </div>
          <div className="mt-1 font-mono text-sm font-bold text-white">
            {model.pricing.pvt || `${model.pricing.pvt_rate}/${model.pricing.pvt_min}m`}
          </div>
          {isValue && <div className="mt-1 text-xs font-semibold text-green-400">VALUE ✓</div>}
        </div>

        <div className="rounded-lg bg-zinc-800/50 p-2">
          <div className="flex items-center gap-1 text-xs text-zinc-400">
            <TrendingUp className="h-3 w-3" />
            <span>ROI</span>
          </div>
          <div className="mt-1 font-mono text-sm font-bold text-white">{valueScore}/10</div>
          {model.pricing.toy && <div className="mt-1 text-xs text-zinc-400">Toy: {model.pricing.toy}</div>}
        </div>
      </div>

      {/* Ratings Grid */}
      <div className="mb-3 grid grid-cols-3 gap-1 text-xs">
        {Object.entries(model.ratings)
          .filter(([key]) => key !== "overall")
          .map(([key, rating]) => (
            <div key={key} className="rounded bg-zinc-800/50 px-2 py-1 text-center">
              <div className="font-mono text-zinc-500">{key.charAt(0).toUpperCase()}</div>
              <div className={cn("font-bold", ratingToColor(rating))}>{rating}</div>
            </div>
          ))}
      </div>

      {/* Tags */}
      <div className="mb-3 flex flex-wrap gap-1">
        {model.tags.slice(0, CARD_PREVIEW_TAG_LIMIT).map((tag, i) => (
          <span key={i} className="rounded bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-300">
            {tag}
          </span>
        ))}
        {model.tags.length > CARD_PREVIEW_TAG_LIMIT && (
          <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-500">
            +{model.tags.length - CARD_PREVIEW_TAG_LIMIT}
          </span>
        )}
      </div>

      {/* Tip Menu Preview */}
      {enriched?.tipMenu && enriched.tipMenu.length > 0 && (
        <div className="mb-3 rounded-lg bg-zinc-800/30 p-2">
          <div className="mb-1 text-xs font-semibold text-zinc-400">💡 Tip Menu ({enriched.tipMenu.length})</div>
          <div className="space-y-1">
            {enriched.tipMenu.slice(0, TIP_MENU_PREVIEW_LIMIT).map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-zinc-300">{item.name}</span>
                <span className="font-mono font-bold text-green-400">{item.price}tk</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Note */}
      {model.notes && model.notes.length > 0 && (
        <div className="mb-3 rounded-lg bg-zinc-800/30 p-2">
          <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-zinc-400">
            <MessageSquare className="h-3 w-3" />
            Recent Note
          </div>
          <p className="line-clamp-2 text-xs leading-relaxed text-zinc-300">{model.notes[0].note}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-zinc-700/50 pt-2 text-xs">
        <div className="flex items-center gap-2 text-zinc-400">
          <Video className="h-3 w-3" />
          <span className="font-mono">{model.recordings} recordings</span>
        </div>
        {model.autoRecord && (
          <span className="text-green-400 text-xs font-medium">AUTO-RECORD ✓</span>
        )}
      </div>
    </div>
  )
})

"use client"

import { useEffect } from "react"
import type { Model } from "@/lib/types/capturegem"
import { X, DollarSign, Video, Clock, Star, Tag, MessageSquare } from "lucide-react"
import { ratingToColor, ratingToBgColor, ratingToScore } from "@/lib/rating-utils"
import { cn } from "@/lib/utils"

interface ModelDetailModalProps {
  model: Model
  onClose: () => void
}

export function ModelDetailModal({ model, onClose }: ModelDetailModalProps) {
  const enriched = model.enrichedProfile

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-neutral-200 border-zinc-700 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg bg-zinc-800 p-2 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6 flex items-start gap-4">
          <div className="h-24 w-24 overflow-hidden rounded-xl bg-zinc-800 ring-2 ring-zinc-700">
            <img
              src={enriched?.avatarUrl || "/placeholder.svg"}
              alt={model.displayName || model.username}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 id="modal-title" className="text-3xl font-bold text-white">
              {model.displayName || model.username}
            </h2>
            <p className="text-zinc-400">@{model.username}</p>
            <div className="mt-2 flex items-center gap-3 text-sm text-zinc-400">
              {enriched?.age && <span>{enriched.age}yo</span>}
              {enriched?.from && <span>• {enriched.from}</span>}
              {enriched?.languages && <span>• {enriched.languages.join(",")}</span>}
            </div>
          </div>
          <div className={cn("rounded-xl px-4 py-2 text-2xl font-bold", ratingToBgColor(model.ratings.overall))}>
            {model.ratings.overall}
          </div>
        </div>

        {/* Ratings Breakdown */}
        <div className="mb-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
            <Star className="h-5 w-5" />
            Ratings Breakdown
          </h3>
          <div className="space-y-3">
            {Object.entries(model.ratings).map(([key, rating]) => (
              <div key={key}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-mono uppercase text-zinc-400">{key}</span>
                  <span className={cn("font-bold", ratingToColor(rating))}>{rating}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className={cn("h-full transition-all", ratingToBgColor(rating))}
                    style={{ width: `${ratingToScore(rating)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
            <DollarSign className="h-5 w-5" />
            Pricing
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-zinc-800/50 p-4">
              <div className="text-sm text-zinc-400">Private Show</div>
              <div className="mt-1 font-mono text-2xl font-bold text-white">
                {model.pricing.pvt || `${model.pricing.pvt_rate}tk/${model.pricing.pvt_min}m`}
              </div>
            </div>
            {model.pricing.toy && (
              <div className="rounded-lg bg-zinc-800/50 p-4">
                <div className="text-sm text-zinc-400">Toy Control</div>
                <div className="mt-1 font-mono text-2xl font-bold text-white">{model.pricing.toy}</div>
              </div>
            )}
          </div>
        </div>

        {/* Tip Menu */}
        {enriched?.tipMenu && enriched.tipMenu.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
              <DollarSign className="h-5 w-5" />
              Tip Menu ({enriched.tipMenu.length} items)
            </h3>
            <div className="grid gap-2 md:grid-cols-2">
              {enriched.tipMenu.map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-zinc-800/50 p-3">
                  <div>
                    <div className="font-medium text-white">{item.name}</div>
                    {item.description && <div className="text-xs text-zinc-400">{item.description}</div>}
                  </div>
                  <div className="font-mono font-bold text-green-400">{item.price}tk</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mb-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
            <Tag className="h-5 w-5" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {model.tags.map((tag, i) => (
              <span key={i} className="rounded-lg bg-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Notes */}
        {model.notes && model.notes.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
              <MessageSquare className="h-5 w-5" />
              Notes ({model.notes.length})
            </h3>
            <div className="space-y-2">
              {model.notes.map((note, i) => (
                <div key={i} className="rounded-lg bg-zinc-800/50 p-3">
                  <div className="mb-1 flex items-center justify-between text-xs text-zinc-500">
                    <span>{new Date(note.time).toLocaleDateString()}</span>
                    {note.source && <span className="rounded bg-zinc-700 px-2 py-0.5">{note.source}</span>}
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-300">{note.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {enriched?.reviews && enriched.reviews.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
              <Star className="h-5 w-5" />
              Reviews ({enriched.reviews.length})
            </h3>
            <div className="space-y-2">
              {enriched.reviews.map((review, i) => (
                <div key={i} className="rounded-lg bg-zinc-800/50 p-3">
                  <div className="mb-1 flex items-center justify-between">
                    {review.author && <span className="text-sm font-medium text-white">{review.author}</span>}
                    {review.rating && (
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-sm">{review.rating}/5</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-300">{review.text}</p>
                  {review.date && <div className="mt-1 text-xs text-zinc-500">{review.date}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="grid gap-3 border-t border-zinc-700 pt-4 md:grid-cols-3">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-zinc-400">
              <Video className="h-4 w-4" />
              Recordings
            </div>
            <div className="mt-1 font-mono text-xl font-bold text-white">{model.recordings}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-zinc-400">
              <Clock className="h-4 w-4" />
              Added
            </div>
            <div className="mt-1 text-sm text-white">
              {model.addedAt ? new Date(model.addedAt).toLocaleDateString() : "N/A"}
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-zinc-400">
              <Clock className="h-4 w-4" />
              Updated
            </div>
            <div className="mt-1 text-sm text-white">{new Date(model.lastUpdated).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import type { Model } from "@/lib/types/capturegem"
import { ModelCard } from "./model-card"

interface ModelGridProps {
  models: Model[]
  onModelClick: (model: Model) => void
}

export function ModelGrid({ models, onModelClick }: ModelGridProps) {
  if (models.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-neutral-500 dark:text-neutral-400">No models found</p>
        <p className="text-sm text-neutral-500 mt-2 dark:text-neutral-400">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map((model) => (
        <ModelCard key={model.username} model={model} onClick={() => onModelClick(model)} />
      ))}
    </div>
  )
}

'use client';

/**
 * CaptureGem Dashboard Main Page
 * Based on: /api/FRONTEND_SPEC.md
 */

import { useQuery } from '@tanstack/react-query';
import { capturegemQueries } from '@/lib/api/capturegem-client';
import { DashboardSummary } from '@/components/dashboard/dashboard-summary';
import { ModelGrid } from '@/components/models/model-grid';
import { FilterBar } from '@/components/filters/filter-bar';
import { ModelDetailModal } from '@/components/models/model-detail-modal';
import { useState } from 'react';
import type { FilterState, Model } from '@/lib/types/capturegem';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'overall' | 'value' | 'recent' | 'recordings'>('overall');
  const [showProspectsOnly, setShowProspectsOnly] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  // Fetch dashboard summary
  const { data: summaryData, isLoading: summaryLoading } = useQuery(
    capturegemQueries.analyticsSummary()
  );

  // Fetch models
  const { data: modelsResponse, isLoading: modelsLoading } = useQuery(
    capturegemQueries.models({ limit: 100, sort: 'rating', order: 'desc' })
  );

  const models = modelsResponse?.data || [];
  const isLoading = summaryLoading || modelsLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            CaptureGem Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Enterprise Performer Relationship Management
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Dashboard Summary */}
        {summaryData && (
          <section>
            <DashboardSummary summary={summaryData} />
          </section>
        )}

        {/* Filters */}
        <section>
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
            sortBy={sortBy}
            onSortChange={setSortBy}
            showProspectsOnly={showProspectsOnly}
            onProspectsToggle={setShowProspectsOnly}
          />
        </section>

        {/* Model Grid */}
        <section>
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          )}
          
          {!isLoading && models.length > 0 && (
            <ModelGrid 
              models={models}
              onModelClick={(model) => setSelectedModel(model)}
            />
          )}
          
          {!isLoading && models.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>No models found. Try adjusting your filters.</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-700 bg-gray-800/30">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>CaptureGem Dashboard • {summaryData?.totalModels || 0} Models Tracked</p>
        </div>
      </footer>
      
      {/* Model Detail Modal */}
      {selectedModel && (
        <ModelDetailModal
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
        />
      )}
    </div>
  );
}

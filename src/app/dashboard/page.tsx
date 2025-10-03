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
import { LoadingSkeleton, DashboardLoadingSkeleton } from '@/components/ui/loading-skeleton';
import { useState, useMemo } from 'react';
import type { FilterState, Model } from '@/lib/types/capturegem';
import { applyFilters } from '@/lib/utils/filter-utils';

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

  const allModels = modelsResponse?.data || [];
  const isLoading = summaryLoading || modelsLoading;

  // Apply client-side filtering
  const models = useMemo(() => {
    if (!allModels.length) return [];
    
    // Build filter state from UI state
    const filterState: FilterState = {
      search: searchQuery || undefined,
      rating: selectedRating as any,
      prospect: showProspectsOnly || undefined,
      sort: sortBy as any,
      order: 'desc',
    };
    
    return applyFilters(allModels, filterState);
  }, [allModels, searchQuery, selectedRating, showProspectsOnly, sortBy]);

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
        <section>
          {summaryLoading && <DashboardLoadingSkeleton />}
          {summaryData && !summaryLoading && (
            <DashboardSummary summary={summaryData} />
          )}
        </section>

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
          {modelsLoading && <LoadingSkeleton count={6} />}
          
          {!modelsLoading && models.length > 0 && (
            <ModelGrid 
              models={models}
              onModelClick={(model) => setSelectedModel(model)}
            />
          )}
          
          {!modelsLoading && models.length === 0 && (
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

'use client';

/**
 * CaptureGem Dashboard Main Page
 * Based on: /api/FRONTEND_SPEC.md
 */

import { useQuery } from '@tanstack/react-query';
import { capturegemQueries } from '@/lib/api/capturegem-client';
import { DashboardSummary } from '@/components/capturegem/DashboardSummary';
import { ModelGrid } from '@/components/capturegem/ModelGrid';
import { FilterBar } from '@/components/capturegem/FilterBar';
import { useState } from 'react';
import type { FilterState } from '@/lib/types/capturegem';

export default function DashboardPage() {
  const [filters, setFilters] = useState<FilterState>({
    limit: 50,
    sort: 'rating',
    order: 'desc',
  });

  // Fetch dashboard summary
  const { data: summaryData, isLoading: summaryLoading } = useQuery(
    capturegemQueries.analyticsSummary()
  );

  // Fetch model cards
  const { data: cardsData, isLoading: cardsLoading } = useQuery(
    capturegemQueries.modelCards()
  );

  const isLoading = summaryLoading || cardsLoading;

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
            onFilterChange={setFilters}
            availableTags={[]}
            availableRatings={['S++', 'S+', 'S', 'A+', 'A', 'B', 'C', 'D']}
          />
        </section>

        {/* Model Grid */}
        <section>
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          )}
          
          {cardsData && !isLoading && (
            <ModelGrid cards={cardsData.cards} />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-700 bg-gray-800/30">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>CaptureGem Dashboard • {summaryData?.totalModels || 0} Models Tracked</p>
        </div>
      </footer>
    </div>
  );
}

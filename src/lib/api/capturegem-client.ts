/**
 * CaptureGem API Client
 * Based on: /api/FRONTEND_SPEC.md
 */

import {
  Model,
  ModelCard,
  DashboardData,
  DashboardSummary,
  PaginatedResponse,
  ModelCardsResponse,
  TagsResponse,
  FilterState,
} from '@/lib/types/capturegem';

// ============================================================================
// Configuration
// ============================================================================

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// ============================================================================
// Helper Functions
// ============================================================================

function buildQueryParams(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  
  if (filters.limit) params.set('limit', filters.limit.toString());
  if (filters.offset) params.set('offset', filters.offset.toString());
  if (filters.page) params.set('page', filters.page.toString());
  if (filters.sort) params.set('sort', filters.sort);
  if (filters.order) params.set('order', filters.order);
  if (filters.rating) params.set('rating', filters.rating);
  if (filters.tags?.length) params.set('tags', filters.tags.join(','));
  if (filters.minRecs) params.set('minRecs', filters.minRecs.toString());
  if (filters.search) params.set('search', filters.search);
  if (filters.prospect !== undefined) params.set('prospect', filters.prospect.toString());
  
  return params;
}

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * GET /api/models
 * Fetch models with optional filtering, sorting, and pagination
 */
export async function fetchModels(
  filters: FilterState = {}
): Promise<PaginatedResponse<Model>> {
  const params = buildQueryParams(filters);
  const url = `${API_BASE}/models?${params}`;
  return fetchJSON<PaginatedResponse<Model>>(url);
}

/**
 * GET /api/models/:username
 * Fetch a single model by username
 */
export async function fetchModel(username: string): Promise<Model> {
  const url = `${API_BASE}/models/${encodeURIComponent(username)}`;
  return fetchJSON<Model>(url);
}

/**
 * GET /api/dashboard
 * Fetch complete dashboard data
 */
export async function fetchDashboard(): Promise<DashboardData> {
  const url = `${API_BASE}/dashboard`;
  return fetchJSON<DashboardData>(url);
}

/**
 * GET /api/dashboard/cards
 * Fetch optimized model cards (top 50 or specific models)
 */
export async function fetchModelCards(
  usernames?: string[]
): Promise<ModelCardsResponse> {
  const params = usernames?.length 
    ? `?username=${usernames.join(',')}` 
    : '';
  const url = `${API_BASE}/dashboard/cards${params}`;
  return fetchJSON<ModelCardsResponse>(url);
}

/**
 * GET /api/analytics/summary
 * Fetch analytics summary
 */
export async function fetchAnalyticsSummary(): Promise<DashboardSummary> {
  const url = `${API_BASE}/analytics/summary`;
  return fetchJSON<DashboardSummary>(url);
}

/**
 * GET /api/tags
 * Fetch tags with categories and popularity
 */
export async function fetchTags(): Promise<TagsResponse> {
  const url = `${API_BASE}/tags`;
  return fetchJSON<TagsResponse>(url);
}

// ============================================================================
// React Query Hooks (for use with @tanstack/react-query)
// ============================================================================

export const capturegemQueries = {
  models: (filters?: FilterState) => ({
    queryKey: ['models', filters],
    queryFn: () => fetchModels(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  }),
  
  model: (username: string) => ({
    queryKey: ['model', username],
    queryFn: () => fetchModel(username),
    staleTime: 5 * 60 * 1000,
  }),
  
  dashboard: () => ({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
    staleTime: 10 * 60 * 1000, // 10 minutes
  }),
  
  modelCards: (usernames?: string[]) => ({
    queryKey: ['modelCards', usernames],
    queryFn: () => fetchModelCards(usernames),
    staleTime: 5 * 60 * 1000,
  }),
  
  analyticsSummary: () => ({
    queryKey: ['analyticsSummary'],
    queryFn: fetchAnalyticsSummary,
    staleTime: 10 * 60 * 1000,
  }),
  
  tags: () => ({
    queryKey: ['tags'],
    queryFn: fetchTags,
    staleTime: 30 * 60 * 1000, // 30 minutes
  }),
};

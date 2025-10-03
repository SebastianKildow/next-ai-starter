"use client"

import type { DashboardSummary as DashboardSummaryType } from "@/types/model"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Users, DollarSign, Video } from "lucide-react"

interface DashboardSummaryProps {
  summary: DashboardSummaryType
}

export function DashboardSummary({ summary }: DashboardSummaryProps) {
  // Prepare rating distribution data for chart
  const ratingData = Object.entries(summary.ratingDistribution)
    .map(([tier, count]) => ({ tier, count }))
    .filter((d) => d.count > 0)

  // Prepare PVT bucket data for pie chart
  const pvtData = [
    { name: "Budget (≤25)", value: summary.pvtBuckets["<=25"], color: "#10b981" },
    { name: "Standard (26-49)", value: summary.pvtBuckets["26-49"], color: "#3b82f6" },
    { name: "Premium (≥50)", value: summary.pvtBuckets[">=50"], color: "#8b5cf6" },
  ]

  // Top tags
  const topTagsArray = Object.entries(summary.topTags)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)

  return (
    <div className="space-y-4">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-xl border border-neutral-200 border-zinc-700/50 bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-zinc-400">
            <Users className="h-4 w-4" />
            <span className="text-sm">Total Models</span>
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-white">{summary.totalModels}</div>
        </div>

        <div className="rounded-xl border border-neutral-200 border-zinc-700/50 bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-zinc-400">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">Avg Score</span>
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-yellow-400">{summary.averageScore.toFixed(2)}</div>
        </div>

        <div className="rounded-xl border border-neutral-200 border-zinc-700/50 bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-zinc-400">
            <Video className="h-4 w-4" />
            <span className="text-sm">Recordings</span>
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-blue-400">
            {summary.recordingStats.totalRecordings}
          </div>
          <div className="mt-1 text-xs text-zinc-500">Avg: {summary.recordingStats.averagePerModel.toFixed(1)}</div>
        </div>

        <div className="rounded-xl border border-neutral-200 border-zinc-700/50 bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-zinc-400">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm">Auto-Record</span>
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-green-400">
            {summary.recordingStats.autoRecordEnabled}
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Rating Distribution */}
        <div className="rounded-xl border border-neutral-200 border-zinc-700/50 bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 dark:border-neutral-800">
          <h3 className="mb-4 text-sm font-semibold text-zinc-300">Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ratingData}>
              <XAxis dataKey="tier" stroke="#71717a" style={{ fontSize: "12px" }} />
              <YAxis stroke="#71717a" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#27272a",
                  border: "1px solid #3f3f46",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PVT Price Distribution */}
        <div className="rounded-xl border border-neutral-200 border-zinc-700/50 bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 dark:border-neutral-800">
          <h3 className="mb-4 text-sm font-semibold text-zinc-300">PVT Price Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pvtData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                {pvtData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#27272a",
                  border: "1px solid #3f3f46",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex justify-center gap-4 text-xs">
            {pvtData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-1">
                <div className="h-3 w-3 rounded" style={{ backgroundColor: entry.color }} />
                <span className="text-zinc-400">
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Tags */}
      <div className="rounded-xl border border-neutral-200 border-zinc-700/50 bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 dark:border-neutral-800">
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Top Tags</h3>
        <div className="flex flex-wrap gap-2">
          {topTagsArray.map(([tag, count]) => (
            <div key={tag} className="rounded-lg bg-zinc-700/50 px-3 py-1.5 text-sm">
              <span className="font-medium text-white">{tag}</span>
              <span className="ml-2 text-zinc-400">({count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Recorded Models */}
      {summary.recordingStats.topRecordedModels.length > 0 && (
        <div className="rounded-xl border border-neutral-200 border-zinc-700/50 bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 dark:border-neutral-800">
          <h3 className="mb-3 text-sm font-semibold text-zinc-300">Most Recorded</h3>
          <div className="space-y-2">
            {summary.recordingStats.topRecordedModels.slice(0, 5).map((model, i) => (
              <div key={model.username} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-zinc-500">#{i + 1}</span>
                  <span className="text-white">{model.username}</span>
                </div>
                <span className="font-mono text-blue-400">{model.count} recs</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

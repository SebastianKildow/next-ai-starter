"use client"

import React, { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center p-8">
          <div className="max-w-md rounded-2xl border border-red-900/50 bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-900/20">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            
            <h2 className="mb-2 text-2xl font-bold text-white">
              Something went wrong
            </h2>
            
            <p className="mb-6 text-zinc-400">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700"
            >
              <RefreshCw className="h-4 w-4" />
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook-based error UI component
export function ErrorDisplay({ 
  error, 
  reset 
}: { 
  error: Error
  reset?: () => void 
}) {
  return (
    <div className="flex min-h-[300px] items-center justify-center p-6">
      <div className="max-w-md rounded-xl border border-red-900/50 bg-zinc-900/50 p-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-900/20">
          <AlertTriangle className="h-6 w-6 text-red-500" />
        </div>
        
        <h3 className="mb-2 text-lg font-semibold text-white">
          Error Loading Data
        </h3>
        
        <p className="mb-4 text-sm text-zinc-400">
          {error.message || 'Failed to load data. Please try again.'}
        </p>
        
        {reset && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-600"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

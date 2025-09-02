"use client"

import { Suspense, lazy, ComponentType } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface LazyWrapperProps {
  component: () => Promise<{ default: ComponentType<any> }>
  fallback?: React.ReactNode
  props?: Record<string, any>
}

export function LazyWrapper({ component, fallback, props = {} }: LazyWrapperProps) {
  const LazyComponent = lazy(component)
  
  const defaultFallback = (
    <div className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

// Pre-defined lazy components for common use cases
export const LazyGoToTop = lazy(() => import("./go-to-top").then(mod => ({ default: mod.GoToTop })))
export const LazySocialSharing = lazy(() => import("./social-sharing").then(mod => ({ default: mod.SocialSharing })))
export const LazyReadingTime = lazy(() => import("./reading-time").then(mod => ({ default: mod.ReadingTime })))

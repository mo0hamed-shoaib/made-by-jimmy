"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface TouchGesturesProps {
  onPullToRefresh?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

export function TouchGestures({
  onPullToRefresh,
  onSwipeLeft,
  onSwipeRight
}: TouchGesturesProps) {
  const router = useRouter()
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const touchEndRef = useRef<{ x: number; y: number } | null>(null)
  const pullStartRef = useRef<{ y: number; timestamp: number } | null>(null)
  const isPullingRef = useRef(false)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
      
      // Check if we're at the top of the page for pull-to-refresh
      if (window.scrollY === 0) {
        pullStartRef.current = {
          y: e.touches[0].clientY,
          timestamp: Date.now()
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!pullStartRef.current || !isPullingRef.current) return
      
      const currentY = e.touches[0].clientY
      const deltaY = currentY - pullStartRef.current.y
      
      // Only allow downward pull
      if (deltaY > 0 && window.scrollY === 0) {
        isPullingRef.current = true
        // Add visual feedback (you could add a pull indicator here)
        document.body.style.transform = `translateY(${Math.min(deltaY * 0.3, 100)}px)`
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return
      
      touchEndRef.current = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
      
      const deltaX = touchEndRef.current.x - touchStartRef.current.x
      const deltaY = touchEndRef.current.y - touchStartRef.current.y
      const minSwipeDistance = 50
      
      // Reset pull-to-refresh
      if (isPullingRef.current) {
        document.body.style.transform = ''
        isPullingRef.current = false
        
        // Check if pull was sufficient to trigger refresh
        if (deltaY > 100 && Date.now() - (pullStartRef.current?.timestamp || 0) < 1000) {
          onPullToRefresh?.()
        }
      }
      
      // Horizontal swipe detection
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0 && onSwipeRight) {
          // Swipe right - go back
          onSwipeRight()
        } else if (deltaX < 0 && onSwipeLeft) {
          // Swipe left - go forward
          onSwipeLeft()
        }
      }
      
      // Reset touch references
      touchStartRef.current = null
      touchEndRef.current = null
      pullStartRef.current = null
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      // Clean up any transforms
      document.body.style.transform = ''
    }
  }, [onPullToRefresh, onSwipeLeft, onSwipeRight])

  // This component doesn't render anything visible
  return null
}

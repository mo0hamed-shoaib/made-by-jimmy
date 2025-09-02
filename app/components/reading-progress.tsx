"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const [isArticlePage, setIsArticlePage] = useState(false)

  useEffect(() => {
    // Only show on article pages (pages with .prose content)
    const hasProseContent = document.querySelector('.prose') !== null
    setIsArticlePage(hasProseContent)

    if (!hasProseContent) return

    const updateProgress = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(Math.min(scrollPercent, 100))
    }

    window.addEventListener("scroll", updateProgress)
    window.addEventListener("resize", updateProgress)
    
    updateProgress()
    
    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  // Don't render if not on an article page
  if (!isArticlePage) return null

  return (
    <div className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Reading Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-1">
          <div 
            className="h-1 bg-primary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

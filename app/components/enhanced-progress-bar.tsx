"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { FontSizeControls } from "./font-size-controls"
import { WidthToggle } from "./width-toggle"
import { ThemeToggle } from "./theme-toggle"
import { ChevronDown, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { KeyboardShortcuts } from "./keyboard-shortcuts"
import { TouchGestures } from "./touch-gestures"

export function EnhancedProgressBar() {
  const [progress, setProgress] = useState(0)
  const [isArticlePage, setIsArticlePage] = useState(false)
  const [isDockVisible, setIsDockVisible] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Check for article page whenever pathname changes
    const checkForArticlePage = () => {
      const hasProseContent = document.querySelector('.prose') !== null
      const hasArticleContent = document.querySelector('article') !== null
      const isArticle = hasProseContent || hasArticleContent
      
      setIsArticlePage(isArticle)

      if (isArticle) {
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
      }
    }

    // Check immediately
    checkForArticlePage()
    
    // Also check after a delay to ensure DOM is fully loaded
    const timer = setTimeout(checkForArticlePage, 500)
    
    return () => clearTimeout(timer)
  }, [pathname])

  // Don't render if not on an article page
  if (!isArticlePage) return null

  return (
    <>
      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts 
        onToggleDock={() => setIsDockVisible(!isDockVisible)}
      />
      
      {/* Touch Gestures */}
      <TouchGestures 
        onSwipeLeft={() => window.history.forward()}
        onSwipeRight={() => window.history.back()}
      />
      
      {/* Main Dock */}
      <div 
        className={cn(
          "fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out",
          "mb-6 md:mb-8",
          isDockVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        )}
      >
        <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg shadow-black/10">
          {/* Progress Bar */}
          <div className="px-6 pt-4 pb-2">
            <div className="w-full bg-muted rounded-full h-1">
              <div 
                className="h-1 bg-primary rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Controls Bar */}
          <div className="px-6 pb-4 flex items-center justify-end">
            {/* Right: Reading Controls */}
            <div className="flex items-center gap-3">
              <FontSizeControls />
              <WidthToggle />
              <ThemeToggle />
              <button
                onClick={() => setIsDockVisible(false)}
                className="p-1 hover:bg-muted rounded-md transition-colors duration-200"
                aria-label="Hide reading controls"
              >
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Three Dots Button - Shows when dock is hidden */}
      <div 
        className={cn(
          "fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out",
          "mb-6 md:mb-8",
          !isDockVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        )}
      >
        <button
          onClick={() => setIsDockVisible(true)}
          className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-full p-3 shadow-lg shadow-black/10 hover:bg-background/98 transition-all duration-200"
          aria-label="Show reading controls"
        >
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </>
  )
}

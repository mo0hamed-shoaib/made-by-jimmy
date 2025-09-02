"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function SkipToContent() {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  const scrollToContent = () => {
    const mainContent = document.querySelector('main') || document.querySelector('article') || document.querySelector('h1')
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' })
      mainContent.focus()
    }
  }

  return (
    <a
      href="#main-content"
      onClick={scrollToContent}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={cn(
        "absolute left-4 top-4 z-50 px-4 py-2 text-sm font-medium",
        "bg-primary text-primary-foreground rounded-md",
        "transform -translate-y-full focus:translate-y-0",
        "transition-transform duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "hover:bg-primary/90",
        "sr-only focus:not-sr-only"
      )}
      aria-label="Skip to main content"
    >
      Skip to content
    </a>
  )
}

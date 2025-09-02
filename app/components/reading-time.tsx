"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReadingTimeProps {
  className?: string
}

export function ReadingTime({ className }: ReadingTimeProps) {
  const [readingTime, setReadingTime] = useState(0)

  useEffect(() => {
    const calculateReadingTime = () => {
      // Only calculate for article content (prose)
      const proseContent = document.querySelector('.prose')
      if (!proseContent) return

      const text = proseContent.innerText || proseContent.textContent || ""
      const wordCount = text.trim().split(/\s+/).length
      const wordsPerMinute = 200 // Average reading speed
      const estimatedTime = Math.ceil(wordCount / wordsPerMinute)
      setReadingTime(estimatedTime)
    }

    // Calculate after content loads
    const timer = setTimeout(calculateReadingTime, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (readingTime === 0) return null

  return (
    <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
      <Clock className="w-4 h-4" />
      <span>Estimated reading time: <span className="font-medium">{readingTime} min</span></span>
    </div>
  )
}

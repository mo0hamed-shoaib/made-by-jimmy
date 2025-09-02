"use client"

import { cn } from "@/lib/utils"

interface TextHighlighterProps {
  children: React.ReactNode
  className?: string
}

export function TextHighlighter({ children, className }: TextHighlighterProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  )
}

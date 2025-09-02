"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface PageTransitionsProps {
  children: React.ReactNode
}

export function PageTransitions({ children }: PageTransitionsProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsTransitioning(true)
    
    // Small delay to ensure content is ready
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-out",
        isTransitioning 
          ? "opacity-0 translate-y-2" 
          : "opacity-100 translate-y-0"
      )}
    >
      {children}
    </div>
  )
}

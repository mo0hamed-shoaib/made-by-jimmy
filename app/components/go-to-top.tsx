"use client"

import { ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function GoToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <Button
      onClick={scrollToTop}
      variant="ghost"
      size="icon"
      className={cn(
        "fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg bg-background/80 backdrop-blur-sm border border-border/50",
        "hover:scale-110 transition-all duration-200",
        "md:bottom-8 md:right-8 md:w-14 md:h-14",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      aria-label="Go to top of page"
    >
      <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
    </Button>
  )
}

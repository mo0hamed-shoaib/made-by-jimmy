"use client"

import { useState, useEffect } from "react"
import { Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const fontSizes = [
  { id: "xs", name: "Small", size: "text-sm", description: "Compact" },
  { id: "sm", name: "Medium", size: "text-base", description: "Standard" },
  { id: "lg", name: "Large", size: "text-lg", description: "Comfortable" },
  { id: "xl", name: "Extra Large", size: "text-xl", description: "Easy reading" },
  { id: "2xl", name: "Huge", size: "text-2xl", description: "Very large" },
]

export function FontSizeControls() {
  const [currentSize, setCurrentSize] = useState("sm")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedSize = localStorage.getItem("font-size")
    if (savedSize && fontSizes.find(size => size.id === savedSize)) {
      setCurrentSize(savedSize)
      applyFontSize(savedSize)
    }
  }, [])

  const applyFontSize = (sizeId: string) => {
    const selectedSize = fontSizes.find(size => size.id === sizeId)
    if (selectedSize) {
      // Remove all font size classes from prose
      const proseElements = document.querySelectorAll('.prose')
      proseElements.forEach(element => {
        fontSizes.forEach(size => {
          element.classList.remove(size.size)
        })
        element.classList.add(selectedSize.size)
      })
    }
  }

  const handleSizeChange = (sizeId: string) => {
    setCurrentSize(sizeId)
    localStorage.setItem("font-size", sizeId)
    applyFontSize(sizeId)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <Type className="h-4 w-4" />
      </Button>
    )
  }

  const currentSizeData = fontSizes.find(size => size.id === currentSize) || fontSizes[1]

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-9 h-9">
                <Type className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Font Size: {currentSizeData.name}</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-48">
          {fontSizes.map((size) => {
            const isActive = currentSize === size.id
            return (
              <DropdownMenuItem
                key={size.id}
                onClick={() => handleSizeChange(size.id)}
                className={cn(
                  "flex items-center gap-3 cursor-pointer",
                  isActive && "bg-accent"
                )}
              >
                <span className="text-sm">{size.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">{size.description}</span>
                {isActive && (
                  <div className="ml-2 w-2 h-2 rounded-full bg-primary" />
                )}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}

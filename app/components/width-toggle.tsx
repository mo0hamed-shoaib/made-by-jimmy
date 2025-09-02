"use client"

import { Maximize2, Monitor, Smartphone, Tablet, MonitorSmartphone } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const widthOptions = [
  { 
    id: "narrow", 
    name: "Narrow", 
    description: "Mobile-friendly", 
    icon: Smartphone,
    width: "max-w-2xl" 
  },
  { 
    id: "medium", 
    name: "Medium", 
    description: "Optimal reading", 
    icon: Tablet,
    width: "max-w-4xl" 
  },
  { 
    id: "wide", 
    name: "Wide", 
    description: "Large screens", 
    icon: Monitor,
    width: "max-w-6xl" 
  },
  { 
    id: "full", 
    name: "Full", 
    description: "Maximum width", 
    icon: Maximize2,
    width: "max-w-full" 
  },
]

export function WidthToggle() {
  const [currentWidth, setCurrentWidth] = useState("medium")
  const [mounted, setMounted] = useState(false)

  const applyWidth = (widthId: string) => {
    // Apply width to article content containers
    const articleContent = document.querySelectorAll('[data-article-content]')
    if (articleContent.length > 0) {
      // Remove all width classes
      articleContent.forEach(element => {
        widthOptions.forEach(option => {
          element.classList.remove(option.width)
        })
      })
      
      // Add new width class
      const selectedOption = widthOptions.find(opt => opt.id === widthId)
      if (selectedOption) {
        articleContent.forEach(element => {
          element.classList.add(selectedOption.width)
        })
      }
    }

    // Also apply width to prose container for text content
    const proseContainer = document.querySelector('.prose')
    if (proseContainer) {
      // Remove all width classes
      widthOptions.forEach(option => {
        proseContainer.classList.remove(option.width)
      })
      
      // Add new width class
      const selectedOption = widthOptions.find(opt => opt.id === widthId)
      if (selectedOption) {
        proseContainer.classList.add(selectedOption.width)
      }
    }
  }

  useEffect(() => {
    setMounted(true)
    // Load saved preference
    const savedWidth = localStorage.getItem("article-width")
    if (savedWidth && widthOptions.find(opt => opt.id === savedWidth)) {
      setCurrentWidth(savedWidth)
      // Apply the saved width after a short delay to ensure DOM is ready
      setTimeout(() => applyWidth(savedWidth), 100)
    } else {
      // Apply default medium width
      setTimeout(() => applyWidth("medium"), 100)
    }
  }, [])

  const handleWidthChange = (widthId: string) => {
    setCurrentWidth(widthId)
    localStorage.setItem("article-width", widthId)
    applyWidth(widthId)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <Maximize2 className="h-4 w-4" />
      </Button>
    )
  }

  const currentOption = widthOptions.find(opt => opt.id === currentWidth) || widthOptions[1]
  const CurrentIcon = currentOption.icon

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-9 h-9 hover:scale-105 transition-transform duration-200">
                <CurrentIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Content Width: {currentOption.name}</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-56">
          {widthOptions.map((option) => {
            const OptionIcon = option.icon
            const isActive = currentWidth === option.id
            
            return (
              <DropdownMenuItem
                key={option.id}
                onClick={() => handleWidthChange(option.id)}
                className={cn(
                  "flex items-center gap-3 cursor-pointer",
                  isActive && "bg-accent"
                )}
              >
                <OptionIcon className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{option.name}</span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </div>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                )}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}

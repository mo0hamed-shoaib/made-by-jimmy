"use client"

import { Palette, Sun, Moon, Droplets, Coffee, Leaf, Sparkles, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const themes = [
  { id: "light", name: "Light", icon: Sun },
  { id: "dark", name: "Dark", icon: Moon },
  { id: "blue", name: "Blue", icon: Droplets },
  { id: "cream", name: "Cream", icon: Coffee },
  { id: "mint", name: "Mint", icon: Leaf },
  { id: "lavender", name: "Lavender", icon: Sparkles },
]

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <Palette className="h-4 w-4" />
      </Button>
    )
  }

  const currentTheme = themes.find(t => t.id === theme) || themes[0]
  const CurrentIcon = currentTheme.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 h-9 hover:scale-105 transition-transform duration-200">
          <CurrentIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {themes.map((themeOption) => {
          const ThemeIcon = themeOption.icon
          const isActive = theme === themeOption.id
          
          return (
            <DropdownMenuItem
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className={cn(
                "flex items-center gap-3 cursor-pointer",
                isActive && "bg-accent"
              )}
            >
              <ThemeIcon className="h-4 w-4" />
              <span className="text-sm">{themeOption.name}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

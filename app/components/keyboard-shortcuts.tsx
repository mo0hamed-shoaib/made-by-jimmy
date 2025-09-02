"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface KeyboardShortcutsProps {
  onScrollUp?: () => void
  onScrollDown?: () => void
  onToggleDock?: () => void
}

export function KeyboardShortcuts({
  onScrollUp,
  onScrollDown,
  onToggleDock
}: KeyboardShortcutsProps) {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Prevent default for navigation shortcuts
      if (['j', 'k', ' ', 'h', 'l'].includes(e.key)) {
        e.preventDefault()
      }

      switch (e.key) {
        case 'j':
        case 'ArrowDown':
          // Scroll down
          if (onScrollDown) {
            onScrollDown()
          } else {
            window.scrollBy({ top: 100, behavior: 'smooth' })
          }
          break

        case 'k':
        case 'ArrowUp':
          // Scroll up
          if (onScrollUp) {
            onScrollUp()
          } else {
            window.scrollBy({ top: -100, behavior: 'smooth' })
          }
          break

        case ' ':
          // Space bar - scroll down one page
          e.preventDefault()
          window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })
          break

        case 'h':
        case 'ArrowLeft':
          // Navigate back
          if (window.history.length > 1) {
            router.back()
          }
          break

        case 'l':
        case 'ArrowRight':
          // Navigate forward
          router.forward()
          break

        case 'g':
          // Go to top
          window.scrollTo({ top: 0, behavior: 'smooth' })
          break

        case 'G':
          // Go to bottom
          window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
          break

        case 'd':
          // Toggle dock
          if (onToggleDock) {
            onToggleDock()
          }
          break

        case '?':
          // Show help (you could implement a help modal)
          console.log('Keyboard Shortcuts: j/k (scroll), space (page), g/G (top/bottom), h/l (back/forward), d (dock)')
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [router, onScrollUp, onScrollDown, onToggleDock])

  // This component doesn't render anything visible
  return null
}

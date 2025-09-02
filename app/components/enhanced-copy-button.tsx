"use client"

import { useState } from "react"
import { Check, Copy, FileCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EnhancedCopyButtonProps {
  code: string
  language?: string
  className?: string
  showLanguage?: boolean
}

export function EnhancedCopyButton({ 
  code, 
  language, 
  className,
  showLanguage = true 
}: EnhancedCopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Error copying to clipboard", error)
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = code
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showLanguage && language && (
        <div className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-muted-foreground bg-muted rounded">
          <FileCode className="w-3 h-3" />
          <span className="hidden sm:inline">{language}</span>
        </div>
      )}
      <Button
        onClick={copyToClipboard}
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 transition-all duration-200",
          copied 
            ? "text-green-600 hover:text-green-700" 
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label={copied ? "Copied!" : "Copy code"}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Copy</span>
          </>
        )}
      </Button>
    </div>
  )
}

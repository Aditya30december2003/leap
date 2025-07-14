"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [isDark])

  return (
    <Button
      onClick={() => setIsDark(!isDark)}
      variant="outline"
      size="icon"
      className="relative w-12 h-12 rounded-full border-2 border-cyan-400/50 bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300"
    >
      {/* Circuit-style background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 via-blue-500/20 to-green-500/20 opacity-50" />

      {/* Icon */}
      <div className="relative z-10">
        {isDark ? (
          <Sun className="h-5 w-5 text-yellow-400 transition-transform duration-300 rotate-0" />
        ) : (
          <Moon className="h-5 w-5 text-blue-400 transition-transform duration-300 rotate-180" />
        )}
      </div>

      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          isDark ? "bg-yellow-400/20" : "bg-blue-400/20"
        } opacity-0 hover:opacity-100`}
      />
    </Button>
  )
}

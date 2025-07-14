"use client"
import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Calendar, Zap } from "lucide-react"
import { WorkflowAnimation } from "../components/workflowanimation"

export function HeroSection() {
  const [glitchText, setGlitchText] = useState("Just automate it with Leap")

  useEffect(() => {
    const interval = setInterval(() => {
      const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
      const originalText = "Just automate it with Leap"
      let glitched = originalText

      if (Math.random() > 0.95) {
        const randomIndex = Math.floor(Math.random() * originalText.length)
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
        glitched = originalText.substring(0, randomIndex) + randomChar + originalText.substring(randomIndex + 1)
        setGlitchText(glitched)
        setTimeout(() => setGlitchText(originalText), 100)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 bg-black overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-red-800/20 via-black to-black z-0" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4 mt-12">
          <span className="inline-block">{glitchText}</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-8">
          The workflow and website builder loved by founders, startups, and solo makers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 text-lg rounded-full">
            <Calendar className="mr-2 h-5 w-5" />
            Schedule a Demo
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white font-bold px-8 py-4 text-lg rounded-full bg-transparent"
          >
            <Zap className="mr-2 h-5 w-5" />
            Explore Features
          </Button>
        </div>

        {/* Screen-like Product Preview with Workflow Animation */}
        <div className="relative w-full lg:w-[75%] mx-auto">
          {/* Screen Frame */}
          <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-red-900/50">
            {/* Screen Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-gray-700 rounded px-3 py-1 text-sm text-gray-300 text-left ml-4">
                leap-workflow-builder.app
              </div>
            </div>

            {/* Screen Content */}
            <div className="bg-black rounded-lg overflow-hidden border border-red-900/30 h-[400px] relative">
              <WorkflowAnimation/>
            </div>
          </div>

          {/* Screen Glow Effect */}
          <div className="absolute inset-0 bg-red-600/20 rounded-2xl blur-xl -z-10 animate-pulse"></div>
        </div>
      </div>

      {/* Red Glow Underline */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[4px] w-48 bg-red-600 blur-lg animate-pulse z-0" />
    </section>
  )
}

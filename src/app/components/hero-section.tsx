"use client";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Calendar, Zap } from "lucide-react";
import MorphToAI from "@/app/components/MorphToAI";
import SubtleBg3D from "./SubtleBg3D";

export function HeroSection() {
  const [glitchText, setGlitchText] = useState("Just automate it with Phoenix");

  useEffect(() => {
    // Initialize AOS
    const initAOS = async () => {
      const AOS = (await import("aos")).default;
      AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out-cubic',
      });
    };
    initAOS();

    // Glitch effect
    const interval = setInterval(() => {
      const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      const originalText = "Just automate it with Phoenix";
      if (Math.random() > 0.95) {
        const i = Math.floor(Math.random() * originalText.length);
        const c = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        const g = originalText.substring(0, i) + c + originalText.substring(i + 1);
        setGlitchText(g);
        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 lg:px-8 py-20 overflow-hidden bg-black"
    >
      {/* ONE shapurple background for both sides (no seam) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(80%_60%_at_20%_40%,rgba(168,85,247,0.18),rgba(0,0,0,0.6)_60%,#000_100%)]" />

      <SubtleBg3D />

      {/* LEFT: content */}
      <div className="relative z-10 w-full lg:w-1/2 max-w-2xl text-center lg:text-left">
        <h1 
          className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <span className="inline-block">{glitchText}</span>
        </h1>
        <p 
          className="text-xl md:text-2xl text-gray-400 mb-8"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          The workflow and website builder loved by founders, startups, and solo makers.
        </p>
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 text-lg rounded-full transform transition-all duration-300 hover:scale-105">
            <Calendar className="mr-2 h-5 w-5" />
            Schedule a Demo
          </Button>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white font-bold px-8 py-4 text-lg rounded-full bg-transparent transform transition-all duration-300 hover:scale-105"
          >
            <Zap className="mr-2 h-5 w-5" />
            Explore Features
          </Button>
        </div>
      </div>

      {/* RIGHT: animation */}
      <div 
        className="relative z-10 w-full lg:w-1/2 mt-12 lg:mt-0"
        data-aos="fade-left"
        data-aos-delay="800"
        data-aos-duration="1000"
      >
        <MorphToAI />
      </div>
    </section>
  );
}
// HeroSection.tsx
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Calendar, Zap } from "lucide-react";
import BackgroundNetwork from "./MorphToAI";
import SubtleBg3D from "./SubtleBg3D";

// ⬇️ Add this:
import { Orbitron } from "next/font/google";
const phoenixFont = Orbitron({ subsets: ["latin"], weight: ["700"] });
export function HeroSection() {
  // Glitch only the left part, keep "Phoenix" separate
  const baseText = "Rise Above the Manual Mess, Rise with";
  const [glitchText, setGlitchText] = useState(baseText);

  useEffect(() => {
    const initAOS = async () => {
      const AOS = (await import("aos")).default;
      AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
    };
    initAOS();

    const interval = setInterval(() => {
      const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      if (Math.random() > 0.95) {
        const i = Math.floor(Math.random() * baseText.length);
        const c = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        const g = baseText.substring(0, i) + c + baseText.substring(i + 1);
        setGlitchText(g);
        setTimeout(() => setGlitchText(baseText), 100);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 lg:px-8 py-20 overflow-hidden bg-black"
    >
      <div className="pointer-events-none absolute inset-0 -z-0">
        <BackgroundNetwork />
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(80%_60%_at_20%_40%,rgba(168,85,247,0.18),rgba(0,0,0,0.6)_60%,#000_100%)]" />
      <SubtleBg3D />

      {/* LEFT: content */}
      <div className="relative z-10 w-full lg:w-1/2 max-w-2xl text-center lg:text-left">
        <h1
          className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Glitchable part */}
          <span className="inline-block">{glitchText} </span>
          {/* Styled “Phoenix” */}
          <span
            className={`${phoenixFont.className} inline-block tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-400 to-purple-200 drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]`}
          >
            PhoenixLabs
          </span>
        </h1>

        <p
          className="text-lg md:text-2xl text-gray-300 font-bold mb-8"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Full-cycle AI implementation agency loved by founders and solo makers,
          helping them automate, build and distribute.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 text-lg rounded-full transform transition-all duration-300 hover:scale-105">
            <Calendar className="mr-2 h-5 w-5" />
            <a href="#book">Schedule a Demo</a>
          </Button>

          <Button
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white font-bold px-8 py-4 text-lg rounded-full bg-transparent transform transition-all duration-300 hover:scale-105"
          >
            <Zap className="mr-2 h-5 w-5" />
            <a href="#services">Explore Services</a>
          </Button>
        </div>
      </div>

      {/* RIGHT: empty slot kept for layout parity */}
      <div
        className="relative z-10 w-full lg:w-1/2 mt-12 lg:mt-0"
        data-aos="fade-left"
        data-aos-delay="800"
        data-aos-duration="1000"
      />
    </section>
  );
}

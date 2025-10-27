"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";

export default function LokiIntro({ children }: { children: React.ReactNode }) {
  const LETTERS = 7; // P H O E N I X
  const [currentLetters, setCurrentLetters] = useState<string[]>(
    Array(LETTERS).fill("") // keep blanks so we can size per-letter without jump
  );
  const [isComplete, setIsComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  // Writing systems for each letter of PHOENIX
  const letterSystems = [
    ["P", "Φ", "Π", "𐤐", "П", "ᛒ", "ᛈ", "פ", "ف", "Ｐ"],
    ["H", "Η", "ㅎ", "Հ", "ᚺ", "𐌇", "ᚺ", "ה", "ه", "Ｈ"],
    ["O", "Ω", "Ⲟ", "Օ", "ᛟ", "𐍉", "ᛟ", "וֹ", "و", "Ｏ"],
    ["E", "Ε", "Є", "𐌄", "ᛖ", "エ", "ᛖ", "е", "ي", "Ｅ"],
    ["N", "Ν", "ᠨ", "Ո", "ᚾ", "ナ", "ᚾ", "נ", "ن", "Ｎ"],
    ["I", "Ι", "丨", "Ӏ", "ᛁ", "イ", "ᛁ", "ي", "ي", "Ｉ"],
    ["X", "Χ", "乂", "Ӿ", "ᛪ", "メ", "ᛪ", "كس", "خ", "Ｘ"],
  ];

  useEffect(() => {
    let currentIndex = 0;
    const totalStages = 70;
    let currentLetterIndex = 0;

    const advanceStage = () => {
      if (currentIndex < totalStages) {
        const newLetters = [...currentLetters];
        const system = letterSystems[currentLetterIndex];
        const char = system[Math.floor(Math.random() * system.length)];
        newLetters[currentLetterIndex] = char;
        setCurrentLetters(newLetters);

        currentIndex++;

        // move focus letter after some changes
        if (currentIndex % 10 === 0) {
          currentLetterIndex = (currentLetterIndex + 1) % LETTERS;
        }

        const delay = currentIndex < 40 ? 120 : 80;
        const t = window.setTimeout(advanceStage, delay);
        timeoutsRef.current.push(t);
      } else {
        // lock to PHOENIX
        setCurrentLetters(["P", "H", "O", "E", "N", "I", "X"]);
        setIsComplete(true);
        const t = window.setTimeout(() => setShowContent(true), 1500);
        timeoutsRef.current.push(t);
      }
    };

    const start = window.setTimeout(advanceStage, 500);
    timeoutsRef.current.push(start);

    return () => {
      // clear pending timers on unmount
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generate particle props once (no re-randomizing on rerenders)
  const particles = useMemo(() => {
    return Array.from({ length: 26 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${(i * 0.35).toFixed(2)}s`,
      duration: `${(10 + Math.random() * 8).toFixed(2)}s`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: 0.25 + Math.random() * 0.25,
    }));
  }, []);

  if (showContent) return <>{children}</>;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
      style={{
        padding:
          "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)",
      }}
    >
      {/* Title sequence */}
      <div className="relative z-10 w-full px-3 sm:px-6">
        <div
          className="mx-auto flex items-center justify-center"
          style={{
            gap: "clamp(6px, 2.5vw, 28px)", // responsive spacing
            maxWidth: "min(92vw, 1200px)", // contain within viewport
          }}
        >
          {currentLetters.map((char, idx) => (
            <div key={idx} className="transition-all duration-200">
              <div
                className="font-bold text-center select-none"
                style={{
                  // Responsive font-size that always fits mobile width
                  fontSize: "clamp(36px, 12vw, 120px)",
                  lineHeight: 1,
                  // Each letter box gets a responsive width so the row fits on very small screens
                  minWidth: "clamp(32px, 12vw, 120px)",
                  color: "#a855f7",
                  textShadow: isComplete
                    ? "0 0 12px #a855f7, 0 0 24px #a855f7, 0 0 40px rgba(168,85,247,.65)"
                    : "0 0 8px #a855f7",
                  opacity: char ? 1 : 0,
                  transform: `scale(${isComplete ? 1.06 : 1})`,
                  transition: "opacity .2s ease, transform .3s ease",
                  letterSpacing: "0.02em",
                }}
              >
                {char || "\u00A0" /* keep width when blank */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle purple particles (responsive, low-contrast) */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: "rgba(168,85,247,0.55)",
              filter: "drop-shadow(0 0 6px rgba(168,85,247,0.6))",
              opacity: p.opacity,
              animation: `floatY ${p.duration} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Local keyframes for floating dots */}
      <style jsx>{`
        @keyframes floatY {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-18px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";

export default function LokiIntro({ children }: { children: React.ReactNode }) {
  const [currentLetters, setCurrentLetters] = useState<string[]>(Array(7).fill(""));
  const [isComplete, setIsComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Writing systems for each letter of PHOENIX
  const letterSystems = [
    // P - Different writing systems
    ["P", "Φ", "Π", "𐤐", "П", "ᛒ", "ᛈ", "פ", "ف", "Ｐ"],
    // H - Different writing systems  
    ["H", "Η", "ㅎ", "Հ", "ᚺ", "𐌇", "ᚺ", "ה", "ه", "Ｈ"],
    // O - Different writing systems
    ["O", "Ω", "Ⲟ", "Օ", "ᛟ", "𐍉", "ᛟ", "וֹ", "و", "Ｏ"],
    // E - Different writing systems
    ["E", "Ε", "Є", "𐌄", "ᛖ", "エ", "ᛖ", "е", "ي", "Ｅ"],
    // N - Different writing systems
    ["N", "Ν", "ᠨ", "Ո", "ᚾ", "ナ", "ᚾ", "נ", "ن", "Ｎ"],
    // I - Different writing systems
    ["I", "Ι", "丨", "Ӏ", "ᛁ", "イ", "ᛁ", "ي", "ي", "Ｉ"],
    // X - Different writing systems
    ["X", "Χ", "乂", "Ӿ", "ᛪ", "メ", "ᛪ", "كس", "خ", "Ｘ"],
  ];

  useEffect(() => {
    let currentIndex = 0;
    const totalStages = 70; // 10 seconds with fast changes
    let currentLetterIndex = 0;
    
    const advanceStage = () => {
      if (currentIndex < totalStages) {
        // Focus on one letter at a time
        const newLetters = [...currentLetters];
        
        // Change only the current focused letter rapidly
        const currentSystem = letterSystems[currentLetterIndex];
        const randomCharIndex = Math.floor(Math.random() * currentSystem.length);
        newLetters[currentLetterIndex] = currentSystem[randomCharIndex];
        
        setCurrentLetters(newLetters);
        
        currentIndex++;
        
        // Move to next letter after some changes
        if (currentIndex % 10 === 0) {
          currentLetterIndex = (currentLetterIndex + 1) % 7;
        }
        
        // Speed up as we progress
        const delay = currentIndex < 40 ? 120 : 80;
        setTimeout(advanceStage, delay);
      } else {
        // Final stage - show PHOENIX clearly
        setCurrentLetters(["P", "H", "O", "E", "N", "I", "X"]);
        setIsComplete(true);
        
        // After showing the final text, wait a bit then show main content
        setTimeout(() => {
          setShowContent(true);
        }, 1500);
      }
    };

    // Start the sequence
    setTimeout(advanceStage, 500);
  }, []);

  // If intro is complete and we should show content, render children
  if (showContent) {
    return <>{children}</>;
  }

  // Otherwise show the intro animation
  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      {/* Main title sequence - one letter changing at a time */}
      <div className="relative z-10">
        <div className="flex space-x-4 md:space-x-8 items-center justify-center">
          {currentLetters.map((char, index) => (
            <div
              key={index}
              className="transition-all duration-200"
            >
              <div 
                className="text-5xl md:text-8xl lg:text-9xl font-bold mb-2 min-w-[70px] text-center"
                style={{
                  color: isComplete ? '#a855f7' : '#a855f7',
                  textShadow: isComplete ? 
                    '0 0 20px #a855f7, 0 0 40px #a855f7' : 
                    '0 0 10px #a855f7',
                  opacity: char ? 1 : 0,
                  transform: `scale(${isComplete ? 1.1 : 1})`,
                  transition: 'all 0.3s ease-out'
                }}
              >
                {char}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple purple particles in background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.4
            }}
          />
        ))}
      </div>
    </div>
  );
}
"use client";
import React, { useState, useEffect } from "react";

export default function LokiIntro() {
  const [currentStage, setCurrentStage] = useState(0);
  const [displayText, setDisplayText] = useState<string[]>(Array(7).fill(""));

  // Multiple writing systems for chaotic transitions
  const allWritingSystems = [
    // Greek
    ["Φ", "Η", "Ω", "Ε", "Ν", "Ι", "Χ"],
    // Sanskrit/Hindi
    ["प", "ह", "ओ", "ए", "न", "इ", "क्ष"],
    // Egyptian Hieroglyphs
    ["𓊪", "𓎛", "𓄿", "𓂋", "𓈖", "𓇋", "𓎡"],
    // Norse Runes
    ["ᛈ", "ᚺ", "ᛟ", "ᛖ", "ᚾ", "ᛁ", "ᛪ"],
    // Arabic
    ["ف", "ه", "و", "ي", "ن", "ي", "خ"],
    // Chinese
    ["鳳", "火", "鳥", "復", "活", "神", "獸"],
    // Japanese
    ["フ", "ェ", "ニ", "ッ", "ク", "ス", "🔥"],
    // Cyrillic
    ["П", "Х", "О", "Е", "Н", "И", "КС"],
    // Hebrew
    ["פ", "ה", "ו", "נ", "י", "ק", "ס"],
    // Random symbols
    ["⚡", "🔥", "🌌", "💫", "🌀", "🌠", "✨"],
  ];

  useEffect(() => {
    let stage = 0;
    
    const advanceStage = () => {
      if (stage < 100) { // More stages for rapid changes
        setCurrentStage(stage);
        
        // Rapid chaotic changes - every stage changes the display
        const randomSystem = Math.floor(Math.random() * allWritingSystems.length);
        setDisplayText(allWritingSystems[randomSystem]);
        
        stage++;
        
        // Very fast transitions - gets faster over time
        const delay = stage < 30 ? 150 : 
                     stage < 60 ? 80 : 
                     stage < 80 ? 40 : 20;
        
        setTimeout(advanceStage, delay);
      } else {
        // Final stage - show PHOENIX clearly
        setDisplayText(["P", "H", "O", "E", "N", "I", "X"]);
      }
    };

    advanceStage();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      {/* Animated background with purple/green temporal effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-green-900/30 to-purple-900/20 animate-pulse" />
      
      {/* Swirling temporal particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.7
            }}
          />
        ))}
        {[...Array(30)].map((_, i) => (
          <div
            key={i + 50}
            className="absolute w-1 h-1 bg-green-400 rounded-full animate-float-reverse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              opacity: 0.5
            }}
          />
        ))}
      </div>

      {/* Main title sequence with rapid changes */}
      <div className="relative z-10">
        <div className="flex space-x-2 md:space-x-6 items-center justify-center">
          {displayText.map((char, index) => (
            <div
              key={index}
              className="transform transition-all duration-75"
              style={{
                transform: `scale(${1 + Math.random() * 0.3}) rotate(${Math.random() * 10 - 5}deg)`,
              }}
            >
              <div 
                className="text-4xl md:text-7xl lg:text-8xl font-bold mb-2 min-w-[50px] text-center transition-colors duration-75"
                style={{
                  color: currentStage >= 90 ? '#ffffff' : 
                         Math.random() > 0.5 ? '#a855f7' : '#10b981',
                  textShadow: currentStage >= 90 ? 
                    '0 0 20px #a855f7, 0 0 40px #10b981' : 
                    `0 0 ${5 + Math.random() * 15}px ${Math.random() > 0.5 ? '#a855f7' : '#10b981'}`
                }}
              >
                {char}
              </div>
            </div>
          ))}
        </div>

        {/* Final subtitle */}
        {currentStage >= 90 && (
          <div className="mt-12 text-center animate-fadeInUp">
            <div 
              className="text-lg md:text-xl tracking-widest uppercase font-light"
              style={{
                color: '#c084fc',
                textShadow: '0 0 10px #a855f7, 0 0 20px #10b981'
              }}
            >
              Rising From The Ashes
            </div>
          </div>
        )}
      </div>

      {/* Timeline progress bar */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-purple-900/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-green-400 transition-all duration-100"
          style={{ width: `${(currentStage / 100) * 100}%` }}
        />
      </div>

      {/* Temporal distortion effects */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, transparent 20%, purple 70%)`,
          animation: 'pulse 2s infinite'
        }}
      />
    </div>
  );
}
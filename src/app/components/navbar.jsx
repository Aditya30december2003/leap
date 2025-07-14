"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isFlickering, setIsFlickering] = useState(true);

  useEffect(() => {
    // Simulate realistic tube light flickering on load - slower and more authentic
    const flickerSequence = [
      { delay: 0, duration: 200, on: false },
      { delay: 200, duration: 150, on: true },
      { delay: 350, duration: 100, on: false },
      { delay: 450, duration: 80, on: true },
      { delay: 530, duration: 120, on: false },
      { delay: 650, duration: 200, on: true },
      { delay: 850, duration: 60, on: false },
      { delay: 910, duration: 40, on: true },
      { delay: 950, duration: 80, on: false },
      { delay: 1030, duration: 300, on: true },
      { delay: 1330, duration: 100, on: false },
      { delay: 1430, duration: 150, on: true },
      { delay: 1580, duration: 50, on: false },
      { delay: 1630, duration: 0, on: true, final: true }
    ];

    flickerSequence.forEach(({ delay, duration, on, final }) => {
      setTimeout(() => {
        setIsFlickering(!on);
        if (final) {
          // Occasional random flickers after initial sequence
          const randomFlicker = () => {
            if (Math.random() < 0.03) { // 3% chance every 5 seconds
              setIsFlickering(true);
              setTimeout(() => setIsFlickering(false), 80 + Math.random() * 150);
            }
          };
          setInterval(randomFlicker, 5000);
        }
      }, delay);
    });
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Pricing", href: "#pricing" },
    { name: "Book a Call", href: "#book" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50  text-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-4 md:px-8 lg:px-12 bg-black">
        {/* Logo with tube light effect */}
        <div className="font-bold relative " style={{ fontSize: 'clamp(1.5rem, 4vw, 5rem)' }}>
          <span 
            className={`relative transition-all duration-100 ${
              isFlickering 
                ? 'text-gray-500' 
                : 'text-red-400'
            }`}
            style={{
              textShadow: isFlickering 
                ? 'none' 
                : `
                  0 0 5px #ff0000,
                  0 0 10px #ff0000,
                  0 0 15px #ff0000,
                  0 0 20px #ff0000,
                  0 0 25px #ff0000,
                  0 0 30px #ff0000,
                  0 0 35px #ff0000
                `
            }}
          >
            Leap
          </span>
          {/* Tube light underline */}
          {/* <div 
            className={`absolute bottom-[-6px] md:bottom-[-8px] lg:bottom-[-10px] left-0 w-full h-[2px] md:h-[3px] lg:h-[4px] rounded-full transition-all duration-100 ${
              isFlickering 
                ? 'bg-gray-700 shadow-none' 
                : 'bg-red-500 shadow-[0_0_10px_#ff0000,0_0_20px_#ff0000,0_0_30px_#ff0000]'
            }`}
          /> */}
          {/* Additional glow elements for tube light effect */}
          {!isFlickering && (
            <>
              <div className="absolute -inset-1 bg-red-500 opacity-20 blur-sm rounded" />
              <div className="absolute -inset-2 bg-red-600 opacity-10 blur-md rounded" />
            </>
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm lg:text-base hover:text-red-400 transition-colors duration-200 font-medium"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-white text-black text-sm lg:text-base font-semibold px-4 lg:px-6 py-2 lg:py-2.5 rounded-full hover:bg-red-500 hover:text-white transition-all duration-200 ml-2">
            Get Started
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white hover:text-red-400 transition-colors duration-200"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden bg-black px-4 py-6 space-y-4 absolute w-full left-0 top-full z-40 border-t border-gray-800 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-base hover:text-red-400 transition-colors duration-200 font-medium py-2"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button 
            className="w-full bg-white text-black text-base font-semibold px-4 py-3 rounded-full hover:bg-red-500 hover:text-white transition-all duration-200 mt-4"
            onClick={() => setOpen(false)}
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
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
    { name: "Pricing", href: "#pricing" },
    { name: "Book a Call", href: "#book" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 text-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-4 md:px-8 lg:px-12 bg-black">
        {/* Logo and left-aligned nav items */}
        <div className="flex items-center gap-8 lg:gap-12">
          {/* Logo */}
          <div className="font-bold relative">
            <span className="text-white font-bold text-[1.3rem] md:text-[3rem]">
              Phoenix
            </span>
          </div>

          {/* Desktop Nav - Left aligned with logo */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm lg:text-base hover:text-purple-400 transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Right side - Book a Call with purple highlight */}
        <div className="hidden md:block">
          <a
            href="#book"
            className="bg-purple-500 text-white text-sm lg:text-base font-semibold px-4 lg:px-6 py-2 lg:py-2.5 rounded-full hover:bg-purple-700 transition-all duration-200"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white hover:text-purple-400 transition-colors duration-200"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden bg-black px-4 py-6 space-y-4 absolute w-full left-0 top-full z-40 border-t border-gray-800 shadow-lg">
          {navLinks.slice(0, 3).map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-base hover:text-purple-400 transition-colors duration-200 font-medium py-2"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </a>
          ))}
          {/* Mobile Book a Call with highlight */}
          <a
            href="#book"
            className="block w-full bg-purple-500 text-white text-base font-semibold px-4 py-3 rounded-full hover:bg-purple-700 transition-all duration-200 text-center mt-4"
            onClick={() => setOpen(false)}
          >
            Book a Call
          </a>
        </div>
      )}
    </header>
  );
}
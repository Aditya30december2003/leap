"use client";

import React, { useEffect } from "react";

const data = [
  {
    id: 1,
    name: "Rhea Kapoor",
    role: "Founder, Lumi Studios",
    quote: "Phoenix helped us cut onboarding time in half. The UI feels premium and the support was exceptional.",
    rating: 5,
    initials: "RK",
  },
  {
    id: 2,
    name: "Samir Verma",
    role: "Head of Product, CineFlow",
    quote: "We saw immediate lift in engagement after launching the new referral flow — shipped production-ready features lightning fast.",
    rating: 5,
    initials: "SV",
    featured: true,
  },
  {
    id: 3,
    name: "Leah Martinez",
    role: "Creative Director, FrameLab",
    quote: "The analytics dashboard is gorgeous and actionable. Design + performance — exactly what we'd hoped for.",
    rating: 5,
    initials: "LM",
  },
];

function StarRating({ rating = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-purple-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.37 2.448c-.785.57-1.84-.197-1.54-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.643 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
        </svg>
      ))}
    </div>
  );
}
 
export default function Testimonials() {
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
  }, []);

  return (
    <section className="py-16 px-6 bg-black">
      <div 
        className="max-w-4xl mx-auto text-center mb-12"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Loved by teams worldwide
        </h2>
        <p 
          className="text-gray-400 text-lg max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          See how teams are transforming their workflow with our platform.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`
              relative p-6 rounded-xl border transform transition-all duration-300 hover:scale-105
              ${testimonial.featured 
                ? "bg-gray-900 border-purple-500/30 shadow-lg shadow-purple-500/10 scale-105" 
                : "bg-gray-900/50 border-gray-800"
              }
            `}
            data-aos="fade-up"
            data-aos-delay={500 + (index * 200)}
            data-aos-duration="800"
          >
            {testimonial.featured && (
              <div 
                className="absolute -top-3 left-1/2 -translate-x-1/2"
                data-aos="zoom-in"
                data-aos-delay="800"
              >
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium transform transition-transform duration-300 hover:scale-110">
                  Featured
                </span>
              </div>
            )}

            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div 
                className={`
                  w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold transform transition-transform duration-300 hover:scale-110
                  ${testimonial.featured ? "bg-purple-600" : "bg-gray-800"}
                `}
                data-aos="zoom-in"
                data-aos-delay={700 + (index * 200)}
              >
                {testimonial.initials}
              </div>
              <div className="flex-1 text-left">
                <h3 
                  className="text-white font-semibold"
                  data-aos="fade-right"
                  data-aos-delay={800 + (index * 200)}
                >
                  {testimonial.name}
                </h3>
                <p 
                  className="text-gray-400 text-sm"
                  data-aos="fade-right"
                  data-aos-delay={900 + (index * 200)}
                >
                  {testimonial.role}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div 
              className="mb-4"
              data-aos="fade-up"
              data-aos-delay={1000 + (index * 200)}
            >
              <StarRating rating={testimonial.rating} />
            </div>

            {/* Quote */}
            <blockquote 
              className="text-gray-300 text-sm leading-relaxed mb-6"
              data-aos="fade-up"
              data-aos-delay={1100 + (index * 200)}
            >
              {testimonial.quote}
            </blockquote>

            {/* Footer */}
            <div 
              className="flex items-center justify-between"
              data-aos="fade-up"
              data-aos-delay={1200 + (index * 200)}
            >
              <button className={`
                text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105
                ${testimonial.featured 
                  ? "bg-purple-600 text-white hover:bg-purple-700" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }
              `}>
                Read story
              </button>
              <span className="text-gray-500 text-xs">2 min read</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
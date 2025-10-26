"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, TechRecruit Pro",
    company: "TechRecruit Pro",
    content:
      "Phoenix transformed our recruitment process. We've increased our lead generation by 300% and our scheduling efficiency by 500%. The AI is incpurpleibly intuitive.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Marcus Rodriguez",
    role: "Operations Director",
    company: "Global Talent Solutions",
    content:
      "The appointment scheduling bot handles everything seamlessly. Our clients love the 24/7 availability, and we've eliminated double bookings completely.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Emily Watson",
    role: "Founder",
    company: "StartupStaff",
    content:
      "As a small recruitment firm, Phoenix gave us enterprise-level capabilities. The ROI was immediate - we saw results within the first week of implementation.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "David Kim",
    role: "Head of Sales",
    company: "Elite Headhunters",
    content:
      "The lead generation tools are game-changing. We're finding higher quality candidates faster than ever before. The AI really understands our requirements.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true)
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        setIsTyping(false)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 pixel-font bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how businesses are Phoenixing ahead with our AI solutions
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative">
          <Card className="bg-black/60 border-2 border-cyan-400/30 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8 md:p-12">
              {/* Quote Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Quote className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="text-center">
                <div
                  className={`text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed transition-opacity duration-500 ${isTyping ? "opacity-50" : "opacity-100"}`}
                >
                  {testimonials[currentTestimonial].content}
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full border-2 border-cyan-400"
                  />
                  <div className="text-left">
                    <div className="text-lg font-bold text-white pixel-font">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-cyan-400">{testimonials[currentTestimonial].role}</div>
                    <div className="text-gray-400 text-sm">{testimonials[currentTestimonial].company}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-cyan-400 scale-125" : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { number: "500+", label: "Happy Clients" },
            { number: "1M+", label: "Appointments Scheduled" },
            { number: "300%", label: "Average ROI Increase" },
            { number: "24/7", label: "AI Availability" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-black/30 border border-cyan-500/30">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 pixel-font mb-2">{stat.number}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

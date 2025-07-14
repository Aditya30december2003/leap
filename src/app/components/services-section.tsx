"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Bot, Users, Zap, ArrowRight, Sparkles } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Appointment Bots",
    description:
      "Intelligent scheduling assistants that handle bookings 24/7 with natural language understanding.",
    features: [
      "Smart calendar integration",
      "Multi-timezone support",
      "Automated reminders",
      "Custom workflows",
    ],
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Lead Generation Tools",
    description:
      "AI-powered lead generation tools tailored for agencies and recruiters.",
    features: [
      "Candidate sourcing",
      "Profile matching",
      "Automated outreach",
      "Performance analytics",
    ],
    color: "from-rose-500 to-red-500",
  },
  {
    icon: Zap,
    title: "Automation Suite",
    description:
      "End-to-end workflow automation that scales with your operations.",
    features: [
      "Process automation",
      "Smart routing",
      "Real-time analytics",
      "Custom integrations",
    ],
    color: "from-orange-500 to-rose-500",
  },
];

export function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold pixel-font bg-gradient-to-r from-red-500 via-red-700 to-orange-500 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-lg text-gray-400 mt-4 max-w-xl mx-auto">
            Purpose-built AI automation and digital solutions for modern
            businesses
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`relative bg-black/40 border border-gray-700 hover:border-red-500 transition-all duration-300 rounded-2xl overflow-hidden shadow-md ${
                hoveredCard === index ? "scale-105" : ""
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient Glow Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
              />

              <CardHeader className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}
                >
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold pixel-font text-white group-hover:text-red-400 transition">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-400 text-base mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10">
                <ul className="space-y-3 text-sm text-gray-300 mt-4 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Sparkles className="text-red-400 w-4 h-4 mt-1" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center text-red-400 hover:text-white font-medium transition-colors duration-300">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

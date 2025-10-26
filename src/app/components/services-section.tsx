"use client";

import { useState, useEffect } from "react";
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
    color: "from-purple-500 to-pink-500",
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
    color: "from-rose-500 to-purple-500",
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
    <div id="services">
      <section id="#services" className="py-24 px-4 bg-black text-white relative overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div 
            className="text-center mb-16"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h2 className="text-5xl md:text-6xl font-bold pixel-font bg-gradient-to-r from-purple-500 via-purple-700 to-orange-500 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p 
              className="text-lg text-white font-bold mt-4 max-w-xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Purpose-built AI automation and digital solutions for modern
              businesses
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={600 + (index * 200)}
                data-aos-duration="800"
              >
                <Card
                  className={`relative bg-black/40 border border-gray-700 hover:border-purple-500 transition-all duration-300 rounded-2xl overflow-hidden shadow-md group ${
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
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110`}
                      data-aos="zoom-in"
                      data-aos-delay={800 + (index * 200)}
                    >
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold pixel-font text-white group-hover:text-purple-400 transition">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-base mt-2">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <ul className="space-y-3 text-sm text-gray-300 mt-4 mb-6">
                      {service.features.map((feature, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start gap-2 transform transition-transform duration-300 hover:translate-x-2"
                          data-aos="fade-right"
                          data-aos-delay={1000 + (index * 200) + (idx * 100)}
                        >
                          <Sparkles className="text-purple-400 w-4 h-4 mt-1" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center text-purple-400 hover:text-white font-medium transition-colors duration-300 transform hover:translate-x-1">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
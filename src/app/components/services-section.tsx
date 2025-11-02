"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Bot, Users, Zap, Sparkles } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "AI Lead Generation Ecosystem",
    description:
      "Stop chasing, start closing. Our end-to-end AI platform eliminates guesswork, delivering a steady, qualified stream of leads straight to your sales team. We handle the entire journey—from finding the perfect prospect to automated follow-up—so you can focus 100% on revenue.",
    features: [
      "Intelligent Prospect Identification",
      "Automated Multi-Channel Nurturing",
      "Guaranteed Sales-Ready Handoff",
      "Real-Time Campaign Optimization",
    ],
    color: "from-rose-500 to-purple-500",
  },
  {
    icon: Bot,
    title: "Conversational AI",
    description:
      "Your customers and employees demand instant, intelligent answers, 24/7. Our Conversational AI platform integrates seamlessly across your entire business to deliver just that.",
    features: [
      "Exceptional Email Open Rates (60-80%)",
      "Multilingual Support High Engagement Reply Rates (4-9%)",
      "Consistent Stream of Qualified Leads (20-50 per month)",
      "Instant Lead Qualification and Routing",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Sales Optimization",
    description:
      "A perfectly consistent AI Sales Assistant that never sleeps and engages prospects in real-time, functioning as a seamless frontline expert.",
    features: [
      "24/7 High-Value Lead Qualification",
      "Zero-Touch CRM Automation",
      "Intelligent Content Nurturing",
      "Rapid, Custom Proposal Generation",
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
        duration: 300,
        once: true,
        easing: 'ease-out-cubic',
      });
    };
    initAOS();
  }, []); 

  return (
    <section id="services" className="py-24 px-4 bg-black text-white overflow-hidden scroll-mt-24 z-30">
      {/* <div className="pointer-events-none absolute inset-0 -z-0">
        <BackgroundNetwork />
      </div> */}
      <div className="max-w-7xl mx-auto bg-black">
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
            Purpose-built AI automation and digital solutions for modern businesses
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-black z-20">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={400 + (index * 200)}
              className="flex"
            >
              <Card
                className={`bg-black border border-gray-700 hover:border-purple-500 transition-all duration-300 rounded-2xl overflow-hidden shadow-md group flex flex-col h-full w-full ${
                  hoveredCard === index ? "scale-105" : ""
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient Glow Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                />

                <CardHeader className="z-10 pb-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110`}
                  >
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold pixel-font text-white group-hover:text-purple-400 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-white text-base mt-2 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 flex-grow pt-0">
                  <ul className="space-y-3 text-sm text-gray-300">
                    {service.features.map((feature, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-2 transform transition-transform duration-300 hover:translate-x-1"
                        data-aos="fade-right"
                        data-aos-delay={600 + (index * 200) + (idx * 100)}
                      >
                        <Sparkles className="text-purple-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
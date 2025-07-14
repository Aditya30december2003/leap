"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Check, Zap, Crown, Rocket } from "lucide-react";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: { monthly: 99, yearly: 990 },
    description: "Perfect for small businesses getting started with AI automation.",
    features: [
      "Up to 1,000 appointments/month",
      "Basic AI scheduling bot",
      "Email support",
      "Standard integrations",
      "Basic analytics",
    ],
    color: "from-red-600 to-red-700",
    popular: false,
  },
  {
    name: "Professional",
    icon: Crown,
    price: { monthly: 299, yearly: 2990 },
    description: "Advanced features for growing businesses and recruitment firms.",
    features: [
      "Up to 10,000 appointments/month",
      "Advanced AI with custom training",
      "Lead generation tools",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
      "Multi-language support",
    ],
    color: "from-red-500 to-red-600",
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Rocket,
    price: { monthly: 999, yearly: 9990 },
    description: "Full-scale AI automation for large organizations.",
    features: [
      "Unlimited appointments",
      "Custom AI model training",
      "Dedicated account manager",
      "24/7 phone support",
      "White-label solutions",
      "API access",
      "Custom workflows",
      "SLA guarantee",
    ],
    color: "from-red-700 to-red-800",
    popular: false,
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-24 px-4 bg-black text-white relative overflow-hidden">
      {/* 🔴 Red underglow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-40 bg-red-600 blur-2xl opacity-30 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold pixel-font bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent mb-6">
            Pricing Plans
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
            Choose the perfect plan to accelerate your business with AI.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-lg ${!isYearly ? "text-white" : "text-gray-400"}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-gradient-to-r from-red-500 to-red-700 rounded-full transition-transform duration-300 ${
                  isYearly ? "translate-x-8" : ""
                }`}
              />
            </button>
            <span className={`text-lg ${isYearly ? "text-white" : "text-gray-400"}`}>
              Yearly <span className="text-green-400 text-sm ml-1">(Save 17%)</span>
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {plans.map((plan, index) => (
            <div key={index} className="relative">
              {/* MOST POPULAR Badge (outside card to fix cut issue) */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-red-600 px-4 py-1 rounded-full text-sm font-bold text-white pixel-font shadow-md">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <Card
                className={`relative overflow-hidden border border-gray-700 transition-all duration-300 ${
                  plan.popular
                    ? "scale-105 border-red-500 shadow-red-500/30 shadow-lg bg-black/60"
                    : "hover:border-red-500 bg-black/40"
                }`}
              >
                {/* Red glow overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-5 pointer-events-none`}
                />

                <CardHeader className="relative z-10 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center`}
                  >
                    <plan.icon className="text-white h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white pixel-font">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-300 mt-2">{plan.description}</CardDescription>

                  {/* Price */}
                  <div className="mt-6 mb-4">
                    <div className="text-4xl font-bold pixel-font text-white">
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                      <span className="text-lg text-gray-400 font-normal ml-1">
                        /{isYearly ? "year" : "month"}
                      </span>
                    </div>
                    {isYearly && (
                      <div className="text-green-400 text-sm mt-1">
                        Save ${plan.price.monthly * 12 - plan.price.yearly} per year
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <ul className="space-y-4 mb-8 text-gray-300">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="text-green-400 h-5 w-5 mt-1" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full font-bold pixel-font ${
                      plan.popular
                        ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                        : "bg-transparent border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                    }`}
                    size="lg"
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        {/* <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">Need a custom solution? Our enterprise team is here to help.</p>
          <Button
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white pixel-font"
          >
            Contact Enterprise Sales
          </Button>
        </div> */}
      </div>
    </section>
  );
}

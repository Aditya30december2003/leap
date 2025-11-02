import React from 'react'
import { HeroSection } from "@/app/components/hero-section"
import { ServicesSection } from "@/app/components/services-section"
// import { PricingSection } from "@/app/components/pricing-section"
// import { TestimonialsSection } from "@/app/components/testimonials-section"
import { ContactSection } from "@/app/components/contact-section"
import Testimonials from "./components/testimonials"
const home = () => {
  return (
    <>
    <HeroSection/>
          <ServicesSection/>
          {/* <PricingSection/> */}
          <Testimonials/>
          <ContactSection/>
    </>
  )
}

export default home

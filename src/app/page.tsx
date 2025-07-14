import { HeroSection } from "@/app/components/hero-section"
import { ServicesSection } from "@/app/components/services-section"
import { PricingSection } from "@/app/components/pricing-section"
// import { TestimonialsSection } from "@/app/components/testimonials-section"
import { ContactSection } from "@/app/components/contact-section"
import { Footer } from "@/app/components/footer"
// import { AIChat } from "@/app/components/ai-chat"
import {Navbar} from '@/app/components/navbar'

export default function Home() {
  return (
   <>
 <div className="bg-black">
      {/* Theme Toggle */}
      
      <div>
        <Navbar/>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
      <HeroSection/>
      <ServicesSection/>
      <PricingSection/>
      <ContactSection/>
      <Footer/>
      </main>
      </div>
      </>
  )
}
        
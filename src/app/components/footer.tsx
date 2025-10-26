import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Linkedin, Mail} from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t border-purple-600/30 bg-black/80 backdrop-blur-sm">
      {/* Pixel Line Divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent mb-4">
              Phoenix
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Revolutionizing business automation with cutting-edge AI solutions. Rise into the future of intelligent
              scheduling and lead generation.
            </p>

            {/* Email Contact Form */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Get In Touch</h4>
              <form
                action="mailto:leo10demigod@gmail.com"
                method="GET"
                encType="text/plain"
                className="flex flex-col sm:flex-row gap-2"
              >
                <Input
                  name="body"
                  placeholder="Your message..."
                  className="bg-black/50 border border-purple-600/40 text-white placeholder-gray-400 focus:border-purple-400 flex-1"
                />
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white whitespace-nowrap"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </form>
            </div>
          </div>

          {/* Quick Links - Matching Navbar */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "Services", href: "#services" },
                { name: "Pricing", href: "#pricing" },
                { name: "Book a Call", href: "#book" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 transform block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>

            {/* Contact Methods */}
            <div className="space-y-4 mb-6">
              {/* Email */}
              <a
                href="mailto:leo10demigod@gmail.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center group-hover:bg-purple-800 transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-sm">workemail@gmail.com</span>
              </a>

              {/* Phone */}
              {/* <a
                href="tel:+1234567890"
                className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center group-hover:bg-purple-800 transition-all duration-300">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-sm">+1 (234) 567-890</span>
              </a> */}

              {/* LinkedIn */}
              <a
                href="#"
                className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center group-hover:bg-purple-800 transition-all duration-300">
                  <Linkedin className="h-5 w-5" />
                </div>
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>

            {/* Legal Links */}
            <ul className="space-y-2 text-sm border-t border-purple-800 pt-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-800 mt-12 pt-8 flex justify-between items-center">
          <p className="text-white font-bold text-sm">
            © 2025 Phoenix. All rights reserved.
          </p>
          {/* <div className="text-gray-400 text-sm">
            Rising From The Ashes
          </div> */}
        </div>
      </div>
    </footer>
  )
}
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Github, Twitter, Linkedin, Mail} from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t border-red-600/30 bg-black/80 backdrop-blur-sm">
      {/* Pixel Line Divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-pink-600" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold pixel-font bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent mb-4">
              LEAP
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Revolutionizing business automation with cutting-edge AI solutions. Leap into the future of intelligent
              scheduling and lead generation.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold pixel-font">Stay Updated</h4>
              <form
  action="mailto:leo10demigod@gmail.com"
  method="GET"
  encType="text/plain"
  className="flex space-x-2"
>
  <Input
    name="body"
    placeholder="Enter your email"
    className="bg-black/50 border border-red-600/40 text-white placeholder-gray-400 focus:border-red-400"
  />
  <Button
    type="submit"
    className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white"
  >
    <Mail className="h-4 w-4" />
  </Button>
</form>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold pixel-font mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Services", "Pricing", "About", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="text-white font-semibold pixel-font mb-4">Connect</h4>

            {/* Social Icons */}
            <div className="flex space-x-4 mb-6">
              {[
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
                { icon: Mail, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-950 transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <ul className="space-y-2 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-800 mt-12 pt-8 justify-between items-center w-full">
          <p className="text-gray-400 text-sm flex items-center text-center w-full">
            © 2025 Leap
          </p>
         
        </div>
      </div>
    </footer>
  )
}

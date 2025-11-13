import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import {Navbar} from '@/app/components/navbar'
import { Footer } from "@/app/components/footer"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PhoenixLabs",
  description: "Revolutionizing business automation with cutting-edge AI solutions",
  alternates: { canonical: "https://phoenixlabs.agency" },
  icons: {
    icon: [{ url: "/favicon-64x64.png", type: "image/png", sizes: "64x64" }],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}>
        <div>
        <Navbar/>
      </div>
        <div className="relative z-10">
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
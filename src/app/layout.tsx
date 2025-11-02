import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PhoenixLabs",
  description: "",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* make sure the body has a dark base so the network pops */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased  text-white`}>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}

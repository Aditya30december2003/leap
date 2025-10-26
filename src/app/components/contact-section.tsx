'use client'
import React, { useState, useEffect } from 'react';

// ✅ Corrected CalendlyEmbed component
interface CalendlyEmbedProps {
  url: string;
  height?: string;
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ url, height = "700px" }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div 
      className="calendly-inline-widget" 
      data-url={url}
      style={{ minWidth: '320px', height }}
    />
  );
};

// ✅ Main Contact Section Component
export function ContactSection() {
  const [activeTab, setActiveTab] = useState('inline');

  // Replace with your actual Calendly URLs
  const calendlyUrls = {
    consultation: 'https://calendly.com/leo10demigod/30min',
  };

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
    <div id="book" className="min-h-screen bg-black text-white scroll-mt-24">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div 
          className="max-w-6xl mx-auto px-6 py-8 text-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h1 
            className="text-4xl font-bold mb-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Schedule Your Meeting
          </h1>
          <p 
            className="text-gray-300 text-lg"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Choose the perfect time to connect with our team
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div 
          className="flex justify-center mb-8"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <div className="bg-gray-900 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('inline')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'inline' 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Inline Booking
            </button>
          </div>
        </div>

        {/* Inline Calendly */}
        {activeTab === 'inline' && (
          <div 
            className="max-w-4xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-duration="1000"
          >
            <div className="bg-gray-900 rounded-lg p-8 transform transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
              <div 
                className="text-center mb-8"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <h2 
                  className="text-2xl font-bold mb-4"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  Book Your Consultation
                </h2>
                <p 
                  className="text-gray-300"
                  data-aos="fade-up"
                  data-aos-delay="900"
                >
                  Select a time that works best for you
                </p>
              </div>
              <div 
                className="bg-white rounded-lg overflow-hidden transform transition-all duration-500"
                data-aos="zoom-in"
                data-aos-delay="1000"
                data-aos-duration="1200"
              >
                <CalendlyEmbed 
                  url={calendlyUrls.consultation}
                  height="600px"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-800 mt-16">
        <div 
          className="max-w-6xl mx-auto px-6 py-8 text-center"
          data-aos="fade-up"
          data-aos-delay="1100"
        >
          <p 
            className="text-gray-300"
            data-aos="fade-up"
            data-aos-delay="1200"
          >
            Need help? Contact us at{' '}
            <a 
              href="mailto:leo10demigod@gmail.com" 
              className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
              data-aos="fade-up"
              data-aos-delay="1300"
            >
              workemail@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
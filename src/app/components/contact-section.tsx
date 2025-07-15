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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Schedule Your Meeting</h1>
          <p className="text-gray-300 text-lg">Choose the perfect time to connect with our team</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('inline')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'inline' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Inline Booking
            </button>
          </div>
        </div>

        {/* Inline Calendly */}
        {activeTab === 'inline' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Book Your Consultation</h2>
                <p className="text-gray-300">Select a time that works best for you</p>
              </div>
              <div className="bg-white rounded-lg overflow-hidden">
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
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-300">
            Need help? Contact us at{' '}
            <a href="mailto:support@example.com" className="text-red-400 hover:text-red-300">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

'use client'
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, Video, Settings, ArrowRight, Check, Star } from 'lucide-react';

// Simple Calendly Embed Component
const CalendlyEmbed = ({ url, height = "700px" }) => {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
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
      style={{ minWidth: '320px', height: height }}
    />
  );
};

// Calendly Popup Component
const CalendlyPopup = ({ url, text = "Schedule Meeting", className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    }
  };

  return (
    <button
      onClick={openCalendly}
      disabled={!isLoaded}
      className={`${className} ${!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {text}
    </button>
  );
};

// Main App Component
export function ContactSection() {
  const [activeTab, setActiveTab] = useState('inline');
  const [selectedMeetingType, setSelectedMeetingType] = useState('consultation');

  // Replace these with your actual Calendly URLs
  const calendlyUrls = {
    consultation: 'https://calendly.com/leo10demigod/30min',
  };

  const meetingTypes = [
    {
      id: 'consultation',
      title: '30-Min Consultation',
      description: 'Quick consultation to discuss your needs',
      duration: '30 minutes',
      price: 'Free',
      icon: <User className="w-5 h-5" />,
      features: ['Project discussion', 'Q&A session', 'Next steps planning']
    },
    {
      id: 'demo',
      title: 'Product Demo',
      description: 'See our product in action',
      duration: '45 minutes',
      price: 'Free',
      icon: <Video className="w-5 h-5" />,
      features: ['Live demo', 'Feature walkthrough', 'Custom use cases']
    },
    {
      id: 'support',
      title: 'Support Call',
      description: 'Get help with technical issues',
      duration: '60 minutes',
      price: '$100',
      icon: <Phone className="w-5 h-5" />,
      features: ['Issue resolution', 'Technical guidance', 'Best practices']
    },
    {
      id: 'strategy',
      title: 'Strategy Session',
      description: 'Deep dive into your business strategy',
      duration: '90 minutes',
      price: '$200',
      icon: <Settings className="w-5 h-5" />,
      features: ['Business analysis', 'Strategic planning', 'Action roadmap']
    }
  ];

  const currentMeeting = meetingTypes.find(m => m.id === selectedMeetingType);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className=" border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Schedule Your Meeting</h1>
            <p className="text-gray-300 text-lg">Choose the perfect time to connect with our team</p>
          </div>
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
            {/* <button
              onClick={() => setActiveTab('popup')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'popup' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Popup Booking
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'custom' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Meeting Types
            </button> */}
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

        {/* Popup Calendly */}
        {/* {activeTab === 'popup' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Quick Booking</h2>
                <p className="text-gray-300">Click to open our booking calendar in a popup</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">30 Minutes</h3>
                      <p className="text-gray-300">Perfect for initial consultations</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Video className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Video Call</h3>
                      <p className="text-gray-300">Zoom link provided automatically</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email Reminders</h3>
                      <p className="text-gray-300">Automatic confirmations and reminders</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <CalendlyPopup
                    url={calendlyUrls.consultation}
                    text="Schedule Now"
                    className="w-full bg-red-600 text-white py-4 px-8 rounded-lg hover:bg-red-700 transition-colors font-medium text-lg flex items-center justify-center space-x-2"
                  />
                  
                  <p className="text-center text-gray-400 mt-4 text-sm">
                    Opens in a new window
                  </p>
                </div>
              </div>
            </div>
          </div>
        )} */}

        {/* Custom Meeting Types */}
        {/* {activeTab === 'custom' && (
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-1">
                <div className="bg-gray-900 rounded-lg p-6 sticky top-8">
                  <h3 className="text-xl font-bold mb-6">Choose Meeting Type</h3>
                  <div className="space-y-3">
                    {meetingTypes.map((meeting) => (
                      <button
                        key={meeting.id}
                        onClick={() => setSelectedMeetingType(meeting.id)}
                        className={`w-full p-4 rounded-lg text-left transition-colors ${
                          selectedMeetingType === meeting.id
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {meeting.icon}
                          <div>
                            <div className="font-medium">{meeting.title}</div>
                            <div className="text-sm opacity-75">{meeting.duration}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              
              <div className="lg:col-span-2">
                <div className="bg-gray-900 rounded-lg p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{currentMeeting.title}</h2>
                      <p className="text-gray-300 mb-4">{currentMeeting.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-red-400" />
                          <span>{currentMeeting.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-red-400" />
                          <span className="font-medium">{currentMeeting.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold mb-4">What's included:</h4>
                    <ul className="space-y-2">
                      {currentMeeting.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden">
                    <CalendlyEmbed 
                      url={calendlyUrls[selectedMeetingType]}
                      height="500px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-300">
              Need help? Contact us at{' '}
              <a href="mailto:support@example.com" className="text-red-400 hover:text-red-300">
                support@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
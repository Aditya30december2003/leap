import React from 'react'
import { Check } from 'lucide-react'
import BackgroundNetwork from '../../components/MorphToAI';
const Pricing = () => {
  // The THREE COLUMNS are: AI Lead Generation, AI Chatbot, AI Sales Assistant
  const features = [
    { name: "Product Recommender", leadGen: true, chatbot: true, salesAssistant: false },
    { name: "Personalized Customer Interactions", leadGen: true, chatbot: true, salesAssistant: false },
    { name: "Customer Support Automation", leadGen: true, chatbot: true, salesAssistant: false },
    { name: "Engagement Through QR Codes", leadGen: false, chatbot: false, salesAssistant: true },
    { name: "Brand Ambassador Program", leadGen: false, chatbot: false, salesAssistant: true },
    { name: "Sales Data Analysis", leadGen: false, chatbot: true, salesAssistant: false },
    { name: "Upselling and Cross-selling", leadGen: true, chatbot: true, salesAssistant: false },
    { name: "Customer Segmentation", leadGen: true, chatbot: true, salesAssistant: false },
    { name: "Marketing Strategy Development", leadGen: false, chatbot: false, salesAssistant: true },
    { name: "Real-Time Inventory Updates", leadGen: true, chatbot: true, salesAssistant: true },
    { name: "Dynamic Pricing", leadGen: true, chatbot: true, salesAssistant: true },
    { name: "Order Tracking", leadGen: true, chatbot: true, salesAssistant: true },
    { name: "Content Creation and Management", leadGen: false, chatbot: false, salesAssistant: true },
    { name: "Technical Support for Products", leadGen: true, chatbot: true, salesAssistant: false },
    { name: "Business Insights", leadGen: false, chatbot: false, salesAssistant: true },
    { name: "Reporting", leadGen: false, chatbot: false, salesAssistant: true }
  ]

  return (
    <section className="relative min-h-screen bg-black text-white py-12 px-4 mt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <style>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">

         <div className="pointer-events-none absolute inset-0 -z-0">
    <BackgroundNetwork />
  </div>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
            Get the Best from Our Services
          </h1>
          <p className="text-lg text-gray-400">
            An outline of the scope of our services
          </p>
        </div>

        {/* Pricing Table */}
        <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg overflow-x-auto">
          {/* Table Header - Desktop */}
          <div className="hidden md:grid md:grid-cols-4 gap-4 p-6 bg-gray-900/50 border-b border-gray-800">
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-400">Features</h3>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">AI Lead Generation</h3>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">AI Chatbot</h3>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">AI Sales Assistant</h3>
            </div>
          </div>

          {/* Table Body */}
          <div>
            {features.map((feature, featureIndex) => (
              <div key={featureIndex}>
                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-4 gap-4 p-4 border-b border-gray-800 hover:bg-gray-900/30 transition-colors">
                  <div className="col-span-1 flex items-center">
                    <span className="text-sm text-gray-400">{feature.name}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    {feature.leadGen && <Check className="w-5 h-5 text-green-500" />}
                  </div>
                  <div className="flex items-center justify-center">
                    {feature.chatbot && <Check className="w-5 h-5 text-green-500" />}
                  </div>
                  <div className="flex items-center justify-center">
                    {feature.salesAssistant && <Check className="w-5 h-5 text-green-500" />}
                  </div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden p-4 border-b border-gray-800">
                  <div className="font-medium text-white mb-3">{feature.name}</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Lead Gen</div>
                      {feature.leadGen && <Check className="w-4 h-4 text-green-500 mx-auto" />}
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Chatbot</div>
                      {feature.chatbot && <Check className="w-4 h-4 text-green-500 mx-auto" />}
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Sales</div>
                      {feature.salesAssistant && <Check className="w-4 h-4 text-green-500 mx-auto" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8">
          <a href="/#book">
          <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105">
            Get Started Today
          </button>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Pricing
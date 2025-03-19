import React, { useState } from 'react';
import PokerTracker from './components/PokerTracker';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative bg-gray-900">
        {/* College Student CTA Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-2 font-medium">Exclusive Student Offer</span>
                </span>
                <span className="hidden sm:inline text-white/80">|</span>
                <span className="hidden sm:inline text-white/90">First 3 months free with .edu email</span>
              </div>
              <a href="#pricing" className="text-sm text-white hover:text-blue-200 font-medium flex items-center">
                Claim Offer
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo and Brand */}
              <div className="flex items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">P</span>
                  </div>
                  <div>
                    <span className="text-xl font-semibold text-white">pokes.io</span>
                    <div className="text-xs text-gray-400 -mt-1">College Poker Analytics</div>
                  </div>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <div className="flex items-center space-x-8">
                  <a href="#features" className="text-gray-300 hover:text-white text-sm font-medium">
                    Features
                  </a>
                  <a href="#pricing" className="text-gray-300 hover:text-white text-sm font-medium">
                    Pricing
                  </a>
                  <a href="#demo" className="text-gray-300 hover:text-white text-sm font-medium">
                    Demo
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-300 hover:text-white text-sm font-medium">
                    Log in
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Join Beta
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-400 hover:text-white focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
              <a href="#features" className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg">
                Features
              </a>
              <a href="#pricing" className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg">
                Pricing
              </a>
              <a href="#demo" className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg">
                Demo
              </a>
              <div className="px-3 py-2 space-y-2">
                <button className="w-full text-left text-gray-300 hover:text-white text-sm font-medium py-2">
                  Log in
                </button>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Join Beta
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className={`${showBanner ? 'pt-32' : 'pt-24'} pb-16 px-4 relative overflow-hidden transition-all duration-300`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#f3f4f6_0%,_transparent_50%)] opacity-80"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 mb-6">
            <span className="px-3 py-1 text-xs font-medium bg-gray-900 text-white rounded-full">Beta</span>
            <span className="text-sm text-gray-600">Now accepting early access users</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto leading-tight">
            Level up your poker game with 
            <span className="text-blue-600"> pro-level analytics</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Track your games, analyze your plays, and improve your win rate with data-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center mb-12">
            <button className="w-full sm:w-auto bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center justify-center space-x-2">
              <span>Start Free Trial</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full sm:w-auto border border-gray-200 text-gray-900 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center">
              View Demo
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto border-t border-gray-100 pt-12">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">10k+</div>
              <div className="text-sm text-gray-500">Games Tracked</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">85%</div>
              <div className="text-sm text-gray-500">Win Rate Increase</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">50+</div>
              <div className="text-sm text-gray-500">Universities</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">4.9</div>
              <div className="text-sm text-gray-500">User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Built for College Players</h2>
            <p className="text-gray-600 mt-4 text-lg">Everything you need to dominate your campus games</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Analytics</h3>
              <p className="text-gray-600">Get instant insights into your gameplay patterns and decision making</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Progress Tracking</h3>
              <p className="text-gray-600">Monitor your improvement over time with detailed statistics</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Insights</h3>
              <p className="text-gray-600">Get personalized recommendations to improve your strategy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div id="demo" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Try It Out</h2>
            <p className="text-gray-600 mt-4 text-lg">Experience how easy it is to track your poker sessions</p>
          </div>

          {/* Interactive Demo Prompt */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Demo Below!</h3>
              <p className="text-gray-600">
                Try entering a sample poker session to see how it works. Add your buy-in amount, duration, and final stack to get instant analytics.
              </p>
              <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-blue-600">
                <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span>Scroll down to try</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-5xl mx-auto">
            <PokerTracker />
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Student-Friendly Pricing</h2>
            <p className="text-gray-600 mt-4 text-lg">Affordable plans that grow with your game</p>
          </div>
          <div className="max-w-lg mx-auto bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">Limited Time</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Early Access Offer</h3>
              <div className="mt-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">$10</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <p className="mt-2 text-sm text-blue-600 font-medium">First 3 months free!</p>
            </div>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Full access to all features
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Unlimited session tracking
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Advanced analytics
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Early access to new features
              </li>
            </ul>
            <button className="w-full mt-8 bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">P</span>
                </div>
                <span className="text-xl font-semibold">pokes.io</span>
              </div>
              <p className="text-gray-400 text-sm">Level up your college poker game with smart analytics and tracking.</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-400 uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-300 hover:text-white text-sm">Features</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white text-sm">Pricing</a></li>
                <li><a href="#demo" className="text-gray-300 hover:text-white text-sm">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-400 uppercase tracking-wider mb-4">Contact</h4>
              <p className="text-gray-300 text-sm mb-2">Questions? Reach out to us at:</p>
              <a href="mailto:support@pokes.io" className="text-blue-400 hover:text-blue-300 text-sm">support@pokes.io</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">© 2024 pokes.io. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
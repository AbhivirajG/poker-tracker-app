import React, { useState } from 'react';
import PokerTracker from './components/PokerTracker';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">P</span>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">pokes.io</span>
                  <div className="text-xs text-gray-500 -mt-1">College Poker Analytics</div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                <a href="#features" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                  <span className="text-blue-600">⚡</span>
                  <span>Features</span>
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                  <span className="text-blue-600">💰</span>
                  <span>Pricing</span>
                </a>
                <a href="#demo" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                  <span className="text-blue-600">🎮</span>
                  <span>Demo</span>
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Log in
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <span>Join Beta</span>
                  <span className="text-sm">🎲</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
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
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-sm border-t">
            <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
              ⚡ Features
            </a>
            <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
              💰 Pricing
            </a>
            <a href="#demo" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
              🎮 Demo
            </a>
            <div className="px-3 py-2 space-y-2">
              <button className="w-full text-left text-blue-600 hover:text-blue-700 font-medium py-2">
                Log in
              </button>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Join Beta 🎲
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Enhanced Header */}
      <div className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 z-0"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#3b82f6_0%,_transparent_60%)] opacity-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#6366f1_0%,_transparent_60%)] opacity-10"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-1 bg-blue-50 rounded-full">
            <span className="text-blue-600 text-sm font-medium">🎉 Now in Beta • Get 3 Months Free</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Level Up Your{' '}
            <span className="relative">
              <span className="relative z-10 text-blue-600">College Poker Game</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path fill="currentColor" d="M0 5 Q 25 0, 50 5 Q 75 10, 100 5 L 100 10 L 0 10 Z"></path>
              </svg>
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track your games, analyze your plays, and crush your dorm room competition with pro-level analytics.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <span>Get Started Free</span>
              <span className="text-xl">→</span>
            </button>
            <button className="w-full sm:w-auto border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
              <span>Watch Demo</span>
              <span className="text-xl">▶</span>
            </button>
          </div>
          <div className="mt-8 flex justify-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">✓ No credit card required</span>
            <span className="flex items-center">✓ 3 months free trial</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Built for College Players</h2>
            <p className="text-gray-600 mt-4">Everything you need to dominate your campus games</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-2xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-2">Student-Friendly</h3>
              <p className="text-gray-600">Affordable pricing and features designed for campus life</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-2xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
              <p className="text-gray-600">Track your progress and identify winning patterns</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-2xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Goal Setting</h3>
              <p className="text-gray-600">Set and track your poker goals and milestones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div id="demo" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Try It Out</h2>
            <p className="text-gray-600 mt-4">See how easy it is to track your poker sessions</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-5xl mx-auto">
            <PokerTracker />
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Student-Friendly Pricing</h2>
            <p className="text-gray-600 mt-4">Just one buy-in for pro-level analytics</p>
          </div>
          <div className="max-w-lg mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-900">Early Access Offer</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-blue-600">$10</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="mt-2 text-blue-800">3 months free for beta users!</p>
            </div>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Full access to all features
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Unlimited session tracking
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Advanced analytics
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Early access to new features
              </li>
            </ul>
            <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
              Join the Beta
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">pokes.io</h3>
              <p className="text-gray-400">Level up your college poker game with smart analytics and tracking.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#demo" className="text-gray-400 hover:text-white">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">Questions? Reach out to us at:</p>
              <a href="mailto:support@pokes.io" className="text-blue-400 hover:text-blue-300">support@pokes.io</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 pokes.io. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
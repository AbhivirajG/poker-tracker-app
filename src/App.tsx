import React, { useState } from 'react';
import PokerTracker from './components/PokerTracker';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-20 px-8 border-b border-gray-100">
            {/* Logo */}
            <a href="/" className="flex items-baseline space-x-1">
              <span className="text-2xl tracking-tight font-light text-gray-900">pokes</span>
              <span className="text-2xl tracking-tight font-light text-gray-400">.io</span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 tracking-wide">Features</a>
              <a href="#demo" className="text-sm text-gray-600 hover:text-gray-900 tracking-wide">Demo</a>
              <div className="h-4 w-px bg-gray-200 mx-2"></div>
              <button className="text-sm text-gray-600 hover:text-gray-900 tracking-wide">
                Log in
              </button>
              <button className="text-sm bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors tracking-wide">
                Join Beta
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`md:hidden border-b border-gray-100 transition-all duration-200 ease-in-out ${
              isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="px-8 py-4 space-y-4">
              <a href="#features" className="block text-sm text-gray-600 hover:text-gray-900 tracking-wide">Features</a>
              <a href="#demo" className="block text-sm text-gray-600 hover:text-gray-900 tracking-wide">Demo</a>
              <div className="h-px bg-gray-100 my-4"></div>
              <button className="block w-full text-left text-sm text-gray-600 hover:text-gray-900 tracking-wide mb-4">
                Log in
              </button>
              <button className="block w-full text-sm bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors tracking-wide">
                Join Beta
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content Spacer for Fixed Header */}
      <div className="h-20"></div>

      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0 md:max-w-xl">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">Beta</span>
                <span className="text-sm text-gray-500">Free for .edu emails</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Track Your Poker Progress
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Simple analytics to help college students improve their poker game. Join 500+ students from 50+ universities.
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <button className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                  Join Beta Program
                </button>
                <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  Learn more →
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="hidden md:block px-8 py-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>10k+ games tracked</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>85% win rate increase</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>50+ universities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8">
        {/* Demo Section */}
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-medium text-gray-900">
              Try it yourself
            </h2>
            <p className="mt-2 text-gray-600 text-sm">
              Enter your session details below to see how it works
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <PokerTracker />
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto px-8 mt-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-blue-600 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Track Progress</h3>
              <p className="text-sm text-gray-600">Monitor your improvement over time with detailed statistics</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-green-600 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Export Data</h3>
              <p className="text-sm text-gray-600">Download your session history and analysis in various formats</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-purple-600 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Smart Insights</h3>
              <p className="text-sm text-gray-600">Get personalized recommendations to improve your strategy</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              © 2024 pokes.io
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-6">
              <a href="mailto:support@pokes.io" className="text-sm text-gray-500 hover:text-gray-900">
                support@pokes.io
              </a>
              <a href="#privacy" className="text-sm text-gray-500 hover:text-gray-900">
                Privacy
              </a>
              <a href="#terms" className="text-sm text-gray-500 hover:text-gray-900">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
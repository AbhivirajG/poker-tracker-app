import React, { useState } from 'react';
import PokerTracker from './components/PokerTracker';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <span className="text-xl font-medium text-gray-900">pokes.io</span>
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-gray-600 hover:text-gray-900 text-sm">
                Log in
              </button>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">
                Join Beta
              </button>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-500 hover:text-gray-900"
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
          {/* Mobile Menu */}
          <div className={`md:hidden pb-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="space-y-2">
              <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                Log in
              </button>
              <button className="block w-full bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">
                Join Beta
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Demo Section - The Heart of the App */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Context Banner */}
          <div className="mb-8 flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">Beta</span>
                <span className="text-sm text-gray-500">Free for .edu emails</span>
              </div>
              <span className="hidden sm:inline text-gray-300">|</span>
              <div className="hidden sm:flex items-center space-x-8 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  10k+ games tracked
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  50+ universities
                </span>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Learn more →
            </button>
          </div>

          {/* Demo Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium text-gray-900">
              Try the Poker Session Tracker
            </h1>
            <p className="mt-2 text-gray-600 text-sm">
              Enter your session details below to see how it works
            </p>
          </div>

          {/* Demo Component */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <PokerTracker />
          </div>

          {/* Features Grid - Below Demo */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
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

        {/* Beta CTA */}
        <div className="border-t border-gray-200 bg-white mt-12">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-2">Ready to improve your game?</h2>
                <p className="text-gray-600 text-sm">Get 3 months free access with your .edu email</p>
              </div>
              <button className="mt-4 sm:mt-0 bg-gray-900 text-white px-6 py-3 rounded-lg text-sm hover:bg-gray-800 transition-colors">
                Join Beta Program
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
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
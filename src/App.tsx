import React, { useState } from 'react';
import PokerTracker from './components/PokerTracker';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="fixed w-full top-0 bg-white border-b border-gray-100 z-50">
        <nav className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-xl font-medium text-gray-900">pokes.io</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#demo" className="text-gray-600 hover:text-gray-900 text-sm">
                Try Demo
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 text-sm">
                About
              </a>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">
                Join Beta
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-900"
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

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#demo" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                Try Demo
              </a>
              <a href="#about" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                About
              </a>
              <button className="w-full mt-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">
                Join Beta
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <div className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-medium text-gray-900 mb-4">
              Track your poker sessions with ease
            </h1>
            <p className="text-gray-600 mb-8">
              Simple, intuitive analytics for college poker players. Try the demo below.
            </p>
            <div className="inline-flex items-center space-x-2 text-sm text-blue-600 animate-bounce">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span>Scroll to try</span>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <div id="demo" className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <PokerTracker />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">Why pokes.io?</h2>
              <p className="text-gray-600">
                Built by college students, for college students. Track your games, analyze your plays, and improve your win rate.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-medium text-gray-900 mb-1">10k+</div>
                <div className="text-sm text-gray-500">Games Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-gray-900 mb-1">85%</div>
                <div className="text-sm text-gray-500">Win Rate Increase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-gray-900 mb-1">50+</div>
                <div className="text-sm text-gray-500">Universities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Beta Access */}
        <div className="py-16 px-4 bg-gray-50">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">Beta</span>
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Early Access Available</h2>
            <p className="text-gray-600 mb-8">
              Join the beta program and get 3 months free access with your .edu email
            </p>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg text-sm hover:bg-gray-800 transition-colors">
              Join Beta Program
            </button>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-sm text-gray-500">
            © 2024 pokes.io · <a href="mailto:support@pokes.io" className="hover:text-gray-900">support@pokes.io</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PokerTracker from './components/PokerTracker';
import EmailCollector from './components/EmailCollector';
import Admin from './pages/Admin';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Navigation */}
            <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center h-16 px-6">
                  {/* Logo */}
                  <a href="/" className="flex items-baseline space-x-1">
                    <span className="text-xl tracking-tight font-semibold text-blue-600">pokes</span>
                    <span className="text-xl tracking-tight font-light text-gray-400">.io</span>
                  </a>

                  {/* Desktop Menu */}
                  <div className="hidden md:flex items-center space-x-8">
                    <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 tracking-wide">Features</a>
                    <div className="h-4 w-px bg-gray-200"></div>
                    <EmailCollector 
                      buttonText="Join Beta" 
                      placeholder="Enter .edu email" 
                      className="w-72"
                    />
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
                  className={`md:hidden transition-all duration-200 ease-in-out ${
                    isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <div className="px-6 py-4 space-y-4 border-t border-gray-100">
                    <a href="#features" className="block text-sm text-gray-600 hover:text-gray-900 tracking-wide">Features</a>
                    <div className="h-px bg-gray-100"></div>
                    <EmailCollector buttonText="Join Beta" placeholder="Enter .edu email" />
                  </div>
                </div>
              </div>
            </nav>

            {/* Content Spacer for Fixed Header */}
            <div className="h-16"></div>

            {/* Header Section */}
            <header className="py-16 bg-gradient-to-b from-gray-50 via-white to-blue-50">
              <div className="max-w-3xl mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                  Level Up Your <span className="text-blue-600">Poker Game</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Smart analytics to help college students improve their game and track their progress.
                  Join 500+ students from top universities.
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>10k+ games tracked</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>85% win rate increase</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Demo Section */}
            <section className="py-12 px-6 bg-white">
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="border-b border-gray-100 px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <PokerTracker />
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 bg-gradient-to-b from-white to-gray-50">
              <div className="max-w-5xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-blue-600 mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Track Progress</h3>
                    <p className="text-sm text-gray-600">Monitor your improvement over time with detailed statistics</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-blue-600 mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Export Data</h3>
                    <p className="text-sm text-gray-600">Download your session history and analysis in various formats</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-blue-600 mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Smart Insights</h3>
                    <p className="text-sm text-gray-600">Get personalized recommendations to improve your strategy</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-gray-50">
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="text-sm text-gray-500">
                    © 2024 pokes.io
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center space-x-6">
                    <a href="mailto:support@pokes.io" className="text-sm text-gray-500 hover:text-gray-900">
                      Contact
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
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
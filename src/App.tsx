import React from 'react';
import PokerTracker from './components/PokerTracker';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">pokes.io</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
              <a href="#demo" className="text-gray-600 hover:text-blue-600">Demo</a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Join Beta
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Level Up Your <span className="text-blue-600">College Poker Game</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track your games, analyze your plays, and crush your dorm room competition with pro-level analytics.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
              Get Started Free
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors">
              Watch Demo
            </button>
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
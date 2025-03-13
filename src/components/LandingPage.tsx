import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Mail, Check } from "lucide-react";
import { supabase } from '../lib/supabase';
import PokerTracker from "./PokerTracker";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSubmit = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email");
      return;
    }
    try {
      const { error: supabaseError } = await supabase
        .from('emails')
        .insert([{ 
          email: email,
          timestamp: new Date().toISOString()
        }]);
      
      if (supabaseError) throw supabaseError;
      setIsSubmitted(true);
      setError("");
    } catch (err) {
      console.error('Error submitting email:', err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with Demo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-gray-900">
            Level Up Your <span className="text-blue-600">College Poker Game</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your games, analyze your plays, and crush your dorm competitions with professional-grade poker analytics.
          </p>
        </div>

        {/* Demo Section */}
        <div className="mt-12 mb-16">
          <div className="border rounded-xl overflow-hidden shadow-2xl bg-white">
            <PokerTracker />
          </div>
        </div>

        {/* Email Collection */}
        <div className="max-w-md mx-auto -mt-8 mb-16 relative z-10">
          <Card className="bg-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="space-y-4">
                {!isSubmitted ? (
                  <>
                    <div className="text-left space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">🎲 Early Access</h3>
                      <p className="text-sm text-gray-600">Join the waitlist and get 3 months free when we launch!</p>
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button
                      onClick={handleEmailSubmit}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
                    >
                      Get Early Access
                    </Button>
                    <div className="text-center space-y-2">
                      <p className="text-xs text-gray-500">
                        🎓 Special student discount: $10/month
                      </p>
                      <p className="text-[11px] text-gray-400">
                        Perfect for college players - just one buy-in for pro tools!
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-3 py-4">
                    <div className="flex justify-center">
                      <div className="bg-green-100 rounded-full p-2">
                        <Check className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">You're In!</h3>
                    <p className="text-sm text-gray-600">
                      Thanks for joining! We'll notify you when early access is ready.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎯"
              title="Track Everything"
              description="Session history, win rates, and profit tracking all in one place."
            />
            <FeatureCard
              icon="📊"
              title="Smart Analytics"
              description="Understand your game with detailed stats and opportunity cost analysis."
            />
            <FeatureCard
              icon="🎓"
              title="College-Focused"
              description="Built for dorm games and college tournaments. Start with just one buy-in."
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">pokes.io</h3>
            <p className="text-gray-400">Elevate your college poker experience</p>
            <div className="mt-8 text-sm text-gray-500">
              © 2024 pokes.io. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6 text-center space-y-3">
        <div className="text-4xl">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
} 
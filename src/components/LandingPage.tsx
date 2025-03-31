import React from 'react';
import { Link } from 'react-router-dom';
import EmailCollector from './EmailCollector';
import './LandingPage.css';
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Mail, Check } from "lucide-react";
import { supabase } from '../lib/supabase';
import PokerTracker from "./PokerTracker";

const LandingPage = () => {
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
    <div className="landing-page">
      <div className="hero-section">
        <div className="left-content">
          <h1>Level Up Your Poker Game</h1>
          <p className="subtitle">Professional features at just $10/month.</p>
          
          <div className="feature-list">
            <div className="feature-item">
              <span>📊</span>
              <div>
                <h3>Track Everything</h3>
                <p>Sessions, profits, goals, and opportunity costs.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span>🎯</span>
              <div>
                <h3>Early Access Perks</h3>
                <p>3 months free + exclusive features for beta users.</p>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <EmailCollector />
          </div>
        </div>

        <div className="device-wrapper">
          <div className="device">
            <div className="device-screen">
              <div className="demo-content">
                <h2>Smart Analytics</h2>
                <p>Track your progress and improve your game.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-content">
          <h2>pokes.io</h2>
          <p>Elevate your poker experience</p>
          <p className="copyright">© 2024 pokes.io. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

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
import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Plus, Trash2, Mail, Download } from "lucide-react";
import { cn } from "../lib/utils";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { supabase } from '../lib/supabase';

type ViewType = "Day" | "Week" | "Month";
type SegmentType = "Overview" | "Session" | "Cost";

interface PokerStats {
  winnings: number;
  losses: number;
  hoursPlayed: number;
  profitPerHour: number;
}

interface SessionData {
  date: string;
  amount: number;
  cumulative: number;
}

interface Goal {
  id: string;
  name: string;
  cost: number;
  achieved: boolean;
}

// Constants for opportunity cost calculations
const MINIMUM_WAGE = 15; // per hour
const AVERAGE_SOFTWARE_DEV_WAGE = 50; // per hour
const AVERAGE_FINANCE_WAGE = 40; // per hour

interface DatabaseEmail {
  email: string;
  timestamp: string;
  id: string;
}

interface EmailRecord {
  email: string;
  timestamp: string;
}

interface EmailSubmission {
  email: string;
  timestamp: string;
}

export default function PokerTracker() {
  const [view, setView] = useState<ViewType>("Week");
  const [activeSegment, setActiveSegment] = useState<SegmentType>("Overview");
  const [data, setData] = useState<PokerStats>({
    winnings: 0,
    losses: 0,
    hoursPlayed: 0,
    profitPerHour: 0
  });
  const [sessionHistory, setSessionHistory] = useState<SessionData[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({ name: "", cost: "" });
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [emailList, setEmailList] = useState<EmailSubmission[]>([]);

  // Update email list fetching
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const { data, error } = await supabase
          .from('emails')
          .select('*')
          .order('timestamp', { ascending: false });

        if (error) throw error;

        setEmailList((data as DatabaseEmail[]).map((item: DatabaseEmail) => ({
          email: item.email,
          timestamp: new Date(item.timestamp).toLocaleString()
        })));
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    fetchEmails();
  }, []);

  const changeView = (direction: "prev" | "next") => {
    const views: ViewType[] = ["Day", "Week", "Month"];
    const currentIndex = views.indexOf(view);
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < views.length) {
      setView(views[newIndex]);
    }
  };

  const addTestSession = () => {
    const winAmount = Math.random() > 0.5 
      ? Math.floor(Math.random() * 100) + 50  // Win between $50-$150
      : 0;
    const lossAmount = winAmount === 0 
      ? Math.floor(Math.random() * 100) + 50   // Loss between $50-$150
      : 0;
    const hours = Math.floor(Math.random() * 4) + 2;  // 2-6 hours
    const sessionAmount = winAmount - lossAmount;
    const date = new Date();
    
    setData(prev => {
      const newWinnings = prev.winnings + winAmount;
      const newLosses = prev.losses + lossAmount;
      const newHours = prev.hoursPlayed + hours;
      const netProfit = newWinnings - newLosses;
      
      return {
        winnings: newWinnings,
        losses: newLosses,
        hoursPlayed: newHours,
        profitPerHour: newHours > 0 ? netProfit / newHours : 0
      };
    });

    setSessionHistory(prev => {
      const newCumulative = prev.length > 0 
        ? prev[prev.length - 1].cumulative + sessionAmount 
        : sessionAmount;
      
      return [...prev, {
        date: date.toLocaleDateString(),
        amount: sessionAmount,
        cumulative: newCumulative
      }];
    });
  };

  const addGoal = () => {
    if (newGoal.name && newGoal.cost) {
      setGoals(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        name: newGoal.name,
        cost: parseFloat(newGoal.cost),
        achieved: false
      }]);
      setNewGoal({ name: "", cost: "" });
    }
  };

  const removeGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const toggleGoalAchieved = (id: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, achieved: !goal.achieved } : goal
    ));
  };

  const calculateOpportunityCost = () => {
    const minimumWageEarnings = data.hoursPlayed * MINIMUM_WAGE;
    const softwareDevEarnings = data.hoursPlayed * AVERAGE_SOFTWARE_DEV_WAGE;
    const financeEarnings = data.hoursPlayed * AVERAGE_FINANCE_WAGE;
    const pokerEarnings = data.winnings - data.losses;

    return {
      minimumWage: minimumWageEarnings,
      softwareDev: softwareDevEarnings,
      finance: financeEarnings,
      poker: pokerEarnings
    };
  };

  const segments: SegmentType[] = ["Overview", "Session", "Cost"];

  // Calculate net profit
  const netProfit = data.winnings - data.losses;
  const profitPercentage = data.hoursPlayed > 0 
    ? ((netProfit / (data.winnings + data.losses)) * 100).toFixed(1)
    : "0";

  const opportunityCost = calculateOpportunityCost();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="flex gap-8 max-w-[1200px] w-full items-start justify-between">
        {/* Main App Content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          {/* App Name */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-blue-600">pokes.io</h2>
            <p className="text-sm text-gray-500">Smart Poker Tracking</p>
          </div>

          {/* Add Session Button - Always visible */}
          <div className="mb-6">
            <Button onClick={addTestSession} className="w-full py-3 text-lg">
              Add Test Session
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex justify-around border-b pb-2 mb-6">
            {segments.map((segment) => (
              <button
                key={segment}
                onClick={() => setActiveSegment(segment)}
                className={cn(
                  "font-medium px-4 py-2 relative",
                  activeSegment === segment && "text-primary"
                )}
              >
                {segment}
                {activeSegment === segment && (
                  <div className="absolute bottom-[-9px] left-0 w-full h-[2px] bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Content Sections */}
          <div className="overflow-y-auto">
            {activeSegment === "Overview" && (
              <div className="space-y-6">
                {/* Profit Rate Circle */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full border-8 border-muted flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-3xl font-bold block">{profitPercentage}%</span>
                          <span className="text-sm text-muted-foreground">Profit Rate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Winnings</p>
                      <p className="text-xl font-bold text-green-500">${data.winnings.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Losses</p>
                      <p className="text-xl font-bold text-red-500">${data.losses.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Hours Played</p>
                      <p className="text-xl font-bold">{data.hoursPlayed} hrs</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Profit per Hour</p>
                      <p className={cn(
                        "text-xl font-bold",
                        data.profitPerHour > 0 ? "text-green-500" : "text-red-500"
                      )}>
                        ${data.profitPerHour.toFixed(2)}/hr
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeSegment === "Session" && (
              <div className="space-y-6">
                {/* Session Graph */}
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={sessionHistory}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date"
                        tickFormatter={(value) => value.split('/')[1]}
                      />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number) => [`$${value.toFixed(2)}`, "Balance"]}
                        contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }}
                        labelStyle={{ color: '#666' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="cumulative"
                        stroke="#2563eb"
                        fill="url(#colorPositive)"
                        fillOpacity={1}
                        name="Balance"
                        stackId="1"
                        isAnimationActive={true}
                        connectNulls
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Session History */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Session History</h3>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {sessionHistory.slice().reverse().map((session, index) => (
                      <div 
                        key={index}
                        className={cn(
                          "p-4 rounded-lg border",
                          session.amount > 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                        )}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{session.date}</span>
                          <span 
                            className={cn(
                              "font-medium",
                              session.amount > 0 ? "text-green-600" : "text-red-600"
                            )}
                          >
                            {session.amount > 0 ? "+" : ""}{session.amount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSegment === "Cost" && (
              <div className="space-y-4">
                {/* Opportunity Cost Analysis */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-blue-600">Opportunity Cost Analysis</h3>
                  
                  {/* Main Earnings Card */}
                  <Card className={cn(
                    "border border-gray-200",
                    opportunityCost.poker > opportunityCost.minimumWage ? "bg-green-50" : "bg-red-50"
                  )}>
                    <CardContent className="p-3">
                      <h4 className="font-medium">Your Poker Earnings</h4>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className={cn(
                          "text-xl font-bold",
                          opportunityCost.poker > 0 ? "text-green-600" : "text-red-600"
                        )}>
                          ${opportunityCost.poker.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">
                          (${data.profitPerHour.toFixed(2)}/hr)
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Comparison Cards */}
                  <div className="grid grid-cols-2 gap-2">
                    <Card className="border border-gray-200">
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm">Minimum Wage</h4>
                        <div className="flex justify-between items-baseline mt-1">
                          <span className="text-sm text-gray-500">${MINIMUM_WAGE}/hr</span>
                          <span className="font-medium">
                            ${opportunityCost.minimumWage.toFixed(2)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-gray-200">
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm">Software Dev</h4>
                        <div className="flex justify-between items-baseline mt-1">
                          <span className="text-sm text-gray-500">${AVERAGE_SOFTWARE_DEV_WAGE}/hr</span>
                          <span className="font-medium">
                            ${opportunityCost.softwareDev.toFixed(2)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Goals Section */}
                <div className="space-y-3 mt-6">
                  <h3 className="text-lg font-semibold text-blue-600">Financial Goals</h3>
                  
                  {/* Add New Goal */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="What's your goal? (e.g., New MacBook)"
                      value={newGoal.name}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Cost ($)"
                        value={newGoal.cost}
                        onChange={(e) => setNewGoal(prev => ({ ...prev, cost: e.target.value }))}
                        className="flex-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                      <Button onClick={addGoal} className="px-4 py-2 text-sm">
                        Add Goal
                      </Button>
                    </div>
                  </div>

                  {/* Goals List */}
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {goals.map(goal => {
                      const hoursNeeded = data.profitPerHour > 0 
                        ? goal.cost / data.profitPerHour 
                        : Infinity;
                      const daysNeeded = Math.ceil(hoursNeeded / 8);
                      
                      return (
                        <Card
                          key={goal.id}
                          className="border border-gray-200"
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={goal.achieved}
                                onChange={() => toggleGoalAchieved(goal.id)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-medium text-sm truncate">{goal.name}</h4>
                                  <button
                                    onClick={() => removeGoal(goal.id)}
                                    className="text-gray-400 hover:text-red-500 p-0.5 -mt-1 -mr-1"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                                <p className="text-xs text-gray-500">
                                  Target: ${goal.cost.toFixed(2)} • 
                                  {hoursNeeded === Infinity ? (
                                    " ∞ hours"
                                  ) : (
                                    ` ~${hoursNeeded.toFixed(1)}h (${daysNeeded}d)`
                                  )}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                    {goals.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        <p className="text-sm">No goals added yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Email Collection Card - Right Side */}
        <div className="w-[400px] sticky top-4">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <CardContent className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <h3 className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">pokes.io</h3>
                <p className="text-blue-800 font-medium">Level Up Your College Poker Game</p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/90 rounded-lg p-4 text-sm space-y-2 hover:transform hover:scale-105 transition-transform">
                  <p className="font-medium text-gray-900">🎯 Professional Analytics</p>
                  <p className="text-gray-600">Track your games, analyze your plays, improve your strategy.</p>
                </div>

                <div className="bg-white/90 rounded-lg p-4 text-sm space-y-2 hover:transform hover:scale-105 transition-transform">
                  <p className="font-medium text-gray-900">💰 Affordable Price</p>
                  <p className="text-gray-600">Professional features at just $10/month.</p>
                </div>

                <div className="bg-white/90 rounded-lg p-4 text-sm space-y-2 hover:transform hover:scale-105 transition-transform">
                  <p className="font-medium text-gray-900">📈 Track Everything</p>
                  <p className="text-gray-600">Sessions, profits, goals, and opportunity costs.</p>
                </div>

                <div className="bg-white/90 rounded-lg p-4 text-sm space-y-2 hover:transform hover:scale-105 transition-transform">
                  <p className="font-medium text-gray-900">🎲 Early Access Perks</p>
                  <p className="text-gray-600">3 months free + exclusive features for beta users.</p>
                </div>
              </div>

              {!isSubmitted ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base"
                    />
                  </div>
                  <Button 
                    onClick={async () => {
                      if (!email) return;
                      try {
                        const { error } = await supabase
                          .from('emails')
                          .insert([
                            { 
                              email: email,
                              timestamp: new Date().toISOString()
                            }
                          ]);
                        
                        if (error) throw error;
                        setIsSubmitted(true);
                        // Refresh email list for admin
                        const { data, error: fetchError } = await supabase
                          .from('emails')
                          .select('*')
                          .order('timestamp', { ascending: false });
                        
                        if (!fetchError && data) {
                          setEmailList(data.map(item => ({
                            email: item.email,
                            timestamp: new Date(item.timestamp).toLocaleString()
                          })));
                        }
                      } catch (error) {
                        console.error('Error submitting email:', error);
                      }
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-lg font-medium rounded-lg transform hover:scale-105 transition-all"
                  >
                    Join the Beta 🎲
                  </Button>
                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium text-blue-800">Limited Time Offer</p>
                    <p className="text-xs text-gray-500">Get 3 months free access when we launch!</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 text-center space-y-3">
                  <div className="text-5xl">🎉</div>
                  <p className="text-green-800 font-medium text-lg">You're In!</p>
                  <p className="text-green-700">Welcome to the pokes.io beta family.</p>
                  <p className="text-sm text-green-600">Check your email for exclusive access!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Admin Panel */}
      {showAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Admin Panel - Collected Emails</h3>
                <div className="space-x-2">
                  <Button onClick={() => {
                    // Placeholder for exporting emails
                  }} className="bg-green-600 hover:bg-green-700">
                    Export CSV
                  </Button>
                  <Button onClick={() => setShowAdmin(false)} variant="ghost">
                    Close
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="grid grid-cols-2 font-medium text-sm text-gray-600 pb-2 border-b">
                  <span>Email</span>
                  <span>Timestamp</span>
                </div>
                {emailList.map((submission, index) => (
                  <div key={index} className="grid grid-cols-2 text-sm py-2 border-b border-gray-100">
                    <span>{submission.email}</span>
                    <span>{submission.timestamp}</span>
                  </div>
                ))}
                {emailList.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No emails collected yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
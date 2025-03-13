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

  const renderContent = () => {
    switch (activeSegment) {
      case "Session":
        return (
          <div className="space-y-6">
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
                    tickFormatter={(value) => value.split('/')[1]} // Show only day
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toFixed(2)}`, "Balance"]}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }}
                    labelStyle={{ color: '#666' }}
                  />
                  {/* Positive values */}
                  <Area
                    type="monotone"
                    dataKey="cumulative"
                    stroke="#2563eb"
                    fill="url(#colorPositive)"
                    fillOpacity={1}
                    name="Balance"
                    // @ts-ignore
                    stackId="1"
                    isAnimationActive={true}
                    connectNulls
                  />
                  {/* Negative values */}
                  <Area
                    type="monotone"
                    dataKey="cumulative"
                    stroke="#dc2626"
                    fill="url(#colorNegative)"
                    fillOpacity={1}
                    // @ts-ignore
                    stackId="2"
                    isAnimationActive={true}
                    connectNulls
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Session History List */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Session History</h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {sessionHistory.slice().reverse().map((session, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "p-3 rounded-lg border",
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
                    <div className="text-sm text-gray-500 mt-1">
                      Total: <span className={cn(
                        session.cumulative > 0 ? "text-green-600" : "text-red-600"
                      )}>${session.cumulative.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "Cost":
        const opportunityCost = calculateOpportunityCost();
        return (
          <div className="space-y-6">
            {/* Goals Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Financial Goals</h3>
              
              {/* Add New Goal */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Goal name (e.g., New Jacket)"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Cost ($)"
                  value={newGoal.cost}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, cost: e.target.value }))}
                  className="w-24 px-3 py-2 border rounded-lg"
                />
                <Button onClick={addGoal} className="px-3">
                  <Plus className="h-5 w-5" />
                </Button>
              </div>

              {/* Goals List */}
              <div className="space-y-2">
                {goals.map(goal => (
                  <div
                    key={goal.id}
                    className={cn(
                      "p-3 rounded-lg border flex items-center justify-between",
                      goal.achieved ? "bg-green-50 border-green-200" : "bg-white"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={goal.achieved}
                        onChange={() => toggleGoalAchieved(goal.id)}
                        className="h-4 w-4"
                      />
                      <div>
                        <p className="font-medium">{goal.name}</p>
                        <p className="text-sm text-gray-500">${goal.cost.toFixed(2)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeGoal(goal.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunity Cost Analysis */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Opportunity Cost Analysis</h3>
              <p className="text-sm text-gray-500">
                Based on {data.hoursPlayed} hours played
              </p>
              
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Poker Earnings</span>
                      <span className={cn(
                        "font-medium",
                        opportunityCost.poker > 0 ? "text-green-500" : "text-red-500"
                      )}>
                        ${opportunityCost.poker.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Minimum Wage Job</span>
                      <span className="font-medium">${opportunityCost.minimumWage.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Software Development</span>
                      <span className="font-medium">${opportunityCost.softwareDev.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Finance Industry</span>
                      <span className="font-medium">${opportunityCost.finance.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Time to Goal Analysis */}
              {goals.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Time to Reach Goals</h4>
                  {goals.filter(g => !g.achieved).map(goal => {
                    const hoursNeeded = data.profitPerHour > 0 
                      ? (goal.cost / data.profitPerHour).toFixed(1)
                      : "∞";
                    return (
                      <div key={goal.id} className="flex justify-between items-center text-sm">
                        <span>{goal.name}</span>
                        <span>{hoursNeeded} hours needed</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <>
            {/* Circular Progress */}
            <div className="flex justify-center my-8">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border-8 border-muted flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-2xl font-bold block">{profitPercentage}%</span>
                      <span className="text-sm text-muted-foreground">Profit Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardContent className="p-3">
                  <p className="text-sm text-muted-foreground">Winnings</p>
                  <p className="text-lg font-bold text-green-500">${data.winnings.toFixed(2)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <p className="text-sm text-muted-foreground">Losses</p>
                  <p className="text-lg font-bold text-red-500">${data.losses.toFixed(2)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <p className="text-sm text-muted-foreground">Hours Played</p>
                  <p className="text-lg font-bold">{data.hoursPlayed} hrs</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <p className="text-sm text-muted-foreground">Profit per Hour</p>
                  <p className={cn(
                    "text-lg font-bold",
                    data.profitPerHour > 0 ? "text-green-500" : "text-red-500"
                  )}>
                    ${data.profitPerHour.toFixed(2)}/hr
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        );
    }
  };

  // Update email submission
  const handleEmailSubmit = async () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      alert('Please enter an email address');
      return;
    }
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      const { error } = await supabase
        .from('emails')
        .insert([
          { 
            email,
            timestamp: new Date().toISOString()
          }
        ]);

      if (error) {
        if (error.code === '23505') { // Unique violation
          alert('This email is already registered');
        } else {
          throw error;
        }
        return;
      }

      setIsSubmitted(true);
      setEmail("");

      // Refresh email list
      const { data } = await supabase
        .from('emails')
        .select('*')
        .order('timestamp', { ascending: false });

      if (data) {
        setEmailList((data as DatabaseEmail[]).map((item: DatabaseEmail) => ({
          email: item.email,
          timestamp: new Date(item.timestamp).toLocaleString()
        })));
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Failed to submit email. Please try again.');
    }
  };

  // Update CSV download
  const downloadEmails = () => {
    const emailData = emailList.map(sub => `${sub.email},${sub.timestamp}`).join('\n');
    const blob = new Blob([`Email,Timestamp\n${emailData}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pokes_io_emails.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Secret admin panel toggle (press 'a' key three times quickly)
  useEffect(() => {
    let clicks = 0;
    let lastClick = 0;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'a') {
        const now = Date.now();
        if (now - lastClick < 500) { // 500ms between clicks
          clicks++;
          if (clicks === 3) {
            setShowAdmin(prev => !prev);
            clicks = 0;
          }
        } else {
          clicks = 1;
        }
        lastClick = now;
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <div className="relative flex justify-between w-full max-w-7xl mx-auto">
      {/* Main App Content */}
      <div className="w-full max-w-[390px] min-h-[844px] mx-auto bg-background relative overflow-hidden rounded-[48px] border-[14px] border-black">
        {/* Notch Area */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[160px] h-[34px] bg-black z-10 rounded-b-[20px]" />
        
        {/* Content Container - adjusted for notch */}
        <div className="px-4 pt-12 pb-8 h-full">
          {/* App Name */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-blue-600">pokes.io</h2>
            <p className="text-sm text-gray-500">Smart Poker Tracking</p>
          </div>

          {/* Header Navigation */}
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="ghost" 
              onClick={() => changeView("prev")}
              disabled={view === "Day"}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-lg font-bold">{view}</span>
            <Button 
              variant="ghost" 
              onClick={() => changeView("next")}
              disabled={view === "Month"}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Segments */}
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
          
          {/* Add Session Button */}
          <div className="text-center mb-4">
            <Button onClick={addTestSession}>
              Add Test Session
            </Button>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      </div>

      {/* Email Collection Card - Adjusted positioning */}
      <div className="fixed right-4 top-4 w-72 lg:right-8 xl:right-[calc((100vw-80rem)/2+2rem)] hidden lg:block">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
          <CardContent className="p-4 space-y-3">
            <div className="text-center space-y-2">
              <h3 className="font-bold text-2xl text-blue-600">pokes.io</h3>
              <p className="text-blue-800 font-medium">Smart Poker Analytics</p>
            </div>

            <div className="space-y-3">
              <div className="bg-white/80 rounded-lg p-3 text-sm space-y-2">
                <p className="font-medium text-gray-900">🎯 Track Your Progress</p>
                <p className="text-gray-600">Monitor your wins, improve your game.</p>
              </div>

              <div className="bg-white/80 rounded-lg p-3 text-sm space-y-2">
                <p className="font-medium text-gray-900">💰 Affordable</p>
                <p className="text-gray-600">Just $10/month - less than a buy-in!</p>
              </div>

              <div className="bg-white/80 rounded-lg p-3 text-sm space-y-2">
                <p className="font-medium text-gray-900">🚀 Limited Beta</p>
                <p className="text-gray-600">Early access spots available now.</p>
              </div>
            </div>

            {!isSubmitted ? (
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="email"
                    placeholder="your.email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <Button 
                  onClick={handleEmailSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Join Beta Access
                </Button>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800 font-medium">Welcome to pokes.io! 🎉</p>
                <p className="text-green-600 text-sm">We'll be in touch soon.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Admin Panel */}
      {showAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Admin Panel - Collected Emails</h3>
                <div className="space-x-2">
                  <Button onClick={downloadEmails} className="bg-green-600 hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2" />
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
import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Plus, Trash2, Mail, Download, Users, Trophy, TrendingUp, Clock, Calendar, Gamepad2 } from "lucide-react";
import { cn } from "../lib/utils";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { supabase } from '../lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";

type ViewType = "Day" | "Week" | "Month";
type SegmentType = "Overview" | "Session" | "Cost" | "Community" | "Learn";

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

interface LeaderboardMember {
  id: number;
  name: string;
  netProfit: number;
  profitPerHour: number;
  hoursPlayed: number;
  avatar?: string;
}

interface GroupMember extends LeaderboardMember {
  selected?: boolean;
}

interface TableSettings {
  blinds: string;
  minBuyIn: number;
  maxBuyIn: number;
  rake?: number;
}

interface SessionDetails {
  gameType: string;
  location: string;
  tableSettings: TableSettings;
  notes: string;
}

interface GameSession {
  id: string;
  date: string;
  gameType: string;
  location?: string;
  notes?: string;
  players: {
    memberId: number;
    name: string;
    buyIns: number;
    duration: number;
    totalBuyIn: number;
    startTime?: string;
    endTime?: string;
  }[];
}

interface PlayerSession {
  memberId: number;
  name: string;
  buyIns: number;
  startTime?: string;
  endTime?: string;
  isActive: boolean;
  duration: number;
}

interface ActiveSession {
  id: string;
  gameType: string;
  startTime: string;
  players: PlayerSession[];
  isActive: boolean;
}

// Add these types and constants
type Card = {
  rank: string;
  suit: string;
  display: string;
};

type Position = "UTG" | "MP" | "CO" | "BTN" | "SB" | "BB";

const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const SUITS = ['h', 'd', 'c', 's'];

const CARDS: Card[] = RANKS.flatMap(rank => 
  SUITS.map(suit => ({
    rank,
    suit,
    display: `${rank}${suit}`
  }))
);

const POSITIONS: Position[] = ["UTG", "MP", "CO", "BTN", "SB", "BB"];

// First, define the Action type
type Action = "Raise/Call 3-bet" | "Jam" | "Raise/Jam" | "Raise/Fold" | "Limp";

// Add type for the GTO chart
type GTOChart = {
  [key: string]: Action;
};

// Add the getActionColor function
const getActionColor = (action: Action | "") => {
  switch (action) {
    case "Raise/Call 3-bet":
      return "bg-green-100 text-green-800";
    case "Jam":
      return "bg-purple-100 text-purple-800";
    case "Raise/Jam":
      return "bg-orange-100 text-orange-800";
    case "Raise/Fold":
      return "bg-blue-100 text-blue-800";
    case "Limp":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Define the GTO_SB chart
const GTO_SB: GTOChart = {
  // Premium hands
  "AA": "Raise/Call 3-bet",
  "KK": "Raise/Call 3-bet",
  "QQ": "Raise/Call 3-bet",
  "JJ": "Raise/Call 3-bet",
  "TT": "Raise/Call 3-bet",
  "99": "Raise/Call 3-bet",
  "88": "Raise/Call 3-bet",
  
  // Strong Aces suited
  "AKs": "Raise/Call 3-bet",
  "AQs": "Raise/Call 3-bet",
  "AJs": "Raise/Call 3-bet",
  "ATs": "Raise/Call 3-bet",
  "A9s": "Raise/Call 3-bet",
  "A8s": "Raise/Call 3-bet",
  "A7s": "Raise/Call 3-bet",
  "A6s": "Raise/Call 3-bet",
  "A5s": "Raise/Call 3-bet",
  "A4s": "Raise/Call 3-bet",
  "A3s": "Raise/Call 3-bet",
  "A2s": "Raise/Call 3-bet",

  // Strong Aces offsuit
  "AKo": "Raise/Call 3-bet",
  "AQo": "Raise/Call 3-bet",
  "AJo": "Raise/Call 3-bet",
  "ATo": "Raise/Call 3-bet",
  
  // Strong Broadway
  "KQo": "Raise/Call 3-bet",
  "KJo": "Raise/Call 3-bet",
  "QJo": "Raise/Call 3-bet",

  // Jam hands
  "A9o": "Jam",
  "33": "Jam",

  // Raise/Jam hands
  "K9o": "Raise/Jam",
  "Q9o": "Raise/Jam",
  "J9o": "Raise/Jam",
  "T9o": "Raise/Jam",
  "98o": "Raise/Jam",
  "97o": "Raise/Jam",
  "87o": "Raise/Jam",
  "76o": "Raise/Jam",
  "65o": "Raise/Jam",
  "K9s": "Raise/Jam",
  "K8s": "Raise/Jam",
  "Q8s": "Raise/Jam",
  "J8s": "Raise/Jam",
  "T8s": "Raise/Jam",
  "95s": "Raise/Jam",
  "85s": "Raise/Jam",
  "74s": "Raise/Jam",
  "64s": "Raise/Jam",
  "53s": "Raise/Jam",
  "43s": "Raise/Jam",

  // Raise/Fold hands
  "A8o": "Raise/Fold",
  "A7o": "Raise/Fold",
  "A6o": "Raise/Fold",
  "A5o": "Raise/Fold",
  "A4o": "Raise/Fold",
  "A3o": "Raise/Fold",
  "A2o": "Raise/Fold",
  "K7o": "Raise/Fold",
  "K6o": "Raise/Fold",
  "K5o": "Raise/Fold",
  "K4o": "Raise/Fold",
  "K3o": "Raise/Fold",
  "K2o": "Raise/Fold",
  "Q8o": "Raise/Fold",
  "Q7o": "Raise/Fold",
  "Q6o": "Raise/Fold",
  "Q5o": "Raise/Fold",
  "Q4o": "Raise/Fold",
  "Q3o": "Raise/Fold",
  "Q2o": "Raise/Fold",

  // Limp hands
  "K7s": "Limp",
  "K6s": "Limp",
  "K5s": "Limp",
  "K4s": "Limp",
  "K3s": "Limp",
  "K2s": "Limp",
  "Q7s": "Limp",
  "Q6s": "Limp",
  "Q5s": "Limp",
  "Q4s": "Limp",
  "Q3s": "Limp",
  "Q2s": "Limp",
  "J7s": "Limp",
  "J6s": "Limp",
  "J5s": "Limp",
  "J4s": "Limp",
  "J3s": "Limp",
  "J2s": "Limp",
  "T7s": "Limp",
  "T6s": "Limp",
  "T5s": "Limp",
  "T4s": "Limp",
  "T3s": "Limp",
  "T2s": "Limp",
  "22": "Limp"
} as const;

// Then define the GTO_CHART with proper typing
const GTO_CHART: { [key: string]: GTOChart } = {
  SB: GTO_SB,
  BTN: {
    "AA": "Raise/Call 3-bet",
    "KK": "Raise/Call 3-bet",
    // Add more hands for BTN...
  },
  // Add other positions...
} as const;

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
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<GroupMember[]>([]);
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [buyIns, setBuyIns] = useState<Record<number, string>>({});
  const [duration, setDuration] = useState<Record<number, string>>({});
  const [selectedGameType, setSelectedGameType] = useState("");
  const [sessionDetails, setSessionDetails] = useState<SessionDetails>({
    gameType: "",
    location: "",
    tableSettings: {
      blinds: "",
      minBuyIn: 0,
      maxBuyIn: 0,
      rake: 0
    },
    notes: ""
  });
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [playerSessions, setPlayerSessions] = useState<Record<number, PlayerSession>>({});
  const [selectedCard1, setSelectedCard1] = useState<Card | null>(null);
  const [selectedCard2, setSelectedCard2] = useState<Card | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position>("UTG");
  const [gtoMove, setGtoMove] = useState<Action | "">("");
  const [showDetails, setShowDetails] = useState(false);

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

  const segments: SegmentType[] = ["Overview", "Session", "Cost", "Community", "Learn"];

  // Calculate net profit
  const netProfit = data.winnings - data.losses;
  const profitPercentage = data.hoursPlayed > 0 
    ? ((netProfit / (data.winnings + data.losses)) * 100).toFixed(1)
    : "0";

  const opportunityCost = calculateOpportunityCost();

  const mockLeaderboard: LeaderboardMember[] = [
    {
      id: 1,
      name: "Veer Kapur",
      netProfit: 2450,
      profitPerHour: 35.8,
      hoursPlayed: 68,
      avatar: "/avatars/veer.jpg" // Optional: Add actual avatar paths if you have them
    },
    {
      id: 2,
      name: "Yuvraj Nahar",
      netProfit: 1890,
      profitPerHour: 31.5,
      hoursPlayed: 60,
    },
    {
      id: 3,
      name: "Ranai Loonkar",
      netProfit: 1560,
      profitPerHour: 28.9,
      hoursPlayed: 54,
      avatar: "/avatars/ranai.jpg"
    },
    {
      id: 4,
      name: "Abhiviraj Goel",
      netProfit: 980,
      profitPerHour: 22.3,
      hoursPlayed: 44,
    },
    {
      id: 5,
      name: "Aarav Shah",
      netProfit: 750,
      profitPerHour: 19.7,
      hoursPlayed: 38,
    }
  ];

  const gameTypes = [
    "Texas Hold'em - Cash Game",
    "Texas Hold'em - Tournament",
    "Omaha Hi",
    "Omaha Hi-Lo",
    "Seven Card Stud",
    "Short Deck Hold'em",
    "Mixed Games"
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSession: GameSession = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      gameType: selectedGameType,
      players: Object.values(playerSessions).map(player => ({
        memberId: player.memberId,
        name: player.name,
        buyIns: player.buyIns,
        duration: player.duration || 0,
        totalBuyIn: player.buyIns * (sessionDetails?.tableSettings.minBuyIn || 100),
        startTime: player.startTime,
        endTime: player.endTime
      }))
    };

    setSessions([newSession, ...sessions]);
    
    // Reset form
    setSelectedMembers(mockLeaderboard.map(m => ({ ...m, selected: false })));
    setPlayerSessions({});
    setSelectedGameType("");
  };

  // Update the button implementation in the Learn tab section
  const handleCheckGTO = () => {
    if (!selectedCard1 || !selectedCard2) {
      alert("Please select both cards");
      return;
    }
    const normalizedHand = normalizeToGTO(selectedCard1, selectedCard2);
    console.log("Normalized Hand:", normalizedHand); // Debug log
    console.log("Selected Position:", selectedPosition); // Debug log
    
    const chart = GTO_CHART[selectedPosition];
    if (chart && normalizedHand) {
      const action = chart[normalizedHand];
      console.log("Found Action:", action); // Debug log
      setGtoMove(action || "");
    } else {
      setGtoMove("");
    }
  };

  // Update the normalizeToGTO function to be more robust
  const normalizeToGTO = (card1: Card | null, card2: Card | null): string => {
    if (!card1 || !card2) return "";

    // Sort cards by rank (using the RANKS array for proper order)
    const [highCard, lowCard] = 
      RANKS.indexOf(card1.rank) <= RANKS.indexOf(card2.rank) 
        ? [card1, card2] 
        : [card2, card1];

    // Handle pocket pairs
    if (highCard.rank === lowCard.rank) {
      return highCard.rank + lowCard.rank;
    }

    // Handle suited and offsuit hands
    const suffix = highCard.suit === lowCard.suit ? "s" : "o";
    return highCard.rank + lowCard.rank + suffix;
  };

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

            {activeSegment === "Community" && (
              <div className="space-y-6">
                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-blue-600">NYU</h3>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="default" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              New Session
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl bg-white border-0 rounded-lg shadow-xl">
                            <DialogHeader className="border-b pb-3">
                              <DialogTitle className="text-lg font-bold">New Poker Session</DialogTitle>
                            </DialogHeader>
                            
                            <form onSubmit={handleCreateSession} className="space-y-4">
                              {/* Game Settings Section */}
                              <div className="space-y-3">
                                <h3 className="text-md font-semibold flex items-center gap-2">
                                  <Gamepad2 className="h-4 w-4 text-blue-500" />
                                  Game Settings
                                </h3>
                                
                                <div className="grid grid-cols-2 gap-3">
                                  {/* Game Type */}
                                  <div className="space-y-1">
                                    <label className="text-sm font-medium">Game Type</label>
                                    <Select
                                      value={sessionDetails.gameType}
                                      onValueChange={(value) => 
                                        setSessionDetails(prev => ({ ...prev, gameType: value }))
                                      }
                                    >
                                      <SelectTrigger className="bg-white h-8">
                                        <SelectValue placeholder="Select game type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {[
                                          "Texas Hold'em - Cash Game",
                                          "Texas Hold'em - Tournament",
                                          "PLO - Cash Game",
                                          "PLO - Tournament",
                                          "Mixed Games",
                                          "Short Deck",
                                          "Other"
                                        ].map((game) => (
                                          <SelectItem key={game} value={game}>{game}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {/* Location */}
                                  <div className="space-y-1">
                                    <label className="text-sm font-medium">Location</label>
                                    <Input
                                      placeholder="e.g., NYU Poker Room"
                                      value={sessionDetails.location}
                                      onChange={(e) => 
                                        setSessionDetails(prev => ({ ...prev, location: e.target.value }))
                                      }
                                      className="bg-white h-8"
                                    />
                                  </div>
                                </div>

                                {/* Table Settings */}
                                <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                                  <h4 className="text-sm font-medium">Table Settings</h4>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                      <label className="text-xs font-medium">Blinds</label>
                                      <Input
                                        placeholder="e.g., 1/2"
                                        value={sessionDetails.tableSettings.blinds}
                                        onChange={(e) => 
                                          setSessionDetails(prev => ({
                                            ...prev,
                                            tableSettings: {
                                              ...prev.tableSettings,
                                              blinds: e.target.value
                                            }
                                          }))
                                        }
                                        className="bg-white h-8"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-xs font-medium">Rake %</label>
                                      <Input
                                        type="number"
                                        min="0"
                                        max="100"
                                        placeholder="e.g., 5"
                                        value={sessionDetails.tableSettings.rake || ""}
                                        onChange={(e) => 
                                          setSessionDetails(prev => ({
                                            ...prev,
                                            tableSettings: {
                                              ...prev.tableSettings,
                                              rake: Number(e.target.value)
                                            }
                                          }))
                                        }
                                        className="bg-white h-8"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-xs font-medium">Min Buy-in</label>
                                      <Input
                                        type="number"
                                        min="0"
                                        placeholder="Minimum buy-in amount"
                                        value={sessionDetails.tableSettings.minBuyIn || ""}
                                        onChange={(e) => 
                                          setSessionDetails(prev => ({
                                            ...prev,
                                            tableSettings: {
                                              ...prev.tableSettings,
                                              minBuyIn: Number(e.target.value)
                                            }
                                          }))
                                        }
                                        className="bg-white h-8"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-xs font-medium">Max Buy-in</label>
                                      <Input
                                        type="number"
                                        min="0"
                                        placeholder="Maximum buy-in amount"
                                        value={sessionDetails.tableSettings.maxBuyIn || ""}
                                        onChange={(e) => 
                                          setSessionDetails(prev => ({
                                            ...prev,
                                            tableSettings: {
                                              ...prev.tableSettings,
                                              maxBuyIn: Number(e.target.value)
                                            }
                                          }))
                                        }
                                        className="bg-white h-8"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Player Selection */}
                              <div className="space-y-3">
                                <h3 className="text-md font-semibold flex items-center gap-2">
                                  <Users className="h-4 w-4 text-blue-500" />
                                  Players
                                </h3>
                                
                                <div className="max-h-[200px] overflow-y-auto space-y-2">
                                  {mockLeaderboard.map((member) => (
                                    <div key={member.id} 
                                         className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                      <div className="flex items-center gap-4">
                                        <Checkbox
                                          checked={selectedMembers.find(m => m.id === member.id)?.selected}
                                          onCheckedChange={(checked: boolean) => {
                                            setSelectedMembers(prev => 
                                              prev.map(m => 
                                                m.id === member.id 
                                                  ? { ...m, selected: checked }
                                                  : m
                                              )
                                            );
                                          }}
                                        />
                                        <span className="font-medium">{member.name}</span>
                                      </div>

                                      {selectedMembers.find(m => m.id === member.id)?.selected && (
                                        <div className="mt-4 grid grid-cols-3 gap-4">
                                          <div className="space-y-2">
                                            <label className="text-sm text-gray-600">Buy-in Amount</label>
                                            <Input
                                              type="number"
                                              min={sessionDetails.tableSettings.minBuyIn}
                                              max={sessionDetails.tableSettings.maxBuyIn}
                                              value={buyIns[member.id] || ""}
                                              onChange={(e) => setBuyIns(prev => ({
                                                ...prev,
                                                [member.id]: e.target.value
                                              }))}
                                              className="bg-white"
                                            />
                                          </div>
                                          
                                          <div className="space-y-2">
                                            <label className="text-sm text-gray-600">Start Time</label>
                                            <Input
                                              type="time"
                                              value={playerSessions[member.id]?.startTime || ""}
                                              onChange={(e) => setPlayerSessions(prev => ({
                                                ...prev,
                                                [member.id]: {
                                                  ...prev[member.id],
                                                  startTime: e.target.value
                                                }
                                              }))}
                                              className="bg-white"
                                            />
                                          </div>

                                          <div className="space-y-2">
                                            <label className="text-sm text-gray-600">End Time</label>
                                            <Input
                                              type="time"
                                              value={playerSessions[member.id]?.endTime || ""}
                                              onChange={(e) => setPlayerSessions(prev => ({
                                                ...prev,
                                                [member.id]: {
                                                  ...prev[member.id],
                                                  endTime: e.target.value
                                                }
                                              }))}
                                              className="bg-white"
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Notes Section */}
                              <div className="space-y-1">
                                <label className="text-sm font-medium">Session Notes</label>
                                <textarea
                                  className="w-full rounded-lg border p-2 text-sm min-h-[60px] bg-white"
                                  placeholder="Add any notes about the session..."
                                  value={sessionDetails.notes}
                                  onChange={(e) => 
                                    setSessionDetails(prev => ({ ...prev, notes: e.target.value }))
                                  }
                                />
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-3 pt-3 border-t">
                                <Button 
                                  type="button"
                                  variant="outline"
                                  className="flex-1 h-8 text-sm"
                                  onClick={() => {
                                    // Reset form
                                    setSessionDetails({
                                      gameType: "",
                                      location: "",
                                      tableSettings: {
                                        blinds: "",
                                        minBuyIn: 0,
                                        maxBuyIn: 0,
                                        rake: 0
                                      },
                                      notes: ""
                                    });
                                    setSelectedMembers(mockLeaderboard.map(m => ({ ...m, selected: false })));
                                    setBuyIns({});
                                    setPlayerSessions({});
                                  }}
                                >
                                  Reset
                                </Button>
                                <Button 
                                  type="submit" 
                                  className="flex-1 h-8 text-sm"
                                  disabled={!sessionDetails.gameType || selectedMembers.filter(m => m.selected).length === 0}
                                >
                                  Start Session
                                </Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          Members
                        </Button>
                      </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        <h4 className="text-lg font-semibold">Leaderboard</h4>
                      </div>

                      <div className="space-y-3">
                        {mockLeaderboard.map((member, index) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            {/* Rank and Avatar */}
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-semibold text-gray-500 w-6">
                                {index + 1}.
                              </span>
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                {member.avatar ? (
                                  <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <Users className="h-6 w-6 text-gray-400" />
                                )}
                              </div>
                            </div>

                            {/* Member Details */}
                            <div className="flex-1 grid grid-cols-4 gap-4">
                              <div>
                                <p className="font-medium">{member.name}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4 text-gray-400" />
                                <span className={member.netProfit >= 0 ? "text-green-600" : "text-red-600"}>
                                  ${member.netProfit}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span>${member.profitPerHour}/hr</span>
                              </div>
                              <div>
                                <span className="text-gray-600">{member.hoursPlayed}h played</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Sessions */}
                    {sessions.length > 0 && (
                      <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-blue-500" />
                          <h4 className="text-lg font-semibold">Recent Sessions</h4>
                        </div>
                        <div className="space-y-3">
                          {sessions.map((session) => (
                            <Card key={session.id}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium">{session.gameType}</p>
                                    <p className="text-sm text-gray-500">
                                      {new Date(session.date).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {session.players.length} players
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    Players: {session.players.map(p => p.name).join(", ")}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Active Session */}
                    {activeSession && (
                      <Card className="mt-4 border-blue-200 bg-blue-50">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <h3 className="font-medium text-blue-800">Active Session</h3>
                              <p className="text-sm text-blue-600">{activeSession.gameType}</p>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setActiveSession(null);
                                setPlayerSessions(prev => 
                                  Object.fromEntries(
                                    Object.entries(prev).map(([id, session]) => [
                                      id,
                                      { ...session, isActive: false, endTime: formatTime(new Date()) }
                                    ])
                                  )
                                );
                              }}
                            >
                              End Session
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {Object.values(playerSessions)
                              .filter(player => player.isActive)
                              .map(player => (
                                <div key={player.memberId} className="flex justify-between items-center p-2 bg-white rounded">
                                  <span>{player.name}</span>
                                  <span className="text-sm text-gray-600">
                                    Started: {player.startTime}
                                  </span>
                                </div>
                              ))
                            }
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSegment === "Learn" && (
              <div className="space-y-6">
                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-blue-600">Pre-Flop Hand Strength Tool</h3>
                    </div>

                    <div className="space-y-6">
                      {/* Card Selection */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">First Card</label>
                          <Select
                            value={selectedCard1?.display || ""}
                            onValueChange={(value) => 
                              setSelectedCard1(CARDS.find(c => c.display === value) || null)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select first card" />
                            </SelectTrigger>
                            <SelectContent>
                              {CARDS.map((card) => (
                                <SelectItem key={card.display} value={card.display}>
                                  {card.display}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Second Card</label>
                          <Select
                            value={selectedCard2?.display || ""}
                            onValueChange={(value) => 
                              setSelectedCard2(CARDS.find(c => c.display === value) || null)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select second card" />
                            </SelectTrigger>
                            <SelectContent>
                              {CARDS.map((card) => (
                                <SelectItem key={card.display} value={card.display}>
                                  {card.display}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Position Selection */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Position</label>
                        <Select
                          value={selectedPosition}
                          onValueChange={(value: Position) => setSelectedPosition(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            {POSITIONS.map((pos) => (
                              <SelectItem key={pos} value={pos}>
                                {pos}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Check GTO Move Button */}
                      <Button
                        className="w-full"
                        onClick={handleCheckGTO}
                        disabled={!selectedCard1 || !selectedCard2}
                      >
                        Check GTO Move
                      </Button>

                      {/* Result Display */}
                      {gtoMove && (
                        <div className={cn(
                          "p-4 rounded-lg text-center font-medium",
                          getActionColor(gtoMove)
                        )}>
                          <p className="text-sm mb-1">
                            Hand: {selectedCard1?.display}{selectedCard2?.display} ({normalizeToGTO(selectedCard1, selectedCard2)})
                          </p>
                          <p className="text-lg">Recommended Action: {gtoMove}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
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
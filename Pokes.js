import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewType = "Day" | "Week" | "Month";
type SegmentType = "Overview" | "Session" | "Cost";

interface PokerStats {
  winnings: number;
  losses: number;
  hoursPlayed: number;
  profitPerHour?: number;
}

export default function PokerTracker() {
  const [view, setView] = useState<ViewType>("Week");
  const [activeSegment, setActiveSegment] = useState<SegmentType>("Overview");
  const [data, setData] = useState<PokerStats>({
    winnings: 0,
    losses: 0,
    hoursPlayed: 0,
    profitPerHour: 0,
  });

  const changeView = (direction: "prev" | "next") => {
    const views: ViewType[] = ["Day", "Week", "Month"];
    const currentIndex = views.indexOf(view);
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < views.length) {
      setView(views[newIndex]);
    }
  };

  const segments: SegmentType[] = ["Overview", "Session", "Cost"];

  // Calculate net profit
  const netProfit = data.winnings - data.losses;
  const profitPercentage = data.hoursPlayed > 0 
    ? ((netProfit / (data.winnings + data.losses)) * 100).toFixed(1)
    : "0";

  return (
    <div className="p-4 max-w-md mx-auto bg-background">
      {/* Header Navigation */}
      <div className="flex justify-between items-center mb-6">
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
      <div className="space-y-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Winnings</p>
            <p className="text-lg font-bold text-green-500">${data.winnings.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Losses</p>
            <p className="text-lg font-bold text-red-500">${data.losses.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Hours Played</p>
            <p className="text-lg font-bold">{data.hoursPlayed} hrs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Profit per Hour</p>
            <p className={cn(
              "text-lg font-bold",
              data.profitPerHour > 0 ? "text-green-500" : "text-red-500"
            )}>
              ${data.profitPerHour?.toFixed(2)}/hr
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
"use client";


import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import {
  Users,
  Target,
  BarChart3,
  Plus,
  Download,
  Share2,
  Eye,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";

// Sample player data
const samplePlayers = {
  homeTeam: [
    {
      id: 1,
      name: "Alisson",
      position: "GK",
      rating: 88,
      form: 7.8,
      fitness: 95,
      role: "Goalkeeper",
    },
    {
      id: 2,
      name: "Alexander-Arnold",
      position: "RB",
      rating: 87,
      form: 8.2,
      fitness: 92,
      role: "Attacking Fullback",
    },
    {
      id: 3,
      name: "Van Dijk",
      position: "CB",
      rating: 90,
      form: 8.5,
      fitness: 89,
      role: "Ball-Playing Defender",
    },
    {
      id: 4,
      name: "Konate",
      position: "CB",
      rating: 84,
      form: 7.9,
      fitness: 94,
      role: "Centre Back",
    },
    {
      id: 5,
      name: "Robertson",
      position: "LB",
      rating: 86,
      form: 8.1,
      fitness: 91,
      role: "Attacking Fullback",
    },
    {
      id: 6,
      name: "Fabinho",
      position: "CDM",
      rating: 85,
      form: 7.6,
      fitness: 88,
      role: "Defensive Midfielder",
    },
    {
      id: 7,
      name: "Henderson",
      position: "CM",
      rating: 83,
      form: 7.4,
      fitness: 85,
      role: "Box-to-Box Midfielder",
    },
    {
      id: 8,
      name: "Thiago",
      position: "CM",
      rating: 86,
      form: 8.0,
      fitness: 82,
      role: "Deep-Lying Playmaker",
    },
    {
      id: 9,
      name: "Salah",
      position: "RW",
      rating: 89,
      form: 8.7,
      fitness: 93,
      role: "Inside Forward",
    },
    {
      id: 10,
      name: "Nunez",
      position: "ST",
      rating: 82,
      form: 7.8,
      fitness: 96,
      role: "Target Man",
    },
    {
      id: 11,
      name: "Diaz",
      position: "LW",
      rating: 84,
      form: 8.3,
      fitness: 94,
      role: "Inverted Winger",
    },
  ],
  awayTeam: [
    {
      id: 12,
      name: "Ederson",
      position: "GK",
      rating: 89,
      form: 8.1,
      fitness: 94,
      role: "Sweeper Keeper",
    },
    {
      id: 13,
      name: "Walker",
      position: "RB",
      rating: 85,
      form: 7.7,
      fitness: 87,
      role: "Defensive Fullback",
    },
    {
      id: 14,
      name: "Stones",
      position: "CB",
      rating: 86,
      form: 8.0,
      fitness: 90,
      role: "Ball-Playing Defender",
    },
    {
      id: 15,
      name: "Dias",
      position: "CB",
      rating: 88,
      form: 8.4,
      fitness: 92,
      role: "Centre Back",
    },
    {
      id: 16,
      name: "Cancelo",
      position: "LB",
      rating: 87,
      form: 8.2,
      fitness: 89,
      role: "Inverted Fullback",
    },
    {
      id: 17,
      name: "Rodri",
      position: "CDM",
      rating: 87,
      form: 8.6,
      fitness: 91,
      role: "Deep-Lying Playmaker",
    },
    {
      id: 18,
      name: "De Bruyne",
      position: "CM",
      rating: 91,
      form: 8.9,
      fitness: 86,
      role: "Advanced Playmaker",
    },
    {
      id: 19,
      name: "Bernardo",
      position: "CM",
      rating: 86,
      form: 8.3,
      fitness: 93,
      role: "Box-to-Box Midfielder",
    },
    {
      id: 20,
      name: "Mahrez",
      position: "RW",
      rating: 86,
      form: 7.9,
      fitness: 88,
      role: "Inside Forward",
    },
    {
      id: 21,
      name: "Haaland",
      position: "ST",
      rating: 88,
      form: 9.1,
      fitness: 97,
      role: "Poacher",
    },
    {
      id: 22,
      name: "Grealish",
      position: "LW",
      rating: 84,
      form: 7.8,
      fitness: 91,
      role: "Winger",
    },
  ],
};

const formations = [
  {
    name: "4-3-3",
    positions: [
      [50, 85],
      [20, 65],
      [35, 65],
      [65, 65],
      [80, 65],
      [35, 45],
      [50, 45],
      [65, 45],
      [20, 25],
      [50, 25],
      [80, 25],
    ],
  },
  {
    name: "4-2-3-1",
    positions: [
      [50, 85],
      [20, 65],
      [35, 65],
      [65, 65],
      [80, 65],
      [35, 50],
      [65, 50],
      [20, 35],
      [50, 35],
      [80, 35],
      [50, 20],
    ],
  },
  {
    name: "3-5-2",
    positions: [
      [50, 85],
      [25, 70],
      [50, 70],
      [75, 70],
      [15, 50],
      [35, 50],
      [50, 50],
      [65, 50],
      [85, 50],
      [40, 25],
      [60, 25],
    ],
  },
  {
    name: "4-4-2",
    positions: [
      [50, 85],
      [20, 65],
      [35, 65],
      [65, 65],
      [80, 65],
      [20, 45],
      [40, 45],
      [60, 45],
      [80, 45],
      [40, 25],
      [60, 25],
    ],
  },
];

const TacticalBoard = ({
  formation,
  players,
  team,
  onPlayerSelect,
  isComparison = false,
  onPositionChange,
}) => {
  const [draggedPlayer, setDraggedPlayer] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const boardRef = useRef(null);

  const handleMouseDown = (e, player, index) => {
    e.preventDefault();
    setDraggedPlayer({ player, index });

    const rect = boardRef.current.getBoundingClientRect();
    const playerRect = e.currentTarget.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - playerRect.left - playerRect.width / 2,
      y: e.clientY - playerRect.top - playerRect.height / 2,
    });
  };

  const handleMouseMove = (e) => {
    if (!draggedPlayer || !boardRef.current) return;

    e.preventDefault();
    const rect = boardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    const y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;

    // Constrain to board boundaries
    const constrainedX = Math.max(5, Math.min(95, x));
    const constrainedY = Math.max(5, Math.min(95, y));

    // Update position in real-time
    if (onPositionChange) {
      onPositionChange(draggedPlayer.index, [constrainedX, constrainedY]);
    }
  };

  const handleMouseUp = () => {
    setDraggedPlayer(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchStart = (e, player, index) => {
    e.preventDefault();
    const touch = e.touches[0];
    setDraggedPlayer({ player, index });

    const rect = boardRef.current.getBoundingClientRect();
    const playerRect = e.currentTarget.getBoundingClientRect();

    setDragOffset({
      x: touch.clientX - playerRect.left - playerRect.width / 2,
      y: touch.clientY - playerRect.top - playerRect.height / 2,
    });
  };

  const handleTouchMove = (e) => {
    if (!draggedPlayer || !boardRef.current) return;

    e.preventDefault();
    const touch = e.touches[0];
    const rect = boardRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    const y = ((touch.clientY - rect.top - dragOffset.y) / rect.height) * 100;

    // Constrain to board boundaries
    const constrainedX = Math.max(5, Math.min(95, x));
    const constrainedY = Math.max(5, Math.min(95, y));

    // Update position in real-time
    if (onPositionChange) {
      onPositionChange(draggedPlayer.index, [constrainedX, constrainedY]);
    }
  };

  const handleTouchEnd = () => {
    setDraggedPlayer(null);
    setDragOffset({ x: 0, y: 0 });
  };

  // Add event listeners for mouse events
  useEffect(() => {
    if (draggedPlayer) {
      // Mouse events
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      // Touch events
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        // Remove mouse events
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        // Remove touch events
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [draggedPlayer, dragOffset]);

  return (
    <div
      ref={boardRef}
      className="relative bg-green-600 rounded-lg overflow-hidden cursor-default select-none"
      style={{
        aspectRatio: "3/4",
        touchAction: "none", // Prevents default touch behaviors like scrolling
      }}
    >
      {/* Field markings */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-8 border-2 border-white rounded-b-lg"></div>
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 border-2 border-white rounded-t-lg"></div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-white rounded-full"></div>
      </div>

      {/* Grid overlay for better positioning (optional) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-white"
            style={{ top: `${(i + 1) * 10}%` }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-white"
            style={{ left: `${(i + 1) * 10}%` }}
          />
        ))}
      </div>

      {/* Players */}
      {formation.positions.map((pos, index) => {
        const player = players[index];
        if (!player) return null;

        const isDragging = draggedPlayer?.index === index;

        return (
          <div
            key={player.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
              isDragging
                ? "z-50 scale-110 cursor-grabbing"
                : "cursor-grab hover:scale-110 z-10"
            }`}
            style={{
              left: `${pos[0]}%`,
              top: `${pos[1]}%`,
              transition: isDragging ? "none" : "all 0.2s ease",
            }}
            onMouseDown={(e) => handleMouseDown(e, player, index)}
            onClick={() => onPlayerSelect(player)}
            onTouchStart={(e) => handleTouchStart(e, player, index)}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                team === "home" ? "bg-red-600" : "bg-blue-600"
              } border-2 border-white shadow-lg ${isDragging ? "shadow-2xl ring-2 ring-white" : ""}`}
            >
              {index + 1}
            </div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-white bg-black bg-opacity-70 px-2 py-1 rounded whitespace-nowrap">
              {player.name.split(" ").pop()}
            </div>
            {isDragging && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-yellow-300 bg-black bg-opacity-70 px-2 py-1 rounded whitespace-nowrap">
                Dragging...
              </div>
            )}
          </div>
        );
      })}

      {/* Drag instruction overlay */}
      {!isComparison && (
        <div className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          Click/tap and drag players to reposition
        </div>
      )}
    </div>
  );
};

const ComparisonTacticalBoard = ({
  homeFormation,
  awayFormation,
  homePlayers,
  awayPlayers,
  onPlayerSelect,
  onHomePositionChange,
  onAwayPositionChange,
}) => {
  const [draggedPlayer, setDraggedPlayer] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const boardRef = useRef(null);

  const handleMouseDown = (e, player, index, team) => {
    e.preventDefault();
    setDraggedPlayer({ player, index, team });

    const rect = boardRef.current.getBoundingClientRect();
    const playerRect = e.currentTarget.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - playerRect.left - playerRect.width / 2,
      y: e.clientY - playerRect.top - playerRect.height / 2,
    });
  };

  const handleMouseMove = (e) => {
    if (!draggedPlayer || !boardRef.current) return;

    e.preventDefault();
    const rect = boardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    const y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;

    // Allow movement anywhere on the pitch - no constraints
    const constrainedX = Math.max(5, Math.min(95, x));
    const constrainedY = Math.max(5, Math.min(95, y));

    // Update position in real-time
    if (draggedPlayer.team === "home" && onHomePositionChange) {
      onHomePositionChange(draggedPlayer.index, [constrainedX, constrainedY]);
    } else if (draggedPlayer.team === "away" && onAwayPositionChange) {
      onAwayPositionChange(draggedPlayer.index, [constrainedX, constrainedY]);
    }
  };

  const handleMouseUp = () => {
    setDraggedPlayer(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchStart = (e, player, index, team) => {
    e.preventDefault();
    const touch = e.touches[0];
    setDraggedPlayer({ player, index, team });

    const rect = boardRef.current.getBoundingClientRect();
    const playerRect = e.currentTarget.getBoundingClientRect();

    setDragOffset({
      x: touch.clientX - playerRect.left - playerRect.width / 2,
      y: touch.clientY - playerRect.top - playerRect.height / 2,
    });
  };

  const handleTouchMove = (e) => {
    if (!draggedPlayer || !boardRef.current) return;

    e.preventDefault();
    const touch = e.touches[0];
    const rect = boardRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    const y = ((touch.clientY - rect.top - dragOffset.y) / rect.height) * 100;

    // Allow movement anywhere on the pitch - no constraints
    const constrainedX = Math.max(5, Math.min(95, x));
    const constrainedY = Math.max(5, Math.min(95, y));

    // Update position in real-time
    if (draggedPlayer.team === "home" && onHomePositionChange) {
      onHomePositionChange(draggedPlayer.index, [constrainedX, constrainedY]);
    } else if (draggedPlayer.team === "away" && onAwayPositionChange) {
      onAwayPositionChange(draggedPlayer.index, [constrainedX, constrainedY]);
    }
  };

  const handleTouchEnd = () => {
    setDraggedPlayer(null);
    setDragOffset({ x: 0, y: 0 });
  };

  // Convert formation positions for horizontal layout
  const getHomePositions = (formation) => {
    return formation.positions.map(([x, y]) => [x, y]); // Keep original positions for home team
  };

  const getAwayPositions = (formation) => {
    // Mirror away team positions horizontally (flip left-right and top-bottom)
    return formation.positions.map(([x, y]) => [100 - x, 100 - y]);
  };

  // Add event listeners
  useEffect(() => {
    if (draggedPlayer) {
      // Mouse events
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      // Touch events
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        // Remove mouse events
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        // Remove touch events
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [draggedPlayer, dragOffset]);

  const homePositions = getHomePositions(homeFormation);
  const awayPositions = getAwayPositions(awayFormation);

  return (
    <div
      ref={boardRef}
      className="relative bg-green-600 rounded-lg overflow-hidden cursor-default select-none"
      style={{
        aspectRatio: "4/3", // Horizontal layout - wider than tall
        touchAction: "none",
      }}
    >
      {/* Field markings - Horizontal pitch */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {/* Left goal area */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-16 border-2 border-white rounded-r-lg"></div>
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-8 h-8 border-2 border-white rounded-full"></div>

        {/* Center line and circle */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white rounded-full"></div>

        {/* Right goal area */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-16 border-2 border-white rounded-l-lg"></div>
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-8 h-8 border-2 border-white rounded-full"></div>

        {/* Top and bottom lines */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-white"></div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-white"
            style={{ top: `${(i + 1) * 10}%` }}
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-white"
            style={{ left: `${(i + 1) * 6.67}%` }}
          />
        ))}
      </div>

      {/* Home team players */}
      {homePositions.map((pos, index) => {
        const player = homePlayers[index];
        if (!player) return null;

        const isDragging =
          draggedPlayer?.index === index && draggedPlayer?.team === "home";

        return (
          <div
            key={`home-${player.id}`}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
              isDragging
                ? "z-50 scale-110 cursor-grabbing"
                : "cursor-grab hover:scale-110 z-10"
            }`}
            style={{
              left: `${pos[0]}%`,
              top: `${pos[1]}%`,
              transition: isDragging
                ? "none"
                : "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseDown={(e) => handleMouseDown(e, player, index, "home")}
            onClick={() => onPlayerSelect(player)}
            onTouchStart={(e) => handleTouchStart(e, player, index, "home")}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white bg-red-600 border-2 border-white shadow-lg ${
                isDragging ? "shadow-2xl ring-2 ring-white" : ""
              }`}
            >
              {index + 1}
            </div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-white bg-black bg-opacity-70 px-2 py-1 rounded whitespace-nowrap">
              {player.name.split(" ").pop()}
            </div>
            {isDragging && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-yellow-300 bg-black bg-opacity-70 px-2 py-1 rounded whitespace-nowrap">
                Dragging...
              </div>
            )}
          </div>
        );
      })}

      {/* Away team players */}
      {awayPositions.map((pos, index) => {
        const player = awayPlayers[index];
        if (!player) return null;

        const isDragging =
          draggedPlayer?.index === index && draggedPlayer?.team === "away";

        return (
          <div
            key={`away-${player.id}`}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
              isDragging
                ? "z-50 scale-110 cursor-grabbing"
                : "cursor-grab hover:scale-110 z-10"
            }`}
            style={{
              left: `${pos[0]}%`,
              top: `${pos[1]}%`,
              transition: isDragging
                ? "none"
                : "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseDown={(e) => handleMouseDown(e, player, index, "away")}
            onClick={() => onPlayerSelect(player)}
            onTouchStart={(e) => handleTouchStart(e, player, index, "away")}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white bg-blue-600 border-2 border-white shadow-lg ${
                isDragging ? "shadow-2xl ring-2 ring-white" : ""
              }`}
            >
              {index + 1}
            </div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-white bg-black bg-opacity-70 px-2 py-1 rounded whitespace-nowrap">
              {player.name.split(" ").pop()}
            </div>
            {isDragging && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-yellow-300 bg-black bg-opacity-70 px-2 py-1 rounded whitespace-nowrap">
                Dragging...
              </div>
            )}
          </div>
        );
      })}

      {/* Team labels */}
      <div className="absolute top-2 left-2 text-xs text-white bg-red-600 bg-opacity-80 px-2 py-1 rounded">
        Home Team
      </div>
      <div className="absolute top-2 right-2 text-xs text-white bg-blue-600 bg-opacity-80 px-2 py-1 rounded">
        Away Team
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 right-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
        Drag any player anywhere on the pitch
      </div>
    </div>
  );
};

export default function TacticalAnalysisPlatform() {
  const [selectedFormation, setSelectedFormation] = useState({
    ...formations[0],
    positions: [...formations[0].positions], // Create a copy to allow modifications
  });
  const [homeTeamFormation, setHomeTeamFormation] = useState({
    ...formations[0],
    positions: [...formations[0].positions],
  });
  const [awayTeamFormation, setAwayTeamFormation] = useState({
    ...formations[0],
    positions: [...formations[0].positions],
  });
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [analysisNotes, setAnalysisNotes] = useState("");
  const [activeTab, setActiveTab] = useState("builder");
  const [hasCustomPositions, setHasCustomPositions] = useState(false);

  const handlePositionChange = (playerIndex, newPosition) => {
    setSelectedFormation((prev) => ({
      ...prev,
      positions: prev.positions.map((pos, index) =>
        index === playerIndex ? newPosition : pos,
      ),
    }));
    setHasCustomPositions(true);
  };

  const handleHomeTeamPositionChange = (playerIndex, newPosition) => {
    setHomeTeamFormation((prev) => ({
      ...prev,
      positions: prev.positions.map((pos, index) =>
        index === playerIndex ? newPosition : pos,
      ),
    }));
  };

  const handleAwayTeamPositionChange = (playerIndex, newPosition) => {
    setAwayTeamFormation((prev) => ({
      ...prev,
      positions: prev.positions.map((pos, index) =>
        index === playerIndex ? newPosition : pos,
      ),
    }));
  };

  const resetFormation = () => {
    const originalFormation = formations.find(
      (f) => f.name === selectedFormation.name,
    );
    setSelectedFormation({
      ...originalFormation,
      positions: [...originalFormation.positions],
    });
    setHasCustomPositions(false);
  };

  const saveCustomFormation = () => {
    // Here you could save the custom formation to localStorage or send to API
    alert("Custom formation saved!");
  };

  const PlayerCard = ({ player }) => (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{player.name}</CardTitle>
          <Badge variant="outline">{player.position}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{player.role}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="text-center">
            <div className="font-semibold text-lg">{player.rating}</div>
            <div className="text-muted-foreground">Rating</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">{player.form}</div>
            <div className="text-muted-foreground">Form</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">{player.fitness}%</div>
            <div className="text-muted-foreground">Fitness</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Performance</span>
            <div className="flex items-center gap-1">
              <div
                className={`w-2 h-2 rounded-full ${player.form >= 8 ? "bg-green-500" : player.form >= 7 ? "bg-yellow-500" : "bg-red-500"}`}
              ></div>
              <span className="font-medium">
                {player.form >= 8
                  ? "Excellent"
                  : player.form >= 7
                    ? "Good"
                    : "Average"}
              </span>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span>Fitness Level</span>
            <div className="flex items-center gap-1">
              <div
                className={`w-2 h-2 rounded-full ${player.fitness >= 90 ? "bg-green-500" : player.fitness >= 80 ? "bg-yellow-500" : "bg-red-500"}`}
              ></div>
              <span className="font-medium">
                {player.fitness >= 90
                  ? "Peak"
                  : player.fitness >= 80
                    ? "Good"
                    : "Tired"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">TactiCore</h1>
                <p className="text-sm text-muted-foreground">
                  Professional Football Analysis Platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Analysis
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="builder" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Lineup Builder
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Team Comparison
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Match Analysis
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Tactical Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Tactical Board</CardTitle>
                      <Select
                        value={selectedFormation.name}
                        onValueChange={(value) => {
                          const formation = formations.find(
                            (f) => f.name === value,
                          );
                          setSelectedFormation({
                            ...formation,
                            positions: [...formation.positions],
                          });
                          setHasCustomPositions(false);
                        }}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {formations.map((formation) => (
                            <SelectItem
                              key={formation.name}
                              value={formation.name}
                            >
                              {formation.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {hasCustomPositions && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={resetFormation}
                          >
                            Reset
                          </Button>
                          <Button size="sm" onClick={saveCustomFormation}>
                            Save Custom
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <TacticalBoard
                      formation={selectedFormation}
                      players={samplePlayers.homeTeam}
                      team="home"
                      onPlayerSelect={setSelectedPlayer}
                      onPositionChange={handlePositionChange}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {selectedPlayer ? (
                  <PlayerCard player={selectedPlayer} />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Player Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-center py-8">
                        Click on a player to view their details
                      </p>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Formation Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Defensive Stability</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-green-500"></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Attacking Threat</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-blue-500"></div>
                        </div>
                        <span className="text-sm font-medium">80%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Midfield Control</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-3/5 h-full bg-yellow-500"></div>
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Comparison - Full Pitch View</CardTitle>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                        <span>Home Team (Left Side)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                        <span>Away Team (Right Side)</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ComparisonTacticalBoard
                      homeFormation={homeTeamFormation}
                      awayFormation={awayTeamFormation}
                      homePlayers={samplePlayers.homeTeam}
                      awayPlayers={samplePlayers.awayTeam}
                      onPlayerSelect={setSelectedPlayer}
                      onHomePositionChange={handleHomeTeamPositionChange}
                      onAwayPositionChange={handleAwayTeamPositionChange}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium text-red-600">
                      Home Formation
                    </label>
                    <Select
                      value={homeTeamFormation.name}
                      onValueChange={(value) => {
                        const formation = formations.find(
                          (f) => f.name === value,
                        );
                        setHomeTeamFormation({
                          ...formation,
                          positions: [...formation.positions],
                        });
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formations.map((formation) => (
                          <SelectItem
                            key={formation.name}
                            value={formation.name}
                          >
                            {formation.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">
                      Away Formation
                    </label>
                    <Select
                      value={awayTeamFormation.name}
                      onValueChange={(value) => {
                        const formation = formations.find(
                          (f) => f.name === value,
                        );
                        setAwayTeamFormation({
                          ...formation,
                          positions: [...formation.positions],
                        });
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formations.map((formation) => (
                          <SelectItem
                            key={formation.name}
                            value={formation.name}
                          >
                            {formation.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedPlayer ? (
                  <PlayerCard player={selectedPlayer} />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Player Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-center py-8">
                        Click on a player to view their details
                      </p>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Formation Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span>Defensive Line Height</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-red-600">Home: Deep</span>
                        <span className="text-blue-600">Away: High</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span>Midfield Compactness</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-red-600">Home: Wide</span>
                        <span className="text-blue-600">Away: Narrow</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span>Attacking Width</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-red-600">Home: Balanced</span>
                        <span className="text-blue-600">Away: Wide</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Head-to-Head Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-red-600" />
                      <span className="font-semibold">Defense</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Home</span>
                        <span className="font-medium">8.2</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Away</span>
                        <span className="font-medium">8.5</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-yellow-600" />
                      <span className="font-semibold">Midfield</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Home</span>
                        <span className="font-medium">7.8</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Away</span>
                        <span className="font-medium">8.7</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-green-600" />
                      <span className="font-semibold">Attack</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Home</span>
                        <span className="font-medium">8.6</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Away</span>
                        <span className="font-medium">8.4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Battles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        TAA
                      </div>
                      <span className="text-sm font-medium">vs</span>
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        GRL
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        Attacking FB vs Winger
                      </div>
                      <div className="text-xs text-muted-foreground">
                        High intensity duel
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        VVD
                      </div>
                      <span className="text-sm font-medium">vs</span>
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        HAA
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">CB vs Striker</div>
                      <div className="text-xs text-muted-foreground">
                        Crucial matchup
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        FAB
                      </div>
                      <span className="text-sm font-medium">vs</span>
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        KDB
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">DM vs Playmaker</div>
                      <div className="text-xs text-muted-foreground">
                        Midfield control
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tactical Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Add your tactical analysis notes here..."
                    value={analysisNotes}
                    onChange={(e) => setAnalysisNotes(e.target.value)}
                    className="min-h-[200px]"
                  />
                  <div className="flex justify-end mt-3">
                    <Button size="sm">Save Notes</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Predicted Outcome</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-red-600">35%</div>
                    <div className="text-sm text-muted-foreground">
                      Home Win
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: "35%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-gray-600">25%</div>
                    <div className="text-sm text-muted-foreground">Draw</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gray-600 h-2 rounded-full"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-blue-600">40%</div>
                    <div className="text-sm text-muted-foreground">
                      Away Win
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Analysis:</strong> Away team has slight advantage
                    due to superior midfield control and clinical finishing.
                    Home team's high defensive line could be exploited by pace
                    in attack.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">73%</div>
                      <div className="text-sm text-muted-foreground">
                        Possession Expected
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">2.3</div>
                      <div className="text-sm text-muted-foreground">
                        Expected Goals
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">High</div>
                      <div className="text-sm text-muted-foreground">
                        Press Intensity
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">Fast</div>
                      <div className="text-sm text-muted-foreground">
                        Counter Attacks
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tactical Strengths</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">
                      Strong wing play with overlapping fullbacks
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">
                      Effective high pressing in final third
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">
                      Quick transitions from defense to attack
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Potential Weaknesses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">
                      Vulnerable to counter-attacks on the flanks
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">
                      Midfield could be overrun in central areas
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">
                      High defensive line susceptible to through balls
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Adjustments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Defensive Phase</h4>
                  <p className="text-sm text-muted-foreground">
                    Consider dropping the defensive line 5-10 yards deeper to
                    reduce space behind the defense. Assign a midfielder to
                    track the opponent's advanced playmaker.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Attacking Phase</h4>
                  <p className="text-sm text-muted-foreground">
                    Utilize the pace of the wingers to stretch the opponent's
                    defense. Look for quick combinations in the half-spaces to
                    create overloads.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Set Pieces</h4>
                  <p className="text-sm text-muted-foreground">
                    Target the far post with crosses from corners. The height
                    advantage in the box should be exploited, particularly with
                    the center-backs pushing forward.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

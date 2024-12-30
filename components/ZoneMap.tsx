"use client";

import { useState } from "react";

const zones = [
  { id: "north", name: "North Delhi", demand: 1500 },
  { id: "south", name: "South Delhi", demand: 2000 },
  { id: "east", name: "East Delhi", demand: 1200 },
  { id: "west", name: "West Delhi", demand: 1800 },
  { id: "central", name: "Central Delhi", demand: 1000 },
];

export default function ZoneMap() {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[400px] bg-gray-100">
      {zones.map((zone) => (
        <div
          key={zone.id}
          className="absolute w-20 h-20 bg-blue-500 cursor-pointer transition-all duration-300 ease-in-out"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            opacity: hoveredZone === zone.id ? 1 : 0.7,
            transform: hoveredZone === zone.id ? 'scale(1.1)' : 'scale(1)',
          }}
          onMouseEnter={() => setHoveredZone(zone.id)}
          onMouseLeave={() => setHoveredZone(null)}
        >
          <div className="absolute top-full left-0 bg-white p-2 rounded shadow-md">
            <p className="font-bold">{zone.name}</p>
            <p>Demand: {zone.demand} MW</p>
          </div>
        </div>
      ))}
    </div>
  );
}


"use client";

import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { temperature: 20, demand: 3200, humidity: 50 },
  { temperature: 22, demand: 3500, humidity: 55 },
  { temperature: 25, demand: 4000, humidity: 60 },
  { temperature: 28, demand: 4500, humidity: 65 },
  { temperature: 30, demand: 5000, humidity: 70 },
  { temperature: 32, demand: 5500, humidity: 75 },
  { temperature: 35, demand: 6000, humidity: 80 },
];

export default function WeatherImpactChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <XAxis dataKey="temperature" name="Temperature (°C)" />
        <YAxis dataKey="demand" name="Power Demand (MW)" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Temperature vs Demand" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}


"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { zone: "North Delhi", growth: 15 },
  { zone: "South Delhi", growth: 20 },
  { zone: "East Delhi", growth: 12 },
  { zone: "West Delhi", growth: 18 },
  { zone: "Central Delhi", growth: 10 },
];

export default function LoadGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="zone" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="growth" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}


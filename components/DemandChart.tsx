"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { time: "00:00", demand: 3200 },
  { time: "03:00", demand: 2800 },
  { time: "06:00", demand: 3500 },
  { time: "09:00", demand: 4800 },
  { time: "12:00", demand: 5200 },
  { time: "15:00", demand: 5500 },
  { time: "18:00", demand: 6000 },
  { time: "21:00", demand: 4500 },
];

export default function DemandChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="demand" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}


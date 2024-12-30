"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { time: "00:00", demand: 3200 },
  { time: "01:00", demand: 3100 },
  { time: "02:00", demand: 3000 },
  { time: "03:00", demand: 2800 },
  { time: "04:00", demand: 2700 },
  { time: "05:00", demand: 2900 },
  { time: "06:00", demand: 3500 },
  { time: "07:00", demand: 3700 },
  { time: "08:00", demand: 4000 },
  { time: "09:00", demand: 4800 },
  { time: "10:00", demand: 5000 },
  { time: "11:00", demand: 5100 },
  { time: "12:00", demand: 5200 },
  { time: "13:00", demand: 5300 },
  { time: "14:00", demand: 5400 },
  { time: "15:00", demand: 5500 },
  { time: "16:00", demand: 5600 },
  { time: "17:00", demand: 5700 },
  { time: "18:00", demand: 6000 },
  { time: "19:00", demand: 5900 },
  { time: "20:00", demand: 5800 },
  { time: "21:00", demand: 4500 },
  { time: "22:00", demand: 4300 },
  { time: "23:00", demand: 4200 },
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


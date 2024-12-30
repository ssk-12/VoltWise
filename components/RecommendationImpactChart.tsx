"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface RecommendationImpactChartProps {
  impact: number;
}

export default function RecommendationImpactChart({ impact }: RecommendationImpactChartProps) {
  const data = [
    { name: "Current", value: 100 },
    { name: "After Implementation", value: 100 - impact },
  ];

  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center mt-2">Projected Impact: {impact}% reduction in peak demand</p>
    </div>
  );
}


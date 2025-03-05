"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

const industrialZones = [
  {
    name: "East Zone",
    areas: [
      "Jhilmil Industrial Area",
      "Friends Colony Industrial Area, Shahdara",
      "Patpar Ganj Industrial Area",
      "Shahdara Industrial Area",
    ],
    count: 4,
  },
  {
    name: "South Zone",
    areas: [
      "Okhla Industrial Area, Ph-I & Ph-II",
      "Okhla Industrial Estate",
      "Flatted Factory Complex Okhla",
      "Mohan Cooperative Industrial Estate",
      "Flatted Factory Complex, Jhandewalan",
      "Shahzeda Bagh Industrial Area",
    ],
    count: 6,
  },
  {
    name: "West Zone",
    areas: [
      "Naraina Industrial Area Ph-I & Ph-II",
      "Mayapuri Industrial Area Ph-I & Ph-II",
      "Tilak Nagar Industrial Area",
      "Kirti Nagar Industrial Area",
      "D.F.L. Industrial Area, Moti Nagar",
      "Najafgarh Road Industrial Area",
    ],
    count: 6,
  },
  {
    name: "North Zone",
    areas: [
      "G.T. Karnal Road Industrial Area",
      "Rajasthani Udyog Nagar Industrial Area",
      "S.M.A. Industrial Area",
      "S.S.I. Industrial Area",
      "Wazirpur Industrial Area",
      "Lawrance Road Industrial Area",
      "Udyog Nagar Industrial Area",
      "D.S.I.D.C. - Sheds Nagloi",
      "Mangol Puri Industrial Area (Both DDA & DSIDC)",
      "Badli Industrial Area",
      "Narela Industrial Area",
      "Bawana Industrial Area",
      "Rani Jhansi Road Industrial Area",
    ],
    count: 13,
  },
]

// Transform data for the pie chart
const chartData = industrialZones.map((zone) => ({
  name: zone.name,
  value: zone.count,
}))

// Calculate total for percentage
const total = chartData.reduce((sum, item) => sum + item.value, 0)

export default function IndustrialZonesInfo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Delhi Industrial Zones</CardTitle>
        <CardDescription>Distribution of industrial areas across Delhi</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {industrialZones.map((zone) => (
              <div key={zone.name} className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {zone.name} ({zone.count} areas):
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {zone.areas.map((area, index) => (
                    <li key={`${zone.name}-${index}`} className="text-sm">
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="h-[400px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={100}
                  paddingAngle={2}
                  cornerRadius={4}
                  fill="#8884d8"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"][
                          index % 4
                        ]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const data = payload[0].payload
                      const percentage = ((data.value / total) * 100).toFixed(1)
                      return (
                        <div className="bg-background p-2 rounded-md shadow border">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-sm">
                            {data.value} areas ({percentage}%)
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


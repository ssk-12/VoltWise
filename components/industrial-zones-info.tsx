"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    distributor: "BYPL",
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
    distributor: "BRPL",
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
    distributor: "BRPL",
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
    distributor: "TPDDL",
  },
]

const distributors = [
  {
    name: "BRPL",
    fullName: "BSES Rajdhani Power Limited",
    areas: "South and West Delhi",
    color: "#3b82f6", // blue
  },
  {
    name: "BYPL",
    fullName: "BSES Yamuna Power Limited",
    areas: "Central and East Delhi",
    color: "#10b981", // green
  },
  {
    name: "TPDDL",
    fullName: "Tata Power Delhi Distribution Limited",
    areas: "North and Northwest Delhi",
    color: "#f59e0b", // amber
  },
  {
    name: "NDMC",
    fullName: "New Delhi Municipal Council",
    areas: "Lutyens' Delhi and central parts (VIP areas)",
    color: "#ef4444", // red
  },
  {
    name: "MES",
    fullName: "Military Engineering Services",
    areas: "Military and defense establishments",
    color: "#8b5cf6", // purple
  },
]

const populationData = [
  {
    district: "South Delhi",
    population: 2731929,
    distributor: "BRPL",
  },
  {
    district: "South West Delhi",
    population: 2292958,
    distributor: "BRPL",
  },
  {
    district: "West Delhi",
    population: 2543243,
    distributor: "BRPL",
  },
  {
    district: "East Delhi",
    population: 1709346,
    distributor: "BYPL",
  },
  {
    district: "North East Delhi",
    population: 2241624,
    distributor: "BYPL",
  },
  {
    district: "North Delhi",
    population: 887978,
    distributor: "TPDDL",
  },
  {
    district: "North West Delhi",
    population: 3656539,
    distributor: "TPDDL",
  },
]

// Transform data for the industrial zones pie chart
const industrialChartData = industrialZones.map((zone) => ({
  name: zone.name,
  value: zone.count,
  distributor: zone.distributor,
}))

// Calculate total for percentage
const industrialTotal = industrialChartData.reduce((sum, item) => sum + item.value, 0)

// Transform data for the population bar chart
const populationChartData = populationData.map((item) => ({
  ...item,
  populationInMillions: +(item.population / 1000000).toFixed(2),
}))

// Group population by distributor
const populationByDistributor = distributors.map((distributor) => {
  const districts = populationData.filter((item) => item.distributor === distributor.name)
  const totalPopulation = districts.reduce((sum, item) => sum + item.population, 0)
  return {
    name: distributor.name,
    fullName: distributor.fullName,
    value: totalPopulation,
    color: distributor.color,
  }
})

// Calculate total population
const totalPopulation = populationData.reduce((sum, item) => sum + item.population, 0)

export default function IndustrialZonesInfo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Delhi Distribution Analysis</CardTitle>
        <CardDescription>Industrial zones, electricity distributors, and population distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="industrial">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="industrial">Industrial Zones</TabsTrigger>
            <TabsTrigger value="distributors">Electricity Distributors</TabsTrigger>
            <TabsTrigger value="population">Population Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="industrial">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {industrialZones.map((zone) => (
                  <div key={zone.name} className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      {zone.name} ({zone.count} areas) - Served by {zone.distributor}:
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
                      data={industrialChartData}
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
                      {industrialChartData.map((entry, index) => {
                        const distributor = distributors.find((d) => d.name === entry.distributor)
                        return <Cell key={`cell-${index}`} fill={distributor?.color || "#8884d8"} />
                      })}
                    </Pie>
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload.length) {
                          const data = payload[0].payload
                          const percentage = ((data.value / industrialTotal) * 100).toFixed(1)
                          return (
                            <div className="bg-background p-2 rounded-md shadow border">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm">
                                {data.value} areas ({percentage}%)
                              </p>
                              <p className="text-sm">Distributor: {data.distributor}</p>
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
          </TabsContent>

          <TabsContent value="distributors">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {distributors.map((distributor) => (
                    <div
                      key={distributor.name}
                      className="p-4 border rounded-lg"
                      style={{ borderLeftColor: distributor.color, borderLeftWidth: "4px" }}
                    >
                      <h3 className="text-lg font-semibold">
                        {distributor.name} - {distributor.fullName}
                      </h3>
                      <p className="text-sm">Service Area: {distributor.areas}</p>
                    </div>
                  ))}
                </div>
                <div className="h-[400px] flex flex-col items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={populationByDistributor}
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
                        {populationByDistributor.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ payload }) => {
                          if (payload && payload.length) {
                            const data = payload[0].payload
                            const percentage = ((data.value / totalPopulation) * 100).toFixed(1)
                            const populationInMillions = (data.value / 1000000).toFixed(2)
                            return (
                              <div className="bg-background p-2 rounded-md shadow border">
                                <p className="font-medium">
                                  {data.name} - {data.fullName}
                                </p>
                                <p className="text-sm">
                                  {populationInMillions} million people ({percentage}%)
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
              <div className="text-sm text-muted-foreground">
                <p>Population distribution by electricity distributor service areas based on 2011 Census data.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="population">
            <div className="space-y-6">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={populationChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="district" />
                    <YAxis label={{ value: "Population (millions)", angle: -90, position: "insideLeft" }} />
                    <Tooltip
                      content={({ payload, label }) => {
                        if (payload && payload.length) {
                          const data = payload[0].payload
                          const distributor = distributors.find((d) => d.name === data.distributor)
                          return (
                            <div className="bg-background p-2 rounded-md shadow border">
                              <p className="font-medium">{label}</p>
                              <p className="text-sm">Population: {data.population.toLocaleString()} people</p>
                              <p className="text-sm">
                                Distributor: {data.distributor} - {distributor?.fullName}
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="populationInMillions" name="Population (millions)" radius={[4, 4, 0, 0]}>
                      {populationChartData.map((entry, index) => {
                        const distributor = distributors.find((d) => d.name === entry.distributor)
                        return <Cell key={`cell-${index}`} fill={distributor?.color || "#8884d8"} />
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {distributors.slice(0, 3).map((distributor) => {
                  const districts = populationData.filter((item) => item.distributor === distributor.name)
                  const totalPopulation = districts.reduce((sum, item) => sum + item.population, 0)
                  const populationInMillions = (totalPopulation / 1000000).toFixed(2)

                  return (
                    <Card key={distributor.name} className="overflow-hidden">
                      <div className="h-2" style={{ backgroundColor: distributor.color }}></div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          {distributor.name} - {distributor.fullName}
                        </CardTitle>
                        <CardDescription>Serves {distributor.areas}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{populationInMillions} million</p>
                        <p className="text-sm text-muted-foreground">Total population served</p>
                        <div className="mt-2">
                          <p className="text-sm font-medium">Districts:</p>
                          <ul className="list-disc pl-5 text-sm">
                            {districts.map((district) => (
                              <li key={district.district}>
                                {district.district}: {(district.population / 1000000).toFixed(2)} million
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Population data based on the 2011 Census for Delhi districts.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

type PredictionData = {
  hour: number
  prediction: number[][]
}

type InsightData = {
  hour: number
  BRPL: number
  BYPL: number
  NDPL: number
  NDMC: number
  MES: number
  total: number
}

const zoneColors = {
  BRPL: "#3b82f6",
  BYPL: "#f97316",
  NDPL: "#22c55e",
  NDMC: "#ef4444",
  MES: "#6b7280",
}

export default function InsightsPanel() {
  const [data, setData] = useState<InsightData[]>([])
  const [selectedZone, setSelectedZone] = useState<string>("all")

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:8000/predict?date=2025-02-16")
      const json = await res.json()
      const processedData = processData(json.predictions)
      setData(processedData)
    }
    fetchData()
  }, [])

  const processData = (predictions: PredictionData[]): InsightData[] => {
    return predictions.map((item) => ({
      hour: item.hour,
      BRPL: item.prediction[0][0],
      BYPL: item.prediction[0][1],
      NDPL: item.prediction[0][2],
      NDMC: item.prediction[0][3],
      MES: item.prediction[0][4],
      total: item.prediction[0].reduce((a, b) => a + b, 0),
    }))
  }

  const getTotalDailyDemand = () => {
    return data.reduce((sum, item) => sum + item.total, 0).toFixed(2)
  }

  const getPeakDemand = () => {
    const peak = data.reduce((max, item) => (item.total > max.total ? item : max), data[0])
    return { hour: peak.hour, demand: peak.total.toFixed(2) }
  }

  const getOffPeakDemand = () => {
    const offPeak = data.reduce((min, item) => (item.total < min.total ? item : min), data[0])
    return { hour: offPeak.hour, demand: offPeak.total.toFixed(2) }
  }

  const getZoneWiseBreakdown = () => {
    const zones = ["BRPL", "BYPL", "NDPL", "NDMC", "MES"]
    return zones.map((zone) => ({
      zone,
      total: data.reduce((sum, item) => sum + item[zone as keyof InsightData], 0).toFixed(2),
    }))
  }

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Electricity Demand Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary" className="w-full">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="hourly">Hourly Demand</TabsTrigger>
            <TabsTrigger value="zoneWise">Zone-wise Breakdown</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Total Daily Demand</h3>
                <p className="text-2xl font-bold">{getTotalDailyDemand()} MWh</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Peak Demand</h3>
                <p className="text-2xl font-bold">{getPeakDemand().demand} MWh</p>
                <p>at {getPeakDemand().hour}:00</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Off-Peak Demand</h3>
                <p className="text-2xl font-bold">{getOffPeakDemand().demand} MWh</p>
                <p>at {getOffPeakDemand().hour}:00</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="hourly">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Demand" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="zoneWise">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={getZoneWiseBreakdown()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


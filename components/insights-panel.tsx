"use client"

import { useState, useEffect, useCallback } from "react"
import { format } from "date-fns"
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
import { ChartSkeleton } from "./loading-skeleton"
import { ErrorMessage } from "./error-message"

type PredictionData = {
  hour: number
  prediction: number[][]
}

interface InsightData {
  hour: number
  BRPL: number | null
  BYPL: number | null
  NDPL: number | null
  NDMC: number | null
  MES: number | null
  total: number | null
}

interface InsightsPanelProps {
  date: Date
}

export default function InsightsPanel({ date }: InsightsPanelProps) {
  const [data, setData] = useState<InsightData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const formattedDate = format(date, "yyyy-MM-dd")
      const response = await fetch(`http://127.0.0.1:8000/predict?date=${formattedDate}`, {
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const json = await response.json()

      // Safely transform and validate data
      const predictions = json?.predictions ?? []
      const processedData = predictions.map((item: PredictionData) => {
        const predictionValues = item?.prediction?.[0] ?? []
        return {
          hour: item?.hour ?? 0,
          BRPL: predictionValues[0] ?? null,
          BYPL: predictionValues[1] ?? null,
          NDPL: predictionValues[2] ?? null,
          NDMC: predictionValues[3] ?? null,
          MES: predictionValues[4] ?? null,
          total: predictionValues.reduce((a: number, b: number | null) => a + (b ?? 0), 0),
        }
      })

      setData(processedData)
    } catch (err) {
      console.error("Error fetching prediction data:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch prediction data")
      setData([])
    } finally {
      setIsLoading(false)
    }
  }, [date])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const getTotalDailyDemand = () => {
    return data.reduce((sum, item) => sum + (item.total ?? 0), 0).toFixed(2)
  }

  const getPeakDemand = () => {
    const peak = data.reduce(
      (max, item) => ((item.total ?? 0) > (max.total ?? 0) ? item : max),
      data[0] ?? { hour: 0, total: 0 },
    )
    return { hour: peak.hour, demand: peak.total?.toFixed(2) ?? "N/A" }
  }

  const getOffPeakDemand = () => {
    const offPeak = data.reduce(
      (min, item) => ((item.total ?? Number.POSITIVE_INFINITY) < (min.total ?? Number.POSITIVE_INFINITY) ? item : min),
      data[0] ?? { hour: 0, total: Number.POSITIVE_INFINITY },
    )
    return { hour: offPeak.hour, demand: offPeak.total?.toFixed(2) ?? "N/A" }
  }

  const getZoneWiseBreakdown = () => {
    const zones = ["BRPL", "BYPL", "NDPL", "NDMC", "MES"] as const
    return zones.map((zone) => ({
      zone,
      total: data.reduce((sum, item) => sum + (item[zone] ?? 0), 0).toFixed(2),
    }))
  }

  if (isLoading) return <ChartSkeleton />
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />
  if (!data.length) return <ErrorMessage message="No data available for the selected date" />

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
                <XAxis dataKey="hour" tickFormatter={(value) => `${value}:00`} />
                <YAxis />
                <Tooltip formatter={(value: number | null) => (value === null ? "N/A" : `${value.toFixed(2)} MW`)} />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Demand" connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="zoneWise">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={getZoneWiseBreakdown()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} MWh`} />
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


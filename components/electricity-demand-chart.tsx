"use client"

import { useState, useEffect, useCallback } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartSkeleton } from "./loading-skeleton"
import { ErrorMessage } from "./error-message"

type PredictionData = {
  hour: number
  prediction: number[][]
}

interface ChartData {
  hour: number
  BRPL: number | null
  BYPL: number | null
  NDPL: number | null
  NDMC: number | null
  MES: number | null
}

interface ElectricityDemandChartProps {
  date: Date
}

export default function ElectricityDemandChart({ date }: ElectricityDemandChartProps) {
  const [data, setData] = useState<ChartData[]>([])
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
      const chartData = predictions.map((item: PredictionData) => ({
        hour: item?.hour ?? 0,
        BRPL: item?.prediction?.[0]?.[0] ?? null,
        BYPL: item?.prediction?.[0]?.[1] ?? null,
        NDPL: item?.prediction?.[0]?.[2] ?? null,
        NDMC: item?.prediction?.[0]?.[3] ?? null,
        MES: item?.prediction?.[0]?.[4] ?? null,
      }))

      setData(chartData)
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

  if (isLoading) return <ChartSkeleton />
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />
  if (!data.length) return <ErrorMessage message="No data available for the selected date" />

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Hourly Electricity Demand Projection</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" tickFormatter={(value) => `${value}:00`} />
            <YAxis />
            <Tooltip formatter={(value: number | null) => (value === null ? "N/A" : `${value.toFixed(2)} MW`)} />
            <Legend />
            <Line type="monotone" dataKey="BRPL" stroke="#8884d8" connectNulls name="BRPL" />
            <Line type="monotone" dataKey="BYPL" stroke="#82ca9d" connectNulls name="BYPL" />
            <Line type="monotone" dataKey="NDPL" stroke="#ffc658" connectNulls name="NDPL" />
            <Line type="monotone" dataKey="NDMC" stroke="#ff7300" connectNulls name="NDMC" />
            <Line type="monotone" dataKey="MES" stroke="#00C49F" connectNulls name="MES" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


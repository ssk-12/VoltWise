"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type PredictionData = {
  hour: number
  prediction: number[][]
}

export default function ElectricityDemandChart() {
  const [data, setData] = useState<PredictionData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:8000/predict?date=2025-02-16")
      const json = await res.json()
      setData(json.predictions)
    }
    fetchData()
  }, [])

  const chartData = data.map((item) => ({
    hour: item.hour,
    BRPL: item.prediction[0][0],
    BYPL: item.prediction[0][1],
    NDPL: item.prediction[0][2],
    NDMC: item.prediction[0][3],
    MES: item.prediction[0][4],
  }))

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Hourly Electricity Demand Projection</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="BRPL" stroke="#8884d8" />
            <Line type="monotone" dataKey="BYPL" stroke="#82ca9d" />
            <Line type="monotone" dataKey="NDPL" stroke="#ffc658" />
            <Line type="monotone" dataKey="NDMC" stroke="#ff7300" />
            <Line type="monotone" dataKey="MES" stroke="#00C49F" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type WeatherData = {
  time: string
  temp: number
  dwpt: number
  rhum: number
  prcp: number
  wdir: number
  wspd: number
  pres: number
  coco: number
}

export default function WeatherInfo() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const res = await fetch(
        "https://d.meteostat.net/app/proxy/stations/hourly?station=42182&tz=Asia/Kolkata&start=2025-02-09&end=2025-02-09",
      )
      const json = await res.json()
      setWeatherData(json.data[0])
    }
    fetchWeatherData()
  }, [])

  if (!weatherData) return null

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Weather Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>Temperature: {weatherData.temp}°C</div>
          <div>Humidity: {weatherData.rhum}%</div>
          <div>Wind Speed: {weatherData.wspd} m/s</div>
          <div>Pressure: {weatherData.pres} hPa</div>
        </div>
      </CardContent>
    </Card>
  )
}


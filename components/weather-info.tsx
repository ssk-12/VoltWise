"use client"

import { useState, useEffect, useCallback } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherSkeleton } from "./loading-skeleton"
import { ErrorMessage } from "./error-message"

type WeatherData = {
  time: string | null
  temp: number | null
  dwpt: number | null
  rhum: number | null
  prcp: number | null
  wdir: number | null
  wspd: number | null
  pres: number | null
  coco: number | null
}

interface WeatherInfoProps {
  date: Date
}

export default function WeatherInfo({ date }: WeatherInfoProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWeatherData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const formattedDate = format(date, "yyyy-MM-dd")
      const response = await fetch(
        `https://d.meteostat.net/app/proxy/stations/hourly?station=42182&tz=Asia/Kolkata&start=2025-02-03&end=2025-02-03`,
        {
          headers: {
            Accept: "application/json",
          },
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const json = await response.json()

      // Safely access nested properties with optional chaining and nullish coalescing
      const data = json?.data?.[0] ?? null
      setWeatherData(data)
    } catch (err) {
      console.error("Error fetching weather data:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch weather data")
      setWeatherData(null)
    } finally {
      setIsLoading(false)
    }
  }, [date])

  useEffect(() => {
    fetchWeatherData()
  }, [fetchWeatherData])

  if (isLoading) return <WeatherSkeleton />
  if (error) return <ErrorMessage message={error} onRetry={fetchWeatherData} />
  if (!weatherData) return null

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Weather Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>Temperature: {weatherData.temp ?? "N/A"}°C</div>
          <div>Humidity: {weatherData.rhum ?? "N/A"}%</div>
          <div>Wind Speed: {weatherData.wspd ?? "N/A"} m/s</div>
          <div>Pressure: {weatherData.pres ?? "N/A"} hPa</div>
        </div>
      </CardContent>
    </Card>
  )
}


"use client"

import { useState, useEffect, useCallback } from "react"
import { format, parseISO, differenceInHours } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherSkeleton } from "./loading-skeleton"
import { ErrorMessage } from "./error-message"
import { 
  Thermometer, 
  Droplet, 
  Wind, 
  CloudRain, 
  Gauge, 
  SunDim 
} from "lucide-react"

type WeatherData = {
  time: string
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
        `https://volt-wise-api.onrender.com/weather?date=${formattedDate}`,
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
      // Get the most recent weather data
      const currentTime = new Date()
      const weatherDataArray = json?.data ?? []
      let closestWeatherData = null
      let smallestTimeDifference = Number.POSITIVE_INFINITY
      for (const data of weatherDataArray) {
        const weatherTime = parseISO(data.time)
        const timeDifference = Math.abs(differenceInHours(currentTime, weatherTime))
        if (timeDifference < smallestTimeDifference) {
          smallestTimeDifference = timeDifference
          closestWeatherData = data
        }
      }
      setWeatherData(closestWeatherData)
    } catch (err) {
      console.error("Failed to fetch weather data:", err)
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

  // Helper function to get weather condition description
  const getWeatherCondition = (coco: number | null) => {
    if (coco === null) return "Unknown"
    const conditions = [
      "Clear", "Mainly Clear", "Partly Cloudy", "Overcast", 
      "Fog", "Depositing Rime Fog", "Drizzle", "Freezing Drizzle", 
      "Rain", "Freezing Rain", "Rain Showers", "Snow", "Snow Showers"
    ]
    return conditions[coco] || "Unknown"
  }

  return (
    <Card className="w-full max-w-5xl mx-auto mt-8 shadow-2xl border-2 border-gray-200 rounded-xl bg-white">
      <CardHeader className="bg-gray-800 text-white rounded-t-xl py-5 px-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Weather Insights</CardTitle>
          <SunDim className="w-10 h-10" />
        </div>
        <span className="text-md text-gray-200 mt-2">
          {format(parseISO(weatherData.time), "EEEE, MMMM dd, yyyy · HH:mm")}
        </span>
      </CardHeader>
      <CardContent className="p-8 text-white rounded-b-xl">
        <div className="grid grid-cols-3 gap-6">
          {/* Temperature */}
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
            <Thermometer className="w-8 h-8 text-red-500" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Temperature</span>
              <span className="text-lg font-bold text-gray-800">{weatherData.temp ?? "N/A"}°C</span>
            </div>
          </div>

          {/* Humidity */}
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
            <Droplet className="w-8 h-8 text-blue-500" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Humidity</span>
              <span className="text-lg font-bold text-gray-800">{weatherData.rhum ?? "N/A"}%</span>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
            <Wind className="w-8 h-8 text-green-500" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Wind Speed</span>
              <span className="text-lg font-bold text-gray-800">{weatherData.wspd ?? "N/A"} m/s</span>
            </div>
          </div>

          {/* Pressure */}
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
            <Gauge className="w-8 h-8 text-purple-500" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Pressure</span>
              <span className="text-lg font-bold text-gray-800">{weatherData.pres ?? "N/A"} hPa</span>
            </div>
          </div>

          {/* Precipitation */}
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
            <CloudRain className="w-8 h-8 text-indigo-500" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Precipitation</span>
              <span className="text-lg font-bold text-gray-800">{weatherData.prcp ?? "N/A"} mm</span>
            </div>
          </div>

          {/* Weather Condition */}
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
            <SunDim className="w-8 h-8 text-yellow-500" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Condition</span>
              <span className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                {getWeatherCondition(weatherData.coco)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

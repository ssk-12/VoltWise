"use client"

import { useState } from "react"
import ElectricityDemandChart from "@/components/electricity-demand-chart"
import WeatherInfo from "@/components/weather-info"
import DatePicker from "@/components/date-picker"
import Fouter from "@/components/fouter"
import InsightsPanel from "@/components/insights-panel"
import PredictionTable from "@/components/prediction-table"
import IndustrialZonesInfo from "@/components/industrial-zones-info"
import { ThemeToggle } from "@/components/theme-toggle"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src="image.png" 
              alt="Electricity Demand Logo" 
              className="w-16 h-12 rounded-md"
            />
            <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300">
              Electricity Demand Projection With AI
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <DatePicker 
              date={selectedDate} 
              onDateChange={(date) => date && setSelectedDate(date)} 
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Top Row: Weather Info and Insights Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <WeatherInfo date={selectedDate} />
          <InsightsPanel date={selectedDate} />
        </div>

        {/* Bottom Row: Stacked Components */}
        <div className="space-y-5">
          <ElectricityDemandChart date={selectedDate} />
          <PredictionTable date={selectedDate} />
          <IndustrialZonesInfo />
          <Fouter />
        </div>
      </main>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}

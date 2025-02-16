"use client"

import { useState } from "react"
import ElectricityDemandChart from "@/components/electricity-demand-chart"
import WeatherInfo from "@/components/weather-info"
import DatePicker from "@/components/date-picker"
import DistributorInfo from "@/components/distributor-info"
import InsightsPanel from "@/components/insights-panel"
import { ThemeToggle } from "@/components/theme-toggle"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 scrollbar-custom">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8">Electricity Demand Projection</h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-8 gap-4">
          <DatePicker date={selectedDate} onDateChange={(date) => date && setSelectedDate(date)} />
          <ThemeToggle />
        </div>
        <WeatherInfo date={selectedDate} />
        <ElectricityDemandChart date={selectedDate} />
        <InsightsPanel date={selectedDate} />
        <DistributorInfo />
      </div>
      <ScrollToTop />
    </main>
  )
}


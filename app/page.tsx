import ElectricityDemandChart from "@/components/electricity-demand-chart"
import WeatherInfo from "@/components/weather-info"
import DatePicker from "@/components/date-picker"
import DistributorInfo from "@/components/distributor-info"
import InsightsPanel from "@/components/insights-panel"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold mb-8">Electricity Demand Projection</h1>
          <div className="flex justify-between items-center mb-8">
            <DatePicker />
            <ThemeToggle />
          </div>
          <WeatherInfo />
          <ElectricityDemandChart />
          {/* <InsightsPanel /> */}
          <DistributorInfo />
        </div>
      </main>
    </ThemeProvider>
  )
}


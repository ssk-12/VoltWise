import { Card } from "@/components/ui/card"
import { 
 
  CloudIcon, 
  ChartBarIcon, 
} from "lucide-react"

export function ChartSkeleton() {
  return (
    <Card className="w-full mt-8 overflow-hidden border-none shadow-lg">
      <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-900/30 p-6">
        <div className="absolute inset-0 animate-pulse-slow">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-white/20 dark:bg-white/10 transform -skew-x-12"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/20 dark:bg-white/10 transform skew-x-12"></div>
        </div>
        
        <div className="relative z-10 flex items-center space-x-4 mb-6">
          <div className="bg-blue-100 dark:bg-blue-800/50 p-3 rounded-full">
            <ChartBarIcon className="w-8 h-8 text-blue-400 dark:text-blue-300 animate-bounce-slow" />
          </div>
          <div className="flex-grow">
            <div className="h-6 bg-white/70 dark:bg-gray-800/70 rounded-full w-1/2 animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
              className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-5 space-y-4 shadow-md border border-white/30 dark:border-gray-700/30 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="h-4 bg-blue-200 dark:bg-blue-900/50 rounded-full w-3/4 animate-pulse-slow"></div>
              <div className="h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl w-full animate-pulse"></div>
              <div className="h-3 bg-blue-200 dark:bg-blue-900/50 rounded-full w-1/2 animate-pulse-slow"></div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white/60 dark:bg-gray-800/60 rounded-3xl p-4 shadow-lg border border-white/20 dark:border-gray-700/20">
          <div className="h-[300px] bg-blue-50 dark:bg-blue-900/30 rounded-2xl animate-pulse-slow"></div>
        </div>
      </div>
    </Card>
  )
}

export function WeatherSkeleton() {
  return (
    <Card className="w-full mt-8 overflow-hidden border-none shadow-lg">
      <div className="relative bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/50 dark:to-blue-900/30 p-6">
        <div className="absolute inset-0 animate-pulse-slow">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-white/20 dark:bg-white/10 transform -skew-x-12"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/20 dark:bg-white/10 transform skew-x-12"></div>
        </div>
        
        <div className="relative z-10 flex items-center space-x-4 mb-6">
          <div className="bg-cyan-100 dark:bg-cyan-800/50 p-3 rounded-full">
            <CloudIcon className="w-8 h-8 text-cyan-400 dark:text-cyan-300 animate-pulse" />
          </div>
          <div className="flex-grow">
            <div className="h-6 bg-white/70 dark:bg-gray-800/70 rounded-full w-1/2 animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div 
              key={item} 
              className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-5 space-y-4 shadow-md border border-white/30 dark:border-gray-700/30 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="h-5 bg-cyan-200 dark:bg-cyan-900/50 rounded-full w-3/4 animate-pulse-slow"></div>
              <div className="h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl w-full animate-pulse"></div>
              <div className="h-4 bg-cyan-200 dark:bg-cyan-900/50 rounded-full w-1/2 animate-pulse-slow"></div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
export default function EngagingSkeletonLoaders() {
  return (
    <div className="space-y-8">
      <ChartSkeleton />
      <WeatherSkeleton />
    </div>
  )
}

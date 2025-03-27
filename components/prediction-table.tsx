"use client"

import { useEffect, useState } from "react"
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { format } from "date-fns"
import { 
  Clock, 
  Database, 
  AlertTriangle, 
  CalendarFold
} from "lucide-react"
import { CardHeader } from "./ui/card"

type Prediction = {
  hour: number
  brpl: number
  bypl: number
  ndpl: number
  ndmc: number
  mes: number
}

interface PredictionTableProps {
  date: Date
}

export default function PredictionTable({ date }: PredictionTableProps) {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const formattedDate = format(date, "yyyy-MM-dd")
        const response = await fetch(`https://volt-wise-api.onrender.com/predict?date=${formattedDate}`)

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()

        const transformedData = data.predictions.map((item:any) => ({
          hour: item.hour,
          brpl: item.prediction[0][0],
          bypl: item.prediction[0][1],
          ndpl: item.prediction[0][2],
          ndmc: item.prediction[0][3],
          mes: item.prediction[0][4],
        }))

        setPredictions(transformedData)
      } catch (err) {
        console.error("Error fetching predictions:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPredictions()
  }, [date])

  // Color function for value highlighting
  const getValueColor = (value: number) => {
    if (value < 50) return 'text-red-600 bg-red-50'
    if (value < 100) return 'text-yellow-600 bg-yellow-50'
    return 'text-green-600 bg-green-50'
  }

  // Columns definition
  const columns: ColumnDef<Prediction>[] = [
    {
      accessorKey: "hour",
      header: "Hour",
      cell: ({ row }) => {
        const hour = row.getValue("hour") as number
        return (
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="font-medium">{hour}:00</span>
          </div>
        )
      },
    },
    {
      accessorKey: "brpl",
      header: "BRPL",
      cell: ({ row }) => {
        const value = row.getValue("brpl") as number
        return (
          <div className={`px-3 py-1 rounded-full inline-flex items-center ${getValueColor(value)}`}>
            {value.toFixed(2)}
            <span className="text-xs ml-1 opacity-70">MW</span>
          </div>
        )
      },
    },
    // Similar implementation for other providers
    {
      accessorKey: "bypl",
      header: "BYPL",
      cell: ({ row }) => {
        const value = row.getValue("bypl") as number
        return (
          <div className={`px-3 py-1 rounded-full inline-flex items-center ${getValueColor(value)}`}>
            {value.toFixed(2)}
            <span className="text-xs ml-1 opacity-70">MW</span>
          </div>
        )
      },
    },
    {
      accessorKey: "ndpl",
      header: "NDPL",
      cell: ({ row }) => {
        const value = row.getValue("ndpl") as number
        return (
          <div className={`px-3 py-1 rounded-full inline-flex items-center ${getValueColor(value)}`}>
            {value.toFixed(2)}
            <span className="text-xs ml-1 opacity-70">MW</span>
          </div>
        )
      },
    },
    {
      accessorKey: "ndmc",
      header: "NDMC",
      cell: ({ row }) => {
        const value = row.getValue("ndmc") as number
        return (
          <div className={`px-3 py-1 rounded-full inline-flex items-center ${getValueColor(value)}`}>
            {value.toFixed(2)}
            <span className="text-xs ml-1 opacity-70">MW</span>
          </div>
        )
      },
    },
    {
      accessorKey: "mes",
      header: "MES",
      cell: ({ row }) => {
        const value = row.getValue("mes") as number
        return (
          <div className={`px-3 py-1 rounded-full inline-flex items-center ${getValueColor(value)}`}>
            {value.toFixed(2)}
            <span className="text-xs ml-1 opacity-70">MW</span>
          </div>
        )
      },
    },
  ]

  // Create table instance
  const table = useReactTable({
    data: predictions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-red-200">
        <div className="flex items-center space-x-3 text-red-500">
          <AlertTriangle className="w-6 h-6" />
          <p className="text-gray-800 font-medium">Error loading predictions: {error}</p>
        </div>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  // Main render
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <CardHeader className="bg-gray-800 text-white rounded-t-xl py-6 px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center space-x-3">
          <Database className="w-6 h-6 text-blue-500" />
          <span>Hourly Electricity Predictions</span>
        </h2>
        
        <div className="font-medium text-white flex justify-between items-center space-x-3 ">
        <p><CalendarFold /></p> <p>{format(date, "MMMM d, yyyy")}</p>
        </div>
      </div>
      </CardHeader>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              {table.getHeaderGroups()[0].headers.map(header => (
                <th 
                  key={header.id} 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td 
                    key={cell.id} 
                    className="px-4 py-3 whitespace-nowrap dark:text-black"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

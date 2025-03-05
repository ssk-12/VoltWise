"use client"

import { useEffect, useState } from "react"
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { format } from "date-fns"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

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

        // Transform the API response into a format suitable for the table
        const transformedData = data.predictions.map((item: any) => ({
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

  const columns: ColumnDef<Prediction>[] = [
    {
      accessorKey: "hour",
      header: "Hour",
      cell: ({ row }) => {
        const hour = row.getValue("hour") as number
        return `${hour}:00`
      },
    },
    {
      accessorKey: "brpl",
      header: "BRPL",
      cell: ({ row }) => {
        const value = row.getValue("brpl") as number
        return value.toFixed(2)
      },
    },
    {
      accessorKey: "bypl",
      header: "BYPL",
      cell: ({ row }) => {
        const value = row.getValue("bypl") as number
        return value.toFixed(2)
      },
    },
    {
      accessorKey: "ndpl",
      header: "NDPL",
      cell: ({ row }) => {
        const value = row.getValue("ndpl") as number
        return value.toFixed(2)
      },
    },
    {
      accessorKey: "ndmc",
      header: "NDMC",
      cell: ({ row }) => {
        const value = row.getValue("ndmc") as number
        return value.toFixed(2)
      },
    },
    {
      accessorKey: "mes",
      header: "MES",
      cell: ({ row }) => {
        const value = row.getValue("mes") as number
        return value.toFixed(2)
      },
    },
  ]

  const table = useReactTable({
    data: predictions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (error) {
    return (
      <div className="rounded-md border p-4 bg-destructive/10 text-destructive">
        <p>Error loading predictions: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Hourly Predictions for {format(date, "MMMM d, yyyy")}</h2>
      <div className="rounded-md border">
        <div className="h-[400px] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                {table
                  .getHeaderGroups()
                  .map((headerGroup) =>
                    headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )),
                  )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 24 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 6 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}


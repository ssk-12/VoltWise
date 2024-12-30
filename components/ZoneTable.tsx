import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const zoneData = [
  { zone: "North Delhi", demand: 1500, population: 8000000, peakHour: "18:00" },
  { zone: "South Delhi", demand: 2000, population: 7000000, peakHour: "19:00" },
  { zone: "East Delhi", demand: 1200, population: 6000000, peakHour: "17:00" },
  { zone: "West Delhi", demand: 1800, population: 7500000, peakHour: "18:30" },
  { zone: "Central Delhi", demand: 1000, population: 5000000, peakHour: "17:30" },
];

export default function ZoneTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Zone</TableHead>
          <TableHead>Demand (MW)</TableHead>
          <TableHead>Population</TableHead>
          <TableHead>Peak Hour</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {zoneData.map((row) => (
          <TableRow key={row.zone}>
            <TableCell>{row.zone}</TableCell>
            <TableCell>{row.demand}</TableCell>
            <TableCell>{row.population.toLocaleString()}</TableCell>
            <TableCell>{row.peakHour}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


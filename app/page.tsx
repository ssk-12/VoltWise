import DemandChart from "@/components/DemandChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Total Demand</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5000 MW</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Projected Peak Demand</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">8500 MW</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Temperature: 32°C</p>
            <p>Humidity: 65%</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>24-Hour Demand Variations</CardTitle>
        </CardHeader>
        <CardContent>
          <DemandChart />
        </CardContent>
      </Card>
    </div>
  );
}


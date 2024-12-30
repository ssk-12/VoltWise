import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WeatherImpactChart from "@/components/WeatherImpactChart";

export default function WeatherImpact() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Weather Impact</h1>
      <Card>
        <CardHeader>
          <CardTitle>Temperature vs Power Demand</CardTitle>
        </CardHeader>
        <CardContent>
          <WeatherImpactChart />
        </CardContent>
      </Card>
    </div>
  );
}


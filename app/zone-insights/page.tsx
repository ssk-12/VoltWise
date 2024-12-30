import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ZoneMap from "@/components/ZoneMap";
import ZoneTable from "@/components/ZoneTable";

export default function ZoneInsights() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Zone-specific Insights</h1>
      <Card>
        <CardHeader>
          <CardTitle>Zone Demand Map</CardTitle>
        </CardHeader>
        <CardContent>
          <ZoneMap />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Zone Demand Data</CardTitle>
        </CardHeader>
        <CardContent>
          <ZoneTable />
        </CardContent>
      </Card>
    </div>
  );
}


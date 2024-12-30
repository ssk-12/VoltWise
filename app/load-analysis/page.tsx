import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LoadGrowthChart from "@/components/LoadGrowthChart";

export default function LoadAnalysis() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Load Growth Analysis</h1>
      <div className="flex space-x-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Zone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="north">North Delhi</SelectItem>
            <SelectItem value="south">South Delhi</SelectItem>
            <SelectItem value="east">East Delhi</SelectItem>
            <SelectItem value="west">West Delhi</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2021">2021</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Load Growth by Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadGrowthChart />
        </CardContent>
      </Card>
    </div>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const strategies = [
  {
    state: "Maharashtra",
    strategy: "Time-of-Day Tariff",
    pros: ["Encourages off-peak usage", "Reduces peak load"],
    cons: ["Complex billing", "Requires smart meters"],
  },
  {
    state: "Gujarat",
    strategy: "Demand Response Program",
    pros: ["Flexible load management", "Incentivizes large consumers"],
    cons: ["Limited to industrial consumers", "Requires real-time monitoring"],
  },
  {
    state: "Karnataka",
    strategy: "Renewable Integration",
    pros: ["Reduces carbon footprint", "Diversifies energy sources"],
    cons: ["Intermittent supply", "High initial investment"],
  },
];

export default function ComparativeStudy() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Comparative Study</h1>
      <Tabs defaultValue={strategies[0].state}>
        <TabsList>
          {strategies.map((strategy) => (
            <TabsTrigger key={strategy.state} value={strategy.state}>
              {strategy.state}
            </TabsTrigger>
          ))}
        </TabsList>
        {strategies.map((strategy) => (
          <TabsContent key={strategy.state} value={strategy.state}>
            <Card>
              <CardHeader>
                <CardTitle>{strategy.strategy}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold mb-2">Pros</h3>
                    <ul className="list-disc pl-4">
                      {strategy.pros.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Cons</h3>
                    <ul className="list-disc pl-4">
                      {strategy.cons.map((con, index) => (
                        <li key={index}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}


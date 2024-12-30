import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RecommendationImpactChart from "@/components/RecommendationImpactChart";

const recommendations = [
  {
    title: "Implement Time-of-Use Tariffs",
    description: "Introduce variable pricing based on peak and off-peak hours to incentivize load shifting.",
    impact: 15,
  },
  {
    title: "Expand Demand Response Programs",
    description: "Engage more industrial and commercial consumers in load curtailment during peak hours.",
    impact: 20,
  },
  {
    title: "Increase Renewable Energy Integration",
    description: "Accelerate the adoption of solar and wind power to diversify the energy mix and reduce reliance on conventional sources.",
    impact: 25,
  },
];

export default function Recommendations() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">AI Recommendations</h1>
      {recommendations.map((recommendation, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{recommendation.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{recommendation.description}</p>
            <RecommendationImpactChart impact={recommendation.impact} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DistributorInfo() {
  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Electricity Distributors</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5">
          <li>
            <strong>BRPL</strong> – BSES Rajdhani Power Limited: Serves South and West Delhi
          </li>
          <li>
            <strong>BYPL</strong> – BSES Yamuna Power Limited: Serves Central and East Delhi
          </li>
          <li>
            <strong>NDPL</strong> – North Delhi Power Limited (Now Tata Power Delhi Distribution Limited - TPDDL):
            Serves North and Northwest Delhi
          </li>
          <li>
            <strong>NDMC</strong> – New Delhi Municipal Council: Serves Lutyens' Delhi and some central parts, including
            VIP areas
          </li>
          <li>
            <strong>MES</strong> – Military Engineering Services: Serves Military and defense establishments in Delhi
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}


import { simulate } from "@/lib/simulate";
import type { kW, kWhPer100km } from "@/types";
import FormatNumber from "@/components/format-number";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

export default function Task1() {
  const {
    theoreticalMaxPowerDemand,
    actualMaxPowerDemand,
    concurrencyFactor,
    totalEnergyConsumed,
  } = simulate({
    chargepoints: 20,
    chargingPower: 11 as kW,
    evConsumption: 18 as kWhPer100km,
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Simulation Results</CardTitle>
          <CardDescription>
            20 chargepoints with 11 kW power for one year in 15-minute
            intervals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(
                [
                  [
                    "Theoretical Max Power Demand",
                    theoreticalMaxPowerDemand,
                    "kW",
                  ],
                  ["Actual Max Power Demand", actualMaxPowerDemand, "kW"],
                  ["Concurrency Factor", concurrencyFactor * 100, "%"],
                  ["Total Energy Consumed", totalEnergyConsumed, "kWh"],
                ] as const
              ).map(([label, value, unit]) => (
                <TableRow key={label}>
                  <TableCell className="font-medium">{label}</TableCell>
                  <TableCell>
                    <FormatNumber value={value} unit={unit} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

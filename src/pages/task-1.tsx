import { use } from "react";
import { simulate } from "@/lib/simulate";
import ResultRenderer from "@/components/result-renderer";

export default function Task1() {
  const {
    theoreticalMaxPowerDemand,
    actualMaxPowerDemand,
    concurrencyFactor,
    totalEnergyConsumed,
  } = use(
    simulate({
      chargepointCount: 20,
      chargingPower: 11,
      evConsumption: 18,
    })
  );

  return (
    <ResultRenderer
      title="Simulation Results"
      description="20 chargepoints with 11 kW power for one year in 15-minute intervals."
      result={[
        ["Theoretical Max Power Demand", theoreticalMaxPowerDemand, "kW"],
        ["Actual Max Power Demand", actualMaxPowerDemand, "kW"],
        ["Concurrency Factor", concurrencyFactor * 100, "%"],
        ["Total Energy Consumed", totalEnergyConsumed, "kWh"],
      ]}
    />
  );
}

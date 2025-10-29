import FormatNumber from "@/components/format-number";
import { BatteryCharging, Percent, Zap, Activity } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { type SimulationFormData } from "@/types";

export default function Result() {
  const form = useFormContext<SimulationFormData>();
  const [chargepoints, chargingPower, progress, result] = useWatch({
    control: form.control,
    name: ["chargepoints", "chargingPower", "progress", "result"],
  });

  const items = [
    [
      <Zap color="white" size={16} />,
      "Theoretical Max Power Demand",
      chargepoints * chargingPower,
      "kW",
    ],
    [
      <Activity color="white" size={16} />,
      "Actual Max Power Demand",
      result?.actualMaxPowerDemand ?? progress?.actualMaxPowerDemand,
      "kW",
    ],
    [
      <BatteryCharging color="white" size={16} />,
      "Total Energy Consumed",
      result?.totalEnergyConsumed ?? progress?.totalEnergyConsumed,
      "kWh",
    ],
    [
      <Percent color="white" size={16} />,
      "Concurrency Factor",
      result ? result.concurrencyFactor * 100 : undefined,
      "%",
    ],
  ] as const;

  return (
    <div className="flex items-center space-x-8">
      {items.map(([icon, label, value, unit]) => (
        <div key={label} className="flex-none flex space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-500 p-1">{icon}</div>
          <div className="space-y-2">
            <div className="text-xs opacity-80">{label}</div>
            <div className="flex items-end space-x-2">
              <div className="font-bold text-xl">
                {value ? <FormatNumber value={value} /> : "—"}
              </div>
              <span className="text-xs opacity-80 mb-1">{unit}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

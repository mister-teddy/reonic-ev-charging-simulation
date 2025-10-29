import FormatNumber from "@/components/format-number";
import { BatteryCharging, Percent, Zap, Activity } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { type SimulationFormData } from "@/types";
import { useEffect } from "react";

export default function Result() {
  const form = useFormContext<SimulationFormData>();
  const [chargepoints, chargingPower, progress, result] = useWatch({
    control: form.control,
    name: ["chargepoints", "chargingPower", "progress", "result"],
  });

  useEffect(() => {
    form.setValue("result", undefined);
  }, [chargepoints, chargingPower]);

  const items = [
    [
      <Zap color="white" size={16} />,
      "Theoretical Max Power Demand",
      chargepoints * chargingPower,
      "kW",
      "result",
    ],
    [
      <Activity color="white" size={16} />,
      "Actual Max Power Demand",
      result?.actualMaxPowerDemand ?? progress?.actualMaxPowerDemand,
      "kW",
      result ? "result" : progress ? "progress" : "n/a",
    ],
    [
      <BatteryCharging color="white" size={16} />,
      "Total Energy Consumed",
      result?.totalEnergyConsumed ?? progress?.totalEnergyConsumed,
      "kWh",
      result ? "result" : progress ? "progress" : "n/a",
    ],
    [
      <Percent color="white" size={16} />,
      "Concurrency Factor",
      result ? result.concurrencyFactor * 100 : undefined,
      "%",
      result ? "result" : "n/a",
    ],
  ] as const;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {items.map(([icon, label, value, unit, status]) => (
        <div key={label} className="flex-none flex space-x-2">
          <div
            className={`w-6 h-6 rounded-full p-1 ${
              {
                result: "bg-blue-500",
                progress: "bg-yellow-500",
                "n/a": "bg-gray-400",
              }[status]
            }`}
          >
            {icon}
          </div>
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

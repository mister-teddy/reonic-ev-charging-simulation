import parkingLot from "@/assets/parking-lot.webp";
import { useFormContext, useWatch } from "react-hook-form";
import EV from "@/components/ev";
import type { SimulationFormData } from "@/types";
import { useMemo } from "react";
import { ARRIVAL_PROBABILITIES } from "@/config";
import { timeAtTick } from "@/lib/simulate";

function ElectricIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M13,9h6L8,22l3-10H5L10,2h7Z" fill="white" />
    </svg>
  );
}

export default function ParkingLot() {
  const { control } = useFormContext<SimulationFormData>();
  const [chargepoints, arrivalProbabilityScale, progress] = useWatch({
    control,
    name: ["chargepoints", "arrivalProbabilityScale", "progress"],
  });

  const hour = progress ? timeAtTick(progress.tick)[0] : new Date().getHours();
  const isNight = hour < 6 || hour > 20;
  const chargers = useMemo(() => {
    if (progress) {
      return progress.chargers;
    }
    const chance = ARRIVAL_PROBABILITIES[hour] * (arrivalProbabilityScale ?? 1);
    return new Array<number>(chargepoints)
      .fill(0)
      .map(() => (Math.random() * 100 < chance ? 1 : 0));
  }, [chargepoints, progress]);

  return (
    <div className="relative h-full">
      <img
        src={parkingLot}
        loading="lazy"
        className="w-full h-full object-cover transition-all"
        style={{
          filter: isNight ? "brightness(0.4)" : "none",
        }}
      />
      <div
        className="absolute inset-0 bottom-14 gap-2 grid w-full overflow-hidden p-1 sm:p-2 items-stretch"
        style={{
          gridTemplateColumns: `repeat(${Math.round(
            Math.sqrt(chargers.length) * 1.4
          )}, 1fr)`,
        }}
      >
        {chargers.map((ticksLeft, i) => (
          <div
            key={i}
            className={`p-[10%] relative flex justify-center items-center ${
              ticksLeft > 0 ? "bg-green-400/50" : "bg-white/50"
            }`}
          >
            <div className="rounded-full w-1/2 aspect-square bg-white/50 absolute flex justify-center items-center p-1">
              <ElectricIcon />
            </div>
            <div
              className="absolute w-full h-full flex justify-center items-center p-[10%]"
              style={{
                opacity: ticksLeft > 0 ? 1 : 0,
              }}
            >
              <EV />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

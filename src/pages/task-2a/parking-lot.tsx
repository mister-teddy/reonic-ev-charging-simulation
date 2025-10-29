import parkingLot from "@/assets/parking-lot.webp";
import { useWatch } from "react-hook-form";
import { SimulationConfig } from "@/types";
import EV from "@/components/ev";

export default function ParkingLot() {
  const chargepoints = useWatch<typeof SimulationConfig.infer>({
    name: "chargepoints",
  });

  return (
    <div className="relative h-full">
      <img
        src={parkingLot}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 gap-2 grid w-full overflow-hidden p-1 sm:p-2 items-stretch transition-all"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${Math.round(
            100 / Math.sqrt(chargepoints ?? 0)
          )}%, 1fr))`,
        }}
      >
        {[...Array(chargepoints)].map((_, i) => (
          <div
            key={i}
            className={`p-[10%] transition-all relative flex justify-center items-center ${
              Math.random() < 0.7 ? "bg-white/50" : "bg-green-400/50"
            }`}
          >
            <div className="rounded-full w-1/2 aspect-square bg-white/50 absolute flex justify-center items-center p-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M13,9h6L8,22l3-10H5L10,2h7Z" fill="white" />
              </svg>
            </div>
            <div className="absolute w-full h-full flex justify-center items-center p-[10%]">
              <EV />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

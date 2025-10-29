import Calendar from "@/components/calendar";
import Clock from "@/components/clock";
import { Progress } from "@/components/ui/progress";
import { TICKS_PER_HOUR } from "@/config";
import { timeAtTick } from "@/lib/simulate";
import type { SimulationFormData } from "@/types";
import { useFormContext, useWatch } from "react-hook-form";

export default function Toolbar() {
  const { control } = useFormContext<SimulationFormData>();
  const [period, progress] = useWatch({
    control,
    name: ["period", "progress"],
  });
  const [hour, minute] = progress
    ? timeAtTick(progress.tick)
    : [new Date().getHours(), 0];

  return (
    <div className="w-full flex items-center gap-2 rounded-lg bg-background p-1.5 shadow-lg">
      <Calendar
        day={progress ? Math.floor(progress.tick / TICKS_PER_HOUR / 24) + 1 : 0}
        of={period ?? 0}
      />
      <Progress
        className="w-full"
        value={progress ? (progress.tick / progress.totalTicks) * 100 : 0}
      />
      <Clock hour={hour} minute={minute} />
    </div>
  );
}

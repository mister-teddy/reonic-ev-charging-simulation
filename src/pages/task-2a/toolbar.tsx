import TimeSelector from "@/components/time-selector";
import { Switch } from "@/components/ui/switch";

export default function Toolbar() {
  return (
    <div className="absolute bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-background p-1.5 shadow-lg">
      <TimeSelector label="Time of Day" value={0} onChange={() => {}} />
      <Switch />
    </div>
  );
}

import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Clock } from "lucide-react";

interface TimeSelectorProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

export default function TimeSelector({
  value,
  onChange,
  label,
}: TimeSelectorProps) {
  const times = useMemo(
    () => new Array(24).fill(0).map((_, i) => `${i}:00 - ${i + 1}:00`),
    []
  );

  return (
    <Select
      value={value.toString()}
      onValueChange={(val) => onChange(Number(val))}
    >
      <SelectTrigger className="w-[180px]">
        <Clock className="mr-2 h-4 w-4" />
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {times.map((time, i) => (
            <SelectItem key={i} value={`${i}`}>
              {time}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

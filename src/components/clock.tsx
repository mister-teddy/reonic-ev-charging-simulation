import { Clock as ClockIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Clock(props: { hour: number; minute: number }) {
  return (
    <Button variant="ghost" type="button">
      <ClockIcon />
      <span>
        <span className="inline-block w-[2ch]" aria-label="Hour">
          {props.hour.toString().padStart(2, "0")}
        </span>
        :
        <span className="inline-block w-[2ch]" aria-label="Minute">
          {props.minute.toString().padStart(2, "0")}
        </span>
      </span>
    </Button>
  );
}

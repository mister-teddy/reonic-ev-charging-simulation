import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Calendar(props: { day: number; of: number }) {
  return (
    <Button variant="ghost" type="button">
      <CalendarIcon />
      <span>
        <span
          className="inline-block text-right"
          style={{
            width: String(props.day).length + "ch",
          }}
          aria-label="Day"
        >
          {props.day}
        </span>
        /
        <span
          aria-label="Of"
          className="inline-block text-right"
          style={{
            width: String(props.of).length + "ch",
          }}
        >
          {props.of}
        </span>
      </span>
    </Button>
  );
}

import { TICKS_PER_HOUR } from "@/config";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAtTick(tick: number): [hour: number, minute: number] {
  // Every `TICKS_PER_HOUR` ticks, the hour increases by 1
  let hoursPassed = Math.floor(tick / TICKS_PER_HOUR);

  // Hour 25 -> Hour 1 next day
  const hour = hoursPassed % 24;

  // Get the fractional hour and map to minutes
  const minute = Math.floor((tick % TICKS_PER_HOUR) * (60 / TICKS_PER_HOUR));

  return [hour, minute];
}

export function hourProbabilityToTickProbability(p: number): number {
  // If `p` is the probability of no car arriving in 15 mins, then `p^4` is the probability of no car arriving in an hour
  // Reverse that logic, if we have `p` is the probability of a car arriving in an hour, then `p^(1/4)` is the probability of a car arriving in 15 mins
  return 1 - Math.pow(1 - p, 1 / TICKS_PER_HOUR);
}

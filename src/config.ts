import type { km } from "./types";

/**
 * The `i`th element corresponds to the probability of a car arriving to charge between hour `i` and hour `i+1`.
 *
 * For example, `ARRIVAL_PROBABILITIES[0] = 0.94` means:
 * between 00:00 and 01:00, there is a 0.94% chance of a car arriving to charge.
 */
export const ARRIVAL_PROBABILITIES = [
  0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 2.83, 2.83, 5.66, 5.66, 5.66,
  7.55, 7.55, 7.55, 10.38, 10.38, 10.38, 4.72, 4.72, 4.72, 0.94, 0.94,
];

/**
 * Each tuple is a pair of `[probability, demand]`.
 *
 * For example, `[34.31, 0]` means:
 * 34.31% of cars arriving to charge have a charging demand of 0 km (doesn't charge).
 */
export const CHARGING_DEMAND_PROBABILITIES = [
  [34.31, 0 as km],
  [4.9, 5 as km],
  [9.8, 10 as km],
  [11.76, 20 as km],
  [8.82, 30 as km],
  [11.76, 50 as km],
  [10.78, 100 as km],
  [4.9, 200 as km],
  [2.94, 300 as km],
] satisfies [number, km][];

export const TICKS_PER_HOUR = 4; // 15-minute intervals

export const RANDOM_SEED = "12345";

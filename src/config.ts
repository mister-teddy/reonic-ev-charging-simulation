/**
 * The `i`th element corresponds to the probability of a car arriving to charge between hour `i` and hour `i+1`.
 *
 * For example, `ARRIVAL_PROBABILITIES[0] = 0.94` means:
 * between 00:00 and 01:00, there is a 0.94% chance of a car arriving to charge.
 */
export const ARRIVAL_PROBABILITIES = [
  0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 2.83, 2.83, 5.66, 5.66, 5.66,
  7.55, 7.55, 7.55, 10.38, 10.38, 10.38, 4.72, 4.72, 4.72, 0.94, 0.94,
].map((p) => p / 100);

/**
 * Each tuple is a pair of `[probability, demand]`.
 *
 * For example, `[0.3431, 0]` means:
 * 34.31% of cars arriving to charge have a charging demand of 0 km (doesn't charge).
 */
export const CHARGING_DEMAND_PROBABILITIES = [
  [0.3431, 0],
  [0.049, 5],
  [0.098, 10],
  [0.1176, 20],
  [0.0882, 30],
  [0.1176, 50],
  [0.1078, 100],
  [0.049, 200],
  [0.0294, 300],
];

export const TICKS_PER_HOUR = 4; // 15-minute intervals

export const RANDOM_SEED = "Reonic";

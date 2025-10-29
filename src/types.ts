import { type } from "arktype";

export const SimulationConfig = type({
  /**
   * The number of charge points.
   */
  chargepoints: "number>0",

  /**
   * The charging power per chargepoint.
   */
  chargingPower: type("string.numeric.parse|number", "|>", "number>0"),

  /**
   * The consumption of the cars per 100 km.
   */
  evConsumption: type("string.numeric.parse|number", "|>", "number>0"),

  /**
   * A multiplier for the arrival probability to increase the amount of cars arriving to charge.
   *
   * For example:
   * - A value of 0.2 means the amount of cars arriving to charge will only be 20% of the original arrival probability.
   * - A value of 2 means the amount of cars arriving to charge will be double the original arrival probability.
   */
  arrivalProbabilityScale: "0.2<=number<=2?",

  /**
   * The simulation period in days.
   */
  period: "1<=number<=365?",

  /**
   * Enable seed random for deterministic results.
   */
  useSeedRandom: "boolean?",
});

export type SimulationConfig = typeof SimulationConfig.infer;

export interface SimulationResult {
  /**
   * Total energy consumed.
   */
  totalEnergyConsumed: number;

  /**
   * The theoretical maximum power demand.
   */
  theoreticalMaxPowerDemand: number;

  /**
   * The actual maximum power demand (= the maximum sum of all chargepoints power demands at a given 15-minute interval).
   */
  actualMaxPowerDemand: number;

  /**
   * The ratio of actual to maximum power demand ("concurrency factor").
   */
  concurrencyFactor: number;
}

export interface SimulationProgress {
  tick: number;
  totalTicks: number;
  chargers: number[];
  totalEnergyConsumed: number;
  actualMaxPowerDemand: number;
}

export type SimulationFormData = SimulationConfig & {
  progress?: SimulationProgress;
  result?: SimulationResult;
};

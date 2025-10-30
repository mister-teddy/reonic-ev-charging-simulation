import { type } from "arktype";

export const SimulationParameters = type({
  /**
   * The number of chargepoints.
   */
  chargepointCount: "number>0",

  /**
   * The charging power per chargepoint.
   * In kW.
   */
  chargingPower: type("string.numeric.parse|number", "|>", "number>0"),

  /**
   * The consumption of the cars per 100 km.
   * In kWh.
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
  periodDay: "1<=number<=365?",

  /**
   * Enable seed random for deterministic results.
   */
  useSeedRandom: "boolean?",
});

export type SimulationParameters = typeof SimulationParameters.infer;

export interface SimulationResult {
  /**
   * Total energy consumed.
   * In kWh.
   */
  totalEnergyConsumed: number;

  /**
   * The theoretical maximum power demand.
   * In kW.
   */
  theoreticalMaxPowerDemand: number;

  /**
   * The actual maximum power demand (= the maximum sum of all chargepoints power demands at a given 15-minute interval).
   * In kW.
   */
  actualMaxPowerDemand: number;

  /**
   * The ratio of actual to maximum power demand ("concurrency factor").
   * A number between 0 and 1.
   */
  concurrencyFactor: number;
}

export interface SimulationProgress {
  /**
   * The current tick during the simulation. Combined with `totalTicks`, a % can be calculated.
   */
  tick: number;
  totalTicks: number;

  /**
   * This array can inform the UI about the "busy" state of each charger. Specifically, it contains how long each charger will be used for (in ticks).
   */
  chargers: number[];

  /**
   * @see {@link SimulationResult.totalEnergyConsumed}
   */
  totalEnergyConsumed: number;

  /**
   * @see {@link SimulationResult.actualMaxPowerDemand}
   */
  actualMaxPowerDemand: number;
}

export interface SimulationOptions {
  /**
   * A callback function that is called after each tick to report the progress back to the caller.
   */
  callback?: (progress: SimulationProgress) => void;

  /**
   * Drawing every tick can be very slow, especially for a year simulation period.
   * This signal is used to know that the user wants "Instant Result".
   */
  signal?: AbortSignal;
}

export type SimulationFormData = SimulationParameters & {
  /**
   * We store result and progress in the form data, as it is overkill to pull in a global state management library for this use case.
   */
  result?: SimulationResult;

  /**
   * Information about power consumption at the current tick, busy chargers, etc.
   */
  progress?: SimulationProgress;
};

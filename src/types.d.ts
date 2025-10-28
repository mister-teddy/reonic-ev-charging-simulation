// Nominal typing, so that you don't acidentally pass a value in km where kWh is expected.
export type kW = number & { __unit: "kW" };
export type kWh = number & { __unit: "kWh" };
export type km = number & { __unit: "km" };
export type kWhPer100km = number & { __unit: "kWh/100km" };

export interface SimulationConfig {
  /**
   * The number of charge points.
   */
  chargepoints: number;

  /**
   * The charging power per chargepoint.
   */
  chargingPower: kW;

  /**
   * The consumption of the cars per 100 km.
   */
  evConsumption: kWhPer100km;

  /**
   * A multiplier for the arrival probability to increase the amount of cars arriving to charge.
   *
   * For example:
   * - A value of 0.2 means the amount of cars arriving to charge will only be 20% of the original arrival probability.
   * - A value of 2 means the amount of cars arriving to charge will be double the original arrival probability.
   */
  arrivalProbabilityScale?: number;
}

export interface SimulationResult {
  /**
   * Total energy consumed.
   */
  totalEnergyConsumed: kWh;

  /**
   * The theoretical maximum power demand.
   */
  theoreticalMaxPowerDemand: kW;

  /**
   * The actual maximum power demand (= the maximum sum of all chargepoints power demands at a given 15-minute interval).
   */
  actualMaxPowerDemand: kW;

  /**
   * The ratio of actual to maximum power demand ("concurrency factor").
   */
  concurrencyFactor: number;
}

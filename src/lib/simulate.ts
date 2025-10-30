import {
  ARRIVAL_PROBABILITIES,
  CHARGING_DEMAND_PROBABILITIES,
  RANDOM_SEED,
  TICKS_PER_HOUR,
} from "@/config";
import type {
  SimulationOptions,
  SimulationParameters,
  SimulationResult,
} from "@/types";
import seedrandom from "seedrandom";
import { hourProbabilityToTickProbability, timeAtTick } from "./utils";

/**
 * Simulate EV charging behavior with a set of parameters, combined with probability distributions in the config file.
 */
export async function simulate({
  chargepointCount,
  chargingPower,
  evConsumption,
  arrivalProbabilityScale = 1,
  periodDay = 365,
  useSeedRandom = false,
  ...options
}: SimulationParameters & SimulationOptions): Promise<SimulationResult> {
  const theoreticalMaxPowerDemand = chargepointCount * chargingPower;

  // Setup optional seeded random
  const random = useSeedRandom ? seedrandom(RANDOM_SEED) : Math.random;

  // This function returns a random km based on the `T1: Charging demand probabilities` table
  const randomChargingDemand = () => {
    const chance = random();

    let cumulativeProbability = 0;
    for (const [probability, demand] of CHARGING_DEMAND_PROBABILITIES) {
      cumulativeProbability += probability;
      if (chance < cumulativeProbability) {
        return demand;
      }
    }

    return 0; // In case the toal probabilities don't sum to 100
  };

  // Simulate each charger with a simple number, indicating how many ticks are left until it is free
  const chargers = new Array<number>(chargepointCount).fill(0);

  let totalEnergyConsumed = 0;
  let actualMaxPowerDemand = 0;

  // Simulate each tick
  const totalTicks = periodDay * 24 * TICKS_PER_HOUR;
  for (let tick = 0; tick < totalTicks; tick++) {
    let busyChargers = 0; // We'll need this for `actualMaxPowerDemand` calculation later

    // Calculate EV arrival chance at this tick
    const [hour] = timeAtTick(tick);
    const scaledArrivalProbability =
      ARRIVAL_PROBABILITIES[hour] * arrivalProbabilityScale;
    const arrivalProbabilityPerTick = hourProbabilityToTickProbability(
      scaledArrivalProbability
    );

    for (const i in chargers) {
      // Simulate whether an EV arrives
      const evArrived = random() < arrivalProbabilityPerTick;
      if (evArrived) {
        const chargerIndex =
          chargers[i] === 0 // If an EV arrives at a free charger, it uses that one
            ? Number(i)
            : chargers.findIndex((c) => c === 0); // Otherwise, it finds another free charger. This is important!

        // If there is a free charger
        if (chargerIndex > -1) {
          // Calculate how long the EV will use the charger
          const demand = randomChargingDemand(); // in km
          const energy = (demand * evConsumption) / 100; // in kWh
          const hoursNeeded = energy / chargingPower;
          const ticksNeeded = Math.ceil(hoursNeeded * TICKS_PER_HOUR);

          // Make the charger busy
          chargers[chargerIndex] = ticksNeeded;
        }
      }
    }

    for (const i in chargers) {
      if (chargers[i] > 0) {
        // We'll need this for `actualMaxPowerDemand` calculation later
        busyChargers++;

        // Consume energy and count down
        totalEnergyConsumed =
          totalEnergyConsumed + chargingPower / TICKS_PER_HOUR;
        chargers[i]--;
      }
    }

    // The actual maximum power demand = the maximum sum of all chargepoints power demands at a given 15-minute interval
    const actualPowerDemand = busyChargers * chargingPower;
    actualMaxPowerDemand = Math.max(actualMaxPowerDemand, actualPowerDemand);

    // This code provides Task 2a a callback to report realtime progress. It is NOT needed for the logic in Task 1
    const instantResult = options.signal?.aborted; // // If instant result is requested, this function runs synchronously till the end.
    if (options.callback && !instantResult) {
      // This is important, to let the UI draw
      // This also explains why this function is `async`, although it is fine being synchronous
      await new Promise((resolve) => requestAnimationFrame(resolve));
      options.callback({
        tick,
        totalTicks,
        chargers,
        totalEnergyConsumed,
        actualMaxPowerDemand,
      });
    }
  }

  // The result
  return {
    theoreticalMaxPowerDemand,
    totalEnergyConsumed,
    actualMaxPowerDemand,
    concurrencyFactor: actualMaxPowerDemand / theoreticalMaxPowerDemand,
  };
}

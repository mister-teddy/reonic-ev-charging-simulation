import {
  ARRIVAL_PROBABILITIES,
  CHARGING_DEMAND_PROBABILITIES,
  RANDOM_SEED,
  SIMULATION_PERIOD,
  TICKS_PER_HOUR,
} from "@/config";
import type { SimulationConfig, SimulationResult } from "@/types";
import seedrandom from "seedrandom";

const random = RANDOM_SEED ? seedrandom(RANDOM_SEED) : Math.random;

function hourAtTick(tick: number) {
  // Every `TICKS_PER_HOUR` ticks, the hour increases by 1
  const hoursPassed = Math.floor(tick / TICKS_PER_HOUR);

  // Hour 25 -> Hour 1 next day
  return hoursPassed % 24;
}

function randomPercent() {
  return random() * 100;
}

function randomChargingDemand() {
  const rand = random() * 100;
  let cumulativeProbability = 0;

  for (const [probability, demand] of CHARGING_DEMAND_PROBABILITIES) {
    cumulativeProbability += probability;
    if (rand < cumulativeProbability) {
      return demand;
    }
  }

  return 0; // In case the toal probabilities don't sum to 100
}

export function simulate({
  chargepoints,
  chargingPower,
  evConsumption,
  arrivalProbabilityScale = 1,
}: SimulationConfig): SimulationResult {
  const theoreticalMaxPowerDemand = chargepoints * chargingPower;

  // Simulate each charger with a simple number, indicating how many ticks are left until it is free
  const chargers = new Array(chargepoints).fill(0);
  let totalEnergyConsumed = 0;
  let actualMaxPowerDemand = 0;

  // Simulate tick by tick
  const totalTicks = SIMULATION_PERIOD * TICKS_PER_HOUR;
  for (let tick = 0; tick < totalTicks; tick++) {
    let busyChargers = 0;

    for (const i in chargers) {
      // Charger is free
      if (chargers[i] === 0) {
        // Simulate whether an EV arrives
        const evArrivalChanceInPerHour =
          ARRIVAL_PROBABILITIES[hourAtTick(tick)] * arrivalProbabilityScale;
        const evArrivalChancePerTick =
          (1 -
            Math.pow(1 - evArrivalChanceInPerHour / 100, 1 / TICKS_PER_HOUR)) *
          100;
        const evActuallyArrives = randomPercent() < evArrivalChancePerTick;

        if (evActuallyArrives) {
          // Calculate how long the EV will use the charger
          const demand = randomChargingDemand();
          const energy = (demand * evConsumption) / 100;
          const hoursNeeded = energy / chargingPower;
          const ticksNeeded = Math.ceil(hoursNeeded * TICKS_PER_HOUR);

          // Make the charger busy
          chargers[i] = ticksNeeded;
        }
      }

      if (chargers[i] > 0) {
        busyChargers++;
        // Consume energy and count down
        totalEnergyConsumed =
          totalEnergyConsumed + chargingPower / TICKS_PER_HOUR;
        chargers[i]--;
      }
    }

    actualMaxPowerDemand = Math.max(
      actualMaxPowerDemand,
      busyChargers * chargingPower
    );
  }

  return {
    theoreticalMaxPowerDemand,
    totalEnergyConsumed,
    actualMaxPowerDemand,
    concurrencyFactor: actualMaxPowerDemand / theoreticalMaxPowerDemand,
  };
}

import {
  ARRIVAL_PROBABILITIES,
  CHARGING_DEMAND_PROBABILITIES,
  SIMULATION_PERIOD,
  TICKS_PER_HOUR,
} from "@/config";
import type { km, kW, kWh, SimulationConfig, SimulationResult } from "@/types";

function hourAtTick(tick: number) {
  // Every `TICKS_PER_HOUR` ticks, the hour increases by 1
  const hoursPassed = Math.floor(tick / TICKS_PER_HOUR);

  // Hour 25 -> Hour 1 next day
  return hoursPassed % 24;
}

function randomPercent() {
  return Math.random() * 100;
}

function randomChargingDemand() {
  const rand = Math.random() * 100;
  let cumulativeProbability = 0;

  for (const [probability, demand] of CHARGING_DEMAND_PROBABILITIES) {
    cumulativeProbability += probability;
    if (rand < cumulativeProbability) {
      return demand;
    }
  }

  return 0 as km; // In case the toal probabilities don't sum to 100
}

export function simulate({
  chargepoints,
  chargingPower,
  evConsumption,
  arrivalProbabilityScale = 1,
}: SimulationConfig): SimulationResult {
  const theoreticalMaxPowerDemand = (chargepoints * chargingPower) as kW;

  // Simulate each charger with a simple number, indicating how many ticks are left until it is free
  const chargers = new Array(chargepoints).fill(0);
  let totalEnergyConsumed = 0 as kWh;
  let actualMaxPowerDemand = 0 as kW;

  // Simulate tick by tick
  const totalTicks = SIMULATION_PERIOD * TICKS_PER_HOUR;
  for (let tick = 0; tick < totalTicks; tick++) {
    let busyChargers = 0;

    for (const i in chargers) {
      // Charger is free
      if (chargers[i] === 0) {
        // Simulate whether an EV arrives
        const evArrivalChance =
          ARRIVAL_PROBABILITIES[hourAtTick(tick)] / TICKS_PER_HOUR;
        const scaledArrivalChance = evArrivalChance * arrivalProbabilityScale;
        const evActuallyArrives = randomPercent() < scaledArrivalChance;

        if (evActuallyArrives) {
          // Calculate how long the EV will use the charger
          const demand = randomChargingDemand() as km;
          const energy = ((demand * evConsumption) / 100) as kWh;
          const hoursNeeded = energy / chargingPower;
          const ticksNeeded = Math.ceil(hoursNeeded * TICKS_PER_HOUR);

          // Make the charger busy
          chargers[i] = ticksNeeded;
        }
      }

      if (chargers[i] > 0) {
        busyChargers++;
        // Consume energy and count down
        totalEnergyConsumed = (totalEnergyConsumed +
          chargingPower / TICKS_PER_HOUR) as kWh;
        chargers[i]--;
      }
    }

    actualMaxPowerDemand = Math.max(
      actualMaxPowerDemand,
      busyChargers * chargingPower
    ) as kW;
  }

  return {
    theoreticalMaxPowerDemand,
    totalEnergyConsumed,
    actualMaxPowerDemand,
    concurrencyFactor: actualMaxPowerDemand / theoreticalMaxPowerDemand,
  };
}

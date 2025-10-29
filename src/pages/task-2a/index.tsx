import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { arktypeResolver } from "@hookform/resolvers/arktype";
import { SimulationConfig, type SimulationFormData } from "@/types";
import { simulate } from "@/lib/simulate";
import { toast } from "sonner";
import Layout from "./layout";
import ParkingLot from "./parking-lot";

export default function Task2a() {
  const form = useForm<SimulationFormData>({
    resolver: arktypeResolver(SimulationConfig),
    defaultValues: {
      period: 30,
      chargepoints: 32,
      arrivalProbabilityScale: 1,
      evConsumption: 18,
      chargingPower: 11,
    },
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          if (abortControllerRef.current) {
            return abortControllerRef.current.abort();
          }
          const abortController = new AbortController();
          abortControllerRef.current = abortController;
          form.setValue("result", undefined);
          const result = await simulate({
            ...data,
            signal: abortController.signal,
            callback: (progress) => form.setValue("progress", progress),
          });
          toast.success("Simulation completed!");
          form.setValue("result", result);
          abortControllerRef.current = null;
          form.setValue("progress", undefined);
        })}
      >
        <Layout>
          <ParkingLot />
        </Layout>
      </form>
    </FormProvider>
  );
}

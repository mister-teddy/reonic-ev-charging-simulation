import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { arktypeResolver } from "@hookform/resolvers/arktype";
import { SimulationParameters, type SimulationFormData } from "@/types";
import { simulate } from "@/lib/simulate";
import { toast } from "sonner";
import Layout from "./layout";

export default function Task2a() {
  // The data in this form is used throughout the app, via useFormContext
  const form = useForm<SimulationFormData>({
    resolver: arktypeResolver(SimulationParameters),
    defaultValues: {
      periodDay: 30,
      chargepointCount: 32,
      arrivalProbabilityScale: 1,
      evConsumption: 18,
      chargingPower: 11,
      useSeedRandom: false,
    },
  });
  const instanceResultControllerRef = useRef<AbortController>(undefined);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          // User requested Instant Result
          if (instanceResultControllerRef.current) {
            return instanceResultControllerRef.current.abort();
          }

          const controller = new AbortController();
          instanceResultControllerRef.current = controller;

          // Clear previous result
          form.setValue("result", undefined);

          // Start simulation
          const result = await simulate({
            ...data,
            signal: controller.signal,
            callback: (progress) => form.setValue("progress", progress), // Update on-going progress
          });

          // Simulation completed
          toast.success("Simulation completed!");
          form.setValue("result", result);

          // Clear progress data
          instanceResultControllerRef.current = undefined;
          form.setValue("progress", undefined);
        })}
      >
        <Layout />
      </form>
    </FormProvider>
  );
}

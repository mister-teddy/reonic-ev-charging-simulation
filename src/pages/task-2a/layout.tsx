import { useRef, type PropsWithChildren } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { H1 } from "@/components/typography/h1";
import { FormProvider, useForm } from "react-hook-form";
import { arktypeResolver } from "@hookform/resolvers/arktype";
import { SimulationConfig, type SimulationFormData } from "@/types";
import Form from "./form";
import Toolbar from "./toolbar";
import Result from "./result";
import { simulate } from "@/lib/simulate";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function Layout({ children }: PropsWithChildren) {
  const form = useForm<SimulationFormData>({
    resolver: arktypeResolver(SimulationConfig),
    defaultValues: {
      period: 30,
      chargepoints: 20,
      arrivalProbabilityScale: 100,
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
        <div className="h-screen flex flex-col">
          <div className="flex-none p-4 space-y-3">
            <H1>EV Charging Simulation</H1>
            <Result />
          </div>
          <Separator />
          <div className="flex-1">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel>
                <div className="relative h-full">
                  {children}
                  <div className="absolute left-2 right-2 bottom-2 z-10">
                    <Toolbar />
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel>
                <Form />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

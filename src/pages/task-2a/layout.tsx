import type { PropsWithChildren } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { CardContent } from "@/components/ui/card";
import { H1 } from "@/components/typography/h1";
import { FormProvider, useForm } from "react-hook-form";
import { arktypeResolver } from "@hookform/resolvers/arktype";
import { SimulationConfig } from "@/types";
import Form from "./form";
import Toolbar from "./toolbar";

export default function Layout({ children }: PropsWithChildren) {
  const form = useForm<typeof SimulationConfig.infer>({
    resolver: arktypeResolver(SimulationConfig),
    defaultValues: {
      chargepoints: 20,
      arrivalProbabilityScale: 100,
      evConsumption: 18,
      chargingPower: 11,
    },
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        <div className="h-screen flex flex-col">
          <div className="flex-none p-4">
            <H1>EV Charging Simulation</H1>
          </div>
          <div className="flex-1">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel>
                <div className="relative h-full">
                  {children}
                  <div className="absolute left-2 bottom-2 z-10">
                    <Toolbar />
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel>
                <CardContent>
                  <Form />
                </CardContent>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

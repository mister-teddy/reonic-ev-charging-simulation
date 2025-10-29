import { type PropsWithChildren } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { H1 } from "@/components/typography/h1";
import Form from "./form";
import Toolbar from "./toolbar";
import Result from "./result";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Layout({ children }: PropsWithChildren) {
  const isMobile = useIsMobile();

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-none p-4 space-y-3">
        <H1>EV Charging Simulation</H1>
        <Result />
      </div>
      <Separator />
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction={isMobile ? "vertical" : "horizontal"}>
          <ResizablePanel>
            <div className="relative h-full">
              {children}
              <div className="absolute left-2 right-2 bottom-2 z-10">
                <Toolbar />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30} className="overflow-y-auto!">
            <Form />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

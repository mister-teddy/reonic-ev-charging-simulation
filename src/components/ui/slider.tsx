import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface SliderProps
  extends Omit<
    React.ComponentProps<typeof SliderPrimitive.Root>,
    "value" | "onValueChange" | "defaultValue" | "onChange"
  > {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      defaultValue,
      value,
      min = 0,
      max = 100,
      onChange,
      showValue = true,
      valueFormatter = (val) => String(val),
      ...props
    },
    ref
  ) => {
    const handleSliderChange = (values: number[]) => {
      onChange?.(values[0]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      if (!isNaN(newValue) && newValue >= min && newValue <= max) {
        onChange?.(newValue);
      }
    };

    const displayValue = value ?? defaultValue ?? min;

    return (
      <div className="flex items-center gap-4">
        <SliderPrimitive.Root
          ref={ref}
          data-slot="slider"
          defaultValue={defaultValue !== undefined ? [defaultValue] : undefined}
          value={value !== undefined ? [value] : undefined}
          onValueChange={handleSliderChange}
          min={min}
          max={max}
          className={cn(
            "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
            className
          )}
          {...props}
        >
          <SliderPrimitive.Track
            data-slot="slider-track"
            className={cn(
              "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            )}
          >
            <SliderPrimitive.Range
              data-slot="slider-range"
              className={cn(
                "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
              )}
            />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          />
        </SliderPrimitive.Root>
        {showValue && (
          <Input
            type="number"
            value={displayValue}
            onChange={handleInputChange}
            min={min}
            max={max}
            className="w-20 text-right tabular-nums"
          />
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };

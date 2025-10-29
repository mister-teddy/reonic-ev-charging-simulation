import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { Controller, useFormContext } from "react-hook-form";
import { SimulationConfig } from "@/types";
import { PlayIcon } from "lucide-react";

export default function Form() {
  const form = useFormContext<typeof SimulationConfig.infer>();
  return (
    <FieldGroup>
      <Controller
        control={form.control}
        name="chargepoints"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Number of Chargepoints</FieldLabel>
            <Slider
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              max={200}
              step={1}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="arrivalProbabilityScale"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Arrival Probability Scale (%)
            </FieldLabel>
            <Slider
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              defaultValue={100}
              min={20}
              max={200}
              step={1}
            />
            <FieldDescription>
              A multiplier for the arrival probability to increase the amount of
              cars arriving to charge
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="evConsumption"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>EV Consumption (kW)</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="number"
              aria-invalid={fieldState.invalid}
              step={0.1}
              min={0.1}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="chargingPower"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Charging Power (kW)</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="number"
              aria-invalid={fieldState.invalid}
              step={0.1}
              min={0.1}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <FieldGroup>
        <Field>
          <Button size="lg" type="submit">
            <PlayIcon />
            Run Simulation
          </Button>
        </Field>
      </FieldGroup>
    </FieldGroup>
  );
}

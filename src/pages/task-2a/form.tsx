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
import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import { type SimulationFormData } from "@/types";
import { Equal, PlayIcon } from "lucide-react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Form() {
  const form = useFormContext<SimulationFormData>();
  const { isSubmitting } = useFormState({ control: form.control });

  return (
    <>
      <CardHeader className="my-6">
        <CardTitle>Simulation Parameters</CardTitle>
        <CardDescription>
          <Summary />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Controller
            control={form.control}
            name="period"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Simulation Period (days)
                </FieldLabel>
                <Slider
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  min={1}
                  max={365}
                  step={1}
                  disabled={isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="chargepoints"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Number of Chargepoints
                </FieldLabel>
                <Slider
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  max={200}
                  step={1}
                  disabled={isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                  disabled={isSubmitting}
                />
                <FieldDescription>
                  A multiplier for the arrival probability to increase the
                  amount of cars arriving to charge
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="evConsumption"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  EV Consumption (kW)
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="number"
                  aria-invalid={fieldState.invalid}
                  step={0.1}
                  required
                  disabled={isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="chargingPower"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Charging Power (kW)
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="number"
                  aria-invalid={fieldState.invalid}
                  step={0.1}
                  required
                  disabled={isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <FieldGroup>
            <Field>
              {isSubmitting ? (
                <Button size="lg" type="submit" variant="outline">
                  <Equal />
                  Instant Result
                </Button>
              ) : (
                <Button size="lg" type="submit">
                  <PlayIcon />
                  Run Simulation
                </Button>
              )}
            </Field>
          </FieldGroup>
        </FieldGroup>
      </CardContent>
    </>
  );
}

function Summary() {
  const form = useFormContext<SimulationFormData>();
  const [chargepoints, chargingPower, period] = useWatch({
    control: form.control,
    name: ["chargepoints", "chargingPower", "period"],
  });

  return (
    <>
      Simulate {chargepoints} chargepoints with {chargingPower}kW power for{" "}
      {period} days in 15-minute intervals ({((period ?? 0) * 24 * 60) / 15}{" "}
      ticks).
    </>
  );
}

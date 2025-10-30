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
import FormatNumber from "@/components/format-number";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Form() {
  const form = useFormContext<SimulationFormData>();

  // We need to disable inputs during simulation
  const { isSubmitting } = useFormState({ control: form.control });

  return (
    <>
      <CardHeader className="my-6">
        <CardTitle>Simulation Parameters</CardTitle>
        <CardDescription>
          <Summary />
        </CardDescription>
      </CardHeader>
      <CardContent className="mb-6">
        <FieldGroup>
          <Controller
            control={form.control}
            name="periodDay"
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
            name="chargepointCount"
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
                  value={(field.value ?? 1) * 100}
                  onChange={(v) => field.onChange(v / 100)}
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
                  inputMode="numeric"
                  aria-invalid={fieldState.invalid}
                  min={0}
                  max={Number.MAX_SAFE_INTEGER}
                  step={0.01}
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
                  inputMode="numeric"
                  aria-invalid={fieldState.invalid}
                  min={0}
                  max={Number.MAX_SAFE_INTEGER}
                  step={0.01}
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
            name="useSeedRandom"
            render={({ field, fieldState }) => (
              <Field>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={field.name}
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor={field.name}>
                    Use Seed Random (deterministic results)
                  </Label>
                </div>
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
  const [chargepointCount, chargingPower, periodDay] = useWatch({
    control: form.control,
    name: ["chargepointCount", "chargingPower", "periodDay"],
  });

  return (
    <>
      Simulate {chargepointCount} chargepoints with{" "}
      <FormatNumber value={chargingPower} unit="kW" /> power for {periodDay}{" "}
      days in 15-minute intervals (
      <FormatNumber
        value={((periodDay ?? 0) * 24 * 60) / 15}
        maximumFractionDigits={0}
      />{" "}
      ticks).
    </>
  );
}

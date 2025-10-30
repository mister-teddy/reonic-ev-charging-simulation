export interface FormatNumberProps {
  value: number;
  unit?: string;
  maximumFractionDigits?: number;
  fixedWidth?: boolean;
}

/**
 * Display a number with thousands separators, fraction digits, and optionally fixed width so it doesn't shift layout when changing rapidly.
 */
export default function FormatNumber({
  value,
  unit,
  maximumFractionDigits,
  fixedWidth,
}: FormatNumberProps) {
  const formattedValue = Number(value).toLocaleString(undefined, {
    maximumFractionDigits: maximumFractionDigits ?? 2,
  });

  return (
    <span>
      <span
        style={
          fixedWidth
            ? { width: ` ${formattedValue.length}ch`, display: "inline-block" }
            : undefined
        }
      >
        {formattedValue}
      </span>
      {unit ? ` ${unit}` : ""}
    </span>
  );
}

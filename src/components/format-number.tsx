export default function FormatNumber({
  value,
  unit,
  maximumFractionDigits,
  fixedWidth,
}: {
  value: number;
  unit?: string;
  maximumFractionDigits?: number;
  fixedWidth?: boolean;
}) {
  const formattedValue = value.toLocaleString(undefined, {
    maximumFractionDigits: maximumFractionDigits ?? 2,
  });
  return (
    <span
      style={
        fixedWidth
          ? { width: ` ${formattedValue.length}ch`, display: "inline-block" }
          : undefined
      }
    >
      {formattedValue}
      {unit ? ` ${unit}` : ""}
    </span>
  );
}

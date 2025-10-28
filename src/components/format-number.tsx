export default function FormatNumber({
  value,
  unit,
}: {
  value: number;
  unit?: string;
}) {
  return (
    <span>
      {value.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}
      {unit ? ` ${unit}` : ""}
    </span>
  );
}

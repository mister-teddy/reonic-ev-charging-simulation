import src from "@/assets/ev.svg";

export default function EV() {
  return (
    <img
      src={src}
      alt="Electric Vehicle"
      className="object-contain w-full h-full"
      style={{
        // Random color tint for variety
        filter: `hue-rotate(${Math.floor(Math.random() * 360)}deg)`,
      }}
    />
  );
}

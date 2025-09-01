import VehicleCard from "@/components/VehicleCard";
import type { Vehicle } from "@/features/vehicles/vehicles.type";

type Props = { vehicles: Vehicle[] };

export default function VehicleGrid({ vehicles }: Props) {
  if (!vehicles?.length) {
    return <p className="text-sm text-neutral-600">Keine Fahrzeuge gefunden.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((v) => (
        <VehicleCard key={v.id ?? v.slug} v={v} />
      ))}
    </div>
  );
}

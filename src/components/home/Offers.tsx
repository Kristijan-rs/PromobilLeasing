import { Link } from "react-router-dom";
import VehicleCard from "@/components/VehicleCard";
import type { Vehicle } from "@/features/vehicles/vehicles.type";

type Props = { items: ReadonlyArray<Vehicle> };

export default function Offers({ items }: Props) {
  return (
    <section aria-labelledby="angebote-heading" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 id="angebote-heading" className="text-xl font-semibold text-gray-100">
          Aktuelle Angebote
        </h2>
        <Link
          to="/cars"
          className="text-sm font-medium underline underline-offset-4 text-gray-100"
        >
          Alle Fahrzeuge ansehen
        </Link>
      </div>

      {items.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((v) => (
            <VehicleCard key={v.slug} v={v} />
          ))}
        </div>
      ) : (
        <p className="text-neutral-600">Momentan sind keine Fahrzeuge verfügbar.</p>
      )}
    </section>
  );
}

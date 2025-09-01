import { useEffect, useMemo, useState } from "react";
import { getRecent, clearRecent } from "@/store/recent";
import vehicles from "@/features/vehicles/vehicles.data";
import type { Vehicle } from "@/features/vehicles/vehicles.type"; 
import VehicleCard from "@/components/VehicleCard";

export default function RecentViewedStrip() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => setSlugs(getRecent());
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === "promobil.recent.v1") refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const items: Vehicle[] = useMemo(() => {
    const map = new Map(vehicles.map((v) => [v.slug, v]));
    return slugs.map((s) => map.get(s)).filter(Boolean) as Vehicle[];
  }, [slugs]);

  if (!items.length) return null;

  return (
    <section aria-label="Zuletzt angesehen" className="mt-12">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Zuletzt angesehen</h2>
        <button
          className="text-sm underline hover:no-underline"
          onClick={() => clearRecent()}
        >
          Liste leeren
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((v) => (
          <VehicleCard key={v.slug} v={v} />
        ))}
      </div>
    </section>
  );
}

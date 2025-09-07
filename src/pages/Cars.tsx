import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react"; 
import Seo from "@/components/Seo";
import FilterBar from "@/components/FilterBar";
import VehicleGrid from "@/components/VehicleGrid";
import vehicles from "@/features/vehicles/vehicles.data";
import { getMonthlyRate } from "@/lib/pricing";

type SortKey = "priceAsc" | "priceDesc" | "yearDesc" | "yearAsc";

const priceOf = (v: typeof vehicles[number]) => {
  const monthly = getMonthlyRate(v.priceTotal, v.pricePerMonth);
  if (monthly > 0) return monthly;
  return Number.isFinite(v.priceTotal) ? v.priceTotal : Number.POSITIVE_INFINITY;
};

function applyFilters(sp: URLSearchParams) {
  const brand = sp.get("brand") ?? "";
  const model = sp.get("model") ?? "";
  const year = sp.get("year") ?? "";
  const fuel = sp.get("fuel") ?? "";
  const sort = (sp.get("sort") as SortKey) ?? "priceAsc";

  const min = Number(sp.get("priceMin") ?? "");
  const max = Number(sp.get("priceMax") ?? "");

  let list = vehicles.filter(
    (v) =>
      (!brand || v.brand === brand) &&
      (!model || v.model === model) &&
      (!year || String(v.year) === year) &&
      (!fuel || v.fuel === fuel)
  );

  if (!Number.isNaN(min) && sp.has("priceMin"))
    list = list.filter((v) => priceOf(v) >= min);
  if (!Number.isNaN(max) && sp.has("priceMax"))
    list = list.filter((v) => priceOf(v) <= max);

  list.sort((a, b) => {
    switch (sort) {
      case "priceAsc":
        return priceOf(a) - priceOf(b);
      case "priceDesc":
        return priceOf(b) - priceOf(a);
      case "yearDesc":
        return b.year - a.year;
      case "yearAsc":
        return a.year - b.year;
      default:
        return 0;
    }
  });

  return list;
}

const PAGE_SIZE = 20; // ✅ Prikaz 20 auta po strani

export default function Cars() {
  const [sp] = useSearchParams();
  const site = import.meta.env.VITE_SITE_URL as string;
  const all = applyFilters(sp);

  // ✅ State za limit
  const [limit, setLimit] = useState(PAGE_SIZE);
  const visible = useMemo(() => all.slice(0, limit), [all, limit]);
  const hasMore = limit < all.length;

  return (
    <>
      <Seo
        title="Fahrzeuge – Promobile Leasing"
        description="Entdecken Sie aktuelle Angebote. Filtern Sie nach Marke, Modell, Baujahr, Antrieb und sortieren Sie nach Preis."
        ogImage="/og/cars.jpg"
        canonical={`${site}/cars`}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-3xl font-bold text-center">Fahrzeuge</h1>
          {/* ✅ Status prikaza */}
          <p className="text-sm text-neutral-600">
            {visible.length} von {all.length}
          </p>
        </div>

        <FilterBar />
        <VehicleGrid vehicles={visible} />

        {/* ✅ Dugme za učitavanje još */}
        {hasMore && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setLimit((prev) => prev + PAGE_SIZE)}
              className="cursor-pointer rounded-xl bg-blue-900 px-5 py-3 text-white transition hover:bg-blue-950"
            >
              Mehr anzeigen
            </button>
          </div>
        )}
      </div>
    </>
  );
}

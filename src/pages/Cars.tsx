import { useSearchParams } from "react-router-dom";
import Seo from "@/components/Seo";
import FilterBar from "@/components/FilterBar";
import VehicleGrid from "@/components/VehicleGrid";
import vehicles from "@/features/vehicles/vehicles.data";

type SortKey = "priceAsc" | "priceDesc" | "yearDesc" | "yearAsc";

// Preis-Helfer (prioritet Monatsrate, fallback Kaufpreis)
const priceOf = (v: typeof vehicles[number]) => {
  if (typeof v.pricePerMonth === "number") return v.pricePerMonth;
  if (typeof v.priceTotal === "number") return v.priceTotal;
  return Number.POSITIVE_INFINITY;
};

// Filtern + Sortieren nach URL-SearchParams
function applyFilters(sp: URLSearchParams) {
  const brand = sp.get("brand") ?? "";
  const model = sp.get("model") ?? "";
  const year = sp.get("year") ?? "";
  const fuel = sp.get("fuel") ?? "";
  const sort = (sp.get("sort") as SortKey) ?? "priceAsc";

  const min = Number(sp.get("priceMin") ?? "");
  const max = Number(sp.get("priceMax") ?? "");

  let list = vehicles.filter((v) =>
    (!brand || v.brand === brand) &&
    (!model || v.model === model) &&
    (!year || String(v.year) === year) &&
    (!fuel || v.fuel === fuel)
  );

  if (!Number.isNaN(min) && sp.has("priceMin")) list = list.filter((v) => priceOf(v) >= min);
  if (!Number.isNaN(max) && sp.has("priceMax")) list = list.filter((v) => priceOf(v) <= max);

  list.sort((a, b) => {
    switch (sort) {
      case "priceAsc":  return priceOf(a) - priceOf(b);
      case "priceDesc": return priceOf(b) - priceOf(a);
      case "yearDesc":  return b.year - a.year;
      case "yearAsc":   return a.year - b.year;
      default:          return 0;
    }
  });

  return list;
}

export default function Cars() {
  const [sp] = useSearchParams();
  const site = import.meta.env.VITE_SITE_URL as string;
  const list = applyFilters(sp);

  return (
    <>
      <Seo
        title="Fahrzeuge – PromobilLeasing"
        description="Entdecken Sie aktuelle Angebote. Filtern Sie nach Marke, Modell, Baujahr, Antrieb und sortieren Sie nach Preis."
        ogImage="/og/cars.jpg"
        canonical={`${site}/cars`}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-3xl font-bold text-center text-gray-100">Fahrzeuge</h1>
        </div>

        <FilterBar />

        <VehicleGrid vehicles={list} />
      </div>
    </>
  );
}

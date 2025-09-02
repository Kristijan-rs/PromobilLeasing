import { useEffect, useMemo, useState, useTransition } from "react";
import { useSearchParams } from "react-router-dom";
import vehicles from "@/features/vehicles/vehicles.data";

type SortKey = "priceAsc" | "priceDesc" | "yearDesc" | "yearAsc";

const FUELS = [
  { value: "", label: "Antrieb" },
  { value: "petrol", label: "Benzin" },
  { value: "diesel", label: "Diesel" },
  { value: "hybrid", label: "Hybrid" },
  { value: "electric", label: "Elektro" },
] as const;

function setParam(sp: URLSearchParams, key: string, val?: string) {
  const next = new URLSearchParams(sp);
  if (val && val.trim() !== "") next.set(key, val);
  else next.delete(key);
  return next;
}

function countActive(sp: URLSearchParams) {
  const keys = ["brand", "model", "year", "fuel", "priceMin", "priceMax", "sort"];
  return keys.reduce((acc, k) => (sp.get(k) ? acc + 1 : acc), 0);
}

export default function FilterBar() {
  const [sp, setSp] = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  // Zatvaranje na ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Dinamičke liste iz podataka
  const { brands, modelsByBrand, years } = useMemo(() => {
    const b = new Set<string>();
    const y = new Set<number>();
    const map = new Map<string, Set<string>>();
    vehicles.forEach((v) => {
      b.add(v.brand);
      y.add(v.year);
      if (!map.has(v.brand)) map.set(v.brand, new Set<string>());
      map.get(v.brand)!.add(v.model);
    });
    const brands = Array.from(b).sort((a, z) => a.localeCompare(z));
    const years = Array.from(y).sort((a, z) => z - a);
    const modelsByBrand = new Map<string, string[]>();
    map.forEach((set, brand) => modelsByBrand.set(brand, Array.from(set).sort((a, z) => a.localeCompare(z))));
    return { brands, modelsByBrand, years };
  }, []);

  // Trenutne vrednosti
  const brand = sp.get("brand") ?? "";
  const model = sp.get("model") ?? "";
  const year = sp.get("year") ?? "";
  const fuel = sp.get("fuel") ?? "";
  const priceMin = sp.get("priceMin") ?? "";
  const priceMax = sp.get("priceMax") ?? "";
  const sort = (sp.get("sort") as SortKey) ?? "priceAsc";

  const active = countActive(sp);

  // Modeli zavisno od branda
  const modelOptions = useMemo(() => {
    if (brand && modelsByBrand.has(brand)) return modelsByBrand.get(brand)!;
    const all = new Set<string>();
    vehicles.forEach((v) => all.add(v.model));
    return Array.from(all).sort((a, z) => a.localeCompare(z));
  }, [brand, modelsByBrand]);

  function update(key: string, value: string) {
    startTransition(() => setSp(setParam(sp, key, value), { replace: true }));
  }

  function clearAll() {
    startTransition(() => setSp(new URLSearchParams(), { replace: true }));
  }

  return (
    <div className="relative z-20 flex justify-center">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl border bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 text-sm font-medium shadow-md cursor-pointer transition"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Filter
        {active > 0 && (
          <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-xs text-white">{active}</span>
        )}
        <span className={`ml-1 transition ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="absolute top-full mt-2 w-full max-w-4xl rounded-2xl border bg-white p-4 shadow-2xl"
          role="dialog"
          aria-label="Fahrzeug-Filter"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* Marke */}
            <label className="text-xs font-medium text-neutral-600">Marke
              <select
                className="mt-1 w-full rounded-xl border bg-white px-3 py-2 cursor-pointer"
                value={brand}
                onChange={(e) => {
                  const val = e.target.value;
                  const next = setParam(sp, "brand", val);
                  next.delete("model");
                  startTransition(() => setSp(next, { replace: true }));
                }}
              >
                <option value="">Alle Marken</option>
                {brands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </label>

            {/* Modell */}
            <label className="text-xs font-medium text-neutral-600">Modell
              <select
                className="mt-1 w-full rounded-xl border bg-white px-3 py-2 cursor-pointer"
                value={model}
                onChange={(e) => update("model", e.target.value)}
                disabled={modelOptions.length === 0}
              >
                <option value="">Modelle (alle)</option>
                {modelOptions.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </label>

            {/* Baujahr */}
            <label className="text-xs font-medium text-neutral-600">Baujahr
              <select
                className="mt-1 w-full rounded-xl border bg-white px-3 py-2 cursor-pointer"
                value={year}
                onChange={(e) => update("year", e.target.value)}
              >
                <option value="">Baujahr (alle)</option>
                {years.map((y) => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
            </label>

            {/* Antrieb */}
            <label className="text-xs font-medium text-neutral-600">Antrieb
              <select
                className="mt-1 w-full rounded-xl border bg-white px-3 py-2 cursor-pointer"
                value={fuel}
                onChange={(e) => update("fuel", e.target.value)}
              >
                {FUELS.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </label>

            {/* Preis min/max */}
            <label className="text-xs font-medium text-neutral-600">Preis min (€)
              <input
                type="number"
                inputMode="numeric"
                placeholder="z. B. 300"
                className="mt-1 w-full rounded-xl border px-3 py-2"
                defaultValue={priceMin}
                onBlur={(e) => update("priceMin", e.currentTarget.value)}
              />
            </label>

            <label className="text-xs font-medium text-neutral-600">Preis max (€)
              <input
                type="number"
                inputMode="numeric"
                placeholder="z. B. 800"
                className="mt-1 w-full rounded-xl border px-3 py-2"
                defaultValue={priceMax}
                onBlur={(e) => update("priceMax", e.currentTarget.value)}
              />
            </label>

            {/* Sortierung */}
            <label className="text-xs font-medium text-neutral-600">Sortierung
              <select
                className="mt-1 w-full rounded-xl border bg-white  px-3 py-2 cursor-pointer"
                value={sort}
                onChange={(e) => update("sort", e.target.value)}
              >
                <option value="priceAsc">Preis ↑ (günstig zuerst)</option>
                <option value="priceDesc">Preis ↓ (teuer zuerst)</option>
                <option value="yearDesc">Baujahr ↓ (neu zuerst)</option>
                <option value="yearAsc">Baujahr ↑ (alt zuerst)</option>
              </select>
            </label>
          </div>

          {/* Aktionen */}
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={clearAll}
              disabled={isPending}
              className="rounded-xl border px-3 py-2 text-sm hover:bg-neutral-100 cursor-pointer"
            >
              Filter zurücksetzen
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-blue-950 px-4 py-2 text-sm font-medium text-white hover:bg-blue-900 cursor-pointer transition"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

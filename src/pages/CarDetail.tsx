import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import vehicles from "@/features/vehicles/vehicles.data";
import type { Vehicle } from "@/features/vehicles/vehicles.type"; 
import Seo from "@/components/Seo";
import { buildVehicleSchema, buildBreadcrumbs } from "@/lib/seoSchemas";
import { addRecent } from "@/store/recent";
import Gallery from "@/components/Gallery";
import SpecList from "@/components/SpecList";
import { kwToPs } from "@/lib/format";
import { formatEUR, getMonthlyRate } from "@/lib/pricing";

const fuelLabel: Record<Vehicle["fuel"], string> = {
  petrol: "Benzin",
  diesel: "Diesel",
  hybrid: "Hybrid",
  electric: "Elektro",
};

export default function CarDetail() {
  const { slug } = useParams<{ slug: string }>();
  const v = vehicles.find((x) => x.slug === slug);

  const site = import.meta.env.VITE_SITE_URL as string;
  const url = `${site}/cars/${slug ?? ""}`;

  useEffect(() => {
    if (slug) addRecent(slug);
  }, [slug]);

  if (!v) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <Seo
          title="Fahrzeug nicht gefunden – PromobilLeasing"
          description="Das gesuchte Fahrzeug existiert nicht."
          canonical={url}
          noindex
        />
        <h1 className="text-2xl font-semibold text-gray-300">Fahrzeug nicht gefunden</h1>
        <p className="mt-2 text-gray-300">
          Bitte zurück zur{" "}
          <Link to="/cars" className="underline">
            Übersicht
          </Link>
          .
        </p>
      </div>
    );
  }

  const jsonLd = [
    buildVehicleSchema(v, url),
    buildBreadcrumbs([
      { name: "Startseite", url: `${site}/` },
      { name: "Fahrzeuge", url: `${site}/cars` },
      { name: `${v.brand} ${v.model}`, url },
    ]),
  ];

  const requestHref = `/request?vehicle=${encodeURIComponent(v.slug)}`;
  
  const monthly = getMonthlyRate(v.priceTotal, v.pricePerMonth);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8">
      <Seo
        title={`${v.brand} ${v.model} – ab ${formatEUR(monthly)} / Monat | PromobilLeasing`}
        description={v.shortDesc}
        ogImage={v.images?.[0]}
        canonical={url}
        jsonLd={jsonLd}
      />

      {/* Titel + Preis */}
      <header className="mb-8 flex flex-col  gap-2 sm:flex-row sm:iitem-end sm:justify-between">
        <div className="flex text-center items-end">
          <h1 className="text-3xl sm:text-4xl font-bold">
            {v.brand} {v.model}
          </h1>
          </div>
        <div className="text-center sm:text-end space-y-1 mt-2">
          <div className="text-2xl sm:text-3xl font-semibold">
            {formatEUR(monthly)} / Monat
          </div>
          <div className="text-sm">
           {formatEUR(v.priceTotal)} (Brutto)
          </div>
          <div className="text-sm">
          {formatEUR(v.priceNeto)} (Netto)
          </div>
          <p className="text-xs">19,00% MwSt.</p>
          <p className="text-xs">* Beispielrate, unverbindlich</p>
        </div>
      </header>

      {/* Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Galerie */}
        <div className="lg:col-span-2">
          {v.images?.length ? (
            <Gallery images={v.images} altBase={`${v.brand} ${v.model}`} />
          ) : (
            <div className="aspect-[16/10] w-full rounded-2xl border bg-neutral-100" />
          )}
        </div>

        {/* Specs + CTA */}
        <aside className="space-y-6">
          <div className="rounded-2xl border bg-white p-5 shadow-md">
            <h2 className="mb-3 text-lg font-semibold">Technische Daten</h2>
            <SpecList
              items={[
                { label: "Marke/Modell", value: `${v.brand} ${v.model}` },
                { label: "Fahrzeugtyp", value: `${v.bodyType}`},
                { label: "Baujahr", value: String(v.year) },
                { label: "Kilometerstand", value: `${v.mileage.toLocaleString("de-DE")} km` },
                { label: "Antrieb", value: fuelLabel[v.fuel] },
                { label: "Getriebe", value: v.gearbox === "auto" ? "Automatik" : "Schaltgetriebe" },
                { label: "Leistung", value: `${v.powerKW} kW / ${kwToPs(v.powerKW)} PS` },
                { label: "Monatsrate", value: `${formatEUR(monthly)}` },
                { label: "Kaufpreis", value: `${formatEUR(v.priceTotal)}` },
                { label: "Verfügbarkeit", value: v.available ? "Verfügbar" : "Nicht verfügbar" },
              ]}
            />
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-md mb-6">
            <h2 className="mb-3 text-lg font-semibold">Interesse?</h2>
            <p className="text-sm text-gray-700">
              Stellen Sie eine unverbindliche Leasinganfrage. Wir melden uns schnellstmöglich.
            </p>
            <Link
              to={requestHref}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-blue-900 px-4 py-3 text-white hover:bg-blue-950 transition"
              aria-label="Leasinganfrage starten"
            >
              Leasinganfrage starten
            </Link>
            <p className="mt-2 text-xs text-gray-700">
              Mit einem Klick gelangen Sie zum Anfrageformular.
            </p>
          </div>
        </aside>
      </div>

        {v.technicalData && (
    <div className="rounded-2xl border bg-white p-5 shadow-md">
      <h2 className="mb-3 text-lg font-semibold">Weitere technische Daten</h2>

      {/* A11y-friendly opis kao definiciona lista */}
      <dl className="grid grid-cols-1 gap-y-2 gap-x-6 text-sm sm:grid-cols-2">
        {Object.entries(v.technicalData).map(([label, value]) => (
          <div key={label} className="flex sm:block justify-between gap-3 border-b last:border-b-0 pb-2">
            <dt className="font-medium text-neutral-700">{label}</dt>
            <dd className="text-neutral-900 break-words">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )}


      {/* Beschreibung */}
      {v.shortDesc && (
        <section className="mt-10">
          <h2 className="mb-2 text-lg font-semibold">Beschreibung</h2>
          <p className="text-gray-700 leading-relaxed">{v.shortDesc}</p>
        </section>
      )}

      {/* Zurück */}
      <div className="mt-10">
        <Link to="/cars" className="text-sm underline underline-offset-4">
          ← Zurück zur Fahrzeugliste
        </Link>
      </div>
    </article>
  );
}

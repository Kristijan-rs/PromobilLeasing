import { Link } from "react-router-dom";
import type { Vehicle } from "@/features/vehicles/vehicles.type";
import ResponsiveImage from "@/components/ResponsiveImage";
import { CARD_SIZES } from "@/lib/images";
import { formatEUR, getMonthlyRate } from "@/lib/pricing"; 

type Props = { v: Vehicle };

const fuelLabel: Record<Vehicle["fuel"], string> = {
  petrol: "Benzin",
  diesel: "Diesel",
  hybrid: "Hybrid",
  electric: "Elektro",
};

export default function VehicleCard({ v }: Props) {
  const img1 = v.images?.[0] ?? "/images/placeholder-car.jpg";
  const img2 = v.images?.[1];

  // Sada koristi samo priceTotal
  const monthly = getMonthlyRate(v.priceTotal, v.pricePerMonth, { months: 30 });

  return (
    <Link
      to={`/cars/${encodeURIComponent(v.slug)}`}
      className="group block overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
      aria-label={`${v.brand} ${v.model} ansehen`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <ResponsiveImage
          rawSrc={v.images[0]}
          alt={`${v.brand} ${img1}`}
          sizes={CARD_SIZES}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            img2 ? "opacity-100 group-hover:opacity-0" : ""
          }`}
        />
        {img2 && (
          <div className="absolute inset-0">
            <ResponsiveImage
              rawSrc={img2}
              alt={`${v.brand} ${v.model} – zweite Ansicht`}
              sizes={CARD_SIZES}
              className="h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        )}

        {v.images.length > 1 && (
          <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
            {v.images.length} Fotos
          </span>
        )}
      </div>

      {/* Text */}
      <div className="p-4">
        <h3 className="text-lg font-semibold leading-snug">
          {v.brand} {v.model}
        </h3>
        <p className="mt-1 text-sm text-neutral-600">
          {v.year} • {fuelLabel[v.fuel]} •{" "}
          {v.gearbox === "auto" ? "Automatik" : "Schaltgetriebe"}
        </p>

        {/* Preise: Rate + Kaufpreis */}
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="text-base font-semibold">
            {formatEUR(monthly)}
            <span className="text-sm font-normal">/ Monat</span>
          </p>
          <span className="text-neutral-500">•</span>
          <p className="text-sm text-neutral-700">
           Kaufpreis: {" "}
            <span className="text-sm font-semibold">{formatEUR(v.priceTotal)}</span>
          </p>
          <p className="text-sm text-neutral-700">{formatEUR(v.priceNeto)} (Netto)</p>
          <span className="text-neutral-500">•</span>
          <p className="text-sm text-neutral-700">19,00% MwSt.</p>
        </div>
      </div>
    </Link>
  );
}

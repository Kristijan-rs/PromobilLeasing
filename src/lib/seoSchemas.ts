import type { Vehicle } from "@/features/vehicles/vehicles.type"; 

export function buildVehicleSchema(v: Vehicle, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "name": `${v.brand} ${v.model}`,
    "brand": v.brand,
    "model": v.model,
    "vehicleModelDate": String(v.year),
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": v.mileage,
      "unitCode": "KM"
    },
    "fuelType": v.fuel,
    "vehicleTransmission": v.gearbox === "automatic" ? "AutomaticTransmission" : "ManualTransmission",
    "url": url,
    "image": v.images,
    "offers": {
      "@type": "Offer",
      "price": v.pricePerMonth,
      "priceCurrency": "EUR",
      "availability": v.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    },
    "description": v.shortDesc
  };
}

export function buildBreadcrumbs(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": it.name,
      "item": it.url
    }))
  };
}

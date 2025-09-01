import type { Vehicle } from "./vehicles.type";

/**
 * Bilder: lege Dateien unter /public/images/cars/<slug>/
 * Wenn du Bilder noch nemaš, koristi privremeno "/images/placeholder-car.jpg"
 */

const vehicles: Vehicle[] = [
  {
    id: "1",
    slug: "audi-a4-2022-sline",
    brand: "Audi",
    model: "A4 S line",
    year: 2022,
    mileage: 15500,
    fuel: "petrol",
    gearbox: "auto",
    powerKW: 150,
    pricePerMonth: 389,
    priceTotal: 28000,
    images: [
      "/images/cars/audi-a4-2022-sline/01.webp",
      "/images/cars/audi-a4-2022-sline/02.webp",
      "/images/cars/audi-a4-2022-sline/03.webp",
      "/images/cars/audi-a4-2022-sline/04.webp",
    ],
    available: true,
    featured: false,
    shortDesc: "Sportliches S line Paket, Navi, LED, Assistenzpaket.",
  },
  // … ostatak vozila (sve što si već uneo)
   {
    id: "2",
    slug: "bmw-320-2023-m-sport",
    brand: "BMW",
    model: "320",
    year: 2023,
    mileage: 76600 ,
    fuel: "diesel",
    gearbox: "auto",
    powerKW: 140,
    pricePerMonth: 349,
    priceTotal: 38700,
    images: [
      "/images/cars/bmw-320-2023-m-sport/1.avif",
      "/images/cars/bmw-320-2023-m-sport/2.avif",
      "/images/cars/bmw-320-2023-m-sport/3.avif",
      "/images/cars/bmw-320-2023-m-sport/4.avif",
    ],
    available: true,
    featured: true,
    shortDesc: "Sportliches S line Paket, Navi, LED, Assistenzpaket.",
  },
   {
    id: "3",
    slug: "Mercedes-Benz-S-63-AMG",
    brand: "Mercedes-Benz",
    model: "S 63 AMG",
    year: 2025,
    mileage: 22,
    fuel: "hybrid",
    gearbox: "auto",
    powerKW: 590,
    pricePerMonth: 789,
    priceTotal: 218960,
    images: [
      "/images/cars/mercedes-benz-s63-2025-amg/1.avif",
      "/images/cars/mercedes-benz-s63-2025-amg/2.avif",
      "/images/cars/mercedes-benz-s63-2025-amg/3.avif",
      "/images/cars/mercedes-benz-s63-2025-amg/4.avif",
    ],
    available: true,
    featured: true,
    shortDesc: "Sportliches S line Paket, Navi, LED, Assistenzpaket.",
  },
   {
    id: "4",
    slug: "porsche-992-2024-Targa-4-GTS",
    brand: "Porsche",
    model: "992 Targa 4 GTS",
    year: 2024,
    mileage: 3900,
    fuel: "petrol",
    gearbox: "auto",
    powerKW: 353,
    pricePerMonth: 699,
    priceTotal: 182990 ,
    images: [
      "/images/cars/porsche-992-2024-gts/1.avif",
      "/images/cars/porsche-992-2024-gts/2.avif",
      "/images/cars/porsche-992-2024-gts/3.avif",
      "/images/cars/porsche-992-2024-gts/4.avif",
    ],
    available: true,
    featured: true,
    shortDesc: "Sportliches S line Paket, Navi, LED, Assistenzpaket.",
  },
];

export default vehicles;

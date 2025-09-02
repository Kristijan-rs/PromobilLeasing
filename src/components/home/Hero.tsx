import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[500px] -mt-10 flex items-center overflow-hidden">
      {/* Pozadinska slika */}
      <img
        src="/images/hero-car.webp"
        alt="Leasing Fahrzeug"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
      />

      {/* Sadržaj */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 ">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight drop-shadow-lg text-white">
          Auto-Leasing trotz Schufa – Mobilität für alle!
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white drop-shadow-lg">
          Flexibles Gewerbeleasing und Kfz-Finanzierung in Deutschland –
          auch ohne Einkommensnachweis und mit 25–35% Anzahlung.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            to="/request"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-medium  hover:bg-neutral-200 transition"
          >
            Jetzt Angebot anfordern
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium bg-blue-900 text-white hover:bg-blue-950 transition"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </div>
    </section>
  );
}

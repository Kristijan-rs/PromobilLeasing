import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl shadow-md bg-blue-950 text-white">
      <div className="p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Auto-Leasing trotz Schufa – Mobilität für alle!
        </h1>
        <p className="mt-3 max-w-2xl text-white">
          Flexibles Gewerbeleasing und Kfz-Finanzierung in Deutschland – 
auch ohne Einkommensnachweis und mit 25–35% Anzahlung.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/request"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-medium text-neutral-900 hover:bg-neutral-200 transition"
          >
            Jetzt Angebot anfordern
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl  border  px-5 py-3 font-medium text-white hover:bg-blue-900 transition"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </div>
    </section>
  );
}

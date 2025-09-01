import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl shadow-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-gray-100">
      <div className="p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Finde dein nächstes Fahrzeug – Leasing <span className="text-gray-100">&</span> Kauf
        </h1>
        <p className="mt-3 max-w-2xl text-gray-200">
          Transparente Konditionen, geprüfte Fahrzeuge und schnelle Abwicklung. Elektro, Hybrid, Benzin oder Diesel – du wählst.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/cars"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-medium text-neutral-900 hover:bg-neutral-200 transition"
          >
            Fahrzeuge ansehen
          </Link>
          <Link
            to="/request"
            className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 font-medium text-gray-100 hover:bg-slate-700 transition"
          >
            Leasinganfrage starten
          </Link>
        </div>
      </div>
    </section>
  );
}

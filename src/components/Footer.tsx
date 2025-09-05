import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t bg-blue-950">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white">PromobilLeasing</h3>
          <p className="mt-3 text-sm text-neutral-300">
            Transparentes Autoleasing mit fairen Konditionen und schneller Abwicklung.
          </p>
          <address className="not-italic mt-4 text-sm text-neutral-300">
            Kaiserin-Augusta-Allee 87<br /> 10589 Berlin, Deutschland
          </address>
          <p className="mt-2 text-sm text-neutral-300">
            Tel.: <a className="underline" href="tel:+4915757800674">+49 1575 7800674</a><br />
            E-Mail: <a className="underline" href="mailto:info@promobileleasing.de">info@promobileleasing.de</a>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white">Fahrzeuge</h3>
          <ul className="mt-3 space-y-2 text-sm text-white">
            <li><Link className="hover:underline" to="/cars">Alle Fahrzeuge</Link></li>
            <li><Link className="hover:underline" to="/cars?fuel=electric">Elektro</Link></li>
            <li><Link className="hover:underline" to="/cars?fuel=hybrid">Hybrid</Link></li>
            <li><Link className="hover:underline" to="/cars?fuel=petrol">Benzin</Link></li>
            <li><Link className="hover:underline" to="/cars?fuel=diesel">Diesel</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white">Service</h3>
          <ul className="mt-3 space-y-2 text-sm text-white">
            <li><Link className="hover:underline" to="/leasinginfos">Leasing Infos</Link></li>
            <li><Link className="hover:underline" to="/request">Leasinganfrage</Link></li>
            <li><Link className="hover:underline" to="/contact">Kontakt</Link></li>
            <li><Link className="hover:underline" to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white">Rechtliches</h3>
          <ul className="mt-3 space-y-2 text-sm text-white">
            <li><Link className="hover:underline" to="/impressum">Impressum</Link></li>
            <li><Link className="hover:underline" to="/datenschutz">Datenschutz</Link></li>
            <li><Link className="hover:underline" to="/agb">AGB</Link></li>
            <li>
              <button
                className="underline cursor-pointer"
                onClick={() => {
                  try { localStorage.removeItem("cookie-consent"); } catch { /* empty */ }
                  alert("Cookie-Einstellungen zurückgesetzt.");
                }}
              >
                Cookie-Einstellungen
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 border-t py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-neutral-300">© {year} PromobilLeasing. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}

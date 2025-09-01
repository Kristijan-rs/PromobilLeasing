
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <section className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-100">Kontakt</h1>

          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">PromobilLeasing GmbH</h2>

            <address className="not-italic text-base sm:text-lg leading-relaxed text-gray-100">
              Musterstraße 1<br />
              12345 Musterstadt
            </address>

            <div className="space-y-2 text-base sm:text-lg">
              <p className="text-gray-100">
                Tel:&nbsp;
                <a
                  href="tel:01234567890"
                  className="font-medium text-gray-100 hover:text-gray-300 underline underline-offset-4"
                >
                  01234&nbsp;567890
                </a>
              </p>
              <p className="text-gray-100">
                E-Mail:&nbsp;
                <a
                  href="mailto:info@promobilleasing.de"
                  className="font-medium text-gray-100 hover:text-gray-300 underline underline-offset-4"
                >
                  info@promobilleasing.de
                </a>
              </p>
            </div>

            <p className="text-sm sm:text-base text-gray-100 ">
              Bürozeiten: Mo–Fr 9:00–17:00 Uhr
            </p>
          </div>
        </section>

        {/* DESNO: mapa */}
        <section aria-labelledby="map-heading" className="space-y-4">
          <h2 id="map-heading" className="text-xl sm:text-2xl font-semibold text-gray-100">Karte</h2>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            {/* OSM embed – zameni bbox/marker kada budeš imao koordinate */}
            <iframe
              title="Standort PromobilLeasing"
              className="w-full h-[340px] sm:h-[380px] md:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
              src="https://www.openstreetmap.org/export/embed.html?bbox=13.375%2C52.50%2C13.405%2C52.52&layer=mapnik&marker=52.510%2C13.390"
            />
          </div>
        </section>
      </div>
    </div>
  );
}


export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <section className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Kontakt</h1>
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Promobile Leasing</h2>
             <p className="mt-2 text-neutral-700">
    Haben Sie Fragen oder wünschen Sie eine persönliche Beratung? Kontaktieren Sie unser Team – wir helfen Ihnen gerne weiter.
  </p>

            <address className="not-italic text-base sm:text-lg leading-relaxed">
             Kaiserin-Augusta-Allee 87<br />
             10589 Berlin
            </address>

            <div className="space-y-2 text-base sm:text-lg">
              <p>
                Tel:&nbsp;
                <a
                  href="tel:015757800674"
                  className="font-medium hover:text-gray-600 underline underline-offset-4"
                >
                  01575&nbsp;7800674
                </a>
              </p>
              <p>
                E-Mail:&nbsp;
                <a
                  href="mailto:info@promobilleasing.de"
                  className="font-medium hover:text-gray-600 underline underline-offset-4"
                >
                  info@promobileleasing.de
                </a>
              </p>
            </div>

            <p className="text-sm sm:text-bas">
              Bürozeiten: Mo–Fr 10:00–18:00 Uhr
            </p>
          </div>
        </section>

        {/* DESNO: mapa */}
        <section aria-labelledby="map-heading" className="space-y-4">
          <h2 id="map-heading" className="text-xl sm:text-2xl font-semibold">Karte</h2>

          <div className="overflow-hidden rounded-2xl border shadow-sm">
            {/* OSM embed – zameni bbox/marker kada budeš imao koordinate */}
            <iframe
              title="Standort PromobilLeasing"
              className="w-full h-[340px] sm:h-[380px] md:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
              src="https://www.google.com/maps?q=Kaiserin-Augusta-Allee+87,+10589+Berlin&output=embed"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

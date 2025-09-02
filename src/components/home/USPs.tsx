export default function USPs() {
  return (
    <section aria-labelledby="usps-heading" className="space-y-6">
      <h2 id="usps-heading" className="text-xl font-semibold">
        Warum PromobilLeasing?
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-2 text-2xl">⚡</div>
          <h3 className="font-semibold">Schnelle Abwicklung</h3>
          <p className="mt-1 text-sm text-neutral-700">Vom Angebot bis zur Übergabe – effizient & zuverlässig.</p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-2 text-2xl">🔎</div>
          <h3 className="font-semibold">Transparente Preise</h3>
          <p className="mt-1 text-sm text-neutral-700">Monatsrate & Kaufpreis klar ersichtlich – keine versteckten Kosten.</p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-2 text-2xl">🛡️</div>
          <h3 className="font-semibold">Geprüfte Fahrzeuge</h3>
          <p className="mt-1 text-sm text-neutral-700">Gepflegte Historie, Serviceheft & Zustandskontrolle.</p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-2 text-2xl">🤝</div>
          <h3 className="font-semibold">Beratung & Support</h3>
          <p className="mt-1 text-sm text-neutral-700">Individuelle Beratung für Firmen & Privatkunden.</p>
        </div>
      </div>
    </section>
  );
}

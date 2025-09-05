// src/pages/Impressum.tsx
export default function Impressum() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">Impressum</h1>

      <section className="space-y-2 text-neutral-800">
        <p><strong>Promobile Leasing</strong></p>
        <p>Inhaber: Nebojsa Dordevic</p>
        <p>Kaiserin-Augusta-Allee 87<br />10589 Berlin</p>

        <p>Telefon: 01575&nbsp;7800674</p>
        <p>
          E-Mail:{" "}
          <a
            href="mailto:info@promobileleasing.de"
            className="underline underline-offset-4 hover:text-neutral-600"
          >
            info@promobileleasing.de
          </a>
        </p>

        <p className="mt-4">
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Nebojsa Dordevic
        </p>

        <p className="mt-4 text-sm text-neutral-700">
          Hinweis nach § 19 UStG: Als Kleinunternehmer wird keine Umsatzsteuer berechnet
          und ausgewiesen.
        </p>
      </section>

      <section className="mt-10 text-sm text-neutral-700">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-neutral-600"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
      </section>
    </main>
  );
}

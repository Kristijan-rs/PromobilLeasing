
const COMPANY_NAME = "Promobile Leasing";
const ADDRESS_LINES = [
  "Kaiserin-Augusta-Allee 87",
  "10589 Berlin",
];
const EMAIL = "info@promobileleasing.de";

export default function Datenschutz() {
  const updatedAt = new Date().toLocaleDateString("de-DE");

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-center">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Datenschutzerklärung</h1>
        <p className="mt-2 text-sm text-neutral-600">Stand: {updatedAt}</p>
      </header>

      {/* Inhaltsverzeichnis */}
      <nav aria-label="Inhaltsverzeichnis" className="mb-10">
        <ul className="list-none space-y-2 pl-6 text-neutral-800">
          <li><a className="underline underline-offset-4 hover:text-neutral-600" href="#verantwortlicher">1. Verantwortlicher</a></li>
          <li><a className="underline underline-offset-4 hover:text-neutral-600" href="#erhebung">2. Erhebung und Verarbeitung personenbezogener Daten</a></li>
          <li><a className="underline underline-offset-4 hover:text-neutral-600" href="#zweck">3. Zweck der Verarbeitung</a></li>
          <li><a className="underline underline-offset-4 hover:text-neutral-600" href="#weitergabe">4. Weitergabe an Dritte</a></li>
          <li><a className="underline underline-offset-4 hover:text-neutral-600" href="#speicherung">5. Speicherung und Löschung</a></li>
          <li><a className="underline underline-offset-4 hover:text-neutral-600" href="#rechte">6. Ihre Rechte</a></li>
        </ul>
      </nav>

      <section id="verantwortlicher" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">1. Verantwortlicher</h2>
        <div className="mt-3 text-neutral-800">
          <p className="font-medium">{COMPANY_NAME}</p>
          <address className="not-italic">
            {ADDRESS_LINES.map((line, i) => <div key={i}>{line}</div>)}
          </address>
          <p className="mt-2">
            E-Mail:{" "}
            <a className="underline underline-offset-4 hover:text-neutral-600" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </p>
        </div>
      </section>

      <section id="erhebung" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
        <p className="mt-3 text-neutral-800">
          Wir verarbeiten nur die Daten, die Sie uns freiwillig zur Verfügung stellen,
          z.&nbsp;B. über unser Kontaktformular, per E-Mail oder Telefon. Dazu gehören insbesondere:
        </p>
        <ul className="mt-3 list-none space-y-2 pl-6 text-neutral-800">
          <li>Name</li>
          <li>Anschrift</li>
          <li>Telefonnummer</li>
          <li>E-Mail-Adresse</li>
          <li>Angaben zu gewünschtem Fahrzeug oder Finanzierung</li>
        </ul>
      </section>

      <section id="zweck" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">3. Zweck der Verarbeitung</h2>
        <p className="mt-3 text-neutral-800">
          Die Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage, zur Angebotserstellung
          sowie ggf. zur Abwicklung des Vertrages genutzt.
        </p>
      </section>

      <section id="weitergabe" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">4. Weitergabe an Dritte</h2>
        <p className="mt-3 text-neutral-800">
          Eine Weitergabe Ihrer Daten erfolgt nur, wenn dies zur Vertragserfüllung notwendig ist
          (z.&nbsp;B. an Händler, Leasing- oder Finanzierungspartner). Eine darüber hinausgehende
          Weitergabe findet nicht statt.
        </p>
      </section>

      <section id="speicherung" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">5. Speicherung und Löschung</h2>
        <p className="mt-3 text-neutral-800">
          Wir speichern Ihre Daten nur solange, wie es für die Erfüllung des Zwecks erforderlich ist
          oder gesetzliche Aufbewahrungspflichten bestehen. Danach werden die Daten gelöscht.
        </p>
      </section>

      <section id="rechte" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">6. Ihre Rechte</h2>
        <p className="mt-3 text-neutral-800">Sie haben jederzeit das Recht auf:</p>
        <ul className="mt-3 list-none space-y-2 pl-6 text-neutral-800">
          <li>Auskunft über Ihre gespeicherten Daten,</li>
          <li>Berichtigung unrichtiger Daten,</li>
          <li>Löschung („Recht auf Vergessenwerden“),</li>
          <li>Einschränkung der Verarbeitung,</li>
          <li>Widerspruch gegen die Verarbeitung,</li>
          <li>Datenübertragbarkeit.</li>
        </ul>
        <p className="mt-3 text-neutral-800">
          Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an{" "}
          <a className="underline underline-offset-4 hover:text-neutral-600" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          .
        </p>
      </section>

      <aside className="mt-12 rounded-xl border p-4 text-sm text-neutral-700 bg-neutral-50">
        <p>
          Hinweis: Diese Datenschutzerklärung ist eine allgemeine Vorlage. Je nach tatsächlicher Verarbeitung
          (z.&nbsp;B. Cookies, Analyse-Tools, Hosting, Newsletter) können zusätzliche Angaben erforderlich sein.
        </p>
      </aside>
    </main>
  );
}

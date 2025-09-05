// src/pages/AGB.tsx
// >>> Passe diese Konstanten an deinen Bedarf an <<<
const COMPANY_NAME = "Promobile Leasing";
const SEAT_CITY = "Berlin"; // für Gerichtsstand
// <<< Ende Anpassungen >>>

export default function AGB() {
  const updatedAt = new Date().toLocaleDateString("de-DE");

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>
        <p className="mt-2 text-sm text-neutral-600">Stand: {updatedAt}</p>
      </header>

      {/* Inhaltsverzeichnis */}
      <nav aria-label="Inhaltsverzeichnis" className="mb-10">
        <ul className="list-none space-y-1 text-neutral-800">
          <li><a className="underline underline-offset-4 hover:text-neutral-600" href="#geltungsbereich">1. Geltungsbereich</a></li>
          <li><a className="underline underline-offset-4 hover:text-neutral-600" href="#vertragsgegenstand">2. Vertragsgegenstand</a></li>
          <li><a className="underline underline-offset-4 hover:text-neutral-600" href="#provision">3. Provision</a></li>
          <li><a className="underline underline-offset-4 hover:text-neutral-600" href="#pflichten-kunde">4. Pflichten des Kunden</a></li>
          <li><a className="underline underline-offset-4 hover:text-neutral-600" href="#haftung">5. Haftung</a></li>
          <li><a className="underline underline-offset-4 hover:text-neutral-600" href="#gerichtsstand">6. Gerichtsstand</a></li>
        </ul>
      </nav>

      <section id="geltungsbereich" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">1. Geltungsbereich</h2>
        <p className="mt-3 text-neutral-800">
          Diese AGB gelten für alle Vermittlungsleistungen von {COMPANY_NAME} gegenüber Kunden in Deutschland.
          Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, {COMPANY_NAME} stimmt ausdrücklich
          und schriftlich zu.
        </p>
      </section>

      <section id="vertragsgegenstand" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">2. Vertragsgegenstand</h2>
        <p className="mt-3 text-neutral-800">
          {COMPANY_NAME} vermittelt Fahrzeuge und/oder Finanzierungen. Ein Kauf- oder Leasingvertrag kommt
          ausschließlich zwischen dem Kunden und dem jeweiligen Händler oder Finanzierungspartner zustande.
          {` `}{COMPANY_NAME} ist nicht Eigentümer der Fahrzeuge.
        </p>
      </section>

      <section id="provision" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">3. Provision</h2>
        <p className="mt-3 text-neutral-800">
          Für die erfolgreiche Vermittlung eines Fahrzeugs oder einer Finanzierung erhält {COMPANY_NAME} eine Provision.
          Die Höhe und Fälligkeit der Provision ergeben sich aus dem individuellen Vermittlungsvertrag.
        </p>
      </section>

      <section id="pflichten-kunde" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">4. Pflichten des Kunden</h2>
        <p className="mt-3 text-neutral-800">
          Der Kunde verpflichtet sich, richtige und vollständige Angaben zu machen und die vereinbarte Provision
          fristgerecht zu zahlen. Erfolgt der Kauf oder das Leasing eines von {COMPANY_NAME} nachweislich vermittelten
          Fahrzeugs direkt beim Händler, bleibt der Provisionsanspruch bestehen.
        </p>
      </section>

      <section id="haftung" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">5. Haftung</h2>
        <p className="mt-3 text-neutral-800">
          {COMPANY_NAME} haftet nicht für Angaben, Beschaffenheit oder Mängel der vermittelten Fahrzeuge.
          Dafür ist ausschließlich der jeweilige Händler bzw. Verkäufer verantwortlich. Gesetzliche Haftungsregelungen
          bleiben unberührt.
        </p>
      </section>

      <section id="gerichtsstand" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">6. Gerichtsstand</h2>
        <p className="mt-3 text-neutral-800">
          Gerichtsstand für alle Streitigkeiten aus diesem Vertragsverhältnis ist – soweit gesetzlich zulässig –
          der Sitz von {COMPANY_NAME}, derzeit {SEAT_CITY}.
        </p>
      </section>

      {/* Optional: Footer-Hinweis */}
      <aside className="mt-12 rounded-xl border p-4 text-sm text-neutral-700 bg-neutral-50">
        <p>
          Hinweis: Diese AGB bilden den Rahmen für die Vermittlungsleistungen. Individuelle Absprachen im
          Vermittlungsvertrag gehen im Zweifel vor.
        </p>
      </aside>
    </main>
  );
}

// src/pages/Datenschutz.tsx
const COMPANY_NAME = "Promobile Leasing";
const ADDRESS_LINES = [
  "Kaiserin-Augusta-Allee 87",
  "10589 Berlin",
];
const EMAIL = "info@promobileleasing.de";

export default function Datenschutz() {
  const updatedAt = "07.09.2025"; 
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-center">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Datenschutzerklärung
        </h1>
        <p className="mt-2 text-sm text-neutral-600">Stand: {updatedAt}</p>
      </header>

      <nav aria-label="Inhaltsverzeichnis" className="mb-10">
        <ul className="list-none space-y-2 pl-6 text-neutral-800">
          <li><a href="#verantwortlicher" className="underline underline-offset-4 hover:text-neutral-600">1. Verantwortlicher</a></li>
          <li><a href="#erhebung" className="underline underline-offset-4 hover:text-neutral-600">2. Erhebung und Verarbeitung personenbezogener Daten</a></li>
          <li><a href="#hosting" className="underline underline-offset-4 hover:text-neutral-600">3. Hosting und Server-Logfiles</a></li>
          <li><a href="#zweck" className="underline underline-offset-4 hover:text-neutral-600">4. Zweck der Verarbeitung</a></li>
          <li><a href="#weitergabe" className="underline underline-offset-4 hover:text-neutral-600">5. Weitergabe an Dritte</a></li>
          <li><a href="#cookies" className="underline underline-offset-4 hover:text-neutral-600">6. Cookies & Tracking</a></li>
          <li><a href="#sicherheit" className="underline underline-offset-4 hover:text-neutral-600">7. Datensicherheit (SSL/TLS)</a></li>
          <li><a href="#speicherung" className="underline underline-offset-4 hover:text-neutral-600">8. Speicherung und Löschung</a></li>
          <li><a href="#rechte" className="underline underline-offset-4 hover:text-neutral-600">9. Ihre Rechte</a></li>
          <li><a href="#aufsicht" className="underline underline-offset-4 hover:text-neutral-600">10. Beschwerderecht</a></li>
          <li><a href="#aenderungen" className="underline underline-offset-4 hover:text-neutral-600">11. Änderungen</a></li>
        </ul>
      </nav>

      <section id="verantwortlicher" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Verantwortlicher</h2>
        <div className="mt-3 text-neutral-800">
          <p className="font-medium">{COMPANY_NAME}</p>
          <address className="not-italic">
            {ADDRESS_LINES.map((line, i) => <div key={i}>{line}</div>)}
          </address>
          
          <p className="mt-2">
            E-Mail:{" "}
            <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:text-neutral-600">
              {EMAIL}
            </a>
          </p>
        </div>
      </section>

      <section id="erhebung" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Erhebung und Verarbeitung personenbezogener Daten</h2>
        <p className="mt-3 text-neutral-800">
          Wir verarbeiten personenbezogene Daten nur, wenn Sie uns diese freiwillig zur Verfügung stellen,
          z. B. über unser Kontaktformular, per E-Mail oder telefonisch. Hierzu gehören insbesondere:
        </p>
        <ul className="mt-3 list-none space-y-2 pl-6 text-neutral-800 text-center">
          <li>Name</li>
          <li>Anschrift</li>
          <li>Telefonnummer</li>
          <li>E-Mail-Adresse</li>
          <li>Angaben zum gewünschten Fahrzeug oder Finanzierung</li>
        </ul>
        <p className="mt-3 text-neutral-800">
          Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) 
          bzw. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
        </p>
      </section>

      <section id="hosting" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Hosting und Server-Logfiles</h2>
        <p className="mt-3 text-neutral-800">
          Unsere Website wird bei <b>Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA</b> gehostet.
          Beim Aufruf unserer Website erhebt Vercel automatisch sogenannte Server-Logfiles. Diese beinhalten:
        </p>
        <ul className="mt-3 pl-6 text-neutral-800 text-center">
          <li>IP-Adresse</li>
          <li>Datum und Uhrzeit der Anfrage</li>
          <li>Browsertyp und Browserversion</li>
          <li>verwendetes Betriebssystem</li>
        </ul>
        <p className="mt-3 text-neutral-800">
          Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO 
          aus unserem berechtigten Interesse, die Sicherheit und Stabilität der Website zu gewährleisten. 
          Ein Auftragsverarbeitungsvertrag (AVV) mit Vercel gemäß Art. 28 DSGVO ist abgeschlossen.
        </p>
      </section>

      <section id="zweck" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Zweck der Verarbeitung</h2>
        <ul className="mt-3 pl-6 text-neutral-800 text-center">
          <li>Bearbeitung Ihrer Anfrage</li>
          <li>Erstellung von Angeboten</li>
          <li>ggf. Abwicklung des Vertrages</li>
          <li>Kundenkommunikation</li>
        </ul>
      </section>

      <section id="weitergabe" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Weitergabe an Dritte</h2>
        <p className="mt-3 text-neutral-800">
          Eine Weitergabe Ihrer Daten erfolgt nur, wenn dies erforderlich ist, z. B. an:
        </p>
        <ul className="mt-3 pl-6 text-neutral-800 text-center">
          <li>Fahrzeughändler</li>
          <li>Leasing- oder Finanzierungspartner</li>
          <li>IT-/Hosting-Dienstleister (z. B. Vercel)</li>
        </ul>
      </section>

      <section id="cookies" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Cookies & Tracking</h2>
        <p className="mt-3 text-neutral-800">
          Unsere Website verwendet technisch notwendige Cookies, um die grundlegende Funktionalität 
          (z. B. Navigation, Filter) zu gewährleisten.
        </p>
        <p className="mt-3 text-neutral-800">
          Falls zusätzliche Tools wie Analyse- oder Marketing-Tracking (z. B. Google Analytics, Meta Pixel) 
          eingesetzt werden, erfolgt dies ausschließlich auf Grundlage Ihrer ausdrücklichen Einwilligung 
          nach Art. 6 Abs. 1 lit. a DSGVO über ein Cookie-Banner.
        </p>
      </section>

      <section id="sicherheit" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Datensicherheit (SSL/TLS)</h2>
        <p className="mt-3 text-neutral-800">
          Zum Schutz Ihrer Daten setzen wir aktuelle Verschlüsselungsverfahren (SSL/TLS) ein. 
          Dadurch können Daten, die Sie z. B. über unser Kontaktformular senden, nicht von Dritten mitgelesen werden.
        </p>
      </section>

      <section id="speicherung" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Speicherung und Löschung</h2>
        <p className="mt-3 text-neutral-800">
          Wir speichern Ihre Daten nur solange, wie es für die Erfüllung des jeweiligen Zwecks erforderlich ist 
          oder gesetzliche Aufbewahrungspflichten bestehen. Anschließend werden die Daten gelöscht.
        </p>
      </section>

      <section id="rechte" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Ihre Rechte nach DSGVO</h2>
        <ul className="mt-3 pl-6 text-neutral-800 text-center">
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung („Recht auf Vergessenwerden“, Art. 17 DSGVO)</li>
          <li>Einschränkung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch (Art. 21 DSGVO)</li>
        </ul>
        <p className="mt-3 text-neutral-800">
          Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an{" "}
          <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:text-neutral-600">
            {EMAIL}
          </a>.
        </p>
      </section>

      {/* [PL] ADDED: Aufsichtsbehörde */}
      <section id="aufsicht" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Beschwerderecht bei der Aufsichtsbehörde</h2>
        <p className="mt-3 text-neutral-800">
          Sie haben das Recht, sich bei einer Aufsichtsbehörde für Datenschutz zu beschweren, 
          wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt.
        </p>
        <div className="mt-3 text-neutral-800">
          <p>Zuständige Behörde:</p>
          <p>Berliner Beauftragte für Datenschutz und Informationsfreiheit</p>
          <p>Alt-Moabit 59-61</p>
          <p>10555 Berlin</p>
          <a href="https://www.datenschutz-berlin.de" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-neutral-600">
            www.datenschutz-berlin.de
          </a>
        </div>
      </section>

      {/* [PL] ADDED: Änderungen */}
      <section id="aenderungen" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Änderungen der Datenschutzerklärung</h2>
        <p className="mt-3 text-neutral-800">
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, 
          um sie stets den aktuellen rechtlichen Anforderungen anzupassen oder 
          Änderungen unserer Leistungen umzusetzen.
        </p>
      </section>
    </main>
  );
}

// src/pages/LeasingInfos.tsx
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

export default function LeasingInfos() {
  const site = import.meta.env.VITE_SITE_URL as string;

  return (
    <>
      <Seo
        title="Leasing-Infos – PromobilLeasing"
        description="Leasing trotz Schufa, ohne Einkommensnachweis und mit flexibler Anzahlung (25–35%). Gewerbeleasing für Firmen, Selbstständige & Start-ups – transparent erklärt."
        ogImage="/og/leasing-infos.jpg"
        canonical={`${site}/leasing-info`}
      />

      <main className="mx-auto max-w-7xl px-4 py-10 space-y-12">
        {/* Title */}
        <header className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Leasing-Infos</h1>
          <p className="text-neutral-700 max-w-3xl mx-auto">
            Auto-Leasing trotz Schufa, Gewerbeleasing in Deutschland, flexible Anzahlung (25–35%)
            und Finanzierung auch ohne klassischen Einkommensnachweis – übersichtlich erklärt.
          </p>
        </header>

        {/* Vorteile */}
        <section aria-labelledby="vorteile-heading" className="space-y-6">
          <h2 id="vorteile-heading" className="text-2xl font-semibold">
            Ihre Vorteile mit Promobile Leasing
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">Leasing trotz Schufa-Eintrag</h3>
              <p className="mt-2 text-sm text-neutral-700">
               Wir ermöglichen Auto-Leasing auch bei negativer Schufa oder schwacher Bonität. Finanzieren Sie PKW, LKW und Maschinen trotz Schufa, dank unserer spezialisierten Lösungen.
              </p>
            </article>
            <article className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">Ohne Einkommensnachweis möglich</h3>
              <p className="mt-2 text-sm text-neutral-700">
              Selbst Leasing ohne Einkommensnachweis ist bei uns unter bestimmten Voraussetzungen realisierbar. Wenn Sie kein regelmäßiges Einkommen nachweisen können, finden wir alternative Wege – oft genügt eine höhere Anzahlung oder andere Sicherheiten.
              </p>
            </article>
            <article className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">Flexible Anzahlung (25–35%)</h3>
              <p className="mt-2 text-sm text-neutral-700">
               Sie bestimmen die Finanzierung mit Anzahlung, passend zu Ihrem Budget. Üblich sind 25–35% Anzahlung, um die Monatsrate gering zu halten – wir beraten Sie zu flexiblen Optionen, bis das Modell für Sie stimmt.
              </p>
            </article>
            <article className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">Für Firmen, Selbstständige & Start-ups</h3>
              <p className="mt-2 text-sm text-neutral-700">
               Ob Gewerbeleasing in Deutschland für etablierte Firmen oder Finanzierung für Existenzgründer – wir bieten maßgeschneiderte Lösungen. Auch neu gegründete Unternehmen und Selbstständige ohne lange Geschäftshistorie erhalten bei uns eine Chance auf Leasing und Finanzierung.
              </p>
            </article>
          </div>
        </section>

        {/* Prozess in 4 Schritten */}
        <section aria-labelledby="prozess-heading" className="space-y-6">
          <h2 id="prozess-heading" className="text-2xl font-semibold">
            So funktioniert es – Leasing in 4 Schritten
          </h2>
          <ol className="space-y-4">
            <li className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">1. Anfrage & Beratung</h3>
              <p className="mt-2 text-sm text-neutral-700">
              Stellen Sie online oder telefonisch eine unverbindliche Leasing-Anfrage. Teilen Sie uns mit, welches Fahrzeug oder welche Maschine Sie finanzieren möchten. Unser Team berät Sie persönlich und diskret zu Ihren Möglichkeiten, auch bei schwieriger Schufa oder fehlenden Einkommensnachweisen.
              </p>
            </li>
            <li className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">2. Prüfung & Angebot</h3>
              <p className="mt-2 text-sm text-neutral-700">
               Wir prüfen Ihre Anfrage umgehend. Anhand Ihrer Angaben und Unterlagen erarbeiten wir ein individuelles Angebot. Dank unseres Netzwerks von Finanzierungspartnern finden wir häufig Lösungen, wo andere Banken ablehnen. Sie erhalten ein transparentes Angebot mit allen Konditionen – frei wählbarer Händler und Fahrzeugmodell inklusive. <span className="font-semibold">Sie können Ihr Wunschfahrzeug direkt bei einem Händler Ihrer Wahl auswählen.</span>
              </p>
            </li>
            <li className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">3. Vertragsabschluss</h3>
              <p className="mt-2 text-sm text-neutral-700">
              Passt das Angebot, kümmern wir uns um den Vertragsabschluss. Sie unterschreiben den Leasingvertrag, leisten die vereinbarte Anzahlung direkt an Ihren Händler, und die Leasinggesellschaft überweist den Restbetrag an den Händler.
              </p>
            </li>
            <li className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">4. Fahrzeugübernahme</h3>
              <p className="mt-2 text-sm text-neutral-700">
               Jetzt können Sie Ihr Fahrzeug oder Ihre Maschine übernehmen! Wir koordinieren mit dem Händler die Bezahlung, so dass Sie Ihr neues Auto, Ihren Transporter oder Ihre Maschine schnell nutzen können. Genießen Sie volle Mobilität – Ihr Leasing startet, und Sie profitieren von festen Raten und unserer Betreuung während der gesamten Leasingdauer.
              </p>
            </li>
          </ol>
        </section>

        {/* Beispiele / Use cases */}
        <section aria-labelledby="beispiele-heading" className="space-y-6">
          <h2 id="beispiele-heading" className="text-2xl font-semibold">
            Beispiele für finanzierte Fahrzeuge und Maschinen
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">PKW für Privatpersonen</h3>
              <p className="mt-2 text-sm text-neutral-700">
              Sie benötigen ein zuverlässiges Auto, doch die Hausbank zögert wegen eines Schufa-Eintrags? Bei uns können Sie z.B. einen VW Golf oder BMW 3er leasen, selbst mit negativer Schufa. Durch ~30% Anzahlung und angepasste Raten ermöglichen wir Ihnen bezahlbare Mobilität für Alltag und Familie..
              </p>
            </article>
            <article className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">Transporter für Selbständige</h3>
              <p className="mt-2 text-sm text-neutral-700">
              Ihr junges Unternehmen braucht einen Lieferwagen oder leichten LKW? Wir machen es möglich! Beispiel: Ein Mercedes Sprinter im Wert von 20.000 € lässt sich mit 25% Anzahlung und ohne lückenlosen Einkommensnachweis finanzieren. So bleiben Ihre Lieferungen pünktlich, und Ihr Gewerbe kommt ins Rollen – trotz kurzer Firmenhistorie.
              </p>
            </article>
            <article className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">Baumaschinen für Jungunternehmen</h3>
              <p className="mt-2 text-sm text-neutral-700">
               Ob Bagger, Radlader oder Baugerät, wir unterstützen Bauunternehmen beim Wachstum. Selbst wenn Ihre Firma gerade erst gestartet ist, können Sie bei uns eine Baumaschine leasen. Zum Beispiel finanzieren wir einen gebrauchten Bagger (ca. 50.000 €) mit ~30% Anzahlung und angepasster Rate – so investieren Sie in neue Aufträge, ohne Ihre Liquidität aufzubrauchen.
              </p>
            </article>
            <article className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">Landmaschinen für Landwirte</h3>
              <p className="mt-2 text-sm text-neutral-700">
               Modernisieren Sie Ihren Landwirtschaftsbetrieb mit unserer Hilfe. Wir bieten Leasing für Traktoren, Mähdrescher und andere Landmaschinen. Ein Traktor im Wert von 60.000 € lässt sich etwa mit 25% Anzahlung leasen – ideal für Landwirte, die trotz Schufa-Einträgen oder fehlender Bilanzen ihre Produktion erweitern möchten.
              </p>
            </article>
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/request"
            className="inline-flex items-center justify-center rounded-xl shadow-md border bg-white px-5 py-3 font-semibold hover:bg-gray-100 transition"
          >
            Jetzt Angebot anfordern
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl border shadow-md bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-950 transition"
          >
            Kontakt aufnehmen
          </Link>
        </section>
      </main>
    </>
  );
}

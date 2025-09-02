import { useState, type JSX } from "react";
import Seo from "@/components/Seo";

type QA = { q: string; a: string | JSX.Element};

const FAQS: QA[] = [
  {
    q: "Kann ich trotz negativer Schufa ein Fahrzeug leasen?",
    a: "Ja. Promobile Leasing ist spezialisiert auf Auto-Leasing trotz Schufa. Wir arbeiten mit Partnern zusammen, die auch bei negativer Schufa-Auskunft Finanzierungen ermöglichen. In der Regel erhöhen eine höhere Anzahlung oder zusätzliche Sicherheiten die Chancen auf eine Zusage.",
  },
  {
    q: "Ist Leasing ohne Einkommensnachweis wirklich möglich?",
    a: "Unter bestimmten Bedingungen, ja. Leasing ohne Einkommensnachweis bieten wir bis zu einer bestimmten Finanzierungssumme an, vor allem wenn Sie über entsprechende Eigenmittel (z.B. Anzahlung) verfügen. Statt Gehaltsnachweisen genügen oft andere Dokumente (wie Gewerbeanmeldung oder Ausweis), damit wir Ihre Identität und Situation einschätzen können. Gemeinsam finden wir eine Lösung, die zu Ihrer finanziellen Lage passt.",
  },
  {
    q: "Wie hoch muss die Anzahlung sein?",
    a: "Die Anzahlung ist flexibel und wird individuell vereinbart. Bei schwacher Bonität oder fehlenden Einkommensnachweisen sind 25–35% Anzahlung üblich, um das Risiko für alle Seiten zu verringern. Wenn Ihre Bonität sehr gut ist und Sie Einkünfte nachweisen können, ist oft auch Leasing ohne Anzahlung möglich.",
  },
  {
    q: "Welche Fahrzeuge und Maschinen kann ich leasen?",
    a: (<> Grundsätzlich fast alles, was eine Straßenzulassung hat oder zur gewerblichen Nutzung dient. Dazu zählen PKW, Transporter, LKW, Busse, Wohnmobile ebenso wie Bau- und Landmaschinen. Bei Fahrzeugen mit negativer Schufa oder ohne Einkommensnachweis gibt es Einschränkungen: Das Fahrzeug sollte nicht älter <span className="font-semibold">als 5 Jahre</span> sein und maximal <span className="font-semibold">100.000 km Laufleistung haben. Wichtig: Sie sind frei in der Wahl des Händlers. Die Anzahlung leisten Sie direkt an den Händler, der Restbetrag wird von unserer Leasinggesellschaft übernommen.</span>,
    </>)
  },
  {
    q: "Wie lange läuft der Vertrag und wie sind die Raten?",
    a:(<> Die Laufzeit beträgt in der Regel  <span className="font-semibold">24–36 Monate</span>  abhängig vom Fahrzeugtyp und Ihrer finanziellen Situation.,
    </>)
  },
  {
    q: "Bieten Sie Leasing für Selbständige und neue Firmen an?",
    a: "Ja, Gewerbeleasing für Unternehmen in Deutschland ist unser Kerngebiet – und das schließt Existenzgründer und Jungunternehmen ausdrücklich mit ein. Auch wenn Ihre Firma noch keine langen Geschäftszahlen vorweisen kann, erhalten Sie bei uns eine Chance. Ein aktueller Gewerbeschein oder Handelsregisterauszug genügt meist als Nachweis der Geschäftstätigkeit.",
  },
  {
    q: "Wie schnell bekomme ich ein Angebot & wie lange dauert die Abwicklung?",
    a: "Ein Angebot erhalten Sie ganz einfach: Stellen Sie eine Leasing-Anfrage über unser Online-Formular oder per Telefon. Wir melden uns normalerweise noch am selben Werktag mit einer ersten Rückmeldung. Nach Eingang aller notwendigen Unterlagen kann die Prüfung und Zusage innerhalb weniger Tage erfolgen. Vom Erstkontakt bis zur Fahrzeugübernahme vergehen in vielen Fällen nur 1–2 Wochen – Sie kommen also schnell an Ihr Fahrzeug.",
  },
];

export default function FAQ() {
  const site = import.meta.env.VITE_SITE_URL as string;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <Seo
        title="FAQ – PromobilLeasing"
        description="Antworten zu Leasing trotz Schufa, ohne Einkommensnachweis, Anzahlung (25–35%), Laufzeiten und Fahrzeugtypen."
        ogImage="/og/faq.jpg"
        canonical={`${site}/faq`}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">FAQ</h1>
          <p className="text-neutral-700 max-w-3xl mx-auto">
            Antworten auf die häufigsten Fragen rund um Leasing & Finanzierung.
          </p>
        </header>

        <section className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="rounded-2xl border bg-white shadow-sm">
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between cursor-pointer"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="font-medium text-neutral-900">{item.q}</span>
                  <span className="ml-4 text-neutral-500">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-neutral-700 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}

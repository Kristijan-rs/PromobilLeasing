import Seo from "@/components/Seo";

export default function About() {
  const site = import.meta.env.VITE_SITE_URL as string;

  return (
    <>
      <Seo
        title="Über uns – PromobilLeasing"
        description="Erfahren Sie mehr über PromobilLeasing: unsere Mission, unsere Werte und unser Team."
        canonical={`${site}/about`}
        ogImage="/og/about.jpg"
      />

      <main className="mx-auto max-w-5xl text-center rounded-2xl shadow-lg bg-white px-4 py-12 space-y-12 mt-16">
        {/* Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Über uns</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            PromobilLeasing – Ihr Partner für faire Leasingangebote, transparente Konditionen und persönlichen Service.
          </p>
        </section>

        {/* Mission & Werte */}
        <section className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Unsere Mission</h2>
            <p className="text-slate-700 leading-relaxed">
              Wir möchten Mobilität für alle zugänglich machen. Ob Privatkunden oder Unternehmen – 
              mit klaren Angeboten, schneller Abwicklung und umfassender Beratung.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Unsere Werte</h2>
            <ul className="list-disc list-inside text-slate-700 leading-relaxed">
              <li>Transparenz bei Preisen und Konditionen</li>
              <li>Verlässlichkeit bei Service und Beratung</li>
              <li>Nachhaltigkeit durch moderne Fahrzeugflotten</li>
              <li>Flexibilität für individuelle Bedürfnisse</li>
            </ul>
          </div>
        </section>

        {/* Team (optional) */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Unser Team</h2>
          <p className="text-slate-700">
            Hinter PromobilLeasing steht ein engagiertes Team aus Auto-Experten, Finanzberatern und Service-Spezialisten.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          </div>
        </section>
      </main>
    </>
  );
}

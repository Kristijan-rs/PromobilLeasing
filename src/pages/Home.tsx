import Seo from "@/components/Seo";
import vehicles from "@/features/vehicles/vehicles.data";
import Hero from "@/components/home/Hero";
import USPs from "@/components/home/USPs";
import Offers from "@/components/home/Offers";

export default function Home() {
  const site = import.meta.env.VITE_SITE_URL as string;
  const featured = vehicles.filter((v) => v.featured).slice(0, 6);

  return (
    <>
      <Seo
        title="PromobilLeasing – Top Fahrzeuge: Leasing & Kauf"
        description="Leasing und Kauf zu fairen Konditionen. Aktuelle Angebote, transparente Preise, schnelle Abwicklung."
        ogImage="/og/home.jpg"
        canonical={`${site}/`}
      />

      <main className="mx-auto max-w-7xl px-4 py-10 space-y-12">
       <Hero />
       <USPs />
       <Offers items={featured} />
      </main>
    </>
  );
}

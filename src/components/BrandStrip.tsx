
const LOGOS = [
  { src: "/brands/audi.svg", alt: "Audi" },
  { src: "/brands/bmw.svg", alt: "BMW" },
  { src: "/brands/mercedes.svg", alt: "Mercedes-Benz" },
  { src: "/brands/volkswagen.svg", alt: "Volkswagen" },
  { src: "/brands/tesla.svg", alt: "Tesla" },
  { src: "/brands/porsche.svg", alt: "Porsche" },
];

function Row() {
  return (
    <>
      {LOGOS.map((logo) => (
        <div
          key={logo.alt}
          className="inline-flex items-center justify-center px-3 opacity-80 hover:opacity-100 transition"
        >
          <img
            src={logo.src}
            alt={logo.alt}
            decoding="async"
            className="h-10 w-auto"
          />
        </div>
      ))}
    </>
  );
}

export default function BrandStrip() {
  return (
    <section
      aria-label="Unsere Marken"
      className="relative overflow-hidden rounded-2xl bg-white shadow-md"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />

      <div className="relative py-6 min-h-[56px]">
        <div
          className="
            whitespace-nowrap
            will-change-transform
            animate-[marquee_28s_linear_infinite]
          "
        >
          <div className="inline-flex items-center gap-10 align-middle">
            <Row />
          </div>
          <div
            className="inline-flex items-center gap-10 align-middle"
            aria-hidden="true"
          >
            <Row />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

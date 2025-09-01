import { useCallback, useEffect, useRef, useState } from "react";
import ResponsiveImage from "@/components/ResponsiveImage";

type Props = { images: string[]; altBase: string };

export default function Gallery({ images, altBase }: Props) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  //  helpers: kružna navigacija 
  const norm = (i: number) => ((i % count) + count) % count;
  const go = (i: number) => setIndex((prev) => (count ? norm(i) : prev));

  const next = useCallback(() => {
    setIndex(i => (count ? (i + 1) % count : i));
  }, [count]);
  
  const prev = useCallback(() => {
    setIndex(i => (count ? (i - 1 + count) % count : 1));
  }, [count]);

  // korekcija indeksa
  useEffect(() => {
    if (index > count - 1) setIndex(0);
  }, [count, index]);

  // tastatura
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setIndex(i => Math.min(i + 1, count - 1));
      if (e.key === "ArrowLeft") setIndex(i => Math.max(i - 1, 0));
      if (e.key === "Escape") setLightbox(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  // swipe
  useEffect(() => {
    const el = trackRef.current;
  if (!el || !count) return;

  let startX = 0, delta = 0;
  const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; delta = 0; };
  const onMove  = (e: TouchEvent) => { delta = e.touches[0].clientX - startX; };
  const onEnd   = () => { if (delta < -60) next(); else if (delta > 60) prev(); };

  el.addEventListener("touchstart", onStart, { passive: true });
  el.addEventListener("touchmove", onMove, { passive: true });
  el.addEventListener("touchend", onEnd);
  return () => {
    el.removeEventListener("touchstart", onStart);
    el.removeEventListener("touchmove", onMove);
    el.removeEventListener("touchend", onEnd);
    };
  }, [count, next, prev]);

 

  return (
    <div className="space-y-3">
      {/* Glavno */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border">
        <div ref={trackRef} className="h-full w-full">
          {count > 0 ? (
            <ResponsiveImage
              rawSrc={images[index]}
              alt={`${altBase} – Bild ${index + 1} von ${count}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              className="h-full w-full object-cover select-none cursor-zoom-in"
              onClick={() => setLightbox(true)}   
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-500">
              Keine Bilder verfügbar
            </div>
          )}
        </div>

        {/* Pfeile */}
        {count > 1 && (
          <>
            <button
              aria-label="Vorheriges Bild"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 shadow hover:bg-white cursor-pointer"
              onClick={() => go(index - 1)}
            >‹</button>
            <button
              aria-label="Nächstes Bild"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 shadow hover:bg-white cursor-pointer"
              onClick={() => go(index + 1)}
            >›</button>
          </>
        )}

        {/* Pager */}
        {count > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Gehe zu Bild ${i + 1}`}
                className={`h-1.5 w-4 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              aria-label={`Vorschaubild ${i + 1}`}
              onClick={() => go(i)}
              className={`group relative aspect-[16/10] overflow-hidden rounded-lg border ${i === index ? "ring-2 ring-neutral-900" : ""}`}
            >
              <ResponsiveImage
                rawSrc={src}
                alt={`${altBase} – Vorschaubild ${i + 1}`}
                sizes="120px"
                className="absolute inset-0 h-full w-full object-cover group-hover:opacity-90"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && count > 0 && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Bild in Großansicht"
          onClick={() => setLightbox(false)}
        >
          <div
            className="relative max-w-6xl w-full aspect-[16/10]"
            onClick={(e) => e.stopPropagation()}
          >
            <ResponsiveImage
              rawSrc={images[index]}
              alt={`${altBase} – Großansicht ${index + 1} von ${count}`}
              sizes="90vw"
              className="absolute inset-0 h-full w-full object-contain"
            />
            <button
              aria-label="Schließen"
              className="absolute top-2 right-2 rounded-full bg-white/90 px-3 py-1.5 text-black cursor-pointer"
              onClick={() => setLightbox(false)}
            >✕</button>
            {count > 1 && (
              <>
                <button
                  aria-label="Vorheriges Bild"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-black cursor-pointer"
                  onClick={() => go(index - 1)}
                >‹</button>
                <button
                  aria-label="Nächstes Bild"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-black cursor-pointer"
                  onClick={() => go(index + 1)}
                >›</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

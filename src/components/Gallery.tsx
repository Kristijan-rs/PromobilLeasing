import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ResponsiveImage from "@/components/ResponsiveImage";

type Props = { images: string[]; altBase: string };

export default function Gallery({ images, altBase }: Props) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const count = images.length;
  const norm = useCallback((i: number) => ((i % count) + count) % count, [count]);

  // Navigacija (kružno)
  const go = useCallback(
    (i: number) => {
      if (!count) return;
      setIndex(norm(i));
    },
    [count, norm]
  );

  const next = useCallback(() => {
    if (!count) return;
    setIndex((i) => norm(i + 1));
  }, [count, norm]);

  const prev = useCallback(() => {
    if (!count) return;
    setIndex((i) => norm(i - 1));
  }, [count, norm]);

  // Ako se broj slika promeni a index "ispadne", reset
  useEffect(() => {
    if (index > count - 1) setIndex(0);
  }, [count, index]);

  // Tastatura: samo kada je fokus u galeriji ili je lightbox otvoren
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const hasFocus =
        !!containerRef.current && containerRef.current.contains(document.activeElement);
      if (!hasFocus && !lightbox) return;

      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, lightbox]);

  // Touch swipe (bez biblioteka)
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !count) return;

    let startX = 0;
    let delta = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0]?.clientX ?? 0;
      delta = 0;
    };
    const onMove = (e: TouchEvent) => {
      delta = (e.touches[0]?.clientX ?? startX) - startX;
    };
    const onEnd = () => {
      const THRESH = 40;
      if (delta < -THRESH) next();
      else if (delta > THRESH) prev();
      startX = 0;
      delta = 0;
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [count, next, prev]);

  // Preload susednih slika (brže listanje)
  useEffect(() => {
    if (count <= 1) return;
    const preload = (src: string) => {
      const img = new Image();
      img.src = src;
    };
    preload(images[norm(index + 1)]);
    preload(images[norm(index - 1)]);
  }, [index, images, norm, count]);

  // 4 thumb-a: aktivni + 3 sledeća (sa rotacijom)
  const thumbs = useMemo(() => {
    const n = Math.min(4, count);
    return Array.from({ length: n }, (_, k) => {
      const realIndex = norm(index + k);
      return { realIndex, src: images[realIndex] };
    });
  }, [images, index, norm, count]);

  if (count === 0) {
    return <div className="aspect-[16/10] w-full rounded-2xl border bg-neutral-100" />;
  }

  return (
    <div ref={containerRef} className="space-y-3" aria-label="Bildergalerie" tabIndex={0}>
      {/* Glavno */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border">
        <div ref={trackRef} className="h-full w-full">
          <ResponsiveImage
            rawSrc={images[index]}
            alt={`${altBase} – Bild ${index + 1} von ${count}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            className="h-full w-full object-cover select-none cursor-zoom-in"
            onClick={() => setLightbox(true)}
          />
        </div>

        {/* Pfeile */}
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Vorheriges Bild"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 shadow hover:bg-white focus:outline-none focus:ring-2  cursor-pointer"
              onClick={prev}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Nächstes Bild"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 shadow hover:bg-white focus:outline-none focus:ring-2 cursor-pointer"
              onClick={next}
            >
              ›
            </button>
          </>
        )}

        {/* Pager (tačkice) */}
        {count > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Gehe zu Bild ${i + 1}`}
                className={`h-1.5 w-4 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails – uvek max 4 u redu, rotiraju uz aktivni */}
      {count > 1 && (
  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
    {thumbs.map(({ src, realIndex }) => (
      <button
        key={`${src}-${realIndex}`}
        onClick={() => go(realIndex)}
        className={`group relative overflow-hidden rounded-lg border transition
          basis-1/2 sm:basis-1/3 md:basis-1/4
          ${realIndex === index ? "ring-2 ring-neutral-900" : "border-gray-300 hover:border-gray-500"}`}
      >
        <div className="aspect-[16/10] w-full max-h-20 cursor-pointer">
          <ResponsiveImage
            rawSrc={src}
            alt=""
            sizes="(max-width: 640px) 40vw, (max-width: 768px) 25vw, 100px"
            className="h-full w-full object-cover group-hover:opacity-90"
          />
        </div>
      </button>
    ))}
  </div>
)}


      {/* Lightbox */}
      {lightbox && (
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
              type="button"
              aria-label="Schließen"
              className="absolute top-2 right-2 rounded-full bg-white/90 px-3 py-1.5 text-black cursor-pointer"
              onClick={() => setLightbox(false)}
            >
              ✕
            </button>

            {count > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Vorheriges Bild"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-black cursor-pointer"
                  onClick={prev}
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Nächstes Bild"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-black cursor-pointer"
                  onClick={next}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

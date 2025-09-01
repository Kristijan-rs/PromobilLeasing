// src/components/CookieBanner.tsx
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie:consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie:consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie:consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:flex sm:items-center sm:justify-between">
        <p className="text-sm text-neutral-700">
          Wir verwenden Cookies, um unsere Website zu optimieren und Ihnen den
          bestmöglichen Service zu bieten. Details finden Sie in unserer{" "}
          <a
            href="/datenschutz"
            className="underline underline-offset-2 hover:text-neutral-900"
          >
            Datenschutzerklärung
          </a>
          .
        </p>
        <div className="mt-3 flex gap-3 sm:mt-0">
          <button
            onClick={decline}
            className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Ablehnen
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

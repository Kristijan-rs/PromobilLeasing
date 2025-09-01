import { useEffect } from "react";
import { setDocumentSEO, type SEO } from "@/lib/seo";

type JsonLd = Record<string, unknown>;
type Props = SEO & { jsonLd?: JsonLd | JsonLd[] | null };

export default function Seo({ title, description, ogImage, canonical, noindex, jsonLd }: Props) {
  useEffect(() => {
    setDocumentSEO({ title, description, ogImage, canonical, noindex });
  }, [title, description, ogImage, canonical, noindex]);

  useEffect(() => {
    const prev = Array.from(document.head.querySelectorAll<HTMLScriptElement>('script[data-jsonld="dynamic"]'));
    prev.forEach((s) => s.remove());

    if (!jsonLd) return;
    const list = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

    list.forEach((obj, i) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.jsonld = "dynamic";
      s.id = `jsonld-${i}`;
      s.text = JSON.stringify(obj);
      document.head.appendChild(s);
    });
  }, [jsonLd]);

  return null;
}

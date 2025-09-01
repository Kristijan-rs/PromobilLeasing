// src/lib/seo.ts
import { useEffect } from "react";

export type SEO = {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
};

function upsertMeta(selector: string, create: () => HTMLMetaElement, set: (el: HTMLMetaElement) => void) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  set(el);
}

export function setDocumentSEO({ title, description, ogImage, canonical, noindex }: SEO) {
  if (title) document.title = title;

  if (description) {
    upsertMeta('meta[name="description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      return m;
    }, (m) => m.setAttribute("content", description));
  }

  if (canonical) {
    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);
  }

  // robots
  upsertMeta('meta[name="robots"]', () => {
    const m = document.createElement("meta");
    m.setAttribute("name", "robots");
    return m;
  }, (m) => m.setAttribute("content", noindex ? "noindex, nofollow" : "index, follow"));

  // OpenGraph
  if (title) {
    upsertMeta('meta[property="og:title"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:title");
      return m;
    }, (m) => m.setAttribute("content", title));
  }
  if (description) {
    upsertMeta('meta[property="og:description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:description");
      return m;
    }, (m) => m.setAttribute("content", description));
  }
  if (ogImage) {
    upsertMeta('meta[property="og:image"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:image");
      return m;
    }, (m) => m.setAttribute("content", ogImage));
  }
  if (canonical) {
    upsertMeta('meta[property="og:url"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:url");
      return m;
    }, (m) => m.setAttribute("content", canonical));
  }
  upsertMeta('meta[property="og:type"]', () => {
    const m = document.createElement("meta");
    m.setAttribute("property", "og:type");
    return m;
  }, (m) => m.setAttribute("content", "website"));

  // Twitter
  upsertMeta('meta[name="twitter:card"]', () => {
    const m = document.createElement("meta");
    m.setAttribute("name", "twitter:card");
    return m;
  }, (m) => m.setAttribute("content", ogImage ? "summary_large_image" : "summary"));

  if (title) {
    upsertMeta('meta[name="twitter:title"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "twitter:title");
      return m;
    }, (m) => m.setAttribute("content", title));
  }
  if (description) {
    upsertMeta('meta[name="twitter:description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "twitter:description");
      return m;
    }, (m) => m.setAttribute("content", description));
  }
  if (ogImage) {
    upsertMeta('meta[name="twitter:image"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "twitter:image");
      return m;
    }, (m) => m.setAttribute("content", ogImage));
  }
}

export function useSEO(seo: SEO) {
  useEffect(() => {
    setDocumentSEO(seo);
  }, [seo]);
}

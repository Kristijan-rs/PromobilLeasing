import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = (process.env.SITE_URL || "https://www.promobilleasing.de").replace(/\/+$/, "");

const STATIC_ROUTES = ["/", "/cars", "/contact", "/request"];

import vehicles from "../src/features/vehicles/vehicles.data";

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function buildSitemapXml(urls: { loc: string; changefreq?: string; priority?: number; lastmod?: string }[]) {
  const items = urls
    .map((u) => {
      const lastmod = u.lastmod || new Date().toISOString().split("T")[0];
      const changefreq = u.changefreq || "weekly";
      const priority = u.priority ?? 0.7;
      return `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`.trim();
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${items}
</urlset>
`;
}

function main() {
  const urls: { loc: string; changefreq?: string; priority?: number }[] = [];

  for (const path of STATIC_ROUTES) {
    urls.push({ loc: `${SITE_URL}${path}`, changefreq: "weekly", priority: path === "/" ? 1.0 : 0.8 });
  }

  const carSlugs = unique(vehicles.map((v) => v.slug));
  for (const slug of carSlugs) {
    urls.push({ loc: `${SITE_URL}/cars/${encodeURIComponent(slug)}`, changefreq: "daily", priority: 0.9 });
  }

  const outDir = resolve(process.cwd(), "public");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "sitemap.xml"), buildSitemapXml(urls).trim(), "utf-8");

  const robots = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`;
  writeFileSync(resolve(outDir, "robots.txt"), robots, "utf-8");

  console.log(`✓ sitemap.xml & robots.txt generated for ${urls.length} URLs -> public/`);
}

main();

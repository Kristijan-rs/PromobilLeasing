import { mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const srcDir = resolve(process.cwd(), "node_modules/simple-icons/icons");
const outDir = resolve(process.cwd(), "public/brands");
mkdirSync(outDir, { recursive: true });

// helper: nađi prvi fajl koji sadrži bilo koji od tokena
function findIcon(tokens) {
  const files = readdirSync(srcDir).filter(f => f.endsWith(".svg"));
  const lower = files.map(f => f.toLowerCase());
  for (const t of tokens) {
    const idx = lower.findIndex(f => f.includes(`${t}.svg`));
    if (idx !== -1) return files[idx];
  }
  // fallback: bilo šta što sadrži token kao deo (npr. "mercedes-benz.svg")
  for (const t of tokens) {
    const hit = files.find(f => f.toLowerCase().includes(t));
    if (hit) return hit;
  }
  return null;
}

// --- ostali brendovi (statično) ---
const COPY = [
  { out: "audi.svg",       candidates: ["audi"] },
  { out: "bmw.svg",        candidates: ["bmw"] },
  { out: "vw.svg",         candidates: ["vw", "volkswagen"] },
  { out: "tesla.svg",      candidates: ["tesla"] },
  { out: "porsche.svg",    candidates: ["porsche"] },
];

// --- mercedes: fuzzy ---
const mercedesFile = findIcon(["mercedes", "mercedes-benz", "mercedesbenz"]);
if (mercedesFile) {
  const svg = readFileSync(resolve(srcDir, mercedesFile), "utf8");
  writeFileSync(resolve(outDir, "mercedes.svg"), svg, "utf8");
  console.log(`✓ mercedes.svg (from ${mercedesFile})`);
} else {
  console.warn("⚠️  Mercedes icon not found in simple-icons/icons");
}

// --- ostali ---
for (const { out, candidates } of COPY) {
  const hit = findIcon(candidates);
  if (!hit) { console.warn(`⚠️  Not found for ${out}`); continue; }
  const svg = readFileSync(resolve(srcDir, hit), "utf8");
  writeFileSync(resolve(outDir, out), svg, "utf8");
  console.log(`✓ ${out} (from ${hit})`);
}

console.log("Done → public/brands/");

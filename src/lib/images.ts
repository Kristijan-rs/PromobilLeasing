
export type ImageVariant = 320 | 480 | 640 | 768 | 960 | 1200 | 1440 | 1920;

type SrcsetOptions = {
  basePath: string;  
  widths?: readonly ImageVariant[];
  formats?: readonly ("avif" | "webp" | "jpg")[];
};

const DEFAULT_WIDTHS: ImageVariant[] = [480, 768, 1200, 1920];
const DEFAULT_FORMATS = ["avif", "webp", "jpg"] as const;

export function buildSrcset({
  basePath,
  widths = DEFAULT_WIDTHS,
  formats = DEFAULT_FORMATS,
}: SrcsetOptions) {
  const byFormat = new Map<string, string>();
  for (const fmt of formats) {
    const s = widths.map((w) => `${basePath}-${w}.${fmt} ${w}w`).join(", ");
    byFormat.set(fmt, s);
  }
  return byFormat;
}

export const CARD_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

export const DETAIL_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px";

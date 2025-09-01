import { buildSrcset } from "@/lib/images";
import type { MouseEventHandler } from "react";

type Props = {
  rawSrc?: string;
  basePath?: string;

  alt: string;
  sizes?: string;
  className?: string;
  loading?: "eager" | "lazy";
  decoding?: "async" | "sync" | "auto";
  fallbackWidth?: 480 | 768 | 1200 | 1920;

  onClick?: MouseEventHandler<HTMLImageElement>;
};

export default function ResponsiveImage({
  basePath,
  rawSrc,
  alt,
  sizes = "100vw",
  className,
  loading = "lazy",
  decoding = "async",
  fallbackWidth = 768,
  onClick,
}: Props) {
  if (rawSrc) {
    return (
      <img
        src={rawSrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={className}
        onClick={onClick}           
      />
    );
  }

  // B) <picture> sa varijantama (potrebni fajlovi -480/-768/…)
  if (!basePath) return null;

  const srcset = buildSrcset({ basePath });
  const fallback = `${basePath}-${fallbackWidth}.jpg`;

  return (
    <picture>
      <source type="image/avif" srcSet={srcset.get("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset.get("webp")} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={className}
        onClick={onClick}         
      />
    </picture>
  );
}

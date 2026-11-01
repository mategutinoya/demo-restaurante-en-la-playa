/**
 * next/image custom loader.
 * Unsplash serves through imgix, which resizes, compresses and converts
 * format (AVIF/WebP) at the edge — so we let it do the optimisation and
 * Next generates the responsive srcset.
 */
type LoaderArgs = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width, quality }: LoaderArgs): string {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    return url.toString();
  }
  return src;
}

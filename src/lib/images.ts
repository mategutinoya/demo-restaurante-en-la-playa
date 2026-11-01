/** Build a canonical Unsplash CDN URL from a photo id (the part after "photo-"). */
export function unsplash(id: string): string {
  return `https://images.unsplash.com/photo-${id}`;
}

/** Used if a remote photo ever fails to load, so the layout never shows a broken image. */
export const FALLBACK_IMAGE = unsplash("1507525428034-b723cf961d3e");

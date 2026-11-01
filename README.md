# Azzura — Mediterranean seafront restaurant website

A demo site for a seafront restaurant, beach club and sunset bar, inspired by Amalfi, the Riviera and the Greek islands.
It's built with **Next.js (App Router) · TypeScript · Tailwind CSS v4**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Editing content

All the content you can edit lives in **`src/content/site.ts`**:

| What | Where |
| --- | --- |
| Name, tagline, address, phone, email, Instagram | `site`, `site.contact` |
| Opening hours, season | `site.hours`, `site.season` |
| Google Maps location (address or place name; `""` hides the map) | `site.location.mapQuery` |
| Reservation times, max guests | `site.reservations` |
| Menu categories and dishes (**demo content**, `price` is optional) | `menu` |
| Photography (Unsplash IDs plus alt text) | `photos`, `experiences`, `menu[].image`, `gallery` |

Photos use `unsplash("<id>")`. The ID is the part after `photo-` in an `images.unsplash.com` URL.
To use your own photography, put the files in `public/` and use paths like `/photos/terrace.jpg`.
If a remote photo ever fails to load, it's replaced with a fallback image automatically (`src/components/Photo.tsx`).

## Reservations

The form validates on the client and on the server with the same rules (`src/lib/reservation.ts`).
It posts to `POST /api/reservations` (`src/app/api/reservations/route.ts`):

- If **`RESERVATIONS_WEBHOOK_URL`** is set, each validated request is forwarded as JSON. This works with a booking platform, a CRM, Zapier, Make or n8n, or your own backend. `RESERVATIONS_WEBHOOK_TOKEN` is sent as a Bearer token if it's set.
- If no webhook is set, the site runs in demo mode: the request is accepted and logged on the server.

The form also has a honeypot field to filter out spam bots. See `.env.example`.

## Structure

```
src/
  app/            layout (SEO metadata, fonts), home page, /menu, API route, sitemap, robots
  components/     Header, Hero, About, Experience, MenuShowcase, Location, Gallery, Reservations, Footer
                  plus small building blocks: Photo, Reveal, Button, Logo, SectionIntro
  content/site.ts all editable content
  lib/            image loader (Unsplash CDN resizing), reservation validation
```

## Notes

- Images go through `next/image` with a custom loader. Unsplash's CDN resizes them and serves AVIF/WebP with a responsive `srcset`.
- Fonts (Cormorant Garamond and DM Sans) are self-hosted through `@fontsource`, so nothing is requested from Google Fonts.
- Animations respect `prefers-reduced-motion`.
- For SEO, the site has per-page metadata, Open Graph and Twitter cards, `Restaurant` JSON-LD, `sitemap.xml` and `robots.txt`.
- Set `NEXT_PUBLIC_SITE_URL` to your production domain.

## Quick preview (no install)

`preview/index.html` and `preview/menu.html` are self-contained static versions of the site, with CSS and fonts inlined and small scripts for the interactions.
Open them from any static host. For example:
https://raw.githack.com/mategutinoya/demo-restaurante-en-la-playa/claude/serene-ritchie-6pywhm/preview/index.html

In the preview, the reservation form validates your entries and shows the confirmation, but it doesn't send anything.
Rebuild the preview after changing the content with `npm run build:preview`.

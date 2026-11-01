/**
 * ─────────────────────────────────────────────────────────────
 *  AZZURA — editable site content
 * ─────────────────────────────────────────────────────────────
 *  Everything a restaurant owner needs to change lives here:
 *  contact details, hours, location, menu (DEMO content), and
 *  photography. Components only read from this file.
 *
 *  Menu items are DEMONSTRATION content — replace with the real
 *  dishes. Prices are intentionally omitted (`price` is optional).
 * ─────────────────────────────────────────────────────────────
 */

import { unsplash } from "@/lib/images";

export const site = {
  name: "Azzura",
  tagline: "A taste of the Mediterranean",
  subtitle: "Where the sea meets the art of dining.",
  description:
    "Azzura is a seafront Mediterranean restaurant, beach club and sunset bar — fresh seafood, local produce and long, golden evenings by the water.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://azzura.example.com",
  locale: "en",

  contact: {
    // DEMO — replace with the real details
    addressLines: ["Via del Mare 1", "Seafront Promenade", "Mediterranean Coast"],
    phone: "+00 000 000 0000",
    email: "reservations@azzura.example.com",
    instagram: "azzura.restaurant",
  },

  hours: [
    { label: "Restaurant", value: "12:30 — 15:30 · 19:30 — 23:30" },
    { label: "Beach Club", value: "10:00 — 19:00" },
    { label: "Sunset Bar", value: "17:00 — 01:00" },
  ],
  season: "Open daily, May to October",

  location: {
    /**
     * Google Maps search query or full address.
     * Set to "" to hide the embedded map.
     */
    mapQuery: "Positano, Amalfi Coast, Italy",
    directionsLabel: "Get directions",
  },

  reservations: {
    /** Seating times offered in the reservation form */
    times: [
      "12:30", "13:00", "13:30", "14:00", "14:30",
      "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
    ],
    maxGuests: 12,
    largeGroupNote: "For parties larger than 12 or private events, please write to us directly.",
  },
} as const;

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Menu", href: "/#menu" },
  { label: "Location", href: "/#location" },
  { label: "Gallery", href: "/#gallery" },
] as const;

/* ───────────────────────── Photography ───────────────────────── */

export const photos = {
  hero: {
    src: unsplash("1533105079780-92b9be482077"),
    alt: "Pastel houses cascading down the cliffs to a turquoise Mediterranean bay",
  },
  aboutMain: {
    src: unsplash("1559339352-11d035aa65de"),
    alt: "Candlelit terrace tables set for dinner at dusk",
  },
  aboutDetail: {
    src: unsplash("1414235077428-338989a2e8c0"),
    alt: "An elegant table laid with white linen, glassware and a plated course",
  },
  location: {
    src: unsplash("1507525428034-b723cf961d3e"),
    alt: "Clear turquoise water lapping a quiet sandy shore",
  },
  reservations: {
    src: unsplash("1495616811223-4d98c6e9c869"),
    alt: "Golden hour light over the sea and the beach",
  },
  footer: {
    src: unsplash("1505142468610-359e7d316be0"),
    alt: "",
  },
} as const;

export const experiences = [
  {
    id: "restaurant",
    index: "I",
    title: "Restaurant",
    kicker: "Lunch & dinner",
    description:
      "Mediterranean cooking shaped by the morning catch, the market and the seasons. Simple, generous, precise — served on white linen a few steps from the water.",
    image: {
      src: unsplash("1517248135467-4c7edcad34c4"),
      alt: "The restaurant dining room with warm light and set tables",
    },
  },
  {
    id: "beach-club",
    index: "II",
    title: "Beach Club",
    kicker: "Sun, sea & stillness",
    description:
      "Sunbeds and canvas parasols facing the bay, attentive service from the first swim to the last light, and lunch delivered to your lounger.",
    image: {
      src: unsplash("1540541338287-41700207dee6"),
      alt: "Sun loungers lined up by the water under a clear sky",
    },
  },
  {
    id: "sunset-bar",
    index: "III",
    title: "Sunset Bar",
    kicker: "Cocktails & music",
    description:
      "Spritz, chilled whites and signature cocktails as the sky turns gold. Low music, salt in the air, and the slow ritual of the Mediterranean evening.",
    image: {
      src: unsplash("1514362545857-3bc16c4c7d1b"),
      alt: "Cocktails being prepared at the bar",
    },
  },
] as const;

/* ───────────────────────── Menu (DEMO) ───────────────────────── */

export type MenuItem = {
  name: string;
  description: string;
  /** Leave undefined until real prices are confirmed */
  price?: string;
  tags?: string[];
};

export type MenuCategory = {
  id: string;
  title: string;
  intro: string;
  image: { src: string; alt: string };
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "starters",
    title: "Starters",
    intro: "To share, with bread, olive oil and something cold to drink.",
    image: {
      src: unsplash("1572695157366-5e585ab2b69f"),
      alt: "Toasted bread topped with tomatoes, basil and olive oil",
    },
    items: [
      { name: "Sample starter — Bruschetta", description: "Grilled bread, ripe tomatoes, basil, extra virgin olive oil." },
      { name: "Sample starter — Burrata", description: "Creamy burrata, heirloom tomatoes, sea salt, basil oil.", tags: ["V"] },
      { name: "Sample starter — Crudo", description: "Thinly sliced raw fish, citrus, fennel, pink pepper." },
    ],
  },
  {
    id: "seafood",
    title: "Fresh Seafood",
    intro: "Whatever the boats bring in, cooked simply over fire or served raw.",
    image: {
      src: unsplash("1467003909585-2f8a72700288"),
      alt: "A plated fillet of fish with fresh garnish",
    },
    items: [
      { name: "Sample dish — Catch of the day", description: "Whole fish, grilled or baked in salt, lemon and herbs." },
      { name: "Sample dish — Grilled octopus", description: "Charred octopus, potatoes, capers, smoked paprika." },
      { name: "Sample dish — Seafood platter", description: "A seasonal selection of shellfish and crudo, to share." },
    ],
  },
  {
    id: "specialties",
    title: "Mediterranean Specialties",
    intro: "Recipes from Italian, Greek and Provençal kitchens, made our way.",
    image: {
      src: unsplash("1534080564583-6be75777b70a"),
      alt: "A pan of saffron rice with prawns and mussels",
    },
    items: [
      { name: "Sample dish — Seafood rice", description: "Saffron rice, prawns, mussels, squid, slow-cooked fish stock." },
      { name: "Sample dish — Sea bass in cartoccio", description: "Baked in parchment with olives, tomatoes and thyme." },
      { name: "Sample dish — Lamb, Greek style", description: "Slow-roasted lamb, lemon potatoes, oregano.", },
    ],
  },
  {
    id: "pasta",
    title: "Pasta & Risotto",
    intro: "Fresh pasta made each morning; risotto finished at the pass.",
    image: {
      src: unsplash("1621996346565-e3dbc646d9a9"),
      alt: "A bowl of fresh pasta with a glossy sauce",
    },
    items: [
      { name: "Sample dish — Linguine alle vongole", description: "Clams, garlic, white wine, parsley, chilli." },
      { name: "Sample dish — Lemon risotto", description: "Amalfi lemon, butter, aged parmesan.", tags: ["V"] },
      { name: "Sample dish — Paccheri with red prawns", description: "Cherry tomatoes, prawn bisque, basil." },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    intro: "Light, fresh and made in house — the right ending to a long lunch.",
    image: {
      src: unsplash("1488477181946-6428a0291777"),
      alt: "A dessert of cream and fresh berries",
    },
    items: [
      { name: "Sample dessert — Lemon tart", description: "Citrus curd, toasted meringue, shortcrust pastry.", tags: ["V"] },
      { name: "Sample dessert — Tiramisù", description: "Espresso, mascarpone, cocoa.", tags: ["V"] },
      { name: "Sample dessert — Summer fruit", description: "Seasonal fruit, sorbet, mint." },
    ],
  },
  {
    id: "drinks",
    title: "Cocktails & Wine",
    intro: "Coastal wines by the glass and bottle, and cocktails for the golden hour.",
    image: {
      src: unsplash("1510812431401-41d2bd2722f3"),
      alt: "Glasses of wine being poured",
    },
    items: [
      { name: "Sample cocktail — Azzura Spritz", description: "Bitter orange aperitivo, prosecco, soda, olive." },
      { name: "Sample cocktail — Riviera Negroni", description: "Gin, vermouth, bitter, a twist of lemon." },
      { name: "Sample wine — Coastal whites", description: "A curated list from Campania, the Cyclades and Provence." },
    ],
  },
];

/* ───────────────────────── Gallery ───────────────────────── */

export type GalleryImage = { src: string; alt: string; layout: "tall" | "wide" | "square" };

export const gallery: GalleryImage[] = [
  // Layout rhythm per 4-row block: tall, square, square, wide · wide, tall, square, square
  { src: unsplash("1612698093158-e07ac200d44e"), alt: "Colourful houses stacked above a beach on the Italian coast", layout: "tall" },
  { src: unsplash("1519708227418-c8fd9a32b7a2"), alt: "Grilled fish fillet with lemon", layout: "square" },
  { src: unsplash("1570077188670-e3a8d69ac5ff"), alt: "Whitewashed houses on a Greek island above the sea", layout: "square" },
  { src: unsplash("1520250497591-112f2f40a3f4"), alt: "Rows of sunbeds beside the water", layout: "wide" },
  { src: unsplash("1516483638261-f4dbaf036963"), alt: "A cliffside village of colourful houses over the sea", layout: "wide" },
  { src: unsplash("1613395877344-13d4a8e0d49e"), alt: "Blue domes and white walls at sunset", layout: "tall" },
  { src: unsplash("1551538827-9c037cb4f32a"), alt: "A fresh mint and lime cocktail", layout: "square" },
  { src: unsplash("1476124369491-e7addf5db371"), alt: "Creamy herb risotto", layout: "square" },
];

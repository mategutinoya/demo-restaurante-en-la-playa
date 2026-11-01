/**
 * Reservation schema + validation shared by the form (client)
 * and the API route (server), so both apply exactly the same rules.
 */
import { site } from "@/content/site";

export type ReservationInput = {
  name: string;
  email: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests: string;
  comments: string;
};

export type ReservationErrors = Partial<Record<keyof ReservationInput, string>>;

export const emptyReservation: ReservationInput = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  comments: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s().-]{7,20}$/;

/** Today's date as YYYY-MM-DD in the visitor's local time */
export function todayISO(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function validateReservation(input: ReservationInput, today = todayISO()): ReservationErrors {
  const e: ReservationErrors = {};
  const name = input.name.trim();
  if (name.length < 2) e.name = "Please tell us your name.";
  else if (name.length > 80) e.name = "Please use 80 characters or fewer.";

  if (!EMAIL.test(input.email.trim())) e.email = "Please enter a valid email address.";

  const digits = input.phone.replace(/\D/g, "");
  if (!PHONE.test(input.phone.trim()) || digits.length < 7) e.phone = "Please enter a valid phone number, including country code.";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) e.date = "Please choose a date.";
  else if (input.date < today) e.date = "Please choose today or a future date.";

  if (!(site.reservations.times as readonly string[]).includes(input.time)) e.time = "Please choose a time.";

  const guests = Number(input.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > site.reservations.maxGuests) {
    e.guests = `Choose between 1 and ${site.reservations.maxGuests} guests.`;
  }

  if (input.comments.length > 600) e.comments = "Please keep comments under 600 characters.";
  return e;
}

export function sanitizeReservation(raw: unknown): ReservationInput {
  const r = (raw ?? {}) as Record<string, unknown>;
  const str = (k: keyof ReservationInput) => (typeof r[k] === "string" ? (r[k] as string) : typeof r[k] === "number" ? String(r[k]) : "");
  return {
    name: str("name").trim(),
    email: str("email").trim(),
    phone: str("phone").trim(),
    date: str("date"),
    time: str("time"),
    guests: str("guests"),
    comments: str("comments").trim(),
  };
}

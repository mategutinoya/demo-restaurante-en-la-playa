"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { photos, site } from "@/content/site";
import {
  emptyReservation,
  todayISO,
  validateReservation,
  type ReservationErrors,
  type ReservationInput,
} from "@/lib/reservation";
import Button from "./Button";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "success"; reference: string } | { kind: "error"; message: string };

const inputCls =
  "peer w-full appearance-none rounded-none border-0 border-b border-deep/25 bg-transparent px-0 pb-3 pt-2 text-base font-light text-deep placeholder:text-deep/35 transition-colors duration-300 focus:border-deep focus:outline-none focus:ring-0 aria-[invalid=true]:border-[#9a4a3a]";

function Field({ id, label, error, children, className = "" }: { id: string; label: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow block !text-[0.62rem] text-deep/60">
        {label}
      </label>
      {children}
      <p id={`${id}-error`} role={error ? "alert" : undefined} className={`mt-2 min-h-[1.1rem] text-xs text-[#9a4a3a] transition-opacity ${error ? "opacity-100" : "opacity-0"}`}>
        {error}
      </p>
    </div>
  );
}

export default function Reservations() {
  const [values, setValues] = useState<ReservationInput>(emptyReservation);
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ReservationInput, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [minDate, setMinDate] = useState("");

  useEffect(() => setMinDate(todayISO()), []);

  const update = (key: keyof ReservationInput) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (touched[key]) setErrors(validateReservation(next));
  };
  const blur = (key: keyof ReservationInput) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateReservation(values));
  };

  const shown = (key: keyof ReservationInput) => (touched[key] ? errors[key] : undefined);
  const a11y = (key: keyof ReservationInput) => ({
    id: `res-${key}`,
    name: key,
    "aria-invalid": Boolean(shown(key)),
    "aria-describedby": `res-${key}-error`,
    onBlur: blur(key),
    onChange: update(key),
    value: values[key],
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const honeypot = (e.currentTarget.elements.namedItem("company") as HTMLInputElement | null)?.value;
    const found = validateReservation(values);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, date: true, time: true, guests: true, comments: true });
    if (Object.keys(found).length) {
      document.getElementById(`res-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus({ kind: "success", reference: data.reference });
        setValues(emptyReservation);
        setTouched({});
      } else if (data.errors) {
        setErrors(data.errors);
        setStatus({ kind: "error", message: "Please review the highlighted fields." });
      } else {
        setStatus({ kind: "error", message: data.message ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Please check your connection and try again." });
    }
  }

  return (
    <section id="reservations" className="relative bg-linen">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-[60svh] min-h-[420px] overflow-hidden lg:sticky lg:top-0 lg:h-[100svh]">
          <Photo src={photos.reservations.src} alt={photos.reservations.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-ivory md:p-14">
            <p className="font-serif text-3xl italic leading-snug md:text-4xl">
              “The best table is the one
              <br /> where the sun goes down.”
            </p>
          </div>
        </div>

        <div className="px-5 py-24 md:px-14 md:py-32 xl:px-24">
          <SectionIntro
            number="06"
            eyebrow="Reservations"
            title={
              <>
                Reserve <em className="italic text-sea">your table</em>
              </>
            }
          />
          <Reveal delay={150}>
            <p className="prose-body mt-8 max-w-md text-deep/75">
              Send us your request and our team will confirm by email within a few hours. {site.reservations.largeGroupNote}
            </p>
          </Reveal>

          {status.kind === "success" ? (
            <div role="status" className="mt-14 animate-fade-up border-t border-deep/15 pt-12">
              <p className="eyebrow text-olive">Request received</p>
              <p className="display mt-4 text-4xl md:text-5xl">Grazie. We&rsquo;ll be in touch shortly.</p>
              <p className="prose-body mt-6 text-deep/75">
                Your reference is <strong className="font-medium">{status.reference}</strong>. A confirmation will be
                sent to your email once the table is secured.
              </p>
              <div className="mt-10">
                <Button variant="outline" onClick={() => setStatus({ kind: "idle" })}>Make another request</Button>
              </div>
            </div>
          ) : (
            <Reveal delay={220}>
              <form noValidate onSubmit={onSubmit} className="mt-14 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2" aria-describedby="res-status">
                <Field id="res-name" label="Name" error={shown("name")} className="sm:col-span-2">
                  <input {...a11y("name")} type="text" autoComplete="name" placeholder="Your full name" className={inputCls} />
                </Field>
                <Field id="res-email" label="Email" error={shown("email")}>
                  <input {...a11y("email")} type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" className={inputCls} />
                </Field>
                <Field id="res-phone" label="Phone" error={shown("phone")}>
                  <input {...a11y("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="+39 000 000 0000" className={inputCls} />
                </Field>
                <Field id="res-date" label="Date" error={shown("date")}>
                  <input {...a11y("date")} type="date" min={minDate || undefined} className={inputCls} />
                </Field>
                <Field id="res-time" label="Time" error={shown("time")}>
                  <select {...a11y("time")} className={`${inputCls} cursor-pointer`}>
                    <option value="" disabled>Select a time</option>
                    <optgroup label="Lunch">
                      {site.reservations.times.filter((t) => t < "17:00").map((t) => <option key={t}>{t}</option>)}
                    </optgroup>
                    <optgroup label="Dinner">
                      {site.reservations.times.filter((t) => t >= "17:00").map((t) => <option key={t}>{t}</option>)}
                    </optgroup>
                  </select>
                </Field>
                <Field id="res-guests" label="Guests" error={shown("guests")} className="sm:col-span-2">
                  <select {...a11y("guests")} className={`${inputCls} cursor-pointer`}>
                    {Array.from({ length: site.reservations.maxGuests }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={String(n)}>
                        {n} {n === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id="res-comments" label="Special requests" error={shown("comments")} className="sm:col-span-2">
                  <textarea {...a11y("comments")} rows={3} maxLength={600} placeholder="Allergies, celebrations, a table by the water…" className={`${inputCls} resize-none`} />
                </Field>

                {/* Honeypot */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Company
                    <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="mt-4 flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" variant="solid" disabled={status.kind === "sending"} className="w-full sm:w-auto">
                    {status.kind === "sending" ? "Sending…" : "Request reservation"}
                  </Button>
                  <p className="text-xs font-light text-deep/55">
                    Prefer to call? <a className="link-draw text-deep" href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>{site.contact.phone}</a>
                  </p>
                </div>
                <p id="res-status" role="status" aria-live="polite" className="text-sm text-[#9a4a3a] sm:col-span-2">
                  {status.kind === "error" ? status.message : ""}
                </p>
              </form>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

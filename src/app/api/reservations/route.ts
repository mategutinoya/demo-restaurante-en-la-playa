import { NextResponse } from "next/server";
import { sanitizeReservation, validateReservation } from "@/lib/reservation";

/**
 * POST /api/reservations
 *
 * Integration point for a real booking system.
 * - If RESERVATIONS_WEBHOOK_URL is set, the validated request is forwarded
 *   there as JSON (works with booking platforms, CRMs, Zapier/Make/n8n,
 *   or your own backend). RESERVATIONS_WEBHOOK_TOKEN is sent as a Bearer token.
 * - Otherwise the request is accepted in demo mode and logged on the server.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  // Honeypot field — bots fill it, humans never see it.
  if (body && typeof body === "object" && (body as Record<string, unknown>).company) {
    return NextResponse.json({ ok: true, reference: "AZ-000000" });
  }

  const data = sanitizeReservation(body);
  // Allow "today" in any timezone by comparing against yesterday (UTC) on the server.
  const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  const errors = validateReservation(data, yesterday);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const reference = `AZ-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  const payload = { ...data, guests: Number(data.guests), reference, source: "website", createdAt: new Date().toISOString() };

  const webhook = process.env.RESERVATIONS_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.RESERVATIONS_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.RESERVATIONS_WEBHOOK_TOKEN}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[reservations] forwarding failed:", err);
      return NextResponse.json(
        { ok: false, message: "We couldn't send your request just now. Please try again or call us." },
        { status: 502 },
      );
    }
  } else {
    console.info("[reservations] demo mode — request received:", payload);
  }

  return NextResponse.json({ ok: true, reference });
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import Logo from "./Logo";

/**
 * Transparent over the hero, turns into a light ivory bar after scrolling.
 * On pages without a hero (e.g. /menu) pass `solid`.
 */
export default function Header({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const light = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color,padding] duration-700 ease-[var(--ease-soft)] ${
        scrolled && !open ? "bg-ivory/92 py-3 shadow-[0_1px_0_rgba(23,59,74,0.08)] backdrop-blur-md" : "bg-transparent py-6"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-ivory focus:px-4 focus:py-2 focus:text-deep">
        Skip to content
      </a>
      <div className="container-x relative z-10 grid grid-cols-[1fr_auto_1fr] items-center">
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className={`flex items-center gap-8 ${light ? "text-ivory" : "text-deep"}`}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="eyebrow link-draw pb-1 !text-[0.65rem]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={`flex h-11 w-11 items-center justify-start lg:hidden ${light ? "text-ivory" : "text-deep"}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-7">
            <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`absolute bottom-0 left-0 h-px bg-current transition-all duration-500 ${open ? "w-full -translate-y-[5px] -rotate-45" : "w-4"}`} />
          </span>
        </button>

        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className={`justify-self-center transition-[opacity,transform] duration-700 ease-[var(--ease-soft)] ${
            light && !solid ? "pointer-events-none translate-y-1 opacity-0" : "opacity-100"
          }`}
          tabIndex={light ? -1 : undefined}
          onClick={() => setOpen(false)}
        >
          <Logo tone={light ? "light" : "dark"} />
        </Link>

        <div className="flex justify-end">
          <Link
            href="/#reservations"
            className={`eyebrow !text-[0.65rem] inline-flex min-h-11 items-center border px-4 transition-colors duration-500 px-3 sm:px-6 ${
              light ? "border-ivory/60 text-ivory hover:bg-ivory hover:text-deep" : "border-deep/30 text-deep hover:bg-deep hover:text-ivory"
            }`}
          >
            <span className="hidden sm:inline">Reserve a table</span>
            <span className="sm:hidden">Reserve</span>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-ivory transition-[opacity,visibility] duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <nav aria-label="Mobile" className="flex h-full flex-col justify-between px-6 pb-10 pt-32">
          <ul className="space-y-2">
            {[...nav, { label: "Full menu", href: "/menu" }, { label: "Reservations", href: "/#reservations" }].map((item, i) => (
              <li
                key={item.href}
                className={`transition-[opacity,transform] duration-700 ease-[var(--ease-soft)] ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
              >
                <Link href={item.href} onClick={() => setOpen(false)} className="display flex items-baseline gap-4 py-1 text-[2.6rem] text-deep">
                  <span className="font-sans text-xs tracking-widest text-sea">0{i + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-1 text-sm font-light text-deep/80">
            <a className="block" href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>{site.contact.phone}</a>
            <a className="block" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

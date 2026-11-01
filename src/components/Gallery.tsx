"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gallery, site } from "@/content/site";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";

const spans = {
  tall: "col-span-1 row-span-2 md:col-span-4 md:row-span-2",
  square: "col-span-1 row-span-1 md:col-span-4 md:row-span-1",
  wide: "col-span-2 row-span-1 md:col-span-8 md:row-span-1",
} as const;

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (dir: number) => setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (index === null) return;
    document.documentElement.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  const open = index !== null;
  const current = open ? gallery[index] : null;

  return (
    <section id="gallery" className="py-28 md:py-40">
      <div className="container-x">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <SectionIntro
            className="lg:col-span-7"
            number="05"
            eyebrow="Gallery"
            title={
              <>
                Moments <em className="italic text-sea">from the coast</em>
              </>
            }
          />
          <Reveal delay={200} className="lg:col-span-4 lg:col-start-9">
            <p className="prose-body text-deep/75">
              Salt, light and long tables. Share yours with us{" "}
              <a
                href={`https://instagram.com/${site.contact.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw text-sea"
              >
                @{site.contact.instagram}
              </a>
              .
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid auto-rows-[44vw] grid-flow-dense grid-cols-2 gap-3 md:mt-24 md:auto-rows-[19vw] md:grid-cols-12 md:gap-5 2xl:auto-rows-[17rem]">
          {gallery.map((img, i) => (
            <Reveal as="li" key={img.src} variant="image" delay={(i % 3) * 110} className={`relative overflow-hidden ${spans[img.layout]}`}>
              <button
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setIndex(i);
                }}
                className="group absolute inset-0 block h-full w-full cursor-zoom-in"
                aria-label={`Open photo: ${img.alt}`}
              >
                <Photo
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={img.layout === "wide" ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 30vw, 50vw"}
                  className="object-cover transition-transform duration-[1800ms] ease-[var(--ease-soft)] group-hover:scale-[1.05]"
                />
                <span aria-hidden className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/15" />
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Photo gallery"
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 transition-[opacity,visibility] duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={(e) => e.target === e.currentTarget && close()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current && (
          <figure key={current.src} className="relative h-[78svh] w-[92vw] max-w-6xl animate-fade-up">
            <Photo src={current.src} alt={current.alt} fill sizes="92vw" quality={85} className="object-contain" />
            <figcaption className="absolute -bottom-10 left-0 right-0 flex justify-between text-xs font-light text-ivory/70">
              <span>{current.alt}</span>
              <span className="tabular-nums">
                {String((index ?? 0) + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        )}
        <button
          ref={closeBtn}
          type="button"
          onClick={close}
          tabIndex={open ? 0 : -1}
          className="eyebrow absolute right-4 top-4 min-h-11 px-4 text-ivory/80 transition-colors hover:text-ivory md:right-8 md:top-8"
        >
          Close ✕
        </button>
        <button
          type="button"
          onClick={() => step(-1)}
          tabIndex={open ? 0 : -1}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center text-3xl font-light text-ivory/70 transition-colors hover:text-ivory md:left-6"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          tabIndex={open ? 0 : -1}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center text-3xl font-light text-ivory/70 transition-colors hover:text-ivory md:right-6"
        >
          ›
        </button>
      </div>
    </section>
  );
}

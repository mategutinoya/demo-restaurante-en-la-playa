"use client";

import { useState } from "react";
import { menu } from "@/content/site";
import Button from "./Button";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";

/**
 * Editorial menu preview: a numbered list of categories on one side,
 * a large photograph and three sample dishes for the active category.
 */
export default function MenuShowcase() {
  const [active, setActive] = useState(0);
  const category = menu[active];

  return (
    <section id="menu" className="py-28 md:py-40">
      <div className="container-x">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <SectionIntro
            className="lg:col-span-7"
            number="03"
            eyebrow="Our menu"
            title={
              <>
                The sea, the garden <em className="italic text-sea">&amp; the fire</em>
              </>
            }
          />
          <Reveal delay={200} className="lg:col-span-4 lg:col-start-9">
            <p className="prose-body text-deep/75">
              A menu that changes with the catch and the season. What follows is a taste — the full list is
              written fresh every day.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Category list */}
          <Reveal className="lg:col-span-5">
            <div role="tablist" aria-label="Menu categories" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0">
              {menu.map((c, i) => {
                const selected = i === active;
                return (
                  <button
                    key={c.id}
                    role="tab"
                    id={`tab-${c.id}`}
                    aria-selected={selected}
                    aria-controls="menu-panel"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`group flex shrink-0 items-baseline gap-5 border text-left transition-colors duration-500 lg:border-0 lg:border-b lg:border-deep/15 lg:py-5 ${
                      selected ? "border-deep bg-deep text-ivory lg:bg-transparent lg:text-deep" : "border-deep/20 text-deep/55 hover:text-deep"
                    } px-5 py-3 lg:px-0`}
                  >
                    <span className="hidden font-serif text-base italic text-sea lg:inline">0{i + 1}</span>
                    <span className={`whitespace-nowrap font-sans text-xs uppercase tracking-[0.2em] lg:font-serif lg:text-[2.6rem] lg:normal-case lg:tracking-normal lg:font-light lg:leading-tight transition-transform duration-500 ease-[var(--ease-soft)] ${selected ? "lg:translate-x-3" : ""}`}>
                      {c.title}
                    </span>
                    <span aria-hidden className={`ml-auto hidden h-px self-center bg-deep transition-all duration-700 ease-[var(--ease-soft)] lg:block ${selected ? "w-16" : "w-0"}`} />
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Active category */}
          <div
            role="tabpanel"
            id="menu-panel"
            aria-labelledby={`tab-${category.id}`}
            className="lg:col-span-6 lg:col-start-7"
          >
            <Reveal variant="image" className="relative aspect-[4/5] overflow-hidden bg-linen sm:aspect-[5/4] lg:aspect-[4/3]">
              {menu.map((c, i) => (
                <div
                  key={c.id}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 transition-[opacity,transform] duration-[1100ms] ease-[var(--ease-soft)] ${
                    i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                  }`}
                >
                  <Photo src={c.image.src} alt={i === active ? c.image.alt : ""} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </div>
              ))}
            </Reveal>

            <div key={category.id} className="mt-10 animate-fade-up">
              <p className="font-serif text-xl italic text-deep/70">{category.intro}</p>
              <ul className="mt-8 divide-y divide-deep/10 border-y border-deep/10">
                {category.items.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-6 py-5">
                    <div>
                      <h4 className="font-serif text-2xl">{item.name}</h4>
                      <p className="mt-1 text-sm font-light leading-relaxed text-deep/70">{item.description}</p>
                    </div>
                    {item.price ? (
                      <span className="shrink-0 font-serif text-xl">{item.price}</span>
                    ) : (
                      item.tags?.length ? <span className="shrink-0 eyebrow text-olive">{item.tags.join(" · ")}</span> : null
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Reveal className="mt-20 flex flex-col items-center gap-5 text-center">
          <Button href="/menu" variant="outline">View the full menu</Button>
          <p className="text-xs font-light text-deep/50">Sample dishes for demonstration — the menu is fully editable.</p>
        </Reveal>
      </div>
    </section>
  );
}

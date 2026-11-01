import type { Metadata } from "next";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { menu, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Menu",
  description: `The menu at ${site.name}: fresh seafood, Mediterranean specialties, pasta & risotto, desserts, cocktails and coastal wines.`,
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <Header solid />
      <main id="main" tabIndex={-1} className="outline-none pt-32 md:pt-44">
        <div className="container-x">
          <Reveal className="text-center">
            <p className="eyebrow text-sea">The menu</p>
            <h1 className="display mt-6 text-6xl md:text-8xl">
              À la carte <em className="block italic text-sea">by the sea</em>
            </h1>
            <p className="prose-body mx-auto mt-8 max-w-lg text-deep/75">
              Our menu follows the catch and the season and changes daily. Please let us know about any allergies or
              dietary requirements.
            </p>
            <p className="mt-4 text-xs font-light text-deep/50">Demonstration content — dishes and prices to be confirmed.</p>
          </Reveal>

          <nav aria-label="Menu sections" className="no-scrollbar -mx-5 mt-16 flex gap-2 overflow-x-auto px-5 md:mx-0 md:justify-center md:px-0">
            {menu.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="eyebrow shrink-0 border border-deep/20 px-5 py-3 !text-[0.62rem] text-deep/70 transition-colors hover:border-deep hover:text-deep">
                {c.title}
              </a>
            ))}
          </nav>

          <div className="mt-24 space-y-28 md:space-y-40">
            {menu.map((c, i) => (
              <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8">
                <Reveal variant="image" className={`relative aspect-[4/5] overflow-hidden lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <Photo src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                </Reveal>
                <div className={`lg:col-span-6 lg:pt-10 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                  <Reveal>
                    <span className="font-serif text-lg italic text-sea">0{i + 1}</span>
                    <h2 id={`${c.id}-title`} className="display mt-2 text-5xl md:text-6xl">{c.title}</h2>
                    <p className="mt-4 font-serif text-xl italic text-deep/70">{c.intro}</p>
                  </Reveal>
                  <ul className="mt-10 border-t border-deep/15">
                    {c.items.map((item, j) => (
                      <Reveal as="li" key={item.name} delay={j * 80} className="flex items-baseline justify-between gap-6 border-b border-deep/10 py-6">
                        <div>
                          <h3 className="font-serif text-2xl">{item.name}</h3>
                          <p className="mt-1 text-sm font-light leading-relaxed text-deep/70">{item.description}</p>
                        </div>
                        <span className="shrink-0 text-right">
                          {item.price && <span className="block font-serif text-xl">{item.price}</span>}
                          {item.tags?.length ? <span className="eyebrow text-olive">{item.tags.join(" · ")}</span> : null}
                        </span>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>

          <Reveal className="my-32 flex flex-col items-center gap-6 text-center">
            <p className="display text-4xl md:text-5xl">Ready to join us?</p>
            <Button href="/#reservations">Reserve a table</Button>
            <p className="text-xs font-light text-deep/50">V — vegetarian</p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}

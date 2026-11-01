import { photos, site } from "@/content/site";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";

export default function Location() {
  const { mapQuery } = site.location;
  const mapSrc = mapQuery ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=14&output=embed` : null;
  const directions = mapQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}` : null;

  return (
    <section id="location" className="bg-deep text-ivory">
      {/* Panoramic photograph */}
      <div className="relative h-[78svh] min-h-[520px] overflow-hidden">
        <Photo src={photos.location.src} alt={photos.location.alt} fill sizes="100vw" quality={80} className="object-cover object-center" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-deep via-deep/20 to-transparent" />
        <div className="container-x relative flex h-full items-end pb-16 md:pb-24">
          <SectionIntro
            tone="light"
            number="04"
            eyebrow="The location"
            className="max-w-3xl"
            title={
              <>
                Barefoot on the sand, <em className="italic">a table above the water</em>
              </>
            }
          />
        </div>
      </div>

      <div className="container-x grid grid-cols-1 gap-16 py-24 md:py-32 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="prose-body max-w-md text-ivory/80">
              Set on a quiet stretch of coastline, Azzura looks straight out to the open sea. Swim from the
              beach in the morning, lunch in the shade of the pergola, and stay as the sun drops into the water —
              the terrace faces west for exactly that reason.
            </p>
          </Reveal>

          <dl className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
            <Reveal delay={100}>
              <dt className="eyebrow text-sand">Address</dt>
              <dd className="mt-4 font-serif text-2xl leading-snug">
                {site.contact.addressLines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </dd>
            </Reveal>
            <Reveal delay={180}>
              <dt className="eyebrow text-sand">Opening hours</dt>
              <dd className="mt-4 space-y-3 text-sm font-light">
                {site.hours.map((h) => (
                  <span key={h.label} className="block">
                    <span className="block font-serif text-lg">{h.label}</span>
                    <span className="text-ivory/70">{h.value}</span>
                  </span>
                ))}
                <span className="block pt-1 text-ivory/50">{site.season}</span>
              </dd>
            </Reveal>
          </dl>

          {directions && (
            <Reveal delay={240} className="mt-12">
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow link-draw inline-flex items-center gap-3 pb-1 text-ivory"
              >
                {site.location.directionsLabel}
                <span aria-hidden>↗</span>
              </a>
            </Reveal>
          )}
        </div>

        <Reveal variant="image" className="relative min-h-[380px] overflow-hidden lg:col-span-6 lg:col-start-7">
          {mapSrc ? (
            <iframe
              title={`Map showing the location of ${site.name}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.85] contrast-[0.95] sepia-[0.15] transition-[filter] duration-700 hover:grayscale-0"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-ivory/5 p-10 text-center text-ivory/60">
              <p className="font-serif text-xl italic">Map coming soon</p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

import { photos, site } from "@/content/site";
import Button from "./Button";
import Photo from "./Photo";

export default function Hero() {
  return (
    <section aria-label="Welcome" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-deep text-ivory">
      <div className="absolute inset-0 animate-hero-zoom">
        <Photo
          src={photos.hero.src}
          alt={photos.hero.alt}
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover object-[50%_60%]"
        />
      </div>
      {/* Subtle veil for legibility: darker at top (nav) and bottom (copy) */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/15 to-ink/55" />
      <div aria-hidden className="absolute inset-0 bg-ink/10" />

      <div className="container-x relative flex h-full flex-col items-center justify-center pt-16 text-center">
        <p className="eyebrow animate-fade-up text-ivory/85 [animation-delay:200ms]">
          Restaurant · Beach Club · Sunset Bar
        </p>
        <h1 className="mt-6 animate-fade-up [animation-delay:350ms]">
          <span className="block font-serif text-[3.6rem] font-light uppercase leading-none tracking-[0.22em] pl-[0.22em] sm:text-8xl lg:text-[9rem]">
            {site.name}
          </span>
          <span className="display mt-5 block text-[2rem] italic sm:text-5xl lg:text-6xl">{site.tagline}</span>
        </h1>
        <p className="mt-6 max-w-md animate-fade-up text-base font-light tracking-wide text-ivory/85 [animation-delay:550ms] sm:text-lg">
          {site.subtitle}
        </p>
        <div className="mt-11 flex w-full max-w-xs animate-fade-up flex-col gap-3 [animation-delay:750ms] sm:max-w-none sm:w-auto sm:flex-row sm:gap-4">
          <Button href="#about" variant="light">Discover our experience</Button>
          <Button href="#reservations" variant="ghost-light">Reserve a table</Button>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to discover"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory/80 transition-colors hover:text-ivory md:flex"
      >
        <span className="eyebrow !text-[0.6rem]">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-ivory/30">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-line_2.4s_var(--ease-soft)_infinite] bg-ivory" />
        </span>
      </a>
    </section>
  );
}

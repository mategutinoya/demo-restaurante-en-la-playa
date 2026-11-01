import { photos } from "@/content/site";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";

const pillars = [
  {
    title: "From the sea",
    text: "Fish and shellfish bought each morning from the boats that land a few hundred metres from our terrace.",
  },
  {
    title: "From the land",
    text: "Lemons, tomatoes, herbs and olive oil from growers along the coast — chosen by season, never by habit.",
  },
  {
    title: "At the table",
    text: "Unhurried service, white linen and a view that changes every hour. Lunch can become sunset here.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-28 md:py-40">
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:pt-16">
          <SectionIntro
            number="01"
            eyebrow="About us"
            title={
              <>
                More than a restaurant.{" "}
                <em className="italic text-sea">A Mediterranean experience.</em>
              </>
            }
          />
          <Reveal delay={200}>
            <p className="prose-body mt-10 max-w-md text-deep/80">
              Azzura sits where the sand ends and the sea begins. Inspired by the long lunches of Amalfi, the
              whitewashed tavernas of the Cyclades and the easy glamour of the Riviera, it is a place to slow
              down — to taste, to talk, and to watch the light move across the water.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <p className="prose-body mt-6 max-w-md text-deep/80">
              Our kitchen keeps things honest: exceptional produce, cooked with restraint, served generously.
            </p>
          </Reveal>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7">
          <Reveal variant="image" className="relative aspect-[4/5] w-full overflow-hidden">
            <Photo
              src={photos.aboutMain.src}
              alt={photos.aboutMain.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-[2000ms] ease-[var(--ease-soft)] hover:scale-[1.03]"
            />
          </Reveal>
          <Reveal
            variant="image"
            delay={250}
            className="relative -mt-24 ml-auto w-[58%] overflow-hidden border-[10px] border-ivory sm:w-[46%] lg:absolute lg:-bottom-24 lg:-left-20 lg:mt-0 lg:w-[44%] lg:border-[14px]"
          >
            <div className="relative aspect-[4/5]">
              <Photo src={photos.aboutDetail.src} alt={photos.aboutDetail.alt} fill sizes="(min-width: 1024px) 24vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="container-x mt-28 lg:mt-48">
        <ol className="grid grid-cols-1 gap-12 border-t border-deep/15 pt-12 md:grid-cols-3 md:gap-10">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 120}>
              <span className="font-serif text-lg italic text-sea">0{i + 1}</span>
              <h3 className="display mt-3 text-3xl md:text-4xl">{p.title}</h3>
              <p className="prose-body mt-4 max-w-xs text-deep/75">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

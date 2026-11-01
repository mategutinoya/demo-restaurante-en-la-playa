import { experiences } from "@/content/site";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";

const offsets = ["md:mt-0", "md:mt-32", "md:mt-12"];
const ratios = ["aspect-[3/4]", "aspect-[3/4] md:aspect-[4/5]", "aspect-[3/4]"];

export default function Experience() {
  return (
    <section id="experience" className="bg-linen py-28 md:py-40">
      <div className="container-x">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <SectionIntro
            className="lg:col-span-7"
            number="02"
            eyebrow="Our experience"
            title={
              <>
                Three ways to <em className="italic text-sea">spend the day</em> by the sea
              </>
            }
          />
          <Reveal delay={200} className="lg:col-span-4 lg:col-start-9">
            <p className="prose-body text-deep/75">
              Arrive for a swim and stay for dinner. From the first coffee on the sunbeds to the last glass at the
              bar, every hour at Azzura has its own rhythm.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-16 md:mt-28 md:grid-cols-3 md:gap-8 lg:gap-12">
          {experiences.map((exp, i) => (
            <article key={exp.id} id={exp.id} className={`group ${offsets[i]}`}>
              <Reveal variant="image" delay={i * 140} className={`relative overflow-hidden ${ratios[i]}`}>
                <Photo
                  src={exp.image.src}
                  alt={exp.image.alt}
                  fill
                  sizes="(min-width: 768px) 32vw, 100vw"
                  className="object-cover transition-transform duration-[1800ms] ease-[var(--ease-soft)] group-hover:scale-[1.06]"
                />
                <div aria-hidden className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/10" />
                <span className="absolute left-5 top-5 font-serif text-lg italic text-ivory drop-shadow-sm">{exp.index}</span>
              </Reveal>
              <Reveal delay={i * 140 + 120} className="mt-8">
                <p className="eyebrow text-olive">{exp.kicker}</p>
                <h3 className="display mt-3 text-4xl lg:text-5xl">{exp.title}</h3>
                <p className="prose-body mt-4 max-w-sm text-deep/75">{exp.description}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

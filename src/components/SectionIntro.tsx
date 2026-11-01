import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  number?: string;
  title: ReactNode;
  className?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export default function SectionIntro({ eyebrow, number, title, className = "", align = "left", tone = "dark" }: Props) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto" : ""} ${className}`}>
      <Reveal>
        <p className={`eyebrow flex items-center gap-4 ${align === "center" ? "justify-center" : ""} ${tone === "light" ? "text-sand" : "text-sea"}`}>
          {number && <span className="font-serif text-sm italic tracking-normal normal-case">{number}</span>}
          <span aria-hidden className="h-px w-10 bg-current opacity-60" />
          <span>{eyebrow}</span>
        </p>
      </Reveal>
      <Reveal delay={120}>
        <h2 className={`display mt-6 text-[2.6rem] sm:text-6xl lg:text-7xl ${tone === "light" ? "text-ivory" : "text-deep"}`}>{title}</h2>
      </Reveal>
    </div>
  );
}

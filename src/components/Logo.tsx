import { site } from "@/content/site";

/** Wordmark: the name set in wide-tracked serif capitals with a fine wave beneath. */
export default function Logo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${tone === "light" ? "text-ivory" : "text-deep"} ${className}`}>
      <span className="font-serif text-[1.2rem] font-normal uppercase tracking-[0.3em] pl-[0.3em] sm:text-[1.55rem] sm:tracking-[0.34em] sm:pl-[0.34em]">{site.name}</span>
      <svg aria-hidden viewBox="0 0 60 6" className="mt-1 h-[5px] w-10 opacity-70" fill="none">
        <path d="M0 3c5 0 5-2.5 10-2.5S15 3 20 3s5-2.5 10-2.5S35 3 40 3s5-2.5 10-2.5S55 3 60 3" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    </span>
  );
}

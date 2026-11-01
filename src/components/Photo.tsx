"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { FALLBACK_IMAGE } from "@/lib/images";

type PhotoProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  /** Extra classes for the <img> element itself */
  imgClassName?: string;
};

/**
 * next/image with a soft fade-in on load and an automatic fallback
 * photo if the remote image fails, so the page never shows a broken image.
 */
export default function Photo({ src, alt, imgClassName = "", className = "", ...rest }: PhotoProps) {
  const [current, setCurrent] = useState(src);
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...rest}
      src={current}
      alt={alt}
      className={`${className} ${imgClassName} transition-[opacity,transform,filter] duration-[1400ms] ease-[var(--ease-soft)] ${
        loaded ? "opacity-100 blur-0" : "opacity-0 blur-[6px]"
      }`}
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (current !== FALLBACK_IMAGE) setCurrent(FALLBACK_IMAGE);
        else setLoaded(true);
      }}
    />
  );
}

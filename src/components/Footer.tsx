import Link from "next/link";
import { photos, site } from "@/content/site";
import Logo from "./Logo";
import Photo from "./Photo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-deep text-ivory">
      {/* Very subtle sea texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-luminosity">
        <Photo src={photos.footer.src} alt="" fill sizes="100vw" quality={50} className="object-cover" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-deep via-deep/90 to-deep" />

      <div className="container-x relative py-20 md:py-28">
        <div className="flex flex-col items-center text-center">
          <Logo tone="light" className="scale-125" />
          <p className="mt-8 max-w-sm font-serif text-xl italic text-ivory/75">{site.subtitle}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-ivory/15 pt-14 text-sm font-light sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="eyebrow text-sand">Find us</h3>
            <address className="mt-5 not-italic leading-relaxed text-ivory/80">
              {site.contact.addressLines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
          </div>
          <div>
            <h3 className="eyebrow text-sand">Hours</h3>
            <ul className="mt-5 space-y-2 text-ivory/80">
              {site.hours.map((h) => (
                <li key={h.label}>
                  <span className="text-ivory">{h.label}</span>
                  <span className="block text-ivory/60">{h.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-sand">Contact</h3>
            <ul className="mt-5 space-y-2 text-ivory/80">
              <li><a className="link-draw" href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>{site.contact.phone}</a></li>
              <li><a className="link-draw break-all" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
              <li>
                <a className="link-draw" href={`https://instagram.com/${site.contact.instagram}`} target="_blank" rel="noopener noreferrer">
                  Instagram — @{site.contact.instagram}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-sand">Visit</h3>
            <ul className="mt-5 space-y-2 text-ivory/80">
              <li><Link className="link-draw" href="/menu">The menu</Link></li>
              <li><Link className="link-draw" href="/#reservations">Reservations</Link></li>
              <li><Link className="link-draw" href="/#experience">Beach Club</Link></li>
              <li><Link className="link-draw" href="/#gallery">Gallery</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/10 pt-8 text-xs font-light text-ivory/45 sm:flex-row sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Photography via Unsplash.</p>
        </div>
      </div>
    </footer>
  );
}

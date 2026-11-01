import About from "@/components/About";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import MenuShowcase from "@/components/MenuShowcase";
import Reservations from "@/components/Reservations";
import { photos, site } from "@/content/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    description: site.description,
    url: site.url,
    image: photos.hero.src,
    servesCuisine: ["Mediterranean", "Seafood", "Italian", "Greek"],
    telephone: site.contact.phone,
    email: site.contact.email,
    address: { "@type": "PostalAddress", streetAddress: site.contact.addressLines.join(", ") },
    menu: `${site.url}/menu`,
    acceptsReservations: true,
    sameAs: [`https://instagram.com/${site.contact.instagram}`],
  };

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Experience />
        <MenuShowcase />
        <Location />
        <Gallery />
        <Reservations />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

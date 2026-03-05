import { PageWrapper } from "@/components/page-wrapper";

const brands = [
  {
    name: "Spa India",
    tagline: "Ayurvedic Luxury Redefined",
    description: "Our flagship brand merges ancient Ayurvedic wisdom with modern cosmetic science. Spa India products bring the serenity of a five-star spa to everyday rituals with botanical extracts, essential oils, and organic formulations.",
    image: "/images/body.jpg",
    highlights: ["Hair Care Range", "Body Care Collection", "Face Care Line", "Spa Essentials"],
  },
  {
    name: "Uni Spa",
    tagline: "Universal Wellness, Personal Touch",
    description: "Uni Spa democratizes luxury wellness. Designed for the modern consumer who values quality without compromise, this brand delivers professional-grade personal care with clean, dermatologically tested formulations.",
    image: "/images/hair.jpg",
    highlights: ["Syndet Bar Collection", "Organic Scrubs", "Cleansing Range", "Body Butters"],
  },
  {
    name: "Q & K",
    tagline: "Quintessential Skincare",
    description: "Q & K represents the pinnacle of cosmetic innovation. Each product is a masterwork of formulation science, targeting specific skin concerns with precision-engineered active ingredients and transparent soap base technology.",
    image: "/images/face.jpg",
    highlights: ["Transparent Soaps", "Active Serums", "Treatment Bars", "Specialty Cleansers"],
  },
];

export default function Brands() {
  return (
    <PageWrapper heroImage="/images/hero.jpg" heroTitle="Our Brands" heroSubtitle="Three distinct identities, one uncompromising standard of excellence.">
      <div style={{ borderTop: "1px solid rgba(212,176,106,0.15)" }} />

      {brands.map((brand, index) => (
        <div key={brand.name}>
          <section
            data-testid={`section-brand-${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
            style={{
              padding: "100px 40px",
              background: index % 2 === 1 ? "rgba(246,243,238,0.02)" : "transparent",
            }}
          >
            <div
              style={{
                maxWidth: 1000,
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: 60,
                alignItems: "center",
              }}
            >
              <div style={{ order: index % 2 === 1 ? 2 : 1 }}>
                <p style={{ color: "#D4B06A", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 16 }}>Brand</p>
                <h2 style={{ fontFamily: "Playfair Display, serif", color: "#F0EDE7", fontSize: 40, fontWeight: 600, margin: 0, lineHeight: 1.2 }}>
                  {brand.name}
                </h2>
                <p style={{ color: "#D4B06A", fontSize: 14, fontStyle: "italic", marginTop: 8, fontFamily: "Playfair Display, serif" }}>
                  {brand.tagline}
                </p>
                <div style={{ width: 40, height: 1, background: "#D4B06A", margin: "24px 0" }} />
                <p style={{ color: "#BBBBBB", fontSize: 15, lineHeight: 1.8 }}>
                  {brand.description}
                </p>
                <div style={{ marginTop: 28 }}>
                  {brand.highlights.map((h) => (
                    <span
                      key={h}
                      style={{
                        display: "inline-block",
                        padding: "8px 18px",
                        border: "1px solid rgba(212,176,106,0.2)",
                        color: "#BBBBBB",
                        fontSize: 12,
                        letterSpacing: "1px",
                        marginRight: 10,
                        marginBottom: 10,
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  order: index % 2 === 1 ? 1 : 2,
                  position: "relative",
                  aspectRatio: "4/5",
                  overflow: "hidden",
                }}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.85)",
                  }}
                />
                <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(212,176,106,0.15)" }} />
              </div>
            </div>
          </section>
          {index < brands.length - 1 && <div style={{ borderTop: "1px solid rgba(212,176,106,0.15)" }} />}
        </div>
      ))}
    </PageWrapper>
  );
}

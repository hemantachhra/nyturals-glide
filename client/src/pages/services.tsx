import { PageWrapper } from "@/components/page-wrapper";
import { Factory, Tag, Palette, FlaskConical, Gem } from "lucide-react";

const services = [
  {
    title: "Third-Party Manufacturing",
    description: "Full-scale cosmetic manufacturing with state-of-the-art facilities. From formulation to finished product, we handle every stage with precision and care. GMP-certified processes ensure consistent quality across every batch.",
    Icon: Factory,
  },
  {
    title: "White Labeling",
    description: "Launch your own cosmetic brand without the complexity of manufacturing. We provide ready-to-brand products with customizable formulations, packaging consultation, and regulatory compliance support.",
    Icon: Tag,
  },
  {
    title: "Brand Development Assistance",
    description: "End-to-end brand building for the cosmetic industry. From market positioning and product line strategy to packaging design guidance and launch support. We help you build a brand that resonates.",
    Icon: Palette,
  },
  {
    title: "Soap Manufacturing Consultancy",
    description: "Expert guidance on soap manufacturing processes, equipment selection, facility setup, and production optimization. Decades of experience distilled into actionable consulting for startups and established manufacturers.",
    Icon: FlaskConical,
  },
  {
    title: "Transparent Soap Base Formulation",
    description: "Our proprietary transparent soap base technology is available for licensing and custom formulation. Crystal-clear, premium-grade bases suitable for luxury soap brands and artisan creators worldwide.",
    Icon: Gem,
  },
];

export default function Services() {
  return (
    <PageWrapper heroImage="/images/face.jpg" heroTitle="Our Services" heroSubtitle="Comprehensive cosmetic manufacturing and brand development expertise.">
      <div style={{ borderTop: "1px solid rgba(212,176,106,0.15)" }} />

      <section data-testid="section-services-list" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <p style={{ color: "#D4B06A", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 16 }}>What We Offer</p>
            <h2 style={{ fontFamily: "Playfair Display, serif", color: "#F0EDE7", fontSize: 36, fontWeight: 600, margin: 0 }}>
              Excellence in Every Service
            </h2>
            <p style={{ color: "#BBBBBB", fontSize: 15, lineHeight: 1.8, maxWidth: 550, margin: "20px auto 0" }}>
              Whether you're launching a new brand or scaling an existing operation, our comprehensive services cover every aspect of cosmetic manufacturing.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {services.map((service, index) => (
              <div
                key={service.title}
                data-testid={`card-service-${index}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr",
                  gap: 30,
                  padding: "40px",
                  background: "rgba(0,0,0,0.4)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(212,176,106,0.08)",
                  transition: "border-color 0.3s ease",
                  alignItems: "start",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,176,106,0.25)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,176,106,0.08)"; }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(212,176,106,0.2)",
                    color: "#D4B06A",
                  }}
                >
                  <service.Icon size={20} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "Playfair Display, serif", color: "#F0EDE7", fontSize: 22, fontWeight: 600, margin: 0 }}>
                    {service.title}
                  </h3>
                  <p style={{ color: "#BBBBBB", fontSize: 14, lineHeight: 1.8, marginTop: 12, maxWidth: 650 }}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: "1px solid rgba(212,176,106,0.15)" }} />

      <section data-testid="section-services-cta" style={{ padding: "100px 40px", background: "rgba(246,243,238,0.02)", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", color: "#D4B06A", fontSize: 32, fontWeight: 600, margin: 0 }}>
            Ready to Create Something Exceptional?
          </h2>
          <p style={{ color: "#BBBBBB", fontSize: 15, lineHeight: 1.8, marginTop: 20 }}>
            Let's discuss how our expertise can bring your cosmetic vision to life.
          </p>
          <a
            href="/contact"
            data-testid="link-services-contact"
            style={{
              display: "inline-block",
              marginTop: 36,
              padding: "16px 44px",
              background: "#D4B06A",
              color: "#12100D",
              fontFamily: "Inter",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "2px",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}
          >
            Get in Touch
          </a>
        </div>
      </section>
    </PageWrapper>
  );
}

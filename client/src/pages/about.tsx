import { PageWrapper } from "@/components/page-wrapper";

export default function About() {
  return (
    <PageWrapper heroImage="/images/hero.jpg" heroTitle="Our Legacy" heroSubtitle="A century of cosmetic excellence rooted in tradition and innovation.">
      <div style={{ borderTop: "1px solid rgba(212,176,106,0.15)" }} />

      <section data-testid="section-about-legacy" style={{ maxWidth: 900, margin: "0 auto", padding: "100px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 60, alignItems: "start" }}>
          <div>
            <p style={{ color: "#D4B06A", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 16 }}>Heritage</p>
            <h2 style={{ fontFamily: "Playfair Display, serif", color: "#F0EDE7", fontSize: 36, fontWeight: 600, margin: 0, lineHeight: 1.2 }}>
              Dharamdas Tirathdas & Co.
            </h2>
            <div style={{ width: 40, height: 1, background: "#D4B06A", margin: "24px 0" }} />
            <p style={{ color: "#BBBBBB", fontSize: 15, lineHeight: 1.8 }}>
              Established in 1925, Dharamdas Tirathdas & Co. began its journey as a visionary enterprise in India's cosmetic landscape. What started as a humble operation has evolved into a powerhouse of cosmetic formulation and manufacturing.
            </p>
            <p style={{ color: "#BBBBBB", fontSize: 15, lineHeight: 1.8, marginTop: 20 }}>
              Nearly a century later, the legacy continues through Nyturals &mdash; carrying forward the same commitment to quality, innovation, and the belief that personal care is an art form deserving the finest ingredients and expertise.
            </p>
          </div>

          <div
            style={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(212,176,106,0.1)",
              padding: "50px 40px",
            }}
          >
            <p style={{ color: "#D4B06A", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 20 }}>Our Values</p>
            {[
              { title: "Purity", desc: "Only the finest organic and natural ingredients make it into our formulations." },
              { title: "Precision", desc: "Every product undergoes rigorous quality control and dermatological testing." },
              { title: "Innovation", desc: "Syndet technology, transparent soap bases, and advanced formulation science." },
              { title: "Legacy", desc: "A century of trust, craftsmanship, and relentless pursuit of excellence." },
            ].map((item, i) => (
              <div key={item.title} style={{ marginBottom: i < 3 ? 28 : 0 }}>
                <h4 style={{ fontFamily: "Playfair Display, serif", color: "#F0EDE7", fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{item.title}</h4>
                <p style={{ color: "#999", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: "1px solid rgba(212,176,106,0.15)" }} />

      <section data-testid="section-about-expertise" style={{ padding: "100px 40px", background: "rgba(246,243,238,0.02)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#D4B06A", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 16 }}>Expertise</p>
          <h2 style={{ fontFamily: "Playfair Display, serif", color: "#F0EDE7", fontSize: 36, fontWeight: 600, margin: "0 0 20px" }}>
            Cosmetic Formulation Mastery
          </h2>
          <p style={{ color: "#BBBBBB", fontSize: 15, lineHeight: 1.8, maxWidth: 600, margin: "0 auto" }}>
            Our team of cosmetic chemists and formulation scientists bring decades of expertise in syndet technology, organic skincare, and transparent soap base engineering. We combine traditional knowledge with modern science to create products that stand apart.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginTop: 60 }}>
            {[
              { num: "99+", label: "Years of Legacy" },
              { num: "500+", label: "Formulations Created" },
              { num: "50+", label: "Brand Partners" },
              { num: "3", label: "Signature Brands" },
            ].map((stat) => (
              <div key={stat.label}>
                <p style={{ fontFamily: "Playfair Display, serif", color: "#D4B06A", fontSize: 42, fontWeight: 600, margin: 0 }}>{stat.num}</p>
                <p style={{ color: "#888", fontSize: 13, letterSpacing: "1px", marginTop: 8 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

import { PageWrapper } from "@/components/page-wrapper";

const products = [
  {
    category: "Syndet Bars",
    items: [
      { name: "Hair Syndet Bar", desc: "Herbal cleansing ritual with botanical extracts. Sulfate-free, gentle on scalp, powerful in purification. Enriched with amla, bhringraj, and neem.", image: "/images/hair.jpg" },
      { name: "Body Syndet Bar", desc: "Pure spa-grade cleansing experience. Formulated with shea butter and oat extract for silky smooth skin. pH-balanced for daily use.", image: "/images/body.jpg" },
      { name: "Face Syndet Bar", desc: "Precision skin cleansing for the discerning. Contains niacinamide and hyaluronic acid for a clean, hydrated complexion.", image: "/images/face.jpg" },
    ],
  },
  {
    category: "Specialty Products",
    items: [
      { name: "Organic Fruit Scrub", desc: "Our hero product. A luxurious exfoliant crafted with organic fruit enzymes, walnut shell powder, and vitamin E. Reveals radiant, renewed skin with every use.", image: "/images/body.jpg" },
      { name: "Transparent Soap Base", desc: "Crystal-clear soap base engineered with proprietary formulation. Perfect for artisan soap makers and premium brand development. Available in multiple grades.", image: "/images/face.jpg" },
    ],
  },
];

export default function Products() {
  return (
    <PageWrapper heroImage="/images/body.jpg" heroTitle="Our Products" heroSubtitle="Meticulously formulated. Ethically crafted. Exquisitely effective.">
      <div style={{ borderTop: "1px solid rgba(212,176,106,0.15)" }} />

      {products.map((category, catIdx) => (
        <section
          key={category.category}
          data-testid={`section-products-${category.category.toLowerCase().replace(/\s+/g, "-")}`}
          style={{
            padding: "100px 40px",
            background: catIdx % 2 === 1 ? "rgba(246,243,238,0.02)" : "transparent",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p style={{ color: "#D4B06A", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 16 }}>Collection</p>
              <h2 style={{ fontFamily: "Playfair Display, serif", color: "#F0EDE7", fontSize: 36, fontWeight: 600, margin: 0 }}>
                {category.category}
              </h2>
              <div style={{ width: 50, height: 1, background: "#D4B06A", margin: "24px auto 0" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 30 }}>
              {category.items.map((product) => (
                <div
                  key={product.name}
                  data-testid={`card-product-${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(212,176,106,0.1)",
                    overflow: "hidden",
                    transition: "border-color 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,176,106,0.3)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,176,106,0.1)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.8)", transition: "transform 0.5s ease" }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "scale(1.05)"; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
                    />
                  </div>
                  <div style={{ padding: "30px 28px" }}>
                    <h3 style={{ fontFamily: "Playfair Display, serif", color: "#D4B06A", fontSize: 22, fontWeight: 600, margin: 0 }}>
                      {product.name}
                    </h3>
                    <p style={{ color: "#BBBBBB", fontSize: 14, lineHeight: 1.7, marginTop: 12 }}>
                      {product.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {catIdx < products.length - 1 && <div style={{ borderTop: "1px solid rgba(212,176,106,0.15)", marginTop: 100 }} />}
        </section>
      ))}
    </PageWrapper>
  );
}

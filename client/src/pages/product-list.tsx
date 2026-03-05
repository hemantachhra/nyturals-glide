import { PageWrapper } from "@/components/page-wrapper";
import { useState } from "react";
import { useLocation } from "wouter";
import { Check, Send } from "lucide-react";

const productCategories = [
  {
    title: "For Face",
    items: [
      "Face Wash", "Sulphate Free Face Wash", "Face Cream 3 in One", "Light Cream",
      "Night Cream", "Face Serum", "Face Masque", "Peel Off Mask",
      "Anti Aging Cream", "Age Reversal Cream", "Thin Line Remover", "Anti Blemish Cream",
      "Primer", "Dual Action Primer", "Radiance Cream", "Acne Fighting Cream", "Vanishing Cream",
    ],
  },
  {
    title: "Eye & Gel Care",
    items: [
      "Under Eye Gel", "Under Eye Balm", "Facial Gel", "Aloevera Gel",
    ],
  },
  {
    title: "Scrubs",
    items: [
      "Herbal Scrub", "Organic Fruit Scrub", "Gel Scrub",
    ],
  },
  {
    title: "Packs & Masks",
    items: [
      "Face Pack", "Glow Pack", "Skin Tightening Pack", "Radiance Pack",
      "Tone Improving Pack", "Magic Face Pack",
      "Facial Kesar Chandan Syndet Bar", "Facial Doodh Malai Syndet Bar", "Goat Milk Facial Bar",
    ],
  },
  {
    title: "For Hair",
    items: [
      "Hair Oil", "Hair Serum", "Conditioning Shampoo", "Shampoo Bar",
      "Herbal Shampoo", "Sulphate Free Natural Shampoo", "Hair Conditioner", "Hair Mask",
      "Keratin Shampoo", "Aloevera Shampoo", "Go Dan Go Shampoo",
      "Hair Glow", "Hair Styling Powder", "Hair Volumising Powder",
    ],
  },
  {
    title: "Body",
    items: [
      "Body Gel", "Body Wash", "Moisturising Syndet Bar", "Massage Oil",
    ],
  },
  {
    title: "Hands",
    items: [
      "Hand Cream", "Nail Protector", "Hand Wash", "Manicure Kit",
    ],
  },
  {
    title: "Feet",
    items: [
      "Foot Cream", "Foot Massage Oil", "Pedicure Shampoo", "Pedicure Kit", "Foot Night Apply Cream",
    ],
  },
  {
    title: "Specialty Products",
    items: [
      "Instant Hair Straightener", "Curly Hair Kit",
    ],
  },
];

export default function ProductList() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [, setLocation] = useLocation();

  const toggleProduct = (product: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(product)) next.delete(product);
      else next.add(product);
      return next;
    });
  };

  const handleEnquire = () => {
    const list = Array.from(selected).map((p) => `• ${p}`).join("\n");
    const encoded = encodeURIComponent(list);
    setLocation(`/contact?products=${encoded}#contact-form`);
  };

  return (
    <PageWrapper heroImage="/images/cosmetics-bg.png" heroTitle="Our Product Range" heroSubtitle="A comprehensive catalogue of premium formulations, crafted with precision and care.">
      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 10px;
        }
        @media (max-width: 520px) {
          .product-grid {
            grid-template-columns: 1fr;
          }
        }
        .enquiry-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 16px 40px;
        }
        @media (max-width: 520px) {
          .enquiry-bar {
            flex-direction: column;
            gap: 12px;
            padding: 16px 20px;
          }
        }
      `}</style>

      <div style={{ borderTop: "1px solid rgba(212,176,106,0.15)" }} />

      <section data-testid="section-product-intro" style={{ padding: "80px 20px 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#D4B06A", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 16 }}>Crafted with Expertise</p>
          <h2 style={{ fontFamily: "Playfair Display, serif", color: "#F0EDE7", fontSize: "clamp(24px, 5vw, 32px)", fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
            The Art & Science of Premium Cosmetics
          </h2>
          <div style={{ width: 50, height: 1, background: "#D4B06A", margin: "28px auto" }} />
          <p style={{ color: "#a8a29a", fontSize: 15, lineHeight: 1.9, maxWidth: 680, margin: "0 auto" }}>
            Every product in our portfolio is born from decades of formulation expertise and manufactured with unwavering due diligence in our state-of-the-art facility.
            We marry the wisdom of herbal and natural ingredients — time-tested botanicals, plant-derived actives, and organic extracts — with modern scientific precision to create formulations that are genuinely good for the skin.
          </p>
          <p style={{ color: "#a8a29a", fontSize: 15, lineHeight: 1.9, maxWidth: 680, margin: "20px auto 0" }}>
            From advanced syndet bars to specialised serums, each product undergoes rigorous quality control and is crafted on precision-engineered machinery that ensures consistency, purity, and efficacy in every batch.
            The result is a range that embodies the perfect balance between nature's finest offerings and scientific innovation.
          </p>
        </div>
      </section>

      <section data-testid="section-product-selection" style={{ padding: "60px 20px 40px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", marginBottom: 40 }}>
          <p style={{ color: "#9a9590", fontSize: 14, lineHeight: 1.7 }}>
            Browse our complete range below. Select the products you're interested in and we'll prepare a detailed brief for you.
          </p>
        </div>
      </section>

      {productCategories.map((category, catIdx) => (
        <section
          key={category.title}
          data-testid={`section-category-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          style={{
            padding: "40px 20px",
            background: catIdx % 2 === 1 ? "rgba(212,176,106,0.02)" : "transparent",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <div style={{ width: 28, height: 1, background: "#D4B06A" }} />
              <h3
                data-testid={`text-category-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#e8c87a",
                  fontSize: 22,
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                {category.title}
              </h3>
            </div>

            <div className="product-grid">
              {category.items.map((product) => {
                const isSelected = selected.has(product);
                return (
                  <button
                    key={product}
                    type="button"
                    data-testid={`btn-product-${product.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    onClick={() => toggleProduct(product)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px 16px",
                      background: isSelected ? "rgba(212,176,106,0.1)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isSelected ? "rgba(212,176,106,0.4)" : "rgba(212,176,106,0.08)"}`,
                      color: isSelected ? "#e8c87a" : "#c5bfb8",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      textAlign: "left",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        minWidth: 18,
                        border: `1px solid ${isSelected ? "#D4B06A" : "rgba(212,176,106,0.25)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: isSelected ? "rgba(212,176,106,0.15)" : "transparent",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {isSelected && <Check size={12} style={{ color: "#D4B06A" }} />}
                    </div>
                    {product}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {selected.size > 0 && (
        <div
          data-testid="bar-enquiry"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            background: "rgba(18,16,13,0.95)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(212,176,106,0.2)",
          }}
        >
          <div className="enquiry-bar">
            <span style={{ color: "#c5bfb8", fontSize: 14, fontFamily: "Inter" }}>
              <span style={{ color: "#D4B06A", fontWeight: 600 }}>{selected.size}</span> product{selected.size !== 1 ? "s" : ""} selected
            </span>
            <button
              type="button"
              data-testid="button-enquire-selected"
              onClick={handleEnquire}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 28px",
                background: "#D4B06A",
                border: "none",
                color: "#1a1610",
                fontFamily: "Inter",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "2px",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget).style.opacity = "0.88"; }}
              onMouseLeave={(e) => { (e.currentTarget).style.opacity = "1"; }}
            >
              <Send size={14} />
              Enquire Now
            </button>
            <button
              type="button"
              data-testid="button-clear-selection"
              onClick={() => setSelected(new Set())}
              style={{
                padding: "12px 20px",
                background: "transparent",
                border: "1px solid rgba(212,176,106,0.25)",
                color: "#9a9590",
                fontFamily: "Inter",
                fontSize: 11,
                letterSpacing: "1px",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget).style.borderColor = "rgba(212,176,106,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget).style.borderColor = "rgba(212,176,106,0.25)"; }}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <div style={{ height: selected.size > 0 ? 80 : 0 }} />
    </PageWrapper>
  );
}

import { useLocation } from "wouter";

export function Footer() {
  const [, setLocation] = useLocation();

  return (
    <footer
      data-testid="footer"
      style={{
        background: "#0e0c0a",
        borderTop: "1px solid rgba(212,176,106,0.15)",
        padding: "80px 40px 40px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 50, marginBottom: 60 }}>
          <div>
            <h3
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#D4B06A",
                fontSize: 22,
                fontWeight: 600,
                marginBottom: 16,
                letterSpacing: "1px",
              }}
            >
              NYTURALS
            </h3>
            <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>
              Luxury cosmetic engineering since 1925. A legacy of Dharamdas Tirathdas & Co.
            </p>
          </div>

          <div>
            <h4 style={{ color: "#D4B06A", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>Navigate</h4>
            {[
              { label: "About", href: "/about" },
              { label: "Brands", href: "/brands" },
              { label: "Products", href: "/products" },
              { label: "Product List", href: "/product-list" },
              { label: "Services", href: "/services" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={`link-footer-${link.label.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); setLocation(link.href); }}
                style={{ display: "block", color: "#888", fontSize: 14, textDecoration: "none", marginBottom: 10, transition: "color 0.3s" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#D4B06A"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#888"; }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div>
            <h4 style={{ color: "#D4B06A", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>Our Brands</h4>
            {["Spa India", "Uni Spa", "Q & K"].map((brand) => (
              <p key={brand} style={{ color: "#888", fontSize: 14, marginBottom: 10 }}>{brand}</p>
            ))}
          </div>

          <div>
            <h4 style={{ color: "#D4B06A", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>Contact</h4>
            <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, marginBottom: 8 }}>
              A-55 Wazirpur Industrial Area,<br />Delhi 110052
            </p>
            <p style={{ color: "#888", fontSize: 14, marginBottom: 4 }}>
              Phone: <a href="tel:9871810055" style={{ color: "#D4B06A", textDecoration: "none" }}>9871810055</a>
            </p>
            <p style={{ color: "#888", fontSize: 14 }}>
              Email: <a href="mailto:nyturals@gmail.com" style={{ color: "#D4B06A", textDecoration: "none" }}>nyturals@gmail.com</a>
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(212,176,106,0.1)", paddingTop: 30, textAlign: "center" }}>
          <p style={{ color: "#555", fontSize: 12, letterSpacing: "1px" }}>
            &copy; {new Date().getFullYear()} Nyturals &mdash; Dharamdas Tirathdas & Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useLocation } from "wouter";

export function Footer() {
  const [, setLocation] = useLocation();

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Product List", href: "/product-list" },
    { label: "Brands", href: "/brands" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer
      data-testid="footer"
      style={{
        background: "rgba(14, 12, 10, 0.05)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderTop: "1px solid rgba(212,176,106,0.12)",
        padding: "30px 40px 20px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ minWidth: 180 }}>
            <h3
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#D4B06A",
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 8,
                letterSpacing: "1px",
              }}
            >
              NYTURALS
            </h3>
            <p style={{ color: "#777", fontSize: 12, lineHeight: 1.6, maxWidth: 200, margin: 0 }}>
              Luxury cosmetic engineering since 1925. Dharamdas Tirathdas & Co.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 30px", minWidth: 220 }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
                onClick={(e) => { e.preventDefault(); setLocation(link.href); }}
                style={{ color: "#888", fontSize: 13, textDecoration: "none", transition: "color 0.3s", padding: "3px 0" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#D4B06A"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#888"; }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ minWidth: 180 }}>
            <p style={{ color: "#777", fontSize: 12, lineHeight: 1.6, margin: "0 0 4px" }}>
              A-55 Wazirpur Industrial Area, Delhi 110052
            </p>
            <p style={{ color: "#777", fontSize: 12, margin: "0 0 2px" }}>
              <a href="tel:9871810055" style={{ color: "#D4B06A", textDecoration: "none" }}>9871810055</a>
            </p>
            <p style={{ color: "#777", fontSize: 12, margin: 0 }}>
              <a href="mailto:nyturals@gmail.com" style={{ color: "#D4B06A", textDecoration: "none" }}>nyturals@gmail.com</a>
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(212,176,106,0.08)", marginTop: 20, paddingTop: 14, textAlign: "center" }}>
          <p style={{ color: "#555", fontSize: 11, letterSpacing: "1px", margin: 0 }}>
            &copy; {new Date().getFullYear()} Nyturals &mdash; Dharamdas Tirathdas & Co.
          </p>
        </div>
      </div>
    </footer>
  );
}

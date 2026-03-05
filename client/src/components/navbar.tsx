import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Brands", href: "/brands" },
  { label: "Products", href: "/products" },
  { label: "Product List", href: "/product-list" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      data-testid="navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(18,16,13,0.35)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,176,106,0.08)" : "1px solid transparent",
        transition: "all 0.4s ease",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); setLocation("/"); }}
          data-testid="link-logo"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 24,
            fontWeight: 600,
            color: "#D4B06A",
            textDecoration: "none",
            letterSpacing: "2px",
          }}
        >
          NYTURALS
        </a>

        <button
          data-testid="button-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#D4B06A",
            fontSize: 24,
            cursor: "pointer",
            padding: 8,
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div
          className={`nav-links ${menuOpen ? "nav-open" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 36,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={`link-nav-${link.label.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation(link.href);
                setMenuOpen(false);
              }}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: location === link.href ? "#D4B06A" : "#BBBBBB",
                textDecoration: "none",
                transition: "color 0.3s ease, text-shadow 0.3s ease",
                textShadow: location === link.href ? "0 0 12px rgba(212,176,106,0.4)" : "none",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#D4B06A";
                (e.target as HTMLElement).style.textShadow = "0 0 12px rgba(212,176,106,0.4)";
              }}
              onMouseLeave={(e) => {
                if (location !== link.href) {
                  (e.target as HTMLElement).style.color = "#BBBBBB";
                  (e.target as HTMLElement).style.textShadow = "none";
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          .nav-links {
            display: none !important;
            flex-direction: column;
            position: absolute;
            top: 72px;
            left: 0;
            right: 0;
            background: rgba(18,16,13,0.96);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            padding: 30px 40px;
            gap: 24px !important;
            border-bottom: 1px solid rgba(212,176,106,0.1);
          }
          .nav-links.nav-open { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

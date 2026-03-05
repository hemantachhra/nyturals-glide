import { useEffect } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
  const [, setLocation] = useLocation();

  const navTo = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setLocation(path);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    let autoRunning = false;
    let direction = 1;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let lastTime = 0;
    const SPEED = 18;

    function autoGlide(timestamp: number) {
      if (!autoRunning) return;
      if (!lastTime) lastTime = timestamp;
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;
      window.scrollBy(0, direction * SPEED * delta);
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 5)
        direction = -1;
      if (window.scrollY <= 5) direction = 1;
      requestAnimationFrame(autoGlide);
    }

    function startAuto() {
      autoRunning = true;
      lastTime = 0;
      requestAnimationFrame(autoGlide);
    }

    function stopAuto() {
      autoRunning = false;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(startAuto, 3000);
    }

    function handleScroll() {
      const scrolled = window.scrollY;
      document.querySelectorAll<HTMLElement>(".glide").forEach(function (el) {
        const section = el.closest(".nyturals-section") as HTMLElement;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const viewH = window.innerHeight;
        const sectionProgress = -rect.top / (section.offsetHeight - viewH);
        const clampedProgress = Math.max(0, Math.min(1, sectionProgress));
        const travel = viewH * 0.6;
        const offset = (0.5 - clampedProgress) * travel;
        el.style.transform = "translateY(" + offset + "px)";
      });

      const navCard = document.querySelector<HTMLElement>(".glide-nav");
      if (navCard) {
        const wrapper = navCard.closest("[data-testid='plants-bg-wrapper']") as HTMLElement;
        if (wrapper) {
          const rect = wrapper.getBoundingClientRect();
          const viewH = window.innerHeight;
          const sectionProgress = -rect.top / (wrapper.offsetHeight - viewH);
          const clampedProgress = Math.max(0, Math.min(1, sectionProgress));
          const travel = viewH * 1.4;
          const offset = (0.9 - clampedProgress) * travel;
          navCard.style.transform = "translateY(" + offset + "px)";
        }
      }

      const plantsEl = document.getElementById("plants-bg-image");
      if (plantsEl) {
        const wrapper = plantsEl.parentElement;
        if (wrapper) {
          const rect = wrapper.getBoundingClientRect();
          const viewH = window.innerHeight;
          const visible = Math.max(0, Math.min(rect.bottom, viewH) - Math.max(rect.top, 0));
          const ratio = visible / viewH;
          const blur = Math.max(0, (1 - ratio) * 16);
          plantsEl.style.filter = "blur(" + blur + "px)";
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    idleTimer = setTimeout(startAuto, 3000);

    const events = ["wheel", "touchstart", "mousedown", "keydown", "scroll"];
    events.forEach(function (evt) {
      window.addEventListener(evt, stopAuto, { passive: true });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      events.forEach(function (evt) {
        window.removeEventListener(evt, stopAuto);
      });
      if (idleTimer) clearTimeout(idleTimer);
      autoRunning = false;
    };
  }, []);

  return (
    <>
      <style>{`
        .nyturals-hero-bg {
          position: fixed;
          top: 72px;
          width: 100%;
          height: calc(100vh - 72px);
          background: url("/images/hero.jpg") center/cover no-repeat;
          z-index: -1;
        }

        .nyturals-hero {
          height: calc(100vh - 72px);
          margin-top: 72px;
          position: relative;
          display: flex;
          align-items: center;
          padding: 40px;
        }

        .nyturals-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(18, 15, 10, 0.88) 0%,
            rgba(18, 15, 10, 0.55) 50%,
            rgba(18, 15, 10, 0.2) 100%
          );
          z-index: 0;
        }

        .nyturals-hero-content {
          max-width: 620px;
          position: relative;
          z-index: 1;
        }

        .nyturals-hero .hero-title-wrap {
          position: relative;
          display: inline-block;
        }

        .nyturals-hero h1 {
          font-family: Playfair Display, serif;
          font-size: clamp(42px, 8vw, 80px);
          margin: 0;
          color: #e8c87a;
          line-height: 1.05;
          font-weight: 600;
          text-shadow: 0 2px 20px rgba(0,0,0,0.5);
        }

        .nyturals-hero .hero-logo-inline {
          position: absolute;
          width: clamp(44px, 7vw, 76px);
          height: auto;
          filter: drop-shadow(0 1px 8px rgba(212,176,106,0.4));
          top: -30%;
          right: 23%;
          transform: translateX(50%);
          pointer-events: none;
        }

        .nyturals-hero .hero-legacy {
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #b8b2a8;
          margin-bottom: 20px;
          font-family: Inter, sans-serif;
          font-weight: 400;
        }

        .nyturals-hero .hero-tagline {
          font-size: 14px;
          letter-spacing: 3px;
          color: #d4b06a;
          margin-top: 14px;
          font-family: Playfair Display, serif;
          font-style: italic;
          font-weight: 400;
        }

        .nyturals-hero .hero-desc {
          font-size: 16px;
          margin-top: 20px;
          color: #b8b2a8;
          line-height: 1.8;
          max-width: 460px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.4);
        }

        .century-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 12px;
          pointer-events: none;
          width: 100%;
        }

        .century-inner {
          transform: rotate(-40deg);
          text-align: center;
          margin-bottom: 10px;
        }

        .century-number {
          font-family: Playfair Display, serif;
          font-size: clamp(50px, 8vw, 78px);
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(212,176,106,0.55);
          line-height: 1;
          animation: centuryPulse 4s ease-in-out infinite;
        }

        .century-label {
          font-family: Inter, sans-serif;
          font-size: 12px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(212,176,106,0.5);
          margin-top: 4px;
          animation: centuryPulse 4s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        @keyframes centuryPulse {
          0%, 100% { opacity: 0.65; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }

        .nyturals-section {
          height: 180vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nyturals-section-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center top 72px;
          background-attachment: fixed;
          z-index: -1;
        }

        .nyturals-card {
          background: rgba(18, 15, 10, 0.05);
          padding: 44px 40px;
          max-width: 400px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transform: translateY(0);
          transition: transform 0.2s linear;
          border: 1px solid rgba(212,176,106,0.12);
        }

        .nyturals-card .card-line {
          width: 36px;
          height: 1px;
          background: #d4b06a;
          margin-bottom: 18px;
        }

        .nyturals-card h2 {
          font-family: Playfair Display, serif;
          color: #fff;
          margin: 0;
          font-size: 30px;
          font-weight: 600;
          text-shadow: 0 2px 12px rgba(0,0,0,0.7), 0 0 4px rgba(0,0,0,0.5);
        }

        .nyturals-card p {
          color: #e8e0d4;
          text-shadow: 0 1px 6px rgba(0,0,0,0.5);
          line-height: 1.7;
          margin-top: 12px;
          font-size: 15px;
        }

        .nyturals-card .card-link {
          color: #d4b06a;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          margin-top: 18px;
          display: inline-block;
          transition: opacity 0.3s;
          text-shadow: 0 1px 6px rgba(0,0,0,0.5);
        }
        .nyturals-card .card-link:hover {
          opacity: 0.7;
        }

        .gold-separator {
          border-top: 1px solid rgba(212,176,106,0.15);
        }

        .plants-bg-wrapper {
          position: relative;
          overflow: hidden;
        }

        .plants-bg-image {
          position: absolute;
          inset: 0;
          background: url("/images/plants.png") center/cover no-repeat;
          z-index: 0;
          transition: filter 0.15s ease-out;
        }

        .plants-bg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(12, 10, 8, 0.55);
          z-index: 1;
        }

        @media (max-width: 768px) {
          .nyturals-hero {
            justify-content: center;
            text-align: center;
          }
          .nyturals-hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .nyturals-card {
            margin: 20px;
          }
          .century-number {
            font-size: 32px;
          }
          .nyturals-hero .hero-logo-inline {
            width: 36px;
            right: 22%;
          }
        }
      `}</style>

      <Navbar />

      <div className="nyturals-hero-bg" />

      <section className="nyturals-hero" data-testid="section-hero">
        <div className="nyturals-hero-content">
          <div className="century-badge" data-testid="badge-century">
            <div className="century-inner">
              <div className="century-number">100</div>
              <div className="century-label">Years</div>
            </div>
          </div>
          <p className="hero-legacy">A century-old family legacy dating back to 1925</p>
          <div className="hero-title-wrap">
            <h1 data-testid="text-brand-name">Nyturals</h1>
            <img src="/images/nyturals-logo.png" alt="" className="hero-logo-inline" data-testid="img-logo" />
          </div>
          <p className="hero-tagline">Defined by Nature. Refined by Nyturals.</p>
          <p className="hero-desc">
            Magic happens when age-old herbal wisdom meets modern cosmetic science, creating effective, skin-friendly, and sustainable skincare.<br />Witness the magic.
          </p>
        </div>
      </section>

      <div className="gold-separator" />

      <section className="nyturals-section" data-testid="section-hair">
        <div
          className="nyturals-section-bg"
          style={{ backgroundImage: "url('/images/hair.jpg')" }}
        />
        <div className="nyturals-card glide" data-testid="card-hair">
          <div className="card-line" />
          <h2>Hair Syndet Bar</h2>
          <p>A herbal cleansing ritual crafted with botanical extracts. Gentle on scalp, powerful in purification.</p>
          <a href="/products" onClick={navTo("/products")} className="card-link" data-testid="link-discover-hair">Discover &rarr;</a>
        </div>
      </section>

      <div className="gold-separator" />

      <section className="nyturals-section" data-testid="section-body">
        <div
          className="nyturals-section-bg"
          style={{ backgroundImage: "url('/images/body.jpg')" }}
        />
        <div className="nyturals-card glide" data-testid="card-body">
          <div className="card-line" />
          <h2>Body Syndet Bar</h2>
          <p>Pure spa-grade cleansing experience. Silken formulation that nourishes while it cleanses.</p>
          <a href="/products" onClick={navTo("/products")} className="card-link" data-testid="link-discover-body">Discover &rarr;</a>
        </div>
      </section>

      <div className="gold-separator" />

      <section className="nyturals-section" data-testid="section-face" style={{ height: "220vh" }}>
        <div
          className="nyturals-section-bg"
          style={{ backgroundImage: "url('/images/face.jpg')" }}
        />
        <div className="nyturals-card glide" data-testid="card-face">
          <div className="card-line" />
          <h2>Face Syndet Bar</h2>
          <p>Precision skin cleansing for the discerning. Clean cosmetic formulation at its finest.</p>
          <a href="/products" onClick={navTo("/products")} className="card-link" data-testid="link-discover-face">Discover &rarr;</a>
        </div>
      </section>

      <div className="plants-bg-wrapper" data-testid="plants-bg-wrapper" style={{ position: "relative" }}>
        <div className="plants-bg-image" id="plants-bg-image" />
        <div className="plants-bg-overlay" />

        <div style={{ position: "relative", zIndex: 2, minHeight: "220vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 0 }}>
         <div className="glide-nav" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <section
            data-testid="section-navigate"
            style={{
              maxWidth: 580,
              width: "90%",
              padding: "44px 36px",
              textAlign: "center",
              background: "rgba(18, 15, 10, 0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(212,176,106,0.12)",
            }}
          >
            <div style={{ width: 36, height: 1, background: "#d4b06a", margin: "0 auto 20px" }} />
            <p style={{ color: "#d4b06a", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 10, fontFamily: "Inter, sans-serif" }}>
              Explore More
            </p>
            <h2 style={{ fontFamily: "Playfair Display, serif", color: "#e8c87a", fontSize: 26, fontWeight: 600, margin: "0 0 30px" }}>
              Where Would You Like to Go?
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, maxWidth: 600, margin: "0 auto" }}>
              <a href="/products" onClick={navTo("/products")} className="btn-gold" data-testid="link-explore-products" style={{ display: "inline-block", padding: "12px 28px", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s ease", background: "#d4b06a", color: "#1a1610", cursor: "pointer" }}>
                Explore Products
              </a>
              <a href="/contact" onClick={navTo("/contact")} data-testid="link-send-message" style={{ display: "inline-block", padding: "12px 28px", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s ease", border: "1px solid rgba(212,176,106,0.5)", color: "#e8c87a", background: "transparent", cursor: "pointer" }}>
                Send Message
              </a>
              <a href="/about" onClick={navTo("/about")} data-testid="link-nav-about-bottom" style={{ display: "inline-block", padding: "12px 28px", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s ease", border: "1px solid rgba(212,176,106,0.5)", color: "#e8c87a", background: "transparent", cursor: "pointer" }}>
                About Us
              </a>
              <a href="/product-list" onClick={navTo("/product-list")} data-testid="link-nav-productlist-bottom" style={{ display: "inline-block", padding: "12px 28px", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s ease", border: "1px solid rgba(212,176,106,0.5)", color: "#e8c87a", background: "transparent", cursor: "pointer" }}>
                Product List
              </a>
              <a href="/products" onClick={navTo("/products")} data-testid="link-nav-products-bottom" style={{ display: "inline-block", padding: "12px 28px", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s ease", border: "1px solid rgba(212,176,106,0.5)", color: "#e8c87a", background: "transparent", cursor: "pointer" }}>
                Products
              </a>
            </div>
          </section>
          <div style={{ width: "100%" }}>
            <Footer />
          </div>
         </div>
        </div>
      </div>
    </>
  );
}

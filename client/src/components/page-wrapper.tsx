import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
}

export function PageWrapper({ children, heroImage, heroTitle, heroSubtitle }: PageWrapperProps) {
  return (
    <div style={{ background: "#12100D", color: "#F0EDE7", fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
      <Navbar />

      {heroTitle && (
        <section
          style={{
            height: "calc(50vh - 72px)",
            minHeight: 310,
            marginTop: 72,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {heroImage && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url('${heroImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 0,
              }}
            />
          )}
          <div style={{ position: "absolute", inset: 0, background: "rgba(18, 16, 13, 0.75)", zIndex: 1 }} />
          <div style={{ position: "relative", zIndex: 2, padding: "0 40px" }}>
            <div style={{ width: 50, height: 1, background: "#D4B06A", margin: "0 auto 24px" }} />
            <h1
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(36px, 6vw, 64px)",
                color: "#D4B06A",
                fontWeight: 600,
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {heroTitle}
            </h1>
            {heroSubtitle && (
              <p style={{ color: "#BBBBBB", fontSize: 16, marginTop: 16, maxWidth: 500, margin: "16px auto 0", lineHeight: 1.7 }}>
                {heroSubtitle}
              </p>
            )}
          </div>
        </section>
      )}

      {!heroTitle && <div style={{ height: 72 }} />}

      {children}

      <Footer />
    </div>
  );
}

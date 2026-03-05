import { PageWrapper } from "@/components/page-wrapper";

export default function NotFound() {
  return (
    <PageWrapper>
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 40px",
        }}
      >
        <div>
          <p style={{ fontFamily: "Playfair Display, serif", color: "#D4B06A", fontSize: 72, fontWeight: 600, margin: 0 }}>404</p>
          <div style={{ width: 50, height: 1, background: "#D4B06A", margin: "20px auto" }} />
          <p style={{ color: "#BBBBBB", fontSize: 16, lineHeight: 1.7 }}>
            The page you're looking for doesn't exist.
          </p>
          <a
            href="/"
            data-testid="link-back-home"
            style={{
              display: "inline-block",
              marginTop: 30,
              padding: "14px 36px",
              border: "1px solid rgba(212,176,106,0.4)",
              color: "#D4B06A",
              fontFamily: "Inter",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "2px",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Return Home
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}

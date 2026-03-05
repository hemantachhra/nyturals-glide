import { PageWrapper } from "@/components/page-wrapper";
import { useQuery } from "@tanstack/react-query";
import type { ContactMessage } from "@shared/schema";
import { Mail, CheckCircle, AlertCircle, Clock } from "lucide-react";

export default function Dashboard() {
  const { data: messages, isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/messages"],
  });

  return (
    <PageWrapper heroTitle="Message Dashboard" heroSubtitle="View all contact form submissions.">
      <div style={{ borderTop: "1px solid rgba(212,176,106,0.15)" }} />

      <section data-testid="section-dashboard" style={{ padding: "80px 40px", minHeight: "50vh" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 40, flexWrap: "wrap" }}>
            <div>
              <p style={{ color: "#D4B06A", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 8 }}>Inbox</p>
              <h2 style={{ fontFamily: "Playfair Display, serif", color: "#F0EDE7", fontSize: 28, fontWeight: 600, margin: 0 }}>
                Contact Messages
                {messages && (
                  <span style={{ fontSize: 16, color: "#888", fontFamily: "Inter", fontWeight: 400, marginLeft: 12 }}>
                    ({messages.length})
                  </span>
                )}
              </h2>
            </div>
          </div>

          {isLoading && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ width: 40, height: 40, border: "2px solid rgba(212,176,106,0.2)", borderTopColor: "#D4B06A", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
              <p style={{ color: "#888", fontSize: 14 }}>Loading messages...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {!isLoading && messages && messages.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 40px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(212,176,106,0.08)" }}>
              <Mail size={40} style={{ color: "#555", marginBottom: 16 }} />
              <p style={{ color: "#888", fontSize: 16 }}>No messages yet.</p>
              <p style={{ color: "#666", fontSize: 14 }}>Messages from the contact form will appear here.</p>
            </div>
          )}

          {!isLoading && messages && messages.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  data-testid={`card-message-${msg.id}`}
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(212,176,106,0.08)",
                    padding: "28px 30px",
                    transition: "border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,176,106,0.2)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,176,106,0.08)"; }}
                >
                  <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
                    <div>
                      <h3 style={{ fontFamily: "Playfair Display, serif", color: "#F0EDE7", fontSize: 20, fontWeight: 600, margin: 0 }}>
                        {msg.subject}
                      </h3>
                      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
                        <span style={{ color: "#D4B06A", fontSize: 14 }}>{msg.name}</span>
                        <span style={{ color: "#666" }}>|</span>
                        <a href={`mailto:${msg.email}`} style={{ color: "#888", fontSize: 13, textDecoration: "none" }}>{msg.email}</a>
                        {msg.phone && (
                          <>
                            <span style={{ color: "#666" }}>|</span>
                            <span style={{ color: "#888", fontSize: 13 }}>{msg.phone}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {msg.emailSent ? (
                        <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#6b9", fontSize: 12 }}>
                          <CheckCircle size={14} /> Email sent
                        </span>
                      ) : (
                        <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#c84", fontSize: 12 }}>
                          <AlertCircle size={14} /> Email not sent
                        </span>
                      )}
                    </div>
                  </div>

                  <p style={{ color: "#BBBBBB", fontSize: 14, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>
                    {msg.message}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16 }}>
                    <Clock size={12} style={{ color: "#666" }} />
                    <span style={{ color: "#666", fontSize: 12 }}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}

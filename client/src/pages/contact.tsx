import { PageWrapper } from "@/components/page-wrapper";
import { useState, useEffect, useRef } from "react";
import { MapPin, Phone, MessageCircle, Mail, Home } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

export default function Contact() {
  const [, setLoc] = useLocation();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [showButtons, setShowButtons] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const formElRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productsParam = params.get("products");
    if (productsParam) {
      const productList = productsParam;
      setFormData((prev) => ({
        ...prev,
        subject: prev.subject || "Product Enquiry",
        message: prev.message || `I am interested in the following products:\n\n${productList}\n\nPlease share more details.`,
      }));
    }
  }, []);

  useEffect(() => {
    const scrollToForm = () => {
      if (window.location.hash === "#contact-form" && formRef.current) {
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      }
    };
    scrollToForm();
    window.addEventListener("hashchange", scrollToForm);
    return () => window.removeEventListener("hashchange", scrollToForm);
  }, []);

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      setShowButtons(false);
      setSubmitted(true);
    },
  });

  const handleFillComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formElRef.current?.reportValidity()) return;
    setShowButtons(true);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setShowButtons(false);
    setSubmitted(false);
    submitMutation.reset();
  };

  const handleSendEmail = () => {
    const data = { ...formData };
    submitMutation.mutate(data);
  };

  const handleSendWhatsApp = () => {
    const data = { ...formData };
    const waText = encodeURIComponent(
      `Hi, I'm ${data.name}.\n\n` +
      `Subject: ${data.subject}\n\n` +
      `${data.message}\n\n` +
      `Email: ${data.email}` +
      (data.phone ? `\nPhone: ${data.phone}` : "")
    );
    submitMutation.mutate(data);
    window.open(`https://wa.me/919971879595?text=${waText}`, "_blank");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(212,176,106,0.18)",
    color: "#F0EDE7",
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  const btnBase: React.CSSProperties = {
    padding: "16px 28px",
    border: "none",
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "2px",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "opacity 0.3s ease",
    flex: 1,
    minWidth: 180,
    textAlign: "center",
  };

  return (
    <PageWrapper heroImage="/images/hair.jpg" heroTitle="Contact Us" heroSubtitle="We'd love to hear from you. Reach out for inquiries, partnerships, or consultations.">
      <div style={{ borderTop: "1px solid rgba(212,176,106,0.15)" }} />

      <section data-testid="section-contact" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 60 }}>
          <div>
            <p style={{ color: "#D4B06A", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 16 }}>Get in Touch</p>
            <h2 style={{ fontFamily: "Playfair Display, serif", color: "#F0EDE7", fontSize: 32, fontWeight: 600, margin: 0 }}>
              Let's Start a Conversation
            </h2>
            <div style={{ width: 40, height: 1, background: "#D4B06A", margin: "24px 0 36px" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                { label: "Address", value: "A-55 Wazirpur Industrial Area, Delhi 110052", IconComp: MapPin },
                { label: "Phone", value: "9871810055", href: "tel:9871810055", IconComp: Phone },
                { label: "WhatsApp", value: "9971879595", href: "https://wa.me/919971879595", IconComp: MessageCircle },
                { label: "Email", value: "nyturals@gmail.com", href: "mailto:nyturals@gmail.com", IconComp: Mail },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: 16, alignItems: "start" }}>
                  <item.IconComp size={16} style={{ color: "#D4B06A", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p style={{ color: "#9a9590", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 4 }}>{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        data-testid={`link-contact-${item.label.toLowerCase()}`}
                        style={{ color: "#F0EDE7", fontSize: 15, textDecoration: "none", transition: "color 0.3s" }}
                        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#D4B06A"; }}
                        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#F0EDE7"; }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ color: "#F0EDE7", fontSize: 15, margin: 0, lineHeight: 1.6 }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 50, padding: "30px", background: "rgba(212,176,106,0.04)", border: "1px solid rgba(212,176,106,0.1)" }}>
              <p style={{ color: "#D4B06A", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 10 }}>Business Hours</p>
              <p style={{ color: "#c5bfb8", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                Monday &ndash; Saturday: 9:00 AM &ndash; 6:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>

          <div ref={formRef} id="contact-form">
            <form ref={formElRef} onSubmit={handleFillComplete} data-testid="form-contact">
              <div
                style={{
                  background: "rgba(20, 18, 14, 0.65)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(212,176,106,0.12)",
                  padding: "45px 40px",
                }}
              >
                <p style={{ color: "#D4B06A", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 30 }}>Send a Message</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    data-testid="input-name"
                    value={formData.name}
                    onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setShowButtons(false); }}
                    required
                    disabled={submitMutation.isPending}
                    style={{ ...inputStyle, opacity: submitMutation.isPending ? 0.6 : 1 }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(212,176,106,0.4)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(212,176,106,0.18)"; }}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    data-testid="input-email"
                    value={formData.email}
                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setShowButtons(false); }}
                    required
                    disabled={submitMutation.isPending}
                    style={{ ...inputStyle, opacity: submitMutation.isPending ? 0.6 : 1 }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(212,176,106,0.4)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(212,176,106,0.18)"; }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    data-testid="input-phone"
                    value={formData.phone}
                    onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setShowButtons(false); }}
                    disabled={submitMutation.isPending}
                    style={{ ...inputStyle, opacity: submitMutation.isPending ? 0.6 : 1 }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(212,176,106,0.4)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(212,176,106,0.18)"; }}
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    data-testid="input-subject"
                    value={formData.subject}
                    onChange={(e) => { setFormData({ ...formData, subject: e.target.value }); setShowButtons(false); }}
                    required
                    disabled={submitMutation.isPending}
                    style={{ ...inputStyle, opacity: submitMutation.isPending ? 0.6 : 1 }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(212,176,106,0.4)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(212,176,106,0.18)"; }}
                  />
                  <textarea
                    placeholder="Your Message"
                    data-testid="input-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setShowButtons(false); }}
                    required
                    disabled={submitMutation.isPending}
                    style={{ ...inputStyle, resize: "vertical", opacity: submitMutation.isPending ? 0.6 : 1 }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(212,176,106,0.4)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(212,176,106,0.18)"; }}
                  />

                  {!showButtons && !submitted && (
                    <button
                      type="submit"
                      data-testid="button-continue"
                      disabled={submitMutation.isPending}
                      style={{
                        ...btnBase,
                        background: "#D4B06A",
                        color: "#1a1610",
                        marginTop: 6,
                      }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.88"; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}
                    >
                      Continue
                    </button>
                  )}

                  {showButtons && !submitted && (
                    <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
                      <button
                        type="button"
                        data-testid="button-send-whatsapp"
                        onClick={handleSendWhatsApp}
                        disabled={submitMutation.isPending}
                        style={{
                          ...btnBase,
                          background: "#25D366",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 10,
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                      >
                        <MessageCircle size={16} />
                        Send via WhatsApp
                      </button>
                      <button
                        type="button"
                        data-testid="button-send-email"
                        onClick={handleSendEmail}
                        disabled={submitMutation.isPending}
                        style={{
                          ...btnBase,
                          background: "#D4B06A",
                          color: "#1a1610",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 10,
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                      >
                        <Mail size={16} />
                        Send via Email
                      </button>
                    </div>
                  )}

                  {submitMutation.isPending && (
                    <p style={{ color: "#D4B06A", fontSize: 14, textAlign: "center", marginTop: 4 }}>
                      Sending your message...
                    </p>
                  )}

                  {submitted && (
                    <div style={{ textAlign: "center", marginTop: 8 }}>
                      <p data-testid="text-form-success" style={{ color: "#D4B06A", fontSize: 14, marginBottom: 16 }}>
                        Thank you for reaching out. We'll be in touch shortly.
                      </p>
                      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <button
                          type="button"
                          data-testid="button-continue-website"
                          onClick={() => setLoc("/")}
                          style={{
                            padding: "14px 32px",
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
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                          onMouseEnter={(e) => { (e.currentTarget).style.opacity = "0.88"; }}
                          onMouseLeave={(e) => { (e.currentTarget).style.opacity = "1"; }}
                        >
                          <Home size={14} />
                          Continue to Website
                        </button>
                        <button
                          type="button"
                          data-testid="button-send-another"
                          onClick={resetForm}
                          style={{
                            padding: "14px 24px",
                            background: "transparent",
                            border: "1px solid rgba(212,176,106,0.3)",
                            color: "#D4B06A",
                            fontFamily: "Inter",
                            fontSize: 11,
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            transition: "border-color 0.3s ease",
                          }}
                          onMouseEnter={(e) => { (e.currentTarget).style.borderColor = "rgba(212,176,106,0.6)"; }}
                          onMouseLeave={(e) => { (e.currentTarget).style.borderColor = "rgba(212,176,106,0.3)"; }}
                        >
                          Send Another
                        </button>
                      </div>
                    </div>
                  )}

                  {submitMutation.isError && (
                    <p data-testid="text-form-error" style={{ color: "#c44", fontSize: 14, marginTop: 8, textAlign: "center" }}>
                      Something went wrong. Please try again.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

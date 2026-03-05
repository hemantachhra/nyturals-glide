import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nyturals@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0A0A0A; padding: 30px; border-bottom: 2px solid #D4B06A;">
          <h1 style="color: #D4B06A; font-size: 24px; margin: 0;">Nyturals - New Contact Message</h1>
        </div>
        <div style="padding: 30px; background: #1a1a1a; color: #ffffff;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; color: #D4B06A; font-weight: bold; width: 100px;">Name:</td><td style="padding: 10px 0; color: #ffffff;">${data.name}</td></tr>
            <tr><td style="padding: 10px 0; color: #D4B06A; font-weight: bold;">Email:</td><td style="padding: 10px 0; color: #ffffff;"><a href="mailto:${data.email}" style="color: #D4B06A;">${data.email}</a></td></tr>
            <tr><td style="padding: 10px 0; color: #D4B06A; font-weight: bold;">Phone:</td><td style="padding: 10px 0; color: #ffffff;">${data.phone || "Not provided"}</td></tr>
            <tr><td style="padding: 10px 0; color: #D4B06A; font-weight: bold;">Subject:</td><td style="padding: 10px 0; color: #ffffff;">${data.subject}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 20px; background: rgba(212,176,106,0.1); border-left: 3px solid #D4B06A;">
            <p style="color: #D4B06A; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 10px;">Message</p>
            <p style="color: #cccccc; line-height: 1.7; margin: 0;">${data.message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
        <div style="background: #0A0A0A; padding: 15px 30px; text-align: center;">
          <p style="color: #666; font-size: 12px; margin: 0;">Sent from Nyturals website contact form</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: "nyturals@gmail.com",
      to: "nyturals@gmail.com",
      replyTo: data.email,
      subject: `New Contact Form: ${data.subject}`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to send email:", error.message);
    return { success: false, error: error.message };
  }
}

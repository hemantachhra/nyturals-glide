import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { sendContactEmail } from "./gmail";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/download-source", (_req, res) => {
    const filePath = path.resolve("client/public/glamour-site-source.tar.gz");
    res.download(filePath, "glamour-site-source.tar.gz");
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactMessageSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid form data", details: parsed.error.issues });
      }

      const message = await storage.createContactMessage(parsed.data);

      const emailResult = await sendContactEmail(parsed.data);
      if (emailResult.success) {
        await storage.markEmailSent(message.id);
      }

      return res.json({
        success: true,
        emailSent: emailResult.success,
        message: "Your message has been received. We'll be in touch shortly.",
      });
    } catch (error: any) {
      console.error("Contact form error:", error);
      return res.status(500).json({ error: "Failed to process your message. Please try again." });
    }
  });

  app.get("/api/messages", async (_req, res) => {
    try {
      const messages = await storage.getContactMessages();
      return res.json(messages);
    } catch (error: any) {
      console.error("Failed to fetch messages:", error);
      return res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  return httpServer;
}

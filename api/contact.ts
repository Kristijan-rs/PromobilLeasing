// /api/contact.ts
import type { IncomingMessage, ServerResponse } from "http";
import nodemailer from "nodemailer";

// ---- Rate limit (osnovno, po IP, 3 req / 60s) ----
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

// ---- Tipovi & util ----
type Body = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  vehicle?: string;
  gdpr?: boolean;
  company?: string; // honeypot
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const escapeHtml = (s?: string) =>
  (s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

function getClientIp(req: IncomingMessage): string {
  const xf = (req.headers["x-forwarded-for"] || "") as string;
  const ip = xf.split(",")[0]?.trim() || (req.socket && typeof req.socket.remoteAddress === "string" ? req.socket.remoteAddress : "unknown");
  return ip;
}

function json(res: ServerResponse, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.end(JSON.stringify(payload));
}

// ---- Handler ----
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  // Rate limit
  const ip = getClientIp(req);
  if (!rateLimit(ip)) return json(res, 429, { error: "Too many requests" });

  // Content-Type proveri (tražimo JSON)
  const ct = (req.headers["content-type"] || "").toString().toLowerCase();
  if (!ct.includes("application/json")) return json(res, 415, { error: "Unsupported Media Type" });

  // Raw JSON parse (IncomingMessage nema req.body po defaultu)
  const chunks: Uint8Array[] = [];
  for await (const ch of req) chunks.push(ch as Uint8Array);
  let body: Body = {};
  try {
    body = JSON.parse(Buffer.concat(chunks).toString()) as Body;
  } catch {
    return json(res, 400, { error: "Invalid JSON" });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const message = (body.message ?? "").trim();
  const vehicle = (body.vehicle ?? "").trim();
  const gdpr = body.gdpr === true;
  const company = (body.company ?? "").trim(); // honeypot

  // Honeypot → tiho uspeh
  if (company !== "") return json(res, 200, { ok: true });

  // Server-side validacija (min + max dužine)
  if (name.length < 2 || name.length > 120) return json(res, 400, { error: "Invalid name" });
  if (!emailRegex.test(email) || email.length > 200) return json(res, 400, { error: "Invalid email" });
  if (phone.length < 6 || phone.length > 40) return json(res, 400, { error: "Invalid phone" });
  if (message.length < 10 || message.length > 5000) return json(res, 400, { error: "Invalid message" });
  if (!gdpr) return json(res, 400, { error: "GDPR consent required" });

  // ENV (trim da uklonimo skrivene razmake)
  const HOST = (process.env.SMTP_HOST ?? "").trim();          // npr. smtp.ionos.de
  const PORT = Number((process.env.SMTP_PORT ?? "").trim() || 587);
  const USER = (process.env.SMTP_USER ?? "").trim();
  const PASS = (process.env.SMTP_PASS ?? "").trim();
  const MAIL_FROM = ((process.env.MAIL_FROM ?? process.env.SMTP_USER) ?? "").trim();
  const MAIL_TO = ((process.env.MAIL_TO ?? process.env.SMTP_USER) ?? "").trim();

  // Enforce From = User (SPF/DMARC)
  if (MAIL_FROM.toLowerCase() !== USER.toLowerCase()) {
    return json(res, 500, { error: "Mail from/user mismatch" });
  }

  // Guard za ENV
  if (!HOST || !PORT || !USER || !PASS || !MAIL_FROM || !MAIL_TO) {
    // kratko logovanje, bez izlaganja tajni
    console.error("SMTP config missing", {
      HOST: !!HOST,
      PORT,
      USER: !!USER,
      PASS: PASS ? "***" : "",
      FROM: !!MAIL_FROM,
      TO: !!MAIL_TO,
    });
    return json(res, 500, { error: "Server mail config missing" });
  }

  const subject = vehicle ? `Leasinganfrage – ${vehicle}` : "Leasinganfrage über das Kontaktformular";
  const html =
    `<h2>Neue Leasinganfrage</h2>
     <table border="0" cellpadding="6" cellspacing="0" style="border-collapse:collapse">
       <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
       <tr><td><b>E-Mail</b></td><td>${escapeHtml(email)}</td></tr>
       <tr><td><b>Telefon</b></td><td>${escapeHtml(phone)}</td></tr>
       ${vehicle ? `<tr><td><b>Fahrzeug</b></td><td>${escapeHtml(vehicle)}</td></tr>` : ""}
       <tr><td valign="top"><b>Nachricht</b></td><td>${escapeHtml(message)}</td></tr>
       <tr><td><b>DSGVO</b></td><td>${gdpr ? "zugestimmt" : "nicht zugestimmt"}</td></tr>
     </table>`;
  const text =
    `Neue Leasinganfrage\n\n` +
    `Name: ${name}\n` +
    `E-Mail: ${email}\n` +
    `Telefon: ${phone}\n` +
    (vehicle ? `Fahrzeug: ${vehicle}\n` : "") +
    `\nNachricht:\n${message}\n` +
    `\nDSGVO: ${gdpr ? "zugestimmt" : "nicht zugestimmt"}\n`;

  try {
    const transporter = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      secure: PORT === 465,        // 465=SSL, 587=STARTTLS
      requireTLS: PORT === 587,
      authMethod: "LOGIN",
      auth: { user: USER, pass: PASS },
    });

    // verifikacija konekcije/kredecijala (ne logujemo detalje ka klijentu)
    await transporter.verify();

    await transporter.sendMail({
      from: `"${name}" <${MAIL_FROM}>`,
      to: MAIL_TO,
      replyTo: email,
      subject,
      text,
      html,
    });

    return json(res, 200, { ok: true });
  } catch (err) {
    // detaljnu grešku zadržavamo u logu (Vercel Runtime Logs)
    console.error("Mail send error:", err);
    return json(res, 500, { error: "Failed to send mail" });
  }
}

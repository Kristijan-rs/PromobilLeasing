// /api/contact.ts
import type { IncomingMessage, ServerResponse } from "http";
import nodemailer from "nodemailer";

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

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    return json(res, 405, { error: "Method not allowed" });
  }

  // Raw JSON parse (IncomingMessage nema req.body po defaultu)
  const chunks: Uint8Array[] = [];
  for await (const ch of req) chunks.push(ch as Uint8Array);
  let body: Body = {};
  try {
    body = JSON.parse(Buffer.concat(chunks).toString()) as Body;
  } catch {
    // ignore
  }

  const { name, email, phone, message, vehicle, gdpr, company } = body;

  // Honeypot → ako je popunjen, tiho uspeh
  if (typeof company === "string" && company.trim() !== "") {
    return json(res, 200, { ok: true });
  }

  // Server-side validacija
  if (!name || name.trim().length < 2) return json(res, 400, { error: "Invalid name" });
  if (!email || !emailRegex.test(email)) return json(res, 400, { error: "Invalid email" });
  if (!phone || phone.trim().length < 6) return json(res, 400, { error: "Invalid phone" });
  if (!message || message.trim().length < 10) return json(res, 400, { error: "Invalid message" });
  if (gdpr !== true) return json(res, 400, { error: "GDPR consent required" });

  // ENV (trim da uklonimo skrivene razmake)
  const HOST_RAW = (process.env.SMTP_HOST ?? "").trim();         // npr. smtp.ionos.de
  const PORT_RAW = (process.env.SMTP_PORT ?? "").trim();         // "587" ili "465"
  const USER = (process.env.SMTP_USER ?? "").trim();
  const PASS = (process.env.SMTP_PASS ?? "").trim();
  const MAIL_FROM = ((process.env.MAIL_FROM ?? process.env.SMTP_USER) ?? "").trim();
  const MAIL_TO = ((process.env.MAIL_TO ?? process.env.SMTP_USER) ?? "").trim();

  // Guard za ENV
  if (!HOST_RAW || !PORT_RAW || !USER || !PASS || !MAIL_FROM || !MAIL_TO) {
    console.error("SMTP config missing:", { HOST_RAW, PORT_RAW, USER: !!USER, PASS: PASS ? "***" : "" });
    return json(res, 500, { error: "Server mail config missing" });
  }

  // Priprema poruka
  const subject = vehicle && vehicle.trim() ? `Leasinganfrage – ${vehicle}` : "Leasinganfrage über das Kontaktformular";
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

  // === SMTP pokušaji (primarni + fallback) ==============================
  const attempts: Array<{ host: string; port: number; secure: boolean }> = [];

  const primaryPort = Number(PORT_RAW);
  const primaryHost = HOST_RAW;
  const altHost =
    primaryHost.endsWith(".de") ? primaryHost.replace(/\.de$/, ".com")
    : primaryHost.endsWith(".com") ? primaryHost.replace(/\.com$/, ".de")
    : primaryHost; // ako nije .de/.com, ostavi isto

  // Primarni
  attempts.push({ host: primaryHost, port: primaryPort, secure: primaryPort === 465 });

  // Fallback host (isti port)
  if (altHost !== primaryHost) {
    attempts.push({ host: altHost, port: primaryPort, secure: primaryPort === 465 });
  }

  // Fallback port 465 (SSL)
  if (primaryPort !== 465) {
    attempts.push({ host: primaryHost, port: 465, secure: true });
    if (altHost !== primaryHost) attempts.push({ host: altHost, port: 465, secure: true });
  }

  let lastError: unknown = null;

  for (const [i, cfg] of attempts.entries()) {
    try {
      console.log(`SMTP attempt ${i + 1}:`, cfg.host, cfg.port, cfg.secure ? "secure" : "starttls");
      const transporter = nodemailer.createTransport({
        host: cfg.host,
        port: cfg.port,
        secure: cfg.secure,                   // true za 465, false za 587
        requireTLS: !cfg.secure,              // forciraj STARTTLS na 587
        authMethod: "LOGIN",
        auth: { user: USER, pass: PASS }
      });

      // Verifikuj konekciju / kredencijale pre slanja
      await transporter.verify();

      await transporter.sendMail({
        from: `"${name}" <${MAIL_FROM}>`,
        to: MAIL_TO,
        replyTo: email,
        subject,
        text,
        html
      });

      return json(res, 200, { ok: true });
    } catch (e) {
      lastError = e;
      console.error(`SMTP attempt ${i + 1} failed:`, e);
    }
  }

  // Ako su svi pokušaji pali
  console.error("All SMTP attempts failed:", lastError);
  return json(res, 500, {
    error: "Failed to send mail",
    reason: lastError instanceof Error ? lastError.message : String(lastError)
  });
}

// Helper za JSON response
function json(res: ServerResponse, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

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
  company?: string; 

  // [PL] ADDED: dodatni meta-podaci o vozilu
  vehicleTitle?: string;      
  vehicleYear?: number | string;
  vehiclePriceTotal?: number | string;
  vehicleUrl?: string;
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
  const company = (body.company ?? "").trim(); 

  // [PL] ADDED: dodatni meta-podaci o vozilu
  const vehicleTitle = (body.vehicleTitle ?? "").trim();                
  const vehicleYearRaw = (body.vehicleYear ?? "").toString().trim();     
  const vehiclePriceRaw = (body.vehiclePriceTotal ?? "").toString().trim(); 
  const vehicleUrl = (body.vehicleUrl ?? "").trim();                     

  // [PL] ADDED: bezbedno parsiranje brojeva (dozvoli i "12.2023" kao string)
  const vehicleYear =
    vehicleYearRaw && /^\d{2}\.\d{4}$/.test(vehicleYearRaw) ? vehicleYearRaw : 
    (Number.isFinite(Number(vehicleYearRaw)) ? Number(vehicleYearRaw) : "");  

  const vehiclePriceTotal =
    Number.isFinite(Number(vehiclePriceRaw)) ? Number(vehiclePriceRaw) : vehiclePriceRaw; // zadrži kao string ako nije čist broj

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

  // CHANGED: subjekat – koristi naziv vozila ako postoji, fallback na slug ili generički
  const subjectBase =
    vehicleTitle || (vehicle ? `Fahrzeug: ${vehicle}` : "Leasinganfrage");
  const subject = `Leasinganfrage – ${subjectBase}`;

  // CHANGED: HTML poruka – ubačeni meta-podaci o vozilu
  const html =
    `<h2>Neue Leasinganfrage</h2>
     <table border="0" cellpadding="6" cellspacing="0" style="border-collapse:collapse">
       <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
       <tr><td><b>E-Mail</b></td><td>${escapeHtml(email)}</td></tr>
       <tr><td><b>Telefon</b></td><td>${escapeHtml(phone)}</td></tr>
       ${
         vehicleTitle
           ? `<tr><td><b>Fahrzeug</b></td><td>${escapeHtml(vehicleTitle)}</td></tr>`
           : (vehicle ? `<tr><td><b>Fahrzeug (Slug)</b></td><td>${escapeHtml(vehicle)}</td></tr>` : "")
       }
       ${
         vehicleYear !== ""
           ? `<tr><td><b>Baujahr</b></td><td>${escapeHtml(String(vehicleYear))}</td></tr>`
           : ""
       }
       ${
         vehiclePriceRaw
           ? `<tr><td><b>Preis (Brutto)</b></td><td>${escapeHtml(
               typeof vehiclePriceTotal === "number"
                 ? vehiclePriceTotal.toLocaleString("de-DE") + " €"
                 : vehiclePriceTotal
             )}</td></tr>`
           : ""
       }
       ${
         vehicleUrl
           ? `<tr><td><b>Link</b></td><td><a href="${escapeHtml(vehicleUrl)}">${escapeHtml(vehicleUrl)}</a></td></tr>`
           : ""
       }
       <tr><td valign="top"><b>Nachricht</b></td><td>${escapeHtml(message)}</td></tr>
       <tr><td><b>DSGVO</b></td><td>${gdpr ? "zugestimmt" : "nicht zugestimmt"}</td></tr>
     </table>`;

  // CHANGED: Text varijanta (fallback)
  const textLines = [
    "Neue Leasinganfrage",
    "",
    `Name: ${name}`,
    `E-Mail: ${email}`,
    `Telefon: ${phone}`,
  ];
  if (vehicleTitle) textLines.push(`Fahrzeug: ${vehicleTitle}`);
  else if (vehicle) textLines.push(`Fahrzeug (Slug): ${vehicle}`);
  if (vehicleYear !== "") textLines.push(`Baujahr: ${vehicleYear}`);
  if (vehiclePriceRaw) {
    const priceTxt =
      typeof vehiclePriceTotal === "number"
        ? `${vehiclePriceTotal.toLocaleString("de-DE")} €`
        : vehiclePriceTotal;
    textLines.push(`Preis (Brutto): ${priceTxt}`);
  }
  if (vehicleUrl) textLines.push(`Link: ${vehicleUrl}`);
  textLines.push("", "Nachricht:", message, "", `DSGVO: ${gdpr ? "zugestimmt" : "nicht zugestimmt"}`);
  const text = textLines.join("\n");

  try {
    const transporter = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      secure: PORT === 465,       
      requireTLS: PORT === 587,
      authMethod: "LOGIN",
      auth: { user: USER, pass: PASS },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"${escapeHtml(name)}" <${MAIL_FROM}>`,
      to: MAIL_TO,
      replyTo: email,
      subject,
      text,
      html,
    });

    return json(res, 200, { ok: true });
  } catch (err) {
    console.error("Mail send error:", err);
    return json(res, 500, { error: "Failed to send mail" });
  }
}

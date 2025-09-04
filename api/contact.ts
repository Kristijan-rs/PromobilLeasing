// /api/contact.ts
import type { IncomingMessage, ServerResponse } from "http"
import nodemailer from "nodemailer"

type Body = {
  name?: string
  email?: string
  phone?: string
  message?: string
  vehicle?: string
  gdpr?: boolean
  company?: string // honeypot
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const escape = (s?: string) =>
  (s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]!))

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    res.statusCode = 405
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ error: "Method not allowed" }))
    return
  }

  // Parse raw JSON body (Vercel Node: nema req.body po defaultu)
  const chunks: Uint8Array[] = []
  for await (const ch of req) chunks.push(ch as Uint8Array)
  let body: Body = {}
  try { body = JSON.parse(Buffer.concat(chunks).toString()) as Body } catch { /* ignore */ }

  const { name, email, phone, message, vehicle, gdpr, company } = body

  // Honeypot → ako je popunjen, tiho uspešno završiti
  if (typeof company === "string" && company.trim() !== "") {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ ok: true }))
    return
  }

  // Server-side validacija (nikad se ne oslanjamo samo na frontend)
  if (!name || name.trim().length < 2) {
    return json(res, 400, { error: "Invalid name" })
  }
  if (!email || !emailRegex.test(email)) {
    return json(res, 400, { error: "Invalid email" })
  }
  if (!phone || phone.trim().length < 6) {
    return json(res, 400, { error: "Invalid phone" })
  }
  if (!message || message.trim().length < 10) {
    return json(res, 400, { error: "Invalid message" })
  }
  if (gdpr !== true) {
    return json(res, 400, { error: "GDPR consent required" })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,           // smtp.ionos.de
    port: Number(process.env.SMTP_PORT),   // 587
    secure: false,                         // STARTTLS
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  })

  const subject =
    vehicle && vehicle.trim()
      ? `Leasinganfrage – ${vehicle}`
      : "Leasinganfrage über das Kontaktformular"

  const html = `
    <h2>Neue Leasinganfrage</h2>
    <table border="0" cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      <tr><td><b>Name</b></td><td>${escape(name)}</td></tr>
      <tr><td><b>E-Mail</b></td><td>${escape(email)}</td></tr>
      <tr><td><b>Telefon</b></td><td>${escape(phone)}</td></tr>
      ${vehicle ? `<tr><td><b>Fahrzeug</b></td><td>${escape(vehicle)}</td></tr>` : ""}
      <tr><td valign="top"><b>Nachricht</b></td><td>${escape(message)}</td></tr>
      <tr><td><b>DSGVO</b></td><td>${gdpr ? "zugestimmt" : "nicht zugestimmt"}</td></tr>
    </table>
  `
  const text =
    `Neue Leasinganfrage\n\n` +
    `Name: ${name}\n` +
    `E-Mail: ${email}\n` +
    `Telefon: ${phone}\n` +
    (vehicle ? `Fahrzeug: ${vehicle}\n` : "") +
    `\nNachricht:\n${message}\n` +
    `\nDSGVO: ${gdpr ? "zugestimmt" : "nicht zugestimmt"}\n`

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.MAIL_FROM || process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo: email,
      subject,
      text,
      html
    })
    return json(res, 200, { ok: true })
  } catch (err) {
    console.error(err)
    return json(res, 500, { error: "Failed to send mail" })
  }
}

function json(res: ServerResponse, status: number, payload: unknown) {
  res.statusCode = status
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(payload))
}

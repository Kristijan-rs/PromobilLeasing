import type { IncomingMessage, ServerResponse } from "http"
import nodemailer from "nodemailer"

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    res.statusCode = 405
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ error: "Method not allowed" }))
    return
  }

  // Body parsing pošto IncomingMessage nema req.body po defaultu
  const buffers: Uint8Array[] = []
  for await (const chunk of req) {
    buffers.push(chunk as Uint8Array)
  }
  let body: { name?: string; email?: string; message?: string; company?: string } = {}
  try {
    body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    // ignore parse error
  }

  const { name, email, message, company } = body
  if (!name || !email || !message) {
    res.statusCode = 400
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ error: "Missing fields" }))
    return
  }

  // Honeypot anti-bot
  if (typeof company === "string" && company.trim() !== "") {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ ok: true }))
    return
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // STARTTLS na portu 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  const escape = (s?: string) =>
    (s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]!))

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.MAIL_FROM || process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: "Neue Anfrage über das Kontaktformular",
      text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
      html: `<p><b>Name:</b> ${escape(name)}</p><p><b>E-Mail:</b> ${escape(email)}</p><p>${escape(message)}</p>`
    })

    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ ok: true }))
  } catch (err) {
    console.error(err)
    res.statusCode = 500
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ error: "Failed to send mail" }))
  }
}

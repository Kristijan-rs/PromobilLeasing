import { useState } from "react"

interface FormData {
  name: string
  email: string
  message: string
  company?: string 
}

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const form = e.currentTarget

    const data: FormData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
      company: (form.elements.namedItem("company") as HTMLInputElement)?.value.trim() || undefined
    }

    // Validacija email formata
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      setError("Bitte geben Sie eine gültige E-Mail-Adresse ein.")
      setLoading(false)
      return
    }

    // Minimalna dužina poruke
    if (data.message.length < 10) {
      setError("Die Nachricht muss mindestens 10 Zeichen enthalten.")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      if (!res.ok) {
        const { error: serverError } = (await res.json()) as { error?: string }
        throw new Error(serverError || "Fehler beim Senden der Nachricht")
      }

      setSuccess(true)
      form.reset()
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unbekannter Fehler"
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto space-y-4 p-6 bg-white rounded-xl shadow"
    >
      <h2 className="text-2xl font-bold text-center">Kontaktformular</h2>

      {success && (
        <p className="p-2 text-green-700 bg-green-100 rounded">
          ✅ Ihre Nachricht wurde erfolgreich gesendet.
        </p>
      )}
      {error && (
        <p className="p-2 text-red-700 bg-red-100 rounded">
          ❌ {error}
        </p>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded border p-2 focus:ring focus:border-blue-400"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          E-Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded border p-2 focus:ring focus:border-blue-400"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full rounded border p-2 focus:ring focus:border-blue-400"
        />
      </div>

      {/* Honeypot (skriveno polje) */}
      <input
        type="text"
        name="company"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Wird gesendet…" : "Senden"}
      </button>
    </form>
  )
}

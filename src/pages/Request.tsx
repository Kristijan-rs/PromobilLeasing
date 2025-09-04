// src/pages/Request.tsx
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "react-router-dom"

const RequestSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail ein."),
  phone: z.string().min(6, "Telefonnummer ist zu kurz."),
  message: z.string().min(10, "Nachricht zu kurz."),
  vehicle: z.string().optional(),
  gdpr: z.boolean().refine(v => v === true, { message: "Bitte stimmen Sie der Verarbeitung zu." }),
  company: z.string().optional() // honeypot
})
type RequestForm = z.infer<typeof RequestSchema>

export default function RequestPage() {
  const [params] = useSearchParams()
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<RequestForm>({
    resolver: zodResolver(RequestSchema),
    defaultValues: { vehicle: "", gdpr: false, company: "" }
  })

  // Ako dođe ?vehicle=BMW-420d ili slično — upiši ga u hidden polje
  useEffect(() => {
    const v = params.get("vehicle")
    if (v) setValue("vehicle", v)
  }, [params, setValue])

  async function onSubmit(data: RequestForm) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      const out = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !out.ok) throw new Error(out.error || "Fehler beim Senden")

      // uspeh → očisti formu (vehicle ostavi ako dolazi iz URL-a)
      resetField("name")
      resetField("email")
      resetField("phone")
      resetField("message")
      resetField("gdpr")
      resetField("company")
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unbekannter Fehler"
      // jednostavan fallback UX; možeš zameniti toast-om
      alert(`Senden fehlgeschlagen: ${msg}`)
    }
  }

  return (
    <div className="max-w-2xl rounded-2xl shadow-lg mx-auto mt-10 p-10 bg-white">
      <h1 className="text-2xl font-semibold mb-6">Leasinganfrage</h1>

      {isSubmitSuccessful && (
        <p role="status" aria-live="polite" className="mb-4 rounded bg-green-100 text-green-800 px-3 py-2">
          ✅ Vielen Dank für Ihre Anfrage. Wir melden uns zeitnah.
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label className="block text-sm font-medium" htmlFor="name">Name</label>
          <input id="name" type="text" {...register("name")}
                 className="mt-1 w-full rounded-lg border px-3 py-2" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="email">E-Mail</label>
          <input id="email" type="email" {...register("email")}
                 className="mt-1 w-full rounded-lg border px-3 py-2" />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="phone">Telefon</label>
          <input id="phone" type="tel" {...register("phone")}
                 className="mt-1 w-full rounded-lg border px-3 py-2" />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="message">Nachricht</label>
          <textarea id="message" rows={4} {...register("message")}
                    className="mt-1 w-full rounded-lg border px-3 py-2" />
          {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
        </div>

        {/* Hidden vehicle (može doći iz URL-a) */}
        <input type="hidden" {...register("vehicle")} />

        {/* Honeypot (skriveno) */}
        <input type="text" {...register("company")} className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="flex items-start gap-2">
          <input id="gdpr" type="checkbox" {...register("gdpr")} className="mt-1" />
          <label htmlFor="gdpr" className="text-sm">
            Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.
          </label>
        </div>
        {errors.gdpr && <p className="text-sm text-red-600">{errors.gdpr.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 px-6 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-950 disabled:opacity-50 cursor-pointer transition"
        >
          {isSubmitting ? "Senden…" : "Anfrage senden"}
        </button>
      </form>
    </div>
  )
}

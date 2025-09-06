// src/pages/Request.tsx
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "react-router-dom"

// Vozila
import vehicles from "@/features/vehicles/vehicles.data"

// [PL] CHANGED: uvozim i caddyBreakdown + getMonthlyRate iz tvog pricing.ts
import { formatEUR, getMonthlyRate, caddyBreakdown } from "@/lib/pricing" // [PL] CHANGED

const RequestSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail ein."),
  phone: z.string().min(6, "Telefonnummer ist zu kurz."),
  message: z.string().min(10, "Nachricht zu kurz."),
  vehicle: z.string().optional(),
  vehicleTitle: z.string().optional(),
  vehicleYear: z.union([z.number(), z.string()]).optional(),
  vehiclePriceTotal: z.union([z.number(), z.string()]).optional(),
  vehicleUrl: z.string().url().optional(),
  gdpr: z.boolean().refine((v) => v === true, { message: "Bitte stimmen Sie der Verarbeitung zu." }),
  company: z.string().optional(), // honeypot
})
type RequestForm = z.infer<typeof RequestSchema>

export default function RequestPage() {
  const [params] = useSearchParams()

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RequestForm>({
    resolver: zodResolver(RequestSchema),
    defaultValues: {
      vehicle: "",
      vehicleTitle: "",
      vehicleYear: undefined,
      vehiclePriceTotal: undefined,
      vehicleUrl: "",
      gdpr: false,
      company: "",
    },
  })

  const slug = params.get("vehicle") ?? ""
  const v = useMemo(() => vehicles.find((x) => x.slug === slug), [slug])

  // Popuni hidden polja (bez prefill-a u textarea)
  useEffect(() => {
    if (!slug || !v) return
    setValue("vehicle", slug)
    setValue("vehicleTitle", `${v.brand} ${v.model}`)
    setValue("vehicleYear", v.year as unknown as number)
    setValue("vehiclePriceTotal", v.priceTotal)
    setValue("vehicleUrl", `${window.location.origin}/cars/${slug}`)
  }, [slug, v, setValue])

  // [PL] ADDED: svi proračuni ISKLJUČIVO preko pricing.ts
  const priceNet = v ? (v.priceNeto ?? Math.round(v.priceTotal / 1.19)) : 0 // fallback ako nema priceNeto
  const months = 30 // možeš promeniti, ali koristimo isti kroz oba poziva
  const bd = v ? caddyBreakdown(priceNet, { months }) : null // { priceNet, downNet, residualNet, months, monthlyNet, monthlyGross } // [PL] ADDED
  

  async function onSubmit(data: RequestForm) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const out = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !out.ok) throw new Error(out.error || "Fehler beim Senden")

      resetField("name")
      resetField("email")
      resetField("phone")
      resetField("message")
      resetField("gdpr")
      resetField("company")
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unbekannter Fehler"
      alert(`Senden fehlgeschlagen: ${msg}`)
    }
  }

  return (
    <div className="max-w-2xl rounded-2xl shadow-lg mx-auto mt-10 p-10 bg-white">
      <h1 className="text-2xl font-semibold mb-6">Leasinganfrage</h1>

      {/* [PL] ADDED: sažetak vozila + SVI PODACI iz pricing.ts (nema ručnog računanja ovde) */}
      {v && bd && (
        <div className="mb-6 rounded-xl border bg-gray-50 p-4 text-sm">
          <div className="mb-2 text-base font-semibold">
            {v.brand} {v.model}
          </div>
          <div className="mb-1">
            <b>Link:</b>{" "}
            <a href={`/cars/${v.slug}`} className="underline" target="_blank" rel="noreferrer">
              /cars/{v.slug}
            </a>
          </div>
          <div className="mb-1">
            <b>Kaufpreis (Brutto):</b> {formatEUR(v.priceTotal)}
          </div>

          {/* Traženi prikaz */}
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 mt-2">
            <div><b>Anschaffungswert:</b> {formatEUR(bd.priceNet)} netto</div>      
            <div><b>Vertragslaufzeit:</b> {bd.months} Monate</div>                  
            <div><b>Sonderzahlung:</b> {formatEUR(bd.downNet)} netto</div>           
            <div><b>Restwert:</b> {formatEUR(bd.residualNet)} netto</div>            
            <div><b>Monatsrate (netto):</b> {formatEUR(bd.monthlyNet)}</div>        
        
          </div>

          
        </div>
      )}

      {isSubmitSuccessful && (
        <p role="status" aria-live="polite" className="mb-4 rounded bg-green-100 text-green-800 px-3 py-2">
          ✅ Vielen Dank für Ihre Anfrage. Wir melden uns zeitnah.
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label className="block text-sm font-medium" htmlFor="name">Name</label>
          <input id="name" type="text" {...register("name")} className="mt-1 w-full rounded-lg border px-3 py-2" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="email">E-Mail</label>
          <input id="email" type="email" {...register("email")} className="mt-1 w-full rounded-lg border px-3 py-2" />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="phone">Telefon</label>
          <input id="phone" type="tel" {...register("phone")} className="mt-1 w-full rounded-lg border px-3 py-2" />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        {/* Textarea ostaje prazna */}
        <div>
          <label className="block text-sm font-medium" htmlFor="message">Nachricht</label>
          <textarea id="message" rows={4} {...register("message")} className="mt-1 w-full rounded-lg border px-3 py-2" />
          {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
        </div>

        {/* Hidden vehicle meta-podaci */}
        <input type="hidden" {...register("vehicle")} />
        <input type="hidden" {...register("vehicleTitle")} />
        <input type="hidden" {...register("vehicleYear")} />
        <input type="hidden" {...register("vehiclePriceTotal")} />
        <input type="hidden" {...register("vehicleUrl")} />

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

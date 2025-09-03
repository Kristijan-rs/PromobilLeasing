import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RequestSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail ein."),
  phone: z.string().min(6, "Telefonnummer ist zu kurz."),
  message: z.string().min(10, "Nachricht zu kurz."),
  vehicle: z.string().optional(), 
  gdpr: z
    .boolean()
    .refine((v) => v === true, { message: "Bitte stimmen Sie der Verarbeitung zu." }),
});

type RequestForm = z.infer<typeof RequestSchema>;

export default function RequestPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestForm>({
    resolver: zodResolver(RequestSchema),
    defaultValues: {
      vehicle: "", 
      gdpr: false,
    },
  });

  const onSubmit = (data: RequestForm) => {
    console.log("Request form submitted:", data);
    alert("Vielen Dank für Ihre Anfrage! (wird später an API gesendet)");
  };

  return (
    <div className="max-w-2xl rounded-2xl shadow-lg mx-auto mt-10  p-10 bg-white">
      <h1 className="text-2xl font-semibold mb-6 ">Leasinganfrage</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            {...register("name")}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">E-Mail</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Telefon</label>
          <input
            type="tel"
            {...register("phone")}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Nachricht</label>
          <textarea
            rows={4}
            {...register("message")}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
          {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
        </div>

        <input type="hidden" {...register("vehicle")} />

        <div className="flex items-start gap-2">
          <input type="checkbox" {...register("gdpr")} className="mt-1" />
          <label className="text-sm">
            Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.
          </label>
        </div>
        {errors.gdpr && <p className="text-sm text-red-600">{errors.gdpr.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 px-6 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-950 disabled:opacity-50 cursor-pointer transition"
        >
          {isSubmitting ? "Senden..." : "Anfrage senden"}
        </button>
      </form>
    </div>
  );
}

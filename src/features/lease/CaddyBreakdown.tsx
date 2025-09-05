import { formatEUR, caddyBreakdown } from "@/lib/pricing";

type Props = { priceNet: number; months?: number; downPct?: number; residualPct?: number };

export default function CaddyBreakdown({ priceNet, months = 30, downPct = 0.30, residualPct = 0.30 }: Props) {
  const b = caddyBreakdown(priceNet, { months, downPct, residualPct });
  return (
    <section className="rounded-2xl border p-4 bg-white shadow-sm w-[300px]">
      <h3 className="text-lg font-semibold mb-3 text-center">Leasingdetails</h3>
      <div className="grid gap-2 text-sm">
        <Row k="Anschaffungswert" v={`${formatEUR(b.priceNet)} netto`} />
        <Row k="Sonderzahlung" v={`${formatEUR(b.downNet)} netto`} />
        <Row k="Restwert" v={`${formatEUR(b.residualNet)} netto`} />
        <Row k="Vertragslaufzeit" v={`${b.months} Monate`} />
        <Row k="Monatsrate (netto)" v={formatEUR(b.monthlyNet)} bold />
      </div>
    </section>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-neutral-600">{k}</span>
      <span className={bold ? "font-semibold" : ""}>{v}</span>
    </div>
  );
}

export function formatEUR(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(value);
}

export function getMonthlyRate(
  priceNeto: number,
  pricePerMonth?: number,
  opts?: {
    months?: number;
    downPct?: number;
    residualPct?: number;
    vat?: number;
    gross?: boolean;
    reference?: { priceNeto: number; monthlyNet: number; months?: number; downPct?: number; residualPct?: number };
  }
): number {
  const manual = (pricePerMonth ?? 0) > 0 ? pricePerMonth! : undefined;
  if (manual) return manual;
  const months = opts?.months ?? 30;
  const downPct = opts?.downPct ?? 0.30;
  const residualPct = opts?.residualPct ?? 0.30;
  const vat = opts?.vat ?? 0.19;
  const ref = opts?.reference ?? { priceNeto: 29500, monthlyNet: 740, months, downPct, residualPct };
  const refMonths = ref.months ?? months;
  const refDown = ref.downPct ?? downPct;
  const refResidual = ref.residualPct ?? residualPct;
  const linearRef = (ref.priceNeto * (1 - refDown - refResidual)) / refMonths;
  const factor = ref.monthlyNet / linearRef;
  const linearInput = (priceNeto * (1 - downPct - residualPct)) / months;
  const monthlyNet = factor * linearInput;
  const value = opts?.gross ? monthlyNet * (1 + vat) : monthlyNet;
  return Math.round(value);
}

export function caddyBreakdown(
  priceNeto: number,
  opts?: { months?: number; downPct?: number; residualPct?: number; vat?: number }
) {
  const months = opts?.months ?? 30;
  const downPct = opts?.downPct ?? 0.30;
  const residualPct = opts?.residualPct ?? 0.25;
  const vat = opts?.vat ?? 0.19;
  const downNet = Math.round(priceNeto * downPct);
  const residualNet = Math.round(priceNeto * residualPct);
  const monthlyNet = getMonthlyRate(priceNeto, undefined, { months, downPct, residualPct, vat, gross: false });
  const monthlyGross = getMonthlyRate(priceNeto, undefined, { months, downPct, residualPct, vat, gross: true });
  return { priceNet: priceNeto, downNet, residualNet, months, monthlyNet, monthlyGross };
}

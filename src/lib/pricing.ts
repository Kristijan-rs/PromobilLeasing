// src/utils/pricing.ts

export function formatEUR(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(value);
}

/**
 * Vraća mesečnu BRUTTO ratu iz BRUTTO cene.
 * Računa linearno: priceTotal / months.
 */
export function getMonthlyRate(
  priceTotal: number,
  pricePerMonth?: number,
  opts?: { months?: number }
): number {
  const manual = (pricePerMonth ?? 0) > 0 ? pricePerMonth! : undefined;
  if (manual) return manual;

  const months = opts?.months ?? 30;
  return Math.round(priceTotal / months);
}

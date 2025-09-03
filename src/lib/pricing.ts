// Formatiert eine Zahl als EUR-Wert (z. B. 59.990 €).

export function formatEUR(value: number): string {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
    }).format(value)
}

export function calculateMonthlyRate(priceTotal: number): number {
    return Math.round(priceTotal * 0.02)
}

export function getMonthlyRate(
    priceTotal: number,
    pricePerMonth?: number
): number {
    const manual = (pricePerMonth ?? 0) > 0 ? pricePerMonth! : undefined
    return manual ?? calculateMonthlyRate(priceTotal)
}
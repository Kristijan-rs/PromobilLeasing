const STORAGE_KEY = "promobil.consent.v1";

export type ConsentStatus = "accepted" | "declined" | "unset";

export function getConsent(): ConsentStatus {
  return (localStorage.getItem(STORAGE_KEY) as ConsentStatus) ?? "unset";
}

export function setConsent(status: ConsentStatus) {
  localStorage.setItem(STORAGE_KEY, status);
}

export function hasConsent() {
  return getConsent() === "accepted";
}

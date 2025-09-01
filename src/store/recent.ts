const KEY = "promobil.recent.v1";
const LIMIT = 8;

export function getRecent(): string[] {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return [];
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? (arr as string[]) : [];
    } catch {
        return [];
    }
}

export function addRecent(slug: string) {
    try {
        const cur = getRecent().filter((s) => s !== slug);
        cur.unshift(slug);
        const next = cur.slice(0, LIMIT);
        localStorage.setItem(KEY, JSON.stringify(next)); 
      } catch {
        /* noop */
      }
}

export function clearRecent() {
    try {
        localStorage.removeItem(KEY);
        dispatchStorageEvent();
    } catch {
         /* noop */
    }
}

function dispatchStorageEvent() {
    try {
        window.dispatchEvent(new StorageEvent("storage", {key: KEY}));
    } catch {
       /* noop */ 
    }
}
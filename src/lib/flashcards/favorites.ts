const KEY = "flashcards-favorites-v1";

export function loadFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

export function saveFavorites(favs: Set<string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify([...favs]));
}

export function toggleFavorite(favs: Set<string>, id: string): Set<string> {
  const next = new Set(favs);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  saveFavorites(next);
  return next;
}

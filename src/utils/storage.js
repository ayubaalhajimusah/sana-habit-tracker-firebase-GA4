import { getDefaultHabits } from "../data/defaultHabits.js";
export const HABITS_KEY = "sana_habit_tracker_habits";
export const THEME_KEY = "sana_habit_tracker_theme";

const isValid = (h) =>
  h && typeof h.id !== "undefined" && typeof h.name === "string" && h.name.trim() &&
  Array.isArray(h.completionDates);

export function loadHabits() {
  try {
    const raw = localStorage.getItem(HABITS_KEY);
    if (raw === null) return getDefaultHabits();
    const data = JSON.parse(raw);
    if (Array.isArray(data) && data.every(isValid)) return data; // an empty list is valid
  } catch { /* fall through to defaults */ }
  return getDefaultHabits();
}
export function saveHabits(habits) {
  try { localStorage.setItem(HABITS_KEY, JSON.stringify(habits)); } catch { /* storage full/blocked */ }
}
export function loadTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    if (t === "light" || t === "dark") return t;
  } catch { /* ignore */ }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
export function saveTheme(t) {
  try { localStorage.setItem(THEME_KEY, t); } catch { /* ignore */ }
}

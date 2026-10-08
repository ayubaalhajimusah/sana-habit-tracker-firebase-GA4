import { dateKey, daysAgo, currentWeek } from "./dates.js";

export const isDone = (h, key = dateKey()) => h.completionDates.includes(key);

export function todayStats(habits) {
  const done = habits.filter((h) => isDone(h)).length;
  const total = habits.length;
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}
export function weekStats(habits) {
  return currentWeek().map(({ name, key }) => {
    const done = habits.filter((h) => isDone(h, key)).length;
    const total = habits.length;
    return { name, key, done, total, percent: total ? Math.round((done / total) * 100) : 0 };
  });
}
// An "active day" = at least one habit completed that day.
export function streaks(habits) {
  const days = new Set(habits.flatMap((h) => h.completionDates));
  let current = 0;
  let i = days.has(dateKey()) ? 0 : 1; // today not done yet? streak can still be alive from yesterday
  while (days.has(daysAgo(i))) { current++; i++; }
  const sorted = [...days].sort();
  let best = 0, run = 0, prev = null;
  for (const d of sorted) {
    const gap = prev ? Math.round((new Date(d) - new Date(prev)) / 86400000) : 0;
    run = prev && gap === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  return { current, best };
}
export function summary(habits) {
  const week = weekStats(habits);
  const thisWeek = week.reduce((s, d) => s + d.done, 0);
  const possible = week.filter((d) => d.key <= dateKey()).length * habits.length;
  const rate = possible ? Math.round((thisWeek / possible) * 100) : 0;
  return { ...streaks(habits), thisWeek, rate };
}

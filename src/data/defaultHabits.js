import { daysAgo } from "../utils/dates.js";

const base = [
  ["Drink 2L of water", "Health", "Stay hydrated throughout the day"],
  ["Exercise for 30 minutes", "Fitness", "Complete a short workout"],
  ["Practice Python", "Learning", "Spend time improving Python skills"],
  ["Study GA4", "Learning", "Practice analytics concepts"],
  ["Read for 20 minutes", "Personal", "Read a book or useful article"],
  ["Walk 5,000 steps", "Fitness", "Get some movement during the day"],
];

// Past days get some demo completions so Progress and streaks have data.
// Today starts empty.
export function getDefaultHabits() {
  return base.map(([name, category, description], i) => ({
    id: i + 1,
    name, category, description,
    frequency: "Daily",
    completionDates: [1, 2, 3, 4, 5, 6].filter((n) => (n + i) % 3 !== 0).map(daysAgo),
  }));
}

// Dates are stored as local "YYYY-MM-DD" strings.
export function dateKey(d = new Date()) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}
export function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return dateKey(d);
}
export function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}
// Monday..Sunday of the current week
export function currentWeek() {
  const now = new Date();
  const offset = (now.getDay() + 6) % 7;
  const names = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  return names.map((name, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - offset + i);
    return { name, key: dateKey(d) };
  });
}

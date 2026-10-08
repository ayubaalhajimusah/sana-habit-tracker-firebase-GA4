import { useEffect, useState } from "react";
import "./firebase.js";
import Header from "./components/Header.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Progress from "./pages/Progress.jsx";
import About from "./pages/About.jsx";
import { loadHabits, saveHabits, loadTheme, saveTheme } from "./utils/storage.js";
import { getDefaultHabits } from "./data/defaultHabits.js";
import { dateKey } from "./utils/dates.js";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [habits, setHabits] = useState(loadHabits);
  const [theme, setTheme] = useState(loadTheme);

  useEffect(() => { saveHabits(habits); }, [habits]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  // Returns an error message string, or nothing on success.
  function addHabit({ name, category, frequency, description }) {
  if (!name) return "Enter a habit name.";
  if (habits.some((h) => h.name.toLowerCase() === name.toLowerCase())) return "You already have a habit with this name.";

  const id = Math.max(0, ...habits.map((h) => Number(h.id) || 0)) + 1;

  setHabits([...habits, { id, name, category, frequency, description, completionDates: [] }]);

  window.gtag?.("event", "habit_added", {
    habit_name: name,
    habit_category: category,
    habit_frequency: frequency,
  });
}
  function toggleHabit(id) {
  const today = dateKey();

  const habit = habits.find((h) => h.id === id);

  if (!habit) return;

  const isCompleted = habit.completionDates.includes(today);

  setHabits(
    habits.map((h) =>
      h.id !== id
        ? h
        : {
            ...h,
            completionDates: isCompleted
              ? h.completionDates.filter((d) => d !== today)
              : [...h.completionDates, today],
          }
    )
  );

  // Send a GA4 event only when the habit is completed
  if (!isCompleted) {
    window.gtag?.("event", "habit_completed", {
      habit_name: habit.name,
      habit_category: habit.category,
      habit_frequency: habit.frequency,
    });
  }
}
  function deleteHabit(id) {
  const habit = habits.find((h) => h.id === id);

  if (!habit) return;

  setHabits(habits.filter((h) => h.id !== id));

  window.gtag?.("event", "habit_deleted", {
    habit_name: habit.name,
    habit_category: habit.category,
  });
}
  function toggleTheme() {
  const newTheme = theme === "dark" ? "light" : "dark";

  setTheme(newTheme);

  window.gtag?.("event", "theme_changed", {
    theme: newTheme,
  });
}
  function resetDemo() {
  if (window.confirm("Reset demo data? Your habits and completion history will be replaced with the defaults.")) {
    setHabits(getDefaultHabits()); // theme is stored separately and is kept
    setPage("dashboard");

    window.gtag?.("event", "demo_reset");
  }
}
  return (
    <div className="app">
      <Header page={page} onNavigate={setPage} theme={theme} onToggleTheme={toggleTheme} onReset={resetDemo} />
      <main>
        {page === "dashboard" && <Dashboard habits={habits} onAdd={addHabit} onToggle={toggleHabit} onDelete={deleteHabit} />}
        {page === "progress" && <Progress habits={habits} />}
        {page === "about" && <About />}
      </main>
    </div>
  );
}

import { useState } from "react";
import HabitCard from "../components/HabitCard.jsx";
import HabitForm, { CATEGORIES } from "../components/HabitForm.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { greeting } from "../utils/dates.js";
import { todayStats, isDone } from "../utils/statistics.js";

export default function Dashboard({ habits, onAdd, onToggle, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const { done, total, percent } = todayStats(habits);

  const visible = habits.filter((h) =>
    (status === "All" || (status === "Completed") === isDone(h)) &&
    (category === "All Categories" || h.category === category) &&
    h.name.toLowerCase().includes(search.trim().toLowerCase()));

  function handleAdd(data) {
    const err = onAdd(data);
    if (!err) setShowForm(false);
    return err;
  }
  function clearFilters() { setStatus("All"); setCategory("All Categories"); setSearch(""); }

  return (
    <>
      <section className="welcome">
        <h2>{greeting()} 👋</h2>
        <p className="muted">Small actions become big results.</p>
      </section>

      <section className="card today" aria-labelledby="today-h">
        <h2 id="today-h">Today's Progress</h2>
        <p className="big">{done} / {total} <span className="muted small">completed</span></p>
        <ProgressBar percent={percent} label="Today's completion" />
        <p className="muted small">{percent}%</p>
      </section>

      <section aria-labelledby="habits-h">
        <div className="section-head">
          <h2 id="habits-h">Your habits</h2>
          {!showForm && <button className="btn primary" onClick={() => setShowForm(true)}>+ Add Habit</button>}
        </div>
        {showForm && <HabitForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />}

        <div className="filters">
          <div role="group" aria-label="Filter by status" className="seg">
            <span className="muted small">Show:</span>
            {["All", "Completed", "Remaining"].map((s) => (
              <button key={s} className={`chip ${status === s ? "on" : ""}`} aria-pressed={status === s}
                onClick={() => setStatus(s)}>{s}</button>
            ))}
          </div>
          <label className="sr" htmlFor="cat-filter">Category</label>
          <select id="cat-filter" value={category} onChange={(e) => setCategory(e.target.value)}>
            {["All Categories", ...CATEGORIES].map((c) => <option key={c}>{c}</option>)}
          </select>
          <label className="sr" htmlFor="search">Search habits</label>
          <input id="search" type="search" placeholder="Search habits..." value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>

        {habits.length === 0 ? (
          <EmptyState title="No habits yet." text="Add your first habit to start tracking.">
            <button className="btn primary" onClick={() => setShowForm(true)}>+ Add Habit</button>
          </EmptyState>
        ) : visible.length === 0 ? (
          <EmptyState title="No habits found." text="Try a different search term or filter.">
            <button className="btn" onClick={clearFilters}>Clear filters</button>
          </EmptyState>
        ) : (
          <ul className="list">
            {visible.map((h) => <HabitCard key={h.id} habit={h} onToggle={onToggle} onDelete={onDelete} />)}
          </ul>
        )}
      </section>
    </>
  );
}

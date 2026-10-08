import { isDone } from "../utils/statistics.js";

export default function HabitCard({ habit, onToggle, onDelete }) {
  const done = isDone(habit);
  return (
    <li className={`card habit ${done ? "done" : ""}`}>
      <div className="habit-info">
        <h3>{habit.name}</h3>
        {habit.description && <p className="muted small">{habit.description}</p>}
        <p className="tags">
          <span className="tag">{habit.category}</span>
          <span className="tag">{habit.frequency}</span>
          <span className="tag">{done ? "Completed today" : "Not done yet"}</span>
        </p>
      </div>
      <div className="habit-actions">
        <button className={done ? "btn" : "btn primary"} onClick={() => onToggle(habit.id)}>
          {done ? "↩ Undo" : "✓ Complete"}
        </button>
        <button className="btn ghost danger" onClick={() => onDelete(habit.id)} aria-label={`Delete habit: ${habit.name}`}>
          Delete
        </button>
      </div>
    </li>
  );
}

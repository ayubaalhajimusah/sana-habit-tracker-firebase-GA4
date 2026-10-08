import { useState } from "react";
export const CATEGORIES = ["Health", "Fitness", "Learning", "Personal"];
export const FREQUENCIES = ["Daily", "Weekdays", "3 times a week", "Weekly"];

export default function HabitForm({ onAdd, onCancel }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Health");
  const [frequency, setFrequency] = useState("Daily");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const err = onAdd({ name: name.trim(), category, frequency, description: description.trim() });
    if (err) setError(err);
  }
  return (
    <form className="card form" onSubmit={submit} noValidate>
      <h2>New habit</h2>
      <label htmlFor="h-name">Habit name</label>
      <input id="h-name" value={name} autoFocus maxLength={60}
        onChange={(e) => { setName(e.target.value); setError(""); }}
        aria-invalid={!!error} aria-describedby={error ? "h-err" : undefined} />
      {error && <p id="h-err" className="error" role="alert">{error}</p>}
      <div className="row2">
        <div>
          <label htmlFor="h-cat">Category</label>
          <select id="h-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="h-freq">Frequency</label>
          <select id="h-freq" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
            {FREQUENCIES.map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>
      </div>
      <label htmlFor="h-desc">Description (optional)</label>
      <textarea id="h-desc" rows={2} maxLength={140} value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="form-actions">
        <button type="submit" className="btn primary">Add Habit</button>
        <button type="button" className="btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

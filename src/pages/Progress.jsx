import StatCard from "../components/StatCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { weekStats, summary } from "../utils/statistics.js";
import { dateKey } from "../utils/dates.js";

export default function Progress({ habits }) {
  const week = weekStats(habits);
  const s = summary(habits);
  return (
    <>
      <h2>Progress</h2>
      <section className="grid4" aria-label="Summary">
        <StatCard label="Current streak" value={`${s.current} ${s.current === 1 ? "day" : "days"}`} note="Days in a row with at least one habit done" />
        <StatCard label="Best streak" value={`${s.best} ${s.best === 1 ? "day" : "days"}`} />
        <StatCard label="This week" value={`${s.thisWeek} completions`} />
        <StatCard label="Completion rate" value={`${s.rate}%`} note="This week so far" />
      </section>
      <section className="card" aria-labelledby="week-h">
        <h3 id="week-h">Weekly overview</h3>
        {habits.length === 0 && <p className="muted">Add habits on the Dashboard to see weekly progress.</p>}
        <ul className="week">
          {week.map((d) => (
            <li key={d.key} className={d.key === dateKey() ? "today-row" : ""}>
              <span className="day">{d.name}</span>
              <ProgressBar percent={d.percent} label={`${d.name} completion`} />
              <span className="small muted">{d.done}/{d.total} · {d.percent}%</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

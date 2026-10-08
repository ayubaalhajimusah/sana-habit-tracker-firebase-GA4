export default function StatCard({ label, value, note }) {
  return (
    <div className="card stat">
      <p className="muted">{label}</p>
      <p className="stat-value">{value}</p>
      {note && <p className="muted small">{note}</p>}
    </div>
  );
}

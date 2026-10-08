import { useState } from "react";
const PAGES = [["dashboard", "Dashboard"], ["progress", "Progress"], ["about", "About"]];

export default function Header({ page, onNavigate, theme, onToggleTheme, onReset }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="header-top">
        <div>
          <h1 className="brand">Sana Habit Tracker</h1>
          <p className="muted small">Build small habits. See your progress.</p>
        </div>
        <button className="btn menu-btn" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <div id="main-nav" className={`nav-wrap ${open ? "open" : ""}`}>
        <nav aria-label="Main">
          {PAGES.map(([id, label]) => (
            <button key={id} className={`nav-link ${page === id ? "active" : ""}`}
              aria-current={page === id ? "page" : undefined}
              onClick={() => {
  onNavigate(id);
  setOpen(false);

  if (id === "progress") {
    window.gtag?.("event", "progress_viewed");
  }
}}
>{label}</button>
          ))}
        </nav>
        <div className="tools">
          <button className="btn" onClick={onToggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? "☀ Light" : "☾ Dark"}
          </button>
          <button className="btn ghost" onClick={onReset}>Reset Demo Data</button>
        </div>
      </div>
    </header>
  );
}

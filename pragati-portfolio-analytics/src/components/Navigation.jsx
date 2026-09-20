import { NAV } from "../data/analyticsData";

export default function Navigation({ active, onSelect }) {
  return (
    <nav className="nav">
      {NAV.map((n) => (
        <a
          key={n}
          href="#"
          className={n === active ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            onSelect(n);
          }}
        >
          {n}
        </a>
      ))}
    </nav>
  );
}

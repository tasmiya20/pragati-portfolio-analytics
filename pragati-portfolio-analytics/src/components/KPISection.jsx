import { AlertTriangle, BarChart3, FileText, IndianRupee } from "lucide-react";
import KPICard from "./KPICard";
import { SECTORS, fmt } from "../data/analyticsData";

export default function KPISection({ applied }) {
  const list = applied.sector === "All Sectors" ? SECTORS : SECTORS.filter((s) => s.name === applied.sector);
  let totalP = 0;
  let totalV = 0;
  let totalH = 0;
  list.forEach((s) => {
    totalP += s.total;
    totalV += s.value;
    totalH += s.hc;
  });
  const scoped = applied.sector !== "All Sectors";
  if (!scoped) {
    totalP = 1773;
    totalV = 38.7;
  }
  const deteriorated = Math.max(1, Math.round(totalP * 0.071));
  const compareLabel = applied.compareLabel || "previous period";

  const cards = [
    { icon: FileText, bg: "#EAF2FB", color: "#2E7CC4", value: fmt(totalP), label: scoped ? "Projects in scope" : "Total Projects", dir: "up", pct: "6%" },
    { icon: IndianRupee, bg: "#FDF2E6", color: "#E0842A", value: totalV.toFixed(1), unit: "Lakh Cr", currency: true, label: "Total Portfolio Value", dir: "up", pct: "8%" },
    { icon: AlertTriangle, bg: "#FDECEA", color: "#D9453A", value: fmt(scoped ? totalH : 562), label: "High Priority Projects", dir: "down", pct: "12%" },
    { icon: BarChart3, bg: "#EEF1F6", color: "#5E7793", value: fmt(scoped ? deteriorated : 126), label: "Newly Deteriorated", dir: "down", pct: "24%" },
  ];

  return (
    <div className="row kpirow">
      {cards.map((c) => (
        <KPICard key={c.label} {...c} compareLabel={compareLabel} />
      ))}
    </div>
  );
}

import { useCallback, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import AnalyticsTabs from "../components/AnalyticsTabs";
import FilterBar from "../components/FilterBar";
import KPISection from "../components/KPISection";
import RiskTrendChart from "../components/RiskTrendChart";
import RiskDistribution from "../components/RiskDistribution";
import KeyInsights from "../components/KeyInsights";
import SectorPerformance from "../components/SectorPerformance";
import TopProjects from "../components/TopProjects";
import PortfolioValueChart from "../components/PortfolioValueChart";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import useToast from "../hooks/useToast";
import { INITIAL_NOTIFS, SECTORS, SERIES, monthLabel } from "../data/analyticsData";

const COMPARE_LABELS = {
  "Previous Period": "previous period",
  "Previous Year": "previous year",
  "No Comparison": "no baseline",
};

export default function Analytics() {
  const { message, visible, toast } = useToast();

  const [nav, setNav] = useState("Analytics");
  const [tab, setTab] = useState("Sector Analysis");
  const [lang, setLang] = useState("EN");
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);

  /* `draft` = what the dropdowns show; `applied` = what the page is filtered by (after Apply) */
  const [draft, setDraft] = useState({ months: 24, compare: "Previous Period", sector: "All Sectors", stateName: "All States" });
  const [applied, setApplied] = useState({ months: 24, sector: "All Sectors", stateName: "All States" });

  const [chartMode, setChartMode] = useState("line");
  const [hidden, setHidden] = useState({});

  const patchDraft = (patch) => setDraft((d) => ({ ...d, ...patch }));

  const apply = () => {
    setApplied({
      months: draft.months,
      sector: draft.sector,
      stateName: draft.stateName,
      compareLabel: COMPARE_LABELS[draft.compare] || "baseline",
    });
    toast(`Filters applied — ${draft.sector} · ${draft.stateName}`);
  };

  const onNav = (n) => {
    setNav(n);
    if (n !== "Analytics") toast(`${n} — showing the Analytics workspace in this prototype`);
  };

  const onTab = (t) => {
    setTab(t);
    toast(`${t} view applied`);
  };

  const onSearchPick = ({ kind, sector, state }) => {
    const next = { ...draft };
    if (kind === "project" || kind === "sector") next.sector = sector;
    if (kind === "project" || kind === "state") next.stateName = state || draft.stateName;
    setDraft(next);
    setApplied((a) => ({ months: draft.months, sector: next.sector, stateName: next.stateName, compareLabel: a.compareLabel }));
    toast(`Filtered to ${next.sector} · ${next.stateName}`);
  };

  const toggleSeries = (name) => {
    if (hidden[name]) {
      const rest = { ...hidden };
      delete rest[name];
      setHidden(rest);
      return;
    }
    if (SERIES.filter((s) => !hidden[s.name]).length <= 1) {
      toast("At least one sector must stay visible");
      return;
    }
    setHidden({ ...hidden, [name]: true });
  };

  const downloadCsv = useCallback(() => {
    const pts = applied.months + 1;
    const start = SERIES[0].m.length - pts;
    const lines = [["Month", ...SERIES.map((s) => s.name)].join(",")];
    for (let i = 0; i < pts; i++) {
      const gi = start + i;
      lines.push([monthLabel(gi), ...SERIES.map((s) => Math.round(s.m[gi]))].join(","));
    }
    try {
      const blob = new Blob([lines.join("\n")], { type: "text/csv" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "pragati-sector-risk-trend.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast("Downloaded sector risk trend (CSV)");
    } catch (e) {
      toast("Download is blocked in this preview");
    }
  }, [applied.months, toast]);

  const sectorRows = applied.sector === "All Sectors" ? SECTORS : SECTORS.filter((s) => s.name === applied.sector);

  return (
    <div className="page">
      <Header
        nav={nav}
        onNav={onNav}
        lang={lang}
        onLang={(l) => {
          setLang(l);
          toast(`Interface language set to ${l}`);
        }}
        notifs={notifs}
        onRead={(i) => setNotifs((ns) => ns.map((n, k) => (k === i ? { ...n, read: true } : n)))}
        onReadAll={() => {
          setNotifs((ns) => ns.map((n) => ({ ...n, read: true })));
          toast("All notifications marked as read");
        }}
        onSearchPick={onSearchPick}
        onUserAction={toast}
      />

      <Hero cycle="April 2026" />

      <div className="shell">
        <div className="bar">
          <AnalyticsTabs active={tab} onSelect={onTab} />
          <FilterBar draft={draft} onChange={patchDraft} onApply={apply} />
        </div>

        <KPISection applied={applied} />

        <div className="row r2">
          <RiskTrendChart
            months={applied.months}
            mode={chartMode}
            onMode={setChartMode}
            hidden={hidden}
            onToggleSeries={toggleSeries}
            onDownload={downloadCsv}
          />
          <RiskDistribution />
          <KeyInsights cycle="April 2026" onViewDetails={() => toast("Opening detailed insights for April 2026")} />
        </div>

        <div className="row r3">
          <SectorPerformance rows={sectorRows} />
          <TopProjects applied={applied} onViewAll={() => toast("Opening the full project risk register")} />
          <PortfolioValueChart />
        </div>
      </div>

      <Footer />
      <Toast message={message} visible={visible} />
    </div>
  );
}

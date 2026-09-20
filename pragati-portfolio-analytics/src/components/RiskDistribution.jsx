import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { DIST } from "../data/analyticsData";

export default function RiskDistribution() {
  const [mode, setMode] = useState("count");
  const d = DIST[mode];
  const R = 58, SW = 26, C = 2 * Math.PI * R;
  let off = 0;
  const arcs = d.rows.map((r) => {
    const len = (C * r.p) / 100;
    const el = (
      <circle
        key={r.n}
        cx="80"
        cy="80"
        r={R}
        fill="none"
        stroke={r.c}
        strokeWidth={SW}
        strokeDasharray={`${len.toFixed(2)} ${(C - len).toFixed(2)}`}
        strokeDashoffset={(-off).toFixed(2)}
      >
        <title>{`${r.n}: ${r.p}% (${r.v})`}</title>
      </circle>
    );
    off += len;
    return el;
  });

  return (
    <div className="card c-dist">
      <div className="chead">
        <div>
          <div className="ct serif">Current Risk Distribution</div>
          <div className="cs">{d.sub}</div>
        </div>
        <div className="dselect">
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="count">By Project Count</option>
            <option value="value">By Portfolio Value</option>
          </select>
          <ChevronDown className="i13 ch" />
        </div>
      </div>

      <div className="dwrap">
        <div className="dholder">
          <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(-90 80 80)">{arcs}</g>
            <text x="80" y="78" textAnchor="middle" fontSize={mode === "value" ? 19 : 21} fontWeight="700" fill="#082B4C" fontFamily="Source Serif 4,Georgia,serif">
              {d.center}
            </text>
            <text x="80" y="93" textAnchor="middle" fontSize="10.5" fill="#6D8098">
              {d.caption}
            </text>
          </svg>
          <span className="dpct" style={{ top: 2, left: 110 }}>{d.rows[0].p}%</span>
          <span className="dpct" style={{ top: 68, right: -6 }}>{d.rows[1].p}%</span>
          <span className="dpct" style={{ bottom: 4, left: 86 }}>{d.rows[2].p}%</span>
          <span className="dpct" style={{ top: 54, left: -6 }}>{d.rows[3].p}%</span>
        </div>
        <div className="dlegend">
          {d.rows.map((r) => (
            <div className="it" key={r.n}>
              <i style={{ background: r.c }} />
              <span className="nm">{r.n}</span>
              <span className="pc">{r.p}%</span>
              <span className="ct2">{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Download } from "lucide-react";
import { PERIODS, SERIES, monthLabel } from "../data/analyticsData";

/* Chart geometry (SVG units). The right-hand strip of the card (outside the SVG) is reserved
   for the "latest period" report so it never covers the lines or the x-axis labels. */
const CW = 590, CH = 170, CL = 44, CR = 582, CT = 6, CB = 144;

export default function RiskTrendChart({ months, mode, onMode, hidden, onToggleSeries, onDownload }) {
  const pts = months + 1;
  const start = SERIES[0].m.length - pts;
  const idx = Array.from({ length: pts }, (_, i) => start + i);
  const vis = SERIES.filter((s) => !hidden[s.name]);

  const x = (i) => (pts === 1 ? CL : CL + (i * (CR - CL)) / (pts - 1));
  const y = (v) => CB - (v / 100) * (CB - CT);

  const step = pts > 1 ? (CR - CL) / (pts - 1) : CR - CL;
  const every = Math.max(1, Math.ceil(50 / step)); /* keep x-axis labels from colliding */

  const last = idx[idx.length - 1];
  const label = PERIODS.find((p) => p.months === months).label.toLowerCase();

  const slot = (CR - CL) / pts;
  const gw = Math.min(slot * 0.78, 46);
  const bw = Math.max(1.6, gw / Math.max(1, vis.length) - 1.2);

  return (
    <div className="card c-trend">
      <div className="chead">
        <div>
          <div className="ct serif">Sector-wise Risk Trend</div>
          <div className="cs">Risk score movement across infrastructure sectors ({label})</div>
        </div>
        <div className="chead-r">
          <div className="seg">
            <button className={mode === "line" ? "on" : ""} onClick={() => onMode("line")}>
              Line Chart
            </button>
            <button className={mode === "bar" ? "on" : ""} onClick={() => onMode("bar")}>
              Bar Chart
            </button>
          </div>
          <button className="dl" title="Download chart data" onClick={onDownload}>
            <Download className="i15" />
          </button>
        </div>
      </div>

      <div className="legend">
        {SERIES.map((s) => (
          <button
            key={s.name}
            className={`lg${hidden[s.name] ? " off" : ""}`}
            title="Show / hide series"
            onClick={() => onToggleSeries(s.name)}
          >
            <i style={{ background: s.color }} />
            {s.name}
          </button>
        ))}
      </div>

      <div className="plot">
        <span className="ylab">Average Risk Score</span>
        <div id="trendChart">
          <svg viewBox={`0 0 ${CW} ${CH + 26}`} xmlns="http://www.w3.org/2000/svg">
            {[0, 20, 40, 60, 80, 100].map((g) => (
              <g key={g}>
                <line x1={CL} y1={y(g)} x2={CR} y2={y(g)} stroke="#EDF1F6" />
                <text x={CL - 8} y={y(g) + 3} textAnchor="end" fontSize="9" fill="#8B9AAC">
                  {g}%
                </text>
              </g>
            ))}
            <line x1={CL} y1={CT} x2={CL} y2={CB} stroke="#DCE3EB" />
            <line x1={CL} y1={CB} x2={CR} y2={CB} stroke="#DCE3EB" />

            {idx.map((gi, i) =>
              i % every !== 0 && i !== pts - 1 ? null : (
                <text key={gi} x={x(i).toFixed(1)} y={CB + 18} textAnchor="middle" fontSize="9" fill="#8B9AAC">
                  {monthLabel(gi)}
                </text>
              )
            )}

            {mode === "line" ? (
              <>
                <line x1={x(pts - 1).toFixed(1)} y1={CT} x2={x(pts - 1).toFixed(1)} y2={CB} stroke="#C3CEDA" strokeDasharray="3 3" />
                {vis.map((ser) => (
                  <g key={ser.name}>
                    <path
                      d={idx.map((gi, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(ser.m[gi]).toFixed(1)}`).join(" ")}
                      fill="none"
                      stroke={ser.color}
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    {idx.map((gi, i) => (
                      <circle key={gi} cx={x(i).toFixed(1)} cy={y(ser.m[gi]).toFixed(1)} r="2.6" fill={ser.color}>
                        <title>{`${ser.name} — ${monthLabel(gi)}: ${Math.round(ser.m[gi])}%`}</title>
                      </circle>
                    ))}
                  </g>
                ))}
              </>
            ) : (
              idx.map((gi, i) => {
                const cx = CL + slot * (i + 0.5);
                return vis.map((ser, si) => {
                  const v = ser.m[gi];
                  const bx = cx - gw / 2 + si * (bw + 1.2);
                  return (
                    <rect
                      key={`${gi}-${ser.name}`}
                      x={bx.toFixed(1)}
                      y={y(v).toFixed(1)}
                      width={bw.toFixed(1)}
                      height={(CB - y(v)).toFixed(1)}
                      rx="1.4"
                      fill={ser.color}
                    >
                      <title>{`${ser.name} — ${monthLabel(gi)}: ${Math.round(v)}%`}</title>
                    </rect>
                  );
                });
              })
            )}
          </svg>
        </div>

        {/* latest-period report, sits to the right of the dashed line */}
        <div className="tip" id="trendTip">
          <h5>{monthLabel(last)}</h5>
          {vis.map((ser) => (
            <div className="r" key={ser.name}>
              <i style={{ background: ser.color }} />
              {ser.name}
              <b>{Math.round(ser.m[last])}%</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

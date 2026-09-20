import { ArrowRight, Lightbulb } from "lucide-react";
import { INSIGHTS } from "../data/analyticsData";

export default function KeyInsights({ cycle = "April 2026", onViewDetails }) {
  return (
    <div className="card c-key">
      <div className="keyhead">
        <span className="bulb">
          <Lightbulb className="i20" />
        </span>
        <div>
          <h3 className="serif">Key Insights</h3>
          <div className="cs" style={{ marginTop: 2 }}>{cycle}</div>
        </div>
      </div>
      <div>
        {INSIGHTS.map((t, i) => (
          <div className="ins" key={i}>
            <span className="num">{i + 1}</span>
            {/* INSIGHTS is trusted, static content that contains <b> emphasis */}
            <p dangerouslySetInnerHTML={{ __html: t }} />
          </div>
        ))}
      </div>
      <a
        className="vdi"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onViewDetails();
        }}
      >
        View Detailed Insights
        <ArrowRight className="i13" />
      </a>
    </div>
  );
}

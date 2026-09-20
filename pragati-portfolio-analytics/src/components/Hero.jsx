/*import { Home } from "lucide-react";
import HeroImage from "./HeroImage";
import ReportingCycle from "./ReportingCycle";

export default function Hero({ cycle }) {
  return (
    <section className="hero">
      <HeroImage />
      <div className="hero-fade" />
      <div className="quote serif">
        “From data to foresight,
        <br />
        for a more resilient India.”<small>— PRAGATI</small>
      </div>
      <ReportingCycle cycle={cycle} />
      <div className="hero-in">
        <div className="crumb">
          <Home className="i13" />
          <span>/</span>
          <b>Analytics</b>
        </div>
        <h1 className="h1 serif">Portfolio Analytics</h1>
        <div className="sub">Deeper insights for stronger decisions.</div>
      </div>
    </section>
  );
}*/
import { Home } from "lucide-react";
import HeroImage from "./HeroImage";
import ReportingCycle from "./ReportingCycle";

export default function Hero({ cycle }) {
  return (
    <section className="hero">
      <HeroImage/>
      <div className="hero-fade" />
      <div className="hero-fade-bottom" />
      <div className="quote serif">
        “From data to foresight,
        <br />
        for a more resilient India.”<small>— PRAGATI</small>
      </div>
      <ReportingCycle cycle={cycle} />
      <div className="hero-in">
        <div className="crumb">
          <Home className="i13" />
          <span>/</span>
          <b>Analytics</b>
        </div>
        <h1 className="h1 serif">Portfolio Analytics</h1>
        <div className="sub">Deeper insights for stronger decisions.</div>
      </div>
    </section>
  );
}

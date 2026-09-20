import { HERO_SVG } from "./heroIllustration";

/**
 * Right-hand hero backdrop. By default it is the soft sky gradient (as in the approved layout).
 * Pass `illustration` to draw the landscape / expressway artwork on top of it.
 */
export default function HeroImage({ illustration = false }) {
  return (
    <div
      className="hero-img"
      {...(illustration ? { dangerouslySetInnerHTML: { __html: HERO_SVG } } : {})}
    />
  );
}

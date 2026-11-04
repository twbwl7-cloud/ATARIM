/**
 * Premium glassmorphism mark — right/start-side hero graphic.
 * Pure CSS: frosted glass, soft gold edges, floating geometry.
 * Works without WebGL; used alone (reduced motion) or under the 3D knot.
 */
export function HeroGlassMark() {
  return (
    <div className="hero-glass-slot absolute" aria-hidden>
      <div className="hero-prism">
        <span className="hero-prism__aura" />
        <span className="hero-prism__orbit" />
        <span className="hero-prism__diamond hero-prism__diamond--back" />
        <span className="hero-prism__glass" />
        <span className="hero-prism__diamond hero-prism__diamond--front" />
        <span className="hero-prism__core" />
        <span className="hero-prism__specular" />
        <span className="hero-prism__gold-arc" />
      </div>
    </div>
  );
}

import content from "../data/content.json";
import ParticleHero from "./ParticleHero.jsx";

export default function Hero() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="neon-sign pointer-events-none absolute bottom-10 left-[calc(50%-640px)] z-20 hidden whitespace-nowrap font-sans text-3xl font-black tracking-widest 2xl:block"
      >
        HIRE ME
      </div>
      <div className="relative aspect-[758/460] max-h-[560px] w-full overflow-hidden">
        <ParticleHero />
        <p className="pointer-events-none absolute inset-x-0 top-[66%] z-10 mx-auto max-w-[90%] text-center font-mono text-[11px] text-[var(--muted)] sm:text-[13px]">
          {content.tagline}
        </p>
      </div>
    </div>
  );
}

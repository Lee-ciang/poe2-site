import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(249,115,22,0.18),transparent_32%),linear-gradient(135deg,rgba(24,24,27,0.94),rgba(0,0,0,1)_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
          Path of Exile 2 Guides
        </p>

        <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
          Best POE2 Builds,
          <span className="text-orange-500"> Boss Guides</span>, and Endgame
          Tools
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
          Discover the strongest Path of Exile 2 builds, leveling guides, boss
          mechanics, skill explanations, and future DPS calculators.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#builds"
            className="rounded-xl bg-orange-500 px-6 py-3 text-center font-bold text-black shadow-[0_0_32px_rgba(249,115,22,0.22)] transition hover:-translate-y-0.5 hover:bg-orange-400"
          >
            Explore Builds
          </Link>

          <Link
            href="#bosses"
            className="rounded-xl border border-zinc-700 px-6 py-3 text-center font-bold text-white transition hover:-translate-y-0.5 hover:border-orange-500 hover:text-orange-400"
          >
            View Boss Guides
          </Link>
        </div>
      </div>
    </section>
  );
}

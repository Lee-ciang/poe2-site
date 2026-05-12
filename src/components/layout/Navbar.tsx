import Link from "next/link";

const navigation = [
  { label: "Builds", href: "/builds" },
  { label: "Bosses", href: "/bosses" },
  { label: "Guides", href: "/guides" },
  { label: "Skills", href: "/skills" },
  { label: "Tools", href: "/#tools" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/90 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl border border-orange-500/40 bg-orange-500/10 text-sm font-black text-orange-400 shadow-[0_0_28px_rgba(249,115,22,0.16)] transition group-hover:border-orange-400 group-hover:bg-orange-500/20">
            P2
          </span>
          <span className="text-lg font-black tracking-wide text-white">
            POE2 Forge
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-900 hover:text-orange-400"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <details className="group relative md:hidden">
          <summary className="list-none rounded-lg border border-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-orange-500 hover:text-orange-400">
            Menu
          </summary>
          <div className="absolute right-0 mt-3 grid w-48 gap-1 rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl shadow-black/40">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-900 hover:text-orange-400"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </nav>
    </header>
  );
}

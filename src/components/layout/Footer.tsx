import Link from "next/link";

const footerLinks = [
  { label: "Builds", href: "/builds" },
  { label: "Bosses", href: "/bosses" },
  { label: "Guides", href: "/guides" },
  { label: "Skills", href: "/skills" },
  { label: "Tools", href: "/#tools" },
];

const socialLinks = ["Discord", "YouTube", "X"];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <Link href="/" className="text-lg font-black tracking-wide text-white">
            POE2 Forge
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
            Path of Exile 2 builds, boss guides, skill notes, and endgame tools
            for players pushing deeper into Wraeclast.
          </p>
          <p className="mt-5 text-sm text-zinc-600">
            Copyright {year} POE2 Forge. All rights reserved.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
              Navigate
            </h2>
            <div className="mt-4 grid gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-500 transition hover:text-orange-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
              Social
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <span
                  key={social}
                  className="rounded-full border border-zinc-800 px-3 py-1 text-sm text-zinc-500"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

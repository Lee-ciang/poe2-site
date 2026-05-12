import Link from "next/link";

type BossCardProps = {
  title: string;
  description: string;
  href: string;
  location?: string;
  difficulty?: string;
  damageTypes?: string[];
};

export function BossCard({
  title,
  description,
  href,
  location,
  difficulty,
  damageTypes,
}: BossCardProps) {
  return (
    <article className="group rounded-2xl border border-zinc-800 bg-black/25 p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-500 hover:bg-zinc-900/50">
      {difficulty || location ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {difficulty ? (
            <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
              {difficulty}
            </span>
          ) : null}
          {location ? (
            <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-bold text-zinc-300">
              {location}
            </span>
          ) : null}
        </div>
      ) : null}

      <h3 className="text-2xl font-black text-white">{title}</h3>

      <p className="mt-3 leading-7 text-zinc-400">{description}</p>

      {damageTypes?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {damageTypes.map((type) => (
            <span
              key={type}
              className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-bold text-zinc-400"
            >
              {type}
            </span>
          ))}
        </div>
      ) : null}

      <Link
        href={href}
        className="mt-5 inline-flex font-bold text-orange-500 transition group-hover:text-orange-400"
      >
        View Guide -&gt;
      </Link>
    </article>
  );
}

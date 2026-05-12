import Link from "next/link";

type BuildCardProps = {
  title: string;
  tier: string;
  description: string;
  href: string;
  className?: string;
  playstyle?: string;
  difficulty?: string;
};

export function BuildCard({
  title,
  tier,
  description,
  href,
  className,
  playstyle,
  difficulty,
}: BuildCardProps) {
  return (
    <article className="group rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-orange-500 hover:bg-zinc-900">
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
          {tier}
        </span>
        {className ? (
          <span className="inline-flex rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-bold text-zinc-300">
            {className}
          </span>
        ) : null}
      </div>

      <h3 className="text-2xl font-black text-white">{title}</h3>

      <p className="mt-4 leading-7 text-zinc-400">{description}</p>

      {playstyle || difficulty ? (
        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          {playstyle ? (
            <div>
              <dt className="font-bold text-zinc-500">Playstyle</dt>
              <dd className="mt-1 text-zinc-300">{playstyle}</dd>
            </div>
          ) : null}
          {difficulty ? (
            <div>
              <dt className="font-bold text-zinc-500">Difficulty</dt>
              <dd className="mt-1 text-zinc-300">{difficulty}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      <Link
        href={href}
        className="mt-6 inline-flex font-bold text-orange-500 transition group-hover:text-orange-400"
      >
        Read Build -&gt;
      </Link>
    </article>
  );
}

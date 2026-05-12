import Link from "next/link";

type SkillCardProps = {
  name: string;
  category: string;
  damageType: string;
  weaponRequirement: string;
  summary: string;
  href: string;
};

export function SkillCard({
  name,
  category,
  damageType,
  weaponRequirement,
  summary,
  href,
}: SkillCardProps) {
  return (
    <article className="group rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-orange-500 hover:bg-zinc-900">
      <div className="mb-4 flex flex-wrap gap-2">
        {[category, damageType].map((label) => (
          <span
            key={label}
            className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400"
          >
            {label}
          </span>
        ))}
      </div>

      <h3 className="text-2xl font-black text-white">{name}</h3>
      <p className="mt-4 leading-7 text-zinc-400">{summary}</p>

      <p className="mt-5 text-sm font-semibold text-zinc-500">
        Requires: <span className="text-zinc-300">{weaponRequirement}</span>
      </p>

      <Link
        href={href}
        className="mt-6 inline-flex font-bold text-orange-500 transition group-hover:text-orange-400"
      >
        View Skill -&gt;
      </Link>
    </article>
  );
}

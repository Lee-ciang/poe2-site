type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  meta,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-orange-500">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
            {description}
          </p>
        ) : null}
      </div>

      {meta ? (
        <span className="text-sm font-medium text-zinc-500">{meta}</span>
      ) : null}
    </div>
  );
}

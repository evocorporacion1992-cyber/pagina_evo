type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <span className="rounded-full border border-[var(--border)] bg-white/4 px-4 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
        {kicker}
      </span>
      <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-7 text-[var(--muted)] sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

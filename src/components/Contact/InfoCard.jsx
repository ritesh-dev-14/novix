export default function InfoCard({ icon: Icon, title, value, link }) {
  const content = (
    <>
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-blue-300 transition-all duration-500 group-hover:border-cyan-400/30 group-hover:bg-blue-500/10 group-hover:text-cyan-300 group-hover:shadow-[0_0_24px_rgba(103,232,249,0.25)]">
        <Icon className="h-[18px] w-[18px] stroke-[1.5]" />
      </div>
      <div className="flex flex-col text-left">
        <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
          {title}
        </span>
        <span className="text-[15px] font-semibold text-slate-100 transition-colors duration-300 group-hover:text-white">
          {value}
        </span>
      </div>
    </>
  );

  const className =
    'info-item-card group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-white/[0.04]';

  // subtle gradient-border sheen on hover, layered beneath content
  const sheen = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{
        background:
          'linear-gradient(120deg, transparent 30%, rgba(103,232,249,0.06) 50%, transparent 70%)',
      }}
    />
  );

  if (link) {
    return (
      <a href={link} className={className}>
        {sheen}
        {content}
      </a>
    );
  }

  return (
    <div className={className}>
      {sheen}
      {content}
    </div>
  );
}
import { useCountUp } from './useCountUp';

export default function StatItem({ target, suffix = '+', label, isText = false }) {
  const [display, ref] = useCountUp(isText ? 0 : target, { suffix: isText ? '' : suffix });

  return (
    <div ref={ref} className="stat-item flex flex-col gap-1.5 text-left">
      <span className="font-mono text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {isText ? label.value : display}
      </span>
      <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
        {isText ? label.caption : label}
      </span>
    </div>
  );
}
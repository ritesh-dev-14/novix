export function FormField({ icon: Icon, id, label, type = 'text' }) {
  return (
    <div className="group relative w-full">
      <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within:text-cyan-300">
        <Icon className="h-4 w-4" />
      </span>
      <input
        type={type}
        id={id}
        placeholder=" "
        className="peer w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] pb-2 pl-12 pr-6 pt-6 text-sm text-[var(--color-primary-navy)] placeholder-transparent shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300 focus:border-[var(--color-healthcare-green)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-healthcare-green)/30]"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-12 top-4 text-sm font-medium text-slate-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[15px] peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-cyan-300"
      >
        {label}
      </label>
    </div>
  );
}

export function FormTextarea({ icon: Icon, id, label, rows = 4 }) {
  return (
    <div className="group relative w-full">
      <span className="pointer-events-none absolute left-5 top-5 text-slate-500 transition-colors duration-300 group-focus-within:text-cyan-300">
        <Icon className="h-4 w-4" />
      </span>
      <textarea
        id={id}
        rows={rows}
        placeholder=" "
        className="peer w-full resize-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] pb-2 pl-12 pr-6 pt-6 text-sm text-[var(--color-primary-navy)] placeholder-transparent shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300 focus:border-[var(--color-healthcare-green)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-healthcare-green)/30]"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-12 top-4 text-sm font-medium text-slate-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[15px] peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-cyan-300"
      >
        {label}
      </label>
    </div>
  );
}
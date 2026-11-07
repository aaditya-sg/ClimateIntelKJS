export const StatCard = ({ title, value, subtitle, color }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{title}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <h3 className="text-3xl font-bold" style={{ color }}>{value}</h3>
        <span className="text-xs text-slate-400">{subtitle}</span>
      </div>
    </div>
  );
};

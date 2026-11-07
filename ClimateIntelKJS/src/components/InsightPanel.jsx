export const InsightPanel = ({ title, value, description, accent }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-bold" style={{ color: accent }}>{value}</p>
      <p className="mt-2 text-xs text-slate-400">{description}</p>
    </div>
  );
};

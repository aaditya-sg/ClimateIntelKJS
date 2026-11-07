export const AlertCard = ({ alert, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
      style={{
        background: alert.bg,
        borderColor: `${alert.color}40`,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="rounded px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white"
          style={{ background: alert.color }}
        >
          {alert.level}
        </span>
        <span className="text-[10px] text-slate-400">{alert.time}</span>
      </div>

      <h3 className="mt-3 text-sm font-semibold text-slate-800">{alert.title}</h3>
      <p className="mt-1 text-xs text-slate-500">{alert.location}</p>
      <p className="mt-3 text-2xl font-bold" style={{ color: alert.color }}>{alert.temp}</p>
    </button>
  );
};

export const StatusBadge = ({ label, tone = 'success' }) => {
  const tones = {
    success: 'bg-green-50 text-green-700',
    warning: 'bg-amber-50 text-amber-700',
    danger: 'bg-red-50 text-red-700',
    neutral: 'bg-slate-100 text-slate-700',
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${tones[tone]}`}>
      <span className="h-2 w-2 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
};

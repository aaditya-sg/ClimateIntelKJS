export const HeatMapPanel = ({ districts, selectedRegion, onSelectRegion }) => {
  const legend = [
    { color: '#D62828', label: 'Extreme' },
    { color: '#F77F00', label: 'Severe' },
    { color: '#FFD166', label: 'Moderate' },
    { color: '#4CAF50', label: 'Normal' },
  ];

  return (
    <div className="relative h-[420px] overflow-hidden rounded-2xl border border-slate-200 bg-[#0d2a4a] shadow-sm">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,168,150,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,168,150,0.08) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/40 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-semibold text-green-300">LIVE HEATMAP</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[300px] w-[420px]">
          <div className="absolute inset-8 rotate-[-8deg] rounded-[45%] border border-teal-500/30" />

          {districts.map((district) => {
            const isSelected = selectedRegion === district.name;
            return (
              <button
                key={district.name}
                type="button"
                onClick={() => onSelectRegion(district.name)}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: district.x, top: district.y }}
              >
                <div
                  className="flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    width: district.size,
                    height: district.size,
                    background: `radial-gradient(circle, ${district.ringColor}70, ${district.ringColor}20, transparent)`,
                    boxShadow: isSelected
                      ? `0 0 45px ${district.ringColor}90`
                      : `0 0 20px ${district.ringColor}60`,
                    border: isSelected ? `2px solid ${district.ringColor}` : '2px solid transparent',
                  }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: district.dotSize,
                      height: district.dotSize,
                      background: district.color,
                      boxShadow: `0 0 18px ${district.color}`,
                    }}
                  />
                </div>
                <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-200">
                  {district.shortName}
                </span>
                <span className="text-lg font-bold text-white">{district.temp}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute right-5 top-5 rounded-xl bg-black/40 p-4 backdrop-blur-md">
        <p className="mb-3 text-xs text-slate-300">Heat Index</p>
        {legend.map((item) => (
          <div key={item.label} className="mb-2 flex items-center gap-2 last:mb-0">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
            <span className="text-xs text-slate-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

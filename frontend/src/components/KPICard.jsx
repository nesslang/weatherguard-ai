export default function KPICard({ title, value, unit, subtitle, colorClass = "text-navy-900" }) {
  return (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center">
      <h3 className="text-sm font-medium text-slate-500 mb-1">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className={`text-3xl font-bold ${colorClass}`}>{value}</span>
        {unit && <span className="text-sm font-medium text-slate-600">{unit}</span>}
      </div>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}

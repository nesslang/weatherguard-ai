import { AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function ForecastChange({ changeData }) {
  if (!changeData) return null;

  const renderRow = (label, data, unit) => {
    const isSignificant = Math.abs(data.change) > (data.prev * 0.5);
    const direction = data.change > 0 ? <TrendingUp size={14} className="text-red-500" /> : data.change < 0 ? <TrendingDown size={14} className="text-blue-500" /> : <Minus size={14} className="text-slate-400" />;
    
    return (
      <tr className="border-t border-slate-100">
        <td className="py-3 px-4 text-sm font-medium text-slate-700">{label}</td>
        <td className="py-3 px-4 text-sm text-slate-500">{data.prev} {unit}</td>
        <td className="py-3 px-4 text-sm font-medium text-navy-900">{data.curr} {unit}</td>
        <td className="py-3 px-4 text-sm">
          <div className={`flex items-center gap-1 ${isSignificant ? 'font-bold' : ''}`}>
            {direction}
            <span className={isSignificant ? (data.change > 0 ? 'text-red-600' : 'text-blue-600') : 'text-slate-500'}>
              {data.change > 0 ? '+' : ''}{data.change} {unit}
            </span>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider">Forecast Revision</h3>
        {changeData.is_significant && (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 border border-red-100 rounded text-xs font-bold">
            <AlertTriangle size={14} /> SIGNIFICANT REVISION
          </span>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 text-xs font-semibold text-slate-400 uppercase">Variable</th>
              <th className="py-2 px-4 text-xs font-semibold text-slate-400 uppercase">Previous</th>
              <th className="py-2 px-4 text-xs font-semibold text-slate-400 uppercase">Current</th>
              <th className="py-2 px-4 text-xs font-semibold text-slate-400 uppercase">Change</th>
            </tr>
          </thead>
          <tbody>
            {renderRow('Rainfall', changeData.rainfall, 'mm')}
            {renderRow('Pressure', changeData.pressure, 'hPa')}
            {renderRow('Wind', changeData.wind, 'km/h')}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { AlertCircle } from 'lucide-react';

export default function RiskTable({ regions, onRegionSelect, selectedRegion }) {
  if (!regions || !regions.length) return null;

  const getRiskStyle = (level) => {
    switch(level) {
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      case 'MODERATE': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
        <AlertCircle size={18} className="text-orange-500" />
        <h3 className="font-bold text-navy-900 uppercase tracking-wider text-sm">High Uncertainty Regions</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white">
              <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase border-b border-slate-200">Rank</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase border-b border-slate-200">Region</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase border-b border-slate-200">Bust Prob</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase border-b border-slate-200">Confidence</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase border-b border-slate-200">Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {regions.slice(0, 10).map((r, idx) => (
              <tr 
                key={r.name} 
                onClick={() => onRegionSelect && onRegionSelect(r.name)}
                className={`border-b border-slate-100 cursor-pointer hover:bg-blue-50/50 transition-colors ${selectedRegion === r.name ? 'bg-blue-50' : ''}`}
              >
                <td className="py-3 px-4 text-sm font-medium text-slate-500">#{idx + 1}</td>
                <td className="py-3 px-4 text-sm font-bold text-navy-900">{r.name}</td>
                <td className="py-3 px-4 text-sm font-medium text-slate-700">{(r.bust_probability * 100).toFixed(0)}%</td>
                <td className="py-3 px-4 text-sm text-slate-600">{r.confidence.toFixed(0)}%</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold border ${getRiskStyle(r.risk_level)}`}>
                    {r.risk_level}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

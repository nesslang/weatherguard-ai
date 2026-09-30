import { AlertCircle } from 'lucide-react';

export default function RiskPanel({ data, day, variable }) {
  if (!data) return (
    <div className="h-full flex items-center justify-center text-slate-400 p-8 border border-slate-200 rounded-lg bg-white">
      Select a region to view detailed forecast reliability
    </div>
  );

  const getRiskStyle = (level) => {
    switch(level) {
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      case 'MODERATE': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-navy-900">{data.name}</h2>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium border border-slate-200">Day {day}</span>
            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium border border-slate-200">{variable}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskStyle(data.risk_level)}`}>
          {data.risk_level} RISK
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div className="text-sm text-slate-500 mb-1">Confidence Score</div>
          <div className="text-3xl font-bold text-navy-900">{data.confidence.toFixed(0)}%</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div className="text-sm text-slate-500 mb-1">Bust Probability</div>
          <div className="text-3xl font-bold text-navy-900">{(data.bust_probability * 100).toFixed(0)}%</div>
        </div>
      </div>

      <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100 flex items-start gap-3">
        <AlertCircle className="text-blue-500 mt-0.5 shrink-0" size={18} />
        <div>
          <div className="text-sm font-medium text-navy-900">Expected Forecast Error</div>
          <div className="text-2xl font-bold text-blue-700 mt-1">{data.expected_error.toFixed(1)} {variable === 'Rainfall' ? 'mm' : 'units'}</div>
        </div>
      </div>
    </div>
  );
}

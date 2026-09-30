import { CheckCircle2, XCircle } from 'lucide-react';

export default function HistoricalAnalogue({ data = [] }) {
  if (!data.length) return null;

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mt-6">
      <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">Historical Weather Analogue</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 text-xs font-semibold text-slate-400 uppercase">Year</th>
              <th className="py-2 px-4 text-xs font-semibold text-slate-400 uppercase">Pattern</th>
              <th className="py-2 px-4 text-xs font-semibold text-slate-400 uppercase">Similarity</th>
              <th className="py-2 px-4 text-xs font-semibold text-slate-400 uppercase">Forecast Bust</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className={`border-t border-slate-100 ${item.had_bust ? 'bg-orange-50/30' : 'bg-green-50/30'}`}>
                <td className="py-3 px-4 text-sm font-medium text-navy-900">{item.year}</td>
                <td className="py-3 px-4 text-sm text-slate-600">{item.pattern_description}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-700">{item.similarity}%</span>
                    <div className="w-16 h-1.5 bg-slate-200 rounded-full">
                      <div className="h-1.5 bg-blue-500 rounded-full" style={{ width: `${item.similarity}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {item.had_bust ? (
                    <div className="flex items-center gap-1 text-sm font-bold text-orange-600">
                      <AlertCircle size={14} /> YES ({item.error_magnitude}mm error)
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                      <CheckCircle2 size={14} /> NO
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AlertCircle(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

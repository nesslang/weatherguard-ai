export default function SHAPExplanation({ explanation = [] }) {
  if (!explanation.length) return null;

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
      <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">Why is Confidence Low?</h3>
      <div className="space-y-4">
        {explanation.map((item, idx) => {
          const impactPercent = Math.min(100, Math.max(5, item.impact * 100));
          const isHigh = impactPercent > 70;
          const isMed = impactPercent > 40 && impactPercent <= 70;
          
          let label = "LOW IMPACT";
          if (isHigh) label = "HIGH IMPACT";
          else if (isMed) label = "MEDIUM IMPACT";

          const nameFormatted = item.feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

          return (
            <div key={idx}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">{nameFormatted}</span>
                <span className={`font-bold ${isHigh ? 'text-orange-600' : isMed ? 'text-yellow-600' : 'text-slate-400'}`}>
                  {label}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${isHigh ? 'bg-orange-500' : isMed ? 'bg-yellow-500' : 'bg-slate-300'}`}
                  style={{ width: `${impactPercent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

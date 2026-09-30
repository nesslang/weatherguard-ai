import { AlertTriangle, Clock } from 'lucide-react';

export default function Header({ isDemo }) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-navy-900">WeatherGuard AI</h2>
        <p className="text-sm text-slate-500">Forecast Reliability Intelligence</p>
      </div>
      
      <div className="flex items-center gap-6">
        {isDemo && (
          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
            <AlertTriangle size={14} /> DEMO DATA ACTIVE
          </div>
        )}
        
        <div className="text-right">
          <div className="text-xs text-slate-500 flex items-center gap-1 justify-end">
            <Clock size={12} /> Last Updated: {new Date().toLocaleTimeString()}
          </div>
          <div className="text-sm font-medium text-navy-900">Model: XGBoost</div>
        </div>
      </div>
    </header>
  );
}

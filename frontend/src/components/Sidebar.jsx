import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart2, Cpu, Activity, Database, CheckCircle2 } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Forecast Analysis', path: '/forecast-analysis', icon: <BarChart2 size={20} /> },
    { name: 'Model Insights', path: '/model-insights', icon: <Cpu size={20} /> }
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between">
      <div>
        <div className="p-6">
          <h1 className="text-xl font-bold text-navy-900 flex items-center gap-2">
            <Activity className="text-blue-600" />
            WeatherGuard AI
          </h1>
          <p className="text-xs text-slate-500 mt-1">Forecast Reliability System</p>
        </div>
        
        <nav className="px-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-200">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">System Status</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> ML Model Online</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> API Connected</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Data Pipeline Active</li>
        </ul>
      </div>
    </div>
  );
}

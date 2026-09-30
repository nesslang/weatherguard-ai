import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ForecastAnalysis from './pages/ForecastAnalysis';
import ModelInsights from './pages/ModelInsights';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/forecast-analysis" element={<ForecastAnalysis />} />
              <Route path="/model-insights" element={<ModelInsights />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

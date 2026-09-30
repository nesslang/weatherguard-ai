import { useState, useEffect } from 'react';
import Header from '../components/Header';
import KPICard from '../components/KPICard';
import ConfidenceMap from '../components/ConfidenceMap';
import RiskPanel from '../components/RiskPanel';
import SHAPExplanation from '../components/SHAPExplanation';
import ForecastChange from '../components/ForecastChange';
import RiskTable from '../components/RiskTable';
import { getRegionRisk, IS_DEMO } from '../services/api';

export default function Dashboard() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('Maharashtra');
  const [forecastDay, setForecastDay] = useState(4);
  const [variable, setVariable] = useState('Rainfall');
  
  const [regionData, setRegionData] = useState(null);
  const [explanation, setExplanation] = useState([]);
  const [forecastChange, setForecastChange] = useState(null);

  useEffect(() => {
    async function loadData() {
      const riskData = await getRegionRisk();
      setRegions(riskData);
      
      if (selectedRegion) {
        const rData = riskData.find(r => r.name === selectedRegion);
        setRegionData(rData || riskData[0]);
        
        // Mocking explanation & change for demo purposes
        setExplanation([
            {feature: "ensemble_spread", impact: 0.85, direction: "increases_uncertainty"},
            {feature: "pressure_change", impact: 0.62, direction: "increases_uncertainty"},
            {feature: "historical_error_mean", impact: 0.45, direction: "increases_uncertainty"},
            {feature: "wind_change", impact: 0.30, direction: "decreases_uncertainty"}
        ]);
        
        setForecastChange({
            is_significant: true,
            rainfall: { prev: 40, curr: 125, change: 85 },
            pressure: { prev: 1002, curr: 994, change: -8 },
            wind: { prev: 18, curr: 35, change: 17 }
        });
      }
    }
    loadData();
  }, [selectedRegion, forecastDay, variable]);

  const stats = {
    avgConfidence: regions.length ? (regions.reduce((acc, r) => acc + r.confidence, 0) / regions.length).toFixed(0) : 0,
    avgBust: regions.length ? (regions.reduce((acc, r) => acc + r.bust_probability, 0) / regions.length * 100).toFixed(0) : 0,
    highestRisk: regions.length ? [...regions].sort((a,b) => b.bust_probability - a.bust_probability)[0].name : '-'
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Header isDemo={IS_DEMO} />
      
      <div className="p-6 flex-1 overflow-y-auto">
        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Forecast Day</label>
              <select 
                className="bg-slate-50 border border-slate-300 text-sm rounded-md px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500"
                value={forecastDay}
                onChange={e => setForecastDay(Number(e.target.value))}
              >
                {[1,2,3,4,5,6,7,8,9,10].map(d => <option key={d} value={d}>Day {d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Weather Variable</label>
              <select 
                className="bg-slate-50 border border-slate-300 text-sm rounded-md px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500"
                value={variable}
                onChange={e => setVariable(e.target.value)}
              >
                <option value="Rainfall">Rainfall</option>
                <option value="Temperature">Temperature</option>
                <option value="Wind">Wind</option>
                <option value="Pressure">Pressure</option>
              </select>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <KPICard title="Average Confidence" value={`${stats.avgConfidence}%`} colorClass="text-blue-600" />
          <KPICard title="National Bust Risk" value={`${stats.avgBust}%`} colorClass="text-orange-600" />
          <KPICard title="Expected Error Avg" value="24.2" unit="mm" colorClass="text-slate-700" />
          <KPICard title="Highest Risk Region" value={stats.highestRisk} colorClass="text-red-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-7 flex flex-col">
            <h3 className="text-lg font-bold text-navy-900 mb-4">India Forecast Confidence Map</h3>
            <div className="flex-1 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
              <ConfidenceMap regions={regions} selectedRegion={selectedRegion} onRegionSelect={setSelectedRegion} />
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col">
            <RiskPanel data={regionData} day={forecastDay} variable={variable} />
            <SHAPExplanation explanation={explanation} />
            <ForecastChange changeData={forecastChange} />
          </div>
        </div>

        <RiskTable regions={regions} onRegionSelect={setSelectedRegion} selectedRegion={selectedRegion} />
      </div>
    </div>
  );
}

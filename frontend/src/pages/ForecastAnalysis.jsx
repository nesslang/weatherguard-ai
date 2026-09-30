import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { BustProbabilityChart, ExpectedErrorChart, RegionalComparisonChart } from '../components/Charts';
import HistoricalAnalogue from '../components/HistoricalAnalogue';
import { getBustProbability, getRegionRisk, IS_DEMO } from '../services/api';

export default function ForecastAnalysis() {
  const [leadTimeData, setLeadTimeData] = useState([]);
  const [regionsData, setRegionsData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const bData = await getBustProbability('Maharashtra');
      setLeadTimeData(bData);
      
      const rData = await getRegionRisk();
      setRegionsData(rData.slice(0, 8)); // Top 8 for chart
    }
    loadData();
  }, []);

  const analogues = [
        {"year": 2019, "similarity": 87, "had_bust": true, "error_magnitude": 45, "pattern_description": "Monsoon depression with high ensemble spread"},
        {"year": 2021, "similarity": 81, "had_bust": false, "error_magnitude": 15, "pattern_description": "Active monsoon phase, stable pressure"},
        {"year": 2023, "similarity": 76, "had_bust": true, "error_magnitude": 38, "pattern_description": "Rapidly intensifying low pressure system"}
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Header isDemo={IS_DEMO} />
      
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-navy-900">Forecast Analysis</h2>
          <p className="text-slate-500 text-sm">Analyze forecast reliability across lead times, regions and weather variables.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">Forecast Bust Probability by Lead Time</h3>
            <BustProbabilityChart data={leadTimeData} />
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">Expected Forecast Error (mm)</h3>
            <ExpectedErrorChart data={leadTimeData} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">Regional Risk Comparison</h3>
                <RegionalComparisonChart data={regionsData} />
            </div>
            
            <div>
                <HistoricalAnalogue data={analogues} />
            </div>
        </div>
      </div>
    </div>
  );
}

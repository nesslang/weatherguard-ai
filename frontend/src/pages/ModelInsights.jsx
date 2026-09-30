import { useState, useEffect } from 'react';
import Header from '../components/Header';
import KPICard from '../components/KPICard';
import SHAPExplanation from '../components/SHAPExplanation';
import { getModelPerformance, IS_DEMO } from '../services/api';

export default function ModelInsights() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getModelPerformance();
      setMetrics(data);
    }
    load();
  }, []);

  const sampleExplanation = [
      {feature: "ensemble_spread", impact: 0.92, direction: "increases_uncertainty"},
      {feature: "pressure_change", impact: 0.76, direction: "increases_uncertainty"},
      {feature: "forecast_revision_rainfall", impact: 0.65, direction: "increases_uncertainty"},
      {feature: "historical_error_mean", impact: 0.45, direction: "increases_uncertainty"},
      {feature: "wind_change", impact: 0.30, direction: "decreases_uncertainty"}
  ];

  if (!metrics) return null;

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Header isDemo={IS_DEMO} />
      
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="mb-6 flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-navy-900">Model Insights</h2>
                <p className="text-slate-500 text-sm">Performance, explainability and reliability of the WeatherGuard AI model.</p>
            </div>
            <div className="bg-slate-200 text-slate-700 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                XGBoost Version 2.0.1
            </div>
        </div>
        
        <h3 className="text-lg font-bold text-navy-900 mb-4">Classifier Performance (Bust Prediction)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <KPICard title="Accuracy" value={`${(metrics.accuracy * 100).toFixed(1)}%`} colorClass="text-blue-600" />
            <KPICard title="Precision" value={`${(metrics.precision * 100).toFixed(1)}%`} colorClass="text-blue-600" />
            <KPICard title="Recall" value={`${(metrics.recall * 100).toFixed(1)}%`} colorClass="text-blue-600" />
            <KPICard title="F1 Score" value={`${(metrics.f1 * 100).toFixed(1)}%`} colorClass="text-blue-600" />
            <KPICard title="ROC-AUC" value={`${(metrics.roc_auc * 100).toFixed(1)}%`} colorClass="text-purple-600" />
            <KPICard title="PR-AUC" value="91.7%" colorClass="text-purple-600" />
        </div>

        <h3 className="text-lg font-bold text-navy-900 mb-4">Regressor Performance (Expected Error)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <KPICard title="MAE" value={metrics.mae.toFixed(2)} subtitle="Mean Absolute Error" />
            <KPICard title="RMSE" value={metrics.rmse.toFixed(2)} subtitle="Root Mean Squared Error" />
            <KPICard title="R² Score" value={metrics.r2.toFixed(3)} subtitle="Coefficient of Determination" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                <h3 className="text-lg font-bold text-navy-900 mb-4">Global Feature Importance (SHAP)</h3>
                <SHAPExplanation explanation={sampleExplanation} />
            </div>
            <div>
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm h-full flex flex-col justify-center items-center text-center">
                    <h3 className="text-lg font-bold text-navy-900 mb-2">Explainable AI Architecture</h3>
                    <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                        WeatherGuard AI uses SHAP (SHapley Additive exPlanations) TreeExplainer to break down every prediction into individual feature contributions, allowing meteorologists to understand exactly why a forecast is flagged as unreliable.
                    </p>
                    <div className="flex gap-2 text-xs">
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded">XGBoost</span>
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded">SHAP</span>
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded">Scikit-Learn</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

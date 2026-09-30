from fastapi import APIRouter
import json
import os

router = APIRouter()

@router.get("/health")
def health_check():
    models_loaded = os.path.exists(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models', 'bust_classifier.pkl'))
    return {
        "status": "online",
        "model_loaded": models_loaded,
        "data_mode": "live" if models_loaded else "demo"
    }

@router.get("/model-performance")
def get_model_performance():
    metrics_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models', 'model_metrics.json')
    if os.path.exists(metrics_path):
        with open(metrics_path, 'r') as f:
            return json.load(f)
            
    # Demo metrics
    return {
        "accuracy": 0.918,
        "precision": 0.894,
        "recall": 0.879,
        "f1": 0.886,
        "roc_auc": 0.942,
        "mae": 8.3,
        "rmse": 12.1,
        "r2": 0.847
    }

@router.get("/explanation")
def get_explanation(region: str, lead_time: int = 1, variable: str = 'Rainfall'):
    # Return mock explanation for demo
    return [
        {"feature": "ensemble_spread", "impact": 0.92, "direction": "increases_uncertainty"},
        {"feature": "pressure_change", "impact": 0.76, "direction": "increases_uncertainty"},
        {"feature": "forecast_revision_rainfall", "impact": 0.65, "direction": "increases_uncertainty"},
        {"feature": "historical_error_mean", "impact": 0.45, "direction": "increases_uncertainty"},
        {"feature": "wind_change", "impact": 0.30, "direction": "decreases_uncertainty"}
    ]

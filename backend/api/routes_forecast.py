from fastapi import APIRouter
from pydantic import BaseModel
import numpy as np

from backend.ml.predict import predict_single, get_demo_prediction
from backend.utils.confidence import get_confidence, get_confidence_level
from backend.utils.risk import get_risk_level

router = APIRouter()

class PredictRequest(BaseModel):
    region: str
    lead_time: int
    forecast_rainfall: float = 10.0
    forecast_temp: float = 25.0
    forecast_pressure: float = 1010.0
    forecast_wind: float = 15.0
    forecast_humidity: float = 60.0
    ensemble_spread: float = 2.0
    prev_rainfall: float = 8.0
    prev_pressure: float = 1012.0
    prev_wind: float = 12.0
    historical_error_mean: float = 5.0
    historical_error_std: float = 2.0
    weather_system_intensity: float = 0.5
    variable: str = 'Rainfall'

@router.post("/predict")
def predict(req: PredictRequest):
    res = predict_single(req.model_dump())
    res['region'] = req.region
    res['lead_time'] = req.lead_time
    res['weather_variable'] = req.variable
    res['forecast_change'] = {
        'rainfall': {'prev': req.prev_rainfall, 'curr': req.forecast_rainfall, 'change': req.forecast_rainfall - req.prev_rainfall},
        'pressure': {'prev': req.prev_pressure, 'curr': req.forecast_pressure, 'change': req.forecast_pressure - req.prev_pressure},
        'wind': {'prev': req.prev_wind, 'curr': req.forecast_wind, 'change': req.forecast_wind - req.prev_wind}
    }
    return res

@router.get("/forecast-confidence")
def get_forecast_confidence(region: str, lead_time: int = 1, variable: str = 'Rainfall'):
    return get_demo_prediction(region, lead_time, variable)

@router.get("/bust-probability")
def get_bust_probability(region: str, variable: str = 'Rainfall'):
    # Return array for days 1-10
    results = []
    for day in range(1, 11):
        pred = get_demo_prediction(region, day, variable)
        results.append({
            "day": day,
            "bust_probability": pred['bust_probability'],
            "confidence": pred['confidence'],
            "expected_error": pred['expected_error'],
            "risk_level": pred['risk_level']
        })
    return results

@router.get("/forecast-change")
def get_forecast_change(region: str, lead_time: int = 1):
    # Demo data
    return {
        'rainfall': {'prev': 40, 'curr': 125, 'change': 85},
        'pressure': {'prev': 1002, 'curr': 994, 'change': -8},
        'wind': {'prev': 18, 'curr': 35, 'change': 17},
        'is_significant': True
    }

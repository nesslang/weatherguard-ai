# WeatherGuard AI – Backend

AI-based Forecast Bust Detection for medium-range NWP weather forecasts.

## Quick Start

```bash
# 1. From the backend/ directory, install dependencies
pip install -r requirements.txt

# 2. (Optional but recommended) Train ML models
python ml/train_models.py

# 3. Start the server
python main.py
# → http://localhost:8000
# → http://localhost:8000/docs  (Swagger UI)
```

## Project Structure

```
backend/
├── main.py                    # FastAPI app + startup event
├── requirements.txt
├── start.bat                  # Windows quick-launch script
│
├── api/
│   ├── __init__.py
│   ├── routes_forecast.py     # /api/health, /api/predict, /api/bust-probability …
│   ├── routes_regions.py      # /api/region-risk, /api/historical-analogue
│   └── routes_model.py        # /api/model-performance, /api/explanation
│
├── ml/
│   ├── __init__.py
│   ├── feature_engineering.py # engineer_features(), get_feature_names()
│   ├── preprocessing.py       # load_data(), split_data(), scale_features()
│   ├── train_models.py        # Full training pipeline (run once)
│   ├── predict.py             # load_models(), predict_single(), get_demo_prediction()
│   └── explain.py             # SHAP TreeExplainer integration
│
├── data/
│   ├── __init__.py
│   ├── demo_weather_data.py   # CSV generator (numpy seed=42)
│   └── demo_regions.json      # 20 Indian regions static data
│
├── database/
│   ├── __init__.py
│   └── database.py            # SQLAlchemy + SQLite ORM models
│
├── utils/
│   ├── __init__.py
│   ├── risk.py                # get_risk_level(), get_risk_color()
│   └── confidence.py          # get_confidence(), get_confidence_level()
│
└── models/                    # Auto-populated by train_models.py
    ├── bust_classifier.pkl
    ├── error_regressor.pkl
    ├── scaler.pkl
    ├── feature_names.json
    └── model_metrics.json
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Server + model status |
| GET | `/api/forecast-confidence` | Confidence for region/lead_time |
| GET | `/api/bust-probability` | Bust prob for days 1-10 (array) |
| GET | `/api/forecast-change` | Previous vs current forecast |
| POST | `/api/predict` | Full single prediction |
| POST | `/api/predict-batch` | Batch predictions |
| GET | `/api/region-risk` | All 20 regions with risk scores |
| GET | `/api/historical-analogue` | Historical similar events |
| GET | `/api/model-performance` | Training metrics |
| GET | `/api/explanation` | SHAP feature importance |

## Risk / Confidence Thresholds

**Bust Probability → Risk Level**
- 0–29 % → LOW (green)
- 30–49 % → MODERATE (yellow)
- 50–69 % → HIGH (orange)
- 70–100 % → VERY_HIGH (red)

**Confidence Score** = 100 × (1 – bust_probability)
- 80–100 → HIGH (green)
- 60–79 → MODERATE (yellow)
- 40–59 → LOW (orange)
- 0–39 → VERY_LOW (red)

## Demo Mode

All endpoints work **without** trained models. When `ml/bust_classifier.pkl` is not found,
the server enters demo mode and returns deterministic responses seeded by
`hash(region + lead_time + variable)`. Realistic bust probability ranges:

| Day | Range |
|-----|-------|
| 1-2 | 10–25 % |
| 3-4 | 25–45 % |
| 5-6 | 40–65 % |
| 7-8 | 55–75 % |
| 9-10 | 65–85 % |

Maharashtra, Gujarat, Rajasthan, Odisha, West Bengal receive +8 % bias.

# WeatherGuard AI

AI-Based Forecast Bust Detection for Medium-Range Weather Forecasts

## Problem Statement 26079
**Organization:** Ministry of Earth Sciences (MoES) | **Department:** National Centre for Medium Range Weather Forecasting (NCMRWF)
**Theme:** Smart Automation

## Overview
WeatherGuard AI is an AI-powered decision-support web application that analyzes existing Numerical Weather Prediction (NWP) forecasts to detect "forecast busts" (large errors). It does not generate new forecasts, but instead determines:
1. Where the forecast may be unreliable
2. Expected forecast errors
3. Meteorological reasons behind low confidence using Explainable AI (SHAP)

## Features
- **AI Forecast Confidence Map:** Visualizes confidence across 20 Indian regions.
- **Explainable AI (SHAP):** Breaks down *why* a forecast has low confidence.
- **Historical Analogues:** Compares current NWP patterns with similar past events.
- **Forecast Change Detection:** Alerts on significant model revisions between cycles.
- **Model Insights Dashboard:** XGBoost performance metrics across lead times.

## Architecture
- **Frontend:** React, Vite, Tailwind CSS, React-Leaflet, Recharts
- **Backend:** FastAPI, Python, SQLite (SQLAlchemy)
- **ML Pipeline:** XGBoost (Classifier & Regressor), Scikit-Learn, SHAP

## Installation & Running

### Backend
```bash
cd backend
pip install -r requirements.txt
python ml/train_models.py
uvicorn main:app --reload
```
The backend will run on `http://localhost:8000`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

## Demo Mode
If the backend is not running, or if models have not been trained, the frontend automatically falls back to **DEMO MODE**. It will use deterministic synthetic data so the UI remains fully functional for demonstration.

@echo off
REM WeatherGuard AI – Quick Start Script
REM Run from the backend\ directory

echo ============================================
echo  WeatherGuard AI Backend
echo ============================================

REM Install dependencies if needed
REM pip install -r requirements.txt

REM Optional: train ML models first
REM python ml/train_models.py

REM Start the FastAPI server
echo Starting server on http://localhost:8000 ...
python main.py

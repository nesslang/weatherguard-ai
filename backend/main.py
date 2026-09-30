import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes_forecast import router as forecast_router
from api.routes_regions import router as regions_router
from api.routes_model import router as model_router
from backend.database.database import init_db

app = FastAPI(title="WeatherGuard AI", description="AI-Based Forecast Bust Detection", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(forecast_router, prefix="/api")
app.include_router(regions_router, prefix="/api")
app.include_router(model_router, prefix="/api")

@app.on_event("startup")
def on_startup():
    print("Initializing Database...")
    init_db()
    
    models_dir = os.path.join(os.path.dirname(__file__), 'models')
    os.makedirs(models_dir, exist_ok=True)
    
    # Generate demo data if it doesn't exist
    data_path = os.path.join(os.path.dirname(__file__), 'data', 'demo_weather_data.csv')
    if not os.path.exists(data_path):
        from backend.data.demo_weather_data import generate_demo_data
        generate_demo_data()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

import pandas as pd
import numpy as np
import json
import os

def generate_demo_data():
    np.random.seed(42)
    
    # Load regions
    regions_path = os.path.join(os.path.dirname(__file__), 'demo_regions.json')
    with open(regions_path, 'r') as f:
        regions = json.load(f)
        
    dates = pd.date_range(start='2024-01-01', periods=10, freq='D')
    
    data = []
    
    for r in regions:
        region_name = r['name']
        base_bust_rate = r['historical_bust_rate']
        base_error = r['typical_error_mm']
        
        for date in dates:
            for lead_time in range(1, 11):
                # Features
                forecast_rainfall = np.random.gamma(shape=2.0, scale=10.0)
                forecast_temp = np.random.normal(loc=28.0, scale=5.0)
                forecast_pressure = np.random.normal(loc=1005.0, scale=8.0)
                forecast_wind = np.random.gamma(shape=2.5, scale=5.0)
                forecast_humidity = np.random.uniform(40, 95)
                
                # Dependencies
                ensemble_spread = np.random.gamma(shape=2.0, scale=2.0) * (1 + lead_time/5)
                prev_rainfall = max(0, forecast_rainfall + np.random.normal(0, 5))
                prev_pressure = forecast_pressure + np.random.normal(0, 2)
                prev_wind = max(0, forecast_wind + np.random.normal(0, 3))
                
                historical_error_mean = base_error + np.random.normal(0, 2)
                historical_error_std = historical_error_mean * 0.4
                
                weather_system_intensity = np.random.uniform(0.1, 1.0)
                
                # Target generation logic (Bust)
                bust_prob = base_bust_rate
                
                if lead_time > 5: bust_prob += 0.2
                if ensemble_spread > 15: bust_prob += 0.3
                if weather_system_intensity > 0.7: bust_prob += 0.15
                if abs(forecast_rainfall - prev_rainfall) > 30: bust_prob += 0.2
                
                bust_prob = min(0.95, max(0.05, bust_prob))
                
                is_bust = 1 if np.random.random() < bust_prob else 0
                
                # Actual error
                if is_bust:
                    actual_error = base_error * np.random.uniform(1.5, 3.0) + (lead_time * 2)
                else:
                    actual_error = base_error * np.random.uniform(0.2, 1.0) + (lead_time * 0.5)
                    
                data.append({
                    'region': region_name,
                    'date': date.strftime('%Y-%m-%d'),
                    'lead_time': lead_time,
                    'forecast_rainfall': forecast_rainfall,
                    'forecast_temp': forecast_temp,
                    'forecast_pressure': forecast_pressure,
                    'forecast_wind': forecast_wind,
                    'forecast_humidity': forecast_humidity,
                    'ensemble_spread': ensemble_spread,
                    'prev_rainfall': prev_rainfall,
                    'prev_pressure': prev_pressure,
                    'prev_wind': prev_wind,
                    'historical_error_mean': historical_error_mean,
                    'historical_error_std': historical_error_std,
                    'weather_system_intensity': weather_system_intensity,
                    'bust': is_bust,
                    'actual_error': actual_error
                })
                
    df = pd.DataFrame(data)
    out_path = os.path.join(os.path.dirname(__file__), 'demo_weather_data.csv')
    df.to_csv(out_path, index=False)
    print(f"Generated {len(df)} rows of demo data at {out_path}")
    return out_path

if __name__ == "__main__":
    generate_demo_data()

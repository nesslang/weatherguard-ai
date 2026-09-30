import pandas as pd
import numpy as np

def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    df_feat = df.copy()
    
    # Calculate forecast revisions
    if 'prev_rainfall' in df_feat.columns and 'forecast_rainfall' in df_feat.columns:
        df_feat['forecast_revision_rainfall'] = df_feat['forecast_rainfall'] - df_feat['prev_rainfall']
        df_feat['rainfall_change'] = df_feat['forecast_revision_rainfall'].abs()
        
    if 'prev_pressure' in df_feat.columns and 'forecast_pressure' in df_feat.columns:
        df_feat['forecast_revision_pressure'] = df_feat['forecast_pressure'] - df_feat['prev_pressure']
        df_feat['pressure_change'] = df_feat['forecast_revision_pressure'].abs()
        
    if 'prev_wind' in df_feat.columns and 'forecast_wind' in df_feat.columns:
        df_feat['forecast_revision_wind'] = df_feat['forecast_wind'] - df_feat['prev_wind']
        df_feat['wind_change'] = df_feat['forecast_revision_wind'].abs()

    # Derived interactive features
    if 'ensemble_spread' in df_feat.columns and 'weather_system_intensity' in df_feat.columns:
        df_feat['instability_index'] = df_feat['ensemble_spread'] * df_feat['weather_system_intensity']

    return df_feat

def get_feature_names():
    return [
        'lead_time', 'forecast_rainfall', 'forecast_temp', 'forecast_pressure',
        'forecast_wind', 'forecast_humidity', 'ensemble_spread', 'prev_rainfall',
        'prev_pressure', 'prev_wind', 'historical_error_mean', 'historical_error_std',
        'weather_system_intensity', 'forecast_revision_rainfall', 'rainfall_change',
        'forecast_revision_pressure', 'pressure_change', 'forecast_revision_wind',
        'wind_change', 'instability_index'
    ]

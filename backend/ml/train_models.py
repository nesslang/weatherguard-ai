import os
import json
import joblib
from xgboost import XGBClassifier, XGBRegressor
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from data.demo_weather_data import generate_demo_data
from backend.ml.preprocessing import load_data, split_data, scale_features
from backend.ml.feature_engineering import engineer_features, get_feature_names

def train_and_evaluate():
    print("1. Generating demo data...")
    csv_path = generate_demo_data()
    
    print("2. Loading and preprocessing data...")
    df = load_data(csv_path)
    
    print("3. Feature engineering...")
    df_feat = engineer_features(df)
    
    X_train, X_test, y_train_class, y_test_class, y_train_reg, y_test_reg = split_data(df_feat)
    
    feature_names = get_feature_names()
    X_train_filtered = X_train[feature_names]
    X_test_filtered = X_test[feature_names]
    
    X_train_scaled, X_test_scaled, scaler = scale_features(X_train_filtered, X_test_filtered)
    
    print("4. Training XGBoost Classifier (Bust Prediction)...")
    clf = XGBClassifier(n_estimators=200, max_depth=6, learning_rate=0.1, eval_metric='logloss', random_state=42)
    clf.fit(X_train_scaled, y_train_class)
    
    print("5. Training XGBoost Regressor (Error Prediction)...")
    reg = XGBRegressor(n_estimators=200, max_depth=5, learning_rate=0.1, random_state=42)
    reg.fit(X_train_scaled, y_train_reg)
    
    print("6. Evaluating Models...")
    # Classifier evaluation
    y_pred_class = clf.predict(X_test_scaled)
    y_prob_class = clf.predict_proba(X_test_scaled)[:, 1]
    
    acc = accuracy_score(y_test_class, y_pred_class)
    prec = precision_score(y_test_class, y_pred_class)
    rec = recall_score(y_test_class, y_pred_class)
    f1 = f1_score(y_test_class, y_pred_class)
    roc = roc_auc_score(y_test_class, y_prob_class)
    
    # Regressor evaluation
    y_pred_reg = reg.predict(X_test_scaled)
    mae = mean_absolute_error(y_test_reg, y_pred_reg)
    rmse = mean_squared_error(y_test_reg, y_pred_reg, squared=False)
    r2 = r2_score(y_test_reg, y_pred_reg)
    
    metrics = {
        "accuracy": float(acc),
        "precision": float(prec),
        "recall": float(rec),
        "f1": float(f1),
        "roc_auc": float(roc),
        "mae": float(mae),
        "rmse": float(rmse),
        "r2": float(r2)
    }
    
    print(f"Classifier - Acc: {acc:.3f}, F1: {f1:.3f}, AUC: {roc:.3f}")
    print(f"Regressor - MAE: {mae:.3f}, R2: {r2:.3f}")
    
    print("7. Saving Models...")
    models_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models')
    os.makedirs(models_dir, exist_ok=True)
    
    joblib.dump(clf, os.path.join(models_dir, 'bust_classifier.pkl'))
    joblib.dump(reg, os.path.join(models_dir, 'error_regressor.pkl'))
    joblib.dump(scaler, os.path.join(models_dir, 'scaler.pkl'))
    
    with open(os.path.join(models_dir, 'feature_names.json'), 'w') as f:
        json.dump(feature_names, f)
        
    with open(os.path.join(models_dir, 'model_metrics.json'), 'w') as f:
        json.dump(metrics, f)
        
    print("Training Complete!")

if __name__ == "__main__":
    train_and_evaluate()

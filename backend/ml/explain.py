import shap
import numpy as np

def compute_global_shap(model, X, feature_names):
    try:
        explainer = shap.TreeExplainer(model)
        shap_values = explainer.shap_values(X)
        
        # Calculate mean absolute SHAP value for each feature
        if isinstance(shap_values, list): # For multi-class or some classifier outputs
            mean_shap = np.abs(shap_values[1]).mean(axis=0)
        else:
            mean_shap = np.abs(shap_values).mean(axis=0)
            
        importance = []
        for i, name in enumerate(feature_names):
            importance.append({
                "feature": name,
                "importance": float(mean_shap[i]),
                "direction": "mixed" 
            })
        
        # Sort by importance
        importance = sorted(importance, key=lambda x: x["importance"], reverse=True)
        return importance
    except Exception as e:
        print(f"SHAP global error: {e}")
        return get_feature_importance_fallback(model, feature_names)

def compute_prediction_shap(model, X_single, feature_names):
    try:
        explainer = shap.TreeExplainer(model)
        shap_values = explainer.shap_values(X_single)
        
        if isinstance(shap_values, list): 
            vals = shap_values[1][0]
        else:
            vals = shap_values[0]
            
        explanation = []
        for i, name in enumerate(feature_names):
            val = float(vals[i])
            impact = abs(val)
            direction = "increases_uncertainty" if val > 0 else "decreases_uncertainty"
            
            explanation.append({
                "feature": name,
                "impact": impact,
                "direction": direction,
                "raw_val": val
            })
            
        # Sort by impact
        explanation = sorted(explanation, key=lambda x: x["impact"], reverse=True)
        # Normalize impacts to 0-1 for UI
        max_impact = max([e["impact"] for e in explanation]) if explanation else 1
        for e in explanation:
            e["impact"] = e["impact"] / max_impact if max_impact > 0 else 0
            
        return explanation[:8] # Return top 8
    except Exception as e:
        print(f"SHAP local error: {e}")
        return []

def get_feature_importance_fallback(model, feature_names):
    try:
        importances = model.feature_importances_
        res = []
        for i, name in enumerate(feature_names):
            res.append({
                "feature": name,
                "importance": float(importances[i]),
                "direction": "unknown"
            })
        return sorted(res, key=lambda x: x["importance"], reverse=True)
    except:
        return []

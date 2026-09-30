from fastapi import APIRouter
import json
import os

from backend.ml.predict import get_demo_prediction

router = APIRouter()

@router.get("/region-risk")
def get_region_risk():
    regions_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'demo_regions.json')
    with open(regions_path, 'r') as f:
        regions = json.load(f)
        
    results = []
    for r in regions:
        # Get day 4 demo prediction as baseline
        pred = get_demo_prediction(r['name'], 4, 'Rainfall')
        r_out = dict(r)
        r_out['bust_probability'] = pred['bust_probability']
        r_out['confidence'] = pred['confidence']
        r_out['expected_error'] = pred['expected_error']
        r_out['risk_level'] = pred['risk_level']
        results.append(r_out)
        
    # Sort by bust probability descending
    return sorted(results, key=lambda x: x['bust_probability'], reverse=True)

@router.get("/historical-analogue")
def get_historical_analogue(region: str, variable: str = 'Rainfall'):
    return [
        {"year": 2019, "similarity": 87, "had_bust": True, "error_magnitude": 45, "pattern_description": "Monsoon depression with high ensemble spread"},
        {"year": 2021, "similarity": 81, "had_bust": False, "error_magnitude": 15, "pattern_description": "Active monsoon phase, stable pressure"},
        {"year": 2023, "similarity": 76, "had_bust": True, "error_magnitude": 38, "pattern_description": "Rapidly intensifying low pressure system"}
    ]

import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';
export let IS_DEMO = false;

export const DEMO_REGIONS = [
  { name: 'Maharashtra', lat: 19.7515, lng: 75.7139, bust_probability: 0.74, confidence: 41, risk_level: 'HIGH', expected_error: 42 },
  { name: 'Gujarat', lat: 22.2587, lng: 71.1924, bust_probability: 0.81, confidence: 35, risk_level: 'VERY HIGH', expected_error: 58 },
  { name: 'Rajasthan', lat: 27.0238, lng: 74.2179, bust_probability: 0.68, confidence: 52, risk_level: 'HIGH', expected_error: 34 },
  { name: 'Madhya Pradesh', lat: 22.9734, lng: 78.6569, bust_probability: 0.62, confidence: 58, risk_level: 'HIGH', expected_error: 28 },
  { name: 'Odisha', lat: 20.9517, lng: 85.0985, bust_probability: 0.55, confidence: 65, risk_level: 'HIGH', expected_error: 31 },
  { name: 'West Bengal', lat: 22.9868, lng: 87.8550, bust_probability: 0.48, confidence: 72, risk_level: 'MODERATE', expected_error: 22 },
  { name: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, bust_probability: 0.42, confidence: 78, risk_level: 'MODERATE', expected_error: 19 },
  { name: 'Bihar', lat: 25.0961, lng: 85.3131, bust_probability: 0.38, confidence: 82, risk_level: 'MODERATE', expected_error: 16 },
  { name: 'Karnataka', lat: 15.3173, lng: 75.7139, bust_probability: 0.35, confidence: 85, risk_level: 'MODERATE', expected_error: 14 },
  { name: 'Tamil Nadu', lat: 11.1271, lng: 78.6569, bust_probability: 0.28, confidence: 89, risk_level: 'LOW', expected_error: 11 },
  { name: 'Andhra Pradesh', lat: 15.9129, lng: 79.7400, bust_probability: 0.31, confidence: 87, risk_level: 'MODERATE', expected_error: 13 },
  { name: 'Telangana', lat: 18.1124, lng: 79.0193, bust_probability: 0.44, confidence: 76, risk_level: 'MODERATE', expected_error: 21 },
  { name: 'Chhattisgarh', lat: 21.2787, lng: 81.8661, bust_probability: 0.51, confidence: 69, risk_level: 'HIGH', expected_error: 26 },
  { name: 'Punjab', lat: 31.1471, lng: 75.3412, bust_probability: 0.25, confidence: 91, risk_level: 'LOW', expected_error: 9 },
  { name: 'Haryana', lat: 29.0588, lng: 76.0856, bust_probability: 0.22, confidence: 93, risk_level: 'LOW', expected_error: 8 },
  { name: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734, bust_probability: 0.33, confidence: 87, risk_level: 'MODERATE', expected_error: 15 },
  { name: 'Uttarakhand', lat: 30.0668, lng: 79.0193, bust_probability: 0.40, confidence: 80, risk_level: 'MODERATE', expected_error: 18 },
  { name: 'Assam', lat: 26.2006, lng: 92.9376, bust_probability: 0.57, confidence: 63, risk_level: 'HIGH', expected_error: 29 },
  { name: 'Kerala', lat: 10.8505, lng: 76.2711, bust_probability: 0.30, confidence: 88, risk_level: 'MODERATE', expected_error: 12 },
  { name: 'Jharkhand', lat: 23.6102, lng: 85.2799, bust_probability: 0.45, confidence: 75, risk_level: 'MODERATE', expected_error: 20 }
];

export const getHealth = async () => {
  try {
    const res = await axios.get(`${API_BASE}/health`);
    IS_DEMO = false;
    return res.data;
  } catch (e) {
    IS_DEMO = true;
    return { status: 'offline', data_mode: 'demo' };
  }
};

export const getRegionRisk = async () => {
  try {
    const res = await axios.get(`${API_BASE}/region-risk`);
    IS_DEMO = false;
    return res.data;
  } catch (e) {
    IS_DEMO = true;
    return DEMO_REGIONS;
  }
};

export const getBustProbability = async (region) => {
  try {
    const res = await axios.get(`${API_BASE}/bust-probability`, { params: { region }});
    IS_DEMO = false;
    return res.data;
  } catch (e) {
    IS_DEMO = true;
    const r = DEMO_REGIONS.find(d => d.name === region) || DEMO_REGIONS[0];
    const data = [];
    for(let i=1; i<=10; i++) {
        data.push({
            day: i,
            bust_probability: r.bust_probability * (0.8 + (i/10)*0.4),
            expected_error: r.expected_error * (0.8 + (i/10)*0.5)
        });
    }
    return data;
  }
};

export const getModelPerformance = async () => {
    try {
        const res = await axios.get(`${API_BASE}/model-performance`);
        IS_DEMO = false;
        return res.data;
    } catch(e) {
        IS_DEMO = true;
        return {
            accuracy: 0.918,
            precision: 0.894,
            recall: 0.879,
            f1: 0.886,
            roc_auc: 0.942,
            mae: 8.3,
            rmse: 12.1,
            r2: 0.847
        };
    }
}

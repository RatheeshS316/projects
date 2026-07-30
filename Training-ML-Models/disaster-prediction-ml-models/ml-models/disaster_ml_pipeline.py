import os
import time
import argparse
import logging
import numpy as np
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score

# ================= Setup Logging =================
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler("disaster_pipeline.log"),
        logging.StreamHandler()
    ]
)

# ================= 1. Data Utils (Mock Data Generation) =================
def generate_mock_data(disaster_type, output_dir='datasets'):
    """Generates mock CSV data for training if real data is missing."""
    os.makedirs(output_dir, exist_ok=True)
    num_samples = 1000
    
    if disaster_type == 'flood':
        data = {
            'rainfall': np.random.uniform(0, 500, num_samples),
            'water_level': np.random.uniform(0, 10, num_samples),
            'soil_moisture': np.random.uniform(0, 100, num_samples),
            'temperature': np.random.uniform(10, 45, num_samples),
            'humidity': np.random.uniform(20, 100, num_samples)
        }
        df = pd.DataFrame(data)
        risk_score = (df['rainfall']/500 * 0.4) + (df['water_level']/10 * 0.4) + (df['soil_moisture']/100 * 0.2)
        df['risk_probability'] = np.clip(risk_score + np.random.normal(0, 0.05, num_samples), 0, 1)
        df['target'] = (df['risk_probability'] > 0.6).astype(int)
        
    elif disaster_type == 'earthquake':
        data = {
            'magnitude': np.random.uniform(2, 9, num_samples),
            'depth': np.random.uniform(1, 700, num_samples),
            'time_patterns': np.random.uniform(0, 24, num_samples),
            'seismic_anomalies': np.random.uniform(0, 1, num_samples)
        }
        df = pd.DataFrame(data)
        risk_score = (df['magnitude']/9 * 0.6) + ((700 - df['depth'])/700 * 0.3) + (df['seismic_anomalies'] * 0.1)
        df['risk_probability'] = np.clip(risk_score + np.random.normal(0, 0.05, num_samples), 0, 1)
        df['target'] = (df['risk_probability'] > 0.7).astype(int)
        
    elif disaster_type == 'tsunami':
        data = {
            'magnitude': np.random.uniform(5, 9, num_samples),
            'depth': np.random.uniform(1, 50, num_samples),
            'distance_coast': np.random.uniform(0, 500, num_samples),
            'sea_level_variation': np.random.uniform(0, 5, num_samples)
        }
        df = pd.DataFrame(data)
        risk_score = (df['magnitude']/9 * 0.3) + ((500-df['distance_coast'])/500 * 0.2) + (df['sea_level_variation']/5 * 0.5)
        df['risk_probability'] = np.clip(risk_score + np.random.normal(0, 0.05, num_samples), 0, 1)
        df['target'] = (df['risk_probability'] > 0.6).astype(int)
    else:
        raise ValueError("Invalid disaster type")
        
    filepath = os.path.join(output_dir, f"{disaster_type}_mock.csv")
    df.to_csv(filepath, index=False)
    return filepath

def load_data(filepath):
    """Loads dataset from CSV (Mock or Real)."""
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Dataset not found at {filepath}")
    return pd.read_csv(filepath)

def preprocess_data(df, target_col='target', drop_cols=['risk_probability']):
    """Separates features and targets, handles missing values."""
    df = df.dropna()
    X = df.drop(columns=[target_col] + drop_cols, errors='ignore')
    y = df[target_col]
    return X, y

# ================= 2. Model Pipeline =================
class BaseDRModel:
    """Base class for Disaster Random Forest Models"""
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        
    def train(self, data_path):
        df = load_data(data_path)
        X, y = preprocess_data(df)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)
        return self.model, X_test, y_test, list(X.columns)
        
    def predict(self, model, input_data):
        df = pd.DataFrame([input_data]) if isinstance(input_data, dict) else input_data
        return model.predict_proba(df)[0][1]

class FloodModel(BaseDRModel): pass
class EarthquakeModel(BaseDRModel): pass
class TsunamiModel(BaseDRModel): pass

# ================= 3. Real-time API Stream Simulators =================
def get_realtime_flood_data():
    return {'rainfall': np.random.uniform(0, 200), 'water_level': np.random.uniform(1, 8), 'soil_moisture': np.random.uniform(20, 90), 'temperature': np.random.uniform(15, 35), 'humidity': np.random.uniform(40, 95)}

def get_realtime_earthquake_data():
    return {'magnitude': np.random.uniform(2.5, 7.5), 'depth': np.random.uniform(10, 300), 'time_patterns': np.random.uniform(0, 24), 'seismic_anomalies': np.random.uniform(0, 0.8)}

def get_realtime_tsunami_data():
    return {'magnitude': np.random.uniform(5.5, 8.5), 'depth': np.random.uniform(5, 40), 'distance_coast': np.random.uniform(50, 300), 'sea_level_variation': np.random.uniform(0.5, 3.5)}

def simulate_accelerometer_data():
    """Simulates phone vibration (accelerometer X,Y,Z)."""
    is_shaking = np.random.rand() > 0.7 
    if is_shaking: return {'x': np.random.uniform(5, 15), 'y': np.random.uniform(5, 15), 'z': np.random.uniform(5, 15)}
    else: return {'x': np.random.uniform(-1, 1), 'y': np.random.uniform(-1, 1), 'z': np.random.uniform(9, 10.5)}

def analyze_vibration(accel_data, threshold=5.0):
    """Detects abnormal vibration using mobile sensor data."""
    magnitude = np.sqrt(accel_data['x']**2 + accel_data['y']**2 + (accel_data['z']-9.8)**2)
    return magnitude > threshold

# ================= 4. System Execution Logic =================
def run_training(disaster, use_mock):
    logging.info(f"\n--- Training {disaster.capitalize()} Model ---")
    data_dir = 'datasets'
    data_path = os.path.join(data_dir, f"{disaster}_mock.csv")
    
    if use_mock:
        logging.info("Generating mock data...")
        generate_mock_data(disaster, output_dir=data_dir)
    
    if not os.path.exists(data_path):
        logging.error(f"Error: Real dataset {data_path} missing. Use mock or add real CSV.")
        return

    models = {'flood': FloodModel, 'earthquake': EarthquakeModel, 'tsunami': TsunamiModel}
    model_wrapper = models[disaster]()

    model, X_test, y_test, _ = model_wrapper.train(data_path)
    y_pred = model.predict(X_test)
    
    logging.info(f"Model trained. Accuracy: {accuracy_score(y_test, y_pred):.4f} | F1-Score: {f1_score(y_test, y_pred, zero_division=0):.4f}")
    
    os.makedirs('models', exist_ok=True)
    joblib.dump(model, os.path.join('models', f"{disaster}_rf_model.pkl"))
    logging.info("Training Complete.\n")

def run_prediction(disaster, num_iterations=3):
    logging.info(f"\n--- Real-time Prediction for {disaster.capitalize()} ---")
    model_path = os.path.join('models', f"{disaster}_rf_model.pkl")
    
    if not os.path.exists(model_path):
        logging.error("Model not found. Train it first!")
        return
    model = joblib.load(model_path)

    models = {'flood': FloodModel, 'earthquake': EarthquakeModel, 'tsunami': TsunamiModel}
    data_funcs = {'flood': get_realtime_flood_data, 'earthquake': get_realtime_earthquake_data, 'tsunami': get_realtime_tsunami_data}
    
    model_wrapper = models[disaster]()
    get_data_func = data_funcs[disaster]

    for i in range(num_iterations):
        logging.info(f"\n[Stream {i+1}] Fetching real-time API data...")
        rt_data = get_data_func()
        
        prob = model_wrapper.predict(model, rt_data)
        confidence_score = prob * 100
        logging.info(f"➔ Risk Probability: {confidence_score:.2f}% | Incoming Data: {rt_data}")
        
        # FINAL DECISION LOGIC
        alert_triggered = False
        if disaster == 'earthquake':
            accel_data = simulate_accelerometer_data()
            vibration_flag = analyze_vibration(accel_data)
            logging.info(f"Phone Accelerometer -> {accel_data}")
            logging.info(f"Abnormal Shaking Detected: {vibration_flag}")
            
            if prob > 0.85 and vibration_flag:
                alert_triggered = True
        else:
            if prob > 0.85:
                alert_triggered = True
                
        if alert_triggered:
            logging.warning("🚨 HIGH RISK DISASTER ALERT TRIGGERED! 🚨")
            logging.warning("Action: Activating Mesh Network & High-Frequency GPS Tracking!")
        else:
            logging.info(f"✅ Status: {'LOW' if prob < 0.5 else 'MEDIUM'} RISK. Safe.")
            
        time.sleep(1.5)

# ================= Entry Point =================
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Single-file Disaster ML Pipeline")
    parser.add_argument('--model', choices=['flood', 'earthquake', 'tsunami', 'all'], required=True, help="Model to process")
    parser.add_argument('--mode', choices=['train', 'predict'], required=True, help="Train or Stream Live?")
    parser.add_argument('--data', choices=['mock', 'real'], default='mock', help="Generate mock or use real?")
    
    args = parser.parse_args()
    
    models_to_run = ['flood', 'earthquake', 'tsunami'] if args.model == 'all' else [args.model]
    for m in models_to_run:
        if args.mode == 'train':
            run_training(m, use_mock=(args.data == 'mock'))
        elif args.mode == 'predict':
            run_prediction(m)

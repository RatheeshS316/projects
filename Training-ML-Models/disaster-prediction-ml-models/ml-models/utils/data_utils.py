import pandas as pd
import numpy as np
import os

def generate_mock_data(disaster_type, output_dir='datasets'):
    """Generates mock training data and saves it to a CSV file."""
    os.makedirs(output_dir, exist_ok=True)
    num_samples = 1000
    
    if disaster_type == 'flood':
        # rainfall (0-500mm), water level (0-10m), soil moisture (0-100%), temp (10-45C), humidity (20-100%)
        data = {
            'rainfall': np.random.uniform(0, 500, num_samples),
            'water_level': np.random.uniform(0, 10, num_samples),
            'soil_moisture': np.random.uniform(0, 100, num_samples),
            'temperature': np.random.uniform(10, 45, num_samples),
            'humidity': np.random.uniform(20, 100, num_samples)
        }
        df = pd.DataFrame(data)
        # Simple rule for risk
        risk_score = (df['rainfall']/500 * 0.4) + (df['water_level']/10 * 0.4) + (df['soil_moisture']/100 * 0.2)
        df['risk_probability'] = np.clip(risk_score + np.random.normal(0, 0.05, num_samples), 0, 1)
        df['target'] = (df['risk_probability'] > 0.6).astype(int)
        
    elif disaster_type == 'earthquake':
        # magnitude (2-9), depth (1-700km), time_patterns (0-24h), seismic_anomalies (0-1)
        data = {
            'magnitude': np.random.uniform(2, 9, num_samples),
            'depth': np.random.uniform(1, 700, num_samples),
            'time_patterns': np.random.uniform(0, 24, num_samples),
            'seismic_anomalies': np.random.uniform(0, 1, num_samples)
        }
        df = pd.DataFrame(data)
        # higher magnitude and shallower depth -> higher risk
        risk_score = (df['magnitude']/9 * 0.6) + ((700 - df['depth'])/700 * 0.3) + (df['seismic_anomalies'] * 0.1)
        df['risk_probability'] = np.clip(risk_score + np.random.normal(0, 0.05, num_samples), 0, 1)
        df['target'] = (df['risk_probability'] > 0.7).astype(int)
        
    elif disaster_type == 'tsunami':
        # magnitude (5-9), depth (1-50km), distance_coast (0-500km), sea_level_variation (0-5m)
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
    print(f"Generated mock data at {filepath}")
    return filepath

def load_data(filepath):
    """Loads dataset from CSV."""
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Dataset not found at {filepath}")
    return pd.read_csv(filepath)

def preprocess_data(df, target_col='target', drop_cols=['risk_probability']):
    """Separates features and targets, handles missing values if any."""
    df = df.dropna()
    X = df.drop(columns=[target_col] + drop_cols, errors='ignore')
    y = df[target_col]
    return X, y

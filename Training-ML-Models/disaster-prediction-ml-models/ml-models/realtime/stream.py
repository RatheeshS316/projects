import numpy as np

def get_realtime_flood_data():
    """Simulates incoming real-time weather data for flood prediction."""
    return {
        'rainfall': np.random.uniform(0, 200), # mm
        'water_level': np.random.uniform(1, 8), # m
        'soil_moisture': np.random.uniform(20, 90), # %
        'temperature': np.random.uniform(15, 35), # C
        'humidity': np.random.uniform(40, 95) # %
    }

def get_realtime_earthquake_data():
    """Simulates real-time seismic data."""
    return {
        'magnitude': np.random.uniform(2.5, 7.5),
        'depth': np.random.uniform(10, 300),
        'time_patterns': np.random.uniform(0, 24),
        'seismic_anomalies': np.random.uniform(0, 0.8)
    }

def get_realtime_tsunami_data():
    """Simulates real-time ocean and seismic data."""
    return {
        'magnitude': np.random.uniform(5.5, 8.5),
        'depth': np.random.uniform(5, 40),
        'distance_coast': np.random.uniform(50, 300),
        'sea_level_variation': np.random.uniform(0.5, 3.5)
    }

def simulate_accelerometer_data():
    """Simulates phone vibration/accelerometer data (X, Y, Z)."""
    # Normal: low variance. Earthquake: high variance.
    is_shaking = np.random.rand() > 0.7 # 30% chance to simulate a shake for demo
    
    if is_shaking:
        return {
            'x': np.random.uniform(5, 15),
            'y': np.random.uniform(5, 15),
            'z': np.random.uniform(5, 15)
        }
    else:
        return {
            'x': np.random.uniform(-1, 1),
            'y': np.random.uniform(-1, 1),
            'z': np.random.uniform(9, 10.5) # gravity on Z
        }

def analyze_vibration(accel_data, threshold=5.0):
    """Detects abnormal vibration pattern (e.g., variance/magnitude > threshold)."""
    # Compute vector magnitude minus baseline gravity
    magnitude = np.sqrt(accel_data['x']**2 + accel_data['y']**2 + (accel_data['z']-9.8)**2)
    return magnitude > threshold

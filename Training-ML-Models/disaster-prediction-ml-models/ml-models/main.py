import argparse
import os
import time
import logging
from utils.data_utils import generate_mock_data
from utils.model_utils import save_model, load_model, evaluate_model
import realtime.stream as stream

# Setup Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler("disaster_pipeline.log"),
        logging.StreamHandler()
    ]
)

def run_training(disaster, use_mock):
    logging.info(f"\n--- Training {disaster.capitalize()} Model ---")
    data_dir = 'datasets'
    data_path = os.path.join(data_dir, f"{disaster}_mock.csv")
    
    if use_mock:
        logging.info("Generating mock data...")
        generate_mock_data(disaster, output_dir=data_dir)
    
    if not os.path.exists(data_path):
        logging.error(f"Error: Dataset {data_path} not found. Please run with --data mock first.")
        return

    # Load respective model class
    if disaster == 'flood':
        from flood.model import FloodModel
        model_wrapper = FloodModel()
    elif disaster == 'earthquake':
        from earthquake.model import EarthquakeModel
        model_wrapper = EarthquakeModel()
    elif disaster == 'tsunami':
        from tsunami.model import TsunamiModel
        model_wrapper = TsunamiModel()
    else:
        logging.error("Unknown disaster type")
        return

    model, X_test, y_test, feature_names = model_wrapper.train(data_path)
    
    y_pred = model.predict(X_test)
    evaluate_model(y_test, y_pred, model, X_test, feature_names)
    
    save_model(model, disaster)
    logging.info("Training Complete.\n")

def run_prediction(disaster, num_iterations=3):
    logging.info(f"\n--- Real-time Prediction for {disaster.capitalize()} ---")
    
    try:
        model = load_model(disaster)
    except Exception as e:
        logging.error(e)
        return

    if disaster == 'flood':
        from flood.model import FloodModel
        model_wrapper = FloodModel()
        get_data_func = stream.get_realtime_flood_data
    elif disaster == 'earthquake':
        from earthquake.model import EarthquakeModel
        model_wrapper = EarthquakeModel()
        get_data_func = stream.get_realtime_earthquake_data
    elif disaster == 'tsunami':
        from tsunami.model import TsunamiModel
        model_wrapper = TsunamiModel()
        get_data_func = stream.get_realtime_tsunami_data
    else:
        logging.error("Unknown disaster type")
        return

    for i in range(num_iterations):
        logging.info(f"\n[Stream {i+1}] Fetching real-time data...")
        rt_data = get_data_func()
        logging.info(f"Incoming features: {rt_data}")
        
        prob = model_wrapper.predict(model, rt_data)
        confidence_score = prob * 100
        
        logging.info(f"➔ ML Prediction Risk Level: {confidence_score:.2f}%")
        
        # Decision Engine Logic
        alert_triggered = False
        
        if disaster == 'earthquake':
            # Check sensor logic for earthquake
            logging.info("Fetching accelerometer data from mobile phone...")
            accel_data = stream.simulate_accelerometer_data()
            logging.info(f"Phone Sensor data -> X: {accel_data['x']:.2f}, Y: {accel_data['y']:.2f}, Z: {accel_data['z']:.2f}")
            vibration_flag = stream.analyze_vibration(accel_data)
            logging.info(f"Abnormal Vibration Detected: {vibration_flag}")
            
            # Decision trigger condition
            if prob > 0.85 and vibration_flag:
                alert_triggered = True
        else:
            # General trigger condition for flood and tsunami
            if prob > 0.85:
                alert_triggered = True
                
        if alert_triggered:
            logging.warning("🚨 HIGH RISK ALERT TRIGGERED! 🚨")
            logging.warning("⚡ Action: Triggering early warning system, GPS activation, and last location capture.")
        else:
            risk_level = "LOW" if prob < 0.5 else "MEDIUM"
            logging.info(f"✅ Status: {risk_level} RISK. No immediate action required.")
            
        time.sleep(1.5) # simulate stream delay

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Disaster Prediction ML Module Pipeline")
    parser.add_argument('--model', choices=['flood', 'earthquake', 'tsunami', 'all'], required=True, help='Which model to process')
    parser.add_argument('--mode', choices=['train', 'predict'], required=True, help='Train the model or run real-time predictions')
    parser.add_argument('--data', choices=['mock', 'real'], default='mock', help='Use mock data generation for training')
    
    args = parser.parse_args()
    
    models_to_run = ['flood', 'earthquake', 'tsunami'] if args.model == 'all' else [args.model]
    
    for m in models_to_run:
        if args.mode == 'train':
            use_mock = (args.data == 'mock')
            run_training(m, use_mock)
        elif args.mode == 'predict':
            run_prediction(m)

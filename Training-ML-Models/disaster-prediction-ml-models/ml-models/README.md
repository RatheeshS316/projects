# Disaster Prediction ML Module

This is a complete, standalone Machine Learning module for a Disaster Prediction System. It supports both training with mock data and real-time prediction using simulated data streams. The module covers three types of disasters: Flood, Earthquake, and Tsunami.

## Project Structure

*   `earthquake/`: Earthquake specific models and logic.
*   `flood/`: Flood specific models and logic.
*   `tsunami/`: Tsunami specific models and logic.
*   `datasets/`: Directory where generated mock datasets are stored.
*   `realtime/`: Real-time data stream simulators and sensor integration.
*   `utils/`: Utility functions for data generation, preprocessing, model evaluation, and saving/loading models.
*   `main.py`: The entry point script supporting CLI arguments for training and prediction.
*   `models/`: Directory where trained `.pkl` models are stored.
*   `plots/`: Directory for feature importance visualizations.

## Features

*   **Offline Training**: Generate mock synthetic data to train Random Forest models if real datasets are not available.
*   **Real-time Prediction**: Simulate streaming live data for predictions.
*   **Sensor Integration**: Simulates mobile phone accelerometer data to detect abnormal vibrations (for earthquake detection).
*   **Final Decision Engine**: Combines the high ML probability (>85%) with sensor flags to trigger high-risk alerts.
*   **Logging System**: Outputs events to both the console and a file termed `disaster_pipeline.log`.

## Installation

Ensure you have Python 3.8+ installed.

1. Clone or download this project.
2. Navigate to the `ml-models` directory.
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

You can use the command-line interface with `main.py` for either **training** or **predicting**.

### 1. Training

Train the models using mock data:

```bash
# Train the flood model
python main.py --model flood --mode train --data mock

# Train the earthquake model
python main.py --model earthquake --mode train --data mock

# Train the tsunami model
python main.py --model tsunami --mode train --data mock

# Train all models at once
python main.py --model all --mode train --data mock
```
During training:
* Mock CSV data is generated and saved locally in `datasets/`.
* The models are trained and evaluated with accuracy, precision, recall, and F1-score printed.
* Trained models are saved into `models/`.
* Feature importance charts are saved into `plots/`.

### 2. Prediction

Run predicting on simulated live streams:

```bash
# Predict flood risk in real-time
python main.py --model flood --mode predict

# Predict tsunami risk in real-time
python main.py --model tsunami --mode predict

# Predict earthquake risk (includes accelerometer logic) in real-time
python main.py --model earthquake --mode predict
```

This will run simulated streams, show incoming features, prediction probabilities, and apply the final decision engine to decide the risk alert status.

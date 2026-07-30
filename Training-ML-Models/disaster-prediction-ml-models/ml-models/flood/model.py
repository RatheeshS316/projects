from sklearn.ensemble import RandomForestClassifier
from utils.data_utils import load_data, preprocess_data
from sklearn.model_selection import train_test_split

class FloodModel:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        
    def train(self, data_path):
        df = load_data(data_path)
        X, y = preprocess_data(df)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        self.model.fit(X_train, y_train)
        return self.model, X_test, y_test, list(X.columns)
        
    def predict(self, model, input_data):
        import pandas as pd
        if isinstance(input_data, dict):
            df = pd.DataFrame([input_data])
        else:
            df = input_data
        
        prob = model.predict_proba(df)[0][1] # Probability of flood risk class
        return prob

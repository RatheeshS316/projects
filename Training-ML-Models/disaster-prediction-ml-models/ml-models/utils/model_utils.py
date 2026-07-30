import joblib
import os
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report

def save_model(model, disaster_type, model_dir='models'):
    """Saves the trained model to disk."""
    os.makedirs(model_dir, exist_ok=True)
    filepath = os.path.join(model_dir, f"{disaster_type}_rf_model.pkl")
    joblib.dump(model, filepath)
    print(f"Model saved to {filepath}")

def load_model(disaster_type, model_dir='models'):
    """Loads a trained model from disk."""
    filepath = os.path.join(model_dir, f"{disaster_type}_rf_model.pkl")
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Model not found at {filepath}. Please train it first.")
    return joblib.load(filepath)

def evaluate_model(y_true, y_pred, model, X_test, feature_names=None):
    """Evaluates the model and optionally plots feature importance."""
    print("\n--- Model Evaluation ---")
    print(f"Accuracy:  {accuracy_score(y_true, y_pred):.4f}")
    print(f"Precision: {precision_score(y_true, y_pred, zero_division=0):.4f}")
    print(f"Recall:    {recall_score(y_true, y_pred, zero_division=0):.4f}")
    print(f"F1-Score:  {f1_score(y_true, y_pred, zero_division=0):.4f}")
    print("\nClassification Report:")
    print(classification_report(y_true, y_pred, zero_division=0))
    
    if hasattr(model, 'feature_importances_') and feature_names is not None:
        plot_feature_importance(model.feature_importances_, feature_names)

def plot_feature_importance(importances, feature_names):
    """Plots and saves feature importance chart."""
    plt.figure(figsize=(8, 5))
    indices = importances.argsort()
    plt.barh(range(len(indices)), importances[indices], color='b', align='center')
    plt.yticks(range(len(indices)), [feature_names[i] for i in indices])
    plt.title('Feature Importances')
    plt.xlabel('Relative Importance')
    os.makedirs('plots', exist_ok=True)
    filepath = os.path.join('plots', 'feature_importance.png')
    plt.savefig(filepath)
    print(f"Saved feature importance chart to {filepath}")
    plt.close()

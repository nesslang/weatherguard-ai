import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

def load_data(path: str) -> pd.DataFrame:
    df = pd.read_csv(path)
    df.fillna(df.mean(numeric_only=True), inplace=True)
    return df

def split_data(df: pd.DataFrame):
    # Separate features and target
    y_class = df['bust']
    y_reg = df['actual_error']
    X = df.drop(['bust', 'actual_error', 'region', 'date'], axis=1, errors='ignore')
    
    # Stratified split on classification target
    X_train, X_test, y_train_class, y_test_class = train_test_split(
        X, y_class, test_size=0.2, random_state=42, stratify=y_class
    )
    
    # Use same indices for regression target
    y_train_reg = y_reg.loc[y_train_class.index]
    y_test_reg = y_reg.loc[y_test_class.index]
    
    return X_train, X_test, y_train_class, y_test_class, y_train_reg, y_test_reg

def scale_features(X_train, X_test):
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    return X_train_scaled, X_test_scaled, scaler

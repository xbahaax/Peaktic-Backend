import pandas as pd
import numpy as np
import joblib
from datetime import datetime

def main():
    print("Loading model...")
    # Load the trained model
    model = joblib.load('predictor.pkl')
    
    print("Loading test data...")
    # Load the test dataset
    test_df = pd.read_csv('test_final.csv')
    
    # Convert week to datetime
    test_df['week'] = pd.to_datetime(test_df['week'])
    
    # Extract date features
    test_df['year'] = test_df['week'].dt.year
    test_df['month'] = test_df['week'].dt.month
    test_df['week_of_year'] = test_df['week'].dt.isocalendar().week
    test_df['day_of_week'] = test_df['week'].dt.dayofweek
    test_df['quarter'] = test_df['week'].dt.quarter
    
    # Create price difference features
    test_df['price_diff'] = test_df['base_price'] - test_df['total_price']
    test_df['discount_percentage'] = test_df['price_diff'] / test_df['base_price'] * 100
    test_df['has_discount'] = (test_df['price_diff'] > 0).astype(int)
    
    # Load training data to get historical stats
    print("Loading training data for historical stats...")
    train_df = pd.read_csv('dataset_devcamp.csv')
    
    # Convert week to datetime in training data
    train_df['week'] = pd.to_datetime(train_df['week'])
    
    # Apply historical features from train to test
    # Store level stats
    print("Creating historical features...")
    store_stats = train_df.groupby('store_id')['units_sold'].agg(['mean', 'std']).reset_index()
    store_stats.columns = ['store_id', 'store_avg_units', 'store_std_units']
    test_df = pd.merge(test_df, store_stats, on='store_id', how='left')
    test_df['store_std_units'].fillna(0, inplace=True)
    test_df['store_avg_units'].fillna(train_df['units_sold'].mean(), inplace=True)
    
    # SKU level stats
    sku_stats = train_df.groupby('sku_id')['units_sold'].agg(['mean', 'std']).reset_index()
    sku_stats.columns = ['sku_id', 'sku_avg_units', 'sku_std_units']
    test_df = pd.merge(test_df, sku_stats, on='sku_id', how='left')
    test_df['sku_std_units'].fillna(0, inplace=True)
    test_df['sku_avg_units'].fillna(train_df['units_sold'].mean(), inplace=True)
    
    # Store-SKU combination stats
    store_sku_avg = train_df.groupby(['store_id', 'sku_id'])['units_sold'].mean().reset_index()
    store_sku_avg.columns = ['store_id', 'sku_id', 'store_sku_avg_units']
    test_df = pd.merge(test_df, store_sku_avg, on=['store_id', 'sku_id'], how='left')
    test_df['store_sku_avg_units'].fillna(test_df['sku_avg_units'], inplace=True)
    
    # Add promotional combination features
    test_df['promo_combination'] = test_df['is_featured_sku'].astype(str) + '_' + test_df['is_display_sku'].astype(str)
    
    # Select features for prediction (same as used during training)
    feature_columns = [
        'store_id', 'sku_id', 'total_price', 'base_price', 'is_featured_sku', 'is_display_sku',
        'year', 'month', 'week_of_year', 'day_of_week', 'quarter',
        'price_diff', 'discount_percentage', 'has_discount',
        'store_avg_units', 'store_std_units', 'sku_avg_units', 'sku_std_units', 'store_sku_avg_units'
    ]
    
    # Prepare test data
    X_test = test_df[feature_columns]
    
    # Fill any NaN values
    X_test = X_test.fillna(0)
    
    # Handle any infinite values
    X_test = X_test.replace([np.inf, -np.inf], 0)
    
    print("Making predictions...")
    # Predict units_sold
    test_preds = model.predict(X_test)
    
    # Convert from log scale if needed (assuming log transform was used during training)
    log_transform = True
    if log_transform:
        test_preds = np.expm1(test_preds)
    
    # Handle negative values if any
    test_preds = np.maximum(0, test_preds)
    
    # Round predictions to integers (units should be whole numbers)
    test_preds = np.round(test_preds).astype(int)
    
    # Add predictions to the test dataframe
    test_df['units_sold'] = test_preds
    
    # Create a submission file with record_ID and units_sold
    print("Creating submission file...")
    submission_df = test_df[['record_ID', 'units_sold']]
    submission_df.to_csv('predicted_sales.csv', index=False)
    
    print("Predictions complete. Results saved to 'predicted_sales.csv'")

if __name__ == "__main__":
    main() 
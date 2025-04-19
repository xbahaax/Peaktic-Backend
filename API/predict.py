import pandas as pd

def predict(input_csv_path, output_csv_path):
    # Read the input CSV file
    data = pd.read_csv(input_csv_path)
    
    # Perform prediction logic (dummy example)
    data['prediction'] = data['value'] * 2  # Example prediction logic
    
    # Write the results to the output CSV file
    data.to_csv(output_csv_path, index=False)

if __name__ == "__main__":
    import sys
    input_csv = sys.argv[1]
    output_csv = sys.argv[2]
    predict(input_csv, output_csv)
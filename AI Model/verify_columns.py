import pandas as pd
import sys

def verify_columns(file_path, required_columns):
    try:
        df = pd.read_excel(file_path)
        missing_columns = [col for col in required_columns if col not in df.columns]
        
        if missing_columns:
            print(f"\nMissing columns in {file_path}:")
            for col in missing_columns:
                print(f"- {col}")
            return False
        
        print(f"\nAll required columns present in {file_path}")
        print("Available columns:", df.columns.tolist())
        return True
    except Exception as e:
        print(f"\nError reading {file_path}: {str(e)}")
        return False

# Required columns for each file
hotel_columns = ["City", "Single", "Hotel_Rating", "Amenities", "Hotel_name"]
restaurant_columns = ["City", "M_meal", "Rest_rating", "Rest_Food", "Rest_name"]
attraction_columns = ["City", "Ticket-price", "Rating", "Category", "Landmark_name"]

# Verify each file
print("Verifying Excel files...")
hotels_ok = verify_columns("H.O.T.L.E.S.xlsx", hotel_columns)
restaurants_ok = verify_columns("Cairo_REST.xlsx", restaurant_columns)
attractions_ok = verify_columns("Locations_Cairo.xlsx", attraction_columns)

# Exit with error if any file is missing columns
if not all([hotels_ok, restaurants_ok, attractions_ok]):
    sys.exit(1) 
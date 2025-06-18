import pandas as pd

# Read the Excel files
hotels_df = pd.read_excel("H.O.T.L.E.S.xlsx")
restaurants_df = pd.read_excel("Cairo_REST.xlsx")
attractions_df = pd.read_excel("Locations_Cairo.xlsx")

# Print column names for each file
print("\nHOTELS COLUMNS:")
print(hotels_df.columns.tolist())

print("\nRESTAURANTS COLUMNS:")
print(restaurants_df.columns.tolist())

print("\nATTRACTIONS COLUMNS:")
print(attractions_df.columns.tolist()) 
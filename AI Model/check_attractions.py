import pandas as pd

# Read the attractions file
df = pd.read_excel("Locations_Cairo.xlsx")

# Print all column names
print("\nAll columns in Locations_Cairo.xlsx:")
print(df.columns.tolist())

# Print first few rows to see the data structure
print("\nFirst few rows of data:")
print(df.head()) 
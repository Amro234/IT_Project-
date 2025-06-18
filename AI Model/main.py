from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import logging

app = FastAPI(title="Trip Recommendation API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Allow React app
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Pydantic model for request validation
class TripRequest(BaseModel):
    city: str
    budget: float

# ------------------ Load Data ------------------
def load_data():
    try:
        hotels = pd.read_excel("H.O.T.L.E.S.xlsx")
        restaurants = pd.read_excel("Cairo_REST.xlsx")
        attractions = pd.read_excel("Locations_Cairo.xlsx")
        logger.info("Data loaded successfully")
        return hotels, restaurants, attractions
    except Exception as e:
        logger.error(f"Error loading data: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to load data: {str(e)}")

# ------------------ Clean Price ------------------
def clean_price(x):
    try:
        return float(str(x).replace("$", "").replace(",", "").strip())
    except:
        return np.nan

# ------------------ Preprocess Data ------------------
def preprocess_data(hotels, restaurants_df, attractions_df):
    try:
        hotels.dropna(subset=["City", "Single", "Hotel_Rating", "Amenities"], inplace=True)
        restaurants_df.dropna(subset=["City", "M_meal", "Rest_rating", "Rest_Food"], inplace=True)
        attractions_df.dropna(subset=["City", "Ticket-price", "Rating", "Category"], inplace=True)

        hotels["Single"] = hotels["Single"].apply(clean_price)
        restaurants_df["M_meal"] = restaurants_df["M_meal"].apply(clean_price)
        attractions_df["Ticket-price"] = attractions_df["Ticket-price"].apply(clean_price)

        return hotels, restaurants_df, attractions_df
    except Exception as e:
        logger.error(f"Error preprocessing data: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing data: {str(e)}")

# ------------------ Similarity Calculation ------------------
def get_similarity(df, column, user_pref):
    try:
        tfidf = TfidfVectorizer()
        tfidf_matrix = tfidf.fit_transform(df[column].fillna(""))
        user_vector = tfidf.transform([user_pref])
        return cosine_similarity(user_vector, tfidf_matrix).flatten()
    except Exception as e:
        logger.error(f"Error calculating similarity: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error calculating similarity: {str(e)}")

# ------------------ Hybrid Recommendation ------------------
def generate_trips(city, budget, top_k=5):
    try:
        hotels, restaurants, attractions = load_data()
        hotels, restaurants, attractions = preprocess_data(hotels, restaurants, attractions)

        # Filter by city
        hotels = hotels[hotels["City"].str.lower() == city.lower()]
        restaurants = restaurants[restaurants["City"].str.lower() == city.lower()]
        attractions = attractions[attractions["City"].str.lower() == city.lower()]

        if hotels.empty or restaurants.empty or attractions.empty:
            raise HTTPException(status_code=404, detail=f"No data available for city: {city}")

        # Compute similarity scores
        hotels["Similarity"] = get_similarity(hotels, "Amenities", "free wifi air conditioning breakfast parking")
        restaurants["Similarity"] = get_similarity(restaurants, "Rest_Food", "grilled desserts sandwiches")
        attractions["Similarity"] = get_similarity(attractions, "Category", "Archaeological, Entertainment")

        # Sort each
        hotels = hotels.sort_values(by=["Similarity", "Hotel_Rating"], ascending=[False, False]).head(top_k)
        restaurants = restaurants.sort_values(by=["Similarity", "Rest_rating"], ascending=[False, False]).head(top_k)
        attractions = attractions.sort_values(by=["Similarity", "Rating"], ascending=[False, False]).head(top_k)

        # Combine all possible trip plans
        trips = []
        for i in range(min(len(hotels), len(restaurants), len(attractions))):
            hotel = hotels.iloc[i]
            rest = restaurants.iloc[i]
            attr = attractions.iloc[i]

            total_cost = hotel["Single"] + rest["M_meal"] + attr["Ticket-price"]
            if total_cost <= budget:
                trips.append({
                    "Hotel": hotel["Hotel_name"],
                    "Hotel_price": hotel["Single"],
                    "Restaurant": rest["Rest_name"],
                    "Meal_price": rest["M_meal"],
                    "Attraction": attr["Landmark_name"],
                    "Ticket_price": attr["Ticket-price"],
                    "Total": total_cost
                })

        if not trips:
            raise HTTPException(status_code=400, detail="No trips found within the budget")

        return trips
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error generating trips: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating trips: {str(e)}")

# FastAPI endpoint
@app.post("/api/trips", response_model=list[dict])
async def get_trip_recommendations(request: TripRequest):
    trips = generate_trips(request.city, request.budget)
    return trips
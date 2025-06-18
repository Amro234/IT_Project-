import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ChevronLeft } from 'lucide-react';
import { addToFavorites, removeFromFavorites, isInFavorites } from '../utils/favorites';
import { toast } from 'react-toastify';

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadRestaurantDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/restaurants/${id}`);
        if (!response.ok) throw new Error('Failed to fetch restaurant details');
        const data = await response.json();
        setRestaurant(data);
        setIsFavorite(isInFavorites(data.id));
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        toast.error('Failed to load restaurant details');
      } finally {
        setIsLoading(false);
      }
    };
    loadRestaurantDetails();
  }, [id]);

  const toggleFavorite = () => {
    if (!restaurant) return;
    if (isFavorite) {
      removeFromFavorites(restaurant.id);
      setIsFavorite(false);
      toast.success('Restaurant removed from favorites');
    } else {
      addToFavorites(restaurant);
      setIsFavorite(true);
      toast.success('Restaurant added to favorites');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Restaurant Not Found</h2>
          <button
            onClick={() => navigate('/restaurants')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Back to Restaurants
          </button>
        </div>
      </div>
    );
  }

  // Helper to check if a value is not empty/null/undefined
  const hasValue = (val) => val !== undefined && val !== null && val !== '';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/restaurants')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Restaurants
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-8">
          {/* Logo */}
          {hasValue(restaurant.logo) && (
            <img
              src={restaurant.logo}
              alt={restaurant.name}
              className="w-32 h-32 object-contain rounded-full border mb-4 shadow"
            />
          )}
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">{restaurant.name}</h1>
          <div className="flex items-center mb-2">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-xl font-semibold">{restaurant.rating}</span>
            {hasValue(restaurant.review_count) && (
              <span className="ml-3 text-gray-500">({restaurant.review_count} reviews)</span>
            )}
          </div>
          <button
            onClick={toggleFavorite}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 mb-4"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
            />
          </button>
          {hasValue(restaurant.description) && (
            <p className="text-gray-600 text-center mb-4">{restaurant.description}</p>
          )}
          {/* Pricing Section */}
          <div className="w-full flex flex-col gap-2 mb-4">
            {hasValue(restaurant.average_cost) && (
              <div className="flex items-center text-gray-600">
                <span className="font-semibold mr-2">Average Price:</span>
                <span>${restaurant.average_cost}</span>
              </div>
            )}
            {hasValue(restaurant.small_meal) && (
              <div className="flex items-center text-gray-600">
                <span className="font-semibold mr-2">Small Meal:</span>
                <span>{restaurant.small_meal}</span>
              </div>
            )}
            {hasValue(restaurant.medium_meal) && (
              <div className="flex items-center text-gray-600">
                <span className="font-semibold mr-2">Medium Meal:</span>
                <span>{restaurant.medium_meal}</span>
              </div>
            )}
            {hasValue(restaurant.large_meal) && (
              <div className="flex items-center text-gray-600">
                <span className="font-semibold mr-2">Large Meal:</span>
                <span>{restaurant.large_meal}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage; 
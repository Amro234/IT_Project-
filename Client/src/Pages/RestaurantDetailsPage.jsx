import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Utensils, Award, BookOpen, Heart } from 'lucide-react';
import { addToFavorites, removeFromFavorites, isInFavorites } from '../utils/favorites';
import { toast } from 'react-toastify';

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const defaultRestaurantImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  useEffect(() => {
    const loadRestaurantData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/restaurants/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant data');
        }

        const data = await response.json();

        const processedRestaurant = {
          id: data.id,
          name: data.name,
          location: data.city?.name || 'Unknown Location',
          rating: data.rating || 0,
          averageCost: data.average_cost || 0,
          smallMeal: data.small_meal || 0,
          mediumMeal: data.medium_meal || 0,
          largeMeal: data.large_meal || 0,
          contact: data.contact || 'N/A',
          email: data.email || 'N/A',
          address: data.address || 'N/A',
          description: data.description || 'No description available.',
          image: data.logo || defaultRestaurantImage,
          reviewCount: data.review_count || 0,
        };

        setRestaurant(processedRestaurant);
        setIsFavorite(isInFavorites(processedRestaurant.id));
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadRestaurantData();
    }
  }, [id]);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    if (isFavorite) {
      removeFromFavorites(restaurant.id);
      setIsFavorite(false);
      toast.success('Restaurant removed from favorites');
    } else {
      const added = addToFavorites(restaurant);
      if (added) {
        setIsFavorite(true);
        toast.success('Restaurant added to favorites');
      }
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
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-600 font-bold">Restaurant not found.</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative h-96 w-full">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = defaultRestaurantImage;
              e.target.onerror = null;
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
            <div className="flex justify-between items-end w-full">
              <h1 className="text-4xl font-bold text-white">{restaurant.name}</h1>
              <button
                onClick={handleToggleFavorite}
                className={`p-3 rounded-full transition-colors ${
                  isFavorite 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Restaurant Info */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{restaurant.location} - {restaurant.address}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < restaurant.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-700">({restaurant.rating} / 5 Rating)</span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {restaurant.description}
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Contact Information</h3>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{restaurant.contact}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{restaurant.email}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Meal Prices</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Small Meal</h4>
                  <p className="text-2xl font-bold text-blue-600">${restaurant.smallMeal}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Medium Meal</h4>
                  <p className="text-2xl font-bold text-blue-600">${restaurant.mediumMeal}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Large Meal</h4>
                  <p className="text-2xl font-bold text-blue-600">${restaurant.largeMeal}</p>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Average Cost</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold text-blue-600">${restaurant.averageCost}</p>
                  <p className="text-sm text-gray-600 mt-1">per person</p>
                </div>
                <button
                  onClick={() => navigate(`/booking/${restaurant.id}`)}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Make a Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage; 
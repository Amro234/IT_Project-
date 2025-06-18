import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Phone, Mail, Filter, Calendar, Users, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addToFavorites, removeFromFavorites, isInFavorites } from '../utils/favorites';
import { toast } from 'react-toastify';

const Restaurant = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(9);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0,
    cuisine: [],
    location: '',
  });
  const [favorites, setFavorites] = useState([]);

  // Default restaurant image
  const defaultRestaurantImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  useEffect(() => {
    const loadAllRestaurantData = async () => {
      setIsLoading(true);
      try {
        // Fetch restaurants from API
        const restaurantsResponse = await fetch('http://localhost:8000/api/restaurants');

        if (!restaurantsResponse.ok) {
          throw new Error('Failed to fetch restaurants');
        }

        const { data: allRestaurantData } = await restaurantsResponse.json();

        const processedRestaurants = allRestaurantData.map((restaurant) => {
          // Parse cuisine types from JSON string if it exists
          let cuisine = [];
          try {
            if (restaurant.cuisine) {
              const parsedCuisine = JSON.parse(restaurant.cuisine);
              cuisine = typeof parsedCuisine === 'string' ? JSON.parse(parsedCuisine) : parsedCuisine;
              cuisine = Array.isArray(cuisine) ? cuisine : [];
            }
          } catch (e) {
            console.error('Error parsing cuisine:', e);
            cuisine = [];
          }

          // Prioritize main restaurant image, then default
          const mainRestaurantImage = restaurant.images?.[0]?.image_url || defaultRestaurantImage;
          
          return {
            id: restaurant.id,
            name: restaurant.name,
            location: restaurant.city?.name || 'Unknown Location',
            rating: restaurant.restaurant_ranking || 0,
            price: restaurant.average_price || 0,
            contact: restaurant.mobile_num || 'N/A',
            email: restaurant.email || 'N/A',
            address: restaurant.address || 'N/A',
            cuisine: cuisine,
            description: restaurant.description || 'No description available.',
            image: mainRestaurantImage,
            openingHours: restaurant.opening_hours || 'N/A',
            reviews: restaurant.reviews || [],
          };
        });

        setRestaurants(processedRestaurants);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllRestaurantData();
  }, []);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites.map(fav => fav.id));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const toggleFavorite = (restaurantId) => {
    if (favorites.includes(restaurantId)) {
      removeFromFavorites(restaurantId);
      setFavorites(prev => prev.filter(id => id !== restaurantId));
      toast.success('Restaurant removed from favorites');
    } else {
      const restaurant = restaurants.find(r => r.id === restaurantId);
      if (restaurant) {
        const added = addToFavorites(restaurant);
        if (added) {
          setFavorites(prev => [...prev, restaurantId]);
          toast.success('Restaurant added to favorites');
        }
      }
    }
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = restaurant.price >= filters.priceRange[0] && restaurant.price <= filters.priceRange[1];
    const matchesRating = restaurant.rating >= filters.rating;
    const matchesLocation = !filters.location || restaurant.location === filters.location;
    const matchesCuisine = filters.cuisine.length === 0 || 
                          filters.cuisine.every(cuisine => restaurant.cuisine.includes(cuisine));

    return matchesSearch && matchesPrice && matchesRating && matchesLocation && matchesCuisine;
  });

  const currentRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * restaurantsPerPage,
    currentPage * restaurantsPerPage
  );

  const totalPages = Math.ceil(filteredRestaurants.length / restaurantsPerPage);

  const getPaginationGroup = () => {
    let startPage;
    let endPage;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    const pages = [...Array(endPage + 1).keys()].slice(startPage);

    if (startPage > 1) {
      pages.unshift('...');
      pages.unshift(1);
    }
    if (endPage < totalPages) {
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const paginationGroup = getPaginationGroup();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Discover Amazing Restaurants</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-white text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-100"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search restaurants by name or location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Min"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Max"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={1}>1+ Stars</option>
                    <option value={2}>2+ Stars</option>
                    <option value={3}>3+ Stars</option>
                    <option value={4}>4+ Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine</label>
                  <select
                    multiple
                    value={filters.cuisine}
                    onChange={(e) => handleFilterChange('cuisine', Array.from(e.target.selectedOptions, option => option.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="italian">Italian</option>
                    <option value="chinese">Chinese</option>
                    <option value="japanese">Japanese</option>
                    <option value="indian">Indian</option>
                    <option value="mexican">Mexican</option>
                    <option value="american">American</option>
                    <option value="thai">Thai</option>
                    <option value="mediterranean">Mediterranean</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(restaurant.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(restaurant.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{restaurant.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="text-sm">Average Price: ${restaurant.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{restaurant.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {restaurant.cuisine.map((cuisine, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {paginationGroup.map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                className={`px-3 py-1 rounded-md ${
                  page === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
                disabled={page === '...'}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurant; 
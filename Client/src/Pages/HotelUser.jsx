import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Phone, Mail, Home, Filter, Calendar, Users, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HotelUserPage = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(9);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0,
    amenities: [],
    location: '',
  });
  const [favorites, setFavorites] = useState([]);

  // Default hotel image
  const defaultHotelImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  useEffect(() => {
    const loadAllHotelData = async () => {
      setIsLoading(true);
      try {
        // Fetch hotels from API
        const hotelsResponse = await fetch('http://localhost:8000/api/hotels');

        if (!hotelsResponse.ok) {
          throw new Error('Failed to fetch hotels');
        }

        const { data: allHotelData } = await hotelsResponse.json();

        const processedHotels = allHotelData.map((hotel) => {
          // Parse amenities from JSON string if it exists
          let amenities = [];
          try {
            if (hotel.amenities) {
              // First parse the outer JSON string
              const parsedAmenities = JSON.parse(hotel.amenities);
              // Then parse the inner JSON string if it exists
              amenities = typeof parsedAmenities === 'string' ? JSON.parse(parsedAmenities) : parsedAmenities;
              // Ensure it's an array
              amenities = Array.isArray(amenities) ? amenities : [];
            }
          } catch (e) {
            console.error('Error parsing amenities:', e);
            amenities = [];
          }

          // Prioritize top-level hotel image, then first room image, then default
          const mainHotelImage = hotel.images?.[0]?.image_url || hotel.rooms?.[0]?.images?.[0]?.image_url || defaultHotelImage;
          
          return {
            id: hotel.id,
            name: hotel.name,
            location: hotel.city?.name || 'Unknown Location',
            rating: hotel.hotel_ranking || 0,
            price: hotel.rooms?.[0]?.price || 0,
            rooms: hotel.number_of_rooms || 0,
            contact: hotel.mobile_num || 'N/A',
            email: hotel.email || 'N/A',
            address: hotel.address || 'N/A',
            amenities: amenities,
            description: hotel.description || 'No description available.',
            image: mainHotelImage,
            roomTypes: hotel.rooms?.map(room => ({
              name: room.room_type_name || 'Standard Room',
              price: room.price || 0,
              quantity: room.quantity || 0,
              description: room.description || 'No description available',
              images: room.images || []
            })) || [],
            reviews: hotel.reviews || [],
          };
        });

        setHotels(processedHotels);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllHotelData();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const toggleFavorite = (hotelId) => {
    setFavorites(prev => {
      if (prev.includes(hotelId)) {
        return prev.filter(id => id !== hotelId);
      }
      return [...prev, hotelId];
    });
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1];
    const matchesRating = hotel.rating >= filters.rating;
    const matchesLocation = !filters.location || hotel.location === filters.location;
    const matchesAmenities = filters.amenities.length === 0 || 
                           filters.amenities.every(amenity => hotel.amenities.includes(amenity));

    return matchesSearch && matchesPrice && matchesRating && matchesLocation && matchesAmenities;
  });

  const currentHotels = filteredHotels.slice(
    (currentPage - 1) * hotelsPerPage,
    currentPage * hotelsPerPage
  );

  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  const getPaginationGroup = () => {
    let startPage;
    let endPage;

    if (totalPages <= 5) {
      // Less than 5 pages, show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // More than 5 pages, calculate start and end pages
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
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Find Your Perfect Stay</h1>
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
              placeholder="Search hotels by name or location..."
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
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Min"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Max"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={`rating-${rating}`}
                        onClick={() => handleFilterChange('rating', rating)}
                        className={`p-1 ${filters.rating >= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">All Locations</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Sharm El Sheikh">Sharm El Sheikh</option>
                    <option value="Hurghada">Hurghada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {['Free Wi-Fi', 'Pool', 'Gym', 'Restaurant'].map((amenity) => (
                      <button
                        key={amenity}
                        onClick={() => handleFilterChange('amenities', 
                          filters.amenities.includes(amenity)
                            ? filters.amenities.filter(a => a !== amenity)
                            : [...filters.amenities, amenity]
                        )}
                        className={`px-3 py-1 rounded-full text-sm ${
                          filters.amenities.includes(amenity)
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(hotel.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(hotel.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`}
                  />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-xl font-bold text-white">{hotel.name}</h2>
                  <div className="flex items-center text-white">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{hotel.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < hotel.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">({hotel.rating})</span>
                  </div>
                  <span className="text-xl font-bold text-blue-600">${hotel.price}/night</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Home className="w-4 h-4 mr-2" />
                    <span>{hotel.rooms} Rooms Available</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{hotel.contact}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded-full text-sm">
                      +{hotel.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => navigate(`/booking/${hotel.id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </button>
                  <button
                    onClick={() => navigate(`/hotel/${hotel.id}`)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => handlePageChange(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" />
            </button>

            {paginationGroup.map((item, index) => (
              item === '...' ? (
                <span
                  key={index}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => handlePageChange(item)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    item === currentPage
                      ? 'z-10 bg-blue-100 border-blue-600 text-blue-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  } ${index === 0 && item !== 1 ? 'border-l' : ''}`}
                >
                  {item}
                </button>
              )
            ))}

            <button
              onClick={() => handlePageChange(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HotelUserPage; 
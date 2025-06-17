import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Star, Info, MapPin, Phone, Mail, Building2, ChevronLeft, ChevronRight, Settings, Users, Calendar, BarChart2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const HotelsPage = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(9); // Display 9 hotels per page
  const [maxPageNumbersToShow] = useState(5); // Show 5 page numbers at a time
  const [displayedPageBlockStart, setDisplayedPageBlockStart] = useState(1); // New state to control the start of the visible page numbers block
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const loadAllHotelData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/hotels', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }

        const { data: allHotelData } = await response.json();

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

          // Get the main hotel image
          const mainHotelImage = hotel.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

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
              images: room.room_images || []
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

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current hotels for pagination
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  // Calculate total pages
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  // Calculate the range of page numbers to display based on displayedPageBlockStart
  const startPage = displayedPageBlockStart;
  const endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Functions to navigate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
  };

  const goToPrevBlock = () => {
    setDisplayedPageBlockStart(prev => Math.max(1, prev - maxPageNumbersToShow));
  };

  const goToNextBlock = () => {
    setDisplayedPageBlockStart(prev => Math.min(totalPages - (maxPageNumbersToShow -1), prev + maxPageNumbersToShow));
  };

  const handleDeleteHotel = async (hotelId) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/hotels/${hotelId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete hotel');
        }

        // After successful deletion, update the hotels list
        setHotels(hotels.filter(hotel => hotel.id !== hotelId));
        toast.success('Hotel deleted successfully');
      } catch (error) {
        console.error('Error deleting hotel:', error);
        toast.error('Failed to delete hotel');
      }
    }
  };

  const handleEditHotel = (hotelId) => {
    navigate(`/admin/edit-hotel/${hotelId}`);
  };

  const handleViewStats = (hotel) => {
    setSelectedHotel(hotel);
    setShowStats(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hotel Management</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/admin/add-hotel')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Hotel
          </button>
          <button
            onClick={() => navigate('/admin/hotel-stats')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
          >
            <BarChart2 className="w-5 h-5 mr-2" />
            View Analytics
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search hotels..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentHotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[450px] flex flex-col">
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{hotel.name}</h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{hotel.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Building2 className="w-4 h-4 mr-1" />
                    <span>{hotel.rooms} Rooms</span>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < hotel.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{hotel.contact}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{hotel.email}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Room Types</h3>
                <div className="space-y-2">
                  {hotel.roomTypes.map((room, index) => (
                    <div key={index} className="flex justify-between items-center text-gray-600">
                      <span>{room.name}</span>
                      <span className="font-semibold">${room.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                <button
                  onClick={() => handleEditHotel(hotel.id)}
                  className="flex-1 bg-blue-100 text-blue-600 px-3 py-2 rounded-md hover:bg-blue-200 flex items-center justify-center text-sm font-medium"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteHotel(hotel.id)}
                  className="flex-1 bg-red-100 text-red-600 px-3 py-2 rounded-md hover:bg-red-200 flex items-center justify-center text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
                <button
                  onClick={() => handleViewStats(hotel)}
                  className="flex-1 bg-green-100 text-green-600 px-3 py-2 rounded-md hover:bg-green-200 flex items-center justify-center text-sm font-medium"
                >
                  <BarChart2 className="w-4 h-4 mr-1" />
                  Stats
                </button>
                <button
                  onClick={() => navigate(`/admin/hotel-bookings/${hotel.id}`)}
                  className="flex-1 bg-purple-100 text-purple-600 px-3 py-2 rounded-md hover:bg-purple-200 flex items-center justify-center text-sm font-medium"
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  Bookings
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={goToPrevBlock}
            disabled={displayedPageBlockStart === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                number === currentPage
                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={goToNextBlock}
            disabled={displayedPageBlockStart + maxPageNumbersToShow > totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>

      {/* Hotel Stats Modal */}
      {showStats && selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Hotel Statistics - {selectedHotel.name}</h2>
              <button
                onClick={() => setShowStats(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Booking Statistics</h3>
                <p>Total Bookings: 150</p>
                <p>Active Bookings: 45</p>
                <p>Average Rating: 4.5</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Revenue</h3>
                <p>This Month: $25,000</p>
                <p>Last Month: $22,500</p>
                <p>Growth: +11.1%</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Room Occupancy</h3>
                <p>Current: 75%</p>
                <p>Average: 68%</p>
                <p>Peak Season: 92%</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Customer Satisfaction</h3>
                <p>Positive Reviews: 85%</p>
                <p>Response Rate: 98%</p>
                <p>Repeat Guests: 45%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelsPage;
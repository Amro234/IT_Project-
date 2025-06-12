import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Star, Info, MapPin, Phone, Mail, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HotelsPage = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(9); // Display 9 hotels per page
  const [maxPageNumbersToShow] = useState(5); // Show 5 page numbers at a time
  const [displayedPageBlockStart, setDisplayedPageBlockStart] = useState(1); // New state to control the start of the visible page numbers block

  useEffect(() => {
    const loadAllHotelData = async () => {
      setIsLoading(true);
      try {
        const filePaths = [
          '/final json/Cairo-1/transformed_hotels1_1.json',
          '/final json/Cairo-1/transformed_hotels1_2.json',
          '/final json/Cairo-1/transformed_hotels1_3.json',
          '/final json/Hurghada-3/transformed_hotels3_1.json',
          '/final json/Hurghada-3/transformed_hotels3_2.json',
          '/final json/Hurghada-3/transformed_hotels3_3.json',
          '/final json/Hurghada-3/transformed_hotels3_4.json',
          '/final json/Hurghada-3/transformed_hotels3_5.json',
          '/final json/Sharm,2/transformed_hotels2_1 (1).json',
          '/final json/Sharm,2/transformed_hotels2_2.json',
          '/final json/Sharm,2/transformed_hotels2_3.json',
          '/final json/Sharm,2/transformed_hotels2_4.json',
          '/final json/Sharm,2/transformed_hotels2_5.json',
        ];

        const allResponses = await Promise.all(filePaths.map(path => fetch(path)));
        let allHotelData = [];

        for (const response of allResponses) {
          if (response.ok) {
            const data = await response.json();
            allHotelData = [...allHotelData, ...data];
          } else {
            console.error(`Error loading data from ${response.url}:`, response.statusText);
          }
        }

        const mapCityIdToLocation = (cityId) => {
          switch (cityId) {
            case 1: return 'Cairo';
            case 2: return 'Sharm El Sheikh';
            case 3: return 'Hurghada';
            default: return 'Unknown Location';
          }
        };

        const processedHotels = allHotelData.map((hotel, index) => ({
          id: `${hotel.city_id}-${index}-${Math.random().toString(36).substr(2, 5)}`, // Unique ID
          name: hotel.name,
          location: mapCityIdToLocation(hotel.city_id),
          rating: hotel.hotel_ranking || 0,
          price: hotel.rooms[0]?.price || 0,
          rooms: hotel.number_of_rooms || 0,
          contact: hotel.mobile_num || 'N/A',
          email: hotel.email || 'N/A',
          address: hotel.address || 'N/A',
          amenities: hotel.amenities || [],
          description: hotel.description || 'No description available.',
          roomTypes: hotel.rooms?.map(room => ({
            name: room.room_type_name,
            price: room.price,
            quantity: room.quantity,
            description: room.description,
          })) || [],
          reviews: hotel.reviews || [],
        }));

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hotels</h1>
        <button
          onClick={() => navigate('/admin/add-hotel')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Hotel
        </button>
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
          <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
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

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600 text-sm">{hotel.description}</p>
              </div>

              <div className="flex justify-end space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={goToPrevBlock}
            disabled={displayedPageBlockStart === 1}
            className="relative inline-flex items-center p-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-blue-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`relative inline-flex items-center justify-center h-10 w-10 mx-1 rounded-full border ${
                number === currentPage ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 bg-white text-blue-600'
              } text-sm font-medium hover:bg-blue-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={goToNextBlock}
            disabled={endPage === totalPages}
            className="relative inline-flex items-center p-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-blue-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default HotelsPage;
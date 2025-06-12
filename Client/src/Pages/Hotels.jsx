import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Phone, Mail, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HotelsPage = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(9);

  // Default hotel image
  const defaultHotelImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

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

        const processedHotels = allHotelData.map((hotel, index) => {
          // Prioritize top-level hotel image, then first room image, then default
          const mainHotelImage = hotel.images?.[0]?.image_url || hotel.rooms?.[0]?.images?.[0]?.image_url || defaultHotelImage;
          
          return {
            id: `${hotel.city_id}-${index}`,
            name: hotel.name,
            location: mapCityIdToLocation(hotel.city_id),
            rating: hotel.hotel_ranking || 0,
            price: hotel.rooms?.[0]?.price || 0,
            rooms: hotel.number_of_rooms || 0,
            contact: hotel.mobile_num || 'N/A',
            email: hotel.email || 'N/A',
            address: hotel.address || 'N/A',
            amenities: hotel.amenities || [],
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
          <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            {/* Hotel Image */}
            <div className="relative h-48 w-full">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                ${hotel.price}
              </div>
            </div>
            
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{hotel.name}</h2>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Home className="w-4 h-4 mr-1" />
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
                  <p className="text-gray-600 text-sm h-20 overflow-hidden">{hotel.description}</p>
                </div>
              </div>

              <button
                onClick={() => navigate(`/hotel/${hotel.id}`)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-auto"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                number === currentPage
                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {number}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default HotelsPage; 
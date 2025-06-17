import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Home, Wifi, Utensils, Award, BookOpen, Heart } from 'lucide-react';
import { addToFavorites, removeFromFavorites, isInFavorites } from '../utils/favorites';
import { toast } from 'react-toastify';

const HotelDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const defaultHotelImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB4aG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  useEffect(() => {
    const loadHotelData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/hotels/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch hotel data');
        }

        const { data: hotelData } = await response.json();

        // Parse amenities from JSON string if it exists
        let amenities = [];
        try {
          if (hotelData.amenities) {
            // First parse the outer JSON string
            const parsedAmenities = JSON.parse(hotelData.amenities);
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
        const mainHotelImage = hotelData.image_url || defaultHotelImage;

        const processedHotel = {
          id: hotelData.id,
          name: hotelData.name,
          location: hotelData.city?.name || 'Unknown Location',
          rating: hotelData.hotel_ranking || 0,
          price: hotelData.rooms?.[0]?.price || 0,
          rooms: hotelData.number_of_rooms || 0,
          contact: hotelData.mobile_num || 'N/A',
          email: hotelData.email || 'N/A',
          address: hotelData.address || 'N/A',
          amenities: amenities,
          description: hotelData.description || 'No description available.',
          image: mainHotelImage,
          roomTypes: hotelData.rooms?.map(room => ({
            name: room.room_type_name || 'Standard Room',
            price: room.price || 0,
            quantity: room.quantity || 0,
            description: room.description || 'No description available',
            images: room.images || []
          })) || [],
          reviews: hotelData.reviews || [],
        };

        setHotel(processedHotel);
        setIsFavorite(isInFavorites(processedHotel.id));
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadHotelData();
    }
  }, [id]);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    if (isFavorite) {
      removeFromFavorites(hotel.id);
      setIsFavorite(false);
      toast.success('Hotel removed from favorites', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const added = addToFavorites(hotel);
      if (added) {
        setIsFavorite(true);
        toast.success('Hotel added to favorites', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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

  if (!hotel) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-600 font-bold">Hotel not found.</div>;
  }

  const handleBookNow = () => {
    navigate(`/booking/${hotel.id}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative h-96 w-full">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Image failed to load:", hotel.image);
              e.target.src = defaultHotelImage;
              e.target.onerror = null; // Prevent infinite loop
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
            <div className="flex justify-between items-end w-full">
              <h1 className="text-4xl font-bold text-white">{hotel.name}</h1>
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
            {/* Hotel Info */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{hotel.location} - {hotel.address}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Home className="w-5 h-5 mr-2" />
                <span>{hotel.rooms} Rooms available</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < hotel.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-700">({hotel.rating} / 5 Rating)</span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {hotel.description}
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Contact Information</h3>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{hotel.contact}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{hotel.email}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {hotel.amenities.length > 0 ? (
                  hotel.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                    >
                      {amenity === "Free Wi-Fi" && <Wifi className="w-4 h-4 mr-1" />}
                      {amenity === "Restaurant" && <Utensils className="w-4 h-4 mr-1" />}
                      {amenity === "Pools" && <Home className="w-4 h-4 mr-1" />}
                      {amenity === "Spa" && <Award className="w-4 h-4 mr-1" />}
                      {amenity === "Room service" && <BookOpen className="w-4 h-4 mr-1" />}
                      {amenity}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No amenities listed</span>
                )}
              </div>
            </div>

            {/* Booking Card */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Book Your Stay</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per night</label>
                  <p className="text-2xl font-bold text-blue-600">${hotel.price}</p>
                </div>
                <button
                  onClick={handleBookNow}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Room Types */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Available Rooms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hotel.roomTypes.map((room, index) => (
                <div key={index} className="bg-white border rounded-lg p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{room.name}</h4>
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">${room.price}/night</span>
                    <span className="text-gray-600">{room.quantity} rooms available</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage; 
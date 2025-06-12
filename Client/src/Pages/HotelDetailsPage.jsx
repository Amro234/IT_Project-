import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Home, Wifi, Utensils, Award, BookOpen } from 'lucide-react';

const HotelDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const defaultHotelImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB4aG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  useEffect(() => {
    const loadHotelData = async () => {
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
          '/final json/Sharm,2/transformed_hotels2_5.json'
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
          let mainHotelImage = defaultHotelImage;
          
          if (hotel.images && hotel.images.length > 0 && hotel.images[0].image_url) {
            mainHotelImage = hotel.images[0].image_url;
          } else if (hotel.rooms && hotel.rooms.length > 0 && 
                    hotel.rooms[0].images && hotel.rooms[0].images.length > 0 && 
                    hotel.rooms[0].images[0].image_url) {
            mainHotelImage = hotel.rooms[0].images[0].image_url;
          }
          
          console.log(`Processing hotel ${hotel.name} image:`, mainHotelImage);
          
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

        const foundHotel = processedHotels.find(h => h.id === id);
        setHotel(foundHotel);

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
    alert(`Booking process for ${hotel.name} will start here!`);
    // In a real application, you would navigate to a booking form or initiate a payment process.
  };

  console.log("Hotel Image URL:", hotel.image);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative h-96 w-full">
          {console.log("Hotel data:", hotel)}
          {console.log("Image URL being used:", hotel.image)}
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Image failed to load:", hotel.image);
              e.target.src = defaultHotelImage;
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
            <h1 className="text-4xl font-bold text-white">{hotel.name}</h1>
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
                  <span className="text-gray-500">No amenities listed.</span>
                )}
              </div>
            </div>

            {/* Booking and Price Summary */}
            <div className="md:col-span-1 bg-blue-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Price: ${hotel.price} / night</h2>
              <button
                onClick={handleBookNow}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Room Types</h3>
                {hotel.roomTypes.length > 0 ? (
                  <div className="space-y-4">
                    {hotel.roomTypes.map((room, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <p className="font-semibold text-gray-800">{room.name}</p>
                        <p className="text-gray-600 text-sm">Price: ${room.price} | Quantity: {room.quantity}</p>
                        <p className="text-gray-600 text-sm italic">{room.description}</p>
                        {room.images && room.images.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {room.images.map((img, imgIndex) => (
                              <img
                                key={imgIndex}
                                src={img.image_url}
                                alt={`${room.name} image ${imgIndex + 1}`}
                                className="w-24 h-24 object-cover rounded-md shadow-sm"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No specific room types listed.</p>
                )}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>
            {hotel.reviews.length > 0 ? (
              <div className="space-y-4">
                {hotel.reviews.map((review, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-800">"{review}"</p>
                    {/* Add reviewer name/date if available in data */}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage; 
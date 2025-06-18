import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHotel, FaUtensils, FaLandmark, FaDollarSign } from 'react-icons/fa';

const TripRecommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trips } = location.state || { trips: [] };

  if (!trips || trips.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No recommendations found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-[#10b981] text-white px-6 py-2 rounded-md hover:bg-[#059669] transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Your Personalized Trip Recommendations
        </h1>
        <div className="grid grid-cols-1 gap-8">
          {trips.map((trip, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Hotel Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <FaHotel className="text-[#10b981] text-xl mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Hotel</h3>
                    </div>
                    <p className="text-gray-700 mb-2">{trip.Hotel}</p>
                    <div className="flex items-center text-[#10b981]">
                      <FaDollarSign className="mr-1" />
                      <span>{trip.Hotel_price}</span>
                    </div>
                  </div>

                  {/* Restaurant Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <FaUtensils className="text-[#10b981] text-xl mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Restaurant</h3>
                    </div>
                    <p className="text-gray-700 mb-2">{trip.Restaurant}</p>
                    <div className="flex items-center text-[#10b981]">
                      <FaDollarSign className="mr-1" />
                      <span>{trip.Meal_price}</span>
                    </div>
                  </div>

                  {/* Attraction Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <FaLandmark className="text-[#10b981] text-xl mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Attraction</h3>
                    </div>
                    <p className="text-gray-700 mb-2">{trip.Attraction}</p>
                    <div className="flex items-center text-[#10b981]">
                      <FaDollarSign className="mr-1" />
                      <span>{trip.Ticket_price}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold text-gray-900">
                      Total Cost: <span className="text-[#10b981]">${trip.Total}</span>
                    </div>
                    <button
                      onClick={() => navigate('/payment')}
                      className="bg-[#10b981] text-white px-6 py-2 rounded-md hover:bg-[#059669] transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripRecommendations; 
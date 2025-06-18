import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookTrip from '../Components/BookTrip';
import { FaPlus, FaHotel, FaUtensils, FaLandmark } from 'react-icons/fa';

const TripRecommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTrip, setSelectedTrip] = useState(null);
  const trips = location.state?.trips || [];

  const handleBookNow = (trip) => {
    setSelectedTrip(trip);
  };

  const handleCloseBooking = () => {
    setSelectedTrip(null);
  };

  const handleCreateNewTrip = () => {
    navigate('/');
  };

  if (!trips.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-indigo-900">No Trips Found</h2>
            <p className="mt-2 text-indigo-600">
              We couldn't find any trips matching your criteria. Let's create a new one!
            </p>
            <button
              onClick={handleCreateNewTrip}
              className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transform transition hover:scale-105"
            >
              <FaPlus className="mr-2" />
              Create New Trip
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-indigo-900 mb-4">Your Perfect Trips</h2>
          <p className="text-lg text-indigo-600 mb-8">
            We've found these amazing trips just for you!
          </p>
          <button
            onClick={handleCreateNewTrip}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transform transition hover:scale-105"
          >
            <FaPlus className="mr-2" />
            Create New Trip
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FaHotel className="text-indigo-600 text-xl mr-2" />
                      <h3 className="text-lg font-semibold text-indigo-900">Hotel</h3>
                    </div>
                    <p className="text-gray-700">{trip.Hotel}</p>
                    <p className="text-indigo-600 font-semibold mt-1">${trip.Hotel_price}</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FaUtensils className="text-purple-600 text-xl mr-2" />
                      <h3 className="text-lg font-semibold text-purple-900">Restaurant</h3>
                    </div>
                    <p className="text-gray-700">{trip.Restaurant}</p>
                    <p className="text-purple-600 font-semibold mt-1">${trip.Meal_price}</p>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-red-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FaLandmark className="text-pink-600 text-xl mr-2" />
                      <h3 className="text-lg font-semibold text-pink-900">Attraction</h3>
                    </div>
                    <p className="text-gray-700">{trip.Attraction}</p>
                    <p className="text-pink-600 font-semibold mt-1">${trip.Ticket_price}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-indigo-900">
                        Total: <span className="text-indigo-600">${trip.Total}</span>
                      </div>
                      <button
                        onClick={() => handleBookNow(trip)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transform transition hover:scale-105"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTrip && (
        <BookTrip
          trip={selectedTrip}
          onClose={handleCloseBooking}
        />
      )}
    </div>
  );
};

export default TripRecommendations; 
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrip, clearCurrentTrip } from '../redux/features/tripsSlice';
import { FaSpinner } from 'react-icons/fa';
import { BiError } from 'react-icons/bi';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaStar } from 'react-icons/fa';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentTrip, status, error } = useSelector((state) => state.trips);

  useEffect(() => {
    // Validate ID is a number
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      navigate('/404');
      return;
    }

    dispatch(fetchTrip(numericId));

    // Cleanup function
    return () => {
      dispatch(clearCurrentTrip());
    };
  }, [dispatch, id, navigate]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-[#10b981]" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BiError className="text-4xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Trip</h2>
          <p className="text-gray-600 mb-4">{error}</p>
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

  if (!currentTrip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Trip Not Found</h2>
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
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-96">
            <img
              src={currentTrip.mainImage}
              alt={currentTrip.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
              <div className="absolute bottom-0 p-8">
                <h1 className="text-4xl font-bold text-white mb-4">{currentTrip.title}</h1>
                <p className="text-white/90 text-lg">{currentTrip.description}</p>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Overview</h2>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <FaMapMarkerAlt className="mr-3 text-[#10b981]" />
                    <span>{currentTrip.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaCalendarAlt className="mr-3 text-[#10b981]" />
                    <span>{currentTrip.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaUsers className="mr-3 text-[#10b981]" />
                    <span>{currentTrip.groupSize}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaStar className="mr-3 text-[#10b981]" />
                    <span>{currentTrip.rating} ({currentTrip.reviews} reviews)</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-6">What's Included</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {currentTrip.included?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-6">What's Not Included</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {currentTrip.excluded?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Right Column */}
              <div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip Itinerary</h2>
                  <div className="space-y-4">
                    {currentTrip.itinerary?.map((day) => (
                      <div key={day.day} className="border-l-4 border-[#10b981] pl-4">
                        <h3 className="text-lg font-semibold text-gray-900">Day {day.day}: {day.title}</h3>
                        <p className="text-gray-700 mt-2">{day.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-3xl font-bold text-gray-900">${currentTrip.price}</span>
                    <button
                      onClick={() => {/* Add booking logic here */}}
                      className="bg-[#10b981] text-white px-6 py-3 rounded-md hover:bg-[#059669] transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails; 
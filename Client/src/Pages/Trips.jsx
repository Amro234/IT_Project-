import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Star, ChevronDown, ChevronUp, Heart, Share2, Bookmark } from 'lucide-react';
import { FaSpinner } from 'react-icons/fa';
import { BiError } from 'react-icons/bi';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaStar } from 'react-icons/fa';
import { trips } from '../data/trips';

const Trips = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [expandedDay, setExpandedDay] = useState(1);

  useEffect(() => {
    // Validate ID is a number
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      navigate('/404');
      return;
    }

    // Filter trips based on destination ID
    const filtered = trips.filter(trip => trip.id === numericId);
    if (filtered.length > 0) {
      setFilteredTrips(filtered);
      setStatus('succeeded');
    } else {
      setError('No trips found for this destination');
      setStatus('failed');
    }
  }, [id, navigate]);

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const handleBookNow = () => {
    if (!selectedDate) {
      alert('Please select a date before booking');
      return;
    }
    // Add booking logic here
    console.log('Booking trip:', {
      date: selectedDate,
      travelers,
    });
  };

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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Trips</h2>
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

  if (!filteredTrips.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No trips found for this destination</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
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
          Available Trips
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={trip.mainImage}
                alt={trip.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {trip.title}
                </h2>
                <p className="text-gray-600 mb-4">{trip.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{trip.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2" />
                    <span>{trip.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaUsers className="mr-2" />
                    <span>{trip.groupSize}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaStar className="mr-2 text-yellow-400" />
                    <span>{trip.rating} ({trip.reviews} reviews)</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    ${trip.price}
                  </span>
                  <button
                    onClick={() => navigate(`/trip-details/${trip.id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trips; 
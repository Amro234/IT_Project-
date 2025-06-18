import React, { useState } from 'react';
import { BiTransferAlt } from 'react-icons/bi'; // Importing the swap locations icon
import { FiSend } from 'react-icons/fi'; // Importing the send icon for the submit button
import { GiPresent } from 'react-icons/gi'; // Importing the gift icon for the special offer button
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation
import axios from 'axios';

const TripForm = () => {  
  // State variables to manage form inputs
  const [tripType, setTripType] = useState("Medical Trips"); // Trip type (default: Medical Trips)
  const [people, setPeople] = useState(1); // Number of people (default: 1)
  const [to, setTo] = useState("Cairo"); // Destination (default: Cairo)
  const [budget, setBudget] = useState(""); // Budget
  const [withWhom, setWithWhom] = useState("Solo"); // Traveling with (default: Solo)
  const [transport, setTransport] = useState(false); // Transport option (default: false)
  const [matches, setMatches] = useState(false); // Matches option (default: false)
  const [kids, setKids] = useState(false); // Kids option (default: false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate(); // Hook to navigate to different routes

  // List of Egyptian cities for the "To" dropdown
  const egyptianCities = [
    "Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said", "Suez",
    "Luxor", "Mansoura", "El Mahalla El Kubra", "Tanta", "Asyut", "Ismailia",
    "Fayoum", "Zagazig", "Damietta", "Aswan", "Minya", "Damanhur", "Beni Suef",
    "Qena", "Sohag", "Hurghada", "Sharm El Sheikh", "6th of October", "Obour",
    "Banha", "Kafr El Sheikh", "Marsa Matruh", "Quseir", "El Arish", "El Tor",
    "Taba", "Dahab", "El Gouna", "Marsa Alam", "Siwa Oasis"
  ];

  // List of trip types for the "Trip Type" dropdown
  const tripTypes = [
    "Medical Trips", "Family Trips", "Business Trips", "Educational Trips",
    "Exploratory Trips", "Religious Trips", "Honeymoon Trips", "Adventure Trips",
    "Cultural Trips", "Eco-Tourism Trips", "Luxury Trips", "Budget Trips",
    "Wellness & Spa Trips", "Diving & Snorkeling Trips", "Safari Trips",
    "Historical Tours", "Beach Holidays", "Road Trips", "Photography Tours",
    "Sports Tourism"
  ];

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post('http://localhost:8000/api/trips', {
        city: to,
        budget: parseFloat(budget)
      });
      
      setTrips(response.data);
      navigate('/recommendations', { state: { trips: response.data } });
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to get trip recommendations");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the "Special Offer" button click
  const handleClick = () => {
    navigate('/special-offers'); // Navigate to the "Special Offers" page
  };

  // Function to swap the "From" and "To" locations
  const swapLocations = () => {
    setTo(to); // Set "To" to the current "To" value
  };

  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <div className="bg-[#f4f6f8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit}>
            {/* City Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981]"
                value={to} 
                onChange={(e) => setTo(e.target.value)}
                required
              >
                {egyptianCities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
              <input 
                type="number" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981]"
                value={budget} 
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter your budget"
                required
                min="0"
                step="0.01"
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button 
                type="submit" 
                className="bg-[#10b981] text-white px-6 py-3 rounded-lg hover:bg-[#059669] transition-colors font-semibold flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  "Loading..."
                ) : (
                  <>
                    <FiSend className="h-5 w-5" />
                    Get Recommendations
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TripForm;
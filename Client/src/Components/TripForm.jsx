import React, { useState } from 'react';
import { BiTransferAlt } from 'react-icons/bi'; // Importing the swap locations icon
import { FiSend } from 'react-icons/fi'; // Importing the send icon for the submit button
import { GiPresent } from 'react-icons/gi'; // Importing the gift icon for the special offer button
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation

const TripForm = () => {  
  // State variables to manage form inputs
  const [tripType, setTripType] = useState("Medical Trips"); // Trip type (default: Medical Trips)
  const [people, setPeople] = useState(1); // Number of people (default: 1)
  const [from, setFrom] = useState("Cairo"); // Starting location (default: Cairo)
  const [to, setTo] = useState("Alexandria"); // Destination (default: Alexandria)
  const [budget, setBudget] = useState(); // Budget (optional)
  const [withWhom, setWithWhom] = useState("Solo"); // Traveling with (default: Solo)
  const [transport, setTransport] = useState(false); // Transport option (default: false)
  const [matches, setMatches] = useState(false); // Matches option (default: false)
  const [kids, setKids] = useState(false); // Kids option (default: false)
  const navigate = useNavigate(); // Hook to navigate to different routes

  // List of Egyptian cities for the "From" and "To" dropdowns
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

  // Function to handle the "Special Offer" button click
  const handleClick = () => {
    navigate('/special-offers'); // Navigate to the "Special Offers" page
  };

  // Function to swap the "From" and "To" locations
  const swapLocations = () => {
    setFrom(to); // Set "From" to the current "To" value
    setTo(from); // Set "To" to the current "From" value
  };

  return (
    <div className="bg-[#f4f6f8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form>
            {/* From and To Locations */}
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981]"
                  value={from} 
                  onChange={(e) => setFrom(e.target.value)}
                >
                  {egyptianCities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-1 flex items-end justify-center">
                <button 
                  type="button" 
                  onClick={swapLocations}
                  className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <BiTransferAlt className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981]"
                  value={to} 
                  onChange={(e) => setTo(e.target.value)}
                >
                  {egyptianCities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input 
                  type="date" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981]"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input 
                  type="date" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981]"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Trip Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Trip Type</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981]"
                value={tripType} 
                onChange={(e) => setTripType(e.target.value)}
              >
                {tripTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Number of People */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of People</label>
              <input 
                type="number" 
                min="1" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981]"
                value={people} 
                onChange={(e) => setPeople(e.target.value)}
              />
            </div>

            {/* With Whom */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">With</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981]"
                value={withWhom} 
                onChange={(e) => setWithWhom(e.target.value)}
              >
                <option value="Solo">Solo</option>
                <option value="Family">Family</option>
                <option value="Friends">Friends</option>
              </select>
            </div>

            {/* Budget */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
              <input 
                type="number" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981]"
                value={budget} 
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter your budget"
              />
            </div>

            {/* Checkboxes */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-[#10b981] focus:ring-[#10b981] border-gray-300 rounded"
                  checked={transport} 
                  onChange={() => setTransport(!transport)}
                />
                <label className="ml-2 block text-sm text-gray-700">Transport</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-[#10b981] focus:ring-[#10b981] border-gray-300 rounded"
                  checked={matches} 
                  onChange={() => setMatches(!matches)}
                />
                <label className="ml-2 block text-sm text-gray-700">Matches</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-[#10b981] focus:ring-[#10b981] border-gray-300 rounded"
                  checked={kids} 
                  onChange={() => setKids(!kids)}
                />
                <label className="ml-2 block text-sm text-gray-700">Kids</label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <button 
                type="submit" 
                className="bg-[#10b981] text-white px-6 py-3 rounded-lg hover:bg-[#059669] transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <FiSend className="h-5 w-5" />
                Submit
              </button>

              <button 
                onClick={handleClick}
                className="bg-[#f59e0b] text-white px-6 py-3 rounded-lg hover:bg-[#d97706] transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <GiPresent className="h-5 w-5" />
                Special Offer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TripForm;
import React, { useState } from 'react';
import { MapPin, Compass, Heart, Search } from 'lucide-react';
import { FaPlane } from 'react-icons/fa';
import { BsRobot } from 'react-icons/bs';
import TripForm from '../Components/TripForm';
import { useNavigate } from 'react-router-dom';

function AITripForm({ onClose }) {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [activities, setActivities] = useState([]);
  const [budget, setBudget] = useState([1000, 5000]);
  const [accommodation, setAccommodation] = useState('Hotel');
  const [preferences, setPreferences] = useState('');

  const handleActivityChange = (activity) => {
    setActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((item) => item !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      destination,
      startDate,
      endDate,
      travelers,
      activities,
      budget,
      accommodation,
      preferences,
    });
    onClose(); 
  };

  return (
    <div className="mt-4 bg-white/90 p-6 rounded-lg shadow-lg backdrop-blur-sm max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[#1f2937] mb-4">Create Your AI-Powered Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* From */}
          <div>
            <label className="block text-sm font-medium text-[#1f2937] mb-1">From</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your starting location"
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-[#10b981]"
              required
            />
          </div>

          {/* To */}
          <div>
            <label className="block text-sm font-medium text-[#1f2937] mb-1">To</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-[#10b981]"
              required
            />
          </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#1f2937] mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-[#10b981]"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#1f2937] mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-[#10b981]"
              required
            />
          </div>
        </div>

        {/* Number of Travelers */}
        <div>
          <label className="block text-sm font-medium text-[#1f2937] mb-1">Number of Travelers</label>
          <input
            type="number"
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
            min="1"
            className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-[#10b981]"
            required
          />
        </div>

        {/* Preferred Activities */}
        <div>
          <label className="block text-sm font-medium text-[#1f2937] mb-1">Preferred Activities</label>
          <div className="flex flex-wrap gap-4">
            {['Beaches', 'Adventure', 'Shopping', 'Culture', 'Food'].map((activity) => (
              <label key={activity} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={activities.includes(activity)}
                  onChange={() => handleActivityChange(activity)}
                  className="h-4 w-4 text-[#10b981] focus:ring-[#10b981]"
                />
                <span>{activity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Budget Range */}
        <div>
          <label className="block text-sm font-medium text-[#1f2937] mb-1">Budget Range ($)</label>
          <div className="flex gap-4 items-center">
            <span>{budget[0]}</span>
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={budget[1]}
              onChange={(e) => setBudget([budget[0], Number(e.target.value)])}
              className="w-full"
            />
            <span>{budget[1]}</span>
          </div>
        </div>

        {/* Accommodation Type */}
        <div>
          <label className="block text-sm font-medium text-[#1f2937] mb-1">Accommodation Type</label>
          <select
            value={accommodation}
            onChange={(e) => setAccommodation(e.target.value)}
            className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-[#10b981]"
          >
            <option value="Hotel">Hotel</option>
            <option value="Resort">Resort</option>
            <option value="Apartment">Apartment</option>
          </select>
        </div>

        {/* Special Preferences */}
        <div>
          <label className="block text-sm font-medium text-[#1f2937] mb-1">Special Preferences</label>
          <textarea
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="Any special requests?"
            className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-[#10b981]"
            rows="4"
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-[#10b981] text-white rounded-md hover:bg-[#059669] transition-colors"
          >
            Generate Trip
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-[#1f2937] rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Home() {
  const [showTripForm, setShowTripForm] = useState(false);
  const [showAITripForm, setShowAITripForm] = useState(false);
  const navigate = useNavigate();

  const handleTripButtonClick = () => {
    setShowTripForm(!showTripForm);
    setShowAITripForm(false); 
  };

  const handleAIButtonClick = () => {
    setShowAITripForm(!showAITripForm);
    setShowTripForm(false); 
  };

  const handleBookNow = (destination) => {
    navigate('/trip-details', { state: { destination } });
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-[500px] object-cover object-center"
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000"
            alt="Beautiful landscape"
          />
          <div className="absolute inset-0 bg-opacity-40"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to a World of Possibilities
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              From exploring iconic landmarks to hidden gems, discover personalized journeys that match your style and passions.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where would you like to go?"
                  className="ml-2 flex-1 outline-none text-[#1f2937]"
                />
                <button className="bg-[#10b981] text-white px-6 py-2 rounded-md hover:bg-[#059669] transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Create Trip Buttons */}
            <div className="mt-8 text-center flex justify-center gap-4">
              {/* Create Your Trip Button */}
              {!showAITripForm && (
                <button
                  onClick={handleTripButtonClick}
                  className={`px-8 py-3 rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg flex items-center justify-center gap-2
                    ${showTripForm
                      ? 'bg-white text-[#10b981] border-2 border-[#10b981] hover:bg-[#f0fdf4]'
                      : 'bg-[#10b981] text-white hover:bg-[#059669]'
                    }`}
                >
                  <FaPlane
                    className={`h-5 w-5 transition-transform duration-300 ${
                      showTripForm ? 'rotate-45' : ''
                    }`}
                  />
                  Create Your Trip
                </button>
              )}

              {/* Create Trip Using AI Button */}
              {!showTripForm && (
                <button
                  onClick={handleAIButtonClick}
                  className={`px-8 py-3 rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg flex items-center justify-center gap-2
                    ${showAITripForm
                      ? 'bg-white text-[#2563eb] border-2 border-[#2563eb] hover:bg-[#eff6ff]'
                      : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                    }`}
                >
                  <BsRobot className="h-5 w-5" />
                  Create Trip Using AI
                </button>
              )}
            </div>

            {/* Conditionally render the heading and description for TripForm */}
            {showTripForm && (
              <div className="mt-4 bg-white/90 p-4 rounded-lg backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-[#1f2937] mb-2">
                  Create Your Trip
                </h2>
                <p className="text-[#4b5563] text-lg max-w-2xl mx-auto">
                  Plan your perfect journey by filling out the details below.
                  We'll help you create a personalized trip that matches your
                  preferences.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trip Form Section */}
      {showTripForm && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TripForm />
        </div>
      )}

      {/* AI Trip Form Section */}
      {showAITripForm && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AITripForm onClose={() => setShowAITripForm(false)} />
        </div>
      )}

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <MapPin className="h-10 w-10 text-[#2563eb] mb-4" />
            <h3 className="text-xl font-semibold text-[#1f2937] mb-2">
              Curated Destinations
            </h3>
            <p className="text-gray-600">
              Discover handpicked locations that match your interests and travel
              style.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Compass className="h-10 w-10 text-[#2563eb] mb-4" />
            <h3 className="text-xl font-semibold text-[#1f2937] mb-2">
              Personalized Journeys
            </h3>
            <p className="text-gray-600">
              Experience trips tailored to your preferences and desired
              adventures.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Heart className="h-10 w-10 text-[#2563eb] mb-4" />
            <h3 className="text-xl font-semibold text-[#1f2937] mb-2">
              Memorable Experiences
            </h3>
            <p className="text-gray-600">
              Create lasting memories with unique and authentic travel
              experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-[#1f2937] mb-8">
          Popular Destinations
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              id: 1,
              tripId: 1,
              title: 'Cairo, Egypt',
              image:
                'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              description:
                "Experience the vibrant culture and history of Egypt's capital.",
            },
            {
              id: 2,
              tripId: 3,
              title: 'Luxor, Egypt',
              image:
                'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800',
              description:
                'Explore the ancient temples and tombs along the Nile in Luxor.',
            },
            {
              id: 3,
              tripId: 5,
              title: 'Sharm El Sheikh, Egypt',
              image:
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800',
              description:
                'Relax on the Red Sea coast with world-class diving and beaches.',
            },
          ].map((destination) => (
            <div
              key={destination.id}
              className="group relative overflow-hidden rounded-lg"
            >
              <img
                src={destination.image}
                alt={destination.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {destination.title}
                  </h3>
                  <p className="text-white/80 mb-4">{destination.description}</p>
                  <button
                    onClick={() => navigate(`/trips/${destination.tripId}`)}
                    className="bg-[#10b981] text-white px-4 py-2 rounded-md hover:bg-[#059669] transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
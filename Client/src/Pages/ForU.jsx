import React from 'react';
import { Star, MapPin, Calendar, ArrowRight, Heart } from 'lucide-react';

function App() {
  const recommendedPlaces = [
    {
      id: 1,
      name: "Cairo Nile View Hotel",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800",
      description: "Enjoy breathtaking views of the Nile and the vibrant city life of Cairo.",
      rating: 4.9,
      location: "Cairo, Egypt",
      price: "$180/night"
    },
    {
      id: 2,
      name: "Luxor Temple Retreat",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800",
      description: "Stay near the ancient wonders of Luxor and explore the Valley of the Kings.",
      rating: 4.8,
      location: "Luxor, Egypt",
      price: "$150/night"
    },
    {
      id: 3,
      name: "Sharm El Sheikh Beach Resort",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800",
      description: "Relax on the Red Sea coast with world-class diving and vibrant nightlife.",
      rating: 4.7,
      location: "Sharm El Sheikh, Egypt",
      price: "$220/night"
    }
  ];

  const pastTrips = [
    {
      id: 1,
      destination: "Aswan, Egypt",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800",
      date: "April 2023",
      duration: "7 days",
      rating: 5
    },
    {
      id: 2,
      destination: "Siwa Oasis, Egypt",
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800",
      date: "September 2023",
      duration: "10 days",
      rating: 4.8
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-[#2563eb]">Travel Explorer</h1>
        </div>
      </header>

      {/* Recommended Places Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1f2937] mb-2">Discover New Destinations</h2>
          <p className="text-gray-600">
            Explore new locations tailored to your interests and previous adventures! 🌍
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedPlaces.map((place) => (
            <div key={place.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="relative h-48">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <Heart className="w-5 h-5 text-[#ef4444]" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-[#1f2937]">{place.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-[#facc15] fill-current" />
                    <span className="ml-1 text-gray-600">{place.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{place.description}</p>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{place.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#2563eb] font-semibold">{place.price}</span>
                  <button className="bg-[#10b981] text-white px-4 py-2 rounded-lg hover:bg-[#059669] transition duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Past Trips Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 bg-white rounded-xl shadow-sm mb-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1f2937] mb-2">Your Travel History</h2>
          <p className="text-gray-600">
            Relive your favorite moments and plan your next adventure! ✈️
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pastTrips.map((trip) => (
            <div key={trip.id} className="flex bg-[#f8fafc] rounded-xl overflow-hidden shadow-md">
              <div className="w-1/3">
                <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover" />
              </div>
              <div className="w-2/3 p-6">
                <h3 className="text-xl font-semibold text-[#1f2937] mb-2">{trip.destination}</h3>
                <div className="flex items-center text-gray-500 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{trip.date} • {trip.duration}</span>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(trip.rating)
                          ? 'text-[#facc15] fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <button className="flex items-center text-[#ef4444] hover:text-[#dc2626] transition duration-300">
                  <span className="mr-2">Rebook this trip</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
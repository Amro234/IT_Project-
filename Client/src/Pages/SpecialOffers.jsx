import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StarIcon, HeartIcon, MagnifyingGlassIcon, ClockIcon, PersonIcon } from '@radix-ui/react-icons';
import { Star, MapPin, Calendar, ArrowRight, Heart, Search, Filter } from 'lucide-react';
import { addToFavorites, removeFromFavorites, isInFavorites } from '../utils/favorites';
import { toast } from 'react-toastify';

const SpecialOffers = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const offersRef = useRef(null);
  const [favorites, setFavorites] = useState([]);

  const filters = [
    { id: 'all', label: 'All Offers' },
    { id: 'beach', label: 'Beach' },
    { id: 'mountain', label: 'Mountain' },
    { id: 'city', label: 'City' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'cruise', label: 'Cruise' }
  ];

  const offers = [
    {
      id: 1,
      title: "Sharm El Sheikh Paradise Escape",
      description: "Experience luxury resorts and pristine beaches on the Red Sea in Sharm El Sheikh.",
      price: "$999",
      originalPrice: "$1299",
      discount: "23% OFF",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      tags: ["Beach", "Luxury", "Diving"],
      category: "beach",
      duration: "7 days",
      rating: 4.9,
      reviews: 245,
      views: 1256,
      remainingSpots: 4
    },
    {
      id: 2,
      title: "Aswan & Nile Adventure",
      description: "Cruise the Nile and explore the ancient temples and vibrant culture of Aswan.",
      price: "$1199",
      originalPrice: "$1499",
      discount: "20% OFF",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1000&q=80",
      tags: ["River", "Culture", "History"],
      category: "adventure",
      duration: "8 days",
      rating: 4.8,
      reviews: 189,
      views: 892,
      remainingSpots: 6
    },
    {
      id: 3,
      title: "Cairo & Giza Pyramids Tour",
      description: "Discover the magic of Cairo and marvel at the Great Pyramids of Giza.",
      price: "$899",
      originalPrice: "$1099",
      discount: "18% OFF",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
      tags: ["City", "Culture", "History"],
      category: "city",
      duration: "5 days",
      rating: 4.7,
      reviews: 312,
      views: 1543,
      remainingSpots: 8
    },
    {
      id: 4,
      title: "Dahab Diving Adventure",
      description: "Dive into the crystal-clear waters of Dahab and explore the Blue Hole.",
      price: "$1099",
      originalPrice: "$1399",
      discount: "21% OFF",
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1000&q=80",
      tags: ["Adventure", "Diving", "Nature"],
      category: "adventure",
      duration: "6 days",
      rating: 4.9,
      reviews: 156,
      views: 789,
      remainingSpots: 5
    },
    {
      id: 5,
      title: "Siwa Oasis Wellness Retreat",
      description: "Relax and rejuvenate in the tranquil Siwa Oasis, surrounded by palm trees and salt lakes.",
      price: "$1299",
      originalPrice: "$1599",
      discount: "19% OFF",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80",
      tags: ["Wellness", "Nature", "Culture"],
      category: "cruise",
      duration: "7 days",
      rating: 4.8,
      reviews: 234,
      views: 1123,
      remainingSpots: 15
    }
  ];

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites.map(fav => fav.id));
  };

  const toggleFavorite = (offer) => {
    if (favorites.includes(offer.id)) {
      removeFromFavorites(offer.id);
      setFavorites(prev => prev.filter(id => id !== offer.id));
      toast.success('Offer removed from favorites', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const added = addToFavorites(offer);
      if (added) {
        setFavorites(prev => [...prev, offer.id]);
        toast.success('Offer added to favorites', {
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

  const handleSearch = () => {
    setActiveFilter('all');
    offersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filteredOffers = offers.filter(offer => {
    const matchesFilter = activeFilter === 'all' || offer.category === activeFilter;
    const matchesSearch = searchQuery === '' ||
                         offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      {/* Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/30 to-[#1e3a8a]/40 z-1"></div>

        {/* Content */}
        <div className="relative z-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Exclusive Travel Deals
          </h1>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Discover our handpicked selection of special offers and start planning your next adventure
          </p>
          <div className="flex justify-center gap-4">
            <div className="relative w-full max-w-md flex">
              <div className="relative flex-grow">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search offers..."
                  className="w-full pl-10 pr-4 py-3 rounded-l-lg bg-white/20 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <button 
                className="px-6 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-r-lg border-l border-white/10 transition-all duration-200 flex items-center justify-center"
                onClick={handleSearch}
              >
                <MagnifyingGlassIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={offersRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Simple Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-[#2563eb] text-white'
                  : 'bg-white text-[#333333] hover:bg-gray-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={() => toggleFavorite(offer)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(offer.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#10b981] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {offer.discount}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-[#333333] font-medium">{offer.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({offer.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <PersonIcon className="w-4 h-4 mr-1" />
                    {offer.views} views
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#2563eb] mb-2">{offer.title}</h3>
                <p className="text-[#333333] mb-4">{offer.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-[#10b981]">{offer.price}</span>
                    <span className="text-gray-400 line-through ml-2">{offer.originalPrice}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {offer.duration}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {offer.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#f4f6f8] text-[#333333] rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/offer/${offer.id}`}
                  className="block w-full text-center py-3 bg-[#10b981] text-white rounded-lg font-medium hover:bg-[#0d9c6e] transition-colors"
                >
                  Claim Offer
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No offers match your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialOffers;
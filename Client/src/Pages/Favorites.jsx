import React, { useState, useEffect } from 'react';
import { FiHeart, FiTrash2, FiArrowLeft, FiSearch, FiFilter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterCategory, setFilterCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(savedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    }
  };

  const removeFromFavorites = (itemId) => {
    try {
      const updatedFavorites = favorites.filter(item => item.id !== itemId);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all items from favorites?')) {
      setFavorites([]);
      localStorage.setItem('favorites', '[]');
    }
  };

  const filteredFavorites = favorites
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'dateAdded':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const categories = ['all', ...new Set(favorites.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Back"
            >
              <FiArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {favorites.length} items
            </span>
          </div>
          
          {favorites.length > 0 && (
            <button
              onClick={clearAllFavorites}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiTrash2 className="w-5 h-5" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Search and Filter Section */}
        {favorites.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search in favorites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="dateAdded">Sort by Date</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
          </div>
        )}

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <FiHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Favorites Yet</h2>
            <p className="text-gray-500 mb-6">Items you add to favorites will appear here</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Items
            </button>
          </div>
        ) : filteredFavorites.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <FiSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h2>
            <p className="text-gray-500">Try changing your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    {item.category && (
                      <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full mt-1">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromFavorites(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Remove from favorites"
                  >
                    <FiHeart className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                
                {item.image && (
                  <div className="relative h-48 mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{new Date(item.dateAdded).toLocaleDateString('en-US')}</span>
                  <button
                    onClick={() => navigate(`/item/${item.id}`)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites; 
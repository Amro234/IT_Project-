import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Simulate search results
    const results = [
      { id: 1, title: 'Egypt Adventures', type: 'Tour', description: 'Explore ancient wonders.' },
      { id: 2, title: 'Luxury Nile Cruise', type: 'Offer', description: 'A relaxing journey along the Nile.' },
      { id: 3, title: 'Cairo City Tour', type: 'Tour', description: 'Discover the vibrant capital.' },
    ].filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Search EasyGo</h1>
      <p className="text-lg text-gray-600 mb-8">Find tours, offers, and information quickly.</p>

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSearch} className="flex items-center space-x-4 mb-8">
          <input
            type="text"
            placeholder="Search for tours, offers, or destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center py-3 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <SearchIcon size={20} className="mr-2" /> Search
          </button>
        </form>

        {searchResults.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Search Results</h2>
            {searchResults.map((result) => (
              <div key={result.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <h3 className="text-xl font-medium text-blue-700">{result.title}</h3>
                <p className="text-gray-600">Type: {result.type}</p>
                <p className="text-gray-700 mt-1">{result.description}</p>
              </div>
            ))}
          </div>
        ) : ( searchTerm &&
          <p className="text-center text-gray-600">No results found for "{searchTerm}".</p>
        )}

        {!searchTerm && (
            <p className="text-center text-gray-600">Start typing to find what you're looking for.</p>
        )}

      </div>
    </div>
  );
};

export default Search; 
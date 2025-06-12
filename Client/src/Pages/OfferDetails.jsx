import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon, ClockIcon, PersonIcon } from '@radix-ui/react-icons';

const OfferDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentOffer, setCurrentOffer] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchOfferData = async () => {
      try {
        // Simulate API call
        const response = await fetch(`/api/offers/${id}`);
        const data = await response.json();
        setCurrentOffer(data);
        setStatus('succeeded');
      } catch (err) {
        setError(err.message);
        setStatus('failed');
      }
    };

    fetchOfferData();
  }, [id]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563eb] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading offer details...</p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (!currentOffer) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-[#2563eb] hover:text-[#1d4ed8] flex items-center mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{currentOffer.title}</h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Basic Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={currentOffer.image}
                alt={currentOffer.title}
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-gray-900 font-medium">{currentOffer.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({currentOffer.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <PersonIcon className="w-4 h-4 mr-1" />
                    {currentOffer.views} views
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{currentOffer.description}</p>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold text-[#10b981]">${currentOffer.price}</span>
                    <span className="text-gray-400 line-through ml-2">${currentOffer.originalPrice}</span>
                    <span className="ml-2 text-[#ef4444] font-medium">{currentOffer.discount}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {currentOffer.duration}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {currentOffer.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#f4f6f8] text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => navigate(`/booking/${currentOffer.id}`)}
                  className="w-full py-3 bg-[#10b981] text-white rounded-lg font-medium hover:bg-[#0d9c6e] transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Included/Excluded */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What's Included</h2>
              <ul className="space-y-2 mb-6">
                {currentOffer.included.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#10b981] mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mb-4">What's Not Included</h2>
              <ul className="space-y-2">
                {currentOffer.excluded.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#ef4444] mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails; 
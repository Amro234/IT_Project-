import React, { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import { addToFavorites, removeFromFavorites, isInFavorites } from '../../utils/favorites';

const FavoriteButton = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isInFavorites(item.id));
  }, [item.id]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(item.id);
      setIsFavorite(false);
    } else {
      const added = addToFavorites(item);
      if (added) {
        setIsFavorite(true);
      }
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full transition-colors ${
        isFavorite 
          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
      }`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <FiHeart className="w-5 h-5" />
    </button>
  );
};

export default FavoriteButton; 
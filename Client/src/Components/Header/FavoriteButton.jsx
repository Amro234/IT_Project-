import React, { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { addToFavorites, removeFromFavorites, isInFavorites } from '../../utils/favorites';
import { toast } from 'react-toastify';

const FavoriteButton = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(isInFavorites(item.id));
  }, [item.id]);

  const handleToggleFavorite = (e) => {
    e.preventDefault(); // Prevent any parent click events
    if (isFavorite) {
      removeFromFavorites(item.id);
      setIsFavorite(false);
      toast.success('تم إزالة العنصر من المفضلة', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        rtl: true,
      });
    } else {
      const added = addToFavorites(item);
      if (added) {
        setIsFavorite(true);
        toast.success('تم إضافة العنصر إلى المفضلة', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          rtl: true,
        });
      }
    }
    // Navigate to favorites page
    navigate('/favorites');
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
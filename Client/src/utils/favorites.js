// Function to add an item to favorites
export const addToFavorites = (item) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  // Check if item already exists in favorites
  const exists = favorites.some(fav => fav.id === item.id);
  if (!exists) {
    favorites.push(item);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return true;
  }
  return false;
};

// Function to remove an item from favorites
export const removeFromFavorites = (itemId) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const updatedFavorites = favorites.filter(item => item.id !== itemId);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

// Function to check if an item is in favorites
export const isInFavorites = (itemId) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  return favorites.some(item => item.id === itemId);
};

// Function to get all favorites
export const getAllFavorites = () => {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}; 
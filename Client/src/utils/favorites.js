// Function to get all favorites from localStorage
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

// Function to add an item to favorites
export const addToFavorites = (item) => {
  try {
    const favorites = getFavorites();
    // Check if item already exists in favorites
    if (!favorites.some(fav => fav.id === item.id)) {
      const newFavorite = {
        ...item,
        dateAdded: new Date().toISOString(),
        category: 'hotel'
      };
      favorites.push(newFavorite);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
};

// Function to remove an item from favorites
export const removeFromFavorites = (itemId) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.id !== itemId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
};

// Function to check if an item is in favorites
export const isInFavorites = (itemId) => {
  try {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === itemId);
  } catch (error) {
    console.error('Error checking favorites:', error);
    return false;
  }
};

// Function to clear all favorites
export const clearFavorites = () => {
  try {
    localStorage.setItem('favorites', JSON.stringify([]));
    return true;
  } catch (error) {
    console.error('Error clearing favorites:', error);
    return false;
  }
}; 
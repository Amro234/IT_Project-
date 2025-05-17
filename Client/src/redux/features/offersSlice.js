import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API call - replace with your actual API endpoint
const fetchOfferById = async (id) => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This is mock data - replace with actual API call
  const offers = {
    1: {
      id: 1,
      title: "Sharm El Sheikh Paradise Escape",
      description: "Experience luxury resorts and pristine beaches on the Red Sea in Sharm El Sheikh.",
      price: 999,
      originalPrice: 1299,
      discount: "23% OFF",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      tags: ["Beach", "Luxury", "Diving"],
      category: "beach",
      duration: "7 days",
      rating: 4.9,
      reviews: 245,
      views: 1256,
      remainingSpots: 4,
      included: [
        "Luxury resort accommodation",
        "Daily breakfast and dinner",
        "All entrance fees to attractions",
        "Professional English-speaking guide",
        "Air-conditioned transportation",
        "Airport transfers"
      ],
      excluded: [
        "International flights",
        "Egypt entry visa",
        "Travel insurance",
        "Personal expenses",
        "Optional activities",
        "Tips for guides and drivers"
      ]
    },
    2: {
      id: 2,
      title: "Aswan & Nile Adventure",
      description: "Cruise the Nile and explore the ancient temples and vibrant culture of Aswan.",
      price: 1199,
      originalPrice: 1499,
      discount: "20% OFF",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
      tags: ["River", "Culture", "History"],
      category: "adventure",
      duration: "8 days",
      rating: 4.8,
      reviews: 189,
      views: 892,
      remainingSpots: 6,
      included: [
        "Luxury Nile cruise accommodation",
        "Daily breakfast and dinner",
        "All entrance fees to attractions",
        "Professional English-speaking guide",
        "Air-conditioned transportation",
        "Airport transfers"
      ],
      excluded: [
        "International flights",
        "Egypt entry visa",
        "Travel insurance",
        "Personal expenses",
        "Optional activities",
        "Tips for guides and drivers"
      ]
    }
  };

  const offer = offers[id];
  if (!offer) {
    throw new Error(`Offer with ID ${id} not found. Please check the URL and try again.`);
  }
  return offer;
};

// Async thunk for fetching an offer by ID
export const fetchOffer = createAsyncThunk(
  'offers/fetchOffer',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchOfferById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice for managing offers state
const offersSlice = createSlice({
  name: 'offers',
  initialState: {
    allOffers: [
      {
        id: 1,
        title: "Sharm El Sheikh Paradise Escape",
        description: "Experience luxury resorts and pristine beaches on the Red Sea in Sharm El Sheikh.",
        price: 999,
        originalPrice: 1299,
        discount: "23% OFF",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
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
        price: 1199,
        originalPrice: 1499,
        discount: "20% OFF",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
        tags: ["River", "Culture", "History"],
        category: "adventure",
        duration: "8 days",
        rating: 4.8,
        reviews: 189,
        views: 892,
        remainingSpots: 6
      }
    ],
    currentOffer: null,
    status: 'idle',
    error: null
  },
  reducers: {
    clearCurrentOffer: (state) => {
      state.currentOffer = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentOffer = action.payload;
        state.error = null;
      })
      .addCase(fetchOffer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch offer details';
      });
  }
});

export const { clearCurrentOffer } = offersSlice.actions;
export default offersSlice.reducer; 
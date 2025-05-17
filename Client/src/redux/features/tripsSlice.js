import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API call - replace with your actual API endpoint
const fetchTripById = async (id) => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This is mock data - replace with actual API call
  const trips = {
    1: {
      id: 1,
      destinationId: 1, // Cairo
      title: "Cairo Adventure",
      mainImage: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a",
      description: "Explore the ancient wonders of Cairo, including the Pyramids of Giza and the Egyptian Museum.",
      price: 999,
      date: "March 15, 2025 - March 22, 2025",
      duration: "5 days",
      location: "Cairo, Egypt",
      groupSize: "4-12 people",
      difficulty: "Easy",
      rating: 4.8,
      reviews: 156,
      imageGallery: [
        "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368",
        "https://images.unsplash.com/photo-1539768942893-daf53e448371",
        "https://images.unsplash.com/photo-1562842523-6d492ddc3e19",
        "https://images.unsplash.com/photo-1544815521-80841127c00f",
        "https://images.unsplash.com/photo-1572252009286-268acec5ca0a",
        "https://images.unsplash.com/photo-1581430872223-2c83279e6d1e"
      ],
      itinerary: [
        {
          day: 1,
          title: "Welcome to Cairo",
          description: "Arrive in Cairo and transfer to your hotel. Enjoy a welcome dinner with your group and get ready for an exciting journey through Egypt's capital."
        },
        {
          day: 2,
          title: "Pyramids of Giza & Sphinx",
          description: "Full day exploring the Pyramids of Giza, the Sphinx, and the Valley Temple. Experience the grandeur of these ancient wonders and learn about their fascinating history."
        },
        {
          day: 3,
          title: "Egyptian Museum & Old Cairo",
          description: "Visit the Egyptian Museum, home to Tutankhamun's treasures. Explore Old Cairo's historic churches and mosques, including the Hanging Church and Amr Ibn Al-Aas Mosque."
        },
        {
          day: 4,
          title: "Islamic Cairo & Khan el-Khalili",
          description: "Discover Islamic Cairo's architectural gems, including the Citadel and Muhammad Ali Mosque. Spend the afternoon exploring the vibrant Khan el-Khalili bazaar."
        },
        {
          day: 5,
          title: "Saqqara & Memphis",
          description: "Visit the Step Pyramid of Djoser in Saqqara, the oldest stone structure in the world. Explore the ancient capital of Memphis and its open-air museum."
        },
        {
          day: 6,
          title: "Nile River Cruise",
          description: "Enjoy a relaxing Nile River cruise with dinner and traditional entertainment. Experience Cairo's beautiful skyline from the water."
        },
        {
          day: 7,
          title: "Free Day & Optional Activities",
          description: "Free day to explore at your own pace. Optional activities include visiting the Cairo Tower, Al-Azhar Park, or taking a cooking class to learn Egyptian cuisine."
        },
        {
          day: 8,
          title: "Departure",
          description: "Transfer to the airport for your departure, taking with you unforgettable memories of Cairo's wonders."
        }
      ],
      included: [
        "7 nights in a 4-star hotel in central Cairo",
        "Daily breakfast and 3 dinners",
        "All entrance fees to attractions",
        "Professional English-speaking Egyptologist guide",
        "Air-conditioned transportation",
        "Airport transfers",
        "Nile River dinner cruise",
        "All taxes and service charges"
      ],
      excluded: [
        "International flights",
        "Egypt entry visa",
        "Travel insurance",
        "Personal expenses",
        "Optional activities",
        "Tips for guides and drivers",
        "Lunch and some dinners",
        "Any items not mentioned in the itinerary"
      ]
    },
    2: {
      id: 2,
      destinationId: 1, // Cairo
      title: "Cairo Cultural Experience",
      mainImage: "https://images.unsplash.com/photo-1581430872223-2c83279e6d1e",
      description: "Immerse yourself in Cairo's rich culture and history with this comprehensive tour.",
      price: 1299,
      date: "June 1, 2025 - June 8, 2025",
      duration: "7 days",
      location: "Cairo, Egypt",
      groupSize: "4-12 people",
      difficulty: "Easy",
      rating: 4.9,
      reviews: 89,
      imageGallery: [
        "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368",
        "https://images.unsplash.com/photo-1539768942893-daf53e448371",
        "https://images.unsplash.com/photo-1562842523-6d492ddc3e19",
        "https://images.unsplash.com/photo-1544815521-80841127c00f"
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Cairo",
          description: "Welcome to Egypt! Arrive in Cairo and transfer to your hotel. Evening welcome dinner with your group."
        },
        {
          day: 2,
          title: "Pyramids of Giza",
          description: "Full day exploring the Pyramids of Giza, the Sphinx, and the Valley Temple. Evening sound and light show."
        },
        {
          day: 3,
          title: "Egyptian Museum",
          description: "Visit the Egyptian Museum, including Tutankhamun's treasures. Afternoon at Khan el-Khalili bazaar."
        }
      ],
      included: [
        "4-star hotel accommodation",
        "Daily breakfast and dinner",
        "All entrance fees to attractions",
        "Professional Egyptologist guide",
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
    3: {
      id: 3,
      destinationId: 2, // Luxor
      title: "Luxor Temple Tour",
      mainImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      description: "Discover the ancient temples and tombs of Luxor along the Nile River.",
      price: 1199,
      date: "July 10, 2025 - July 17, 2025",
      duration: "4 days",
      location: "Luxor, Egypt",
      groupSize: "4-12 people",
      difficulty: "Moderate",
      rating: 4.7,
      reviews: 112,
      imageGallery: [
        "https://images.unsplash.com/photo-1504214208698-ea446addfa7e",
        "https://images.unsplash.com/photo-1537956965359-7d1c4e4171c3",
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a"
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Phuket",
          description: "Welcome to Thailand! Transfer to your beachfront resort and enjoy a welcome dinner."
        },
        {
          day: 2,
          title: "Phi Phi Islands Tour",
          description: "Full-day speedboat tour of the Phi Phi Islands, including Maya Bay and snorkeling spots."
        },
        {
          day: 3,
          title: "James Bond Island",
          description: "Visit the famous James Bond Island and explore Phang Nga Bay by traditional longtail boat."
        }
      ],
      included: [
        "Luxury resort accommodation",
        "Daily breakfast",
        "Island tours and activities",
        "Speedboat transfers",
        "Professional English-speaking guide",
        "Snorkeling equipment"
      ],
      excluded: [
        "International flights",
        "Thailand visa (if required)",
        "Travel insurance",
        "Optional activities",
        "Personal expenses",
        "Tips for guides"
      ]
    },
    4: {
      id: 4,
      destinationId: 2, // Luxor
      title: "Nile Cruise Experience",
      mainImage: "https://images.unsplash.com/photo-1562842523-6d492ddc3e19",
      description: "Experience the magic of the Nile with this luxurious cruise from Luxor.",
      price: 1499,
      date: "July 10, 2025 - July 17, 2025",
      duration: "5 days",
      location: "Luxor, Egypt",
      groupSize: "4-12 people",
      difficulty: "Easy",
      rating: 4.9,
      reviews: 78,
      imageGallery: [
        "https://images.unsplash.com/photo-1504214208698-ea446addfa7e",
        "https://images.unsplash.com/photo-1537956965359-7d1c4e4171c3",
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a"
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Phuket",
          description: "Welcome to Thailand! Transfer to your beachfront resort and enjoy a welcome dinner."
        },
        {
          day: 2,
          title: "Phi Phi Islands Tour",
          description: "Full-day speedboat tour of the Phi Phi Islands, including Maya Bay and snorkeling spots."
        },
        {
          day: 3,
          title: "James Bond Island",
          description: "Visit the famous James Bond Island and explore Phang Nga Bay by traditional longtail boat."
        }
      ],
      included: [
        "Luxury resort accommodation",
        "Daily breakfast",
        "Island tours and activities",
        "Speedboat transfers",
        "Professional English-speaking guide",
        "Snorkeling equipment"
      ],
      excluded: [
        "International flights",
        "Thailand visa (if required)",
        "Travel insurance",
        "Optional activities",
        "Personal expenses",
        "Tips for guides"
      ]
    },
    5: {
      id: 5,
      destinationId: 3, // Sharm El Sheikh
      title: "Red Sea Diving Adventure",
      mainImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      description: "Explore the vibrant marine life of the Red Sea with this diving adventure.",
      price: 899,
      date: "July 10, 2025 - July 17, 2025",
      duration: "4 days",
      location: "Sharm El Sheikh, Egypt",
      groupSize: "4-12 people",
      difficulty: "Moderate",
      rating: 4.8,
      reviews: 134,
      imageGallery: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        "https://images.unsplash.com/photo-1537956965359-7d1c4e4171c3",
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a"
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Phuket",
          description: "Welcome to Thailand! Transfer to your beachfront resort and enjoy a welcome dinner."
        },
        {
          day: 2,
          title: "Phi Phi Islands Tour",
          description: "Full-day speedboat tour of the Phi Phi Islands, including Maya Bay and snorkeling spots."
        },
        {
          day: 3,
          title: "James Bond Island",
          description: "Visit the famous James Bond Island and explore Phang Nga Bay by traditional longtail boat."
        }
      ],
      included: [
        "Luxury resort accommodation",
        "Daily breakfast",
        "Island tours and activities",
        "Speedboat transfers",
        "Professional English-speaking guide",
        "Snorkeling equipment"
      ],
      excluded: [
        "International flights",
        "Thailand visa (if required)",
        "Travel insurance",
        "Optional activities",
        "Personal expenses",
        "Tips for guides"
      ]
    },
    6: {
      id: 6,
      destinationId: 3, // Sharm El Sheikh
      title: "Beach Resort Getaway",
      mainImage: "https://images.unsplash.com/photo-1544815521-80841127c00f",
      description: "Relax and unwind at a luxury beach resort in Sharm El Sheikh.",
      price: 799,
      date: "July 10, 2025 - July 17, 2025",
      duration: "3 days",
      location: "Sharm El Sheikh, Egypt",
      groupSize: "4-12 people",
      difficulty: "Easy",
      rating: 4.6,
      reviews: 92,
      imageGallery: [
        "https://images.unsplash.com/photo-1544815521-80841127c00f",
        "https://images.unsplash.com/photo-1537956965359-7d1c4e4171c3",
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a"
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Phuket",
          description: "Welcome to Thailand! Transfer to your beachfront resort and enjoy a welcome dinner."
        },
        {
          day: 2,
          title: "Phi Phi Islands Tour",
          description: "Full-day speedboat tour of the Phi Phi Islands, including Maya Bay and snorkeling spots."
        },
        {
          day: 3,
          title: "James Bond Island",
          description: "Visit the famous James Bond Island and explore Phang Nga Bay by traditional longtail boat."
        }
      ],
      included: [
        "Luxury resort accommodation",
        "Daily breakfast",
        "Island tours and activities",
        "Speedboat transfers",
        "Professional English-speaking guide",
        "Snorkeling equipment"
      ],
      excluded: [
        "International flights",
        "Thailand visa (if required)",
        "Travel insurance",
        "Optional activities",
        "Personal expenses",
        "Tips for guides"
      ]
    }
  };

  const trip = trips[id];
  if (!trip) {
    throw new Error(`Trip with ID ${id} not found. Please check the URL and try again.`);
  }
  return trip;
};

// Async thunk for fetching a trip by ID
export const fetchTrip = createAsyncThunk(
  'trips/fetchTrip',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchTripById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice for managing trips state
const tripsSlice = createSlice({
  name: 'trips',
  initialState: {
    allTrips: [
      {
        id: 1,
        destinationId: 1, // Cairo
        title: "Cairo Adventure",
        mainImage: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a",
        description: "Explore the ancient wonders of Cairo, including the Pyramids of Giza and the Egyptian Museum.",
        price: 999,
        duration: "5 days",
        location: "Cairo, Egypt",
        groupSize: "4-12 people",
        difficulty: "Easy",
        rating: 4.8,
        reviews: 156,
        // ... other trip details ...
      },
      {
        id: 2,
        destinationId: 1, // Cairo
        title: "Cairo Cultural Experience",
        mainImage: "https://images.unsplash.com/photo-1581430872223-2c83279e6d1e",
        description: "Immerse yourself in Cairo's rich culture and history with this comprehensive tour.",
        price: 1299,
        duration: "7 days",
        location: "Cairo, Egypt",
        groupSize: "4-12 people",
        difficulty: "Easy",
        rating: 4.9,
        reviews: 89,
        // ... other trip details ...
      },
      {
        id: 3,
        destinationId: 2, // Luxor
        title: "Luxor Temple Tour",
        mainImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        description: "Discover the ancient temples and tombs of Luxor along the Nile River.",
        price: 1199,
        duration: "4 days",
        location: "Luxor, Egypt",
        groupSize: "4-12 people",
        difficulty: "Moderate",
        rating: 4.7,
        reviews: 112,
        // ... other trip details ...
      },
      {
        id: 4,
        destinationId: 2, // Luxor
        title: "Nile Cruise Experience",
        mainImage: "https://images.unsplash.com/photo-1562842523-6d492ddc3e19",
        description: "Experience the magic of the Nile with this luxurious cruise from Luxor.",
        price: 1499,
        duration: "5 days",
        location: "Luxor, Egypt",
        groupSize: "4-12 people",
        difficulty: "Easy",
        rating: 4.9,
        reviews: 78,
        // ... other trip details ...
      },
      {
        id: 5,
        destinationId: 3, // Sharm El Sheikh
        title: "Red Sea Diving Adventure",
        mainImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        description: "Explore the vibrant marine life of the Red Sea with this diving adventure.",
        price: 899,
        duration: "4 days",
        location: "Sharm El Sheikh, Egypt",
        groupSize: "4-12 people",
        difficulty: "Moderate",
        rating: 4.8,
        reviews: 134,
        // ... other trip details ...
      },
      {
        id: 6,
        destinationId: 3, // Sharm El Sheikh
        title: "Beach Resort Getaway",
        mainImage: "https://images.unsplash.com/photo-1544815521-80841127c00f",
        description: "Relax and unwind at a luxury beach resort in Sharm El Sheikh.",
        price: 799,
        duration: "3 days",
        location: "Sharm El Sheikh, Egypt",
        groupSize: "4-12 people",
        difficulty: "Easy",
        rating: 4.6,
        reviews: 92,
        // ... other trip details ...
      }
    ],
    currentTrip: null,
    status: 'idle',
    error: null
  },
  reducers: {
    clearCurrentTrip: (state) => {
      state.currentTrip = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrip.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTrip.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentTrip = action.payload;
        state.error = null;
      })
      .addCase(fetchTrip.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch trip details';
      });
  }
});

export const { clearCurrentTrip } = tripsSlice.actions;
export default tripsSlice.reducer; 
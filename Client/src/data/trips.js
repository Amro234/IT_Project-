export const trips = [
  {
    id: 1,
    title: "Cairo to Luxor Adventure",
    description: "Experience the ancient wonders of Egypt on this unforgettable journey from Cairo to Luxor.",
    mainImage: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    location: "Cairo to Luxor, Egypt",
    duration: "5 Days / 4 Nights",
    groupSize: "Max 12 people",
    rating: 4.8,
    reviews: 156,
    price: 899,
    included: [
      "4-star hotel accommodation",
      "All transportation between sites",
      "Professional English-speaking guide",
      "All entrance fees to attractions",
      "Daily breakfast and dinner",
      "Nile River cruise"
    ],
    excluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips for guides and drivers"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cairo",
        description: "Welcome to Egypt! Transfer to your hotel and evening orientation meeting."
      },
      {
        day: 2,
        title: "Pyramids of Giza",
        description: "Visit the Great Pyramids, Sphinx, and Egyptian Museum."
      },
      {
        day: 3,
        title: "Fly to Luxor",
        description: "Morning flight to Luxor, visit Karnak Temple and Luxor Temple."
      },
      {
        day: 4,
        title: "Valley of the Kings",
        description: "Explore the Valley of the Kings, Temple of Hatshepsut, and Colossi of Memnon."
      },
      {
        day: 5,
        title: "Nile Cruise & Departure",
        description: "Morning Nile cruise, afternoon transfer to airport for departure."
      }
    ]
  },
  {
    id: 2,
    title: "Red Sea Diving Expedition",
    description: "Discover the underwater wonders of the Red Sea with this exclusive diving package.",
    mainImage: "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    location: "Sharm El Sheikh, Egypt",
    duration: "7 Days / 6 Nights",
    groupSize: "Max 8 people",
    rating: 4.9,
    reviews: 89,
    price: 1299,
    included: [
      "Luxury resort accommodation",
      "All diving equipment",
      "Professional diving instructor",
      "Daily diving sessions",
      "All meals included",
      "Airport transfers"
    ],
    excluded: [
      "International flights",
      "Travel insurance",
      "Personal diving gear",
      "Tips for staff"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Orientation",
        description: "Welcome to Sharm El Sheikh! Resort check-in and diving orientation."
      },
      {
        day: 2,
        title: "Beginner Dives",
        description: "Morning theory session, afternoon shallow water dives."
      },
      {
        day: 3,
        title: "Reef Exploration",
        description: "Full day of diving at famous local reefs."
      },
      {
        day: 4,
        title: "Advanced Sites",
        description: "Visit deeper dive sites with more challenging conditions."
      },
      {
        day: 5,
        title: "Wreck Diving",
        description: "Explore famous shipwrecks in the area."
      },
      {
        day: 6,
        title: "Free Diving",
        description: "Optional free diving day or relaxation at the resort."
      },
      {
        day: 7,
        title: "Departure",
        description: "Morning free time, afternoon transfer to airport."
      }
    ]
  }
];

export default trips; 
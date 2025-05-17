import { configureStore } from '@reduxjs/toolkit';
import tripsReducer from './features/tripsSlice';
import offersReducer from './features/offersSlice';

export const store = configureStore({
  reducer: {
    trips: tripsReducer,
    offers: offersReducer,
  },
});

export default store; 
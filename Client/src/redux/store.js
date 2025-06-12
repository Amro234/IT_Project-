import { configureStore } from '@reduxjs/toolkit';
import tripsReducer from './features/tripsSlice';
import offersReducer from './features/offersSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    trips: tripsReducer,
    offers: offersReducer,
    user: userReducer,
  },
});

export default store; 
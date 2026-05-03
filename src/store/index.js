import { configureStore } from '@reduxjs/toolkit';
import destinationsReducer from './destinationsSlice';
import bookingsReducer from './bookingsSlice';
import filtersReducer from './filtersSlice';

export const store = configureStore({
  reducer: {
    destinations: destinationsReducer,
    bookings: bookingsReducer,
    filters: filtersReducer,
  },
});

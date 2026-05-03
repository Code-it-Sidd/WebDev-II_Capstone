import { createSlice } from '@reduxjs/toolkit';

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    wishlist: JSON.parse(localStorage.getItem('wishlist') || '[]'),
    bookings: [],
    comparing: [],
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const id = action.payload;
      const idx = state.wishlist.indexOf(id);
      if (idx > -1) {
        state.wishlist.splice(idx, 1);
      } else {
        state.wishlist.push(id);
      }
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
    addBooking: (state, action) => {
      state.bookings.push({ ...action.payload, id: Date.now(), status: 'confirmed' });
    },
    toggleCompare: (state, action) => {
      const id = action.payload;
      const idx = state.comparing.indexOf(id);
      if (idx > -1) {
        state.comparing.splice(idx, 1);
      } else if (state.comparing.length < 3) {
        state.comparing.push(id);
      }
    },
    clearCompare: (state) => {
      state.comparing = [];
    },
  },
});

export const { toggleWishlist, addBooking, toggleCompare, clearCompare } = bookingsSlice.actions;
export default bookingsSlice.reducer;

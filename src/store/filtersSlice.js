import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    search: '',
    category: 'all',
    priceRange: [0, 5000],
    rating: 0,
    continent: 'all',
    sortBy: 'popular',
  },
  reducers: {
    setSearch: (state, action) => { state.search = action.payload; },
    setCategory: (state, action) => { state.category = action.payload; },
    setPriceRange: (state, action) => { state.priceRange = action.payload; },
    setRating: (state, action) => { state.rating = action.payload; },
    setContinent: (state, action) => { state.continent = action.payload; },
    setSortBy: (state, action) => { state.sortBy = action.payload; },
    resetFilters: (state) => {
      state.search = '';
      state.category = 'all';
      state.priceRange = [0, 5000];
      state.rating = 0;
      state.continent = 'all';
      state.sortBy = 'popular';
    },
  },
});

export const { setSearch, setCategory, setPriceRange, setRating, setContinent, setSortBy, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDestinationsAPI } from '../utils/api';

export const fetchDestinations = createAsyncThunk(
  'destinations/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await fetchDestinationsAPI(params);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState: {
    items: [],
    featured: [],
    total: 0,
    page: 1,
    loading: false,
    error: null,
    lastUpdated: null,
    weather: {},
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    appendDestinations: (state, action) => {
      state.items = [...state.items, ...action.payload.items];
      state.total = action.payload.total;
    },
    updateWeather: (state, action) => {
      state.weather = { ...state.weather, ...action.payload };
    },
    resetDestinations: (state) => {
      state.items = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.lastUpdated = Date.now();
        if (action.payload.append) {
          state.items = [...state.items, ...action.payload.items];
        } else {
          state.items = action.payload.items;
          state.featured = action.payload.items.filter(d => d.featured).slice(0, 3);
        }
        state.total = action.payload.total;
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, appendDestinations, updateWeather, resetDestinations } = destinationsSlice.actions;
export default destinationsSlice.reducer;

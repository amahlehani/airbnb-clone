import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    listings: [],
    loading: false,
    error: null,
};

// Fetch data from backend (db.json)
export const fetchListings = createAsyncThunk(
    "listings/fetchListings",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/listings"); // Adjust URL as needed
            if (!response.ok) {
                throw new Error("Failed to fetch listings");
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const listingSlice = createSlice({
    name: "listings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchListings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchListings.fulfilled, (state, action) => {
                state.loading = false;
                state.listings = action.payload;
            })
            .addCase(fetchListings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default listingSlice.reducer;
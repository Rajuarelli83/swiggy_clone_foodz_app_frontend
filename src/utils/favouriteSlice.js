import { createSlice } from '@reduxjs/toolkit';
import {
    fetchFavourites,
    addFavouriteToBackend,
    removeFavouriteFromBackend,
    clearFavouritesOnBackend
} from './favouriteThunks'; 

const initialState = {
    items: [],
    status: 'idle', 
    error: null,
};

const favouriteSlice = createSlice({
    name: "favourites",
    initialState,
    reducers: {
        setFavourites: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavourites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFavourites.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; 
            })
            .addCase(fetchFavourites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; 
                state.items = [];
            })
            .addCase(addFavouriteToBackend.fulfilled, (state, action) => {
                const newItem = action.payload;
                const exists = state.items.some(item => item.id === newItem.id);
                if (!exists) {
                    state.items.push(newItem);
                }
            })
            .addCase(removeFavouriteFromBackend.fulfilled, (state, action) => {
                const restaurantIdToRemove = action.payload;
                state.items = state.items.filter(item => item.id !== restaurantIdToRemove);
            })
            .addCase(clearFavouritesOnBackend.fulfilled, (state) => {
                state.items = [];
            });
    },
});

export const { setFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;


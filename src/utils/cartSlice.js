import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCartFromBackend,
  addItemToBackend,
  removeItemFromBackend,
  clearCartOnBackend
} from './cartThunks';

const initialState = {
  items: [],
  status: 'idle', 
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
        state.items = action.payload; 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartFromBackend.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartFromBackend.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; 
      })
      .addCase(fetchCartFromBackend.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.items = [];
      })
      .addCase(addItemToBackend.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeItemFromBackend.fulfilled, (state, action) => {
        const { itemId, restaurantId, fullRemove } = action.payload;
        if (fullRemove) {
            state.items = state.items.filter(
                item => !(item.card?.info?.id === itemId && item.restaurantId === restaurantId)
            );
        } else {
            const indexToRemove = state.items.findIndex(
                item => item.card?.info?.id === itemId && item.restaurantId === restaurantId
            );
            if (indexToRemove !== -1) {
                state.items.splice(indexToRemove, 1);
            }
        }
      })
      .addCase(clearCartOnBackend.fulfilled, (state) => {
        state.items = []; 
      });
  },
});

export const {setCartItems } = cartSlice.actions;
export default cartSlice.reducer;


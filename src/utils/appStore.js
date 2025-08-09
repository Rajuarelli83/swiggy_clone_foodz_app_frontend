import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import favouriteReducer from './favouriteSlice';

const appStore = configureStore({
        reducer :{
            cart :cartReducer,
            favourites :favouriteReducer,
        }
});
export default appStore ;
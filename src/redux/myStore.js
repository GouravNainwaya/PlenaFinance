// myStore.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import cartReducer, { initializeCart } from './cartSlice';
import favouritesReducer, { initializeFaviourtes } from './favouritesSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  favouritesSlice: favouritesReducer
});

const myStore = configureStore({
  reducer: rootReducer,
});

// Initialize the cart from AsyncStorage
myStore.dispatch(initializeCart());
myStore.dispatch(initializeFaviourtes());

export default myStore;
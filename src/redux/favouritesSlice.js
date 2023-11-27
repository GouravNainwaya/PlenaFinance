// favouritesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  favourites: [],
};

const loadCartFromStorage = async () => {
  try {
    const storedCart = await AsyncStorage.getItem('favourites');
    return storedCart ? JSON.parse(storedCart) : initialState;
  } catch (error) {
    console.error('Error loading favourites from AsyncStorage:', error);
    return initialState;
  }
};

const saveCartToStorage = async (favourites) => {
  try {
    await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
  } catch (error) {
    console.error('Error saving favourites to AsyncStorage:', error);
  }
};

const favouritesSlice = createSlice({
  name: 'dsfsdfdf',
  initialState,
  reducers: {
    loadFavourites: (state, action) => {
      return action.payload;
    },
    addItemToFavourites: (state, action) => {
      // console.log("action.payload", action.payload);
      const existingItem = state.favourites.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.favourites.push(action.payload);
        saveCartToStorage(state);
      } else {
        console.warn('Item already exists in the favourites!');
      }
    },
    removeItemFromFavourites: (state, action) => {
      state.favourites = state.favourites.filter((item) => item.id !== action.payload.id);
      saveCartToStorage(state);
    },
  },
});

export const initializeFaviourtes = () => async (dispatch) => {
  const loadedCart = await loadCartFromStorage();
  dispatch(loadFavourites(loadedCart));
};

export const { loadFavourites, addItemToFavourites, removeItemFromFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;

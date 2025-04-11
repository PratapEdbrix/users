"use client";
import { configureStore } from '@reduxjs/toolkit';
import CartReducer from '../redux/CartSlice';
import { combineReducers } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage'; 

const persistConfig = {
  key: "root",
  storage, 
};

const rootReducer = combineReducers({
  cart: CartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
});

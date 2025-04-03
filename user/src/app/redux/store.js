"use client"; 
import { configureStore } from '@reduxjs/toolkit';
import CartReducer from '../redux/CartSlice'

export default configureStore({
  reducer: {
    cart:CartReducer,
  },
})
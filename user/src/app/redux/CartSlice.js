"use client";
import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'counter',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      
      const findProduct= state.find((item)=>item.id === action.payload.id)
      if(findProduct){
        findProduct.quantity +=1
      }
      else{
        state.push(action.payload)    
      }
    },

    incrementQuantity: (state, action) => {

      let find = state.find((item) => item.id === action.payload)
      if (find) {
        find.quantity += 1
      }
    },
    decrementQuantity: (state, action) => {
      
      let find = state.find((item) => item.id === action.payload)
      if (find && find.quantity > 1) {
        find.quantity -= 1
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload)
    }
  },
})


export const { addToCart, removeFromCart,incrementQuantity, decrementQuantity } = cartSlice.actions

export default cartSlice.reducer
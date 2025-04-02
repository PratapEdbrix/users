
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems : [],
    products : [],
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addItems : (state,action) =>{
           state.cartItems.push(action.payload)
        },
        setProducts : (state,action) => {
            state.products = action.payload
        }

    }
})

export const { addItems , setProducts} = cartSlice.actions;
export default cartSlice.reducer;
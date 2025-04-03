
import { createSlice } from "@reduxjs/toolkit";
import {toast , ToastContainer} from "react-toastify";

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
           toast.success(`${action.payload.title} Added to cart Successfully`, {
            position: "top-center",
          });
        },
        setProducts : (state,action) => {
            state.products = action.payload
        }

    }
})

export const { addItems , setProducts} = cartSlice.actions;
export default cartSlice.reducer;
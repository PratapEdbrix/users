import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    products: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addItem: (state, action) => {
            const item = state.cartItems.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item) item.quantity++;
        },
        decrementQuantity: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item && item.quantity > 1) item.quantity--;
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
        },
    }
});

export const { setProducts, addItem, incrementQuantity, decrementQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
